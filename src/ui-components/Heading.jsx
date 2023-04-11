/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function Heading(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        label: {
          fontSize: "16px",
          fontWeight: "800",
          lineHeight: "20px",
          children: "Heading 6",
        },
        Heading: { justifyContent: "flex-start", alignItems: "flex-start" },
      },
      variantValues: { level: "6" },
    },
    {
      overrides: {
        label: {
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "25px",
          children: "Heading 5",
        },
        Heading: { justifyContent: "flex-start", alignItems: "flex-start" },
      },
      variantValues: { level: "5" },
    },
    {
      overrides: {
        label: {
          fontSize: "24px",
          fontWeight: "600",
          lineHeight: "30px",
          children: "Heading 4",
        },
        Heading: { justifyContent: "flex-start", alignItems: "flex-start" },
      },
      variantValues: { level: "4" },
    },
    {
      overrides: {
        label: {
          fontSize: "32px",
          fontWeight: "500",
          lineHeight: "40px",
          children: "Heading 3",
        },
        Heading: { justifyContent: "flex-start", alignItems: "flex-start" },
      },
      variantValues: { level: "3" },
    },
    {
      overrides: {
        label: {
          fontSize: "40px",
          fontWeight: "400",
          lineHeight: "50px",
          children: "Heading 2",
        },
        Heading: { justifyContent: "flex-start", alignItems: "flex-start" },
      },
      variantValues: { level: "2" },
    },
    { overrides: { label: {}, Heading: {} }, variantValues: { level: "1" } },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Flex
      gap="0"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="0px 0px 0px 0px"
      display="flex"
      {...getOverrideProps(overrides, "Heading")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="48px"
        fontWeight="300"
        color="rgba(13,26,38,1)"
        lineHeight="60px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Heading 1"
        {...getOverrideProps(overrides, "label")}
      ></Text>
    </Flex>
  );
}
