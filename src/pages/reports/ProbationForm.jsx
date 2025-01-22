import React, { forwardRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import logo from "../../assets/logo/logo-with-name.svg";
import { ConfirmationForm } from "./ConfirmationForm";
import { ContractChoose } from "./ContractChoose";
import { Link, useLocation } from "react-router-dom";
import { SpinLogo } from "../../utils/SpinLogo";
import { useState } from "react";
import { ProbFormFun } from "../../services/createMethod/ProbFormFun";
import { UpdateProbForm } from "../../services/updateMethod/UpdateProbForm";
import { probationFormSchema } from "../../services/ReportValidation";
import { DataSupply } from "../../utils/DataStoredContext";
import { useContext } from "react";
import { sendEmail } from "../../services/EmailServices";
import { FaArrowLeft } from "react-icons/fa";

export const ProbationForm = forwardRef(() => {
  const location = useLocation();
  const { employeeData } = location.state || {};
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const { ProbFormsData } = ProbFormFun();
  const { UpdateProb } = UpdateProbForm();
  const { empPIData, workInfoData, ProbFData } = useContext(DataSupply);

  const [emailData, setEmailData] = useState({
    supervisorEmpID: "",
    managerEmpID: "",
    supervisorOfficialMail: "",
    managerOfficialMail: "",
    hrOfficialmail: "",
    gmOfficialMail: "",
    skilledAndUnskilled: "",
  });

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
      gmName: "",
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

  //email process start

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  useEffect(() => {
    // console.log("Effect triggered");

    // Ensure the required data is available before proceeding
    if (!workInfoData.length || !empPIData.length || !employeeData?.empID) {
      console.log("Data is not available yet");
      return;
    }

    // Step 1: Extract supervisorEmpID, managerEmpID, and hrEmpID from workInfoData
    const workInfo = workInfoData.find(
      (data) => data.empID === employeeData.empID
    );

    if (workInfo) {
      // Get the most recent values from the arrays
      const supervisorEmpID =
        workInfo.supervisor[workInfo.supervisor.length - 1];
      const managerEmpID = workInfo.manager[workInfo.manager.length - 1];
      const hrOfficialmail =  workInfo.hr[workInfo.hr.length - 1];

      // console.log("Supervisor EmpID:", supervisorEmpID);
      // console.log("Manager EmpID:", managerEmpID);
      // console.log("HR mail:", hrOfficialmail);

      // Step 2: Update emailData with supervisorEmpID, managerEmpID, and hrOfficialmail
      setEmailData((prevData) => ({
        ...prevData,
        supervisorEmpID,
        managerEmpID,
        hrOfficialmail,
      }));

      // Step 3: Fetch manager's official email
      if (managerEmpID) {
        // console.log("Fetching Manager's Email...");
        const managerInfo = empPIData.find(
          (data) => data.empID === String(managerEmpID)
        );
        // console.log("Manager Info:", managerInfo);
        if (managerInfo) {
          setEmailData((prevData) => ({
            ...prevData,
            managerOfficialMail: managerInfo.officialEmail, // Assuming this field exists.
          }));
        } else {
          // console.log("Manager Info not found.");
        }
      }

      // Step 4: Fetch supervisor's official email
      if (supervisorEmpID) {
        // console.log("Fetching Supervisor's Email...");
        const supervisorInfo = empPIData.find(
          (data) => data.empID === String(supervisorEmpID)
        );
        // console.log("Supervisor Info:", supervisorInfo);
        if (supervisorInfo) {
          setEmailData((prevData) => ({
            ...prevData,
            supervisorOfficialMail: supervisorInfo.officialEmail, // Assuming this field exists.
          }));
        } else {
          // console.log("Supervisor Info not found.");
        }
      }

      // Step 5: Check skillPool for "Skilled" or "UnSkilled"
      if (workInfo.skillPool) {
        if (
          workInfo.skillPool.includes("Skilled") ||
          workInfo.skillPool.includes("UnSkilled")
        ) {
          setEmailData((prevData) => ({
            ...prevData,
            skilledAndUnskilled: workInfo.skillPool, // Store the value of skillPool if it contains "Skilled" or "UnSkilled"
          }));
        }
      }

      // Step 6: Fetch General Manager's email (if applicable)
      const generalManagerPositions = workInfoData.filter((item) =>
        item.position[item.position.length - 1]?.includes("General Manager")
      );
      
      // console.log("Filtered General Manager Positions:", generalManagerPositions);
      
      if (generalManagerPositions.length > 0) {
        const gmInfo = empPIData.find(
          (data) => data.empID === String(generalManagerPositions[0].empID)
        );
      
        // console.log("GM Info:", gmInfo);
      
        if (gmInfo) {
          setEmailData((prevData) => ({
            ...prevData,
            gmOfficialMail: gmInfo.officialEmail,
          }));
          // console.log("Updated Email Data with GM Email:", gmInfo.officialEmail);
        } 
      } 
    }
  }, [workInfoData, employeeData?.empID, empPIData]);

  // Log the final emailData when it changes
  useEffect(() => {
    // console.log("Email Data has changed:", emailData);
  }, [emailData]);

  //email process end

  // console.log(emailData);  27, 1705, 19, 2512, 

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
  // console.log(ProbFData);

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

  // auto fetch
  useEffect(() => {
    if (ProbFData.length === 0 || !employeeData?.empID) {
      console.log(
        ProbFData.length === 0 ? "No data in ProbFData" : "No employee ID found"
      );
      return;
    }

    const fetchedProbData = ProbFData.find(
      (data) => data.empID === employeeData.empID
    );

    if (!fetchedProbData) {
      console.log("No matching contract data found");
      return;
    }

    const defaultFormData = Object.keys(fetchedProbData).reduce((acc, key) => {
      acc[key] = fetchedProbData[key] || "";
      return acc;
    }, {});

    setFormData({ probData: defaultFormData });
  }, [ProbFData, employeeData?.empID]);

  const handleInputChange = (e) => {
    if (!e.target) {
      console.error("Event target is undefined");
      return;
    }
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      probData: {
        ...prevState.probData,
        [name]: value,
      },
    }));
  };

  const subject = "Contract Form approved";
  const message = "Dear Hari employee Arjun contract period is expired...";
  const from = "hr_no-reply@adininworks.com";

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const PFDataRecord = ProbFData.find(
        (match) => match.empID === data.empID
      );

      // Common fields to extract from formData
      const probFields = [
        "adaptability",
        "additionalInfo",
        "attention",
        "attitude",
        "commitment",
        "communication",
        "deadline",
        "diligent",
        "extensionPeriod",
        "gmDate",
        "hrDate",
        "hrName",
        "initiative",
        "managerDate",
        "managerName",
        "gmName",
        "pace",
        "quality",
        "recommendation",
        "responsibility",
        "supervisorDate",
        "supervisorName",
        "teamwork",
        "extendProbED",
        "gmApproved",
        "managerApproved",
        "supervisorApproved",
        "communicationDetails",
        "qualityDetails",
        "paceDetails",
        "initiativeDetails",
        "attitudeDetails",
        "adaptabilityDetails",
        "teamworkDetails",
        "responsibilityDetails",
        "diligentDetails",
        "commitmentDetails",
        "probStatus",
      ];

      const formDataValues = probFields.reduce((acc, field) => {
        acc[field] = formData.probData[field];
        return acc;
      }, {});

      if (PFDataRecord) {
        // Update existing record
        const formattedData = {
          id: PFDataRecord.id,
          ...formDataValues,
          probStatus: true,
        };
        await UpdateProb({ PbFDataUp: formattedData });

        if (userType === "Manager") {
          if (emailData.skilledAndUnskilled === null) {
            sendEmail(subject, message, from, emailData.gmOfficialMail);
          } else {
            sendEmail(subject, message, from, emailData.hrOfficialmail);
          }
        } else if (userType === "GM") {
          sendEmail(subject, message, from, emailData.hrOfficialmail);
        }

        setShowTitle("Probation Form Updated successfully");
        console.log("Updated", formattedData);
      } else {
        // Create new record
        const ProbValue = { ...data, ...formDataValues, probStatus: true };
        await ProbFormsData({ ProbValue });

        if (userType === "Supervisor") {
          sendEmail(subject, message, from, emailData.managerOfficialMail);
        }

        console.log("create", ProbValue);
        setShowTitle("Probation Form Saved successfully");
      }
      setNotification(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // console.log(emailData);
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 bg-white shadow-md w-full px-20 mx-auto"
    >
      {/* Header */}
      <section className="flex items-center mb-16">
      <Link to="/reports" className="text-xl text-start w-[50px] text-grey">
          <FaArrowLeft />
        </Link>
        <div className=" w-full center pr-10">
          <img className=" max-w-[400px]" src={logo} alt="Logo not found" />
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
            name="deadline"
            {...register("deadline")}
            value={formData.probData.deadline}
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
                  defaultValue={employeeData?.dateOfJoin || ""}
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

      <ContractChoose
        register={register}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <ConfirmationForm
        register={register}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      {/* Save Button */}
      <div className="flex items-center justify-center mt-8">
        <button type="submit" className="primary_btn">
          Save
        </button>
      </div>
      {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/reports"
          />
        )}
    </form>
  );
});
