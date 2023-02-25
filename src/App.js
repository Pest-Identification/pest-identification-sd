import './App.css';
import "@aws-amplify/ui-react/styles.css";
import config from '../src/aws-exports'

import {MainMenu, ReferencePage} from './ui-components'
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css'


Amplify.configure(config)

function App() {
  const test = () => {
    return(
    <div>
      <MainMenu b1Label={"IDENTIFY"} b2Label={"REFERENCE"} IdentifyEvent = {ReferencePage}/>
    </div>
    )
  }


  return (
    test()
  );
}


export default App;
