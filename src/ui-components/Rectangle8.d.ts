/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Rectangle8OverridesProps = {
    Rectangle8?: PrimitiveOverrideProps<FlexProps>;
    "Rectangle 9"?: PrimitiveOverrideProps<ViewProps>;
    "Spotted_lanternfly_in_BBG_(42972) 3"?: PrimitiveOverrideProps<ImageProps>;
    "Submitted on: DATE by USER"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type Rectangle8Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: Rectangle8OverridesProps | undefined | null;
}>;
export default function Rectangle8(props: Rectangle8Props): React.ReactElement;
