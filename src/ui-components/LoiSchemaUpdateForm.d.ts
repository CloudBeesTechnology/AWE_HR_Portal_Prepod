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
export declare type LoiSchemaUpdateFormInputValues = {
    loiIssueDate?: string;
    loiAcceptDate?: string;
    loiDeclineDate?: string;
    declineReason?: string;
    loiFile?: string;
};
export declare type LoiSchemaUpdateFormValidationValues = {
    loiIssueDate?: ValidationFunction<string>;
    loiAcceptDate?: ValidationFunction<string>;
    loiDeclineDate?: ValidationFunction<string>;
    declineReason?: ValidationFunction<string>;
    loiFile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LoiSchemaUpdateFormOverridesProps = {
    LoiSchemaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    loiIssueDate?: PrimitiveOverrideProps<TextFieldProps>;
    loiAcceptDate?: PrimitiveOverrideProps<TextFieldProps>;
    loiDeclineDate?: PrimitiveOverrideProps<TextFieldProps>;
    declineReason?: PrimitiveOverrideProps<TextFieldProps>;
    loiFile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LoiSchemaUpdateFormProps = React.PropsWithChildren<{
    overrides?: LoiSchemaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    loiSchema?: any;
    onSubmit?: (fields: LoiSchemaUpdateFormInputValues) => LoiSchemaUpdateFormInputValues;
    onSuccess?: (fields: LoiSchemaUpdateFormInputValues) => void;
    onError?: (fields: LoiSchemaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LoiSchemaUpdateFormInputValues) => LoiSchemaUpdateFormInputValues;
    onValidate?: LoiSchemaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LoiSchemaUpdateForm(props: LoiSchemaUpdateFormProps): React.ReactElement;
