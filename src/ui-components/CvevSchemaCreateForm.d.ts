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
export declare type CvevSchemaCreateFormInputValues = {
    cvecApproveDate?: string;
    cvecFile?: string;
};
export declare type CvevSchemaCreateFormValidationValues = {
    cvecApproveDate?: ValidationFunction<string>;
    cvecFile?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CvevSchemaCreateFormOverridesProps = {
    CvevSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cvecApproveDate?: PrimitiveOverrideProps<TextFieldProps>;
    cvecFile?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CvevSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: CvevSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CvevSchemaCreateFormInputValues) => CvevSchemaCreateFormInputValues;
    onSuccess?: (fields: CvevSchemaCreateFormInputValues) => void;
    onError?: (fields: CvevSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CvevSchemaCreateFormInputValues) => CvevSchemaCreateFormInputValues;
    onValidate?: CvevSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function CvevSchemaCreateForm(props: CvevSchemaCreateFormProps): React.ReactElement;
