/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { InnerPageProps } from "./InnerPage";
import { FlexProps, IconProps, ImageProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IdentificationOverridesProps = {
    Identification?: PrimitiveOverrideProps<ViewProps>;
    InnerPage?: InnerPageProps;
    Frame85279?: PrimitiveOverrideProps<FlexProps>;
    Rectangle85280?: PrimitiveOverrideProps<ViewProps>;
    Frame85281?: PrimitiveOverrideProps<FlexProps>;
    Rectangle85282?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 7"?: PrimitiveOverrideProps<ViewProps>;
    Rectangle85284?: PrimitiveOverrideProps<ViewProps>;
    Rectangle85285?: PrimitiveOverrideProps<ViewProps>;
    "Spotted_lanternfly_in_BBG_(42972) 2"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 4"?: PrimitiveOverrideProps<ViewProps>;
    "Frame 1"?: PrimitiveOverrideProps<ViewProps>;
    "Ellipse 2"?: PrimitiveOverrideProps<IconProps>;
    "Ellipse 3"?: PrimitiveOverrideProps<IconProps>;
    Vector85291?: PrimitiveOverrideProps<IconProps>;
    Vector85339?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type IdentificationProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: IdentificationOverridesProps | undefined | null;
}>;
export default function Identification(props: IdentificationProps): React.ReactElement;
