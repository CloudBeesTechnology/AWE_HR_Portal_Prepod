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
export declare type LabourDetailsUpdateFormInputValues = {
    empID?: string;
    workPermitType?: string;
    arrivalStampingExpiry?: string;
    employmentPassEndorsemen?: string;
    immigrationDeptDate?: string;
    employmentPassExpiry?: string;
    employmentPassStatus?: string;
    overseasMedicalDate?: string;
    overseasMedicalExpiry?: string;
    bruhimsRegistrationDate?: string;
    bruhimsRegistrationNumber?: string;
    bruneiMedicalAppointmentDate?: string;
    bruneiMedicalExpiry?: string;
    passportLocation?: string;
};
export declare type LabourDetailsUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    workPermitType?: ValidationFunction<string>;
    arrivalStampingExpiry?: ValidationFunction<string>;
    employmentPassEndorsemen?: ValidationFunction<string>;
    immigrationDeptDate?: ValidationFunction<string>;
    employmentPassExpiry?: ValidationFunction<string>;
    employmentPassStatus?: ValidationFunction<string>;
    overseasMedicalDate?: ValidationFunction<string>;
    overseasMedicalExpiry?: ValidationFunction<string>;
    bruhimsRegistrationDate?: ValidationFunction<string>;
    bruhimsRegistrationNumber?: ValidationFunction<string>;
    bruneiMedicalAppointmentDate?: ValidationFunction<string>;
    bruneiMedicalExpiry?: ValidationFunction<string>;
    passportLocation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabourDetailsUpdateFormOverridesProps = {
    LabourDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    workPermitType?: PrimitiveOverrideProps<TextFieldProps>;
    arrivalStampingExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    employmentPassEndorsemen?: PrimitiveOverrideProps<TextFieldProps>;
    immigrationDeptDate?: PrimitiveOverrideProps<TextFieldProps>;
    employmentPassExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    employmentPassStatus?: PrimitiveOverrideProps<TextFieldProps>;
    overseasMedicalDate?: PrimitiveOverrideProps<TextFieldProps>;
    overseasMedicalExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    bruhimsRegistrationDate?: PrimitiveOverrideProps<TextFieldProps>;
    bruhimsRegistrationNumber?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiMedicalAppointmentDate?: PrimitiveOverrideProps<TextFieldProps>;
    bruneiMedicalExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    passportLocation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LabourDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: LabourDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    labourDetails?: any;
    onSubmit?: (fields: LabourDetailsUpdateFormInputValues) => LabourDetailsUpdateFormInputValues;
    onSuccess?: (fields: LabourDetailsUpdateFormInputValues) => void;
    onError?: (fields: LabourDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabourDetailsUpdateFormInputValues) => LabourDetailsUpdateFormInputValues;
    onValidate?: LabourDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LabourDetailsUpdateForm(props: LabourDetailsUpdateFormProps): React.ReactElement;
