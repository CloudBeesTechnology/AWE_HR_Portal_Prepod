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
export declare type InterviewScheduleSchemaCreateFormInputValues = {
    date?: string;
    time?: string;
    venue?: string;
    interviewType?: string;
    interviewer?: string;
    message?: string;
    tempID?: string;
    candidateStatus?: string;
    department?: string;
};
export declare type InterviewScheduleSchemaCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    venue?: ValidationFunction<string>;
    interviewType?: ValidationFunction<string>;
    interviewer?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    tempID?: ValidationFunction<string>;
    candidateStatus?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InterviewScheduleSchemaCreateFormOverridesProps = {
    InterviewScheduleSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    venue?: PrimitiveOverrideProps<TextFieldProps>;
    interviewType?: PrimitiveOverrideProps<TextFieldProps>;
    interviewer?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
    candidateStatus?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InterviewScheduleSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: InterviewScheduleSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InterviewScheduleSchemaCreateFormInputValues) => InterviewScheduleSchemaCreateFormInputValues;
    onSuccess?: (fields: InterviewScheduleSchemaCreateFormInputValues) => void;
    onError?: (fields: InterviewScheduleSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InterviewScheduleSchemaCreateFormInputValues) => InterviewScheduleSchemaCreateFormInputValues;
    onValidate?: InterviewScheduleSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function InterviewScheduleSchemaCreateForm(props: InterviewScheduleSchemaCreateFormProps): React.ReactElement;
