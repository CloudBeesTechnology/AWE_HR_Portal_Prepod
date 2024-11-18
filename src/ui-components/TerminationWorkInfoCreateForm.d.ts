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
export declare type TerminationWorkInfoCreateFormInputValues = {
    resignationDate?: string;
    terminationDate?: string;
    terminationNoticeProbation?: string;
    terminationNoticeConfirmation?: string;
    resignationNoticeProbation?: string;
    resignationNoticeConfirmation?: string;
    reasonOfResignation?: string;
    reasonOfTermination?: string;
    destinationOfEntitlement?: string;
    durationPeriodEntitlement?: string;
    dateOfEntitlement?: string;
    empID?: string;
};
export declare type TerminationWorkInfoCreateFormValidationValues = {
    resignationDate?: ValidationFunction<string>;
    terminationDate?: ValidationFunction<string>;
    terminationNoticeProbation?: ValidationFunction<string>;
    terminationNoticeConfirmation?: ValidationFunction<string>;
    resignationNoticeProbation?: ValidationFunction<string>;
    resignationNoticeConfirmation?: ValidationFunction<string>;
    reasonOfResignation?: ValidationFunction<string>;
    reasonOfTermination?: ValidationFunction<string>;
    destinationOfEntitlement?: ValidationFunction<string>;
    durationPeriodEntitlement?: ValidationFunction<string>;
    dateOfEntitlement?: ValidationFunction<string>;
    empID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TerminationWorkInfoCreateFormOverridesProps = {
    TerminationWorkInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    resignationDate?: PrimitiveOverrideProps<TextFieldProps>;
    terminationDate?: PrimitiveOverrideProps<TextFieldProps>;
    terminationNoticeProbation?: PrimitiveOverrideProps<TextFieldProps>;
    terminationNoticeConfirmation?: PrimitiveOverrideProps<TextFieldProps>;
    resignationNoticeProbation?: PrimitiveOverrideProps<TextFieldProps>;
    resignationNoticeConfirmation?: PrimitiveOverrideProps<TextFieldProps>;
    reasonOfResignation?: PrimitiveOverrideProps<TextFieldProps>;
    reasonOfTermination?: PrimitiveOverrideProps<TextFieldProps>;
    destinationOfEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    durationPeriodEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfEntitlement?: PrimitiveOverrideProps<TextFieldProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TerminationWorkInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: TerminationWorkInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TerminationWorkInfoCreateFormInputValues) => TerminationWorkInfoCreateFormInputValues;
    onSuccess?: (fields: TerminationWorkInfoCreateFormInputValues) => void;
    onError?: (fields: TerminationWorkInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TerminationWorkInfoCreateFormInputValues) => TerminationWorkInfoCreateFormInputValues;
    onValidate?: TerminationWorkInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function TerminationWorkInfoCreateForm(props: TerminationWorkInfoCreateFormProps): React.ReactElement;
