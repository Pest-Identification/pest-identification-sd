/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReplyFormInputValues = {
    body?: string;
};
export declare type ReplyFormValidationValues = {
    body?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReplyFormOverridesProps = {
    ReplyFormGrid?: PrimitiveOverrideProps<GridProps>;
    body?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ReplyFormProps = React.PropsWithChildren<{
    overrides?: ReplyFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReplyFormInputValues) => ReplyFormInputValues;
    onSuccess?: (fields: ReplyFormInputValues) => void;
    onError?: (fields: ReplyFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ReplyFormInputValues) => ReplyFormInputValues;
    onValidate?: ReplyFormValidationValues;
} & React.CSSProperties>;
export default function ReplyForm(props: ReplyFormProps): React.ReactElement;
