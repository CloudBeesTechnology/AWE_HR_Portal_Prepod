import { useEffect, useState, useCallback } from "react";
import { generateClient } from "@aws-amplify/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmpRequisitionSchema } from "../../../services/Validation";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { SpinLogo } from "../../../utils/SpinLogo";
import { FormField } from "../../../utils/FormField";
import { EmpReqDataFun } from "../../../services/createMethod/EmpReqDataFun";
import useEmployeePersonalInfo from "../../../hooks/useEmployeePersonalInfo";
import { sendEmail } from "../../../services/EmailServices";
import { useTempID } from "../../../utils/TempIDContext";

const client = generateClient();

export const EmpRequisitionForm = ({ isVisible, onClose }) => {
  const { SubmitReqData } = EmpReqDataFun();
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const { gmMail, hrManagerMail } = useTempID();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmpRequisitionSchema),
  });

  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    const userType = localStorage.getItem("userType");
    setUserID(userID);
    setUserType(userType);
  }, []);

  const { personalInfo, workInfo } = useEmployeePersonalInfo(userID);

  const onSubmit = async (data) => {
    try {
      const requestorID = personalInfo.empID || userID;
      if (!requestorID) throw new Error("Requestor ID is missing.");

      const EmpReqValue = {
        ...data,
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
        approverID: personalInfo.officialEmail,
        remarkReq: data.remarkReq,
      };

      await SubmitReqData({ EmpReqValue });
      setNotification(true);
      setShowTitle("Your Requisition Submitted Successfully");

      if (userType === "Manager") {
        if (gmMail) {
          console.log("Sending email to GM at:", gmMail);
          await sendEmail(
            `Employee Requisition Request`,
            `<html>
    <body>
      <p>
        Dear GM,<br><br>
        Your Manager ${
          personalInfo.name || "N/A"
        } has submitted the Employee Requisition Form.<br/><br/>
       Click here https://hr.adininworks.co to view the request.
      </p>
    </body>
  </html>`,
            "hr_no-reply@adininworks.com",
            gmMail
          );
        } else {
          console.error("General Manager email not found.");
        }

        if (hrManagerMail) {
          console.log("Sending email to HR at:", hrManagerMail);
          await sendEmail(
            `Employee Requisition Request`,
            `<html>
    <body>
      <p>
        Dear HR,<br><br>
        Your Manager ${
          personalInfo.name || "N/A"
        } has submitted the Employee Requisition Form.<br/><br/>
        View the details at: https://hr.adininworks.co
      </p>
    </body>
  </html>`,
            "hr_no-reply@adininworks.com",
            hrManagerMail
          );
          console.log("Email to HR sent successfully.");
        } else {
          console.error("Human Resource Manager email not found.");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const applyFields = [
    { label: "Department", name: "department", type: "text" },
    { label: "Position", name: "position", type: "text" },
    { label: "Project", name: "project", type: "text" },
    { label: "Quantity", name: "quantity", type: "text" },
    {
      label: "Reason for Request",
      name: "reasonForReq",
      type: "select",
      options: [
        { value: "Additional", label: "Additional" },
        { value: "Replacement", label: "Replacement" },
      ],
    },
    { label: "Justification of Request", name: "justification", type: "text" },
    { label: "If Replacement, for whom", name: "replacementFor", type: "text" },
    {
      label: "State Qualification Desired",
      name: "qualification",
      type: "text",
    },
    {
      label: "Tentative Date to Mobilize",
      name: "tentativeDate",
      type: "date",
    },
  ];

  return (
    <div className="bg-white w-full max-w-[900px] rounded-lg relative">
      <div className="text-center p-2">
        <img
          src={AweLogo}
          alt="Logo"
          className="max-w-[250px] w-full mx-28 mb-3"
        />
        <h2 className="text-lg font-semibold underline my-6">
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
              text={showTitle}
              notification={notification}
              path="/recrutiles/applyemployreq"
            />
          )}
        </form>
      </div>
    </div>
  );
};
