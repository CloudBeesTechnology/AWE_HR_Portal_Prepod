import { useState, useContext, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import logo from "../../../assets/logo/logo-with-name.svg";
import { DataSupply } from "../../../utils/DataStoredContext";
import { SearchDisplay } from "../../../utils/SearchDisplay"; // Ensure this is the correct import
import { IoSearch } from "react-icons/io5"; // Assuming IoSearch is imported
import { useForm } from "react-hook-form"; // Import useForm

export const PopupForAssignManager = ({
  toggleFunctionForAssiMana,
  renameKeysFunctionAndSubmit,
}) => {
  const { empPIData, workInfoData } = useContext(DataSupply); // Assuming this is where employee data comes from
  const [errors, setErrors] = useState({});
  const [searchResultData, setSearchResultData] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useForm();

  const formData = watch(); // Using watch to keep track of form data

  const [filteredEmployees, setFilteredEmployees] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData ? workInfoData.find(
              (user) => user.empID === emp.empID
            ) : {};
          
            return {
              ...emp,
              ...WIDetails,
            };
          })
          .filter(Boolean);
        // console.log(mergedData);

        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, workInfoData]);
  console.log(allEmpDetails, "All")

 
  useEffect(() => {

    if (searchResultData) {
      console.log(searchResultData, "Data")
     
      setValue("empBadgeNo", searchResultData.empBadgeNo || "");  
      setValue("name", searchResultData.name || "");  
      setValue("department", searchResultData.department || "");  // Assuming `position` is where department is stored.
      
      console.log("Form data after selection:", watch()); // Log form data after auto-filling
    } else {
      console.log("Employee not found for empId:"); // Log if employee is not found
    }
  }, [searchResultData, setValue])

  const handleSubmitForm = () => {
    const newErrors = {};

    // Validation
    if (!formData.mbadgeNo) newErrors.mbadgeNo = "Badge No is required.";
    if (!formData.mName) newErrors.mName = "Name is required.";
    if (!formData.mdepartment) newErrors.mdepartment = "Department is required.";
    if (!formData.mfromDate) newErrors.mfromDate = "From Date is required.";
    if (!formData.muntilDate) newErrors.muntilDate = "Until Date is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    renameKeysFunctionAndSubmit(formData);
    toggleFunctionForAssiMana();
  };

  useEffect(() => {
    if (allEmpDetails.length > 0) {
      // Initialize filteredEmployees with all employees on component mount
      setFilteredEmployees(allEmpDetails);
    }
  }, [allEmpDetails]);

  
  const searchResult = (result) => {
    // console.log(result);
    setSearchResultData(result);
  };


  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-7">
        <div className="flex items-center justify-between pb-5">
          <img className="max-w-[220px] w-full" src={logo} alt="not found" />
          <RxCross2
            className="text-2xl text-dark_grey cursor-pointer"
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
                newFormData={allEmpDetails} // Original employee data, used to find details
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
                // onSelectEmployee={handleEmployeeSelect} // Pass the handler for employee selection
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Badge No</label>
              <input
                type="text"
                name="empBadgeNo"
                value={formData.empBadgeNo || ""}
                onChange={(e) => {
                  console.log("Changing empBadgeNo:", e.target.value); // Log input change
                  setValue("empBadgeNo", e.target.value);
                }} 
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
              {formErrors.mName && (
                <p className="text-red text-xs">{formErrors.mName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={(e) => {
                  console.log("Changing name:", e.target.value); // Log input change
                  setValue("name", e.target.value);
                }} 
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
              {formErrors.mName && (
                <p className="text-red text-xs">{formErrors.mName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department || ""}
                onChange={(e) => {
                  console.log("Changing department:", e.target.value); // Log input change
                  setValue("department", e.target.value);
                }} 
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
              {formErrors.mdepartment && (
                <p className="text-red text-xs">{formErrors.department}</p>
              )}
            </div>

            <p className="text-dark_grey text_size_2">Timesheet Period:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">From</label>
                <input
                  type="date"
                  name="mfromDate"
                  value={formData.mfromDate || ""}
                  onChange={(e) => {
                    console.log("Changing mfromDate:", e.target.value); // Log input change
                    setValue("mfromDate", e.target.value);
                  }} 
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                />
                {formErrors.mfromDate && (
                  <p className="text-red text-xs">{formErrors.mfromDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Until</label>
                <input
                  type="date"
                  name="muntilDate"
                  value={formData.muntilDate || ""}
                  onChange={(e) => {
                    console.log("Changing muntilDate:", e.target.value); // Log input change
                    setValue("muntilDate", e.target.value);
                  }} 
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                />
                {formErrors.muntilDate && (
                  <p className="text-red text-xs">{formErrors.muntilDate}</p>
                )}
              </div>
            </div>
          </form>
        </main>

        <footer className="flex justify-center mt-6 space-x-3">
          <button
            className="px-5 py-2 bg-[#FEF116] text_size_5 text-dark_grey rounded"
            onClick={handleSubmitForm}
          >
            Send for Approval
          </button>
        </footer>
      </div>
    </section>
  );
};
