import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmpRequisitionSchema } from '../../../services/Validation';
import AweLogo from '../../../assets/logo/logo-with-name.svg';
import { VscClose } from "react-icons/vsc";
import { SpinLogo } from '../../../utils/SpinLogo';
import { FormField } from "../../../utils/FormField";
import { EmpReqDataFun } from '../../../services/createMethod/EmpReqDataFun';
import useEmployeePersonalInfo from "../../../hooks/useEmployeePersonalInfo";


export const EmpRequisitionForm = ({ isVisible, onClose }) => {

  const { SubmitReqData } = EmpReqDataFun();
  const [userID, setUserID] = useState("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(EmpRequisitionSchema),
  });

  const [notification, setNotification] = useState(false);
  
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    // console.log("Navbar: User ID from localStorage:", userID);
  }, []);

  // Use the custom hook
  const { personalInfo } = useEmployeePersonalInfo(userID);


  const onSubmit = async (data) => {
    console.log("Form data:", data);
    console.log("Personal Info:", personalInfo);
    try {
      const EmpReqValue = {
        ...data,
        userID,
        reqName: personalInfo.name,
        requestorID: personalInfo.empID,
        department: data.department,
        project: data.project,
        position: data.position,
        quantity: data.quantity,
        reasonForReq: data.reasonForReq,
        justification: data.justification,
        replacementFor: data.replacementFor,
        qualification: data.qualification,
        tentativeDate: data.tentativeDate,
        status: data.status,
        approverID: personalInfo.empID,
        remarkReq: data.remarkReq, 
      };
      await SubmitReqData({ EmpReqValue });
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      console.log(error);

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

  return (
    <div className="bg-white w-full max-w-[900px] rounded-lg relative">
      <div className="flex gap-8 p-4">
        <img src={AweLogo} alt="Logo" className="max-w-[150px] w-full" />
        <h2 className="text-lg font-semibold">Apply for Employee Requisition</h2>
        <button onClick={onClose} className="absolute -top-4 -right-4 border rounded-full p-1">
          <VscClose size={20} />
        </button>
      </div>
      <div className="max-h-[450px] overflow-y-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Department"
              name="department"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="Position"
              name="position"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="Project"
              name="project"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="Quantity"
              name="quantity"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="Reason for Request"
              name="reasonForReq"
              type="select"
              register={register}
              errors={errors}
              options={[
                { value: 'Additional', label: 'Additional' },
                { value: 'Replacement', label: 'Replacement' },
              ]}
            />
            <FormField
              label="Justification of Request"
              name="justification"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="If Replacement, for whom"
              name="replacementFor"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="State Qualification Desired"
              name="qualification"
              type="text"
              register={register}
              errors={errors}
            />
            <FormField
              label="Tentative Date to Mobilize"
              name="tentativeDate"
              type="date"
              register={register}
              errors={errors}
            />
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




