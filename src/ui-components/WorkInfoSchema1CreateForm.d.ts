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
export declare type WorkInfoSchema1CreateFormInputValues = {
    empID?: string;
    dateOfJoin?: string;
    department?: string;
    workPosition?: string;
    upgradePosition?: string;
    jobDescription?: string;
    skillPool?: string;
    workStatus?: string;
    contractStartDate?: string;
    contractEndDate?: string;
    contractPeriodStatus?: string;
    probationaryStartDate?: string;
    probationaryEndDate?: string;
    normalWorkingHours?: string;
    salaryType?: string;
    employmentWorkStatus?: string;
    resignationDate?: string;
    terminationDate?: string;
    terminationNoticeProbation?: string;
    terminationNoticeConfirmation?: string;
    resignationNoticeProbation?: string;
    resignationNoticeConfirmation?: string;
    reasonOfResignation?: string;
};
export declare type WorkInfoSchema1CreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    dateOfJoin?: ValidationFunction<string>;
    department?: ValidationFunction<string>;
    workPosition?: ValidationFunction<string>;
    upgradePosition?: ValidationFunction<string>;
    jobDescription?: ValidationFunction<string>;
    skillPool?: ValidationFunction<string>;
    workStatus?: ValidationFunction<string>;
    contractStartDate?: ValidationFunction<string>;
    contractEndDate?: ValidationFunction<string>;
    contractPeriodStatus?: ValidationFunction<string>;
    probationaryStartDate?: ValidationFunction<string>;
    probationaryEndDate?: ValidationFunction<string>;
    normalWorkingHours?: ValidationFunction<string>;
    salaryType?: ValidationFunction<string>;
    employmentWorkStatus?: ValidationFunction<string>;
    resignationDate?: ValidationFunction<string>;
    terminationDate?: ValidationFunction<string>;
    terminationNoticeProbation?: ValidationFunction<string>;
    terminationNoticeConfirmation?: ValidationFunction<string>;
    resignationNoticeProbation?: ValidationFunction<string>;
    resignationNoticeConfirmation?: ValidationFunction<string>;
    reasonOfResignation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkInfoSchema1CreateFormOverridesProps = {
    WorkInfoSchema1CreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfJoin?: PrimitiveOverrideProps<TextFieldProps>;
    department?: PrimitiveOverrideProps<TextFieldProps>;
    workPosition?: PrimitiveOverrideProps<TextFieldProps>;
    upgradePosition?: PrimitiveOverrideProps<TextFieldProps>;
    jobDescription?: PrimitiveOverrideProps<TextFieldProps>;
    skillPool?: PrimitiveOverrideProps<TextFieldProps>;
    workStatus?: PrimitiveOverrideProps<TextFieldProps>;
    contractStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    contractEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    contractPeriodStatus?: PrimitiveOverrideProps<TextFieldProps>;
    probationaryStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    probationaryEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkingHours?: PrimitiveOverrideProps<TextFieldProps>;
    salaryType?: PrimitiveOverrideProps<TextFieldProps>;
    employmentWorkStatus?: PrimitiveOverrideProps<TextFieldProps>;
    resignationDate?: PrimitiveOverrideProps<TextFieldProps>;
    terminationDate?: PrimitiveOverrideProps<TextFieldProps>;
    terminationNoticeProbation?: PrimitiveOverrideProps<TextFieldProps>;
    terminationNoticeConfirmation?: PrimitiveOverrideProps<TextFieldProps>;
    resignationNoticeProbation?: PrimitiveOverrideProps<TextFieldProps>;
    resignationNoticeConfirmation?: PrimitiveOverrideProps<TextFieldProps>;
    reasonOfResignation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkInfoSchema1CreateFormProps = React.PropsWithChildren<{
    overrides?: WorkInfoSchema1CreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WorkInfoSchema1CreateFormInputValues) => WorkInfoSchema1CreateFormInputValues;
    onSuccess?: (fields: WorkInfoSchema1CreateFormInputValues) => void;
    onError?: (fields: WorkInfoSchema1CreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkInfoSchema1CreateFormInputValues) => WorkInfoSchema1CreateFormInputValues;
    onValidate?: WorkInfoSchema1CreateFormValidationValues;
} & React.CSSProperties>;
export default function WorkInfoSchema1CreateForm(props: WorkInfoSchema1CreateFormProps): React.ReactElement;
