import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useState } from 'react';
import { NewIdentification, MainMenu, ReferencePage, ReportForm, Post1, PostCollection } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
//import {createReport, createPost, createReply} from './modules/datastore';

//import { Pests } from './models';

Amplify.configure(awsconfig);


function App({signOut, user}) {


  const [currentPage, setCurrentPage] = useState('MainMenu');
  

  const renderPage = () => {
    switch (currentPage) {
      case 'Identification':
        return <NewIdentification onClickBack={() => setCurrentPage('MainMenu')} UnknownLabel="Unknown" SLFLabel="LanternFly" GBMLabel="GBMMoth"/>;
      case 'Report':
        return <ReportForm onCancel={() => setCurrentPage('MainMenu')}/>
      case 'ReferencePage':
        return <ReferencePage />;
      case 'PostCollection':
        return <PostCollection />;
      case 'Post':
        return <Post1 onCancel={() => setCurrentPage('MainMenu')} />;
      case 'MainMenu':
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE" b3Label="POST" b4Label="DISCUSSION" b1onClick={() => setCurrentPage('Identification')} b2onClick={() => setCurrentPage('ReferencePage')} b3onClick={() => setCurrentPage('Post')} b4onClick={() => setCurrentPage('PostCollection')}/>;
      default:
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE" b3Label="POST" b4Label="DISCUSSION" b1onClick={() => setCurrentPage('Identification')} b2onClick={() => setCurrentPage('ReferencePage')} b3onClick={() => setCurrentPage('Post')} b4onClick={() => setCurrentPage('PostCollection')}/>;
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
