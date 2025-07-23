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
export declare type EmployeeNonLocalAccoCreateFormInputValues = {
    empID?: string;
    accommodation?: string[];
    accommodationAddress?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type EmployeeNonLocalAccoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    accommodation?: ValidationFunction<string>;
    accommodationAddress?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeeNonLocalAccoCreateFormOverridesProps = {
    EmployeeNonLocalAccoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    accommodation?: PrimitiveOverrideProps<TextFieldProps>;
    accommodationAddress?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type EmployeeNonLocalAccoCreateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeNonLocalAccoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmployeeNonLocalAccoCreateFormInputValues) => EmployeeNonLocalAccoCreateFormInputValues;
    onSuccess?: (fields: EmployeeNonLocalAccoCreateFormInputValues) => void;
    onError?: (fields: EmployeeNonLocalAccoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeNonLocalAccoCreateFormInputValues) => EmployeeNonLocalAccoCreateFormInputValues;
    onValidate?: EmployeeNonLocalAccoCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeNonLocalAccoCreateForm(props: EmployeeNonLocalAccoCreateFormProps): React.ReactElement;
