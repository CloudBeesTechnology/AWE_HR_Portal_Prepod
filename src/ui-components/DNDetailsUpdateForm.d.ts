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
export declare type DNDetailsUpdateFormInputValues = {
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
};
export declare type DNDetailsUpdateFormValidationValues = {
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DNDetailsUpdateFormOverridesProps = {
    DNDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpApproval?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpValid?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    doeEmpUpload?: PrimitiveOverrideProps<TextFieldProps>;
    permitType?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpSubmitRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpApproval?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpValid?: PrimitiveOverrideProps<TextFieldProps>;
    nlmsEmpUpload?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DNDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: DNDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    dNDetails?: any;
    onSubmit?: (fields: DNDetailsUpdateFormInputValues) => DNDetailsUpdateFormInputValues;
    onSuccess?: (fields: DNDetailsUpdateFormInputValues) => void;
    onError?: (fields: DNDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DNDetailsUpdateFormInputValues) => DNDetailsUpdateFormInputValues;
    onValidate?: DNDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DNDetailsUpdateForm(props: DNDetailsUpdateFormProps): React.ReactElement;
