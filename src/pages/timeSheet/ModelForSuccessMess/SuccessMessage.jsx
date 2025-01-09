import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { PopupForSFApproves } from "./PopupForSFApproves";
import { MdCancel } from "react-icons/md";

export const SuccessMessage = ({
  successMess,
  toggleSFAMessage,
  setExcelData,
  userIdentification,

}) => {
  return (
    <div>
      {successMess === true && (
        <PopupForSFApproves
          toggleSFAMessage={toggleSFAMessage}
          setExcelData={setExcelData}
          icons={<IoCheckmarkCircleSharp />}
          iconColor="text-[#2BEE48]"
          textColor="text-[#05b01f]"
          title={"Success!"}
          message={`Data has been successfully ${
            userIdentification === "Manager" ? "Approved" : "Stored"
          }`}
          btnText={"OK"}
        
        />
      )}
      {successMess === false && (
        <PopupForSFApproves
          toggleSFAMessage={toggleSFAMessage}
          icons={<MdCancel />}
          iconColor="text-[#dc2626]"
          textColor="text-[#dc2626]"
          title={"Sorry :("}
          message={"Something went wrong please try again!!"}
          btnText={"TRY AGAIN"}
        />
      )}
    </div>
  );
};
