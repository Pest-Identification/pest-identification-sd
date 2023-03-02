/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentCardOverridesProps = {
<<<<<<< HEAD
    CommentCard?: PrimitiveOverrideProps<FlexProps>;
=======
    "99111112"?: PrimitiveOverrideProps<TextProps>;
    "99111115"?: PrimitiveOverrideProps<TextProps>;
    "99111118"?: PrimitiveOverrideProps<TextProps>;
    CommentCard?: PrimitiveOverrideProps<FlexProps>;
    Liked?: PrimitiveOverrideProps<FlexProps>;
    "User Liked"?: PrimitiveOverrideProps<FlexProps>;
    MyIcon11196?: PrimitiveOverrideProps<ViewProps>;
    "Danny liked this"?: PrimitiveOverrideProps<TextProps>;
>>>>>>> Pulled ui
    Body?: PrimitiveOverrideProps<FlexProps>;
    Frame111100?: PrimitiveOverrideProps<FlexProps>;
    Frame111101?: PrimitiveOverrideProps<FlexProps>;
    Frame111102?: PrimitiveOverrideProps<FlexProps>;
    Author?: PrimitiveOverrideProps<TextProps>;
    Timestamp?: PrimitiveOverrideProps<TextProps>;
    "Lorem ipsum"?: PrimitiveOverrideProps<TextProps>;
    Frame111106?: PrimitiveOverrideProps<FlexProps>;
<<<<<<< HEAD
    MyIcon?: PrimitiveOverrideProps<ViewProps>;
    "\u201CLorem ipsum dolor sit amet, consectetur adipiscing elit. \u201D"?: PrimitiveOverrideProps<TextProps>;
=======
    MyIcon111107?: PrimitiveOverrideProps<ViewProps>;
    "\u201CLorem ipsum dolor sit amet, consectetur adipiscing elit. \u201D"?: PrimitiveOverrideProps<TextProps>;
    Share111109?: PrimitiveOverrideProps<FlexProps>;
    Share111110?: PrimitiveOverrideProps<FlexProps>;
    MyIcon111111?: PrimitiveOverrideProps<ViewProps>;
    Repost?: PrimitiveOverrideProps<FlexProps>;
    MyIcon111114?: PrimitiveOverrideProps<ViewProps>;
    Like?: PrimitiveOverrideProps<FlexProps>;
    MyIcon111117?: PrimitiveOverrideProps<ViewProps>;
    MyIcon111119?: PrimitiveOverrideProps<ViewProps>;
>>>>>>> Pulled ui
} & EscapeHatchProps;
export declare type CommentCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: CommentCardOverridesProps | undefined | null;
}>;
export default function CommentCard(props: CommentCardProps): React.ReactElement;
