/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HeadingOverridesProps = {
    Heading?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type HeadingProps = React.PropsWithChildren<Partial<FlexProps> & {
    level?: "1" | "2" | "3" | "4" | "5" | "6";
} & {
    overrides?: HeadingOverridesProps | undefined | null;
}>;
export default function Heading(props: HeadingProps): React.ReactElement;
