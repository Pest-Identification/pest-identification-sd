/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import BaseButton from "./BaseButton";
import { Flex, View } from "@aws-amplify/ui-react";
export default function MainMenu(props) {
  const { b1Label, b2Label, b1onClick, b2onClick, overrides, ...rest } = props;
  return (
    <View
      width="390px"
      height="844px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "MainMenu")}
      {...rest}
    >
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        position="absolute"
        top="392px"
        left="113px"
        padding="10px 10px 10px 10px"
<<<<<<< HEAD
        {...getOverrideProps(overrides, "Background 1")}
      >
        <BaseButton
          width="143px"
          height="40px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          text={b1Label}
          onClick={b1onClick}
          {...getOverrideProps(overrides, "Button1")}
        ></BaseButton>
        <BaseButton
          width="143px"
          height="40px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          text={b2Label}
          onClick={b2onClick}
          {...getOverrideProps(overrides, "Button2")}
        ></BaseButton>
      </Flex>
=======
        {...getOverrideProps(overrides, "Frame 2")}
      ></Flex>
      <BaseButton
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="40%"
        left="45%"
        padding="0px 0px 0px 0px"
        text={b1Label}
        onClick={b1onClick}
        {...getOverrideProps(overrides, "BaseButton85350")}
      ></BaseButton>
      <BaseButton
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="45%"
        left="45%"
        padding="0px 0px 0px 0px"
        text={b2Label}
        onClick={b2onClick}
        {...getOverrideProps(overrides, "BaseButton85375")}
      ></BaseButton>
>>>>>>> Pulled ui
    </View>
  );
}
