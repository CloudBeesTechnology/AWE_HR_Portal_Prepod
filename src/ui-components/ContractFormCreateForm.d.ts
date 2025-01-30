/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ContractFormCreateFormInputValues = {
    empID?: string;
    conAttn?: string;
    depHead?: string;
    hrManager?: string;
    genManager?: string;
    remarks?: string;
    contStatus?: boolean;
};
export declare type ContractFormCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    conAttn?: ValidationFunction<string>;
    depHead?: ValidationFunction<string>;
    hrManager?: ValidationFunction<string>;
    genManager?: ValidationFunction<string>;
    remarks?: ValidationFunction<string>;
    contStatus?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContractFormCreateFormOverridesProps = {
    ContractFormCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    conAttn?: PrimitiveOverrideProps<TextFieldProps>;
    depHead?: PrimitiveOverrideProps<TextFieldProps>;
    hrManager?: PrimitiveOverrideProps<TextFieldProps>;
    genManager?: PrimitiveOverrideProps<TextFieldProps>;
    remarks?: PrimitiveOverrideProps<TextFieldProps>;
    contStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ContractFormCreateFormProps = React.PropsWithChildren<{
    overrides?: ContractFormCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ContractFormCreateFormInputValues) => ContractFormCreateFormInputValues;
    onSuccess?: (fields: ContractFormCreateFormInputValues) => void;
    onError?: (fields: ContractFormCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContractFormCreateFormInputValues) => ContractFormCreateFormInputValues;
    onValidate?: ContractFormCreateFormValidationValues;
} & React.CSSProperties>;
export default function ContractFormCreateForm(props: ContractFormCreateFormProps): React.ReactElement;
