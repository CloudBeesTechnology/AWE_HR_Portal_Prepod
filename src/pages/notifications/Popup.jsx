import { RxCross2 } from "react-icons/rx";
import { TbArrowBackUp } from "react-icons/tb";
export const Popup = ({ toggleFunction, specificNotificationDetails ,popupData}) => {
  console.log(specificNotificationDetails);
  console.log(popupData);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <section className="bg-[#FBFBFB] p-5 gap-2 flex flex-col item-center rounded-lg shadow-md  w-[600px]">
        <div className="flex justify-between items-center border-b pb-2">
          <TbArrowBackUp
            className="text-2xl cursor-pointer"
            onClick={toggleFunction}
          />
          <p className="text-dark_grey text-[14px] pl-5">
            {specificNotificationDetails.date}
          </p>
        </div>
        <div className="grid grid-cols-2 mt-3">
          <p className="text-dark_grey text_size_6">Emp ID</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.empID}
          </p>
        </div>
        <div className="grid grid-cols-2 mt-1">
          <p className="text-dark_grey text_size_6">Subject</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.subject}
          </p>
        </div>
        <div className="grid mt-3">
          <p className="text-dark_grey text_size_6">Description</p>
          <p className="text-dark_grey text-[16px] mt-2">
            {specificNotificationDetails.message}
          </p>
        </div>


        {/* empID: notification.empID,
          subject: notification.leaveType || "Notification",
          receipentEmail: notification.receipentEmail,
          senderEmail:notification.senderEmail,
          message: notification.message,
          date: new Date(notification.createdAt).toLocaleDateString(), */}


        {/* <div className="grid grid-cols-2 pl-5">
          <p className="text-dark_grey text_size_6">Emp Badge number</p>
          <p className="text-dark_grey text-[16px] pl-5">
            {specificNotificationDetails.empBadgeNo}
          </p>
        </div> */}

        {/* <div className="grid grid-cols-2 pl-5">
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
            {specificNotificationDetails.position}
          </p>
        </div> */}
      
      </section>
    </div>
  );
};
