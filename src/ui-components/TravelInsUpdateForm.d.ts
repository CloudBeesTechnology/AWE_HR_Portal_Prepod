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
export declare type TravelInsUpdateFormInputValues = {
    travelExp?: string;
    travelNo?: string;
    travelUp?: string[];
};
export declare type TravelInsUpdateFormValidationValues = {
    travelExp?: ValidationFunction<string>;
    travelNo?: ValidationFunction<string>;
    travelUp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TravelInsUpdateFormOverridesProps = {
    TravelInsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    travelExp?: PrimitiveOverrideProps<TextFieldProps>;
    travelNo?: PrimitiveOverrideProps<TextFieldProps>;
    travelUp?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TravelInsUpdateFormProps = React.PropsWithChildren<{
    overrides?: TravelInsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    travelIns?: any;
    onSubmit?: (fields: TravelInsUpdateFormInputValues) => TravelInsUpdateFormInputValues;
    onSuccess?: (fields: TravelInsUpdateFormInputValues) => void;
    onError?: (fields: TravelInsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TravelInsUpdateFormInputValues) => TravelInsUpdateFormInputValues;
    onValidate?: TravelInsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TravelInsUpdateForm(props: TravelInsUpdateFormProps): React.ReactElement;
