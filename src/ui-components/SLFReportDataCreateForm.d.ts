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
export declare type SLFReportDataCreateFormInputValues = {
    location?: string;
    time?: string;
    image?: string;
};
export declare type SLFReportDataCreateFormValidationValues = {
    location?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SLFReportDataCreateFormOverridesProps = {
    SLFReportDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SLFReportDataCreateFormProps = React.PropsWithChildren<{
    overrides?: SLFReportDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SLFReportDataCreateFormInputValues) => SLFReportDataCreateFormInputValues;
    onSuccess?: (fields: SLFReportDataCreateFormInputValues) => void;
    onError?: (fields: SLFReportDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SLFReportDataCreateFormInputValues) => SLFReportDataCreateFormInputValues;
    onValidate?: SLFReportDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function SLFReportDataCreateForm(props: SLFReportDataCreateFormProps): React.ReactElement;
