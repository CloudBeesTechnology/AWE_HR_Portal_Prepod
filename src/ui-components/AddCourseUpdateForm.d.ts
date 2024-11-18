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
export declare type AddCourseUpdateFormInputValues = {
    courseSelect?: string[];
    courseName?: string[];
    company?: string[];
};
export declare type AddCourseUpdateFormValidationValues = {
    courseSelect?: ValidationFunction<string>;
    courseName?: ValidationFunction<string>;
    company?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AddCourseUpdateFormOverridesProps = {
    AddCourseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    courseSelect?: PrimitiveOverrideProps<TextFieldProps>;
    courseName?: PrimitiveOverrideProps<TextFieldProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AddCourseUpdateFormProps = React.PropsWithChildren<{
    overrides?: AddCourseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    addCourse?: any;
    onSubmit?: (fields: AddCourseUpdateFormInputValues) => AddCourseUpdateFormInputValues;
    onSuccess?: (fields: AddCourseUpdateFormInputValues) => void;
    onError?: (fields: AddCourseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AddCourseUpdateFormInputValues) => AddCourseUpdateFormInputValues;
    onValidate?: AddCourseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AddCourseUpdateForm(props: AddCourseUpdateFormProps): React.ReactElement;
