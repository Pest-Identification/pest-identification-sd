/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RatingOverridesProps = {
    Rating?: PrimitiveOverrideProps<FlexProps>;
    Icon111368?: PrimitiveOverrideProps<ViewProps>;
    Icon111369?: PrimitiveOverrideProps<ViewProps>;
    Icon111370?: PrimitiveOverrideProps<ViewProps>;
    Icon111371?: PrimitiveOverrideProps<ViewProps>;
    Icon111372?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type RatingProps = React.PropsWithChildren<Partial<FlexProps> & {
    size?: "default" | "large" | "small";
} & {
    overrides?: RatingOverridesProps | undefined | null;
}>;
export default function Rating(props: RatingProps): React.ReactElement;
