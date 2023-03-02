/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BaseButtonProps } from "./BaseButton";
import { FlexProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MainMenuOverridesProps = {
    MainMenu?: PrimitiveOverrideProps<ViewProps>;
    "Background 1"?: PrimitiveOverrideProps<FlexProps>;
    Button1?: BaseButtonProps;
    Button2?: BaseButtonProps;
} & EscapeHatchProps;
export declare type MainMenuProps = React.PropsWithChildren<Partial<ViewProps> & {
    b1Label?: String;
    b2Label?: String;
    b1onClick?: String;
    b2onClick?: String;
} & {
    overrides?: MainMenuOverridesProps | undefined | null;
}>;
export default function MainMenu(props: MainMenuProps): React.ReactElement;
