/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReportFormInputValues = {
    pestSubmitted?: string;
    image?: string;
    longitude?: number;
    latitude?: number;
    address_number?: string;
    address_street?: string;
    address_neighborhood?: string;
    address_municipality?: string;
    address_region?: string;
    address_country?: string;
    address_postalCode?: string;
};
export declare type ReportFormValidationValues = {
    pestSubmitted?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    longitude?: ValidationFunction<number>;
    latitude?: ValidationFunction<number>;
    address_number?: ValidationFunction<string>;
    address_street?: ValidationFunction<string>;
    address_neighborhood?: ValidationFunction<string>;
    address_municipality?: ValidationFunction<string>;
    address_region?: ValidationFunction<string>;
    address_country?: ValidationFunction<string>;
    address_postalCode?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportFormOverridesProps = {
    ReportFormGrid?: PrimitiveOverrideProps<GridProps>;
    pestSubmitted?: PrimitiveOverrideProps<SelectFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    longitude?: PrimitiveOverrideProps<TextFieldProps>;
    latitude?: PrimitiveOverrideProps<TextFieldProps>;
    address_number?: PrimitiveOverrideProps<TextFieldProps>;
    address_street?: PrimitiveOverrideProps<TextFieldProps>;
    address_neighborhood?: PrimitiveOverrideProps<TextFieldProps>;
    address_municipality?: PrimitiveOverrideProps<TextFieldProps>;
    address_region?: PrimitiveOverrideProps<TextFieldProps>;
    address_country?: PrimitiveOverrideProps<TextFieldProps>;
    address_postalCode?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReportFormProps = React.PropsWithChildren<{
    overrides?: ReportFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReportFormInputValues) => ReportFormInputValues;
    onSuccess?: (fields: ReportFormInputValues) => void;
    onError?: (fields: ReportFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ReportFormInputValues) => ReportFormInputValues;
    onValidate?: ReportFormValidationValues;
} & React.CSSProperties>;
export default function ReportForm(props: ReportFormProps): React.ReactElement;
