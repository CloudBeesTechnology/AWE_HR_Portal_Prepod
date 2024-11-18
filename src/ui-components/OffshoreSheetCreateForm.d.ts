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
export declare type OffshoreSheetCreateFormInputValues = {
    date?: string;
    dailySheet?: string[];
    status?: string;
};
export declare type OffshoreSheetCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    dailySheet?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OffshoreSheetCreateFormOverridesProps = {
    OffshoreSheetCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    dailySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OffshoreSheetCreateFormProps = React.PropsWithChildren<{
    overrides?: OffshoreSheetCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OffshoreSheetCreateFormInputValues) => OffshoreSheetCreateFormInputValues;
    onSuccess?: (fields: OffshoreSheetCreateFormInputValues) => void;
    onError?: (fields: OffshoreSheetCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OffshoreSheetCreateFormInputValues) => OffshoreSheetCreateFormInputValues;
    onValidate?: OffshoreSheetCreateFormValidationValues;
} & React.CSSProperties>;
export default function OffshoreSheetCreateForm(props: OffshoreSheetCreateFormProps): React.ReactElement;
