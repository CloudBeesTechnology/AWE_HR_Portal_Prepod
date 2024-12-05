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
export declare type InsuranceTypeCreateFormInputValues = {
    typeIns?: string;
    insDetails?: string[];
};
export declare type InsuranceTypeCreateFormValidationValues = {
    typeIns?: ValidationFunction<string>;
    insDetails?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InsuranceTypeCreateFormOverridesProps = {
    InsuranceTypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    typeIns?: PrimitiveOverrideProps<TextFieldProps>;
    insDetails?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InsuranceTypeCreateFormProps = React.PropsWithChildren<{
    overrides?: InsuranceTypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InsuranceTypeCreateFormInputValues) => InsuranceTypeCreateFormInputValues;
    onSuccess?: (fields: InsuranceTypeCreateFormInputValues) => void;
    onError?: (fields: InsuranceTypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InsuranceTypeCreateFormInputValues) => InsuranceTypeCreateFormInputValues;
    onValidate?: InsuranceTypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function InsuranceTypeCreateForm(props: InsuranceTypeCreateFormProps): React.ReactElement;
