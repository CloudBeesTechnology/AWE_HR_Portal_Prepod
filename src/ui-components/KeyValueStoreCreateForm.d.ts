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
export declare type KeyValueStoreCreateFormInputValues = {
    departmentDD?: string[];
    positionDD?: string[];
    jobCatDD?: string[];
    raceDD?: string[];
    religionDD?: string[];
    nationalityDD?: string[];
    countryORDD?: string[];
    educLevelDD?: string[];
    workStatusDD?: string[];
    relationshipDD?: string[];
    resignNotifProbDD?: string[];
    termiNotifProbDD?: string[];
    resignNotifConfDD?: string[];
    termiNotifConfDD?: string[];
    workPermitDD?: string;
    insuHSDD?: string[];
    insuClaimDD?: string[];
};
export declare type KeyValueStoreCreateFormValidationValues = {
    departmentDD?: ValidationFunction<string>;
    positionDD?: ValidationFunction<string>;
    jobCatDD?: ValidationFunction<string>;
    raceDD?: ValidationFunction<string>;
    religionDD?: ValidationFunction<string>;
    nationalityDD?: ValidationFunction<string>;
    countryORDD?: ValidationFunction<string>;
    educLevelDD?: ValidationFunction<string>;
    workStatusDD?: ValidationFunction<string>;
    relationshipDD?: ValidationFunction<string>;
    resignNotifProbDD?: ValidationFunction<string>;
    termiNotifProbDD?: ValidationFunction<string>;
    resignNotifConfDD?: ValidationFunction<string>;
    termiNotifConfDD?: ValidationFunction<string>;
    workPermitDD?: ValidationFunction<string>;
    insuHSDD?: ValidationFunction<string>;
    insuClaimDD?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type KeyValueStoreCreateFormOverridesProps = {
    KeyValueStoreCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    departmentDD?: PrimitiveOverrideProps<TextFieldProps>;
    positionDD?: PrimitiveOverrideProps<TextFieldProps>;
    jobCatDD?: PrimitiveOverrideProps<TextFieldProps>;
    raceDD?: PrimitiveOverrideProps<TextFieldProps>;
    religionDD?: PrimitiveOverrideProps<TextFieldProps>;
    nationalityDD?: PrimitiveOverrideProps<TextFieldProps>;
    countryORDD?: PrimitiveOverrideProps<TextFieldProps>;
    educLevelDD?: PrimitiveOverrideProps<TextFieldProps>;
    workStatusDD?: PrimitiveOverrideProps<TextFieldProps>;
    relationshipDD?: PrimitiveOverrideProps<TextFieldProps>;
    resignNotifProbDD?: PrimitiveOverrideProps<TextFieldProps>;
    termiNotifProbDD?: PrimitiveOverrideProps<TextFieldProps>;
    resignNotifConfDD?: PrimitiveOverrideProps<TextFieldProps>;
    termiNotifConfDD?: PrimitiveOverrideProps<TextFieldProps>;
    workPermitDD?: PrimitiveOverrideProps<TextFieldProps>;
    insuHSDD?: PrimitiveOverrideProps<TextFieldProps>;
    insuClaimDD?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type KeyValueStoreCreateFormProps = React.PropsWithChildren<{
    overrides?: KeyValueStoreCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: KeyValueStoreCreateFormInputValues) => KeyValueStoreCreateFormInputValues;
    onSuccess?: (fields: KeyValueStoreCreateFormInputValues) => void;
    onError?: (fields: KeyValueStoreCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: KeyValueStoreCreateFormInputValues) => KeyValueStoreCreateFormInputValues;
    onValidate?: KeyValueStoreCreateFormValidationValues;
} & React.CSSProperties>;
export default function KeyValueStoreCreateForm(props: KeyValueStoreCreateFormProps): React.ReactElement;
