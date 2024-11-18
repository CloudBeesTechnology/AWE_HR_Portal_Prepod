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
export declare type WorkInfoSchema2UpdateFormInputValues = {
    reasonOfTermination?: string;
    destinationOfEntitlement?: string;
    leavePassageEntitlement?: string;
    dateOfEntitlement?: string;
    durationPeriodEntitlement?: string;
    annualLeaveEntitlement?: string;
    effectiveDateRevision?: string;
    sickLeaveEntitlement?: string;
    jobCategory?: string;
    otherJobCategory?: string;
    upgradeDate?: string;
    normalWorkingWeek?: string;
    normalWorkingMonth?: string;
    effectiveDateOfSickLeave?: string;
    positionRevision?: string;
    RevisionsalaryPackage?: string;
    leavePassageEntitlementRevision?: string;
    effectiveDateOfLeavePassage?: string;
};
export declare type WorkInfoSchema2UpdateFormValidationValues = {
    reasonOfTermination?: ValidationFunction<string>;
    destinationOfEntitlement?: ValidationFunction<string>;
    leavePassageEntitlement?: ValidationFunction<string>;
    dateOfEntitlement?: ValidationFunction<string>;
    durationPeriodEntitlement?: ValidationFunction<string>;
    annualLeaveEntitlement?: ValidationFunction<string>;
    effectiveDateRevision?: ValidationFunction<string>;
    sickLeaveEntitlement?: ValidationFunction<string>;
    jobCategory?: ValidationFunction<string>;
    otherJobCategory?: ValidationFunction<string>;
    upgradeDate?: ValidationFunction<string>;
    normalWorkingWeek?: ValidationFunction<string>;
    normalWorkingMonth?: ValidationFunction<string>;
    effectiveDateOfSickLeave?: ValidationFunction<string>;
    positionRevision?: ValidationFunction<string>;
    RevisionsalaryPackage?: ValidationFunction<string>;
    leavePassageEntitlementRevision?: ValidationFunction<string>;
    effectiveDateOfLeavePassage?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkInfoSchema2UpdateFormOverridesProps = {
    WorkInfoSchema2UpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reasonOfTermination?: PrimitiveOverrideProps<TextFieldProps>;
    destinationOfEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    leavePassageEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    durationPeriodEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    annualLeaveEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    effectiveDateRevision?: PrimitiveOverrideProps<TextFieldProps>;
    sickLeaveEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    jobCategory?: PrimitiveOverrideProps<TextFieldProps>;
    otherJobCategory?: PrimitiveOverrideProps<TextFieldProps>;
    upgradeDate?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkingWeek?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkingMonth?: PrimitiveOverrideProps<TextFieldProps>;
    effectiveDateOfSickLeave?: PrimitiveOverrideProps<TextFieldProps>;
    positionRevision?: PrimitiveOverrideProps<TextFieldProps>;
    RevisionsalaryPackage?: PrimitiveOverrideProps<TextFieldProps>;
    leavePassageEntitlementRevision?: PrimitiveOverrideProps<TextFieldProps>;
    effectiveDateOfLeavePassage?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkInfoSchema2UpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkInfoSchema2UpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    workInfoSchema2?: any;
    onSubmit?: (fields: WorkInfoSchema2UpdateFormInputValues) => WorkInfoSchema2UpdateFormInputValues;
    onSuccess?: (fields: WorkInfoSchema2UpdateFormInputValues) => void;
    onError?: (fields: WorkInfoSchema2UpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkInfoSchema2UpdateFormInputValues) => WorkInfoSchema2UpdateFormInputValues;
    onValidate?: WorkInfoSchema2UpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkInfoSchema2UpdateForm(props: WorkInfoSchema2UpdateFormProps): React.ReactElement;
