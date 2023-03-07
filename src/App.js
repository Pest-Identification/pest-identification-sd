import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useState } from 'react';
import { NewIdentification, MainMenu, ReferencePage, ReportForm } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
//import {createReport, createPost, createReply} from './modules/datastore';

//import { Pests } from './models';

Amplify.configure(awsconfig);


function App({signOut, user}) {


  const [currentPage, setCurrentPage] = useState('MainMenu');
  

  const renderPage = () => {
    switch (currentPage) {
      case 'Identification':
        return <NewIdentification Return={() => setCurrentPage('MainMenu')} Report={() => setCurrentPage('Report')}/>;
      case 'Report':
        return <ReportForm onCancel={() => setCurrentPage('MainMenu')}/>
      case 'ReferencePage':
        return <ReferencePage />;
      case 'MainMenu':
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE" b1onClick={() => setCurrentPage('Report')} b2onClick={() => setCurrentPage('ReferencePage')} />;
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
