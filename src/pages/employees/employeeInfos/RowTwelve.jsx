import { FormField } from "../../../utils/FormField";

export const RowTwelve = ({ register, errors }) => {
  return (
    <>
      {" "}
      <FormField
        label="Company Name of Previous Employment"
        type="text"
        name="preEmp"
        register={register}
        errors={errors}
      />
      <FormField
        label="Previous Employment Period"
        type="text"
        name="preEmpPeriod"
        register={register}
        errors={errors}
      />
      <FormField
        label="Date of Induction Briefing"
        type="date"
        name="inducBrief"
        register={register}
        errors={errors}
      />
    </>
  );
};
