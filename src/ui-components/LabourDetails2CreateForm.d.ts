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
export declare type LabourDetails2CreateFormInputValues = {
    reEntryVisaApplication?: string;
    immigrationApprovalDate?: string;
    reEntryVisaExpiry?: string;
    airTicketStatus?: string;
    remarks?: string;
    dependentName?: string;
    dependentPassportNumber?: string;
    dependentPassportExpiry?: string;
    relation?: string;
    labourDepositPaidBy?: string;
    labourDepositReceiptNumber?: string;
    labourDepositAmount?: string;
    labourUploadDoc?: string[];
};
export declare type LabourDetails2CreateFormValidationValues = {
    reEntryVisaApplication?: ValidationFunction<string>;
    immigrationApprovalDate?: ValidationFunction<string>;
    reEntryVisaExpiry?: ValidationFunction<string>;
    airTicketStatus?: ValidationFunction<string>;
    remarks?: ValidationFunction<string>;
    dependentName?: ValidationFunction<string>;
    dependentPassportNumber?: ValidationFunction<string>;
    dependentPassportExpiry?: ValidationFunction<string>;
    relation?: ValidationFunction<string>;
    labourDepositPaidBy?: ValidationFunction<string>;
    labourDepositReceiptNumber?: ValidationFunction<string>;
    labourDepositAmount?: ValidationFunction<string>;
    labourUploadDoc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabourDetails2CreateFormOverridesProps = {
    LabourDetails2CreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reEntryVisaApplication?: PrimitiveOverrideProps<TextFieldProps>;
    immigrationApprovalDate?: PrimitiveOverrideProps<TextFieldProps>;
    reEntryVisaExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    airTicketStatus?: PrimitiveOverrideProps<TextFieldProps>;
    remarks?: PrimitiveOverrideProps<TextFieldProps>;
    dependentName?: PrimitiveOverrideProps<TextFieldProps>;
    dependentPassportNumber?: PrimitiveOverrideProps<TextFieldProps>;
    dependentPassportExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    relation?: PrimitiveOverrideProps<TextFieldProps>;
    labourDepositPaidBy?: PrimitiveOverrideProps<TextFieldProps>;
    labourDepositReceiptNumber?: PrimitiveOverrideProps<TextFieldProps>;
    labourDepositAmount?: PrimitiveOverrideProps<TextFieldProps>;
    labourUploadDoc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LabourDetails2CreateFormProps = React.PropsWithChildren<{
    overrides?: LabourDetails2CreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LabourDetails2CreateFormInputValues) => LabourDetails2CreateFormInputValues;
    onSuccess?: (fields: LabourDetails2CreateFormInputValues) => void;
    onError?: (fields: LabourDetails2CreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabourDetails2CreateFormInputValues) => LabourDetails2CreateFormInputValues;
    onValidate?: LabourDetails2CreateFormValidationValues;
} & React.CSSProperties>;
export default function LabourDetails2CreateForm(props: LabourDetails2CreateFormProps): React.ReactElement;
