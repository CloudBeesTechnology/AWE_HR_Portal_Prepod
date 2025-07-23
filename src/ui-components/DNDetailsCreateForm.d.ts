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
export declare type DNDetailsCreateFormInputValues = {
    empID?: string;
    doeEmpSubmit?: string[];
    doeEmpApproval?: string[];
    doeEmpValid?: string[];
    doeEmpRefNo?: string[];
    doeEmpUpload?: string[];
    permitType?: string[];
    nlmsEmpSubmit?: string[];
    nlmsEmpSubmitRefNo?: string[];
    nlmsEmpApproval?: string[];
    nlmsRefNo?: string[];
    nlmsEmpValid?: string[];
    nlmsEmpUpload?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type DNDetailsCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    doeEmpSubmit?: ValidationFunction<string>;
    doeEmpApproval?: ValidationFunction<string>;
    doeEmpValid?: ValidationFunction<string>;
    doeEmpRefNo?: ValidationFunction<string>;
    doeEmpUpload?: ValidationFunction<string>;
    permitType?: ValidationFunction<string>;
    nlmsEmpSubmit?: ValidationFunction<string>;
    nlmsEmpSubmitRefNo?: ValidationFunction<string>;
    nlmsEmpApproval?: ValidationFunction<string>;
    nlmsRefNo?: ValidationFunction<string>;
    nlmsEmpValid?: ValidationFunction<string>;
    nlmsEmpUpload?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DNDetailsCreateFormOverridesProps = {
    DNDetailsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpApproval?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpValid?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    permitType?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpSubmitRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpApproval?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpValid?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type DNDetailsCreateFormProps = React.PropsWithChildren<{
    overrides?: DNDetailsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DNDetailsCreateFormInputValues) => DNDetailsCreateFormInputValues;
    onSuccess?: (fields: DNDetailsCreateFormInputValues) => void;
    onError?: (fields: DNDetailsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DNDetailsCreateFormInputValues) => DNDetailsCreateFormInputValues;
    onValidate?: DNDetailsCreateFormValidationValues;
} & React.CSSProperties>;
export default function DNDetailsCreateForm(props: DNDetailsCreateFormProps): React.ReactElement;
