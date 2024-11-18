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
export declare type InterviewSchemaCreateFormInputValues = {
    date?: string;
    time?: string;
    venue?: string;
    interviewer?: string;
    interviewType?: string;
    message?: string;
    tempID?: string;
};
export declare type InterviewSchemaCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    venue?: ValidationFunction<string>;
    interviewer?: ValidationFunction<string>;
    interviewType?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    tempID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InterviewSchemaCreateFormOverridesProps = {
    InterviewSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    venue?: PrimitiveOverrideProps<TextFieldProps>;
    interviewer?: PrimitiveOverrideProps<TextFieldProps>;
    interviewType?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InterviewSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: InterviewSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InterviewSchemaCreateFormInputValues) => InterviewSchemaCreateFormInputValues;
    onSuccess?: (fields: InterviewSchemaCreateFormInputValues) => void;
    onError?: (fields: InterviewSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InterviewSchemaCreateFormInputValues) => InterviewSchemaCreateFormInputValues;
    onValidate?: InterviewSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function InterviewSchemaCreateForm(props: InterviewSchemaCreateFormProps): React.ReactElement;
