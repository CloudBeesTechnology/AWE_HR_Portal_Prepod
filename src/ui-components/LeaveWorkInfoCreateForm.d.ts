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
export declare type LeaveWorkInfoCreateFormInputValues = {
    leavePassageEntitlement?: string;
    annualLeaveEntitlement?: string;
    annualLeaveEffectDate?: string;
    sickLeaveEntitlement?: string;
    effectiveDateOfSickLeave?: string;
    positionRevision?: string;
    revisionSalaryPackage?: string;
    leavePassageEntitlementRevision?: string;
    effectiveDateOfLeavePassage?: string;
    revisionAnnualLeave?: string;
    annualEntitlementeffectiveDate?: string;
    contractEffectDate?: string;
    contractOfEmployee?: string;
    remarksWorkInfo?: string;
    empID?: string;
};
export declare type LeaveWorkInfoCreateFormValidationValues = {
    leavePassageEntitlement?: ValidationFunction<string>;
    annualLeaveEntitlement?: ValidationFunction<string>;
    annualLeaveEffectDate?: ValidationFunction<string>;
    sickLeaveEntitlement?: ValidationFunction<string>;
    effectiveDateOfSickLeave?: ValidationFunction<string>;
    positionRevision?: ValidationFunction<string>;
    revisionSalaryPackage?: ValidationFunction<string>;
    leavePassageEntitlementRevision?: ValidationFunction<string>;
    effectiveDateOfLeavePassage?: ValidationFunction<string>;
    revisionAnnualLeave?: ValidationFunction<string>;
    annualEntitlementeffectiveDate?: ValidationFunction<string>;
    contractEffectDate?: ValidationFunction<string>;
    contractOfEmployee?: ValidationFunction<string>;
    remarksWorkInfo?: ValidationFunction<string>;
    empID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LeaveWorkInfoCreateFormOverridesProps = {
    LeaveWorkInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    leavePassageEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    annualLeaveEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    annualLeaveEffectDate?: PrimitiveOverrideProps<TextFieldProps>;
    sickLeaveEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    effectiveDateOfSickLeave?: PrimitiveOverrideProps<TextFieldProps>;
    positionRevision?: PrimitiveOverrideProps<TextFieldProps>;
    revisionSalaryPackage?: PrimitiveOverrideProps<TextFieldProps>;
    leavePassageEntitlementRevision?: PrimitiveOverrideProps<TextFieldProps>;
    effectiveDateOfLeavePassage?: PrimitiveOverrideProps<TextFieldProps>;
    revisionAnnualLeave?: PrimitiveOverrideProps<TextFieldProps>;
    annualEntitlementeffectiveDate?: PrimitiveOverrideProps<TextFieldProps>;
    contractEffectDate?: PrimitiveOverrideProps<TextFieldProps>;
    contractOfEmployee?: PrimitiveOverrideProps<TextFieldProps>;
    remarksWorkInfo?: PrimitiveOverrideProps<TextFieldProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LeaveWorkInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: LeaveWorkInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LeaveWorkInfoCreateFormInputValues) => LeaveWorkInfoCreateFormInputValues;
    onSuccess?: (fields: LeaveWorkInfoCreateFormInputValues) => void;
    onError?: (fields: LeaveWorkInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LeaveWorkInfoCreateFormInputValues) => LeaveWorkInfoCreateFormInputValues;
    onValidate?: LeaveWorkInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function LeaveWorkInfoCreateForm(props: LeaveWorkInfoCreateFormProps): React.ReactElement;
