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
export declare type EmpWorkInfoUpdateFormInputValues = {
    empID?: string;
    contractStart?: string[];
    contractEnd?: string[];
    contractPeriod?: string[];
    doj?: string;
    department?: string[];
    hr?: string[];
    jobCat?: string[];
    jobDesc?: string[];
    manager?: string[];
    otherJobCat?: string[];
    otherDepartment?: string[];
    otherPosition?: string[];
    probationStart?: string[];
    probationEnd?: string[];
    probDuration?: string[];
    position?: string[];
    relationship?: string[];
    supervisor?: string[];
    skillPool?: string;
    salaryType?: string[];
    sapNo?: string;
    upgradeDate?: string[];
    upgradePosition?: string[];
    workStatus?: string[];
    workHrs?: string[];
    workWeek?: string[];
    workMonth?: string[];
};
export declare type EmpWorkInfoUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    contractStart?: ValidationFunction<string>;
    contractEnd?: ValidationFunction<string>;
    contractPeriod?: ValidationFunction<string>;
    doj?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
    hr?: ValidationFunction<string>;
    jobCat?: ValidationFunction<string>;
    jobDesc?: ValidationFunction<string>;
    manager?: ValidationFunction<string>;
    otherJobCat?: ValidationFunction<string>;
    otherDepartment?: ValidationFunction<string>;
    otherPosition?: ValidationFunction<string>;
    probationStart?: ValidationFunction<string>;
    probationEnd?: ValidationFunction<string>;
    probDuration?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    relationship?: ValidationFunction<string>;
    supervisor?: ValidationFunction<string>;
    skillPool?: ValidationFunction<string>;
    salaryType?: ValidationFunction<string>;
    sapNo?: ValidationFunction<string>;
    upgradeDate?: ValidationFunction<string>;
    upgradePosition?: ValidationFunction<string>;
    workStatus?: ValidationFunction<string>;
    workHrs?: ValidationFunction<string>;
    workWeek?: ValidationFunction<string>;
    workMonth?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpWorkInfoUpdateFormOverridesProps = {
    EmpWorkInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    contractStart?: PrimitiveOverrideProps<TextFieldProps>;
    contractEnd?: PrimitiveOverrideProps<TextFieldProps>;
    contractPeriod?: PrimitiveOverrideProps<TextFieldProps>;
    doj?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    hr?: PrimitiveOverrideProps<TextFieldProps>;
    jobCat?: PrimitiveOverrideProps<TextFieldProps>;
    jobDesc?: PrimitiveOverrideProps<TextFieldProps>;
    manager?: PrimitiveOverrideProps<TextFieldProps>;
    otherJobCat?: PrimitiveOverrideProps<TextFieldProps>;
    otherDepartment?: PrimitiveOverrideProps<TextFieldProps>;
    otherPosition?: PrimitiveOverrideProps<TextFieldProps>;
    probationStart?: PrimitiveOverrideProps<TextFieldProps>;
    probationEnd?: PrimitiveOverrideProps<TextFieldProps>;
    probDuration?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    relationship?: PrimitiveOverrideProps<TextFieldProps>;
    supervisor?: PrimitiveOverrideProps<TextFieldProps>;
    skillPool?: PrimitiveOverrideProps<TextFieldProps>;
    salaryType?: PrimitiveOverrideProps<TextFieldProps>;
    sapNo?: PrimitiveOverrideProps<TextFieldProps>;
    upgradeDate?: PrimitiveOverrideProps<TextFieldProps>;
    upgradePosition?: PrimitiveOverrideProps<TextFieldProps>;
    workStatus?: PrimitiveOverrideProps<TextFieldProps>;
    workHrs?: PrimitiveOverrideProps<TextFieldProps>;
    workWeek?: PrimitiveOverrideProps<TextFieldProps>;
    workMonth?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmpWorkInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmpWorkInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    empWorkInfo?: any;
    onSubmit?: (fields: EmpWorkInfoUpdateFormInputValues) => EmpWorkInfoUpdateFormInputValues;
    onSuccess?: (fields: EmpWorkInfoUpdateFormInputValues) => void;
    onError?: (fields: EmpWorkInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpWorkInfoUpdateFormInputValues) => EmpWorkInfoUpdateFormInputValues;
    onValidate?: EmpWorkInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmpWorkInfoUpdateForm(props: EmpWorkInfoUpdateFormProps): React.ReactElement;
