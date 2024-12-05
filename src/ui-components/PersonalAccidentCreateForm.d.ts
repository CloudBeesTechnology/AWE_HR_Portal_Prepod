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
export declare type PersonalAccidentCreateFormInputValues = {
    perAccExp?: string;
    perAccNo?: string;
    perAccUp?: string[];
};
export declare type PersonalAccidentCreateFormValidationValues = {
    perAccExp?: ValidationFunction<string>;
    perAccNo?: ValidationFunction<string>;
    perAccUp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalAccidentCreateFormOverridesProps = {
    PersonalAccidentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    perAccExp?: PrimitiveOverrideProps<TextFieldProps>;
    perAccNo?: PrimitiveOverrideProps<TextFieldProps>;
    perAccUp?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PersonalAccidentCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonalAccidentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonalAccidentCreateFormInputValues) => PersonalAccidentCreateFormInputValues;
    onSuccess?: (fields: PersonalAccidentCreateFormInputValues) => void;
    onError?: (fields: PersonalAccidentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalAccidentCreateFormInputValues) => PersonalAccidentCreateFormInputValues;
    onValidate?: PersonalAccidentCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalAccidentCreateForm(props: PersonalAccidentCreateFormProps): React.ReactElement;
