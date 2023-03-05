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
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE" b1onClick={() => setCurrentPage('Identification')} b2onClick={() => setCurrentPage('ReferencePage')} />;
    }
  };

  return (
    <div className="App">
      <button onClick={signOut}>Sign out</button>
      <body>
        {renderPage()}
      </body>
    </div>
  );
}

export default withAuthenticator(App);
