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
export declare type ContractFormUpdateFormInputValues = {
    empID?: string;
    conAttn?: string;
    depHead?: string;
    hrManager?: string;
    genManager?: string;
    remarks?: string;
    contStatus?: boolean;
    remarkHr?: string;
    remarkGm?: string;
    renewalContract?: string;
};
export declare type ContractFormUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    conAttn?: ValidationFunction<string>;
    depHead?: ValidationFunction<string>;
    hrManager?: ValidationFunction<string>;
    genManager?: ValidationFunction<string>;
    remarks?: ValidationFunction<string>;
    contStatus?: ValidationFunction<boolean>;
    remarkHr?: ValidationFunction<string>;
    remarkGm?: ValidationFunction<string>;
    renewalContract?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContractFormUpdateFormOverridesProps = {
    ContractFormUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    conAttn?: PrimitiveOverrideProps<TextFieldProps>;
    depHead?: PrimitiveOverrideProps<TextFieldProps>;
    hrManager?: PrimitiveOverrideProps<TextFieldProps>;
    genManager?: PrimitiveOverrideProps<TextFieldProps>;
    remarks?: PrimitiveOverrideProps<TextFieldProps>;
    contStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    remarkHr?: PrimitiveOverrideProps<TextFieldProps>;
    remarkGm?: PrimitiveOverrideProps<TextFieldProps>;
    renewalContract?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContractFormUpdateFormProps = React.PropsWithChildren<{
    overrides?: ContractFormUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    contractForm?: any;
    onSubmit?: (fields: ContractFormUpdateFormInputValues) => ContractFormUpdateFormInputValues;
    onSuccess?: (fields: ContractFormUpdateFormInputValues) => void;
    onError?: (fields: ContractFormUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContractFormUpdateFormInputValues) => ContractFormUpdateFormInputValues;
    onValidate?: ContractFormUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ContractFormUpdateForm(props: ContractFormUpdateFormProps): React.ReactElement;
