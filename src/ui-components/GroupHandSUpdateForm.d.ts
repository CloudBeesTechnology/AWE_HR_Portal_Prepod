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
export declare type GroupHandSUpdateFormInputValues = {
    groupHSExp?: string;
    groupHSNo?: string;
    groupHSUpload?: string[];
    updatedBy?: string[];
    createdBy?: string[];
};
export declare type GroupHandSUpdateFormValidationValues = {
    groupHSExp?: ValidationFunction<string>;
    groupHSNo?: ValidationFunction<string>;
    groupHSUpload?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroupHandSUpdateFormOverridesProps = {
    GroupHandSUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    groupHSExp?: PrimitiveOverrideProps<TextFieldProps>;
    groupHSNo?: PrimitiveOverrideProps<TextFieldProps>;
    groupHSUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type GroupHandSUpdateFormProps = React.PropsWithChildren<{
    overrides?: GroupHandSUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    groupHandS?: any;
    onSubmit?: (fields: GroupHandSUpdateFormInputValues) => GroupHandSUpdateFormInputValues;
    onSuccess?: (fields: GroupHandSUpdateFormInputValues) => void;
    onError?: (fields: GroupHandSUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GroupHandSUpdateFormInputValues) => GroupHandSUpdateFormInputValues;
    onValidate?: GroupHandSUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GroupHandSUpdateForm(props: GroupHandSUpdateFormProps): React.ReactElement;
