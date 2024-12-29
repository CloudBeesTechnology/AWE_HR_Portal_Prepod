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
export declare type TrainingCertificatesCreateFormInputValues = {
    empID?: string;
    certifiExpiry?: string[];
    eCertifiDate?: string[];
    trainingUpCertifi?: string[];
    orgiCertifiDate?: string[];
    poNo?: string[];
    addDescretion?: string[];
};
export declare type TrainingCertificatesCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    certifiExpiry?: ValidationFunction<string>;
    eCertifiDate?: ValidationFunction<string>;
    trainingUpCertifi?: ValidationFunction<string>;
    orgiCertifiDate?: ValidationFunction<string>;
    poNo?: ValidationFunction<string>;
    addDescretion?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TrainingCertificatesCreateFormOverridesProps = {
    TrainingCertificatesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    certifiExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    eCertifiDate?: PrimitiveOverrideProps<TextFieldProps>;
    trainingUpCertifi?: PrimitiveOverrideProps<TextAreaFieldProps>;
    orgiCertifiDate?: PrimitiveOverrideProps<TextFieldProps>;
    poNo?: PrimitiveOverrideProps<TextFieldProps>;
    addDescretion?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TrainingCertificatesCreateFormProps = React.PropsWithChildren<{
    overrides?: TrainingCertificatesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TrainingCertificatesCreateFormInputValues) => TrainingCertificatesCreateFormInputValues;
    onSuccess?: (fields: TrainingCertificatesCreateFormInputValues) => void;
    onError?: (fields: TrainingCertificatesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TrainingCertificatesCreateFormInputValues) => TrainingCertificatesCreateFormInputValues;
    onValidate?: TrainingCertificatesCreateFormValidationValues;
} & React.CSSProperties>;
export default function TrainingCertificatesCreateForm(props: TrainingCertificatesCreateFormProps): React.ReactElement;
