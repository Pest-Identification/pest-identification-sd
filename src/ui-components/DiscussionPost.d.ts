/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DiscussionPostOverridesProps = {
    DiscussionPost?: PrimitiveOverrideProps<FlexProps>;
    Body?: PrimitiveOverrideProps<FlexProps>;
    Text?: PrimitiveOverrideProps<FlexProps>;
    Headline?: PrimitiveOverrideProps<FlexProps>;
    "New Amplify Studio gives designers the ability to export UI to React code"?: PrimitiveOverrideProps<TextProps>;
    Frame?: PrimitiveOverrideProps<FlexProps>;
    "Nikhil S"?: PrimitiveOverrideProps<TextProps>;
    "2nd December 2021"?: PrimitiveOverrideProps<TextProps>;
    Article?: PrimitiveOverrideProps<FlexProps>;
    MyIcon11175?: PrimitiveOverrideProps<ViewProps>;
    "AWS Amplify Studio is a visual development environment for building full-stack web and mobile apps that grows with your business. Studio builds on existing backend building capabilities in AWS Amplify, allowing you to build your UI faster with a set of ready-to-use UI components that are editable in Figma. With Studio, you can quickly build an entire web app, front-to-back, with minimal coding, while still maintaining full control over your app design and behavior through code. Ship faster, scale effortlessly, and delight every user."?: PrimitiveOverrideProps<TextProps>;
    Share11177?: PrimitiveOverrideProps<FlexProps>;
    Share11178?: PrimitiveOverrideProps<TextProps>;
    MyIcon11179?: PrimitiveOverrideProps<ViewProps>;
    MyIcon11180?: PrimitiveOverrideProps<ViewProps>;
    MyIcon11181?: PrimitiveOverrideProps<ViewProps>;
    "Read more11183"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon11184?: PrimitiveOverrideProps<ViewProps>;
    "Read more11185"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type DiscussionPostProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: DiscussionPostOverridesProps | undefined | null;
}>;
export default function DiscussionPost(props: DiscussionPostProps): React.ReactElement;
