/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SelectFieldOverridesProps = {
    SelectField?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
    descriptiveText?: PrimitiveOverrideProps<TextProps>;
    InputGroup?: PrimitiveOverrideProps<FlexProps>;
    Input?: PrimitiveOverrideProps<FlexProps>;
    placeholder?: PrimitiveOverrideProps<TextProps>;
    Icon?: PrimitiveOverrideProps<ViewProps>;
    border?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type SelectFieldProps = React.PropsWithChildren<Partial<FlexProps> & {
    isDisabled?: "false" | "true";
    labelHidden?: "false" | "true";
    size?: "default" | "large" | "small";
    variation?: "default" | "quiet";
} & {
    overrides?: SelectFieldOverridesProps | undefined | null;
}>;
export default function SelectField(props: SelectFieldProps): React.ReactElement;
