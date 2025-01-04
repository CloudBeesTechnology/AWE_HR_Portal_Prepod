import { FormField } from "../../../utils/FormField";
import { GenderDD, NationalityDD } from "../../../utils/DropDownMenus";

export const DependSecondFile = ({dropDownVal, register, errors, index, selectedNationality,handleNationalityChange,watch }) => {
  const depenotherNation = watch(`depInsurance[${index}].depenotherNation` || "");
  const nation = watch(`depInsurance[${index}].depenNation` || "");
  const nationalityDD = dropDownVal[0]?.nationalityDD.map((item) => ({
    value: item,
    label: item,
  }));
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          label="Gender"
          register={register}
          name={`depInsurance[${index}].depenGender`}
          type="select"
          options={GenderDD}
          errors={errors}
        />
        <FormField
          label="Date of Birth"
          register={register}
          name={`depInsurance[${index}].depenDob`}
          type="date"
          errors={errors}
        />
        <FormField
          label="Nationality"
          register={register}
          name={`depInsurance[${index}].depenNation`}
          type="select"
          options={nationalityDD}
          errors={errors}
          onChange={handleNationalityChange}
        />
        {/* <FormField
          label="Other Nationality"
          register={register}
          name={`depInsurance[${index}].depenotherNation`}
          // type="select"
          // options={NationalityDD}
          errors={errors}
          // onChange={handleNationalityChange}
        /> */}
        {(selectedNationality === "OTHER" ||
          (depenotherNation && nation === "OTHER")) && (
          <FormField
            label="Other Nationality"
            register={register}
            name={`depInsurance[${index}].depenotherNation`}
            type="text"
            errors={errors}
          />
        )}
        <FormField
          label="Birth Certificate Number (Below Age 12)"
          register={register}
          name={`depInsurance[${index}].depenBcNo`}
          type="text"
          errors={errors}
        />
        <FormField
          label="Brunei I/C Number"
          register={register}
          name={`depInsurance[${index}].depenIcNumber`}
          type="text"
          errors={errors}
        />
        <FormField
          label="Passport Number for Non-Local"
          register={register}
          name={`depInsurance[${index}].depenPpNo`}
          type="text"
          errors={errors}
        />
        <FormField
          label="Group H&S Insurance Enrollment Effective Date"
          register={register}
          name={`depInsurance[${index}].depenGroupInsEffect`}
          type="date"
          errors={errors}
        />
        <FormField
          label="Group H&S Insurance Enrollment End Date"
          register={register}
          name={`depInsurance[${index}].depenGroupInsEnd`}
          type="date"
          errors={errors}
        />
        <FormField
          label="Travelling Insurance Enrollment Effective Date"
          register={register}
          name={`depInsurance[${index}].depenTravelInsEffect`}
          type="date"
          errors={errors}
        />
        <FormField
          label="Travelling Insurance Enrollment End Date"
          register={register}
          name={`depInsurance[${index}].depenTravelInsEnd`}
          type="date"
          errors={errors}
        />
        <FormField
          label="Personal Accident Insurance Enrollment Effective Date"
          register={register}
          name={`depInsurance[${index}].depenPersonInsEffect`}
          type="date"
          errors={errors}
        />
        <FormField
          label="Personal Accident Insurance Enrollment End Date"
          register={register}
          name={`depInsurance[${index}].depenPersonInsEnd`}
          type="date"
          errors={errors}
        />
      </div>
    </div>
  );
};
