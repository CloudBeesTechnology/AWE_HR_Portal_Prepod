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
export declare type LoiSchemaCreateFormInputValues = {
    loiIssueDate?: string;
    loiAcceptDate?: string;
    loiDeclineDate?: string;
    declineReason?: string;
    loiFile?: string;
};
export declare type LoiSchemaCreateFormValidationValues = {
    loiIssueDate?: ValidationFunction<string>;
    loiAcceptDate?: ValidationFunction<string>;
    loiDeclineDate?: ValidationFunction<string>;
    declineReason?: ValidationFunction<string>;
    loiFile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LoiSchemaCreateFormOverridesProps = {
    LoiSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    loiIssueDate?: PrimitiveOverrideProps<TextFieldProps>;
    loiAcceptDate?: PrimitiveOverrideProps<TextFieldProps>;
    loiDeclineDate?: PrimitiveOverrideProps<TextFieldProps>;
    declineReason?: PrimitiveOverrideProps<TextFieldProps>;
    loiFile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LoiSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: LoiSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LoiSchemaCreateFormInputValues) => LoiSchemaCreateFormInputValues;
    onSuccess?: (fields: LoiSchemaCreateFormInputValues) => void;
    onError?: (fields: LoiSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LoiSchemaCreateFormInputValues) => LoiSchemaCreateFormInputValues;
    onValidate?: LoiSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function LoiSchemaCreateForm(props: LoiSchemaCreateFormProps): React.ReactElement;
