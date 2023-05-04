# Developer Guide
Clone the repository from https://github.com/AJBuilder/pest-identification-sd.git in order to get the app code for the front end and back end. 

***
## Table of Contents

- [Developer Guide](#developer-guide)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
    - [Cloud Architecture](#cloud-architecture)
    - [App Architecture](#app-architecture)
  - [Further Development](#further-development)
    - [Setting Up your AWS cloud account](#setting-up-your-aws-cloud-account)
    - [App Development](#app-development)
    - [ML Model Development](#ml-model-development)
    - [Backend Modifications](#backend-modifications)
      - [Lambda Scripts](#lambda-scripts)
      - [Datamodels](#datamodels)


***
## Architecture

<p align="center">
  <figure>
    <img src="img/architecture.png">
    <figcaption>Figure 1: Technology Diagram Showing Services Used for Implementation<figcaption>
  <figure>
</p>

### Cloud Architecture

The main services interacted with during development are Amplify, Sagemaker, and Lambda. S3 and DynamoDB are also used, but most of their use is behind Amplify's [Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#automated-setup-create-storage-bucket) and [Datastore](https://docs.amplify.aws/lib/datastore/getting-started/q/platform/js/) Javascript APIs. Additionally, Cognito and AppSync are also used, but require very little interaction during development as they are utilized by Amplify.

### App Architecture

The app is built with [React](https://react.dev/) and utlizes a lot of AWS Amplify React [ui-components](https://ui.docs.amplify.aws/?platform=react) and [APIs](https://docs.amplify.aws/lib/q/platform/js/). Some of the app screens also utilize [Tailwind](https://tailwindcss.com/) and were modified from templates found online.

And as of commit [2de4390](https://github.com/AJBuilder/pest-identification-sd/commit/2de4390efc1e3fc8fd7b7490726ac11b4fe9be5b), App.jsx is the parent component rendered by `root.render()` in [index.js](../src/index.js). This [App.js](../src/App.js) renders one component, [Menu.jsx]([](../src/ui-components/Menu.jsx)). This menu renders the different pages of the app within it according to what is selected in the menu.

The existance of App.js even though it only has one child is the result of the development process. Its an artifact that wasn't removed because it works, and wasn't worth the time to rework. Although, App.js could could be useful if a loading page is desired before showing the menu component. Additionally, App.css ensures that the App is the full viewport. In the future, to account for how different browsers display the viewport, further code can be employed in App.js/App.css to ensure the app is properly filling the screen. (Currently there are some issues with Safari) Child components do not have to worry about the viewport and can simply fill 100% of App.js.

In summary, the React component architecture is:
- index.js
  - App.js
    - Menu.jsx
      - (Home page)
      - (Identify page)
      - (Discussion page)
      - (Reports page)


***
## Further Development

### Setting Up your AWS cloud account
Dr. Flor has access to the root account. We have also created further administration accounts for developers.


### App Development


There are two main dependencies that must be installed

- [Node.js](https://nodejs.org/en/download) and [NPM](https://docs.npmjs.com/getting-started/)
- [Amplify CLI](https://docs.amplify.aws/cli/)

Before working on the app, the dependencies must be installed. Dependencies are not saved on the repo. Running `npm install` or `npm i` will install all the Node.js packages in `node_modules`. What packages are installed depends on what is listed in [package.json](../package.json) (although technically [package-lock.json](../package-lock.json)) If you install a package to use, it will be added to [package.json](../package.json). The `node_modules` folder is in .gitignore as it's unecessary to have in the repo.

The common workflow for app development starts with ensuring the proper AWS backend and config is updated from the cloud. This is so that the app can properly interact with the updated backend. This can be done using `amplify pull`. This data is also stored on the repo, but must be updated whenever there is a backend changed. Pulling will also pull the generated UI components that were created in the Amplify GUI. As of commit [2de4390](https://github.com/AJBuilder/pest-identification-sd/commit/2de4390efc1e3fc8fd7b7490726ac11b4fe9be5b), there are no auto generated UI components.

If the backend is up to date, workflow can proceed. During development, only a development build is necessary to test changes. Using `npm start`, a development build of the app is made. A browser window should automatically open on `http://localhost:3000`. (If WSL is being used, you may have to forward network traffic to localhost:3000 to the WSL IP. [There are a few ways to do this.](https://stackoverflow.com/questions/64513964/wsl-2-which-ports-are-automatically-forwarded)) Whenever you save a file in the app, the development server will quickly rebuild the app.

Note that this is very different from `npm build`. This will create a production build of the app, which is unecessary and takes awhile. However, this is what will be done whenever the app is built in the cloud.

Amplify will automatically rebuild and deploy the app whenever there is a commit to the "main" branch in the repo. It is advisable to create a "dev" branch seperate from the "main" branch so that in-progress features can be saved to the repo without being deployed. This was not done as no one is using the app.

If the app is being utilized by users, a development hosting and backend should be setup. A "hosting environment" is the web accessible build of the app. As of now, there is only one deployment tracking the "main" branch. This environment is utilizing the "staging" backend. (The name should probably be "release" or "production") What backend the hosting environment uses can be configured.

The purpose of multiple hosting and backend environments is so that a new app build can be tested in the cloud without disrupting the users. **As of now, this is not done.**


### ML Model Development



The machine learning model was developed using Sagemaker. Sagemaker is the machine learning suite of AWS. It provides an API to easily run training jobs and deploy models in addtion to a library of pre-trained models. You can find all the Jupyter Notebooks that were used in Sagemaker Studio under "./Sagemaker/Jupyter Notebooks/". The main ones used were:

- [slf-classifier.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-classifier.ipynb)
- [slf-endpoint-serverless.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-endpoint-serverless.ipynb)
- [slf-inference.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-inference.ipynb)

The current model is a three class model that classifies either SLF, GBM, or Neither. The model is of the Mobile Net V2 architecture and was trained using transfer learning. It was pre-trained on ImageNet and was provided by Sagemaker. You can see this in [slf-classifier.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-classifier.ipynb) in the code 

``` Python

model_id, model_version = "tensorflow-ic-imagenet-mobilenet-v2-100-224-classification-4", "*"

train_model_uri = model_uris.retrieve(
    model_id=model_id, model_version=model_version, model_scope="training"
)
```

Once the model was trained, [slf-endpoint-serverless.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-endpoint-serverless.ipynb) was used to deploy the model to a serverless endpoint. Using serverless endpoint instead of a real time or other type is important as AWS does not charge for when the model is not in use. With serverless, the model is loaded out of memory if inference is not done for a specific amount of time. However, loading it back into memory due to a inference request will take longer. This is referred to as a "cold start".

[slf-inference.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-inference.ipynb) is just a test notebook to ensure that the endpoint is working.

The dataset used for training is stored in S3 bucket. There are many different buckets attached to the account (a lot are artifacts from development) but the main ones are:

- flylite-model-training-pictures
- flylite-model-validation-pictures
- flylite-model-testing-pictures

These buckets are passed during [slf-classifier.ipynb](../Sagemaker/Jupyter%20Notebooks/slf-classifier.ipynb) as the pictures to be used for training, validation, and testing. Inside each bucket, they are sorted into slf, gbm, and neither folders. (Not really folders sinc S3 is object storage) The Sagemaker training script will use these prefixes as class labels.

There are other buckets like lantern-rd-pictures, gbm-pictures, and gbm-test-pictures, however these are raw datasets and are probably unfiltered or sorted. The flylite-model-*-pictures contain copies of all these buckets but are also sorted and filtered.


### Backend Modifications

#### Lambda Scripts

When needing to create a connection between the backend of the application and the model deployed for inferencing we went with AWS service [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html). AWS Lambda is a service that runs backend scripts that do tasks when scheduled or based on triggers. The scripts used can be from a bank of predefined ones offered by Lambda or written from scratch. Being an AWS service, Lambda also has the ability to connect and interact with other AWS services. It is important to note that in order to interact with other services, we made use of the [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) library and the corresponding APIs for each service. For the use of this project, we used a template in Python, to set up a Lambda function that triggers in response to an object being added to an S3 bucket. 

The function is set up so that when an object, in our case an image, is uploaded to a designated bucket, the object is pulled from the bucket to be used as the input for the inference model. The following code shows the event handler, and how the information that triggers the Lambda function is used. 

``` Python 
def lambda_handler(event, context):
    # Get the S3 object key from the event
    s3 = boto3.client("s3")
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    # Get the input data from the S3 object
    obj = s3.get_object(Bucket=bucket, Key=key)
    input_data = obj['Body'].read()
```
Each object in an S3 bucket can be known by its unique key, therefore, in order to get the physical image, we extrapolate the bucket name and object key from the event trigger. Now would be a good time to mention that the trigger is set up in the AWS Lambda console under the trigger section. Here is where you establish what bucket you would like the function to trigger in response to, and whether that trigger is on an addition or deletion from the bucket. 

After obtaining the key to the object, we can use an API apart of S3 to get the image. Having the image, we then can setup the code to invoke the endpoint in which our model is being hosted on. 

``` Python
sagemaker = boto3.client('sagemaker-runtime')
    response = sagemaker.invoke_endpoint(
        EndpointName='pest-classifier-release',
        ContentType='application/x-image',
        Accept='application/json',
        Body=input_data
    )
```
The name of our endpoint is setup in SageMaker and the "ContentType" is established by the model, which is all known information. The "Body" is where we send the obtained image, so that it will be the input for model and get classified. The result of the inference model, what it sends back, it stored in the variable response. In order to get the relevant information, we parse the response and look for the 'probabilities' that are returned. 

``` Python
 model_predictions = json.loads(response['Body'].read().decode())
 probs = model_predictions['probabilities']
```
Once we have those probabilities, we can give a response based on which of the probabilities is the highest. Now having what the image was classified as, we can add the result the database table in which the report for each image is stored. To do this, we utilize the Boto3 library again to make a connection to the desired table, our report table, and update the designated fields. 

``` Python
  dynamoDB = boto3.client('dynamodb')
  tableName = 'Report-cx725szbmvc7xcykpwaxueqafq-staging'

  response = dynamoDB.update_item(
        TableName=tableName,
        Key={
            'id' :{
                'S': report_id
            }
        },
        UpdateExpression= 'SET pestIdentified = :idType, pestActual = :idType, updatedAt = :updatedAt, #lastChangedAt = :lastChanged, #version = #version + :val',
        ExpressionAttributeNames={
            '#lastChangedAt': '_lastChangedAt',
            '#version': '_version'
        },
        ExpressionAttributeValues={
            ':idType':{
                'S': label_predict
            },
            ':updatedAt':{
                'S': time_str
            },
            ':lastChanged':{
                'N': time_num
            },
            ':val':{
                'N': '1'
            }
        }
    )
```
This is the last step in the approach of connecting the inference model to the backend database tables in order to have the result stored in a usable location. With the classification result stored in the table, we are able to pull that attribute and display the information in whatever way we choose. 

#### **Datamodels**
We created 8 different datamodels for our backend to be able to store the data the way that we wish to store it and relate different elements together. More information about how to create your own on amplify as well as the rules that go into making them can be found on https://docs.amplify.aws/console/data/data-model/.

The first one is Location. This consists of two field names which are essentially variable names and their types are Address and GPSLocation. These are simply used to store information for the pins that are used on our map.

The next model is specifically in regards to the Address we talked about before and is a relation model. What we chose to have in Address is a number, a street, a neighborhood, a municipality, a region, a country, and a postalCode. All of these are stored as String variables and in the actual application as long as they are on a mobile device will come from information gathered through their GPS.

The third of the 8 is what goes into a User and you guessed it, it is the User model. This is the overarching one so it is kept rather simple and a user consists of an id that is unique and a userName which is stored as a string. 

The fourth of the 8 is the Reply data model and this is how the replies to the different discussion board posts can be made. This also consists of an id. as well as an authorID, a title, a body, and a postID. The postID is a relationship source which is related to the original post by its own unique id. This allows us to only display the replies to the individual posts they are made for. There is also a relationship that you will see if you are further developing that has it link to reports. This is so that in the future we may have posts and replies have the ability to link to reports with the hope of eventually displaying report images. Furthermore, the title field is not used but is included to enable to possiblilty of only having the Post datamodel. Where this model also behaves as a reply.

The fifth of the 8 is a list of variables to be used so if you are planning on expanding the capability of the automatic identification teh area you will wish to add to is the Pests model which currently only consists of UNKOWN, GRAPE_BERRY_MOTH, and SPOTTED_LANTERN_FLY.

The sixth model to cover is the Report model and this is quite possibly the most important as it is the key element of the application and what we set out to accomplish. It has the fields id, authorID, PestActual this is used to store what the pest actually is, pestSubmitted is used to see what the user think it is, pestIdentified is what is identified. These are used to cross reference the model as time goes along. This model also consists of an image, longitude, latitude, address_number, address_street, address_neighborhood, address_municipality, address_region, address_country, address_postalCode, and location_accuracy. This also has two relationships which are to posts and replies.

the seventh model is that of the Post themselves and consist of an id, an authorID, a title, and a body. This also has two relations which are to replies and reports. 

The last of the data models is for GPSLocation which simply consists of longitude and latitude.
