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
  const { b1Label, b2Label, test1, overrides, ...rest } = props;
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
      <BaseButton
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="319px"
        left="124px"
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
        top="382px"
        left="124px"
        padding="0px 0px 0px 0px"
        text={b2Label}
        {...getOverrideProps(overrides, "BaseButton85375")}
      ></BaseButton>
    </View>
  );
}
