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
export declare type BlngUpdateFormInputValues = {
    weeklySheet?: string[];
    date?: string;
    status?: string;
};
export declare type BlngUpdateFormValidationValues = {
    weeklySheet?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BlngUpdateFormOverridesProps = {
    BlngUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    weeklySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BlngUpdateFormProps = React.PropsWithChildren<{
    overrides?: BlngUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    blng?: any;
    onSubmit?: (fields: BlngUpdateFormInputValues) => BlngUpdateFormInputValues;
    onSuccess?: (fields: BlngUpdateFormInputValues) => void;
    onError?: (fields: BlngUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BlngUpdateFormInputValues) => BlngUpdateFormInputValues;
    onValidate?: BlngUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BlngUpdateForm(props: BlngUpdateFormProps): React.ReactElement;
