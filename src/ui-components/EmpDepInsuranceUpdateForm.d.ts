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
export declare type EmpDepInsuranceUpdateFormInputValues = {
    empID?: string;
    depInsurance?: string[];
};
export declare type EmpDepInsuranceUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    depInsurance?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpDepInsuranceUpdateFormOverridesProps = {
    EmpDepInsuranceUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    depInsurance?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type EmpDepInsuranceUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmpDepInsuranceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    empDepInsurance?: any;
    onSubmit?: (fields: EmpDepInsuranceUpdateFormInputValues) => EmpDepInsuranceUpdateFormInputValues;
    onSuccess?: (fields: EmpDepInsuranceUpdateFormInputValues) => void;
    onError?: (fields: EmpDepInsuranceUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpDepInsuranceUpdateFormInputValues) => EmpDepInsuranceUpdateFormInputValues;
    onValidate?: EmpDepInsuranceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmpDepInsuranceUpdateForm(props: EmpDepInsuranceUpdateFormProps): React.ReactElement;
