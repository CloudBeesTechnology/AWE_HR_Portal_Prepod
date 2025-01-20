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
export declare type TicketRequestUpdateFormInputValues = {
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
};
export declare type TicketRequestUpdateFormValidationValues = {
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TicketRequestUpdateFormOverridesProps = {
    TicketRequestUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
} & EscapeHatchProps;
export declare type TicketRequestUpdateFormProps = React.PropsWithChildren<{
    overrides?: TicketRequestUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    ticketRequest?: any;
    onSubmit?: (fields: TicketRequestUpdateFormInputValues) => TicketRequestUpdateFormInputValues;
    onSuccess?: (fields: TicketRequestUpdateFormInputValues) => void;
    onError?: (fields: TicketRequestUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TicketRequestUpdateFormInputValues) => TicketRequestUpdateFormInputValues;
    onValidate?: TicketRequestUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TicketRequestUpdateForm(props: TicketRequestUpdateFormProps): React.ReactElement;
