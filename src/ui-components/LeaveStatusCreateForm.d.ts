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
export declare type LeaveStatusCreateFormInputValues = {
    empID?: string;
    leaveType?: string;
    fromDate?: string;
    toDate?: string;
    days?: number;
    applyTo?: string[];
    reason?: string;
    medicalCertificate?: string;
    supervisorName?: string;
    supervisorStatus?: string;
    supervisorDate?: string;
    supervisorRemarks?: string;
    managerName?: string;
    managerStatus?: string;
    managerDate?: string;
    managerRemarks?: string;
    empStatus?: string;
    empDate?: string;
    empRemarks?: string;
};
export declare type LeaveStatusCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    leaveType?: ValidationFunction<string>;
    fromDate?: ValidationFunction<string>;
    toDate?: ValidationFunction<string>;
    days?: ValidationFunction<number>;
    applyTo?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
    medicalCertificate?: ValidationFunction<string>;
    supervisorName?: ValidationFunction<string>;
    supervisorStatus?: ValidationFunction<string>;
    supervisorDate?: ValidationFunction<string>;
    supervisorRemarks?: ValidationFunction<string>;
    managerName?: ValidationFunction<string>;
    managerStatus?: ValidationFunction<string>;
    managerDate?: ValidationFunction<string>;
    managerRemarks?: ValidationFunction<string>;
    empStatus?: ValidationFunction<string>;
    empDate?: ValidationFunction<string>;
    empRemarks?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LeaveStatusCreateFormOverridesProps = {
    LeaveStatusCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    leaveType?: PrimitiveOverrideProps<TextFieldProps>;
    fromDate?: PrimitiveOverrideProps<TextFieldProps>;
    toDate?: PrimitiveOverrideProps<TextFieldProps>;
    days?: PrimitiveOverrideProps<TextFieldProps>;
    applyTo?: PrimitiveOverrideProps<TextFieldProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    medicalCertificate?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorName?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorStatus?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorDate?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    managerName?: PrimitiveOverrideProps<TextFieldProps>;
    managerStatus?: PrimitiveOverrideProps<TextFieldProps>;
    managerDate?: PrimitiveOverrideProps<TextFieldProps>;
    managerRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    empStatus?: PrimitiveOverrideProps<TextFieldProps>;
    empDate?: PrimitiveOverrideProps<TextFieldProps>;
    empRemarks?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LeaveStatusCreateFormProps = React.PropsWithChildren<{
    overrides?: LeaveStatusCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LeaveStatusCreateFormInputValues) => LeaveStatusCreateFormInputValues;
    onSuccess?: (fields: LeaveStatusCreateFormInputValues) => void;
    onError?: (fields: LeaveStatusCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LeaveStatusCreateFormInputValues) => LeaveStatusCreateFormInputValues;
    onValidate?: LeaveStatusCreateFormValidationValues;
} & React.CSSProperties>;
export default function LeaveStatusCreateForm(props: LeaveStatusCreateFormProps): React.ReactElement;
