/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, Text, View } from "@aws-amplify/ui-react";
export default function InnerPage(props) {
  const { overrides, ...rest } = props;
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
      {...getOverrideProps(overrides, "InnerPage")}
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
      <View
        width="82px"
        height="71px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0.24%"
        bottom="91.35%"
        left="0%"
        right="78.97%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217,217,217,1)"
        {...getOverrideProps(overrides, "Rectangle 5")}
      ></View>
      <Icon
        width="31px"
        height="0px"
        viewBox={{ minX: 0, minY: 0, width: 31, height: 1 }}
        paths={[
          {
            d: "M32.0607 1.06066C32.6464 0.474874 32.6464 -0.474874 32.0607 -1.06066L22.5147 -10.6066C21.9289 -11.1924 20.9792 -11.1924 20.3934 -10.6066C19.8076 -10.0208 19.8076 -9.07107 20.3934 -8.48528L28.8787 0L20.3934 8.48528C19.8076 9.07107 19.8076 10.0208 20.3934 10.6066C20.9792 11.1924 21.9289 11.1924 22.5147 10.6066L32.0607 1.06066ZM0 1.5L31 1.5L31 -1.5L0 -1.5L0 1.5Z",
            stroke: "rgba(0,0,0,1)",
            fillRule: "nonzero",
            strokeWidth: 3,
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="4.5%"
        bottom="95.5%"
        left="15.13%"
        right="76.92%"
        transformOrigin="top left"
        transform="rotate(180deg)"
        {...getOverrideProps(overrides, "Arrow 1")}
      ></Icon>
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
        left="15.13%"
        right="14.87%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Title"
        {...getOverrideProps(overrides, "Title")}
      ></Text>
    </View>
  );
}
