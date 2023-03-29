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
const updateDbParams = {
    TableName: 'User-cx725szbmvc7xcykpwaxueqafq-staging',
    UpdateExpression: 
        'set userName = :userName, ' +
        'createdAt = if_not_exists(createdAt, :created), ' +
        'updatedAt = :updatedString, ' +
        '#lastChangedAt = :updatedInt, ' +
        '#typename = :type ' +
        'add #version :addOne',
    ExpressionAttributeNames: { // This is necessary as _ are invalid characters
        "#lastChangedAt": "_lastChangedAt",
        "#typename": "__typename",
        "#version": "_version"
    }
};

var dbParams = {
        TableName : 'User-cx725szbmvc7xcykpwaxueqafq-staging',
      }
      
// Define the parameters for the listUsers API call
var cognitoParams = {
    UserPoolId: 'us-east-2_ZoTZXGASQ',
    AttributesToGet: ['preferred_username', 'sub']
};

exports.handler = async (event, context, callback) => {
    
    console.log("Event:", JSON.stringify(event));

    if(event.operation == "update"){

        // Create a new instance of the Amazon Cognito IdentityServiceProvider
        var cognito = new AWS.CognitoIdentityServiceProvider();

        // Call the listUsers API to retrieve a list of all users in the user pool
        try{
            const data = await cognito.listUsers(cognitoParams).promise();
            const users = data.Users
            for(let u of users){
                let id;
                let userName;
                
                
                for(let a of u.Attributes){
                    if(a.Name == "sub") id = a.Value;
                    if(a.Name == "preferred_username") userName = a.Value;
                }
                dbParams.Item = {
                    "id": id,
                    "userName": userName
                }
                
                updateDbParams.Key = {
                          "id": id
                      };
                      
                const date = new Date();
                updateDbParams.ExpressionAttributeValues = {
                        ":userName": userName,
                        ":created": date.toISOString(),
                        ":updatedString": date.toISOString(),
                        ":updatedInt": Math.floor(date.getTime() / 1000),
                        ":type": "User",
                        ":addOne": 1
                      }
                
                try{
                    await docClient.update(updateDbParams).promise();
                    console.log("Put user ", JSON.stringify(updateDbParams));
                }
                catch (err){
                    console.log(JSON.stringify(err));
                }
                
            }
            callback(null,users);
        }
        catch(err){
            console.log(err);
            callback(null, err);
        }
        

        return;
    }
    
    callback(null,event);
    
    
  dbParams.Item = {
            "id": event.userName,
            "name": event.request.userAttributes.username
        }
      
    try {
        await docClient.put(dbParams).promise();
        console.log("It worked");
        return { body: 'Successfully created item! ' + JSON.stringify(dbParams.Item)};
    } catch (err) {
        console.log("It didn't work" + JSON.stringify(err));
        return { error: err }
    }

};
