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
export declare type BastingPaintCreateFormInputValues = {
    empID?: string;
    blastingRemarks?: string;
    blastingEndDate?: string;
    blastingStartDate?: string;
    blastingBadgeNo?: string;
    blastingQulifiExp?: string;
    blastingUpload?: string[];
};
export declare type BastingPaintCreateFormValidationValues = {
    empID?: ValidationFunction<string>;
    blastingRemarks?: ValidationFunction<string>;
    blastingEndDate?: ValidationFunction<string>;
    blastingStartDate?: ValidationFunction<string>;
    blastingBadgeNo?: ValidationFunction<string>;
    blastingQulifiExp?: ValidationFunction<string>;
    blastingUpload?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BastingPaintCreateFormOverridesProps = {
    BastingPaintCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    blastingRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    blastingEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    blastingStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    blastingBadgeNo?: PrimitiveOverrideProps<TextFieldProps>;
    blastingQulifiExp?: PrimitiveOverrideProps<TextFieldProps>;
    blastingUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type BastingPaintCreateFormProps = React.PropsWithChildren<{
    overrides?: BastingPaintCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BastingPaintCreateFormInputValues) => BastingPaintCreateFormInputValues;
    onSuccess?: (fields: BastingPaintCreateFormInputValues) => void;
    onError?: (fields: BastingPaintCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BastingPaintCreateFormInputValues) => BastingPaintCreateFormInputValues;
    onValidate?: BastingPaintCreateFormValidationValues;
} & React.CSSProperties>;
export default function BastingPaintCreateForm(props: BastingPaintCreateFormProps): React.ReactElement;
