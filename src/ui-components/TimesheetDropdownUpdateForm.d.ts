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
export declare type TimesheetDropdownUpdateFormInputValues = {
    dropdownType?: string;
    value?: string;
};
export declare type TimesheetDropdownUpdateFormValidationValues = {
    dropdownType?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TimesheetDropdownUpdateFormOverridesProps = {
    TimesheetDropdownUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    dropdownType?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TimesheetDropdownUpdateFormProps = React.PropsWithChildren<{
    overrides?: TimesheetDropdownUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    timesheetDropdown?: any;
    onSubmit?: (fields: TimesheetDropdownUpdateFormInputValues) => TimesheetDropdownUpdateFormInputValues;
    onSuccess?: (fields: TimesheetDropdownUpdateFormInputValues) => void;
    onError?: (fields: TimesheetDropdownUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TimesheetDropdownUpdateFormInputValues) => TimesheetDropdownUpdateFormInputValues;
    onValidate?: TimesheetDropdownUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TimesheetDropdownUpdateForm(props: TimesheetDropdownUpdateFormProps): React.ReactElement;
