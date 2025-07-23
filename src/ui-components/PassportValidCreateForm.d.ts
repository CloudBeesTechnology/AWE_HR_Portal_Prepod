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
export declare type PassportValidCreateFormInputValues = {
    empID?: string;
    ppLocation?: string[];
    arrivStampUpload?: string[];
    immigEmpUpload?: string[];
    reEntryUpload?: string[];
    arrivStampExp?: string[];
    immigRefNo?: string;
    ppSubmit?: string[];
    empPassExp?: string[];
    empPassStatus?: string[];
    airTktStatus?: string[];
    reEntryVisa?: string[];
    immigApproval?: string[];
    reEntryVisaExp?: string[];
    remarkImmig?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type PassportValidCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    ppLocation?: ValidationFunction<string>;
    arrivStampUpload?: ValidationFunction<string>;
    immigEmpUpload?: ValidationFunction<string>;
    reEntryUpload?: ValidationFunction<string>;
    arrivStampExp?: ValidationFunction<string>;
    immigRefNo?: ValidationFunction<string>;
    ppSubmit?: ValidationFunction<string>;
    empPassExp?: ValidationFunction<string>;
    empPassStatus?: ValidationFunction<string>;
    airTktStatus?: ValidationFunction<string>;
    reEntryVisa?: ValidationFunction<string>;
    immigApproval?: ValidationFunction<string>;
    reEntryVisaExp?: ValidationFunction<string>;
    remarkImmig?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PassportValidCreateFormOverridesProps = {
    PassportValidCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    ppLocation?: PrimitiveOverrideProps<TextFieldProps>;
    arrivStampUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    immigEmpUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    reEntryUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    arrivStampExp?: PrimitiveOverrideProps<TextFieldProps>;
    immigRefNo?: PrimitiveOverrideProps<TextFieldProps>;
    ppSubmit?: PrimitiveOverrideProps<TextFieldProps>;
    empPassExp?: PrimitiveOverrideProps<TextFieldProps>;
    empPassStatus?: PrimitiveOverrideProps<TextFieldProps>;
    airTktStatus?: PrimitiveOverrideProps<TextFieldProps>;
    reEntryVisa?: PrimitiveOverrideProps<TextFieldProps>;
    immigApproval?: PrimitiveOverrideProps<TextFieldProps>;
    reEntryVisaExp?: PrimitiveOverrideProps<TextFieldProps>;
    remarkImmig?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PassportValidCreateFormProps = React.PropsWithChildren<{
    overrides?: PassportValidCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PassportValidCreateFormInputValues) => PassportValidCreateFormInputValues;
    onSuccess?: (fields: PassportValidCreateFormInputValues) => void;
    onError?: (fields: PassportValidCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PassportValidCreateFormInputValues) => PassportValidCreateFormInputValues;
    onValidate?: PassportValidCreateFormValidationValues;
} & React.CSSProperties>;
export default function PassportValidCreateForm(props: PassportValidCreateFormProps): React.ReactElement;
