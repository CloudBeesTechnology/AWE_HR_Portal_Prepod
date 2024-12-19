import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CourceValidationSchema } from "../../../services/TrainingValidation";
import { useContext, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AddCFFun } from "../../../services/createMethod/AddCFFun";
import { AddCFUpdate } from "../../../services/updateMethod/AddCFUpdate";
import { DataSupply } from "../../../utils/DataStoredContext";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FaRegMinusSquare } from "react-icons/fa";

export const AddCourseForm = ({ closeModal }) => {
  const { AddCourseData } = AddCFFun();
  const { AddCourseDetails } = useContext(DataSupply);
  const { AddCUpdateFun } = AddCFUpdate();
  console.log(AddCourseDetails);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CourceValidationSchema),
  });

  // State to track dynamic inputs
  const [courseName, setCourseName] = useState([""]);  // Initial state for course names
  const [company, setCompany] = useState([""]);  // Initial state for company names

  // Add a new input field for course name
  const addCourseNameField = () => {
    setCourseName((prevState) => [...prevState, ""]);
  };

  // Add a new input field for company
  const addCompanyField = () => {
    setCompany((prevState) => [...prevState, ""]);
  };

  // Remove a course name input field
  const removeCourseNameField = (index) => {
    const updatedCourseNames = [...courseName];
    updatedCourseNames.splice(index, 1); // Remove the field at the given index
    setCourseName(updatedCourseNames); // Update state
    setValue("courseName", updatedCourseNames); // Update react-hook-form state
  };

  // Remove a company input field
  const removeCompanyField = (index) => {
    const updatedCompanies = [...company];
    updatedCompanies.splice(index, 1); // Remove the field at the given index
    setCompany(updatedCompanies); // Update state
    setValue("company", updatedCompanies); // Update react-hook-form state
  };

  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log("Form Data Submitted:", data);

      const submittedCourseSelect = typeof data.courseSelect === 'string' ? data.courseSelect : '';

      // Find an existing entry matching courseSelect
      const checkingEIDTable = AddCourseDetails?.find((match) => {
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

        // console.log("Creating new data:", AddCFCre);
        await AddCourseData({ AddCFCre });
        setShowTitle("Training Add Course Form Saved successfully");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <section className="w-[550px] h-[440px] overflow-y-auto p-5 bg-white shadow-lg rounded-lg scrollBar">
        <div className="flex justify-end items-end">
          <button
            onClick={closeModal} // Call the function passed as a prop to close the modal
            className="p-2"
          >
            <IoIosCloseCircleOutline className="text-[32px] font-xs" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-7">
          {/* courseSelect field */}
          <div className="mb-4 relative">
            <label className="font-semibold">Course Code:</label>
            <input
              type="text"
              {...register("courseSelect")}
              className="input-field"
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
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={courseName[index]}
                  {...register(`courseName[${index}]`)}
                  onChange={(e) => {
                    const updatedCourseNames = [...courseName];
                    updatedCourseNames[index] = e.target.value;
                    setCourseName(updatedCourseNames);
                    setValue(`courseName[${index}]`, e.target.value);
                  }}
                  className="input-field"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCourseNameField(index)}
                    className="ml-2 text-medium_grey"
                  >
                    <FaRegMinusSquare/>
                  </button>
                )}
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
              className="absolute top-10 -right-7 text-medium_grey text-[24px]"
            >
              <CiSquarePlus />
            </button>
          </div>

          {/* Company field */}
          <div className="mb-4 relative">
            <label className="font-semibold">Training Company:</label>
            {company.map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={company[index]}
                  {...register(`company[${index}]`)}
                  onChange={(e) => {
                    const updatedCompanies = [...company];
                    updatedCompanies[index] = e.target.value;
                    setCompany(updatedCompanies);
                    setValue(`company[${index}]`, e.target.value);
                  }}
                  className="input-field"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCompanyField(index)}
                    className="ml-2 text-medium_grey"
                  >
                    <FaRegMinusSquare/>
                  </button>
                )}
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
              className="absolute top-10 -right-7 text-medium_grey text-[24px]"
            >
              <CiSquarePlus />
            </button>
          </div>

          {/* Submit button */}
          <div className="center py-2">
            <button type="submit" className="primary_btn">
              Save
            </button>
          </div>
        </form>
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/training"
          />
        )}
      </section>
    </div>
  );
};

