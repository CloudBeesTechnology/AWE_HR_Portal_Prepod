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
export declare type TicketRequestCreateFormInputValues = {
    empID?: string;
    empStatus?: string;
    empDate?: string;
    empRemarks?: string;
    departureDate?: string;
    arrivalDate?: string;
    destination?: string;
    remarks?: string;
    hrStatus?: string;
    hrDate?: string;
    hrRemarks?: string;
    hrName?: string;
    hrEmpID?: string;
    from?: string;
    to?: string;
    fromDate?: string;
    toDate?: string;
    gmDate?: string;
    gmEmpID?: string;
    gmRemarks?: string;
    gmStatus?: string;
};
export declare type TicketRequestCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    empStatus?: ValidationFunction<string>;
    empDate?: ValidationFunction<string>;
    empRemarks?: ValidationFunction<string>;
    departureDate?: ValidationFunction<string>;
    arrivalDate?: ValidationFunction<string>;
    destination?: ValidationFunction<string>;
    remarks?: ValidationFunction<string>;
    hrStatus?: ValidationFunction<string>;
    hrDate?: ValidationFunction<string>;
    hrRemarks?: ValidationFunction<string>;
    hrName?: ValidationFunction<string>;
    hrEmpID?: ValidationFunction<string>;
    from?: ValidationFunction<string>;
    to?: ValidationFunction<string>;
    fromDate?: ValidationFunction<string>;
    toDate?: ValidationFunction<string>;
    gmDate?: ValidationFunction<string>;
    gmEmpID?: ValidationFunction<string>;
    gmRemarks?: ValidationFunction<string>;
    gmStatus?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TicketRequestCreateFormOverridesProps = {
    TicketRequestCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    empStatus?: PrimitiveOverrideProps<TextFieldProps>;
    empDate?: PrimitiveOverrideProps<TextFieldProps>;
    empRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    departureDate?: PrimitiveOverrideProps<TextFieldProps>;
    arrivalDate?: PrimitiveOverrideProps<TextFieldProps>;
    destination?: PrimitiveOverrideProps<TextFieldProps>;
    remarks?: PrimitiveOverrideProps<TextFieldProps>;
    hrStatus?: PrimitiveOverrideProps<TextFieldProps>;
    hrDate?: PrimitiveOverrideProps<TextFieldProps>;
    hrRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    hrName?: PrimitiveOverrideProps<TextFieldProps>;
    hrEmpID?: PrimitiveOverrideProps<TextFieldProps>;
    from?: PrimitiveOverrideProps<TextFieldProps>;
    to?: PrimitiveOverrideProps<TextFieldProps>;
    fromDate?: PrimitiveOverrideProps<TextFieldProps>;
    toDate?: PrimitiveOverrideProps<TextFieldProps>;
    gmDate?: PrimitiveOverrideProps<TextFieldProps>;
    gmEmpID?: PrimitiveOverrideProps<TextFieldProps>;
    gmRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    gmStatus?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TicketRequestCreateFormProps = React.PropsWithChildren<{
    overrides?: TicketRequestCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TicketRequestCreateFormInputValues) => TicketRequestCreateFormInputValues;
    onSuccess?: (fields: TicketRequestCreateFormInputValues) => void;
    onError?: (fields: TicketRequestCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TicketRequestCreateFormInputValues) => TicketRequestCreateFormInputValues;
    onValidate?: TicketRequestCreateFormValidationValues;
} & React.CSSProperties>;
export default function TicketRequestCreateForm(props: TicketRequestCreateFormProps): React.ReactElement;
