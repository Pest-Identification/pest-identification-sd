import argparse, os
import boto3
import json
import pandas as pd

if __name__ == "__main__":

    # Pass in environment variables and hyperparameters
    parser = argparse.ArgumentParser()

    # hyperparameters sent by the client are passed as command-line arguments to the script.
    parser.add_argument('--epochs', type=int, default=10)
    parser.add_argument('--batch_size', type=int, default=100)
    parser.add_argument('--learning_rate', type=float, default=0.1)

    # input data and model directories
    parser.add_argument('--model_dir', type=str)
    parser.add_argument("--sm-model-dir", type=str, default=os.environ.get("SM_MODEL_DIR"))
    parser.add_argument('--train', type=str, default=os.environ.get('SM_CHANNEL_TRAIN'))
    parser.add_argument('--test', type=str, default=os.environ.get('SM_CHANNEL_TEST'))

    args, _ = parser.parse_known_args()
    estimators = args.estimators
    model_dir = args.model_dir
    sm_model_dir = args.sm_model_dir
    training_dir = args.train

    # Read in data
    df = pd.read_csv(training_dir + "/train.csv", sep=",")

    # Preprocess data
    X = df.drop(["class", "class_cat"], axis=1)
    y = df["class_cat"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    # Build model
    regressor = RandomForestRegressor(n_estimators=estimators)
    regressor.fit(X_train, y_train)
    y_pred = regressor.predict(X_test)

    # Save model
    joblib.dump(regressor, os.path.join(args.sm_model_dir, "model.joblib"))

# Model serving
"""
Deserialize fitted model
"""
def model_fn(model_dir):
    model = joblib.load(os.path.join(model_dir, "model.joblib"))
    return model

"""
input_fn
    request_body: The body of the request sent to the model.
    request_content_type: (string) specifies the format/variable type of the request
"""
def input_fn(request_body, request_content_type):
    if request_content_type == "application/json":
        request_body = json.loads(request_body)
        inpVar = request_body["Input"]
        return inpVar
    else:
        raise ValueError("This model only supports application/json input")

"""
predict_fn
    input_data: returned array from input_fn above
    model (sklearn model) returned model loaded from model_fn above
"""
def predict_fn(input_data, model):
    return model.predict(input_data)

"""
output_fn
    prediction: the returned value from predict_fn above
    content_type: the content type the endpoint expects to be returned. Ex: JSON, string
"""
def output_fn(prediction, content_type):
    res = int(prediction[0])
    respJSON = {"Output": res}
    return respJSON