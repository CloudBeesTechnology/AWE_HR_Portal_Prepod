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
export declare type SampleTest1CreateFormInputValues = {
    name?: string;
    email?: string;
    gender?: string;
    empID?: string;
    password?: string;
    tempID?: string;
};
export declare type SampleTest1CreateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    empID?: ValidationFunction<string>;
    password?: ValidationFunction<string>;
    tempID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SampleTest1CreateFormOverridesProps = {
    SampleTest1CreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    password?: PrimitiveOverrideProps<TextFieldProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SampleTest1CreateFormProps = React.PropsWithChildren<{
    overrides?: SampleTest1CreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SampleTest1CreateFormInputValues) => SampleTest1CreateFormInputValues;
    onSuccess?: (fields: SampleTest1CreateFormInputValues) => void;
    onError?: (fields: SampleTest1CreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SampleTest1CreateFormInputValues) => SampleTest1CreateFormInputValues;
    onValidate?: SampleTest1CreateFormValidationValues;
} & React.CSSProperties>;
export default function SampleTest1CreateForm(props: SampleTest1CreateFormProps): React.ReactElement;
