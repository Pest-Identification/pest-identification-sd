/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Text, View } from "@aws-amplify/ui-react";
export default function NewIdentification(props) {
  const {
    onClickBack,
    onClickSLF,
    onClickGBM,
    onClickUnknown,
    SLFLabel,
    GBMLabel,
    UnknownLabel,
    BackLabel,
    overrides,
    ...rest
  } = props;
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
      {...getOverrideProps(overrides, "NewIdentification")}
      {...rest}
    >
      <View
        width="390px"
        height="71px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0.24%"
        bottom="91.35%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217,217,217,1)"
        {...getOverrideProps(overrides, "Rectangle 6")}
      ></View>
      <Text
        fontFamily="Raleway"
        fontSize="20px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="5px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.85px"
        width="273px"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="4.15%"
        bottom="95.26%"
        left="15.64%"
        right="14.36%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Identification"
        {...getOverrideProps(overrides, "Identification")}
      ></Text>
      <View
        width="120px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="2.37%"
        bottom="92.89%"
        left="0%"
        right="69.23%"
        padding="0px 0px 0px 0px"
        onClick={onClickBack}
        {...getOverrideProps(overrides, "BaseButton")}
      >
        <View
          width="99px"
          height="39px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="0px"
          left="10px"
          borderRadius="3px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(0,0,0,1)"
          {...getOverrideProps(overrides, "Button12947")}
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
          justifyContent="unset"
          letterSpacing="1.15px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="8px"
          left="35px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          text={BackLabel}
          children="Back"
          {...getOverrideProps(overrides, "Text12948")}
        ></Text>
      </View>
      <View
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="calc(50% - 20px - 0px)"
        left="calc(50% - 71.5px - 0.5px)"
        padding="0px 0px 0px 0px"
        text={SLFLabel}
        onClick={onClickSLF}
        {...getOverrideProps(overrides, "Button2")}
      >
        <View
          width="143px"
          height="39px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="1px"
          left="0px"
          borderRadius="3px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(0,0,0,1)"
          {...getOverrideProps(overrides, "Button12953")}
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
          justifyContent="unset"
          letterSpacing="1.15px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="9px"
          left="38px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          transform="translate(-20%,-10%)"
          children="LanternFly"
          {...getOverrideProps(overrides, "Text12954")}
        ></Text>
      </View>
      <View
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="calc(50% - 20px - 49px)"
        left="calc(50% - 71.5px - 0.5px)"
        padding="0px 0px 0px 0px"
        text={GBMLabel}
        onClick={onClickGBM}
        {...getOverrideProps(overrides, "Button1")}
      >
        <View
          width="143px"
          height="39px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="1px"
          left="0px"
          borderRadius="3px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(0,0,0,1)"
          {...getOverrideProps(overrides, "Button12956")}
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
          justifyContent="unset"
          letterSpacing="1.15px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="9px"
          left="38px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          text={GBMLabel}
          transform="translate(-20%, 0%)"
          children="GrapeMoth"
          {...getOverrideProps(overrides, "Text12957")}
        ></Text>
      </View>
      <View
        width="143px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="calc(50% - 20px - -46px)"
        left="calc(50% - 71.5px - 0.5px)"
        padding="0px 0px 0px 0px"
        text={UnknownLabel}
        onClick={onClickUnknown}
        {...getOverrideProps(overrides, "Button3")}
      >
        <View
          width="143px"
          height="39px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="1px"
          left="0px"
          borderRadius="3px"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(0,0,0,1)"
          {...getOverrideProps(overrides, "Button12959")}
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
          justifyContent="unset"
          letterSpacing="1.15px"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="9px"
          left="38px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          text={UnknownLabel}
          transform="translate(-15%, -10%)"
          children="Unknown"
          {...getOverrideProps(overrides, "Text12960")}
        ></Text>
      </View>
    </View>
  );
}
