/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon } from "@aws-amplify/ui-react";
export default function CameraIntake(props) {
  const { overrides, ...rest } = props;
  return (
    <Icon
      width="95px"
      height="95px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      viewBox={{ minX: 0, minY: 0, width: 95, height: 95 }}
      paths={[
        {
          d: "M95 47.5C95 73.7335 73.7335 95 47.5 95C21.2665 95 0 73.7335 0 47.5C0 21.2665 21.2665 0 47.5 0C73.7335 0 95 21.2665 95 47.5Z",
          fill: "rgba(255,255,255,1)",
          fillRule: "nonzero",
          style: { transform: "translate(0%, 0%)" },
        },
      ]}
      {...getOverrideProps(overrides, "CameraIntake")}
      {...rest}
    ></Icon>
  );
}
