/* Amplify Params - DO NOT EDIT
	API_FLYLITE_GRAPHQLAPIIDOUTPUT
	API_FLYLITE_USERTABLE_ARN
	API_FLYLITE_USERTABLE_NAME
	AUTH_FLYLITE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

AWS.config.region = 'us-east-2';



exports.handler = async (event, context, callback) => {
    
    console.log("Event:", JSON.stringify(event));

    if(event.operation = "update"){

        // Create a new instance of the Amazon Cognito IdentityServiceProvider
        var cognito = new AWS.CognitoIdentityServiceProvider();

        // Define the parameters for the listUsers API call
        var cognitoParams = {
            UserPoolId: 'us-east-2_ZoTZXGASQ',
            //AttributesToGet: ['username', 'name'] // optional: specify the user attributes to retrieve
        };

        // Call the listUsers API to retrieve a list of all users in the user pool
        try{
            const data = await cognito.listUsers(cognitoParams).promise();
            console.log(data);
            for(d of data.Users){
                console.log(d);
                console.log(d.Attributes);
            }
            callback(data);
        }
        catch(err){
            console.log(err);
            callback(err);
        }
        

        return;
    }
    
    callback(null,event);
    
    const params = {
        TableName : 'User-cx725szbmvc7xcykpwaxueqafq-staging',
        /* Item properties will depend on your application concerns */
        Item: {
            "id": event.userName,
            "name": event.request.userAttributes.name
        }
      }
      
    try {
        await docClient.put(params).promise();
        console.log("It worked");
        return { body: 'Successfully created item! ' + JSON.stringify(params.Item)};
    } catch (err) {
        console.log("It didn't work" + JSON.stringify(err));
        return { error: err }
    }

};
