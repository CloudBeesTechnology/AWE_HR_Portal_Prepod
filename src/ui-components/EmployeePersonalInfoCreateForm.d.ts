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
export declare type EmployeePersonalInfoCreateFormInputValues = {
    empID?: string;
    name?: string;
    gender?: string;
    dateOfBirth?: string;
    email?: string;
    nationality?: string;
    otherNationality?: string;
    religion?: string;
    marital?: string;
    race?: string;
    bruneiIcNo?: string;
    bruneiIcColour?: string;
    bruneiIcExpiry?: string;
    malaysianIcNumber?: string;
    malaysianIcExpiry?: string;
};
export declare type EmployeePersonalInfoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    nationality?: ValidationFunction<string>;
    otherNationality?: ValidationFunction<string>;
    religion?: ValidationFunction<string>;
    marital?: ValidationFunction<string>;
    race?: ValidationFunction<string>;
    bruneiIcNo?: ValidationFunction<string>;
    bruneiIcColour?: ValidationFunction<string>;
    bruneiIcExpiry?: ValidationFunction<string>;
    malaysianIcNumber?: ValidationFunction<string>;
    malaysianIcExpiry?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeePersonalInfoCreateFormOverridesProps = {
    EmployeePersonalInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
    otherNationality?: PrimitiveOverrideProps<TextFieldProps>;
    religion?: PrimitiveOverrideProps<TextFieldProps>;
    marital?: PrimitiveOverrideProps<TextFieldProps>;
    race?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiIcNo?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiIcColour?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiIcExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    malaysianIcNumber?: PrimitiveOverrideProps<TextFieldProps>;
    malaysianIcExpiry?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeePersonalInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: EmployeePersonalInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmployeePersonalInfoCreateFormInputValues) => EmployeePersonalInfoCreateFormInputValues;
    onSuccess?: (fields: EmployeePersonalInfoCreateFormInputValues) => void;
    onError?: (fields: EmployeePersonalInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeePersonalInfoCreateFormInputValues) => EmployeePersonalInfoCreateFormInputValues;
    onValidate?: EmployeePersonalInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeePersonalInfoCreateForm(props: EmployeePersonalInfoCreateFormProps): React.ReactElement;
