/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
import { SyntheticEvent } from "react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewIdentificationOverridesProps = {
    NewIdentification?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 6"?: PrimitiveOverrideProps<ViewProps>;
    Identification?: PrimitiveOverrideProps<TextProps>;
    BaseButton?: PrimitiveOverrideProps<ViewProps>;
    Button12947?: PrimitiveOverrideProps<ViewProps>;
    Text12948?: PrimitiveOverrideProps<TextProps>;
    Button2?: PrimitiveOverrideProps<ViewProps>;
    Button12953?: PrimitiveOverrideProps<ViewProps>;
    Text12954?: PrimitiveOverrideProps<TextProps>;
    Button1?: PrimitiveOverrideProps<ViewProps>;
    Button12956?: PrimitiveOverrideProps<ViewProps>;
    Text12957?: PrimitiveOverrideProps<TextProps>;
    Button3?: PrimitiveOverrideProps<ViewProps>;
    Button12959?: PrimitiveOverrideProps<ViewProps>;
    Text12960?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NewIdentificationProps = React.PropsWithChildren<Partial<ViewProps> & {
    onClickBack?: (event: SyntheticEvent) => void;
    onClickSLF?: (event: SyntheticEvent) => void;
    onClickGBM?: (event: SyntheticEvent) => void;
    onClickUnknown?: (event: SyntheticEvent) => void;
    SLFLabel?: String;
    GBMLabel?: String;
    UnknownLabel?: String;
    BackLabel?: String;
} & {
    overrides?: NewIdentificationOverridesProps | undefined | null;
}>;
export default function NewIdentification(props: NewIdentificationProps): React.ReactElement;
