/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TrainingReqUpdateFormInputValues = {
    empID?: string;
    MRNo?: string;
    medicalName?: string;
    medicalExpiry?: string;
    medicalAppointDate?: string;
    medicalReport?: string[];
    traineeSD?: string;
    traineeED?: string;
    traineeStatus?: string;
    traineeCourseFee?: string;
    courseCode?: string[];
    courseName?: string[];
    company?: string[];
    mediRequired?: boolean;
};
export declare type TrainingReqUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    MRNo?: ValidationFunction<string>;
    medicalName?: ValidationFunction<string>;
    medicalExpiry?: ValidationFunction<string>;
    medicalAppointDate?: ValidationFunction<string>;
    medicalReport?: ValidationFunction<string>;
    traineeSD?: ValidationFunction<string>;
    traineeED?: ValidationFunction<string>;
    traineeStatus?: ValidationFunction<string>;
    traineeCourseFee?: ValidationFunction<string>;
    courseCode?: ValidationFunction<string>;
    courseName?: ValidationFunction<string>;
    company?: ValidationFunction<string>;
    mediRequired?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TrainingReqUpdateFormOverridesProps = {
    TrainingReqUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    MRNo?: PrimitiveOverrideProps<TextFieldProps>;
    medicalName?: PrimitiveOverrideProps<TextFieldProps>;
    medicalExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    medicalAppointDate?: PrimitiveOverrideProps<TextFieldProps>;
    medicalReport?: PrimitiveOverrideProps<TextAreaFieldProps>;
    traineeSD?: PrimitiveOverrideProps<TextFieldProps>;
    traineeED?: PrimitiveOverrideProps<TextFieldProps>;
    traineeStatus?: PrimitiveOverrideProps<TextFieldProps>;
    traineeCourseFee?: PrimitiveOverrideProps<TextFieldProps>;
    courseCode?: PrimitiveOverrideProps<TextFieldProps>;
    courseName?: PrimitiveOverrideProps<TextFieldProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
    mediRequired?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type TrainingReqUpdateFormProps = React.PropsWithChildren<{
    overrides?: TrainingReqUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    trainingReq?: any;
    onSubmit?: (fields: TrainingReqUpdateFormInputValues) => TrainingReqUpdateFormInputValues;
    onSuccess?: (fields: TrainingReqUpdateFormInputValues) => void;
    onError?: (fields: TrainingReqUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TrainingReqUpdateFormInputValues) => TrainingReqUpdateFormInputValues;
    onValidate?: TrainingReqUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TrainingReqUpdateForm(props: TrainingReqUpdateFormProps): React.ReactElement;
