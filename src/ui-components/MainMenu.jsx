/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import BaseButton from "./BaseButton";
import { View } from "@aws-amplify/ui-react";
export default function MainMenu(props) {
  const {
    b1Label,
    b2Label,
    b1onClick,
    b2onClick,
    b3Label,
    b3onClick,
    b4Label,
    b4onClick,
    b5onClick,
    b5Label,
    overrides,
    ...rest
  } = props;
  return (
    <View
      width="100%"
      height="100%"
      display="flex"
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
      <View
        width="163px"
        height="260px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="center"
        position="absolute"
        top="50%"
        left="50%"
        padding="0px 0px 0px 0px"
        transform="translate(-50%, -50%)"
        {...getOverrideProps(overrides, "Background 1")}
      >
        <BaseButton
          width="143px"
          height="40px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="10px"
          left="10px"
          padding="0px 0px 0px 0px"
          text={b4Label}
          onClick={b4onClick}
          {...getOverrideProps(overrides, "Button4")}
        ></BaseButton>
        <BaseButton
          width="143px"
          height="40px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="60px"
          left="10px"
          padding="0px 0px 0px 0px"
          text={b3Label}
          onClick={b3onClick}
          {...getOverrideProps(overrides, "Button3")}
        ></BaseButton>
        <BaseButton
          width="143px"
          height="40px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="110px"
          left="10px"
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
          position="absolute"
          top="160px"
          left="10px"
          padding="0px 0px 0px 0px"
          text={b2Label}
          onClick={b2onClick}
          {...getOverrideProps(overrides, "Button2")}
        ></BaseButton>
        <BaseButton
          width="143px"
          height="40px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="210px"
          left="10px"
          padding="0px 0px 0px 0px"
          onClick={b5onClick}
          text={b5Label}
          {...getOverrideProps(overrides, "Button5")}
        ></BaseButton>
      </View>
    </View>
  );
}
