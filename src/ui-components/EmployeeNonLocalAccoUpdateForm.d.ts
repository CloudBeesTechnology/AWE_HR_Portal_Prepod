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
export declare type EmployeeNonLocalAccoUpdateFormInputValues = {
    empID?: string;
    accommodation?: string[];
    accommodationAddress?: string[];
};
export declare type EmployeeNonLocalAccoUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    accommodation?: ValidationFunction<string>;
    accommodationAddress?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeeNonLocalAccoUpdateFormOverridesProps = {
    EmployeeNonLocalAccoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    accommodation?: PrimitiveOverrideProps<TextFieldProps>;
    accommodationAddress?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeeNonLocalAccoUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeNonLocalAccoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    employeeNonLocalAcco?: any;
    onSubmit?: (fields: EmployeeNonLocalAccoUpdateFormInputValues) => EmployeeNonLocalAccoUpdateFormInputValues;
    onSuccess?: (fields: EmployeeNonLocalAccoUpdateFormInputValues) => void;
    onError?: (fields: EmployeeNonLocalAccoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeNonLocalAccoUpdateFormInputValues) => EmployeeNonLocalAccoUpdateFormInputValues;
    onValidate?: EmployeeNonLocalAccoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeNonLocalAccoUpdateForm(props: EmployeeNonLocalAccoUpdateFormProps): React.ReactElement;
