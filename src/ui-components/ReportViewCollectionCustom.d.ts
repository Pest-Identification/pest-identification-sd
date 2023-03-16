/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ReportViewProps } from "./ReportView";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportViewCollectionOverridesProps = {
    ReportViewCollection?: PrimitiveOverrideProps<CollectionProps>;
    ReportView?: ReportViewProps;
} & EscapeHatchProps;
export declare type ReportViewCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => ReportViewProps;
} & {
    overrides?: ReportViewCollectionOverridesProps | undefined | null;
}>;
export default function ReportViewCollectionCustom(props: ReportViewCollectionProps): React.ReactElement;
