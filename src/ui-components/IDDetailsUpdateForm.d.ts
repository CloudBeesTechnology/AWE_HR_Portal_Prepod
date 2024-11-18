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
export declare type IDDetailsUpdateFormInputValues = {
    empID?: string;
    applicationUpload?: string[];
    bwnIcNo?: string;
    bwnIcColour?: string;
    bwnIcExpiry?: string[];
    bwnUpload?: string[];
    cvCertifyUpload?: string[];
    driveLic?: string;
    inducBrief?: string;
    inducBriefUp?: string;
    loiUpload?: string[];
    myIcNo?: string;
    myIcUpload?: string[];
    nationality?: string;
    nationalCat?: string;
    otherNation?: string;
    otherRace?: string;
    otherReligion?: string;
    ppNo?: string[];
    paafCvevUpload?: string[];
    ppIssued?: string[];
    ppExpiry?: string[];
    ppUpload?: string[];
    ppDestinate?: string[];
    preEmp?: string;
    preEmpPeriod?: string;
    race?: string;
    religion?: string;
    supportDocUpload?: string[];
};
export declare type IDDetailsUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    applicationUpload?: ValidationFunction<string>;
    bwnIcNo?: ValidationFunction<string>;
    bwnIcColour?: ValidationFunction<string>;
    bwnIcExpiry?: ValidationFunction<string>;
    bwnUpload?: ValidationFunction<string>;
    cvCertifyUpload?: ValidationFunction<string>;
    driveLic?: ValidationFunction<string>;
    inducBrief?: ValidationFunction<string>;
    inducBriefUp?: ValidationFunction<string>;
    loiUpload?: ValidationFunction<string>;
    myIcNo?: ValidationFunction<string>;
    myIcUpload?: ValidationFunction<string>;
    nationality?: ValidationFunction<string>;
    nationalCat?: ValidationFunction<string>;
    otherNation?: ValidationFunction<string>;
    otherRace?: ValidationFunction<string>;
    otherReligion?: ValidationFunction<string>;
    ppNo?: ValidationFunction<string>;
    paafCvevUpload?: ValidationFunction<string>;
    ppIssued?: ValidationFunction<string>;
    ppExpiry?: ValidationFunction<string>;
    ppUpload?: ValidationFunction<string>;
    ppDestinate?: ValidationFunction<string>;
    preEmp?: ValidationFunction<string>;
    preEmpPeriod?: ValidationFunction<string>;
    race?: ValidationFunction<string>;
    religion?: ValidationFunction<string>;
    supportDocUpload?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IDDetailsUpdateFormOverridesProps = {
    IDDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    applicationUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    bwnIcNo?: PrimitiveOverrideProps<TextFieldProps>;
    bwnIcColour?: PrimitiveOverrideProps<TextFieldProps>;
    bwnIcExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    bwnUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    cvCertifyUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    driveLic?: PrimitiveOverrideProps<TextFieldProps>;
    inducBrief?: PrimitiveOverrideProps<TextFieldProps>;
    inducBriefUp?: PrimitiveOverrideProps<TextFieldProps>;
    loiUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    myIcNo?: PrimitiveOverrideProps<TextFieldProps>;
    myIcUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
    nationalCat?: PrimitiveOverrideProps<TextFieldProps>;
    otherNation?: PrimitiveOverrideProps<TextFieldProps>;
    otherRace?: PrimitiveOverrideProps<TextFieldProps>;
    otherReligion?: PrimitiveOverrideProps<TextFieldProps>;
    ppNo?: PrimitiveOverrideProps<TextFieldProps>;
    paafCvevUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    ppIssued?: PrimitiveOverrideProps<TextFieldProps>;
    ppExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    ppUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    ppDestinate?: PrimitiveOverrideProps<TextFieldProps>;
    preEmp?: PrimitiveOverrideProps<TextFieldProps>;
    preEmpPeriod?: PrimitiveOverrideProps<TextFieldProps>;
    race?: PrimitiveOverrideProps<TextFieldProps>;
    religion?: PrimitiveOverrideProps<TextFieldProps>;
    supportDocUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type IDDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: IDDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    iDDetails?: any;
    onSubmit?: (fields: IDDetailsUpdateFormInputValues) => IDDetailsUpdateFormInputValues;
    onSuccess?: (fields: IDDetailsUpdateFormInputValues) => void;
    onError?: (fields: IDDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IDDetailsUpdateFormInputValues) => IDDetailsUpdateFormInputValues;
    onValidate?: IDDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IDDetailsUpdateForm(props: IDDetailsUpdateFormProps): React.ReactElement;
