import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmpRequisitionSchema } from "../../../services/Validation";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FormField } from "../../../utils/FormField";
import { EmpReqDataFun } from "../../../services/createMethod/EmpReqDataFun";
import useEmployeePersonalInfo from "../../../hooks/useEmployeePersonalInfo";
// import { useCreateNotification } from "../../hooks/useCreateNotification";
import { sendEmail } from "../../../services/EmailServices";

export const EmpRequisitionForm = ({ isVisible, onClose }) => {
  const { SubmitReqData } = EmpReqDataFun();
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmpRequisitionSchema),
  });

  const [notification, setNotification] = useState(false);
  // const { createNotification } = useCreateNotification();

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const userType = localStorage.getItem("userType");
    setUserID(userID);
    setUserType(userType);
    // console.log("Navbar: User ID from localStorage:", userID);
  }, []);

  const { personalInfo } = useEmployeePersonalInfo(userID);
  const { workInfo } = useEmployeePersonalInfo(userID);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    console.log("Personal Info:", personalInfo);
    console.log("Work Info:", workInfo);
    try {
      const requestorID = personalInfo.empID || userID;

      if (!requestorID) {
        throw new Error(
          "Requestor ID is missing. Ensure userID or empID is available."
        );
      }
      const EmpReqValue = {
        ...data,
        // userID,
        reqName: personalInfo.name,
        requestorID,
        department: data.department,
        project: data.project,
        position: data.position,
        quantity: parseInt(data.quantity, 10),
        reasonForReq: data.reasonForReq,
        justification: data.justification,
        replacementFor: data.replacementFor || null,
        qualification: data.qualification,
        tentativeDate: data.tentativeDate,
        status: data.status,
        approverID: "",
        remarkReq: data.remarkReq,
      };
      console.log("Final EmpReqValue:", EmpReqValue);

      await SubmitReqData({ EmpReqValue });
      setNotification(true);
      if (userType === "Manager") {
        sendEmail(
          `Employee Requisition Request`,
          `Dear GM Sir, Your Manager ${
            personalInfo.name || "N/A"
          } has sumbitted the employee Requisition Form.      
          View at : https://hr.adininworks.co `,
          "hr_no-reply@adininworks.com",
          "reachfarza@gmail.com"
        );
        sendEmail(
          `Employee Requisition Request`,
          `Dear HR, Your Manager ${
            personalInfo.name || "N/A"
          } has sumbitted the employee Requisition Form.      
          View at : https://hr.adininworks.co `,
          "hr_no-reply@adininworks.com",
          "reachrafan@gmail.com"
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);

      if (error?.errors) {
        error.errors.forEach((err, index) => {
          console.error(`GraphQL Error ${index + 1}:`, err.message);
          if (err.extensions) {
            console.error("Error Extensions:", err.extensions);
          }
        });
      }
    }
  };
  const applyFields = [
    { label: "Department", name: "department", type: "text" },
    { label: "Position", name: "position", type: "text" },
    { label: "Project", name: "project", type: "text" },
    { label: "Quantity", name: "quantity", type: "text" },
    { label: "Reason for Request",
      name: "reasonForReq",
      type: "select",
      options: [
        { value: "Additional", label: "Additional" },
        { value: "Replacement", label: "Replacement" },
      ],
    },
    { label: "Justification of Request", name: "justification", type: "text" },
    { label: "If Replacement, for whom", name: "replacementFor", type: "text" },
    { label: "State Qualification Desired",
      name: "qualification",
      type: "text",
    },
    { label: "Tentative Date to Mobilize",
      name: "tentativeDate",
      type: "date",
    },
  ];
  return (
    <div className="bg-white w-full max-w-[900px] rounded-lg relative">
      <div className="flex gap-8 p-4">
        <img src={AweLogo} alt="Logo" className="max-w-[150px] w-full" />
        <h2 className="text-lg font-semibold">
          Apply for Employee Requisition
        </h2>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 border rounded-full p-1"
        >
          <VscClose size={20} />
        </button>
      </div>
      <div className="max-h-[450px] overflow-y-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applyFields.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                register={register}
                errors={errors}
                {...(field.type === "select" && { options: field.options })}
              />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 pt-4">
            <button type="submit" className="primary_btn">
              Submit
            </button>
          </div>
          {notification && (
            <SpinLogo
              text="Your Requisition Submitted Successfully"
              notification={notification}
              path="/recrutiles/applyemployreq"
            />
          )}
        </form>
      </div>
    </div>
  );
};
