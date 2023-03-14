/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
import { SyntheticEvent } from "react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportViewOverridesProps = {
    ReportView?: PrimitiveOverrideProps<FlexProps>;
    Image?: PrimitiveOverrideProps<ImageProps>;
    Species?: PrimitiveOverrideProps<TextProps>;
    Date?: PrimitiveOverrideProps<TextProps>;
    User?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ReportViewProps = React.PropsWithChildren<Partial<FlexProps> & {
    onClick?: (event: SyntheticEvent) => void;
    image?: String;
    species?: String;
    date?: String;
    user?: String;
} & {
    overrides?: ReportViewOverridesProps | undefined | null;
}>;
export default function ReportView(props: ReportViewProps): React.ReactElement;
