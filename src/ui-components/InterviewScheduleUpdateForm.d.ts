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
export declare type InterviewScheduleUpdateFormInputValues = {
    interDate?: string;
    interTime?: string;
    venue?: string;
    interType?: string;
    bagdeNo?: string;
    message?: string;
    tempID?: string;
    manager?: string;
    candidateStatus?: string;
    department?: string;
    otherDepartment?: string;
    status?: string;
};
export declare type InterviewScheduleUpdateFormValidationValues = {
    interDate?: ValidationFunction<string>;
    interTime?: ValidationFunction<string>;
    venue?: ValidationFunction<string>;
    interType?: ValidationFunction<string>;
    bagdeNo?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    tempID?: ValidationFunction<string>;
    manager?: ValidationFunction<string>;
    candidateStatus?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
    otherDepartment?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InterviewScheduleUpdateFormOverridesProps = {
    InterviewScheduleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    interDate?: PrimitiveOverrideProps<TextFieldProps>;
    interTime?: PrimitiveOverrideProps<TextFieldProps>;
    venue?: PrimitiveOverrideProps<TextFieldProps>;
    interType?: PrimitiveOverrideProps<TextFieldProps>;
    bagdeNo?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
    manager?: PrimitiveOverrideProps<TextFieldProps>;
    candidateStatus?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    otherDepartment?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InterviewScheduleUpdateFormProps = React.PropsWithChildren<{
    overrides?: InterviewScheduleUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    interviewSchedule?: any;
    onSubmit?: (fields: InterviewScheduleUpdateFormInputValues) => InterviewScheduleUpdateFormInputValues;
    onSuccess?: (fields: InterviewScheduleUpdateFormInputValues) => void;
    onError?: (fields: InterviewScheduleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InterviewScheduleUpdateFormInputValues) => InterviewScheduleUpdateFormInputValues;
    onValidate?: InterviewScheduleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InterviewScheduleUpdateForm(props: InterviewScheduleUpdateFormProps): React.ReactElement;
