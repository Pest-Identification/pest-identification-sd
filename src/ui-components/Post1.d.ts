/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type Post1InputValues = {
    authorID?: string;
    title?: string;
    body?: string;
};
export declare type Post1ValidationValues = {
    authorID?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    body?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type Post1OverridesProps = {
    Post1Grid?: PrimitiveOverrideProps<GridProps>;
    authorID?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    body?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type Post1Props = React.PropsWithChildren<{
    overrides?: Post1OverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: Post1InputValues) => Post1InputValues;
    onSuccess?: (fields: Post1InputValues) => void;
    onError?: (fields: Post1InputValues, errorMessage: string) => void;
    onChange?: (fields: Post1InputValues) => Post1InputValues;
    onValidate?: Post1ValidationValues;
} & React.CSSProperties>;
export default function Post1(props: Post1Props): React.ReactElement;
