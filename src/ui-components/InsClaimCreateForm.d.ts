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
export declare type InsClaimCreateFormInputValues = {
    empID?: string;
    insuranceClaims?: string[];
};
export declare type InsClaimCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    insuranceClaims?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InsClaimCreateFormOverridesProps = {
    InsClaimCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    insuranceClaims?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type InsClaimCreateFormProps = React.PropsWithChildren<{
    overrides?: InsClaimCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InsClaimCreateFormInputValues) => InsClaimCreateFormInputValues;
    onSuccess?: (fields: InsClaimCreateFormInputValues) => void;
    onError?: (fields: InsClaimCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InsClaimCreateFormInputValues) => InsClaimCreateFormInputValues;
    onValidate?: InsClaimCreateFormValidationValues;
} & React.CSSProperties>;
export default function InsClaimCreateForm(props: InsClaimCreateFormProps): React.ReactElement;
