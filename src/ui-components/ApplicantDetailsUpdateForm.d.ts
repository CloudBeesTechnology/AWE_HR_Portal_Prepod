/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ApplicantDetails } from "../models";
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
export declare type ApplicantDetailsUpdateFormInputValues = {
    profilePhoto?: string;
    agent?: string;
    position?: string;
    contractType?: string;
    name?: string;
    chinese?: string;
    gender?: string;
    age?: number;
    email?: string;
    countryOfBirth?: string;
    nationality?: string;
    otherNationality?: string;
    marital?: string;
    race?: string;
    otherRace?: string;
    religion?: string;
    otherReligion?: string;
};
export declare type ApplicantDetailsUpdateFormValidationValues = {
    profilePhoto?: ValidationFunction<string>;
    agent?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    contractType?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    chinese?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    countryOfBirth?: ValidationFunction<string>;
    nationality?: ValidationFunction<string>;
    otherNationality?: ValidationFunction<string>;
    marital?: ValidationFunction<string>;
    race?: ValidationFunction<string>;
    otherRace?: ValidationFunction<string>;
    religion?: ValidationFunction<string>;
    otherReligion?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicantDetailsUpdateFormOverridesProps = {
    ApplicantDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    profilePhoto?: PrimitiveOverrideProps<TextFieldProps>;
    agent?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    contractType?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    chinese?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    countryOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
    otherNationality?: PrimitiveOverrideProps<TextFieldProps>;
    marital?: PrimitiveOverrideProps<TextFieldProps>;
    race?: PrimitiveOverrideProps<TextFieldProps>;
    otherRace?: PrimitiveOverrideProps<TextFieldProps>;
    religion?: PrimitiveOverrideProps<TextFieldProps>;
    otherReligion?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ApplicantDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicantDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    applicantDetails?: ApplicantDetails;
    onSubmit?: (fields: ApplicantDetailsUpdateFormInputValues) => ApplicantDetailsUpdateFormInputValues;
    onSuccess?: (fields: ApplicantDetailsUpdateFormInputValues) => void;
    onError?: (fields: ApplicantDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicantDetailsUpdateFormInputValues) => ApplicantDetailsUpdateFormInputValues;
    onValidate?: ApplicantDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicantDetailsUpdateForm(props: ApplicantDetailsUpdateFormProps): React.ReactElement;
