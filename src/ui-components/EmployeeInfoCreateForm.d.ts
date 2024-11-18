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
export declare type EmployeeInfoCreateFormInputValues = {
    empID?: string;
    employeeBadgeNumber?: string;
    sapNumber?: string;
    countryOfOrigin?: string;
    educationLevel?: string;
    academicTechnicalQualification?: string;
    nextOfKin?: string[];
    inductionBriefing?: string;
    previousEmployment?: string;
    previousEmploymentPeriod?: string;
    nationalCategory?: string;
    malaysianIcNumber?: string;
    address?: string;
};
export declare type EmployeeInfoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    employeeBadgeNumber?: ValidationFunction<string>;
    sapNumber?: ValidationFunction<string>;
    countryOfOrigin?: ValidationFunction<string>;
    educationLevel?: ValidationFunction<string>;
    academicTechnicalQualification?: ValidationFunction<string>;
    nextOfKin?: ValidationFunction<string>;
    inductionBriefing?: ValidationFunction<string>;
    previousEmployment?: ValidationFunction<string>;
    previousEmploymentPeriod?: ValidationFunction<string>;
    nationalCategory?: ValidationFunction<string>;
    malaysianIcNumber?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeeInfoCreateFormOverridesProps = {
    EmployeeInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    employeeBadgeNumber?: PrimitiveOverrideProps<TextFieldProps>;
    sapNumber?: PrimitiveOverrideProps<TextFieldProps>;
    countryOfOrigin?: PrimitiveOverrideProps<TextFieldProps>;
    educationLevel?: PrimitiveOverrideProps<TextFieldProps>;
    academicTechnicalQualification?: PrimitiveOverrideProps<TextFieldProps>;
    nextOfKin?: PrimitiveOverrideProps<TextFieldProps>;
    inductionBriefing?: PrimitiveOverrideProps<TextFieldProps>;
    previousEmployment?: PrimitiveOverrideProps<TextFieldProps>;
    previousEmploymentPeriod?: PrimitiveOverrideProps<TextFieldProps>;
    nationalCategory?: PrimitiveOverrideProps<TextFieldProps>;
    malaysianIcNumber?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeeInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: EmployeeInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmployeeInfoCreateFormInputValues) => EmployeeInfoCreateFormInputValues;
    onSuccess?: (fields: EmployeeInfoCreateFormInputValues) => void;
    onError?: (fields: EmployeeInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeeInfoCreateFormInputValues) => EmployeeInfoCreateFormInputValues;
    onValidate?: EmployeeInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeeInfoCreateForm(props: EmployeeInfoCreateFormProps): React.ReactElement;
