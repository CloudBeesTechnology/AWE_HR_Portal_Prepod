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
export declare type UserCreateFormInputValues = {
    empID?: string;
    selectType?: string;
    setPermissions?: string[];
    password?: string;
    status?: string;
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type UserCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    selectType?: ValidationFunction<string>;
    setPermissions?: ValidationFunction<string>;
    password?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCreateFormOverridesProps = {
    UserCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    selectType?: PrimitiveOverrideProps<TextFieldProps>;
    setPermissions?: PrimitiveOverrideProps<TextFieldProps>;
    password?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type UserCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onSuccess?: (fields: UserCreateFormInputValues) => void;
    onError?: (fields: UserCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onValidate?: UserCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserCreateForm(props: UserCreateFormProps): React.ReactElement;
