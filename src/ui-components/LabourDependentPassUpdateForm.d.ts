/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { LabourDependentPass } from "../models";
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
export declare type LabourDependentPassUpdateFormInputValues = {
    empID?: string;
    airTicketStatus?: string;
    dependentName?: string;
    dependentPassportNumber?: string;
    dependentPassportExpiy?: string;
    labourDepositPaidBy?: string;
    labourDepositReceiptNumber?: string;
    labourDepositAmount?: string;
    passportLocation?: string;
    reEntryVisaApplication?: string;
    immigrationApprovalDate?: string;
    reEntryVisaExpiry?: string;
    relation?: string;
};
export declare type LabourDependentPassUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    airTicketStatus?: ValidationFunction<string>;
    dependentName?: ValidationFunction<string>;
    dependentPassportNumber?: ValidationFunction<string>;
    dependentPassportExpiy?: ValidationFunction<string>;
    labourDepositPaidBy?: ValidationFunction<string>;
    labourDepositReceiptNumber?: ValidationFunction<string>;
    labourDepositAmount?: ValidationFunction<string>;
    passportLocation?: ValidationFunction<string>;
    reEntryVisaApplication?: ValidationFunction<string>;
    immigrationApprovalDate?: ValidationFunction<string>;
    reEntryVisaExpiry?: ValidationFunction<string>;
    relation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabourDependentPassUpdateFormOverridesProps = {
    LabourDependentPassUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    airTicketStatus?: PrimitiveOverrideProps<TextFieldProps>;
    dependentName?: PrimitiveOverrideProps<TextFieldProps>;
    dependentPassportNumber?: PrimitiveOverrideProps<TextFieldProps>;
    dependentPassportExpiy?: PrimitiveOverrideProps<TextFieldProps>;
    labourDepositPaidBy?: PrimitiveOverrideProps<TextFieldProps>;
    labourDepositReceiptNumber?: PrimitiveOverrideProps<TextFieldProps>;
    labourDepositAmount?: PrimitiveOverrideProps<TextFieldProps>;
    passportLocation?: PrimitiveOverrideProps<TextFieldProps>;
    reEntryVisaApplication?: PrimitiveOverrideProps<TextFieldProps>;
    immigrationApprovalDate?: PrimitiveOverrideProps<TextFieldProps>;
    reEntryVisaExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    relation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LabourDependentPassUpdateFormProps = React.PropsWithChildren<{
    overrides?: LabourDependentPassUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    labourDependentPass?: LabourDependentPass;
    onSubmit?: (fields: LabourDependentPassUpdateFormInputValues) => LabourDependentPassUpdateFormInputValues;
    onSuccess?: (fields: LabourDependentPassUpdateFormInputValues) => void;
    onError?: (fields: LabourDependentPassUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabourDependentPassUpdateFormInputValues) => LabourDependentPassUpdateFormInputValues;
    onValidate?: LabourDependentPassUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LabourDependentPassUpdateForm(props: LabourDependentPassUpdateFormProps): React.ReactElement;
