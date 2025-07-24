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
export declare type WorkMenUpdateFormInputValues = {
    empStatusType?: string;
    workmenCompExp?: string;
    workmenCompNo?: string;
    workmenComUp?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type WorkMenUpdateFormValidationValues = {
    empStatusType?: ValidationFunction<string>;
    workmenCompExp?: ValidationFunction<string>;
    workmenCompNo?: ValidationFunction<string>;
    workmenComUp?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkMenUpdateFormOverridesProps = {
    WorkMenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empStatusType?: PrimitiveOverrideProps<TextFieldProps>;
    workmenCompExp?: PrimitiveOverrideProps<TextFieldProps>;
    workmenCompNo?: PrimitiveOverrideProps<TextFieldProps>;
    workmenComUp?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type WorkMenUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkMenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    workMen?: any;
    onSubmit?: (fields: WorkMenUpdateFormInputValues) => WorkMenUpdateFormInputValues;
    onSuccess?: (fields: WorkMenUpdateFormInputValues) => void;
    onError?: (fields: WorkMenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkMenUpdateFormInputValues) => WorkMenUpdateFormInputValues;
    onValidate?: WorkMenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkMenUpdateForm(props: WorkMenUpdateFormProps): React.ReactElement;
