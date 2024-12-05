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
export declare type WorkMenCreateFormInputValues = {
    empStatusType?: string;
    workmenCompExp?: string;
    workmenCompNo?: string;
    workmenComUp?: string[];
};
export declare type WorkMenCreateFormValidationValues = {
    empStatusType?: ValidationFunction<string>;
    workmenCompExp?: ValidationFunction<string>;
    workmenCompNo?: ValidationFunction<string>;
    workmenComUp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkMenCreateFormOverridesProps = {
    WorkMenCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empStatusType?: PrimitiveOverrideProps<TextFieldProps>;
    workmenCompExp?: PrimitiveOverrideProps<TextFieldProps>;
    workmenCompNo?: PrimitiveOverrideProps<TextFieldProps>;
    workmenComUp?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type WorkMenCreateFormProps = React.PropsWithChildren<{
    overrides?: WorkMenCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WorkMenCreateFormInputValues) => WorkMenCreateFormInputValues;
    onSuccess?: (fields: WorkMenCreateFormInputValues) => void;
    onError?: (fields: WorkMenCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkMenCreateFormInputValues) => WorkMenCreateFormInputValues;
    onValidate?: WorkMenCreateFormValidationValues;
} & React.CSSProperties>;
export default function WorkMenCreateForm(props: WorkMenCreateFormProps): React.ReactElement;
