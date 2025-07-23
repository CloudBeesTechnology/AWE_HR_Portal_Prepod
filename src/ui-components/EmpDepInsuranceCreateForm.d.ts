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
export declare type EmpDepInsuranceCreateFormInputValues = {
    empID?: string;
    depInsurance?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type EmpDepInsuranceCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    depInsurance?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpDepInsuranceCreateFormOverridesProps = {
    EmpDepInsuranceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    depInsurance?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type EmpDepInsuranceCreateFormProps = React.PropsWithChildren<{
    overrides?: EmpDepInsuranceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmpDepInsuranceCreateFormInputValues) => EmpDepInsuranceCreateFormInputValues;
    onSuccess?: (fields: EmpDepInsuranceCreateFormInputValues) => void;
    onError?: (fields: EmpDepInsuranceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpDepInsuranceCreateFormInputValues) => EmpDepInsuranceCreateFormInputValues;
    onValidate?: EmpDepInsuranceCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmpDepInsuranceCreateForm(props: EmpDepInsuranceCreateFormProps): React.ReactElement;
