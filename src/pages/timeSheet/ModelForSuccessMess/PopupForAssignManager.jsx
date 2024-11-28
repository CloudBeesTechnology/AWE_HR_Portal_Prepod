import { RxCross2 } from "react-icons/rx";
export const PopupForAssignManager = ({ toggleFunctionForAssiMana }) => {
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
      <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-5">
        {/* Header */}
        <header className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-dark_grey text_size_2">Assign Manager</h2>
          <RxCross2
            className="text-2xl text-dark_grey cursor-pointer "
            onClick={() => {
              toggleFunctionForAssiMana();
            }}
          />
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
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-2 px-3"
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
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-2 px-3"
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
                className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-2 px-3"
              />
            </div>

            {/* Contact No. Field */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-600"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-2 px-3"
                />
              </div>
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-600"
                >
                  End Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-dark_grey outline-none rounded text-sm py-2 px-3"
                />
              </div>
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="flex justify-center mt-6 space-x-3">
          <button
            className="px-5 py-2 bg-[#FEF116] text-dark_grey text_size_3 rounded"
            onClick={() => {
              toggleFunctionForAssiMana();
            }}
          >
            Save
          </button>
        </footer>
      </div>
    </section>
  );
};
