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
export declare type LabourMedicalInfoCreateFormInputValues = {
    empID?: string;
    overMD?: string;
    overME?: string;
    bruhimsRD?: string;
    bruhimsRNo?: string;
    bruneiMAD?: string[];
    bruneiME?: string[];
    uploadFitness?: string[];
    uploadRegis?: string[];
    uploadBwn?: string[];
    dependPass?: string[];
    createdBy?: string[];
    updatedBy?: string[];
};
export declare type LabourMedicalInfoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    overMD?: ValidationFunction<string>;
    overME?: ValidationFunction<string>;
    bruhimsRD?: ValidationFunction<string>;
    bruhimsRNo?: ValidationFunction<string>;
    bruneiMAD?: ValidationFunction<string>;
    bruneiME?: ValidationFunction<string>;
    uploadFitness?: ValidationFunction<string>;
    uploadRegis?: ValidationFunction<string>;
    uploadBwn?: ValidationFunction<string>;
    dependPass?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    updatedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabourMedicalInfoCreateFormOverridesProps = {
    LabourMedicalInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    overMD?: PrimitiveOverrideProps<TextFieldProps>;
    overME?: PrimitiveOverrideProps<TextFieldProps>;
    bruhimsRD?: PrimitiveOverrideProps<TextFieldProps>;
    bruhimsRNo?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiMAD?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiME?: PrimitiveOverrideProps<TextFieldProps>;
    uploadFitness?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadRegis?: PrimitiveOverrideProps<TextAreaFieldProps>;
    uploadBwn?: PrimitiveOverrideProps<TextAreaFieldProps>;
    dependPass?: PrimitiveOverrideProps<TextAreaFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
    updatedBy?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type LabourMedicalInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: LabourMedicalInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LabourMedicalInfoCreateFormInputValues) => LabourMedicalInfoCreateFormInputValues;
    onSuccess?: (fields: LabourMedicalInfoCreateFormInputValues) => void;
    onError?: (fields: LabourMedicalInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabourMedicalInfoCreateFormInputValues) => LabourMedicalInfoCreateFormInputValues;
    onValidate?: LabourMedicalInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function LabourMedicalInfoCreateForm(props: LabourMedicalInfoCreateFormProps): React.ReactElement;
