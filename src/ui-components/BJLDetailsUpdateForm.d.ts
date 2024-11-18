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
export declare type BJLDetailsUpdateFormInputValues = {
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
};
export declare type BJLDetailsUpdateFormValidationValues = {
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BJLDetailsUpdateFormOverridesProps = {
    BJLDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    bankSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    bankRece?: PrimitiveOverrideProps<TextFieldProps>;
    bankRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    bankAmt?: PrimitiveOverrideProps<TextFieldProps>;
    bankValid?: PrimitiveOverrideProps<TextFieldProps>;
    bankEndorse?: PrimitiveOverrideProps<TextFieldProps>;
    bankEmpUpload?: PrimitiveOverrideProps<TextFieldProps>;
    tbaPurchase?: PrimitiveOverrideProps<TextFieldProps>;
    jitpaAmt?: PrimitiveOverrideProps<TextFieldProps>;
    jpValid?: PrimitiveOverrideProps<TextFieldProps>;
    jpEndorse?: PrimitiveOverrideProps<TextFieldProps>;
    jpEmpUpload?: PrimitiveOverrideProps<TextFieldProps>;
    lbrReceiptNo?: PrimitiveOverrideProps<TextFieldProps>;
    lbrDepoAmt?: PrimitiveOverrideProps<TextFieldProps>;
    lbrDepoSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    lbrDepoUpload?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BJLDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: BJLDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bJLDetails?: any;
    onSubmit?: (fields: BJLDetailsUpdateFormInputValues) => BJLDetailsUpdateFormInputValues;
    onSuccess?: (fields: BJLDetailsUpdateFormInputValues) => void;
    onError?: (fields: BJLDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BJLDetailsUpdateFormInputValues) => BJLDetailsUpdateFormInputValues;
    onValidate?: BJLDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BJLDetailsUpdateForm(props: BJLDetailsUpdateFormProps): React.ReactElement;
