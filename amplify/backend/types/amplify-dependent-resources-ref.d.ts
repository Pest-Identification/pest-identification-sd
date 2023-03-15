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