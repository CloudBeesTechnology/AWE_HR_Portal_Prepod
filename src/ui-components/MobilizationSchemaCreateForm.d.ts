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
export declare type MobilizationSchemaCreateFormInputValues = {
    mobSignDate?: string;
    mobFile?: string;
};
export declare type MobilizationSchemaCreateFormValidationValues = {
    mobSignDate?: ValidationFunction<string>;
    mobFile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MobilizationSchemaCreateFormOverridesProps = {
    MobilizationSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    mobSignDate?: PrimitiveOverrideProps<TextFieldProps>;
    mobFile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MobilizationSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: MobilizationSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MobilizationSchemaCreateFormInputValues) => MobilizationSchemaCreateFormInputValues;
    onSuccess?: (fields: MobilizationSchemaCreateFormInputValues) => void;
    onError?: (fields: MobilizationSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MobilizationSchemaCreateFormInputValues) => MobilizationSchemaCreateFormInputValues;
    onValidate?: MobilizationSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function MobilizationSchemaCreateForm(props: MobilizationSchemaCreateFormProps): React.ReactElement;
