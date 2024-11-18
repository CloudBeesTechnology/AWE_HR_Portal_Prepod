/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SelectedCandidateSchemaCreateFormInputValues = {
    name?: string;
    position?: string;
    department?: string;
};
export declare type SelectedCandidateSchemaCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SelectedCandidateSchemaCreateFormOverridesProps = {
    SelectedCandidateSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SelectedCandidateSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: SelectedCandidateSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SelectedCandidateSchemaCreateFormInputValues) => SelectedCandidateSchemaCreateFormInputValues;
    onSuccess?: (fields: SelectedCandidateSchemaCreateFormInputValues) => void;
    onError?: (fields: SelectedCandidateSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SelectedCandidateSchemaCreateFormInputValues) => SelectedCandidateSchemaCreateFormInputValues;
    onValidate?: SelectedCandidateSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function SelectedCandidateSchemaCreateForm(props: SelectedCandidateSchemaCreateFormProps): React.ReactElement;
