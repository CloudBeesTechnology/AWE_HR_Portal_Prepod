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
export declare type EmpRequisitionCreateFormInputValues = {
    department?: string;
    justification?: string;
    project?: string;
    position?: string;
    quantity?: number;
    qualification?: string;
    reasonForReq?: string;
    replacementFor?: string;
    tentativeDate?: string;
    status?: string;
    remarkReq?: string;
    reqName?: string;
    requestorID?: string;
    approverID?: string;
};
export declare type EmpRequisitionCreateFormValidationValues = {
    department?: ValidationFunction<string>;
    justification?: ValidationFunction<string>;
    project?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    qualification?: ValidationFunction<string>;
    reasonForReq?: ValidationFunction<string>;
    replacementFor?: ValidationFunction<string>;
    tentativeDate?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    remarkReq?: ValidationFunction<string>;
    reqName?: ValidationFunction<string>;
    requestorID?: ValidationFunction<string>;
    approverID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpRequisitionCreateFormOverridesProps = {
    EmpRequisitionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    justification?: PrimitiveOverrideProps<TextFieldProps>;
    project?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    qualification?: PrimitiveOverrideProps<TextFieldProps>;
    reasonForReq?: PrimitiveOverrideProps<TextFieldProps>;
    replacementFor?: PrimitiveOverrideProps<TextFieldProps>;
    tentativeDate?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    remarkReq?: PrimitiveOverrideProps<TextFieldProps>;
    reqName?: PrimitiveOverrideProps<TextFieldProps>;
    requestorID?: PrimitiveOverrideProps<TextFieldProps>;
    approverID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmpRequisitionCreateFormProps = React.PropsWithChildren<{
    overrides?: EmpRequisitionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmpRequisitionCreateFormInputValues) => EmpRequisitionCreateFormInputValues;
    onSuccess?: (fields: EmpRequisitionCreateFormInputValues) => void;
    onError?: (fields: EmpRequisitionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpRequisitionCreateFormInputValues) => EmpRequisitionCreateFormInputValues;
    onValidate?: EmpRequisitionCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmpRequisitionCreateForm(props: EmpRequisitionCreateFormProps): React.ReactElement;
