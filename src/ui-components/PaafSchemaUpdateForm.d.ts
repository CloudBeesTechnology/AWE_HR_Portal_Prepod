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
export declare type PaafSchemaUpdateFormInputValues = {
    paafApproveDate?: string;
    paafFile?: string;
};
export declare type PaafSchemaUpdateFormValidationValues = {
    paafApproveDate?: ValidationFunction<string>;
    paafFile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PaafSchemaUpdateFormOverridesProps = {
    PaafSchemaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paafApproveDate?: PrimitiveOverrideProps<TextFieldProps>;
    paafFile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PaafSchemaUpdateFormProps = React.PropsWithChildren<{
    overrides?: PaafSchemaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    paafSchema?: any;
    onSubmit?: (fields: PaafSchemaUpdateFormInputValues) => PaafSchemaUpdateFormInputValues;
    onSuccess?: (fields: PaafSchemaUpdateFormInputValues) => void;
    onError?: (fields: PaafSchemaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PaafSchemaUpdateFormInputValues) => PaafSchemaUpdateFormInputValues;
    onValidate?: PaafSchemaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PaafSchemaUpdateForm(props: PaafSchemaUpdateFormProps): React.ReactElement;
