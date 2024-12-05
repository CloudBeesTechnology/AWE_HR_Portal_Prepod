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
export declare type PersonalAccidentUpdateFormInputValues = {
    perAccExp?: string;
    perAccNo?: string;
    perAccUp?: string[];
};
export declare type PersonalAccidentUpdateFormValidationValues = {
    perAccExp?: ValidationFunction<string>;
    perAccNo?: ValidationFunction<string>;
    perAccUp?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalAccidentUpdateFormOverridesProps = {
    PersonalAccidentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    perAccExp?: PrimitiveOverrideProps<TextFieldProps>;
    perAccNo?: PrimitiveOverrideProps<TextFieldProps>;
    perAccUp?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PersonalAccidentUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonalAccidentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    personalAccident?: any;
    onSubmit?: (fields: PersonalAccidentUpdateFormInputValues) => PersonalAccidentUpdateFormInputValues;
    onSuccess?: (fields: PersonalAccidentUpdateFormInputValues) => void;
    onError?: (fields: PersonalAccidentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalAccidentUpdateFormInputValues) => PersonalAccidentUpdateFormInputValues;
    onValidate?: PersonalAccidentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalAccidentUpdateForm(props: PersonalAccidentUpdateFormProps): React.ReactElement;
