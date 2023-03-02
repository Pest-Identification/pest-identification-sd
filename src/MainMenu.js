import React from "react";
import { BaseButton, View } from "@aws-amplify/ui-react";
import { Identification } from "./ui-components";

function MainMenu(props) {
  const { b1Label, b2Label, onClickB1, onClickB2 } = props;

  const handleB1Click = () => {
    onClickB1(); // Call the onClickB1 handler passed from the parent component
  };

  const handleB2Click = () => {
    onClickB2(); // Call the onClickB2 handler passed from the parent component
  };

  return (
    <View>
      <BaseButton onClick={handleB1Click}>{b1Label}</BaseButton>
      <BaseButton onClick={handleB2Click}>{b2Label}</BaseButton>
      {props.showIdentification && <Identification />}
    </View>
  );
}

export default MainMenu;
