/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, View } from "@aws-amplify/ui-react";
import BaseButton from "./BaseButton";
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
      backgroundColor="lightgrey"
      max-width="100%"
      {...getOverrideProps(overrides, "MainMenu")}
      {...rest}
    >
      <Flex
        gap="10px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        position="absolute"
        top="-10px"
        left="-10px"
        padding="10px 10px 10px 10px"
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
    </View>
  );
}
