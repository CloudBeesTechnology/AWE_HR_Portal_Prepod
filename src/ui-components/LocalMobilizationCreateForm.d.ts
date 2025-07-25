/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LocalMobilizationCreateFormInputValues = {
    tempID?: string;
    mobSignDate?: string;
    mobFile?: string;
    paafApproveDate?: string;
    paafFile?: string;
    loiIssueDate?: string;
    loiAcceptDate?: string;
    loiDeclineDate?: string;
    declineReason?: string;
    loiFile?: string;
    cvecApproveDate?: string;
    cvecFile?: string;
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type LocalMobilizationCreateFormValidationValues = {
    tempID?: ValidationFunction<string>;
    mobSignDate?: ValidationFunction<string>;
    mobFile?: ValidationFunction<string>;
    paafApproveDate?: ValidationFunction<string>;
    paafFile?: ValidationFunction<string>;
    loiIssueDate?: ValidationFunction<string>;
    loiAcceptDate?: ValidationFunction<string>;
    loiDeclineDate?: ValidationFunction<string>;
    declineReason?: ValidationFunction<string>;
    loiFile?: ValidationFunction<string>;
    cvecApproveDate?: ValidationFunction<string>;
    cvecFile?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LocalMobilizationCreateFormOverridesProps = {
    LocalMobilizationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
    mobSignDate?: PrimitiveOverrideProps<TextFieldProps>;
    mobFile?: PrimitiveOverrideProps<TextFieldProps>;
    paafApproveDate?: PrimitiveOverrideProps<TextFieldProps>;
    paafFile?: PrimitiveOverrideProps<TextFieldProps>;
    loiIssueDate?: PrimitiveOverrideProps<TextFieldProps>;
    loiAcceptDate?: PrimitiveOverrideProps<TextFieldProps>;
    loiDeclineDate?: PrimitiveOverrideProps<TextFieldProps>;
    declineReason?: PrimitiveOverrideProps<TextFieldProps>;
    loiFile?: PrimitiveOverrideProps<TextFieldProps>;
    cvecApproveDate?: PrimitiveOverrideProps<TextFieldProps>;
    cvecFile?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type LocalMobilizationCreateFormProps = React.PropsWithChildren<{
    overrides?: LocalMobilizationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LocalMobilizationCreateFormInputValues) => LocalMobilizationCreateFormInputValues;
    onSuccess?: (fields: LocalMobilizationCreateFormInputValues) => void;
    onError?: (fields: LocalMobilizationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LocalMobilizationCreateFormInputValues) => LocalMobilizationCreateFormInputValues;
    onValidate?: LocalMobilizationCreateFormValidationValues;
} & React.CSSProperties>;
export default function LocalMobilizationCreateForm(props: LocalMobilizationCreateFormProps): React.ReactElement;
