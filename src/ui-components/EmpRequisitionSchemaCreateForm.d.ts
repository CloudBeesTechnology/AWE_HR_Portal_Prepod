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
export declare type EmpRequisitionSchemaCreateFormInputValues = {
    department?: string;
    justification?: string;
    project?: string;
    position?: string;
    quantity?: number;
    qualification?: string;
    reasonForReq?: string;
    replacementFor?: string;
    tentativeDate?: string;
};
export declare type EmpRequisitionSchemaCreateFormValidationValues = {
    department?: ValidationFunction<string>;
    justification?: ValidationFunction<string>;
    project?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    qualification?: ValidationFunction<string>;
    reasonForReq?: ValidationFunction<string>;
    replacementFor?: ValidationFunction<string>;
    tentativeDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpRequisitionSchemaCreateFormOverridesProps = {
    EmpRequisitionSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    justification?: PrimitiveOverrideProps<TextFieldProps>;
    project?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    qualification?: PrimitiveOverrideProps<TextFieldProps>;
    reasonForReq?: PrimitiveOverrideProps<TextFieldProps>;
    replacementFor?: PrimitiveOverrideProps<TextFieldProps>;
    tentativeDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmpRequisitionSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: EmpRequisitionSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmpRequisitionSchemaCreateFormInputValues) => EmpRequisitionSchemaCreateFormInputValues;
    onSuccess?: (fields: EmpRequisitionSchemaCreateFormInputValues) => void;
    onError?: (fields: EmpRequisitionSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpRequisitionSchemaCreateFormInputValues) => EmpRequisitionSchemaCreateFormInputValues;
    onValidate?: EmpRequisitionSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmpRequisitionSchemaCreateForm(props: EmpRequisitionSchemaCreateFormProps): React.ReactElement;
