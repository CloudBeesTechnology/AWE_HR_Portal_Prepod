import { RxCross2 } from "react-icons/rx";
export const Popup = ({ toggleFunction, specificNotificationDetails }) => {
  console.log(specificNotificationDetails);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md border border-[#EBEBEB] ">
        <div className="flex justify-end">
          <RxCross2
            className="text-2xl cursor-pointer"
            onClick={toggleFunction}
          />
        </div>
        <div className="flex justify-center ">
          <img
            className="size-32 h-12 w-full"
            src="/src/assets/logo/logo-with-name.svg"
            alt="not found"
          />
        </div>
        <div className="flex justify-center py-2 ">
          <p className="text-dark_grey text_size_3">Passport Expiry</p>
        </div>
        <div className="grid grid-cols-2  pl-5">
          <p className="text-dark_grey text_size_6">Employee ID</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.empID}
          </p>
        </div>
        <div className="grid grid-cols-2 pl-5">
          <p className="text-dark_grey text_size_6">Employee Badge number</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.empBatchNo}
          </p>
        </div>

        <div className="grid grid-cols-2 pl-5">
          <p className="text-dark_grey text_size_6">Employee Name</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.name}
          </p>
        </div>
        <div className="grid grid-cols-2 pl-5">
          <p className="text-dark_grey text_size_6">Department</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.department}
          </p>
        </div>
        <div className="grid grid-cols-2 pl-5">
          <p className="text-dark_grey text_size_6">Nationality</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.nationality}
          </p>
        </div>
        <div className="grid grid-cols-2 pl-5">
          <p className="text-dark_grey text_size_6">Position</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.possition}
          </p>
        </div>
        <div className="grid grid-cols-2 pl-5 pb-3">
          <p className="text-dark_grey text_size_6">
            {specificNotificationDetails.subject}
          </p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.expiryDate}
          </p>
        </div>
      </section>
    </div>
  );
};
