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

![](img/architecture.png)


### Cloud Architecture

The main services interacted with during development are Amplify, Sagemaker, and Lambda. S3 and DynamoDB are also used, but most of their use is behind Amplify's [Storage](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#automated-setup-create-storage-bucket) and [Datastore](https://docs.amplify.aws/lib/datastore/getting-started/q/platform/js/) Javascript APIs. Additionally, Cognito and AppSync are also used, but require very little interaction.

### App Architecture

***
## Further Development

### Setting Up your AWS cloud account
Dr. Flor has access to the root account. We have also created further administration accounts for developers.

### App Development

### ML Model Development

### Backend Modifications

#### Lambda Scripts



#### Datamodels
