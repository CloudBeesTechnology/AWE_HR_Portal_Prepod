import React, { forwardRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import { useTempID } from "../../utils/TempIDContext";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";

export const ProbationForm = ({ userID, userType }) => {
  const location = useLocation();
  const { gmPosition, supervisorCheck } = useTempID();
  const { createNotification } = useCreateNotification();
  const { employeeData } = location.state || {};
  const probationEndDateStr = employeeData?.probationEndDate;
  // console.log(probationEndDateStr);
  const { ProbFormsData } = ProbFormFun();
  const { UpdateProb } = UpdateProbForm();
  const [isLoading, setIsLoading] = useState(false);
  const { empPIData, workInfoData, ProbFData } = useContext(DataSupply);

  const [emailData, setEmailData] = useState({
    supervisorEmpID: "",
    supervisorName: "",
    managerEmpID: "",
    supervisorOfficialMail: "",
    managerOfficialMail: "",
    managerName: "",
    hrOfficialmail: "",
    gmOfficialMail: "",
    gmName: "",
    skilledAndUnskilled: null,
  });

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
      hrName: null,
      initiative: "",
      managerDate: "",
      managerName: "",
      gmName: null,
      pace: "",
      quality: "",
      recommendation: "",
      responsibility: "",
      supervisorDate: "",
      supervisorName: "",
      teamwork: "",
      extendProbED: "",
      gmApproved: "",
      managerApproved: null,
      supervisorApproved: null,
      communicationDetails: "",
      qualityDetails: "",
      paceDetails: "",
      initiativeDetails: "",
      attitudeDetails: "",
      adaptabilityDetails: "",
      teamworkDetails: "",
      responsibilityDetails: "",
      diligentDetails: "",
      createdAt: "",
      commitmentDetails: "",
      extendDate: "",
    },
  });
  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const GM = "GENERAL MANAGER";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(probationFormSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentDate = new Date();
  // Parse "DD-MM-YYYY" into a proper Date object
  let probationMonthYear = "Invalid Date";

  if (probationEndDateStr) {
    const [day, month, year] = probationEndDateStr.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`); // Format to YYYY-MM-DD

    if (!isNaN(parsedDate)) {
      probationMonthYear = parsedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
  }

  const [personalInfo, setPersonalInfo] = useState(null);
  const { personalInfo: fetchedPersonalInfo } = useEmployeePersonalInfo(userID);

  useEffect(() => {
    if (fetchedPersonalInfo) {
      setPersonalInfo(fetchedPersonalInfo);

      // console.log("Personal Info updated:", fetchedPersonalInfo);
    }
  }, [fetchedPersonalInfo]);

  useEffect(() => {
    if (!workInfoData.length || !empPIData.length || !employeeData?.empID) {
      return;
    }

    const workInfo = workInfoData.find(
      (data) => data.empID === employeeData.empID
    );

    if (workInfo) {
      const supervisorEmpID =
        workInfo.supervisor[workInfo.supervisor.length - 1];
      const managerEmpID = workInfo.manager[workInfo.manager.length - 1];
      const hrOfficialmail = workInfo.hr[workInfo.hr.length - 1];

      setEmailData((prevData) => ({
        ...prevData,
        supervisorEmpID,
        managerEmpID,
        hrOfficialmail,
      }));

      if (managerEmpID) {
        const managerInfo = empPIData.find(
          (data) => data.empID === String(managerEmpID)
        );

        if (managerInfo) {
          setEmailData((prevData) => ({
            ...prevData,
            managerOfficialMail: managerInfo.officialEmail,
            managerName: managerInfo.name,
          }));
        } else {
          // console.log("Manager Info not found.");
        }
      }

      if (supervisorEmpID) {
        const supervisorInfo = empPIData.find(
          (data) => data.empID === String(supervisorEmpID)
        );

        if (supervisorInfo) {
          setEmailData((prevData) => ({
            ...prevData,
            supervisorOfficialMail: supervisorInfo.officialEmail,
            supervisorName: supervisorInfo.name,
          }));
        } else {
          // console.log("Supervisor Info not found.");
        }
      }

      if (workInfo.skillPool) {
        if (
          workInfo.skillPool.includes("SKILLED") ||
          workInfo.skillPool.includes("UNSKILLED")
        ) {
          setEmailData((prevData) => ({
            ...prevData,
            skilledAndUnskilled: workInfo.skillPool,
          }));
        }
      }

      const generalManagerPositions = workInfoData?.filter((item) =>
        item?.position?.[item?.position?.length - 1]?.includes(
          "GENERAL MANAGER"
        )
      );

      if (generalManagerPositions?.length > 0) {
        const gmEmails = [];
        const gmName = [];

        generalManagerPositions?.forEach((gmPosition) => {
          const gmInfo = empPIData.find(
            (data) => data.empID === String(gmPosition.empID)
          );
          if (gmInfo) {
            gmEmails.push(gmInfo.officialEmail);
            gmName.push(gmInfo.name);
            setEmailData((prevData) => ({
              ...prevData,
              gmOfficialMail: gmEmails,
              gmName: gmName,
            }));
          } else {
            console.log("GM Info not found.");
          }
        });
      } else {
        console.log("No General Manager positions found.");
      }
    } else {
      console.log("No work info found for employee ID:", employeeData?.empID);
    }
  }, [workInfoData, employeeData?.empID, empPIData]);

  useEffect(() => {
    // console.log("Email Data has changed:", emailData);
  }, [emailData]);

  // auto fetch
  useEffect(() => {
    if (ProbFData.length === 0 || !employeeData?.empID) {
      return;
    }

    const fetchedProbData = ProbFData.find(
      (data) => data.empID === employeeData.empID
    );

    if (!fetchedProbData) {
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

  const from = "hr_no-reply@adininworks.com";
  const gmSubject = "Probation Assessment Review";
  const hrSubject = "Probation Period Expiry Notification";
  // const to = "hariharanofficial2812@gmail.com"

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const PFDataRecord = ProbFData.find(
        (match) => match.empID === data.empID
      );
      const empPIRecord = empPIData.find((match) => match.empID === data.empID);
      const WorkInfoRecord = workInfoData.find(
        (match) => match.empID === data.empID
      );
      const probationEndFormatted =
        Array.isArray(WorkInfoRecord.probationEnd) &&
        WorkInfoRecord.probationEnd.length > 0
          ? WorkInfoRecord.probationEnd[WorkInfoRecord.probationEnd.length - 1]
              .split("-")
              .reverse()
              .join("/")
          : "Not mentioned";

      const subject = "Probation Assessment Review";

      const notifyMessageSup = `Your Employee Mr./Ms. ${
        empPIRecord?.name
      }'s probation period ending on ${
        probationEndFormatted || "Not Mentioned"
      } has been ${
        data?.supervisorApproved || PFDataRecord?.supervisorApproved
      } by Supervisor, ${emailData?.supervisorName || "Not Mentioned"}.`;

      const notifyMessageManager = `Your Employee Mr./Ms. ${
        empPIRecord?.name
      }'s probation period ending on ${probationEndFormatted || "Not Mentioned"}
      has been reviewed and ${
        data?.managerApproved || PFDataRecord?.managerApproved
      } by the Manager, ${emailData?.managerName || "Not Mentioned"}.`;

      const notifyMessageGM = `Your Employee Mr./Ms. ${
        empPIRecord?.name
      }'s probation period ending on ${probationEndFormatted || "Not Mentioned"}
      has been reviewed and ${
        data?.gmApproved || PFDataRecord?.gmApproved
      } by the General Manager, ${emailData?.managerName || "Not Mentioned"}.`;

      const probFields = [
        "adaptability",
        "additionalInfo",
        "attention",
        "attitude",
        "commitment",
        "communication",
        "deadline",
        "extendDate",
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
        "createdAt",
      ];

      const formDataValues = probFields.reduce((acc, field) => {
        acc[field] = formData.probData[field];
        return acc;
      }, {});

      if (PFDataRecord) {
        const formattedData = {
          id: PFDataRecord.id,
          ...formDataValues,
          probStatus: true,
        };

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          formData.probData.supervisorApproved === null &&
          supervisorCheck === true
        ) {
          alert("Supervisor Approval required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          formData.probData.managerApproved === null
        ) {
          alert("Manager Approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          formData.probData.managerDate === null
        ) {
          alert("Manager date is is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && formData.probData.managerApproved === null) {
          alert("Manager Approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && formData.probData.gmApproved === null) {
          alert("GM Approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && formData.probData.gmDate === null) {
          alert("GM date is is required!");
          setIsLoading(false);
          return;
        }

        if (userType === "HR" && formData.probData.gmApproved === null) {
          alert("GM Approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (userType === "HR" && formData.probData.hrName === null) {
          alert("HR name is required!");
          setIsLoading(false);
          return;
        }

        if (userType === "HR" && formData.probData.hrDate === null) {
          alert("HR date is is required!");
          setIsLoading(false);
          return;
        }

        await UpdateProb({ PbFDataUp: formattedData });
        // console.log("update", formattedData);

        setIsLoading(false);

        setTimeout(() => {
          setNotification(true);
          setShowTitle("Probation form updated successfully");
        }, 1000);

        sendEmails(
          data,
          empPIRecord,
          probationEndFormatted,
          PFDataRecord,
          subject,
          notifyMessageSup,
          notifyMessageManager,
          notifyMessageGM
        );
      } else {
        const ProbValue = { ...data, ...formDataValues, probStatus: true };

        if (
          userType === "Supervisor" &&
          !formData.probData.supervisorApproved &&
          !formData.probData.supervisorDate
        ) {
          alert("Supervisor approval or Rejection and date is is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          formData.probData.supervisorApproved === null &&
          supervisorCheck === true
        ) {
          console.log("Supervisor approval block triggered");
          alert("Supervisor Approval required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          !formData.probData.managerApproved
        ) {
          alert("Manager approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          !formData.probData.managerDate
        ) {
          alert("Manager date is is required!");
          setIsLoading(false);
          return;
        }

        await ProbFormsData({ ProbValue });

        setIsLoading(false);

        setTimeout(() => {
          setNotification(true);
          setShowTitle("Probation form created successfully");
        }, 1000);

        // console.log("create");
        sendEmails(
          data,
          empPIRecord,
          probationEndFormatted,
          subject,
          notifyMessageSup,
          notifyMessageManager,
          notifyMessageGM
        );

        // console.log("Created", ProbValue);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error submitting form:", err);
    }
  };

  const sendEmails = async (
    data,
    empPIRecord,
    probationEndFormatted,
    PFDataRecord,
    subject,
    notifyMessageSup,
    notifyMessageManager,
    notifyMessageGM
  ) => {
    try {
      if (userType === "Supervisor") {
        // Sending email to supervisor
        await sendEmail(
          "Probation Assessment Review",
          `<html>
          <body>
            <p>Your Employee Mr./Ms. ${
              empPIRecord?.name
            }'s probation period ending on ${
            probationEndFormatted || "Not Mentioned"
          }</p>
            <p>has been ${
              data?.supervisorApproved || PFDataRecord.supervisorApproved
            } by Supervisor, ${
            emailData?.supervisorName || "Not Mentioned"
          }.</p>
            <p>Click here https://hr.adininworks.co to view the assessment form.</p>
          </body>
        </html>`,
          from,
          emailData.managerOfficialMail
        );

        await createNotification({
          empID: employeeData.empID,
          leaveType: subject,
          message: notifyMessageSup,
          senderEmail: "hr_no-reply@adininworks.com",
          receipentEmail: emailData.managerOfficialMail,
        });

        // If the email is sent successfully, the log will be visible, and you can trigger the alert here.
        // alert(`Email sent successfully to Manager's mail: ${emailData.managerOfficialMail}\n\nEmail Content:\nYour Employee Mr./Ms. ${empPIRecord?.name}'s probation period ending on ${probationEndFormatted || "Not Mentioned"}\n\nhas been ${data?.supervisorApproved || PFDataRecord.supervisorApproved} by Supervisor, ${emailData?.supervisorName || "Not Mentioned"}.`);
      }

      if (userType === "Manager" && gmPosition !== GM) {
        // Sending email to GM if applicable
        if (emailData.skilledAndUnskilled === null) {
          if (Array.isArray(emailData.gmOfficialMail)) {
            for (let email of emailData.gmOfficialMail) {
              await sendEmail(
                gmSubject,
                `<html>
                <body>
                  <p>Your Employee Mr./Ms. ${
                    empPIRecord?.name
                  }'s probation period ending on ${
                  probationEndFormatted || "Not Mentioned"
                }</p>
                  <p>has been reviewed and ${
                    data?.managerApproved || PFDataRecord.managerApproved
                  } by the Manager, ${
                  emailData?.managerName || "Not Mentioned"
                }.</p>
                  <p>Click here https://hr.adininworks.co to view the assessment form.</p>
                </body>
              </html>`,
                from,
                email
              );
            }
          }
          if (Array.isArray(emailData.gmOfficialMail)) {
            for (let email of emailData.gmOfficialMail) {
              await createNotification({
                empID: employeeData.empID,
                leaveType: subject,
                message: notifyMessageGM,
                senderEmail: "hr_no-reply@adininworks.com",
                receipentEmail: email,
              });
            }
          }

          // alert(`Email sent successfully to GM's mail: ${emailData.gmOfficialMail}\n\nEmail Content:\nYour Employee Mr./Ms. ${empPIRecord?.name}'s probation period ending on ${probationEndFormatted || "Not Mentioned"}\n\nhas been reviewed and ${data?.managerApproved || PFDataRecord.managerApproved} by the Manager, ${emailData?.managerName || "Not Mentioned"}.`);
        } else {
          await sendEmail(
            hrSubject,
            `<html>
            <body>
              <p>Your Employee Mr./Ms. ${
                empPIRecord?.name || "Not mentioned"
              }'s probation period ending on ${
              probationEndFormatted || "Not Mentioned"
            }</p>
              <p>has been reviewed and ${
                data?.managerApproved || PFDataRecord.managerApproved
              } by the Manager, ${
              emailData?.managerName || "Not Mentioned"
            }.</p>
              <p>Please proceed with the necessary actions.</p>
              <p>Click here https://hr.adininworks.co to view the updates.</p>
            </body>
          </html>`,
            from,
            emailData.hrOfficialmail
          );

          await createNotification({
            empID: employeeData.empID,
            leaveType: subject,
            message: notifyMessageManager,
            senderEmail: "hr_no-reply@adininworks.com",
            receipentEmail: emailData.hrOfficialmail,
          });

          // alert(`Email sent successfully to HR's mail: ${emailData.hrOfficialmail}\n\nEmail Content:\nYour Employee Mr./Ms. ${empPIRecord?.name || "Not mentioned"}'s probation period ending on ${probationEndFormatted || "Not Mentioned"}\n\nhas been reviewed and ${data?.managerApproved || PFDataRecord.managerApproved} by the Manager, ${emailData?.managerName || "Not Mentioned"}.\n\nPlease proceed with the necessary actions.`);
        }
      } else if (gmPosition === GM) {
        // Sending email to HR if GM position is set
        await sendEmail(
          hrSubject,
          `<html>
          <body>
            <p>Your Employee Mr./Ms. ${
              empPIRecord?.name || "Not mentioned"
            }'s probation period ending on ${
            probationEndFormatted || "Not Mentioned"
          }</p>
            <p>has been reviewed and ${
              data?.gmApproved || PFDataRecord.gmApproved
            } by the General Manager, ${
            personalInfo?.name || "Not Mentioned"
          }.</p>
            <p>Please proceed with the necessary actions.</p>
            <p>Click here https://hr.adininworks.co to view the updates.</p>
          </body>
        </html>`,
          from,
          emailData.hrOfficialmail
        );

        await createNotification({
          empID: employeeData.empID,
          leaveType: subject,
          message: notifyMessageManager,
          senderEmail: "hr_no-reply@adininworks.com",
          receipentEmail: emailData.hrOfficialmail,
        });

        // alert(`Email sent successfully to HR's mail: ${emailData.hrOfficialmail}\n\nEmail Content:\nYour Employee Mr./Ms. ${empPIRecord?.name || "Not mentioned"}'s probation period ending on ${probationEndFormatted || "Not Mentioned"}\n\nhas been reviewed and ${data?.gmApproved  || PFDataRecord.gmApproved} by the Manager, ${emailData?.managerName || "Not Mentioned"}.\n\nPlease proceed with the necessary actions.`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

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

      <div className="text-center text-lg font-bold uppercase w-full my-10">
        {`Probation Completion Form for the Month of ${probationMonthYear}`}
      </div>

      <div className="mb-10 mt-5">
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
          Deadline submit to Human Resources Department by:{" "}
          <input
            type="text"
            name="deadline"
            {...register("deadline")}
            value={formData.probData.deadline || employeeData?.deadline}
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
                  defaultValue={employeeData?.name}
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
                  defaultValue={employeeData?.empID}
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
                  defaultValue={employeeData?.empBadgeNo}
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
                  defaultValue={employeeData?.department}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Position</td>
              <td className="p-2 border-b">
                <input
                  {...register("position")}
                  defaultValue={employeeData?.position}
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
                  defaultValue={employeeData?.dateOfJoin}
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
                  defaultValue={employeeData?.probationEndDate}
                  className="w-full outline-none"
                />
              </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">
                Extended Probation End Date
              </td>
              <td className="p-2 border-b">
                <input
                  type="date"
                  name="extendDate"
                  {...register("extendDate")}
                  value={formData.probData.extendDate}
                  onChange={handleInputChange}
                  className=" px-1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ContractChoose
        register={register}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <ConfirmationForm
        employeeData={employeeData}
        workInfoData={workInfoData}
        register={register}
        formData={formData}
        handleInputChange={handleInputChange}
        skillPool={emailData.skilledAndUnskilled}
        errors={errors}
        userType={userType}
        gmPosition={gmPosition}
      />

      {/* Save Button */}
      <div className="flex items-center justify-center mt-8">
        {userType !== "SuperAdmin" && (
          <button disabled={isLoading} type="submit" className="primary_btn">
            {isLoading ? "Loading..." : "Save"}{" "}
            {/* Show loading text when isLoading is true */}
          </button>
        )}
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
};
