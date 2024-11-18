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
export declare type EmpInsuranceCreateFormInputValues = {
    empID?: string;
    groupIns?: string[];
    groupInsEffectDate?: string[];
    groupInsEndDate?: string[];
    workmenComp?: string[];
    workmePolicyNo?: string[];
    travelIns?: string[];
    accidentIns?: string[];
    empInsUpload?: string[];
};
export declare type EmpInsuranceCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    groupIns?: ValidationFunction<string>;
    groupInsEffectDate?: ValidationFunction<string>;
    groupInsEndDate?: ValidationFunction<string>;
    workmenComp?: ValidationFunction<string>;
    workmePolicyNo?: ValidationFunction<string>;
    travelIns?: ValidationFunction<string>;
    accidentIns?: ValidationFunction<string>;
    empInsUpload?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpInsuranceCreateFormOverridesProps = {
    EmpInsuranceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    groupIns?: PrimitiveOverrideProps<TextFieldProps>;
    groupInsEffectDate?: PrimitiveOverrideProps<TextFieldProps>;
    groupInsEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    workmenComp?: PrimitiveOverrideProps<TextFieldProps>;
    workmePolicyNo?: PrimitiveOverrideProps<TextFieldProps>;
    travelIns?: PrimitiveOverrideProps<TextFieldProps>;
    accidentIns?: PrimitiveOverrideProps<TextFieldProps>;
    empInsUpload?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmpInsuranceCreateFormProps = React.PropsWithChildren<{
    overrides?: EmpInsuranceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmpInsuranceCreateFormInputValues) => EmpInsuranceCreateFormInputValues;
    onSuccess?: (fields: EmpInsuranceCreateFormInputValues) => void;
    onError?: (fields: EmpInsuranceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpInsuranceCreateFormInputValues) => EmpInsuranceCreateFormInputValues;
    onValidate?: EmpInsuranceCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmpInsuranceCreateForm(props: EmpInsuranceCreateFormProps): React.ReactElement;
