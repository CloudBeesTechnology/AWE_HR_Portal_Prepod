/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TimeSheetUpdateFormInputValues = {
    date?: string;
    status?: string;
    fileName?: string;
    fileType?: string;
    assignTo?: string;
    assignBy?: string;
    empName?: string;
    empBadgeNo?: string;
    empID?: string;
    empDept?: string;
    inTime?: string;
    outTime?: string;
    totalInOut?: string;
    allDayHrs?: string;
    totalHrs?: string;
    remarks?: string;
    otTime?: string;
    netMins?: string;
    actualWorkHrs?: string;
    normalWorkHrs?: string;
    fidNo?: string;
    companyName?: string;
    trade?: string;
    tradeCode?: string;
    onAM?: string;
    offAM?: string;
    onPM?: string;
    offPM?: string;
    ctr?: string;
    rec?: string;
    avgDailyTD?: string;
    highlightDayTG?: string;
    aweSDN?: string;
    totalNT?: string;
    totalOT?: string;
    totalNTOT?: string;
    empWorkInfo?: string[];
};
export declare type TimeSheetUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    fileName?: ValidationFunction<string>;
    fileType?: ValidationFunction<string>;
    assignTo?: ValidationFunction<string>;
    assignBy?: ValidationFunction<string>;
    empName?: ValidationFunction<string>;
    empBadgeNo?: ValidationFunction<string>;
    empID?: ValidationFunction<string>;
    empDept?: ValidationFunction<string>;
    inTime?: ValidationFunction<string>;
    outTime?: ValidationFunction<string>;
    totalInOut?: ValidationFunction<string>;
    allDayHrs?: ValidationFunction<string>;
    totalHrs?: ValidationFunction<string>;
    remarks?: ValidationFunction<string>;
    otTime?: ValidationFunction<string>;
    netMins?: ValidationFunction<string>;
    actualWorkHrs?: ValidationFunction<string>;
    normalWorkHrs?: ValidationFunction<string>;
    fidNo?: ValidationFunction<string>;
    companyName?: ValidationFunction<string>;
    trade?: ValidationFunction<string>;
    tradeCode?: ValidationFunction<string>;
    onAM?: ValidationFunction<string>;
    offAM?: ValidationFunction<string>;
    onPM?: ValidationFunction<string>;
    offPM?: ValidationFunction<string>;
    ctr?: ValidationFunction<string>;
    rec?: ValidationFunction<string>;
    avgDailyTD?: ValidationFunction<string>;
    highlightDayTG?: ValidationFunction<string>;
    aweSDN?: ValidationFunction<string>;
    totalNT?: ValidationFunction<string>;
    totalOT?: ValidationFunction<string>;
    totalNTOT?: ValidationFunction<string>;
    empWorkInfo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimeSheetUpdateFormOverridesProps = {
    TimeSheetUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    fileType?: PrimitiveOverrideProps<TextFieldProps>;
    assignTo?: PrimitiveOverrideProps<TextFieldProps>;
    assignBy?: PrimitiveOverrideProps<TextFieldProps>;
    empName?: PrimitiveOverrideProps<TextFieldProps>;
    empBadgeNo?: PrimitiveOverrideProps<TextFieldProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    empDept?: PrimitiveOverrideProps<TextFieldProps>;
    inTime?: PrimitiveOverrideProps<TextFieldProps>;
    outTime?: PrimitiveOverrideProps<TextFieldProps>;
    totalInOut?: PrimitiveOverrideProps<TextFieldProps>;
    allDayHrs?: PrimitiveOverrideProps<TextFieldProps>;
    totalHrs?: PrimitiveOverrideProps<TextFieldProps>;
    remarks?: PrimitiveOverrideProps<TextFieldProps>;
    otTime?: PrimitiveOverrideProps<TextFieldProps>;
    netMins?: PrimitiveOverrideProps<TextFieldProps>;
    actualWorkHrs?: PrimitiveOverrideProps<TextFieldProps>;
    normalWorkHrs?: PrimitiveOverrideProps<TextFieldProps>;
    fidNo?: PrimitiveOverrideProps<TextFieldProps>;
    companyName?: PrimitiveOverrideProps<TextFieldProps>;
    trade?: PrimitiveOverrideProps<TextFieldProps>;
    tradeCode?: PrimitiveOverrideProps<TextFieldProps>;
    onAM?: PrimitiveOverrideProps<TextFieldProps>;
    offAM?: PrimitiveOverrideProps<TextFieldProps>;
    onPM?: PrimitiveOverrideProps<TextFieldProps>;
    offPM?: PrimitiveOverrideProps<TextFieldProps>;
    ctr?: PrimitiveOverrideProps<TextFieldProps>;
    rec?: PrimitiveOverrideProps<TextFieldProps>;
    avgDailyTD?: PrimitiveOverrideProps<TextFieldProps>;
    highlightDayTG?: PrimitiveOverrideProps<TextFieldProps>;
    aweSDN?: PrimitiveOverrideProps<TextFieldProps>;
    totalNT?: PrimitiveOverrideProps<TextFieldProps>;
    totalOT?: PrimitiveOverrideProps<TextFieldProps>;
    totalNTOT?: PrimitiveOverrideProps<TextFieldProps>;
    empWorkInfo?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TimeSheetUpdateFormProps = React.PropsWithChildren<{
    overrides?: TimeSheetUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    timeSheet?: any;
    onSubmit?: (fields: TimeSheetUpdateFormInputValues) => TimeSheetUpdateFormInputValues;
    onSuccess?: (fields: TimeSheetUpdateFormInputValues) => void;
    onError?: (fields: TimeSheetUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TimeSheetUpdateFormInputValues) => TimeSheetUpdateFormInputValues;
    onValidate?: TimeSheetUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TimeSheetUpdateForm(props: TimeSheetUpdateFormProps): React.ReactElement;