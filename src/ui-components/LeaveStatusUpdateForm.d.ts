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
export declare type LeaveStatusUpdateFormInputValues = {
    empID?: string;
    leaveType?: string;
    fromDate?: string;
    toDate?: string;
    days?: number;
    applyTo?: string[];
    reason?: string;
    medicalCertificate?: string;
    supervisorName?: string;
    supervisorEmpID?: string;
    supervisorStatus?: string;
    supervisorDate?: string;
    supervisorRemarks?: string;
    managerName?: string;
    managerEmpID?: string;
    managerStatus?: string;
    managerDate?: string;
    managerRemarks?: string;
    empStatus?: string;
    empDate?: string;
    empRemarks?: string;
    selectedTo?: string;
    selectedFrom?: string;
    startDate?: string;
    endDate?: string;
    receivedDate?: string;
};
export declare type LeaveStatusUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    leaveType?: ValidationFunction<string>;
    fromDate?: ValidationFunction<string>;
    toDate?: ValidationFunction<string>;
    days?: ValidationFunction<number>;
    applyTo?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
    medicalCertificate?: ValidationFunction<string>;
    supervisorName?: ValidationFunction<string>;
    supervisorEmpID?: ValidationFunction<string>;
    supervisorStatus?: ValidationFunction<string>;
    supervisorDate?: ValidationFunction<string>;
    supervisorRemarks?: ValidationFunction<string>;
    managerName?: ValidationFunction<string>;
    managerEmpID?: ValidationFunction<string>;
    managerStatus?: ValidationFunction<string>;
    managerDate?: ValidationFunction<string>;
    managerRemarks?: ValidationFunction<string>;
    empStatus?: ValidationFunction<string>;
    empDate?: ValidationFunction<string>;
    empRemarks?: ValidationFunction<string>;
    selectedTo?: ValidationFunction<string>;
    selectedFrom?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    receivedDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LeaveStatusUpdateFormOverridesProps = {
    LeaveStatusUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    leaveType?: PrimitiveOverrideProps<TextFieldProps>;
    fromDate?: PrimitiveOverrideProps<TextFieldProps>;
    toDate?: PrimitiveOverrideProps<TextFieldProps>;
    days?: PrimitiveOverrideProps<TextFieldProps>;
    applyTo?: PrimitiveOverrideProps<TextFieldProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    medicalCertificate?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorName?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorEmpID?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorStatus?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorDate?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    managerName?: PrimitiveOverrideProps<TextFieldProps>;
    managerEmpID?: PrimitiveOverrideProps<TextFieldProps>;
    managerStatus?: PrimitiveOverrideProps<TextFieldProps>;
    managerDate?: PrimitiveOverrideProps<TextFieldProps>;
    managerRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    empStatus?: PrimitiveOverrideProps<TextFieldProps>;
    empDate?: PrimitiveOverrideProps<TextFieldProps>;
    empRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    selectedTo?: PrimitiveOverrideProps<TextFieldProps>;
    selectedFrom?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    receivedDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LeaveStatusUpdateFormProps = React.PropsWithChildren<{
    overrides?: LeaveStatusUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    leaveStatus?: any;
    onSubmit?: (fields: LeaveStatusUpdateFormInputValues) => LeaveStatusUpdateFormInputValues;
    onSuccess?: (fields: LeaveStatusUpdateFormInputValues) => void;
    onError?: (fields: LeaveStatusUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LeaveStatusUpdateFormInputValues) => LeaveStatusUpdateFormInputValues;
    onValidate?: LeaveStatusUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LeaveStatusUpdateForm(props: LeaveStatusUpdateFormProps): React.ReactElement;
