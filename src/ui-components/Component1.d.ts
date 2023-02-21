/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
import { CameraIntakeProps } from "./CameraIntake";
import { SyntheticEvent } from "react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Component1OverridesProps = {
    Component1?: PrimitiveOverrideProps<ViewProps>;
    "Spotted_lanternfly_in_BBG_(42972) 2"?: PrimitiveOverrideProps<ImageProps>;
    "Rectangle 4"?: PrimitiveOverrideProps<ViewProps>;
    "Camera Intake"?: CameraIntakeProps;
    "Ellipse 3"?: PrimitiveOverrideProps<IconProps>;
    "Frame 1"?: PrimitiveOverrideProps<ViewProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 5"?: PrimitiveOverrideProps<ViewProps>;
    "Automatic Identification"?: PrimitiveOverrideProps<TextProps>;
    "Arrow 2"?: PrimitiveOverrideProps<IconProps>;
    "Arrow 1"?: PrimitiveOverrideProps<IconProps>;
    "Ellipse 1"?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 6"?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type Component1Props = React.PropsWithChildren<Partial<ViewProps> & {
    TakePicture?: (event: SyntheticEvent) => void;
    CameraScreen?: React.ReactNode;
} & {
    overrides?: Component1OverridesProps | undefined | null;
}>;
export default function Component1(props: Component1Props): React.ReactElement;
