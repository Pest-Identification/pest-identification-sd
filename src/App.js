import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useState } from 'react';
import { Identification, MainMenu, ReferencePage } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {createReport, createPost, createReply} from './modules/datastore';

import { Pests } from './models';

Amplify.configure(awsconfig);


function App({signOut, user}) {


  const [currentPage, setCurrentPage] = useState('MainMenu');
  

  const renderPage = () => {
    switch (currentPage) {
      case 'Identification':
        return <Identification />;
      case 'ReferencePage':
        return <ReferencePage />;
      default:
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE" b1onClick={() => setCurrentPage('Identification')} b2onClick={() => setCurrentPage('ReferencePage');} />;
    }
  };

  return (
    <div className="App">
      <button onClick={signOut}>Sign out</button>

      <h1> Create a report</h1>
      Pest: <select id="pest">
            <option value={Pests.SPOTTED_LANTERN_FLY}>SLF</option>
            <option value={Pests.GRAPE_BERRY_MOTH}>GBM</option>
          </select> <br/>
      <button onClick={() => createReport(document.getElementById('pest').value)}>Make report</button>
      <br/>

      <h1> Create a post</h1>
      Title: <input type="text" id="title"/><br/>
      Body: <input type="text" id="body"/><br/>
      <button onClick={() => createPost(document.getElementById('title').value, document.getElementById('body').value, null)}>Make post</button>
      
      {renderPage()}
    </div>
  );
}

export default withAuthenticator(App);
