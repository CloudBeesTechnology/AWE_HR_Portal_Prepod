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
export declare type SBWSheetCreateFormInputValues = {
    date?: string;
    dailySheet?: string[];
    status?: string;
};
export declare type SBWSheetCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    dailySheet?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SBWSheetCreateFormOverridesProps = {
    SBWSheetCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    dailySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SBWSheetCreateFormProps = React.PropsWithChildren<{
    overrides?: SBWSheetCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SBWSheetCreateFormInputValues) => SBWSheetCreateFormInputValues;
    onSuccess?: (fields: SBWSheetCreateFormInputValues) => void;
    onError?: (fields: SBWSheetCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SBWSheetCreateFormInputValues) => SBWSheetCreateFormInputValues;
    onValidate?: SBWSheetCreateFormValidationValues;
} & React.CSSProperties>;
export default function SBWSheetCreateForm(props: SBWSheetCreateFormProps): React.ReactElement;
