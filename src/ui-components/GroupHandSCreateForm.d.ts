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
export declare type GroupHandSCreateFormInputValues = {
    groupHSExp?: string;
    groupHSNo?: string;
    groupHSUpload?: string[];
};
export declare type GroupHandSCreateFormValidationValues = {
    groupHSExp?: ValidationFunction<string>;
    groupHSNo?: ValidationFunction<string>;
    groupHSUpload?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroupHandSCreateFormOverridesProps = {
    GroupHandSCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    groupHSExp?: PrimitiveOverrideProps<TextFieldProps>;
    groupHSNo?: PrimitiveOverrideProps<TextFieldProps>;
    groupHSUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type GroupHandSCreateFormProps = React.PropsWithChildren<{
    overrides?: GroupHandSCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GroupHandSCreateFormInputValues) => GroupHandSCreateFormInputValues;
    onSuccess?: (fields: GroupHandSCreateFormInputValues) => void;
    onError?: (fields: GroupHandSCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GroupHandSCreateFormInputValues) => GroupHandSCreateFormInputValues;
    onValidate?: GroupHandSCreateFormValidationValues;
} & React.CSSProperties>;
export default function GroupHandSCreateForm(props: GroupHandSCreateFormProps): React.ReactElement;
