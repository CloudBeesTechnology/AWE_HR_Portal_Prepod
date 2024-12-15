import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import logo from "../../../assets/logo/logo-with-name.svg"
export const PopupForAssignManager = ({
  toggleFunctionForAssiMana,
  renameKeysFunctionAndSubmit,
}) => {
  const [formData, setFormData] = useState({
    mbadgeNo: "",
    mName: "",
    mdepartment: "",
    mfromDate: "",
    muntilDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    renameKeysFunctionAndSubmit(formData);
    toggleFunctionForAssiMana();
  };
  return (
    // <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 border ">
    //   <header>Assign Manager</header>
    //   <main className="border ">
    //     <div
    //       className="flex justify-end"
    //       onClick={() => {
    //         toggleFunctionForAssiMana();
    //       }}
    //     >
    //       <RxCross2 className="text-2xl cursor-pointer" />
    //       <div className="grid grid-cols-2 pl-5 gap-5">
    //         <p className="text-dark_grey text_size_6 pt-2">Badge No.</p>{" "}
    //         <div>
    //           <input
    //             type="text"
    //             className="border border-dark_grey rounded text-dark_grey text-[16px] outline-none w-full py-1 px-3 cursor-auto"
    //             // value={editObject.FID}
    //             value={""}
    //             // onChange={handleChange}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    //   <footer className="flex justify-center">
    //     <button
    //       className="text-dark_grey text_size_3 rounded bg-[#FEF116] px-9 m-5 py-2"
    //       onClick={() => {
    //         toggleFunctionForAssiMana();
    //       }}
    //     >
    //       Save
    //     </button>
    //   </footer>
    // </section>
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-7 ">
        <div className=" flex items-center justify-between pb-5 ">
          <img
            className="max-w-[220px] w-full  "
            src={logo}
             
            alt="not found"
          />
          <RxCross2
            className="text-2xl  text-dark_grey cursor-pointer "
            onClick={() => {
              toggleFunctionForAssiMana();
            }}
          />
        </div>
        {/* Header */}
        <header className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-dark_grey text_size_2">Assign Manager</h2>
          {/* <RxCross2
            className="text-2xl text-dark_grey cursor-pointer "
            onClick={() => {
              toggleFunctionForAssiMana();
            }}
          /> */}
        </header>

        {/* Main Content */}
        <main className="mt-4">
          <form className="grid grid-cols-1 gap-4">
            {/* Badge No. Field */}
            <div>
              <label
                htmlFor="badgeNo"
                className="block text-sm font-medium text-gray-600"
              >
                Badge No.
              </label>
              <input
                type="text"
                id="badgeNo"
                name="mbadgeNo"
                value={formData.mbadgeNo}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
            </div>

            {/* Manager Name Field */}
            <div>
              <label
                htmlFor="managerName"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="managerName"
                name="mName"
                value={formData.mName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
            </div>

            {/* Department Field */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-600"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="mdepartment"
                value={formData.mdepartment}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
              />
            </div>
            <p className="text-dark_grey text_size_2 ">Timesheet Period : </p>
            {/* Contact No. Field */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-600"
                >
                  From
                </label>
                <input
                  type="date"
                  name="mfromDate"
                  value={formData.mfromDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                />
              </div>
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-600"
                >
                  Until
                </label>
                <input
                  type="date"
                  name="muntilDate"
                  value={formData.muntilDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-1.5 px-3"
                />
              </div>
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="flex justify-center mt-6 space-x-3">
          <button
            className="px-5 py-2 bg-[#FEF116] text_size_5 text-dark_grey rounded"
            onClick={() => {
              handleSubmit();
            }}
          >
            Send for Approval
          </button>
        </footer>
      </div>
    </section>
  );
};
