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
export declare type EmailNotifiCreateFormInputValues = {
    empID?: string;
    leaveType?: string;
    senderEmail?: string;
    receipentEmail?: string;
    receipentEmpID?: string;
    status?: string;
    message?: string;
};
export declare type EmailNotifiCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    leaveType?: ValidationFunction<string>;
    senderEmail?: ValidationFunction<string>;
    receipentEmail?: ValidationFunction<string>;
    receipentEmpID?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailNotifiCreateFormOverridesProps = {
    EmailNotifiCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    leaveType?: PrimitiveOverrideProps<TextFieldProps>;
    senderEmail?: PrimitiveOverrideProps<TextFieldProps>;
    receipentEmail?: PrimitiveOverrideProps<TextFieldProps>;
    receipentEmpID?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmailNotifiCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailNotifiCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailNotifiCreateFormInputValues) => EmailNotifiCreateFormInputValues;
    onSuccess?: (fields: EmailNotifiCreateFormInputValues) => void;
    onError?: (fields: EmailNotifiCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailNotifiCreateFormInputValues) => EmailNotifiCreateFormInputValues;
    onValidate?: EmailNotifiCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailNotifiCreateForm(props: EmailNotifiCreateFormProps): React.ReactElement;
