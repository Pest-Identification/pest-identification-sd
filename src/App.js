import { Amplify, Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import React, { useState } from 'react';
import { NewIdentification, MainMenu, ReferencePage, ReportForm, Post1, PostCollection, ReportView } from './ui-components';
import {default as ReportViewCollectionCustom} from './ui-components/ReportViewCollectionCustom';
import { withAuthenticator , FileUploader, Image} from '@aws-amplify/ui-react';
import { createReport } from './modules/datastore';
//import {createReport, createPost, createReply} from './modules/datastore';

import { Pests } from './models';

Amplify.configure(awsconfig);


function App({signOut, user}) {


  const [currentPage, setCurrentPage] = useState('MainMenu');
  const [image, setImage] = useState("");
  

  const renderPage = () => {
    switch (currentPage) {
      case 'Identification':
        return <NewIdentification Return={() => setCurrentPage('MainMenu')} Report={() => setCurrentPage('Report')}/>;
      case 'Report':
        return (
        <div>
          <ReportForm onCancel={() => setCurrentPage('MainMenu')}/>
          <FileUploader
              variation="button"
              acceptedFileTypes={['image/*']}
              accessLevel="public"
              isPreviewerVisible={false}
              maxFileCount={1}
              hasMultipleFiles={false}
              onSuccess={(key) => createReport(key.key,Pests.UNKNOWN)}
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

  function getPic(key){
    Storage.get(key).then((result) => {setImage(result)})
  }



  return (
    <div className="App">
      <button onClick={signOut}>Sign out</button>
        {renderPage()}
    </div>
  );
}

export default withAuthenticator(App);
