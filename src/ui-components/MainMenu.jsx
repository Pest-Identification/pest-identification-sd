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
  const { b1Label, b2Label, IdentifyEvent, overrides, ...rest } = props;
  return (
    <View
      width="390px"
      height="844px"
      display="flex"
      gap="unset"
      alignItems="center"
      justifyContent="center"
      overflow="visible"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="lightgrey"
      {...getOverrideProps(overrides, "MainMenu")}
      {...rest}
    >
      <BaseButton
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="center"
        justifyContent="unset"
        position="absolute"
        top="340px"
        left="125px"
        padding="0px 0px 0px 0px"
        text={b1Label}
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
        top="380px"
        left="125px"
        padding="0px 0px 0px 0px"
        text={b2Label}
        {...getOverrideProps(overrides, "BaseButton85375")}
      ></BaseButton>
    </View>
  );
}
