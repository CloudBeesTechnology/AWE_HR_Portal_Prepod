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
export declare type ProbFormCreateFormInputValues = {
    empID?: string;
    adaptability?: string;
    additionalInfo?: string;
    attention?: string;
    attitude?: string;
    commitment?: string;
    communication?: string;
    deadline?: string;
    department?: string;
    diligent?: string;
    doj?: string;
    empBadgeNo?: string;
    extendedProbationEndDate?: string;
    extensionPeriod?: string;
    gmApproved?: boolean;
    gmDate?: string;
    hrDate?: string;
    hrName?: string;
    initiative?: string;
    managerApproved?: boolean;
    managerDate?: string;
    managerName?: string;
    name?: string;
    pace?: string;
    position?: string;
    probationEnd?: string;
    quality?: string;
    recommendation?: string;
    responsibility?: string;
    supervisorApproved?: boolean;
    supervisorDate?: string;
    supervisorName?: string;
    teamwork?: string;
};
export declare type ProbFormCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    adaptability?: ValidationFunction<string>;
    additionalInfo?: ValidationFunction<string>;
    attention?: ValidationFunction<string>;
    attitude?: ValidationFunction<string>;
    commitment?: ValidationFunction<string>;
    communication?: ValidationFunction<string>;
    deadline?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
    diligent?: ValidationFunction<string>;
    doj?: ValidationFunction<string>;
    empBadgeNo?: ValidationFunction<string>;
    extendedProbationEndDate?: ValidationFunction<string>;
    extensionPeriod?: ValidationFunction<string>;
    gmApproved?: ValidationFunction<boolean>;
    gmDate?: ValidationFunction<string>;
    hrDate?: ValidationFunction<string>;
    hrName?: ValidationFunction<string>;
    initiative?: ValidationFunction<string>;
    managerApproved?: ValidationFunction<boolean>;
    managerDate?: ValidationFunction<string>;
    managerName?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    pace?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    probationEnd?: ValidationFunction<string>;
    quality?: ValidationFunction<string>;
    recommendation?: ValidationFunction<string>;
    responsibility?: ValidationFunction<string>;
    supervisorApproved?: ValidationFunction<boolean>;
    supervisorDate?: ValidationFunction<string>;
    supervisorName?: ValidationFunction<string>;
    teamwork?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProbFormCreateFormOverridesProps = {
    ProbFormCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    adaptability?: PrimitiveOverrideProps<TextFieldProps>;
    additionalInfo?: PrimitiveOverrideProps<TextFieldProps>;
    attention?: PrimitiveOverrideProps<TextFieldProps>;
    attitude?: PrimitiveOverrideProps<TextFieldProps>;
    commitment?: PrimitiveOverrideProps<TextFieldProps>;
    communication?: PrimitiveOverrideProps<TextFieldProps>;
    deadline?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    diligent?: PrimitiveOverrideProps<TextFieldProps>;
    doj?: PrimitiveOverrideProps<TextFieldProps>;
    empBadgeNo?: PrimitiveOverrideProps<TextFieldProps>;
    extendedProbationEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    extensionPeriod?: PrimitiveOverrideProps<TextFieldProps>;
    gmApproved?: PrimitiveOverrideProps<SwitchFieldProps>;
    gmDate?: PrimitiveOverrideProps<TextFieldProps>;
    hrDate?: PrimitiveOverrideProps<TextFieldProps>;
    hrName?: PrimitiveOverrideProps<TextFieldProps>;
    initiative?: PrimitiveOverrideProps<TextFieldProps>;
    managerApproved?: PrimitiveOverrideProps<SwitchFieldProps>;
    managerDate?: PrimitiveOverrideProps<TextFieldProps>;
    managerName?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    pace?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    probationEnd?: PrimitiveOverrideProps<TextFieldProps>;
    quality?: PrimitiveOverrideProps<TextFieldProps>;
    recommendation?: PrimitiveOverrideProps<TextFieldProps>;
    responsibility?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorApproved?: PrimitiveOverrideProps<SwitchFieldProps>;
    supervisorDate?: PrimitiveOverrideProps<TextFieldProps>;
    supervisorName?: PrimitiveOverrideProps<TextFieldProps>;
    teamwork?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProbFormCreateFormProps = React.PropsWithChildren<{
    overrides?: ProbFormCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProbFormCreateFormInputValues) => ProbFormCreateFormInputValues;
    onSuccess?: (fields: ProbFormCreateFormInputValues) => void;
    onError?: (fields: ProbFormCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProbFormCreateFormInputValues) => ProbFormCreateFormInputValues;
    onValidate?: ProbFormCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProbFormCreateForm(props: ProbFormCreateFormProps): React.ReactElement;
