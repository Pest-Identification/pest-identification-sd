/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IdentifyButtonProps } from "./IdentifyButton";
import { ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReferenceButtonOverridesProps = {
    ReferenceButton?: PrimitiveOverrideProps<ViewProps>;
    "Identify Button"?: IdentifyButtonProps;
} & EscapeHatchProps;
export declare type ReferenceButtonProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: ReferenceButtonOverridesProps | undefined | null;
}>;
export default function ReferenceButton(props: ReferenceButtonProps): React.ReactElement;
