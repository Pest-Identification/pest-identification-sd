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
export declare type GBMReportDataCreateFormInputValues = {
    location?: string;
    time?: string;
    image?: string;
};
export declare type GBMReportDataCreateFormValidationValues = {
    location?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GBMReportDataCreateFormOverridesProps = {
    GBMReportDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GBMReportDataCreateFormProps = React.PropsWithChildren<{
    overrides?: GBMReportDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GBMReportDataCreateFormInputValues) => GBMReportDataCreateFormInputValues;
    onSuccess?: (fields: GBMReportDataCreateFormInputValues) => void;
    onError?: (fields: GBMReportDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GBMReportDataCreateFormInputValues) => GBMReportDataCreateFormInputValues;
    onValidate?: GBMReportDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function GBMReportDataCreateForm(props: GBMReportDataCreateFormProps): React.ReactElement;
