import { Amplify, DataStore } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import React, { useEffect, useState } from 'react';
import { NewIdentification,ReferencePage, Post1, PostCollection} from './ui-components';
import Menu from './ui-components/Menu';
import {default as ReportViewCollectionCustom} from './ui-components/ReportViewCollectionCustom';
import { withAuthenticator, SelectField, Button, Image, View} from '@aws-amplify/ui-react';
import { createReport, createPost } from './modules/datastore';


Amplify.configure(awsconfig);


function App({signOut, user}) {


  const [currentPage, setCurrentPage] = useState('Loading');
  const [pestSubmitted, setPestSubmitted] = useState("UNKNOWN");
  const [imageToSubmit, setImageToSubmit] = useState();

  // Run only once
  useEffect(() => {
    DataStore.stop().then(() => {
      console.log("Datastore stopped. Starting...");
      DataStore.start().then(() => {
        console.log("Datastore started!");
        setCurrentPage('MainMenu')
      },
      (err) => {
        console.log(err);
      });
    });
  }, []);
  

  const renderPage = () => {
    switch (currentPage) {
      case 'Loading':
        console.log("Loading");
        return ;//<header>Loading</header>;
      case 'Identification':
        return <NewIdentification onClickBack={() => setCurrentPage('MainMenu')} UnknownLabel="Unknown" SLFLabel="LanternFly" GBMLabel="GBMMoth"/>;
      case 'Report':
        return (
        <div>
          <SelectField
          label="Submit pest as:"
          placeholder="Please select an option"
          isDisabled={false}
          value={pestSubmitted}
          onChange={(e) => {
            let { value } = e.target;
            setPestSubmitted(value);
          }}
          >
          <option
            children="Unknown"
            value="UNKNOWN"
          ></option>
          <option
            children="Grape berry moth"
            value="GRAPE_BERRY_MOTH"
          ></option>
          <option
            children="Spotted lantern fly"
            value="SPOTTED_LANTERN_FLY"
          ></option>
          </SelectField>
          <input
          type="file"
          accept="image/jpeg"
          onChange={(e) => setImageToSubmit(e.target.files[0])}
          />
          <Image src={imageToSubmit}></Image>
          <Button onClick={() => {createReport(imageToSubmit, pestSubmitted)}}>Submit Report</Button>
        </div>);
      case 'ReferencePage':
        return <ReferencePage />;
      case 'PostCollection':
        return <PostCollection />;
      case 'Post':
        return <Post1 onCancel={() => setCurrentPage('MainMenu')} />;
      case 'Reports':
        return <ReportViewCollectionCustom />;
      default:
        return (<Menu renderPage={setCurrentPage}/>);
    }
  };


  return (
    <View className="App">
      <Menu/>
    </View>
  );
}

export default withAuthenticator(App);
//export default App;
