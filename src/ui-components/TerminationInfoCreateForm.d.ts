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
export declare type TerminationInfoCreateFormInputValues = {
    empID?: string;
    resignDate?: string;
    resignNotProb?: string;
    otherResignNotProb?: string;
    resignNotConf?: string;
    otherResignNotConf?: string;
    reasonResign?: string;
    reasonTerminate?: string;
    termiDate?: string;
    termiNotProb?: string;
    otherTermiNotProb?: string;
    termiNotConf?: string;
    otherTermiNotConf?: string;
    workInfoUploads?: string[];
};
export declare type TerminationInfoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    resignDate?: ValidationFunction<string>;
    resignNotProb?: ValidationFunction<string>;
    otherResignNotProb?: ValidationFunction<string>;
    resignNotConf?: ValidationFunction<string>;
    otherResignNotConf?: ValidationFunction<string>;
    reasonResign?: ValidationFunction<string>;
    reasonTerminate?: ValidationFunction<string>;
    termiDate?: ValidationFunction<string>;
    termiNotProb?: ValidationFunction<string>;
    otherTermiNotProb?: ValidationFunction<string>;
    termiNotConf?: ValidationFunction<string>;
    otherTermiNotConf?: ValidationFunction<string>;
    workInfoUploads?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TerminationInfoCreateFormOverridesProps = {
    TerminationInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    resignDate?: PrimitiveOverrideProps<TextFieldProps>;
    resignNotProb?: PrimitiveOverrideProps<TextFieldProps>;
    otherResignNotProb?: PrimitiveOverrideProps<TextFieldProps>;
    resignNotConf?: PrimitiveOverrideProps<TextFieldProps>;
    otherResignNotConf?: PrimitiveOverrideProps<TextFieldProps>;
    reasonResign?: PrimitiveOverrideProps<TextFieldProps>;
    reasonTerminate?: PrimitiveOverrideProps<TextFieldProps>;
    termiDate?: PrimitiveOverrideProps<TextFieldProps>;
    termiNotProb?: PrimitiveOverrideProps<TextFieldProps>;
    otherTermiNotProb?: PrimitiveOverrideProps<TextFieldProps>;
    termiNotConf?: PrimitiveOverrideProps<TextFieldProps>;
    otherTermiNotConf?: PrimitiveOverrideProps<TextFieldProps>;
    workInfoUploads?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TerminationInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: TerminationInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TerminationInfoCreateFormInputValues) => TerminationInfoCreateFormInputValues;
    onSuccess?: (fields: TerminationInfoCreateFormInputValues) => void;
    onError?: (fields: TerminationInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TerminationInfoCreateFormInputValues) => TerminationInfoCreateFormInputValues;
    onValidate?: TerminationInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function TerminationInfoCreateForm(props: TerminationInfoCreateFormProps): React.ReactElement;
