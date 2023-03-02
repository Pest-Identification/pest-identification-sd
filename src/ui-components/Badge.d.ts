/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BadgeOverridesProps = {
    Badge?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type BadgeProps = React.PropsWithChildren<Partial<FlexProps> & {
    size?: "default" | "large" | "small";
    variation?: "default" | "error" | "info" | "success" | "warning";
} & {
    overrides?: BadgeOverridesProps | undefined | null;
}>;
export default function Badge(props: BadgeProps): React.ReactElement;
