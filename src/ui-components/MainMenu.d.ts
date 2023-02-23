/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { BaseButtonProps } from "./BaseButton";
import { ViewProps } from "@aws-amplify/ui-react";
import { SyntheticEvent } from "react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MainMenuOverridesProps = {
    MainMenu?: PrimitiveOverrideProps<ViewProps>;
    BaseButton85350?: BaseButtonProps;
    BaseButton85375?: BaseButtonProps;
} & EscapeHatchProps;
export declare type MainMenuProps = React.PropsWithChildren<Partial<ViewProps> & {
    b1Label?: String;
    b2Label?: String;
    test1?: (event: SyntheticEvent) => void;
} & {
    overrides?: MainMenuOverridesProps | undefined | null;
}>;
export default function MainMenu(props: MainMenuProps): React.ReactElement;
