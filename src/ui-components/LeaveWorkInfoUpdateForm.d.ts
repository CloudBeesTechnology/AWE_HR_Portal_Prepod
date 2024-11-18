/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { LeaveWorkInfo } from "../models";
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
export declare type LeaveWorkInfoUpdateFormInputValues = {
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
export declare type LeaveWorkInfoUpdateFormValidationValues = {
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
export declare type LeaveWorkInfoUpdateFormOverridesProps = {
    LeaveWorkInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type LeaveWorkInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: LeaveWorkInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    leaveWorkInfo?: LeaveWorkInfo;
    onSubmit?: (fields: LeaveWorkInfoUpdateFormInputValues) => LeaveWorkInfoUpdateFormInputValues;
    onSuccess?: (fields: LeaveWorkInfoUpdateFormInputValues) => void;
    onError?: (fields: LeaveWorkInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LeaveWorkInfoUpdateFormInputValues) => LeaveWorkInfoUpdateFormInputValues;
    onValidate?: LeaveWorkInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LeaveWorkInfoUpdateForm(props: LeaveWorkInfoUpdateFormProps): React.ReactElement;
