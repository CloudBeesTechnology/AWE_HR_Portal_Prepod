/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EmployeePersonalDoc } from "../models";
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
export declare type EmployeePersonalDocUpdateFormInputValues = {
    passportNo?: string;
    passportIssued?: string;
    passportExpiry?: string;
    passportDestination?: string;
    contactNo?: string;
    address?: string;
    employeeBadgeNumber?: string;
    sapNumber?: string;
    nationalCategory?: string;
    countryOfOrigin?: string;
    otherCountryOfOrigin?: string;
    educationLevel?: string;
    academicTechnicalQualification?: string;
    nextOfKin?: string[];
    inductionBriefing?: string;
    previousEmployment?: string;
    previousEmploymentPeriod?: string;
    empID?: string;
};
export declare type EmployeePersonalDocUpdateFormValidationValues = {
    passportNo?: ValidationFunction<string>;
    passportIssued?: ValidationFunction<string>;
    passportExpiry?: ValidationFunction<string>;
    passportDestination?: ValidationFunction<string>;
    contactNo?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    employeeBadgeNumber?: ValidationFunction<string>;
    sapNumber?: ValidationFunction<string>;
    nationalCategory?: ValidationFunction<string>;
    countryOfOrigin?: ValidationFunction<string>;
    otherCountryOfOrigin?: ValidationFunction<string>;
    educationLevel?: ValidationFunction<string>;
    academicTechnicalQualification?: ValidationFunction<string>;
    nextOfKin?: ValidationFunction<string>;
    inductionBriefing?: ValidationFunction<string>;
    previousEmployment?: ValidationFunction<string>;
    previousEmploymentPeriod?: ValidationFunction<string>;
    empID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployeePersonalDocUpdateFormOverridesProps = {
    EmployeePersonalDocUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    passportNo?: PrimitiveOverrideProps<TextFieldProps>;
    passportIssued?: PrimitiveOverrideProps<TextFieldProps>;
    passportExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    passportDestination?: PrimitiveOverrideProps<TextFieldProps>;
    contactNo?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    employeeBadgeNumber?: PrimitiveOverrideProps<TextFieldProps>;
    sapNumber?: PrimitiveOverrideProps<TextFieldProps>;
    nationalCategory?: PrimitiveOverrideProps<TextFieldProps>;
    countryOfOrigin?: PrimitiveOverrideProps<TextFieldProps>;
    otherCountryOfOrigin?: PrimitiveOverrideProps<TextFieldProps>;
    educationLevel?: PrimitiveOverrideProps<TextFieldProps>;
    academicTechnicalQualification?: PrimitiveOverrideProps<TextFieldProps>;
    nextOfKin?: PrimitiveOverrideProps<TextFieldProps>;
    inductionBriefing?: PrimitiveOverrideProps<TextFieldProps>;
    previousEmployment?: PrimitiveOverrideProps<TextFieldProps>;
    previousEmploymentPeriod?: PrimitiveOverrideProps<TextFieldProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployeePersonalDocUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmployeePersonalDocUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    employeePersonalDoc?: EmployeePersonalDoc;
    onSubmit?: (fields: EmployeePersonalDocUpdateFormInputValues) => EmployeePersonalDocUpdateFormInputValues;
    onSuccess?: (fields: EmployeePersonalDocUpdateFormInputValues) => void;
    onError?: (fields: EmployeePersonalDocUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployeePersonalDocUpdateFormInputValues) => EmployeePersonalDocUpdateFormInputValues;
    onValidate?: EmployeePersonalDocUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmployeePersonalDocUpdateForm(props: EmployeePersonalDocUpdateFormProps): React.ReactElement;
