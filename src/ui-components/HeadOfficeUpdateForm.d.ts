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
export declare type HeadOfficeUpdateFormInputValues = {
    dailySheet?: string[];
    date?: string;
    status?: string;
};
export declare type HeadOfficeUpdateFormValidationValues = {
    dailySheet?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HeadOfficeUpdateFormOverridesProps = {
    HeadOfficeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dailySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HeadOfficeUpdateFormProps = React.PropsWithChildren<{
    overrides?: HeadOfficeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    headOffice?: any;
    onSubmit?: (fields: HeadOfficeUpdateFormInputValues) => HeadOfficeUpdateFormInputValues;
    onSuccess?: (fields: HeadOfficeUpdateFormInputValues) => void;
    onError?: (fields: HeadOfficeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HeadOfficeUpdateFormInputValues) => HeadOfficeUpdateFormInputValues;
    onValidate?: HeadOfficeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HeadOfficeUpdateForm(props: HeadOfficeUpdateFormProps): React.ReactElement;
