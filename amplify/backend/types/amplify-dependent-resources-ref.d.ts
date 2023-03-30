export type AmplifyDependentResourcesAttributes = {
  "api": {
    "FlyLite": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "FlyLite": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "CreatedSNSRole": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "updateUserDB": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "geo": {
    "reportLocationLookup": {
      "Arn": "string",
      "Name": "string",
      "Region": "string"
    },
    "reportsMap": {
      "Arn": "string",
      "Name": "string",
      "Region": "string",
      "Style": "string"
    }
  },
  "predictions": {
    "slfModel": {
      "region": "string",
      "type": "string"
    }
  },
  "storage": {
    "reportPics": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}