import { IoCloseCircleOutline } from "react-icons/io5";
import logo from "../../../assets/logo/logo-with-name.svg";
import { useEffect, useState } from "react";

export const EditViewSummary = ({
  summaryObject,
  toggleEditViewSummaryFunc,
  FinalEditedData,
}) => {
  const [formData, setFormData] = useState({
    id: summaryObject?.id,
    data: summaryObject?.data,
    grouped: summaryObject?.grouped,
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
    firstFileType: summaryObject?.firstFileType,
  });
  let verify = summaryObject.verify || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-[570px] rounded-lg shadow-lg p-7 ">
        <div className=" p-5 shadow-xl bg-[#fdfcfc]">
          <div className=" flex items-center justify-between pb-2 ">
            <p className="flex-1"></p>
            <img
              className="max-w-[200px] flex-1 w-full"
              src={logo}
              alt="not found"
            />
            <p className="flex-1 flex justify-end">
              <IoCloseCircleOutline
                className="text-[30px]  text-dark_grey cursor-pointer "
                onClick={() => {
                  toggleEditViewSummaryFunc();
                }}
              />
            </p>
          </div>

          <header className="flex justify-center items-center ">
            <h2 className="text-dark_grey text-[22px] font-bold border-b-2">
              {verify === "Yes" ? "View Form" : "Edit Form"}
            </h2>
          </header>

          <main className="mt-4">
            <form className="grid grid-cols-1 gap-4">
              <div className="flex justify-between gap-5">
                <div>
                  <label className="block text-dark_grey text_size_5 ">
                    Badge No.
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                      formData.badgeNo ? "bg-lite_skyBlue" : "bg-white"
                    }`}
                    name="badgeNo"
                    value={formData.badgeNo}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-dark_grey text_size_5">
                    Sap No.
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                      formData.sapNo ? "bg-lite_skyBlue" : "bg-white"
                    }`}
                    name="sapNo"
                    value={formData.sapNo}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div>
                  <label className="block text-dark_grey text_size_5">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                      formData.empName ? "bg-lite_skyBlue" : "bg-white"
                    }`}
                    name="empName"
                    value={formData.empName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-dark_grey text_size_5">
                    {" "}
                    Location
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                      formData.location ? "bg-lite_skyBlue" : "bg-white"
                    }`}
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div>
                  <label className="block text-dark_grey text_size_5">
                    Jobcode
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                      formData.jobcode ? "bg-lite_skyBlue" : "bg-white"
                    }`}
                    name="jobcode"
                    value={formData.jobcode}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-dark_grey text_size_5">
                    Normal Working Hrs Per Day
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 ${
                      formData.NWHPD ? "bg-lite_skyBlue" : "bg-white"
                    }`}
                    name="NWHPD"
                    value={formData.NWHPD}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-between gap-5">
                <div>
                  <label className="block text-dark_grey text_size_5">
                    Actual working Hours
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 bg-white`}
                    name="workingHrs"
                    value={formData.workingHrs}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-dark_grey text_size_5">
                    Overtime Hours
                  </label>
                  <input
                    type="text"
                    className={`mt-1 block w-full border outline-none border-lite_grey text_size_7  rounded text-sm py-2 px-3 bg-white`}
                    name="overtimeHrs"
                    value={formData.overtimeHrs}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </main>

          <footer className="flex justify-center mt-6 space-x-3">
            {verify === "Yes" ? (
              <button className="px-5 py-2 bg-[#48f748] text_size_5 text-dark_grey rounded cursor-not-allowed">
                Verified
              </button>
            ) : (
              <button
                className="px-5 py-2 bg-[#FEF116] text_size_5 text-dark_grey rounded"
                onClick={() => {
                  FinalEditedData(formData);
                  toggleEditViewSummaryFunc();
                }}
              >
                Verify
              </button>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
};
