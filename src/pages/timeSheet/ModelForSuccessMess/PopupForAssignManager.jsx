import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import logo from "../../../assets/logo/logo-with-name.svg";
import { AutoFetchForAssignManager } from "../customTimeSheet/AutoFetchForAssignManager";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";

export const PopupForAssignManager = ({
  toggleFunctionForAssiMana,
  renameKeysFunctionAndSubmit,
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

  const mergedData = AutoFetchForAssignManager();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error when user starts typing
    }));
  };

  useEffect(() => {
    if (mergedData?.length > 0) {
      // Initialize filteredEmployees with all employees on component mount
      setFilteredEmployees(mergedData);
    }
  }, [mergedData]);

  const handleSubmit = () => {
    const newErrors = {};

    // Validation
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        const fieldName = {
          mbadgeNo: "Badge No",
          mName: "Name",
          mdepartment: "Department",
          mfromDate: "From Date",
          muntilDate: "Until Date",
        }[key];
        newErrors[key] = `${fieldName} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form

    renameKeysFunctionAndSubmit(formData);
    toggleFunctionForAssiMana();
  };

  const searchResult = (result) => {
    console.log(result);
    // setFormData(result);
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
        <div className=" flex items-center justify-between pb-5 ">
          <img className="max-w-[220px] w-full" src={logo} alt="not found" />
          <RxCross2
            className="text-2xl  text-dark_grey cursor-pointer "
            onClick={() => {
              toggleFunctionForAssiMana();
            }}
          />
        </div>

        <header className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-dark_grey text_size_2">Assign Manager</h2>
        </header>

        <main className="mt-4">
          <form className="grid grid-cols-1 gap-4">
            <div className="flex-1">
              <SearchDisplay
                searchResult={searchResult} // Pass the filtered employee list
                newFormData={mergedData} // Original employee data, used to find details
                searchIcon2={<IoSearch />}
                placeholder="Search Employee Id"
                rounded="rounded-lg"
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
                // onSelectEmployee={handleEmployeeSelect} // Pass the handler for employee selection
              />
            </div>
            <div>
              <label className="block text-sm font-medium ">Badge No.</label>
              <input
                type="text"
                name="mbadgeNo"
                value={formData.mbadgeNo || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
              {errors.mbadgeNo && (
                <p className="text-red text-xs">{errors.mbadgeNo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium ">Name</label>
              <input
                type="text"
                name="mName"
                value={formData.mName || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
              {errors.mName && (
                <p className="text-red text-xs">{errors.mName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium ">Department</label>
              <input
                type="text"
                name="mdepartment"
                value={formData.mdepartment || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
              {errors.mdepartment && (
                <p className="text-red text-xs">{errors.mdepartment}</p>
              )}
            </div>

            <p className="text-dark_grey text_size_2 ">Timesheet Period:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  From
                </label>
                <input
                  type="date"
                  name="mfromDate"
                  value={formData.mfromDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                />
                {errors.mfromDate && (
                  <p className="text-red text-xs">{errors.mfromDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Until
                </label>
                <input
                  type="date"
                  name="muntilDate"
                  value={formData.muntilDate || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
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
    </section>
  );
};
