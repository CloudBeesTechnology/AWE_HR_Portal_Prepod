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
export declare type EmpLeaveDetailsUpdateFormInputValues = {
    empID?: string;
    annualLeave?: string[];
    annualLeaveDate?: string[];
    compasLeave?: string;
    compasLeaveDate?: string;
    destinateLeavePass?: string[];
    durLeavePass?: string[];
    dateLeavePass?: string[];
    leavePass?: string[];
    materLeave?: string[];
    materLeaveDate?: string[];
    mrageLeave?: string;
    mrageLeaveDate?: string;
    paterLeave?: string[];
    paterLeaveDate?: string[];
    sickLeave?: string;
    sickLeaveDate?: string;
};
export declare type EmpLeaveDetailsUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    annualLeave?: ValidationFunction<string>;
    annualLeaveDate?: ValidationFunction<string>;
    compasLeave?: ValidationFunction<string>;
    compasLeaveDate?: ValidationFunction<string>;
    destinateLeavePass?: ValidationFunction<string>;
    durLeavePass?: ValidationFunction<string>;
    dateLeavePass?: ValidationFunction<string>;
    leavePass?: ValidationFunction<string>;
    materLeave?: ValidationFunction<string>;
    materLeaveDate?: ValidationFunction<string>;
    mrageLeave?: ValidationFunction<string>;
    mrageLeaveDate?: ValidationFunction<string>;
    paterLeave?: ValidationFunction<string>;
    paterLeaveDate?: ValidationFunction<string>;
    sickLeave?: ValidationFunction<string>;
    sickLeaveDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmpLeaveDetailsUpdateFormOverridesProps = {
    EmpLeaveDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    annualLeave?: PrimitiveOverrideProps<TextFieldProps>;
    annualLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
    compasLeave?: PrimitiveOverrideProps<TextFieldProps>;
    compasLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
    destinateLeavePass?: PrimitiveOverrideProps<TextFieldProps>;
    durLeavePass?: PrimitiveOverrideProps<TextFieldProps>;
    dateLeavePass?: PrimitiveOverrideProps<TextFieldProps>;
    leavePass?: PrimitiveOverrideProps<TextFieldProps>;
    materLeave?: PrimitiveOverrideProps<TextFieldProps>;
    materLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
    mrageLeave?: PrimitiveOverrideProps<TextFieldProps>;
    mrageLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
    paterLeave?: PrimitiveOverrideProps<TextFieldProps>;
    paterLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
    sickLeave?: PrimitiveOverrideProps<TextFieldProps>;
    sickLeaveDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmpLeaveDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmpLeaveDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    empLeaveDetails?: any;
    onSubmit?: (fields: EmpLeaveDetailsUpdateFormInputValues) => EmpLeaveDetailsUpdateFormInputValues;
    onSuccess?: (fields: EmpLeaveDetailsUpdateFormInputValues) => void;
    onError?: (fields: EmpLeaveDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmpLeaveDetailsUpdateFormInputValues) => EmpLeaveDetailsUpdateFormInputValues;
    onValidate?: EmpLeaveDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmpLeaveDetailsUpdateForm(props: EmpLeaveDetailsUpdateFormProps): React.ReactElement;
