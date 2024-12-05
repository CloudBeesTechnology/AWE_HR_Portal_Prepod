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
export declare type InsuranceTypeUpdateFormInputValues = {
    typeIns?: string;
    insDetails?: string[];
};
export declare type InsuranceTypeUpdateFormValidationValues = {
    typeIns?: ValidationFunction<string>;
    insDetails?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InsuranceTypeUpdateFormOverridesProps = {
    InsuranceTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    typeIns?: PrimitiveOverrideProps<TextFieldProps>;
    insDetails?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InsuranceTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: InsuranceTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    insuranceType?: any;
    onSubmit?: (fields: InsuranceTypeUpdateFormInputValues) => InsuranceTypeUpdateFormInputValues;
    onSuccess?: (fields: InsuranceTypeUpdateFormInputValues) => void;
    onError?: (fields: InsuranceTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InsuranceTypeUpdateFormInputValues) => InsuranceTypeUpdateFormInputValues;
    onValidate?: InsuranceTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InsuranceTypeUpdateForm(props: InsuranceTypeUpdateFormProps): React.ReactElement;
