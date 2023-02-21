/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SLFReportData } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SLFReportDataUpdateFormInputValues = {
    location?: string;
    time?: string;
    image?: string;
};
export declare type SLFReportDataUpdateFormValidationValues = {
    location?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SLFReportDataUpdateFormOverridesProps = {
    SLFReportDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SLFReportDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: SLFReportDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sLFReportData?: SLFReportData;
    onSubmit?: (fields: SLFReportDataUpdateFormInputValues) => SLFReportDataUpdateFormInputValues;
    onSuccess?: (fields: SLFReportDataUpdateFormInputValues) => void;
    onError?: (fields: SLFReportDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SLFReportDataUpdateFormInputValues) => SLFReportDataUpdateFormInputValues;
    onValidate?: SLFReportDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SLFReportDataUpdateForm(props: SLFReportDataUpdateFormProps): React.ReactElement;
