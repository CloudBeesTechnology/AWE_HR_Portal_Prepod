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
export declare type SampleTest1UpdateFormInputValues = {
    name?: string;
    email?: string;
    gender?: string;
    empID?: string;
    password?: string;
    tempID?: string;
};
export declare type SampleTest1UpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    empID?: ValidationFunction<string>;
    password?: ValidationFunction<string>;
    tempID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SampleTest1UpdateFormOverridesProps = {
    SampleTest1UpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    password?: PrimitiveOverrideProps<TextFieldProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SampleTest1UpdateFormProps = React.PropsWithChildren<{
    overrides?: SampleTest1UpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sampleTest1?: any;
    onSubmit?: (fields: SampleTest1UpdateFormInputValues) => SampleTest1UpdateFormInputValues;
    onSuccess?: (fields: SampleTest1UpdateFormInputValues) => void;
    onError?: (fields: SampleTest1UpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SampleTest1UpdateFormInputValues) => SampleTest1UpdateFormInputValues;
    onValidate?: SampleTest1UpdateFormValidationValues;
} & React.CSSProperties>;
export default function SampleTest1UpdateForm(props: SampleTest1UpdateFormProps): React.ReactElement;
