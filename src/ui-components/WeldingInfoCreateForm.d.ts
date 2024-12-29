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
export declare type WeldingInfoCreateFormInputValues = {
    empID?: string;
    diameterRange?: string;
    fillerMetal?: string;
    thicknessRange?: string;
    weldingStampNor?: string;
    wpsNumber?: string;
    weldingProcess?: string;
    weldingPosition?: string;
    WQExpiry?: string;
    WQRemarks?: string;
    weldingUpload?: string[];
    WQRNo?: string;
    weldingCode?: string;
    weldingMaterial?: string;
};
export declare type WeldingInfoCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    diameterRange?: ValidationFunction<string>;
    fillerMetal?: ValidationFunction<string>;
    thicknessRange?: ValidationFunction<string>;
    weldingStampNor?: ValidationFunction<string>;
    wpsNumber?: ValidationFunction<string>;
    weldingProcess?: ValidationFunction<string>;
    weldingPosition?: ValidationFunction<string>;
    WQExpiry?: ValidationFunction<string>;
    WQRemarks?: ValidationFunction<string>;
    weldingUpload?: ValidationFunction<string>;
    WQRNo?: ValidationFunction<string>;
    weldingCode?: ValidationFunction<string>;
    weldingMaterial?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WeldingInfoCreateFormOverridesProps = {
    WeldingInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    diameterRange?: PrimitiveOverrideProps<TextFieldProps>;
    fillerMetal?: PrimitiveOverrideProps<TextFieldProps>;
    thicknessRange?: PrimitiveOverrideProps<TextFieldProps>;
    weldingStampNor?: PrimitiveOverrideProps<TextFieldProps>;
    wpsNumber?: PrimitiveOverrideProps<TextFieldProps>;
    weldingProcess?: PrimitiveOverrideProps<TextFieldProps>;
    weldingPosition?: PrimitiveOverrideProps<TextFieldProps>;
    WQExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    WQRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    weldingUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
    WQRNo?: PrimitiveOverrideProps<TextFieldProps>;
    weldingCode?: PrimitiveOverrideProps<TextFieldProps>;
    weldingMaterial?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WeldingInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: WeldingInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WeldingInfoCreateFormInputValues) => WeldingInfoCreateFormInputValues;
    onSuccess?: (fields: WeldingInfoCreateFormInputValues) => void;
    onError?: (fields: WeldingInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WeldingInfoCreateFormInputValues) => WeldingInfoCreateFormInputValues;
    onValidate?: WeldingInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function WeldingInfoCreateForm(props: WeldingInfoCreateFormProps): React.ReactElement;
