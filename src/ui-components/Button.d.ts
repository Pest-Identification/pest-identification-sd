/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ButtonOverridesProps = {
    Button?: PrimitiveOverrideProps<FlexProps>;
    "Button Icon111419"?: PrimitiveOverrideProps<ViewProps>;
    label?: PrimitiveOverrideProps<TextProps>;
    "Button Icon111421"?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type ButtonProps = React.PropsWithChildren<Partial<FlexProps> & {
    isDisabled?: "false" | "true";
    size?: "default" | "large" | "small";
    variation?: "default" | "link" | "primary";
} & {
    overrides?: ButtonOverridesProps | undefined | null;
}>;
export default function Button(props: ButtonProps): React.ReactElement;
