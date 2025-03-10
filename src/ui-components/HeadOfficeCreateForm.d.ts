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
export declare type HeadOfficeCreateFormInputValues = {
    dailySheet?: string[];
    date?: string;
    status?: string;
    manager?: string[];
};
export declare type HeadOfficeCreateFormValidationValues = {
    dailySheet?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    manager?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HeadOfficeCreateFormOverridesProps = {
    HeadOfficeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dailySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    manager?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type HeadOfficeCreateFormProps = React.PropsWithChildren<{
    overrides?: HeadOfficeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HeadOfficeCreateFormInputValues) => HeadOfficeCreateFormInputValues;
    onSuccess?: (fields: HeadOfficeCreateFormInputValues) => void;
    onError?: (fields: HeadOfficeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HeadOfficeCreateFormInputValues) => HeadOfficeCreateFormInputValues;
    onValidate?: HeadOfficeCreateFormValidationValues;
} & React.CSSProperties>;
export default function HeadOfficeCreateForm(props: HeadOfficeCreateFormProps): React.ReactElement;
