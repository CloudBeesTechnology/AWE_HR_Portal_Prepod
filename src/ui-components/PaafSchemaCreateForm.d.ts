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
export declare type PaafSchemaCreateFormInputValues = {
    paafApproveDate?: string;
    paafFile?: string;
};
export declare type PaafSchemaCreateFormValidationValues = {
    paafApproveDate?: ValidationFunction<string>;
    paafFile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PaafSchemaCreateFormOverridesProps = {
    PaafSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paafApproveDate?: PrimitiveOverrideProps<TextFieldProps>;
    paafFile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PaafSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: PaafSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PaafSchemaCreateFormInputValues) => PaafSchemaCreateFormInputValues;
    onSuccess?: (fields: PaafSchemaCreateFormInputValues) => void;
    onError?: (fields: PaafSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PaafSchemaCreateFormInputValues) => PaafSchemaCreateFormInputValues;
    onValidate?: PaafSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function PaafSchemaCreateForm(props: PaafSchemaCreateFormProps): React.ReactElement;
