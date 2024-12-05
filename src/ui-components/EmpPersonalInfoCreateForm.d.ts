/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type EmpPersonalInfoCreateFormInputValues = {
    empID?: string;
    age?: number;
    aTQualify?: string;
    alternateNo?: string;
    agent?: string[];
    bankName?: string;
    bankAccNo?: string;
    contactNo?: string[];
    cob?: string;
    contractType?: string[];
    ctryOfOrigin?: string;
    chinese?: string;
    dob?: string;
    educLevel?: string;
    email?: string;
    eduDetails?: string[];
    empBadgeNo?: string;
    empType?: string[];
    familyDetails?: string[];
    gender?: string;
    lang?: string;
    marital?: string;
    name?: string;
    officialEmail?: string;
    oCOfOrigin?: string;
    profilePhoto?: string;
    permanentAddress?: string[];
    position?: string[];
    sapNo?: string;
};
export declare type EmpPersonalInfoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
    aTQualify?: ValidationFunction<string>;
    alternateNo?: ValidationFunction<string>;
    agent?: ValidationFunction<string>;
    bankName?: ValidationFunction<string>;
    bankAccNo?: ValidationFunction<string>;
    contactNo?: ValidationFunction<string>;
    cob?: ValidationFunction<string>;
    contractType?: ValidationFunction<string>;
    ctryOfOrigin?: ValidationFunction<string>;
    chinese?: ValidationFunction<string>;
    dob?: ValidationFunction<string>;
    educLevel?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    eduDetails?: ValidationFunction<string>;
    empBadgeNo?: ValidationFunction<string>;
    empType?: ValidationFunction<string>;
    familyDetails?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    lang?: ValidationFunction<string>;
    marital?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    officialEmail?: ValidationFunction<string>;
    oCOfOrigin?: ValidationFunction<string>;
    profilePhoto?: ValidationFunction<string>;
    permanentAddress?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    sapNo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpPersonalInfoCreateFormOverridesProps = {
    EmpPersonalInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    aTQualify?: PrimitiveOverrideProps<TextFieldProps>;
    alternateNo?: PrimitiveOverrideProps<TextFieldProps>;
    agent?: PrimitiveOverrideProps<TextFieldProps>;
    bankName?: PrimitiveOverrideProps<TextFieldProps>;
    bankAccNo?: PrimitiveOverrideProps<TextFieldProps>;
    contactNo?: PrimitiveOverrideProps<TextFieldProps>;
    cob?: PrimitiveOverrideProps<TextFieldProps>;
    contractType?: PrimitiveOverrideProps<TextFieldProps>;
    ctryOfOrigin?: PrimitiveOverrideProps<TextFieldProps>;
    chinese?: PrimitiveOverrideProps<TextFieldProps>;
    dob?: PrimitiveOverrideProps<TextFieldProps>;
    educLevel?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    eduDetails?: PrimitiveOverrideProps<TextAreaFieldProps>;
    empBadgeNo?: PrimitiveOverrideProps<TextFieldProps>;
    empType?: PrimitiveOverrideProps<TextFieldProps>;
    familyDetails?: PrimitiveOverrideProps<TextAreaFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    lang?: PrimitiveOverrideProps<TextFieldProps>;
    marital?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    officialEmail?: PrimitiveOverrideProps<TextFieldProps>;
    oCOfOrigin?: PrimitiveOverrideProps<TextFieldProps>;
    profilePhoto?: PrimitiveOverrideProps<TextFieldProps>;
    permanentAddress?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    sapNo?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmpPersonalInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: EmpPersonalInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmpPersonalInfoCreateFormInputValues) => EmpPersonalInfoCreateFormInputValues;
    onSuccess?: (fields: EmpPersonalInfoCreateFormInputValues) => void;
    onError?: (fields: EmpPersonalInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpPersonalInfoCreateFormInputValues) => EmpPersonalInfoCreateFormInputValues;
    onValidate?: EmpPersonalInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmpPersonalInfoCreateForm(props: EmpPersonalInfoCreateFormProps): React.ReactElement;
