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
export declare type CandIToEMPUpdateFormInputValues = {
    empID?: string;
    crime?: string;
    crimeDesc?: string;
    emgDetails?: string[];
    noExperience?: string;
    empStatement?: string;
    desc?: string;
    disease?: string;
    diseaseDesc?: string;
    liquor?: string;
    liquorDesc?: string;
    perIS?: string;
    perID?: string;
    referees?: string[];
    relatives?: string[];
    salaryExpectation?: string;
    supportInfo?: string;
    workExperience?: string[];
};
export declare type CandIToEMPUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    crime?: ValidationFunction<string>;
    crimeDesc?: ValidationFunction<string>;
    emgDetails?: ValidationFunction<string>;
    noExperience?: ValidationFunction<string>;
    empStatement?: ValidationFunction<string>;
    desc?: ValidationFunction<string>;
    disease?: ValidationFunction<string>;
    diseaseDesc?: ValidationFunction<string>;
    liquor?: ValidationFunction<string>;
    liquorDesc?: ValidationFunction<string>;
    perIS?: ValidationFunction<string>;
    perID?: ValidationFunction<string>;
    referees?: ValidationFunction<string>;
    relatives?: ValidationFunction<string>;
    salaryExpectation?: ValidationFunction<string>;
    supportInfo?: ValidationFunction<string>;
    workExperience?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CandIToEMPUpdateFormOverridesProps = {
    CandIToEMPUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    crime?: PrimitiveOverrideProps<TextFieldProps>;
    crimeDesc?: PrimitiveOverrideProps<TextFieldProps>;
    emgDetails?: PrimitiveOverrideProps<TextAreaFieldProps>;
    noExperience?: PrimitiveOverrideProps<TextFieldProps>;
    empStatement?: PrimitiveOverrideProps<TextFieldProps>;
    desc?: PrimitiveOverrideProps<TextFieldProps>;
    disease?: PrimitiveOverrideProps<TextFieldProps>;
    diseaseDesc?: PrimitiveOverrideProps<TextFieldProps>;
    liquor?: PrimitiveOverrideProps<TextFieldProps>;
    liquorDesc?: PrimitiveOverrideProps<TextFieldProps>;
    perIS?: PrimitiveOverrideProps<TextFieldProps>;
    perID?: PrimitiveOverrideProps<TextFieldProps>;
    referees?: PrimitiveOverrideProps<TextAreaFieldProps>;
    relatives?: PrimitiveOverrideProps<TextAreaFieldProps>;
    salaryExpectation?: PrimitiveOverrideProps<TextFieldProps>;
    supportInfo?: PrimitiveOverrideProps<TextFieldProps>;
    workExperience?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type CandIToEMPUpdateFormProps = React.PropsWithChildren<{
    overrides?: CandIToEMPUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    candIToEMP?: any;
    onSubmit?: (fields: CandIToEMPUpdateFormInputValues) => CandIToEMPUpdateFormInputValues;
    onSuccess?: (fields: CandIToEMPUpdateFormInputValues) => void;
    onError?: (fields: CandIToEMPUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CandIToEMPUpdateFormInputValues) => CandIToEMPUpdateFormInputValues;
    onValidate?: CandIToEMPUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CandIToEMPUpdateForm(props: CandIToEMPUpdateFormProps): React.ReactElement;
