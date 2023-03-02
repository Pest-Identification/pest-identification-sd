import './App.css';
import "@aws-amplify/ui-react/styles.css";
import { useState } from 'react';
import { Identification, MainMenu, ReferencePage } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App({signOut, user}) {
  const [currentPage, setCurrentPage] = useState('MainMenu');

  const handleClickB1 = () => {
    setCurrentPage('Identification');
  };

  const handleClickB2 = () => {
    setCurrentPage('ReferencePage');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Identification':
        return <Identification />;
      case 'ReferencePage':
        return <ReferencePage />;
      default:
<<<<<<< HEAD
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE" b1onClick={handleClickB1} b2onClick={handleClickB2} />;
=======
        return <MainMenu b1Label="IDENTIFY" b2Label="REFERENCE"  b1onClick={handleClickB1} b2onClick={handleClickB2} />;
>>>>>>> Pulled ui
    }
  };

  return (
    <div className="App">
      <button onClick={signOut}>Sign out</button>
      {renderPage()}
    </div>
  );
}

export default withAuthenticator(App);
