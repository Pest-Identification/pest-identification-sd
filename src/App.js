import { Amplify, Auth, DataStore } from 'aws-amplify';
import awsmobile from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import React from 'react';
import Menu from './ui-components/Menu';
import { withAuthenticator, View, FileUploader} from '@aws-amplify/ui-react';


Amplify.configure(awsmobile);


function App({signOut, user}) {

  console.log("Group",user.signInUserSession.accessToken.payload["cognito:groups"]);

  // Ran only once
  React.useEffect(() => {
    DataStore.stop().then(() => {
      console.log("Datastore stopped. Starting...");
      DataStore.start().then(() => {
        console.log("Datastore started!");
      });
    });
  }, []);

  return (
    <View className="App">
      <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
      <Menu/>
    </View>
  );
}

export default withAuthenticator(App);
//export default App;
