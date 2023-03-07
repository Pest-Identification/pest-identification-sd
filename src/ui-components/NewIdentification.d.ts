/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { SyntheticEvent } from "react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewIdentificationOverridesProps = {
    NewIdentification?: PrimitiveOverrideProps<FlexProps>;
    InnerPage?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 6"?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 5"?: PrimitiveOverrideProps<ViewProps>;
    Identification?: PrimitiveOverrideProps<TextProps>;
    SelectField?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
    InputGroup?: PrimitiveOverrideProps<FlexProps>;
    Input?: PrimitiveOverrideProps<FlexProps>;
    placeholder?: PrimitiveOverrideProps<TextProps>;
    Icon?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    BaseButton117522?: PrimitiveOverrideProps<ViewProps>;
    Button117523?: PrimitiveOverrideProps<ViewProps>;
    Text117524?: PrimitiveOverrideProps<TextProps>;
    BaseButton117528?: PrimitiveOverrideProps<ViewProps>;
    Button117529?: PrimitiveOverrideProps<ViewProps>;
    Text117530?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NewIdentificationProps = React.PropsWithChildren<Partial<FlexProps> & {
    Return?: (event: SyntheticEvent) => void;
    Report?: (event: SyntheticEvent) => void;
    input?: React.ReactNode;
} & {
    overrides?: NewIdentificationOverridesProps | undefined | null;
}>;
export default function NewIdentification(props: NewIdentificationProps): React.ReactElement;
