/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PostProps } from "./Post";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCollectionOverridesProps = {
    PostCollection?: PrimitiveOverrideProps<CollectionProps>;
    Post?: PostProps;
} & EscapeHatchProps;
export declare type PostCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => PostProps;
} & {
    overrides?: PostCollectionOverridesProps | undefined | null;
}>;
export default function PostCollection(props: PostCollectionProps): React.ReactElement;
