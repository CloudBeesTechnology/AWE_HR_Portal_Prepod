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
export declare type SDNDetailsUpdateFormInputValues = {
    empID?: string;
    sawpEmpLtrReq?: string[];
    sawpEmpLtrReci?: string[];
    sawpEmpUpload?: string[];
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
export declare type SDNDetailsUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    sawpEmpLtrReq?: ValidationFunction<string>;
    sawpEmpLtrReci?: ValidationFunction<string>;
    sawpEmpUpload?: ValidationFunction<string>;
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
export declare type SDNDetailsUpdateFormOverridesProps = {
    SDNDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    sawpEmpLtrReq?: PrimitiveOverrideProps<TextFieldProps>;
    sawpEmpLtrReci?: PrimitiveOverrideProps<TextFieldProps>;
    sawpEmpUpload?: PrimitiveOverrideProps<TextFieldProps>;
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
export declare type SDNDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SDNDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sDNDetails?: any;
    onSubmit?: (fields: SDNDetailsUpdateFormInputValues) => SDNDetailsUpdateFormInputValues;
    onSuccess?: (fields: SDNDetailsUpdateFormInputValues) => void;
    onError?: (fields: SDNDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SDNDetailsUpdateFormInputValues) => SDNDetailsUpdateFormInputValues;
    onValidate?: SDNDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SDNDetailsUpdateForm(props: SDNDetailsUpdateFormProps): React.ReactElement;
