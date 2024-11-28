

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CourceValidationSchema } from "../../../services/TrainingValidation";
import { useContext, useState } from "react";
import { LuPlusSquare } from "react-icons/lu";
import { AddCFFun } from "../../../services/createMethod/AddCFFun";
import { AddCFUpdate } from "../../../services/updateMethod/AddCFUpdate";
import { DataSupply } from "../../../utils/DataStoredContext";

export const AddCourseForm = ({ closeModal }) => {
  const { AddCourseData } = AddCFFun();
  const { AddCourseDetails } = useContext(DataSupply);
  const { AddCUpdateFun } = AddCFUpdate();
console.log(AddCourseDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CourceValidationSchema),
  });

  const [courseName, setCourseName] = useState([""]);
  const [company, setCompany] = useState([""]);

  const addCourseNameField = () => setCourseName([...courseName, ""]);
  const addCompanyField = () => setCompany([...company, ""]);

  const onSubmit = async (data) => {
    try {
      console.log("Form Data Submitted:", data);
  
      const submittedCourseSelect = typeof data.courseSelect === 'string' ? data.courseSelect : '';

      // Find an existing entry matching courseSelect
      const checkingEIDTable = AddCourseDetails?.find((match) => {
        // Ensure match.courseSelect is a string
        const matchCourseSelect = typeof match.courseSelect === 'string' ? match.courseSelect : '';
        return submittedCourseSelect === matchCourseSelect;
      });

      if (checkingEIDTable) {
        // Combine existing data with new data and remove duplicates
        
  
        const updatedCourseName = [
          ...new Set([
            ...checkingEIDTable.courseName,
            ...data.courseName,
          ]),
        ];
  
        const updatedCompany = [
          ...new Set([
            ...checkingEIDTable.company,
            ...data.company,
          ]),
        ];
  
        // Update logic
        const AddCFUpp = {
          ...data,
          courseName: updatedCourseName,
          company: updatedCompany,
          id: checkingEIDTable.id,
        };
  
        console.log("Updating data:", AddCFUpp);
        await AddCUpdateFun({ AddCFUpp });
      } else {
        // Create logic
        const AddCFCre = {
          ...data,
        };
  
        console.log("Creating new data:", AddCFCre);
        await AddCourseData({AddCFCre});
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="w-[500px] max-h-[500px] overflow-y-auto bg-white shadow-lg p-10 rounded-lg border">
      <div className="flex justify-end items-end">
      <button
        onClick={closeModal} // Call the function passed as a prop to close the modal
        className="bg-blue rounded-full p-2 w-[50px] h-[50px]"
      >
        X
      </button>
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* courseSelect field */}
          <div className="mb-4 relative">
            <label className="font-semibold">Select Course:</label>
            <input
              type="text"
              {...register("courseSelect")}
              className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
            />
            {errors.courseSelect && (
              <p className="text-[red] text-[13px] mt-1">
                {errors.courseSelect.message}
              </p>
            )}
          </div>

          {/* CourseName field */}
          <div className="mb-4 relative">
            <label className="font-semibold">Course Name:</label>
            {courseName.map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  {...register(`courseName[${index}]`)}
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
                {errors.courseName && errors.courseName[index] && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.courseName[index].message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCourseNameField}
              className="absolute top-10 -right-7 text-medium_grey text-[18px]"
            >
              <LuPlusSquare />
            </button>
          </div>

          {/* Company field */}
          <div className="mb-4 relative">
            <label className="font-semibold">Training Company:</label>
            {company.map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  {...register(`company[${index}]`)}
                  className="mt-2 p-2.5 text_size_9 bg-lite_skyBlue border border-[#dedddd] text-dark_grey outline-none rounded w-full"
                />
                {errors.company && errors.company[index] && (
                  <p className="text-[red] text-[13px] mt-1">
                    {errors.company[index].message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCompanyField}
              className="absolute top-10 -right-7 text-medium_grey text-[18px]"
            >
              <LuPlusSquare />
            </button>
          </div>

          {/* Submit button */}
          <div className="center py-2">
            <button type="submit" className="primary_btn">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};


