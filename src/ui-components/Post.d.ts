/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostOverridesProps = {
    Post?: PrimitiveOverrideProps<FlexProps>;
    Body11167?: PrimitiveOverrideProps<FlexProps>;
    Text?: PrimitiveOverrideProps<FlexProps>;
    Headline?: PrimitiveOverrideProps<FlexProps>;
    Body11170?: PrimitiveOverrideProps<TextProps>;
    Subtext?: PrimitiveOverrideProps<FlexProps>;
    Body11172?: PrimitiveOverrideProps<TextProps>;
    Body11173?: PrimitiveOverrideProps<TextProps>;
    Article?: PrimitiveOverrideProps<FlexProps>;
    Body11176?: PrimitiveOverrideProps<TextProps>;
    Share11177?: PrimitiveOverrideProps<FlexProps>;
    Share11178?: PrimitiveOverrideProps<TextProps>;
    Readmore11183?: PrimitiveOverrideProps<FlexProps>;
    Readmore11185?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type PostProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: PostOverridesProps | undefined | null;
}>;
export default function Post(props: PostProps): React.ReactElement;
