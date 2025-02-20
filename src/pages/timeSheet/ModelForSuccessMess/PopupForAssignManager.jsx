import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import logo from "../../../assets/logo/logo-with-name.svg";

import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";

export const PopupForAssignManager = ({
  toggleFunctionForAssiMana,
  renameKeysFunctionAndSubmit,
  mergedData,
}) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [formData, setFormData] = useState({
    mbadgeNo: "",
    mName: "",
    mdepartment: "",
    mfromDate: "",
    muntilDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { mbadgeNo, mName, mdepartment, mfromDate, muntilDate } = formData;

    if (!mbadgeNo) newErrors.mbadgeNo = "Badge No is required.";

    if (!mName) newErrors.mName = "Name is required.";

    if (!mdepartment) newErrors.mdepartment = "Department is required.";

    if (!mfromDate) newErrors.mfromDate = "From Date is required.";

    if (!muntilDate) newErrors.muntilDate = "Until Date is required.";
    else if (new Date(muntilDate) < new Date(mfromDate))
      newErrors.muntilDate = "Until Date cannot be before From Date.";

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    renameKeysFunctionAndSubmit(formData);
    toggleFunctionForAssiMana();
  };

  const searchResult = (result) => {
    setFormData({
      mbadgeNo: result?.empBadgeNo || "",
      mName: result?.name || "",
      mdepartment:
        Array.isArray(result?.department) && result?.department.length > 0
          ? result.department[result.department.length - 1]
          : "",
    });
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-7 "
        onClick={() => {
          setFilteredEmployees([]);
        }}
      >
        <div className=" p-5 shadow-xl bg-[#fdfcfc]">
          <div className=" flex items-center justify-between pb-2">
            <p className="flex-1"></p>
            <img
              className="max-w-[220px] flex-1 w-full"
              src={logo}
              alt="not found"
            />
            <p className="flex-1 flex justify-end">
              <IoCloseCircleOutline
                className="text-[30px]  text-dark_grey cursor-pointer"
                onClick={toggleFunctionForAssiMana}
              />
            </p>
          </div>

          <header className="flex justify-center items-center pb-2 ">
            <h2 className="text-dark_grey text-[22px] font-bold border-b-2">
              Assign Manager
            </h2>
          </header>

          <main className="mt-4">
            <form className="grid grid-cols-1 gap-4">
              <div className="flex-1">
                <SearchDisplay
                  searchResult={searchResult}
                  newFormData={mergedData}
                  searchIcon2={<IoSearch />}
                  placeholder="Search Employee Id"
                  rounded="rounded-lg"
                  filteredEmployees={filteredEmployees}
                  setFilteredEmployees={setFilteredEmployees}
                />
              </div>
              <div>
                <label className="block text-dark_grey text_size_5 ">
                  Badge No.
                </label>
                <input
                  type="text"
                  name="mbadgeNo"
                  value={formData.mbadgeNo || ""}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                    formData.mbadgeNo ? "bg-lite_skyBlue" : "bg-white"
                  }`}
                />
                {errors.mbadgeNo && (
                  <p className="text-red text-xs">{errors.mbadgeNo}</p>
                )}
              </div>

              <div>
                <label className="block text-dark_grey text_size_5">Name</label>
                <input
                  type="text"
                  name="mName"
                  value={formData.mName || ""}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border outline-none border-lite_grey text_size_7 rounded text-sm py-2 px-3 ${
                    formData.mName ? "bg-lite_skyBlue" : "bg-white"
                  }`}
                />
                {errors.mName && (
                  <p className="text-red text-xs">{errors.mName}</p>
                )}
              </div>

              <div>
                <label className="block text-dark_grey text_size_5">
                  Department
                </label>
                <input
                  type="text"
                  name="mdepartment"
                  value={formData.mdepartment || ""}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border outline-none border-lite_grey text_size_7 rounded text-sm py-2 px-3 ${
                    formData.mdepartment ? "bg-lite_skyBlue" : "bg-white"
                  }`}
                />
                {errors.mdepartment && (
                  <p className="text-red text-xs">{errors.mdepartment}</p>
                )}
              </div>

              <p className="text-dark_grey text_size_2">Timesheet Period:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark_grey text_size_5 text-gray-600">
                    From
                  </label>
                  <input
                    type="date"
                    name="mfromDate"
                    value={formData.mfromDate || ""}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border outline-none border-lite_grey  rounded text_size_6 py-1.5 px-3 `}
                  />
                  {errors.mfromDate && (
                    <p className="text-red text-xs">{errors.mfromDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-dark_grey text_size_5 text-gray-600">
                    Until
                  </label>
                  <input
                    type="date"
                    name="muntilDate"
                    value={formData.muntilDate || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border outline-none border-lite_grey  rounded text_size_6 py-1.5 px-3"
                  />
                  {errors.muntilDate && (
                    <p className="text-red text-xs">{errors.muntilDate}</p>
                  )}
                </div>
              </div>
            </form>
          </main>

          <footer className="flex justify-center mt-6 space-x-3">
            <button
              className="px-5 py-2 bg-[#FEF116] text_size_5 text-dark_grey rounded"
              onClick={handleSubmit}
            >
              Send for Approval
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};
