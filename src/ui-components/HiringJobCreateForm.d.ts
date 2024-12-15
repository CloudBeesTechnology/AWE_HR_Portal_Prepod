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
export declare type HiringJobCreateFormInputValues = {
    jobTitle?: string;
    exper?: string;
    location?: string;
    quantityPerson?: string;
    startDate?: string;
    expiryDate?: string;
    jobContent?: string;
    uploadJobDetails?: string;
};
export declare type HiringJobCreateFormValidationValues = {
    jobTitle?: ValidationFunction<string>;
    exper?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    quantityPerson?: ValidationFunction<string>;
    startDate?: ValidationFunction<string>;
    expiryDate?: ValidationFunction<string>;
    jobContent?: ValidationFunction<string>;
    uploadJobDetails?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HiringJobCreateFormOverridesProps = {
    HiringJobCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    jobTitle?: PrimitiveOverrideProps<TextFieldProps>;
    exper?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    quantityPerson?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    expiryDate?: PrimitiveOverrideProps<TextFieldProps>;
    jobContent?: PrimitiveOverrideProps<TextFieldProps>;
    uploadJobDetails?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HiringJobCreateFormProps = React.PropsWithChildren<{
    overrides?: HiringJobCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HiringJobCreateFormInputValues) => HiringJobCreateFormInputValues;
    onSuccess?: (fields: HiringJobCreateFormInputValues) => void;
    onError?: (fields: HiringJobCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HiringJobCreateFormInputValues) => HiringJobCreateFormInputValues;
    onValidate?: HiringJobCreateFormValidationValues;
} & React.CSSProperties>;
export default function HiringJobCreateForm(props: HiringJobCreateFormProps): React.ReactElement;
