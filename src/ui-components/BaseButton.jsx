/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function BaseButton(props) {
  const { text = "Button", overrides, ...rest } = props;
  return (
    <View
      width="143px"
      height="40px"
      display="block"
      gap="unset"
      alignItems="center"
      justifyContent="center"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "BaseButton")}
      {...rest}
    >
      <View
        width="100%"
        height="39px"
        display="block"
        gap="unset"
        alignItems="center"
        justifyContent="center"
        position="relative"
        top="1px"
        left="0px"
        borderRadius="3px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(0,0,0,1)"
        fontFamily="Roboto"
        {...getOverrideProps(overrides, "Button")}
      ></View>
      <Text
        fontFamily="Roboto"
        fontSize="20px"
        fontWeight="600"
        color="rgba(255,255,255,1)"
        lineHeight="23.4375px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="center"
        letterSpacing="1.15px"
        width="100%"
        height="100%"
        gap="unset"
        alignItems="center"
        position="absolute"
        top="0"
        left="0"
        padding="8px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={text}
        {...getOverrideProps(overrides, "Text")}
      ></Text>
    </View>
  );
}
