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
export declare type SawpDetailsCreateFormInputValues = {
    empID?: string;
    sawpEmpLtrReq?: string[];
    sawpEmpLtrReci?: string[];
    sawpEmpUpload?: string[];
};
export declare type SawpDetailsCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    sawpEmpLtrReq?: ValidationFunction<string>;
    sawpEmpLtrReci?: ValidationFunction<string>;
    sawpEmpUpload?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SawpDetailsCreateFormOverridesProps = {
    SawpDetailsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    sawpEmpLtrReq?: PrimitiveOverrideProps<TextFieldProps>;
    sawpEmpLtrReci?: PrimitiveOverrideProps<TextFieldProps>;
    sawpEmpUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type SawpDetailsCreateFormProps = React.PropsWithChildren<{
    overrides?: SawpDetailsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SawpDetailsCreateFormInputValues) => SawpDetailsCreateFormInputValues;
    onSuccess?: (fields: SawpDetailsCreateFormInputValues) => void;
    onError?: (fields: SawpDetailsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SawpDetailsCreateFormInputValues) => SawpDetailsCreateFormInputValues;
    onValidate?: SawpDetailsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SawpDetailsCreateForm(props: SawpDetailsCreateFormProps): React.ReactElement;
