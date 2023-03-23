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

const params = {
    TableName : 'User',
    /* Item properties will depend on your application concerns */
    Item: {
        "authorID": "123",
       "name": "Test"
    }
  }


exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
    await docClient.put(params).promise();
    return { body: 'Successfully created item! ' + JSON.stringify(params.Item)};
    } catch (err) {
    
    return { error: err }
    }

};
