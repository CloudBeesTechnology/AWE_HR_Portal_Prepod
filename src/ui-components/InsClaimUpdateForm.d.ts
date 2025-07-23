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
export declare type InsClaimUpdateFormInputValues = {
    empID?: string;
    insuranceClaims?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type InsClaimUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    insuranceClaims?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InsClaimUpdateFormOverridesProps = {
    InsClaimUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    insuranceClaims?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type InsClaimUpdateFormProps = React.PropsWithChildren<{
    overrides?: InsClaimUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    insClaim?: any;
    onSubmit?: (fields: InsClaimUpdateFormInputValues) => InsClaimUpdateFormInputValues;
    onSuccess?: (fields: InsClaimUpdateFormInputValues) => void;
    onError?: (fields: InsClaimUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InsClaimUpdateFormInputValues) => InsClaimUpdateFormInputValues;
    onValidate?: InsClaimUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InsClaimUpdateForm(props: InsClaimUpdateFormProps): React.ReactElement;
