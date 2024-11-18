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
export declare type PersonalDetailsCreateFormInputValues = {
    tempID?: string;
    age?: number;
    alternateNo?: string;
    agent?: string;
    bwnIcNo?: string;
    bwnIcExpiry?: string;
    bwnIcColour?: string;
    contactNo?: string;
    cob?: string;
    contractType?: string;
    chinese?: string;
    dob?: string;
    driveLic?: string;
    email?: string;
    empType?: string;
    eduDetails?: string[];
    familyDetails?: string[];
    gender?: string;
    lang?: string;
    marital?: string;
    name?: string;
    nationality?: string;
    otherNation?: string;
    otherRace?: string;
    otherReligion?: string;
    ppNo?: string;
    ppIssued?: string;
    ppExpiry?: string;
    ppDestinate?: string;
    presentAddress?: string;
    permanentAddress?: string;
    profilePhoto?: string;
    position?: string;
    race?: string;
    religion?: string;
    status?: string;
    workExperience?: string[];
};
export declare type PersonalDetailsCreateFormValidationValues = {
    tempID?: ValidationFunction<string>;
    age?: ValidationFunction<number>;
    alternateNo?: ValidationFunction<string>;
    agent?: ValidationFunction<string>;
    bwnIcNo?: ValidationFunction<string>;
    bwnIcExpiry?: ValidationFunction<string>;
    bwnIcColour?: ValidationFunction<string>;
    contactNo?: ValidationFunction<string>;
    cob?: ValidationFunction<string>;
    contractType?: ValidationFunction<string>;
    chinese?: ValidationFunction<string>;
    dob?: ValidationFunction<string>;
    driveLic?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    empType?: ValidationFunction<string>;
    eduDetails?: ValidationFunction<string>;
    familyDetails?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    lang?: ValidationFunction<string>;
    marital?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    nationality?: ValidationFunction<string>;
    otherNation?: ValidationFunction<string>;
    otherRace?: ValidationFunction<string>;
    otherReligion?: ValidationFunction<string>;
    ppNo?: ValidationFunction<string>;
    ppIssued?: ValidationFunction<string>;
    ppExpiry?: ValidationFunction<string>;
    ppDestinate?: ValidationFunction<string>;
    presentAddress?: ValidationFunction<string>;
    permanentAddress?: ValidationFunction<string>;
    profilePhoto?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    race?: ValidationFunction<string>;
    religion?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    workExperience?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalDetailsCreateFormOverridesProps = {
    PersonalDetailsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    tempID?: PrimitiveOverrideProps<TextFieldProps>;
    age?: PrimitiveOverrideProps<TextFieldProps>;
    alternateNo?: PrimitiveOverrideProps<TextFieldProps>;
    agent?: PrimitiveOverrideProps<TextFieldProps>;
    bwnIcNo?: PrimitiveOverrideProps<TextFieldProps>;
    bwnIcExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    bwnIcColour?: PrimitiveOverrideProps<TextFieldProps>;
    contactNo?: PrimitiveOverrideProps<TextFieldProps>;
    cob?: PrimitiveOverrideProps<TextFieldProps>;
    contractType?: PrimitiveOverrideProps<TextFieldProps>;
    chinese?: PrimitiveOverrideProps<TextFieldProps>;
    dob?: PrimitiveOverrideProps<TextFieldProps>;
    driveLic?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    empType?: PrimitiveOverrideProps<TextFieldProps>;
    eduDetails?: PrimitiveOverrideProps<TextAreaFieldProps>;
    familyDetails?: PrimitiveOverrideProps<TextAreaFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    lang?: PrimitiveOverrideProps<TextFieldProps>;
    marital?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
    otherNation?: PrimitiveOverrideProps<TextFieldProps>;
    otherRace?: PrimitiveOverrideProps<TextFieldProps>;
    otherReligion?: PrimitiveOverrideProps<TextFieldProps>;
    ppNo?: PrimitiveOverrideProps<TextFieldProps>;
    ppIssued?: PrimitiveOverrideProps<TextFieldProps>;
    ppExpiry?: PrimitiveOverrideProps<TextFieldProps>;
    ppDestinate?: PrimitiveOverrideProps<TextFieldProps>;
    presentAddress?: PrimitiveOverrideProps<TextFieldProps>;
    permanentAddress?: PrimitiveOverrideProps<TextFieldProps>;
    profilePhoto?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    race?: PrimitiveOverrideProps<TextFieldProps>;
    religion?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    workExperience?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type PersonalDetailsCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonalDetailsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonalDetailsCreateFormInputValues) => PersonalDetailsCreateFormInputValues;
    onSuccess?: (fields: PersonalDetailsCreateFormInputValues) => void;
    onError?: (fields: PersonalDetailsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalDetailsCreateFormInputValues) => PersonalDetailsCreateFormInputValues;
    onValidate?: PersonalDetailsCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalDetailsCreateForm(props: PersonalDetailsCreateFormProps): React.ReactElement;
