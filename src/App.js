import './App.css';
import "@aws-amplify/ui-react/styles.css";

import {Identification, MainMenu, ReferencePage} from './ui-components'
import '@aws-amplify/ui-react/styles.css'
console.log(Identification);

function App() {

  const test = () => {
    return(
    <div>
      <MainMenu 
      b1Label={"IDENTIFY"} 
      b2Label={"REFERENCE"} 
      IdentifyEvent = {ReferencePage}
      overrides={{
        "BaseButton85350": {
          "as" : "a",
          "href" : "#",
          "onClick" : Id
        }
      }}
      />
    </div>
    );
  }


  return (
    test()
  );
}

function Id(){

  const test = () => {
      return(
      <div>
        <Identification/>
      </div>
      );
    }

    return (
      test()
    );


}


export default App;
