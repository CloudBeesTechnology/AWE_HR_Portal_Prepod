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
export declare type LabourWorkPassCreateFormInputValues = {
    empID?: string;
    workPermitType?: string;
    arrivalStampingExpiry?: string;
    employmentPassEndorsement?: string;
    immigrationDeptDate?: string;
    employmentPassExpiry?: string;
    employmentPassStatus?: string;
    labourUploadDoc?: string[];
    remarks?: string;
};
export declare type LabourWorkPassCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    workPermitType?: ValidationFunction<string>;
    arrivalStampingExpiry?: ValidationFunction<string>;
    employmentPassEndorsement?: ValidationFunction<string>;
    immigrationDeptDate?: ValidationFunction<string>;
    employmentPassExpiry?: ValidationFunction<string>;
    employmentPassStatus?: ValidationFunction<string>;
    labourUploadDoc?: ValidationFunction<string>;
    remarks?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabourWorkPassCreateFormOverridesProps = {
    LabourWorkPassCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    workPermitType?: PrimitiveOverrideProps<TextFieldProps>;
    arrivalStampingExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    employmentPassEndorsement?: PrimitiveOverrideProps<TextFieldProps>;
    immigrationDeptDate?: PrimitiveOverrideProps<TextFieldProps>;
    employmentPassExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    employmentPassStatus?: PrimitiveOverrideProps<TextFieldProps>;
    labourUploadDoc?: PrimitiveOverrideProps<TextFieldProps>;
    remarks?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LabourWorkPassCreateFormProps = React.PropsWithChildren<{
    overrides?: LabourWorkPassCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LabourWorkPassCreateFormInputValues) => LabourWorkPassCreateFormInputValues;
    onSuccess?: (fields: LabourWorkPassCreateFormInputValues) => void;
    onError?: (fields: LabourWorkPassCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabourWorkPassCreateFormInputValues) => LabourWorkPassCreateFormInputValues;
    onValidate?: LabourWorkPassCreateFormValidationValues;
} & React.CSSProperties>;
export default function LabourWorkPassCreateForm(props: LabourWorkPassCreateFormProps): React.ReactElement;
