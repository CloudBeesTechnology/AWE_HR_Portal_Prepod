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
export declare type OffshoreSheetUpdateFormInputValues = {
    date?: string;
    dailySheet?: string[];
    status?: string;
    manager?: string[];
};
export declare type OffshoreSheetUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    dailySheet?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    manager?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OffshoreSheetUpdateFormOverridesProps = {
    OffshoreSheetUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    dailySheet?: PrimitiveOverrideProps<TextAreaFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    manager?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type OffshoreSheetUpdateFormProps = React.PropsWithChildren<{
    overrides?: OffshoreSheetUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    offshoreSheet?: any;
    onSubmit?: (fields: OffshoreSheetUpdateFormInputValues) => OffshoreSheetUpdateFormInputValues;
    onSuccess?: (fields: OffshoreSheetUpdateFormInputValues) => void;
    onError?: (fields: OffshoreSheetUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OffshoreSheetUpdateFormInputValues) => OffshoreSheetUpdateFormInputValues;
    onValidate?: OffshoreSheetUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OffshoreSheetUpdateForm(props: OffshoreSheetUpdateFormProps): React.ReactElement;
