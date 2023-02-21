/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GBMReportData } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GBMReportDataUpdateFormInputValues = {
    location?: string;
    time?: string;
    image?: string;
};
export declare type GBMReportDataUpdateFormValidationValues = {
    location?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GBMReportDataUpdateFormOverridesProps = {
    GBMReportDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GBMReportDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: GBMReportDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gBMReportData?: GBMReportData;
    onSubmit?: (fields: GBMReportDataUpdateFormInputValues) => GBMReportDataUpdateFormInputValues;
    onSuccess?: (fields: GBMReportDataUpdateFormInputValues) => void;
    onError?: (fields: GBMReportDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GBMReportDataUpdateFormInputValues) => GBMReportDataUpdateFormInputValues;
    onValidate?: GBMReportDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GBMReportDataUpdateForm(props: GBMReportDataUpdateFormProps): React.ReactElement;
