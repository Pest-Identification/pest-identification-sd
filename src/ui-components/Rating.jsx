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
import { Flex, View } from "@aws-amplify/ui-react";
export default function Rating(props) {
  const { overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: {
        Icon111368: {},
        Icon111369: {},
        Icon111370: {},
        Icon111371: {},
        Icon111372: {},
        Rating: {},
      },
      variantValues: { size: "default" },
    },
    {
      overrides: {
        Icon111368: { width: "16px", height: "16px" },
        Icon111369: { width: "16px", height: "16px" },
        Icon111370: { width: "16px", height: "16px" },
        Icon111371: { width: "16px", height: "16px" },
        Icon111372: { width: "16px", height: "16px" },
        Rating: {},
      },
      variantValues: { size: "small" },
    },
    {
      overrides: {
        Icon111368: { width: "36px", height: "36px" },
        Icon111369: { width: "36px", height: "36px" },
        Icon111370: { width: "36px", height: "36px" },
        Icon111371: { width: "36px", height: "36px" },
        Icon111372: { width: "36px", height: "36px" },
        Rating: {},
      },
      variantValues: { size: "large" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Flex
      gap="8px"
      direction="row"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="center"
      position="relative"
      padding="0px 0px 0px 0px"
      display="flex"
      {...getOverrideProps(overrides, "Rating")}
      {...rest}
    >
      <View
        width="24px"
        height="24px"
        {...getOverrideProps(overrides, "Icon111368")}
      ></View>
      <View
        width="24px"
        height="24px"
        {...getOverrideProps(overrides, "Icon111369")}
      ></View>
      <View
        width="24px"
        height="24px"
        {...getOverrideProps(overrides, "Icon111370")}
      ></View>
      <View
        width="24px"
        height="24px"
        {...getOverrideProps(overrides, "Icon111371")}
      ></View>
      <View
        width="24px"
        height="24px"
        {...getOverrideProps(overrides, "Icon111372")}
      ></View>
    </Flex>
  );
}
