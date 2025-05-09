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
export declare type EducationDetailsUpdateFormInputValues = {
    tempID?: string;
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
    noticePeriod?: string;
    perIS?: string;
    perIDesc?: string;
    referees?: string[];
    relatives?: string[];
    salaryExpectation?: string;
    supportInfo?: string;
    uploadResume?: string;
    uploadCertificate?: string;
    uploadPp?: string;
    uploadIc?: string;
};
export declare type EducationDetailsUpdateFormValidationValues = {
    tempID?: ValidationFunction<string>;
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
    noticePeriod?: ValidationFunction<string>;
    perIS?: ValidationFunction<string>;
    perIDesc?: ValidationFunction<string>;
    referees?: ValidationFunction<string>;
    relatives?: ValidationFunction<string>;
    salaryExpectation?: ValidationFunction<string>;
    supportInfo?: ValidationFunction<string>;
    uploadResume?: ValidationFunction<string>;
    uploadCertificate?: ValidationFunction<string>;
    uploadPp?: ValidationFunction<string>;
    uploadIc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EducationDetailsUpdateFormOverridesProps = {
    EducationDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
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
    noticePeriod?: PrimitiveOverrideProps<TextFieldProps>;
    perIS?: PrimitiveOverrideProps<TextFieldProps>;
    perIDesc?: PrimitiveOverrideProps<TextFieldProps>;
    referees?: PrimitiveOverrideProps<TextAreaFieldProps>;
    relatives?: PrimitiveOverrideProps<TextAreaFieldProps>;
    salaryExpectation?: PrimitiveOverrideProps<TextFieldProps>;
    supportInfo?: PrimitiveOverrideProps<TextFieldProps>;
    uploadResume?: PrimitiveOverrideProps<TextFieldProps>;
    uploadCertificate?: PrimitiveOverrideProps<TextFieldProps>;
    uploadPp?: PrimitiveOverrideProps<TextFieldProps>;
    uploadIc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EducationDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: EducationDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    educationDetails?: any;
    onSubmit?: (fields: EducationDetailsUpdateFormInputValues) => EducationDetailsUpdateFormInputValues;
    onSuccess?: (fields: EducationDetailsUpdateFormInputValues) => void;
    onError?: (fields: EducationDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EducationDetailsUpdateFormInputValues) => EducationDetailsUpdateFormInputValues;
    onValidate?: EducationDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EducationDetailsUpdateForm(props: EducationDetailsUpdateFormProps): React.ReactElement;
