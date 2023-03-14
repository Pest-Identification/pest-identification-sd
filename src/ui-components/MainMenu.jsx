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
  const {
    b1Label,
    b2Label,
    b1onClick,
    b2onClick,
    b3Label,
    b3onClick,
    b4Label,
    b4onClick,
    overrides,
    ...rest
  } = props;
  return (
    <View
      width="100%"
      height="100%"
      display="contents"
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
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="50%"
        left="50%"
        padding="10px 10px 10px 10px"
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
          shrink="0"
          position="relative"
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
          shrink="0"
          position="relative"
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
          {...getOverrideProps(overrides, "Button5")}
        ></BaseButton>
      </Flex>
    </View>
  );
}
