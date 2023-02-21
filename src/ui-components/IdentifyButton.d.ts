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
export declare type IdentifyButtonOverridesProps = {
    IdentifyButton?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<ViewProps>;
    IDENTIFY?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type IdentifyButtonProps = React.PropsWithChildren<Partial<ViewProps> & {
    identifyButton?: (event: SyntheticEvent) => void;
} & {
    overrides?: IdentifyButtonOverridesProps | undefined | null;
}>;
export default function IdentifyButton(props: IdentifyButtonProps): React.ReactElement;
