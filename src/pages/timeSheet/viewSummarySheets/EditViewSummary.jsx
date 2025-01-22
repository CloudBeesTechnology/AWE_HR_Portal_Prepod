import { RxCross2 } from "react-icons/rx";
import logo from "../../../assets/logo/logo-with-name.svg";
import { useEffect, useState } from "react";

export const EditViewSummary = ({
  summaryObject,
  toggleEditViewSummaryFunc,
  FinalEditedData,
}) => {
  const [formData, setFormData] = useState({
    id: summaryObject?.id,
    badgeNo: summaryObject?.empBadgeNo || "",
    empName: summaryObject?.empName || "",
    sapNo: summaryObject?.sapNo || "",
    location: summaryObject?.location || "",
    jobcode: summaryObject?.jobcode || "",
    NWHPD: summaryObject?.workHrs || "",
    NWHPM: summaryObject?.workMonth || "",
    workingHrs: summaryObject?.workingHrs || "",
    overtimeHrs: summaryObject?.ot || "",
    workingHrsKey: summaryObject?.workingHrsKey || "",

    mealAllow: summaryObject?.mealAllow || "",
  });
  console.log(summaryObject);
  // Step 2: Handle changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value from the input
    setFormData({
      ...formData, // Spread the existing values
      [name]: value, // Update only the changed fields
    });
  };  
  
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-[550px] rounded-lg shadow-lg p-7 ">
        <div className=" flex items-center justify-between pb-5 ">
          <img className="max-w-[220px] w-full" src={logo} alt="not found" />
          <RxCross2
            className="text-2xl  text-dark_grey cursor-pointer "
            onClick={() => {
              toggleEditViewSummaryFunc();
            }}
          />
        </div>

        <header className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-dark_grey text_size_2">Edit Access</h2>
        </header>

        <main className="mt-4">
          <form className="grid grid-cols-1 gap-4">
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium ">Badge No.</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="badgeNo"
                  value={formData.badgeNo}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium ">Sap No.</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="sapNo"
                  value={formData.sapNo}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium ">
                  Employee Name{" "}
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="empName"
                  value={formData.empName}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium "> Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium ">Jobcode</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="jobcode"
                  value={formData.jobcode}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium ">
                  Normal Working Hours Per Day
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="NWHPD"
                  value={formData.NWHPD}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium ">
                  Normal Working Hours Per Month
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="NWHPM"
                  value={formData.NWHPM}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium ">Meal Allow</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="mealAllow"
                  value={formData.mealAllow || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-medium ">
                  Actual working Hours
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="workingHrs"
                  value={formData.workingHrs}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">
                  Overtime Hours
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                  name="overtimeHrs"
                  value={formData.overtimeHrs}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </main>

        <footer className="flex justify-center mt-6 space-x-3">
          <button
            className="px-5 py-2 bg-[#FEF116] text_size_5 text-dark_grey rounded"
            onClick={() => {
              FinalEditedData(formData);
              toggleEditViewSummaryFunc();
            }}
          >
            Verify
          </button>
        </footer>
      </div>
    </section>
  );
};
