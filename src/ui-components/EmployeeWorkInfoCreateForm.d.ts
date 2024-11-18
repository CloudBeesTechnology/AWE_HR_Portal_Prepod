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
export declare type EmployeeWorkInfoCreateFormInputValues = {
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
export declare type EmployeeWorkInfoCreateFormValidationValues = {
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
export declare type EmployeeWorkInfoCreateFormOverridesProps = {
    EmployeeWorkInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type EmployeeWorkInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeWorkInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmployeeWorkInfoCreateFormInputValues) => EmployeeWorkInfoCreateFormInputValues;
    onSuccess?: (fields: EmployeeWorkInfoCreateFormInputValues) => void;
    onError?: (fields: EmployeeWorkInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeWorkInfoCreateFormInputValues) => EmployeeWorkInfoCreateFormInputValues;
    onValidate?: EmployeeWorkInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeWorkInfoCreateForm(props: EmployeeWorkInfoCreateFormProps): React.ReactElement;
