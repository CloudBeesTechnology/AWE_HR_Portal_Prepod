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
export declare type BJLDetailsCreateFormInputValues = {
    empID?: string;
    bankSubmit?: string[];
    bankRece?: string[];
    bankRefNo?: string[];
    bankAmt?: string[];
    bankValid?: string[];
    bankEndorse?: string[];
    bankEmpUpload?: string[];
    tbaPurchase?: string[];
    jitpaAmt?: string[];
    jpValid?: string[];
    jpEndorse?: string[];
    jpEmpUpload?: string[];
    lbrReceiptNo?: string[];
    lbrDepoAmt?: string[];
    lbrDepoSubmit?: string[];
    lbrDepoUpload?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type BJLDetailsCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    bankSubmit?: ValidationFunction<string>;
    bankRece?: ValidationFunction<string>;
    bankRefNo?: ValidationFunction<string>;
    bankAmt?: ValidationFunction<string>;
    bankValid?: ValidationFunction<string>;
    bankEndorse?: ValidationFunction<string>;
    bankEmpUpload?: ValidationFunction<string>;
    tbaPurchase?: ValidationFunction<string>;
    jitpaAmt?: ValidationFunction<string>;
    jpValid?: ValidationFunction<string>;
    jpEndorse?: ValidationFunction<string>;
    jpEmpUpload?: ValidationFunction<string>;
    lbrReceiptNo?: ValidationFunction<string>;
    lbrDepoAmt?: ValidationFunction<string>;
    lbrDepoSubmit?: ValidationFunction<string>;
    lbrDepoUpload?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BJLDetailsCreateFormOverridesProps = {
    BJLDetailsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    bankSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    bankRece?: PrimitiveOverrideProps<TextFieldProps>;
    bankRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    bankAmt?: PrimitiveOverrideProps<TextFieldProps>;
    bankValid?: PrimitiveOverrideProps<TextFieldProps>;
    bankEndorse?: PrimitiveOverrideProps<TextFieldProps>;
    bankEmpUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    tbaPurchase?: PrimitiveOverrideProps<TextFieldProps>;
    jitpaAmt?: PrimitiveOverrideProps<TextFieldProps>;
    jpValid?: PrimitiveOverrideProps<TextFieldProps>;
    jpEndorse?: PrimitiveOverrideProps<TextFieldProps>;
    jpEmpUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    lbrReceiptNo?: PrimitiveOverrideProps<TextFieldProps>;
    lbrDepoAmt?: PrimitiveOverrideProps<TextFieldProps>;
    lbrDepoSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    lbrDepoUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type BJLDetailsCreateFormProps = React.PropsWithChildren<{
    overrides?: BJLDetailsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BJLDetailsCreateFormInputValues) => BJLDetailsCreateFormInputValues;
    onSuccess?: (fields: BJLDetailsCreateFormInputValues) => void;
    onError?: (fields: BJLDetailsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BJLDetailsCreateFormInputValues) => BJLDetailsCreateFormInputValues;
    onValidate?: BJLDetailsCreateFormValidationValues;
} & React.CSSProperties>;
export default function BJLDetailsCreateForm(props: BJLDetailsCreateFormProps): React.ReactElement;
