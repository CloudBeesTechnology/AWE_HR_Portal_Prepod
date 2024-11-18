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
export declare type PassportValidUpdateFormInputValues = {
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
};
export declare type PassportValidUpdateFormValidationValues = {
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PassportValidUpdateFormOverridesProps = {
    PassportValidUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
} & EscapeHatchProps;
export declare type PassportValidUpdateFormProps = React.PropsWithChildren<{
    overrides?: PassportValidUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    passportValid?: any;
    onSubmit?: (fields: PassportValidUpdateFormInputValues) => PassportValidUpdateFormInputValues;
    onSuccess?: (fields: PassportValidUpdateFormInputValues) => void;
    onError?: (fields: PassportValidUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PassportValidUpdateFormInputValues) => PassportValidUpdateFormInputValues;
    onValidate?: PassportValidUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PassportValidUpdateForm(props: PassportValidUpdateFormProps): React.ReactElement;
