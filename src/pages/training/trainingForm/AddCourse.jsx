import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CourceValidationSchema } from "../../../services/TrainingValidation";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AddCourseForm } from "./AddCourseForm"; // Import the AddCourseForm component
import { DataSupply } from "../../../utils/DataStoredContext";

export const AddCourse = () => {
  const { empPIData, AddCourseDetails } = useContext(DataSupply);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CourceValidationSchema),
  });

  const [show, setShow] = useState(true); // Toggle between Add Course and Certificates
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for adding new course
  const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course
  const [allEmpDetails, setAllEmpDetails] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const ADDCDetails = AddCourseDetails.find(
              (user) => user.empID === emp.empID
            );
            if (!ADDCDetails) return null;
            return { ...emp, ...ADDCDetails };
          })
          .filter(Boolean);

        setAllEmpDetails(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, AddCourseDetails]);



  const handleCourseSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Find the selected course
    const matchedCourse = AddCourseDetails.find(
      (course) => String(course.courseSelect) === String(selectedValue)
    );

    setSelectedCourse(matchedCourse || null);

    if (matchedCourse) {
      // Populate form fields with selected course details
      setValue("courseName", matchedCourse.courseName || "");
      setValue("company", matchedCourse.company || "");
    } else {
      // Clear values if no match
      setValue("courseName", "");
      setValue("company", "");
    }
  };
  // console.log("Selected Course:", selectedCourse);
  // console.log("Course Name:", selectedCourse?.courseName);
  

  return (
    <section className="p-10 center flex-col gap-16 bg-[#F8F8F8] mt-10">
      {/* Header Section */}
      <div className=" w-full flex items-center justify-center gap-5 ">
        <Link to="/training/hr" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>

        <article className="w-full  center gap-5 text-dark_grey ">
          <p
          className="text-center mt-2 text_size_2 relative after:absolute after:w-full after:h-1 after:bg-primary after:-bottom-2 after:left-0">
          
            Add Course
          </p>    
        </article>       
      </div>

        <div className="screen-size center  w-full h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full  max-h-[400px] h-full">
            <div className="flex justify-end items-center py-2">
              <button
                type="button"
                className="bg-primary font-bold py-2 px-5 text-dark_grey rounded-md"
                onClick={() => setIsModalOpen(true)} // Open the modal
              >
                Add Course
              </button>
            </div>
            <form >
              {/* Course Selection */}
              <div className="mb-5">
                <label htmlFor="courseSelect" className="text_size_5">
                   Course Code:
                </label>
                <select
                  {...register("courseSelect")}
                  onChange={handleCourseSelectChange}
                  className="input-field select-custom"
                >
                  <option value="">Select Course</option>
                  {AddCourseDetails.map((course) => (
                    <option key={course.courseSelect} value={course.courseSelect}>
                      {course.courseSelect}
                    </option>
                  ))}
                </select>
           
              </div>

              {/* Course Name */}
              <div className="mb-5">
                <label className="text_size_5">Course Name</label>
                <select
                  {...register("courseName")}
                  className="input-field select-custom"
                >
                  {selectedCourse && Array.isArray(selectedCourse.courseName) ? (
                    selectedCourse.courseName.map((courseName, index) => (
                      <option key={index} value={courseName}>
                        {courseName}
                      </option>
                    ))
                  ) : (
                    <option value={selectedCourse?.courseName || ""}>
                      {selectedCourse?.courseName || "No Course Name Available"}
                    </option>
                  )}
                </select>
  
              </div>

              {/* Training Company */}
              <div className="mb-5">
                <label className="text_size_5">Training Company</label>
                <select
                  {...register("company")}
                  className="input-field select-custom"
                >
                  {selectedCourse && Array.isArray(selectedCourse.company) ? (
                    selectedCourse.company.map((company, index) => (
                      <option key={index} value={company}>
                        {company}
                      </option>
                    ))
                  ) : (
                    <option value={selectedCourse?.company || ""}>
                      {selectedCourse?.company || "No Company Available"}
                    </option>
                  )}
                </select>
            
              </div>
            </form>
          </div>
        </div>
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center border mt-20">
    
      <AddCourseForm closeModal={() => setIsModalOpen(false)} />
    </div>
  // </div>
)}

    </section>
  );
};
