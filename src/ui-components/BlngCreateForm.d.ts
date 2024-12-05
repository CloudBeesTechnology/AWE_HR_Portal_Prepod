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
export declare type BlngCreateFormInputValues = {
    weeklySheet?: string[];
    date?: string;
    status?: string;
    manager?: string[];
};
export declare type BlngCreateFormValidationValues = {
    weeklySheet?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    manager?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BlngCreateFormOverridesProps = {
    BlngCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    weeklySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    manager?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type BlngCreateFormProps = React.PropsWithChildren<{
    overrides?: BlngCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BlngCreateFormInputValues) => BlngCreateFormInputValues;
    onSuccess?: (fields: BlngCreateFormInputValues) => void;
    onError?: (fields: BlngCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BlngCreateFormInputValues) => BlngCreateFormInputValues;
    onValidate?: BlngCreateFormValidationValues;
} & React.CSSProperties>;
export default function BlngCreateForm(props: BlngCreateFormProps): React.ReactElement;
