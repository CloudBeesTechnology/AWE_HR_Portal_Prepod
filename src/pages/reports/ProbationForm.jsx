import React, { forwardRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import logo from "../../assets/logo/logo-with-name.svg";
import { ConfirmationForm } from "./ConfirmationForm";
import { ContractChoose } from "./ContractChoose";
import { useLocation } from "react-router-dom";
import { SpinLogo } from "../../utils/SpinLogo";
import { useState } from "react";
import { ProbFormFun } from "../../services/createMethod/ProbFormFun";
import { UpdateProbForm } from "../../services/updateMethod/UpdateProbForm";
import { probationFormSchema } from "../../services/ReportValidation";
import { DataSupply } from "../../utils/DataStoredContext";
import { useContext } from "react";

export const ProbationForm = forwardRef(() => {
  const { empPIData, workInfoData, ProbFData } = useContext(DataSupply);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { ProbFormsData } = ProbFormFun();
  const { UpdateProb } = UpdateProbForm();

  console.log(ProbFData);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const provDetails = ProbFData
              ? ProbFData.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...provDetails,
            };
          })
          .filter(Boolean);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [empPIData, workInfoData, ProbFData]);

  const location = useLocation();

  const { employeeData } = location.state || {};
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [formData, setFormData] = useState({
    probData: {
      adaptability: "",
      additionalInfo: "",
      attention: "",
      attitude: "",
      commitment: "",
      communication: "",
      deadline: "",
      diligent: "",
      extensionPeriod: "",
      gmDate: "",
      hrDate: "",
      hrName: "",
      initiative: "",
      managerDate: "",
      managerName: "",
      pace: "",
      quality: "",
      recommendation: "",
      responsibility: "",
      supervisorDate: "",
      supervisorName: "",
      teamwork: "",
      extendProbED: "",
      gmApproved: "",
      managerApproved: "",
      supervisorApproved: "",
      communicationDetails: "",
      qualityDetails: "",
      paceDetails: "",
      initiativeDetails: "",
      attitudeDetails: "",
      adaptabilityDetails: "",
      teamworkDetails: "",
      responsibilityDetails: "",
      diligentDetails: "",
      commitmentDetails: "",
    },
  });
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(probationFormSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData.map((emp) => {
          const WIDetails =
            workInfoData?.find((user) => user.empID === emp.empID) || {};
          const provDetails =
            ProbFData?.find((user) => user.empID === emp.empID) || {};

          return {
            ...emp,
            ...WIDetails,
            ...provDetails,
          };
        });
        setUserDetails(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [empPIData, workInfoData, ProbFData]);

  useEffect(() => {
    console.log("Effect triggered");
  
    if (ProbFData.length > 0) {
      console.log("ProbFData has data:", ProbFData);
  
      const fetchedProbData = ProbFData.find(
        (data) => data.empID === employeeData?.empID
      );
      console.log("Contract data found:", fetchedProbData);
  
      if (fetchedProbData) {
        console.log("Setting form data...");
  
        setFormData({
          probData: {
            adaptability: fetchedProbData.adaptability || "",  // Default to empty string if null or undefined
            additionalInfo: fetchedProbData.additionalInfo || "",
            attention: fetchedProbData.attention || "",
            attitude: fetchedProbData.attitude || "",
            commitment: fetchedProbData.commitment || "",
            communication: fetchedProbData.communication || "",
            deadline: fetchedProbData.deadline || "",
            diligent: fetchedProbData.diligent || "",
            extensionPeriod: fetchedProbData.extensionPeriod || "",
            gmDate: fetchedProbData.gmDate || "",
            hrDate: fetchedProbData.hrDate || "",
            hrName: fetchedProbData.hrName || "",
            initiative: fetchedProbData.initiative || "",
            managerDate: fetchedProbData.managerDate || "",
            managerName: fetchedProbData.managerName || "",
            pace: fetchedProbData.pace || "",
            quality: fetchedProbData.quality || "",
            recommendation: fetchedProbData.recommendation || "",
            responsibility: fetchedProbData.responsibility || "",
            supervisorDate: fetchedProbData.supervisorDate || "",
            supervisorName: fetchedProbData.supervisorName || "",
            teamwork: fetchedProbData.teamwork || "",
            extendProbED: fetchedProbData.extendProbED || "",
            gmApproved: fetchedProbData.gmApproved || "",
            managerApproved: fetchedProbData.managerApproved || "",
            supervisorApproved: fetchedProbData.supervisorApproved || "",
            communicationDetails: fetchedProbData.communicationDetails || "",
            qualityDetails: fetchedProbData.qualityDetails || "",
            paceDetails: fetchedProbData.paceDetails || "",
            initiativeDetails: fetchedProbData.initiativeDetails || "",
            attitudeDetails: fetchedProbData.attitudeDetails || "",
            adaptabilityDetails: fetchedProbData.adaptabilityDetails || "",
            teamworkDetails: fetchedProbData.teamworkDetails || "",
            responsibilityDetails: fetchedProbData.responsibilityDetails || "",
            diligentDetails: fetchedProbData.diligentDetails || "",
            commitmentDetails: fetchedProbData.commitmentDetails || "",
          },
        });
  
        console.log("Form data set:", {
          probData: {
            adaptability: formData.probData.adaptability,
            attention: formData.probData.attention,
          },
        });
      } else {
        console.log("No matching contract data found");
      }
    } else {
      console.log("No data in ProbFData");
    }
  }, [ProbFData, employeeData?.empID]);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      probData: {
        ...prevState.probData,
        [name]: value,
      },
    }));
  };

  // useEffect(() => {
  //   if (ProbFData?.length > 0 && location.state?.employeeData) {
  //     const probationDataValue = ProbFData.find(
  //       (data) => data.empID === location.state.employeeData.empID
  //     );
  //     if (probationDataValue) {
  //       Object.entries(probationDataValue).forEach(([key, value]) =>
  //         setValue(key, value)
  //       );
  //       setFormData(probationDataValue);
  //       console.log(formData);

  //     }
  //   }
  // }, [ProbFData, location.state, setValue]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   setValue(name, value);
  // };

  const onSubmit = async (data) => {
    try {
      const PFDataRecord = ProbFData.find(
        (match) => match.empID === data.empID
      );

      if (PFDataRecord) {
        const PbFDataUp = { ...data, id: PFDataRecord.id };
        await UpdateProb({ PbFDataUp });
        setShowTitle("Probation Form Updated successfully");
      } else {
        const ProbValue = { ...data };
        await ProbFormsData({ ProbValue });
        setShowTitle("Probation Form Saved successfully");
      }
      setNotification(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 bg-white shadow-md w-full px-20 mx-auto"
    >
      {/* Header */}
      <section className="center mb-16">
        <div className="max-w-[400px] w-full">
          <img className="w-full" src={logo} alt="Logo not found" />
        </div>
      </section>

      <div className="mb-10">
        <p className="text-md mt-2">
          For the attention of:{" "}
          <input
            type="text"
            name="attention"
            {...register("attention")}
            value={formData.probData.attention}
            onChange={handleInputChange}
            className="border-b border-black focus:outline-none px-1"
          />
        </p>
        <p className="text-md mt-3">
          Deadline submit to Human Resources Department by{" "}
          <input
            type="text"
            {...register("deadline")}
            value={formData.deadline}
            onChange={handleInputChange}
            className="border-b border-black outline-none px-1"
          />
        </p>
      </div>

      {/* Employee Details */}
      <div className="w-full mx-auto mb-10">
        <h2 className="text-lg font-semibold mb-4">Employee Details:</h2>
        <table className="w-full border border-black">
          <tbody>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Employee Name
              </td>
              <td className="p-2 border-b">
                <input
                  {...register("name")}
                  defaultValue={employeeData?.name || "-"}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Employee ID
              </td>
              <td className="p-2 border-b">
                {/* Displaying employee name and registering the input */}
                <input
                  {...register("empID")}
                  defaultValue={employeeData?.empID || ""}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Badge Number
              </td>
              <td className="p-2 border-b">
                {/* Displaying employee name and registering the input */}
                <input
                  {...register("empBadgeNo")}
                  defaultValue={employeeData?.empBadgeNo || ""}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Department
              </td>
              <td className="p-2 border-b">
                <input
                  {...register("department")}
                  defaultValue={employeeData?.department || ""}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Position</td>
              <td className="p-2 border-b">
                <input
                  {...register("position")}
                  defaultValue={employeeData?.position || ""}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Date Joined
              </td>
              <td className="p-2 border-b">
                <input
                  {...register("doj")}
                  defaultValue={employeeData?.doj || ""}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Probation End Date
              </td>
              <td className="p-2 border-b">
                <input
                  {...register("probationEnd")}
                  defaultValue={employeeData?.probationEndDate || "-"}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            {/* <tr className="border">
              <td className="p-2 border-r font-semibold">Extended Probation End Date</td>
              <td className="p-2 border-b">
              <input
                {...register("extendedProbationEndDate")}
                defaultValue={employeeData?.extendedPED || "-"}
                className="w-full outline-none"
              />
            </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <ContractChoose register={register} />
      <ConfirmationForm
        register={register}
        formData={formData}
        onChange={handleInputChange}
      />

      {/* Save Button */}
      <div className="flex items-center justify-center mt-8">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      {/* {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/reports"
          />
        )} */}
    </form>
  );
});
