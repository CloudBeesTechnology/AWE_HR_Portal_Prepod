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
export declare type SelectedCandidateSchemaUpdateFormInputValues = {
    name?: string;
    position?: string;
    department?: string;
};
export declare type SelectedCandidateSchemaUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SelectedCandidateSchemaUpdateFormOverridesProps = {
    SelectedCandidateSchemaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SelectedCandidateSchemaUpdateFormProps = React.PropsWithChildren<{
    overrides?: SelectedCandidateSchemaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    selectedCandidateSchema?: any;
    onSubmit?: (fields: SelectedCandidateSchemaUpdateFormInputValues) => SelectedCandidateSchemaUpdateFormInputValues;
    onSuccess?: (fields: SelectedCandidateSchemaUpdateFormInputValues) => void;
    onError?: (fields: SelectedCandidateSchemaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SelectedCandidateSchemaUpdateFormInputValues) => SelectedCandidateSchemaUpdateFormInputValues;
    onValidate?: SelectedCandidateSchemaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SelectedCandidateSchemaUpdateForm(props: SelectedCandidateSchemaUpdateFormProps): React.ReactElement;
