/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps } from "@aws-amplify/ui-react";
import { ButtonProps } from "./Button";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SearchFieldOverridesProps = {
    SearchField?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
    descriptiveText?: PrimitiveOverrideProps<TextProps>;
    InputGroup?: PrimitiveOverrideProps<FlexProps>;
    Input?: PrimitiveOverrideProps<FlexProps>;
    placeholder?: PrimitiveOverrideProps<TextProps>;
    Button?: ButtonProps;
    border?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type SearchFieldProps = React.PropsWithChildren<Partial<FlexProps> & {
    isDisabled?: "false" | "true";
    labelHidden?: "false" | "true";
    size?: "default" | "large" | "small";
    variation?: "default" | "quiet";
} & {
    overrides?: SearchFieldOverridesProps | undefined | null;
}>;
export default function SearchField(props: SearchFieldProps): React.ReactElement;
