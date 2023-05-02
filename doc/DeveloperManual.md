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

### ML Model Development

### Backend Modifications

#### Lambda Scripts



#### Datamodels
