/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { DiscussionBoard } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DiscussionBoardUpdateFormInputValues = {};
export declare type DiscussionBoardUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DiscussionBoardUpdateFormOverridesProps = {
    DiscussionBoardUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type DiscussionBoardUpdateFormProps = React.PropsWithChildren<{
    overrides?: DiscussionBoardUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    discussionBoard?: DiscussionBoard;
    onSubmit?: (fields: DiscussionBoardUpdateFormInputValues) => DiscussionBoardUpdateFormInputValues;
    onSuccess?: (fields: DiscussionBoardUpdateFormInputValues) => void;
    onError?: (fields: DiscussionBoardUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DiscussionBoardUpdateFormInputValues) => DiscussionBoardUpdateFormInputValues;
    onValidate?: DiscussionBoardUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DiscussionBoardUpdateForm(props: DiscussionBoardUpdateFormProps): React.ReactElement;
