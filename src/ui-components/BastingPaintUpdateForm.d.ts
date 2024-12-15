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
export declare type BastingPaintUpdateFormInputValues = {
    empID?: string;
    blastingRemarks?: string;
    blastingEndDate?: string;
    blastingStartDate?: string;
    blastingBadgeNo?: string;
    blastingQulifiExp?: string;
    blastingUpload?: string[];
};
export declare type BastingPaintUpdateFormValidationValues = {
    empID?: ValidationFunction<string>;
    blastingRemarks?: ValidationFunction<string>;
    blastingEndDate?: ValidationFunction<string>;
    blastingStartDate?: ValidationFunction<string>;
    blastingBadgeNo?: ValidationFunction<string>;
    blastingQulifiExp?: ValidationFunction<string>;
    blastingUpload?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BastingPaintUpdateFormOverridesProps = {
    BastingPaintUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    empID?: PrimitiveOverrideProps<TextFieldProps>;
    blastingRemarks?: PrimitiveOverrideProps<TextFieldProps>;
    blastingEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    blastingStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    blastingBadgeNo?: PrimitiveOverrideProps<TextFieldProps>;
    blastingQulifiExp?: PrimitiveOverrideProps<TextFieldProps>;
    blastingUpload?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type BastingPaintUpdateFormProps = React.PropsWithChildren<{
    overrides?: BastingPaintUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bastingPaint?: any;
    onSubmit?: (fields: BastingPaintUpdateFormInputValues) => BastingPaintUpdateFormInputValues;
    onSuccess?: (fields: BastingPaintUpdateFormInputValues) => void;
    onError?: (fields: BastingPaintUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BastingPaintUpdateFormInputValues) => BastingPaintUpdateFormInputValues;
    onValidate?: BastingPaintUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BastingPaintUpdateForm(props: BastingPaintUpdateFormProps): React.ReactElement;
