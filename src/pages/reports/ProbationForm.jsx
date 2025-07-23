import React, { useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ConfirmationForm } from "./ConfirmationForm";
import { ContractChoose } from "./ContractChoose";
import { Link, useLocation } from "react-router-dom";
import { SpinLogo } from "../../utils/SpinLogo";
import { ProbDownload } from "../../utils/ProbDownload";
import { useState } from "react";
import { ProbFormFun } from "../../services/createMethod/ProbFormFun";
import { UpdateProbForm } from "../../services/updateMethod/UpdateProbForm";
import { probationFormSchema } from "../../services/ReportValidation";
import { DataSupply } from "../../utils/DataStoredContext";
import { useContext } from "react";
import { sendEmail } from "../../services/EmailServices";
import { FaArrowLeft, FaSave, FaPrint, FaDownload } from "react-icons/fa";
import { useTempID } from "../../utils/TempIDContext";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo/logo-with-name.svg";

export const ProbationForm = ({ userID, userType }) => {
  const location = useLocation();
  const { gmPosition, supervisorCheck, PDInfo, HRMPosition } = useTempID();
  const { createNotification } = useCreateNotification();
  const { employeeData } = location.state || {};
  const probationEndDateStr = employeeData?.probationEndDate;
  const { ProbFormsData } = ProbFormFun();
  const { UpdateProb } = UpdateProbForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
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
      id: "",
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
      probExtendStatus: "Review",
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

  let probationMonthYear = "Invalid Date";

  if (probationEndDateStr) {
    const separator = probationEndDateStr.includes("/") ? "/" : "-";
    const [day, month, year] = probationEndDateStr.split(separator);

    const isoDateStr = `${year}-${month}-${day}`;
    const parsedDate = new Date(isoDateStr);

    if (!isNaN(parsedDate)) {
      probationMonthYear = parsedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else {
    }
  } else {
  }

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
          console.log("Manager Info not found.");
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
          console.log("Supervisor Info not found.");
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

  useEffect(() => {}, [emailData]);

  useEffect(() => {
    if (ProbFData.length === 0 || !employeeData?.empID) {
      return;
    }

    // Filter records with matching empID
    const matchedRecords = ProbFData.filter(
      (data) => data.empID === employeeData.empID
    );

    if (matchedRecords.length === 0) {
      return;
    }

    // Find record that matches both empID and probCreatedAt
    const targetRecord = matchedRecords.find(
      (record) => record.createdAt === employeeData.probCreatedAt
    );

    if (!targetRecord) {
      return;
    }

    const defaultFormData = Object.keys(targetRecord).reduce((acc, key) => {
      acc[key] = targetRecord[key] || "";
      return acc;
    }, {});

    setFormData({ probData: defaultFormData });
    setIsExtended(defaultFormData.probExtendStatus === "Extended");
  }, [ProbFData, employeeData?.empID, employeeData?.probCreatedAt]);

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

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsExtended(checked);
    setFormData((prevState) => ({
      ...prevState,
      probData: {
        ...prevState.probData,
        probExtendStatus: checked ? "Extended" : "Not Extended",
      },
    }));
  };

  const from = "hr_no-reply@adininworks.com";
  const gmSubject = "Probation Assessment Review";
  const hrSubject = "Probation Period Expiry Notification";

  const onSubmit = async (data) => {
    console.log("Data", data);
    setIsLoading(true);
    try {
      const probFields = [
        "id",
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
        "probExtendStatus",
        "prevProbExDate",
      ];

      const formDataValues = probFields.reduce((acc, field) => {
        acc[field] = formData.probData[field];
        return acc;
      }, {});

      const PFDataRecord = ProbFData.find(
        (match) => match.id === formDataValues.id
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

      const prevProbDate =
        Array.isArray(WorkInfoRecord.probationEnd) &&
        WorkInfoRecord.probationEnd.length > 0
          ? WorkInfoRecord.probationEnd[WorkInfoRecord.probationEnd.length - 1]
          : "Not mentioned";

      const subject = "Probation Assessment Review";

      const notifyMessageSup = `Your Employee Mr./Ms. ${
        empPIRecord?.name
      }'s probation period ending on ${
        probationEndFormatted || "Not Mentioned"
      } has been ${
        data?.supervisorApproved || PFDataRecord?.supervisorApproved
      } by Supervisor, ${PDInfo || "Not Mentioned"}.`;

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
          alert("Supervisor approval or rejection required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          HRMPosition !== "HR MANAGER" &&
          !formData.probData.managerName
        ) {
          alert("Manager name is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          HRMPosition !== "HR MANAGER" &&
          !formData.probData.managerApproved
        ) {
          alert("Manager approval or rejection is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          HRMPosition !== "HR MANAGER" &&
          !formData.probData.managerDate
        ) {
          alert("Manager date is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && formData.probData.managerApproved === null) {
          alert("Manager approval or rejection is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && !formData.probData.gmName) {
          alert("GM name is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && !formData.probData.gmApproved) {
          alert("GM approval or rejection is required!");
          setIsLoading(false);
          return;
        }

        if (gmPosition === GM && !formData.probData.gmDate) {
          alert("GM date is required!");
          setIsLoading(false);
          return;
        }

        if (HRMPosition === "HR MANAGER" && !formData.probData.gmApproved) {
          alert("GM approval or rejection is required!");
          setIsLoading(false);
          return;
        }

        if (HRMPosition === "HR MANAGER" && !formData.probData.hrName) {
          alert("HR name is required!");
          setIsLoading(false);
          return;
        }

        if (HRMPosition === "HR MANAGER" && !formData.probData.hrDate) {
          alert("HR date is required!");
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
        const ProbValue = {
          ...data,
          ...formDataValues,
          probStatus: true,
          prevProbExDate: prevProbDate,
          probExtendStatus: "In Probation",
        };

        if (
          userType === "Supervisor" &&
          !formData.probData.supervisorApproved &&
          !formData.probData.supervisorDate
        ) {
          alert("Supervisor approval or Rejection and date is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          HRMPosition !== "HR MANAGER" &&
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
          HRMPosition !== "HR MANAGER" &&
          !formData.probData.managerApproved
        ) {
          alert("Manager approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          HRMPosition !== "HR MANAGER" &&
          !formData.probData.managerDate
        ) {
          alert("Manager date is required!");
          setIsLoading(false);
          return;
        }

        await ProbFormsData({ ProbValue });
        // console.log("CR", ProbValue);

        setIsLoading(false);

        setTimeout(() => {
          setNotification(true);
          setShowTitle("Probation form created successfully");
        }, 1000);

        sendEmails(
          data,
          empPIRecord,
          probationEndFormatted,
          subject,
          notifyMessageSup,
          notifyMessageManager,
          notifyMessageGM
        );
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
            } by Supervisor, ${PDInfo || "Not Mentioned"}.</p>
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
                  } by the Manager, ${PDInfo || "Not Mentioned"}.</p>
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
              } by the Manager, ${PDInfo || "Not Mentioned"}.</p>
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
            } by the General Manager, ${PDInfo || "Not Mentioned"}.</p>
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

  const probationFormRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => probationFormRef.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
  });

  const handleDownloadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloading(true);

    const editButton = document.getElementById("left-button");
    const downloadButton = document.getElementById("download-button");
    const printButton = document.getElementById("print-button");
    const saveButton = document.getElementById("save-button");

    if (editButton) editButton.style.visibility = "hidden";
    if (downloadButton) downloadButton.style.visibility = "hidden";
    if (printButton) printButton.style.visibility = "hidden";
    if (saveButton) saveButton.style.visibility = "hidden";

    ProbDownload("capture-section");

    setTimeout(() => {
      if (editButton) editButton.style.visibility = "visible";
      if (downloadButton) downloadButton.style.visibility = "visible";
      if (printButton) printButton.style.visibility = "visible";
      if (saveButton) saveButton.style.visibility = "visible";
      setIsDownloading(false);
    }, 500);
  };

  function formatDateIfNeeded(dateStr) {
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      return dateStr.replace(/\//g, "-");
    }
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  }

  return (
    <>
      <div id="capture-section" ref={probationFormRef}>
        <style>
          <style>
            {`
      @media print {
        @page {
          // size: A4 portrait;
          margin: 0.2cm;
        }
        
        body {
          zoom: 85%;
        }
        
        #capture-section {
          page-break-inside: avoid;
        }
        
        form {
          padding: 10px !important;
        }
        
        .mb-10, .my-10, .mt-5 {
          margin: 0.5rem !important;
        }
        
        table {
          font-size: 12px;
          page-break-inside: avoid;
        }
        
        .no-print, .no-print-parent {
          display: none !important;
        }
        
        /* Reduce logo size for printing */
        img {
          max-width: 300px !important;
        }
        
        /* Compact form sections */
        .text-lg {
          font-size: 16px;
        }
      }
    `}
          </style>
        </style>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-10 bg-white shadow-md w-full px-20 mx-auto"
        >
          {/* Header */}
          <section className="flex items-center mb-6">
            <Link
              to="/reports"
              id="left-button"
              className="no-print left-button text-xl text-start w-[50px] text-grey"
            >
              <FaArrowLeft />
            </Link>
            <div className=" w-full center pr-10">
              <img className=" max-w-[400px]" src={logo} alt="Logo not found" />
            </div>
          </section>

          <div className="text-center text-lg font-bold uppercase w-full">
            {`Probation Completion Form for the Month of ${probationMonthYear}`}
          </div>

          <div className="mb-10 mt-6">
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
            <table className="w-full border border-black table-fixed">
              <tbody>
                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Employee Name
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.name || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Employee ID
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.empID || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Badge Number
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.empBadgeNo || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Department
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.department || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Position
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.position || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Date Joined
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.dateOfJoin
                      ? employeeData?.dateOfJoin
                      : employeeData?.doj || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Probation End Date
                  </td>
                  <td className="p-2 border-b w-1/2">
                    {employeeData?.prevProbExDate
                      ? formatDateIfNeeded(employeeData?.prevProbExDate)
                      : employeeData?.probationEndDate || "-"}
                  </td>
                </tr>

                <tr className="border">
                  <td className="p-2 border-r border-b font-semibold w-1/2">
                    Extended Probation End Date
                  </td>
                  <td className="p-2 border-b w-1/2">
                    <input
                      type="date"
                      name="extendDate"
                      {...register("extendDate")}
                      value={formData.probData.extendDate}
                      onChange={handleInputChange}
                      className="w-full px-1"
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
            HRMPosition={HRMPosition}
            probData={ProbFData}
            handleCheckboxChange={handleCheckboxChange}
            isExtended={isExtended}
          />

          {userType !== "SuperAdmin" && (
            <div className="flex justify-center gap-4 py-8 no-print-parent text-center">
              {isDownloading ? (
                // Show Downloading text
                <p className="text-lg font-semibold">Downloading...</p>
              ) : (
                <>
                  {/* Save Button */}
                  <button
                    id="save-button"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                    className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2 flex items-center justify-center gap-2 min-w-[160px] h-[40px] no-print"
                  >
                    {isLoading ? (
                      <>
                        <span>Submitting</span>
                        <span className="ml-1 animate-spin border-2 border-t-2 border-t-white border-gray-300 rounded-full w-4 h-4"></span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <FaSave className="ml-2 mt-1" />
                      </>
                    )}
                  </button>

                  <>
                    {/* Download Button */}
                    <button
                      id="download-button"
                      onClick={(e) => handleDownloadClick(e)}
                      className="border-yellow border-2 text-dark_grey text_size_3 rounded-md px-4 py-2 flex items-center justify-center gap-2 min-w-[160px] h-[40px] no-print"
                    >
                      <span>Download</span>
                      <FaDownload className="ml-2 mt-1" />
                    </button>

                    {/* Print Button */}
                    <button
                      id="print-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePrint();
                      }}
                      className="border-yellow border-2 text-dark_grey text_size_3 rounded-md px-4 py-2 flex items-center justify-center gap-2 min-w-[160px] h-[40px] no-print"
                    >
                      <span>Print</span>
                      <FaPrint className="ml-2 mt-1" />
                    </button>
                  </>
                </>
              )}
            </div>
          )}
          {notification && (
            <SpinLogo
              text={showTitle}
              notification={notification}
              path="/reports"
            />
          )}
        </form>
      </div>
    </>
  );
};
