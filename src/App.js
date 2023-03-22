import { Amplify, DataStore } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import React, { useEffect, useState } from 'react';
import { NewIdentification, MainMenu, ReferencePage, Post1, PostCollection } from './ui-components';
import {default as ReportViewCollectionCustom} from './ui-components/ReportViewCollectionCustom';
import { withAuthenticator , FileUploader, SelectField, Button, Image} from '@aws-amplify/ui-react';
import { createReport } from './modules/datastore';
//import {createReport, createPost, createReply} from './modules/datastore';

import { Pests } from './models';

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
      
          <FileUploader
              variation="button"
              acceptedFileTypes={['image/*']}
              accessLevel="public"
              isPreviewerVisible={false}
              maxFileCount={1}
              hasMultipleFiles={false}
              onSuccess={(key) => createReport(key.key,pestSubmitted)}
            />
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
        return <MainMenu 
          b1Label="IDENTIFY" 
          b1onClick={() => setCurrentPage('Report')} 
          b2Label="REFERENCE" 
          b2onClick={() => setCurrentPage('ReferencePage')} 
          b3Label="POST" 
          b3onClick={() => setCurrentPage('Post')} 
          b4Label="DISCUSSION" 
          b4onClick={() => setCurrentPage('PostCollection')}
          b5Label="REPORTS"
          b5onClick={() => setCurrentPage('Reports')}
          />;
    }
  };


  return (
    <div className="App">
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={() => {setCurrentPage("MainMenu")}}>
      Main Menu
      </Button>
      
      {renderPage()}
    </div>
  );
}

export default withAuthenticator(App);
