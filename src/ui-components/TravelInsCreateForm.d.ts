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
export declare type TravelInsCreateFormInputValues = {
    travelExp?: string;
    travelNo?: string;
    travelUp?: string[];
    updatedBy?: string[];
    createdBy?: string[];
};
export declare type TravelInsCreateFormValidationValues = {
    travelExp?: ValidationFunction<string>;
    travelNo?: ValidationFunction<string>;
    travelUp?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TravelInsCreateFormOverridesProps = {
    TravelInsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    travelExp?: PrimitiveOverrideProps<TextFieldProps>;
    travelNo?: PrimitiveOverrideProps<TextFieldProps>;
    travelUp?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TravelInsCreateFormProps = React.PropsWithChildren<{
    overrides?: TravelInsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TravelInsCreateFormInputValues) => TravelInsCreateFormInputValues;
    onSuccess?: (fields: TravelInsCreateFormInputValues) => void;
    onError?: (fields: TravelInsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TravelInsCreateFormInputValues) => TravelInsCreateFormInputValues;
    onValidate?: TravelInsCreateFormValidationValues;
} & React.CSSProperties>;
export default function TravelInsCreateForm(props: TravelInsCreateFormProps): React.ReactElement;
