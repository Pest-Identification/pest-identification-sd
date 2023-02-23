import './App.css';
import "@aws-amplify/ui-react/styles.css";

import {BaseButton, ReferencePage} from './ui-components'

function App() {
  const test = () => {
    return(
    <div>
      <BaseButton text = "IDENTIFY" onClick = {ReferencePage}/>
      <BaseButton text = "REFERENCE" onClick = {ReferencePage}/>

    </div>
    )
  }


  return (
    test()
  );
}


export default App;
