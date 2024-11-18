/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmployeeWorkInfo } from "../models";
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
export declare type EmployeeWorkInfoUpdateFormInputValues = {
    empID?: string;
    dateOfJoin?: string;
    department?: string;
    workPosition?: string;
    upgradePosition?: string;
    jobDescription?: string;
    skillPool?: string;
    workStatus?: string;
    contractStartDate?: string;
    contractEndDate?: string;
    contractPeriodStatus?: string;
    ProbationaryStartDate?: string;
    ProbationaryEndDate?: string;
    normalWorkingHours?: string;
    normalWorkingWeek?: string;
    salaryType?: string;
    normalWorkingMonth?: string;
    employmentWorkStatus?: string;
    jobCategory?: string;
    otherJobCategory?: string;
    upgradeDate?: string;
};
export declare type EmployeeWorkInfoUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    dateOfJoin?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
    workPosition?: ValidationFunction<string>;
    upgradePosition?: ValidationFunction<string>;
    jobDescription?: ValidationFunction<string>;
    skillPool?: ValidationFunction<string>;
    workStatus?: ValidationFunction<string>;
    contractStartDate?: ValidationFunction<string>;
    contractEndDate?: ValidationFunction<string>;
    contractPeriodStatus?: ValidationFunction<string>;
    ProbationaryStartDate?: ValidationFunction<string>;
    ProbationaryEndDate?: ValidationFunction<string>;
    normalWorkingHours?: ValidationFunction<string>;
    normalWorkingWeek?: ValidationFunction<string>;
    salaryType?: ValidationFunction<string>;
    normalWorkingMonth?: ValidationFunction<string>;
    employmentWorkStatus?: ValidationFunction<string>;
    jobCategory?: ValidationFunction<string>;
    otherJobCategory?: ValidationFunction<string>;
    upgradeDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeeWorkInfoUpdateFormOverridesProps = {
    EmployeeWorkInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfJoin?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    workPosition?: PrimitiveOverrideProps<TextFieldProps>;
    upgradePosition?: PrimitiveOverrideProps<TextFieldProps>;
    jobDescription?: PrimitiveOverrideProps<TextFieldProps>;
    skillPool?: PrimitiveOverrideProps<TextFieldProps>;
    workStatus?: PrimitiveOverrideProps<TextFieldProps>;
    contractStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    contractEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    contractPeriodStatus?: PrimitiveOverrideProps<TextFieldProps>;
    ProbationaryStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    ProbationaryEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkingHours?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkingWeek?: PrimitiveOverrideProps<TextFieldProps>;
    salaryType?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkingMonth?: PrimitiveOverrideProps<TextFieldProps>;
    employmentWorkStatus?: PrimitiveOverrideProps<TextFieldProps>;
    jobCategory?: PrimitiveOverrideProps<TextFieldProps>;
    otherJobCategory?: PrimitiveOverrideProps<TextFieldProps>;
    upgradeDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeeWorkInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeWorkInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    employeeWorkInfo?: EmployeeWorkInfo;
    onSubmit?: (fields: EmployeeWorkInfoUpdateFormInputValues) => EmployeeWorkInfoUpdateFormInputValues;
    onSuccess?: (fields: EmployeeWorkInfoUpdateFormInputValues) => void;
    onError?: (fields: EmployeeWorkInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeWorkInfoUpdateFormInputValues) => EmployeeWorkInfoUpdateFormInputValues;
    onValidate?: EmployeeWorkInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeWorkInfoUpdateForm(props: EmployeeWorkInfoUpdateFormProps): React.ReactElement;
