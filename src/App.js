import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import React from 'react';
import Menu from './ui-components/Menu';
import { withAuthenticator, View} from '@aws-amplify/ui-react';


Amplify.configure(awsconfig);


function App({signOut, user}) {

  console.log("Group",user.signInUserSession.accessToken.payload["cognito:groups"]);

  return (
    <View className="App">
      <button onClick={() => signOut()}>Signout</button>
      <Menu/>
    </View>
  );
}

export default withAuthenticator(App);
//export default App;
