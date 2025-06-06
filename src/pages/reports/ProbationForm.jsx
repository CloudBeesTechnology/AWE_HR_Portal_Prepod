import React, { useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo/logo-with-name.svg";
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
import useEmployeePersonalInfo from "../../hooks/useEmployeePersonalInfo";

export const ProbationForm = ({ userID, userType }) => {
  const location = useLocation();
  const { gmPosition, supervisorCheck, PDInfo } = useTempID();
  const { createNotification } = useCreateNotification();
  const { employeeData } = location.state || {};
  const probationEndDateStr = employeeData?.probationEndDate;
  const { ProbFormsData } = ProbFormFun();
  const { UpdateProb } = UpdateProbForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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

  // console.log(ProbFData);
  // console.log("Date",gmPosition);

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
    setValue,
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
        // console.log("Work info",workInfo)
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

      // console.log("Filtered GENERAL MANAGER Positions:", generalManagerPositions);

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
            // console.log("Updated Email Data with GM Email:", gmInfo.officialEmail);
          } else {
            // console.log("GM Info not found.");
          }
        });
      } else {
        // console.log("No General Manager positions found.");
      }
    } else {
      // console.log("No work info found for employee ID:", employeeData?.empID);
    }
  }, [workInfoData, employeeData?.empID, empPIData]);

  useEffect(() => {
    // console.log("Email Data has changed:", emailData);
  }, [emailData]);

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
        // console.log(err);
      }
    };
    fetchData();
  }, [empPIData, workInfoData, ProbFData]);

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
        // console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [empPIData, workInfoData, ProbFData]);

  // auto fetch
  useEffect(() => {
    if (ProbFData.length === 0 || !employeeData?.empID) {
      // console.log(
      //   ProbFData.length === 0 ? "No data in ProbFData" : "No employee ID found"
      // );
      return;
    }

    const fetchedProbData = ProbFData.find(
      (data) => data.empID === employeeData.empID
    );

    if (!fetchedProbData) {
      // console.log("No matching contract data found");
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

  // console.log("EmailData", emailData);

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
          HRMPosition !== "HR MANAGER" &&
          formData.probData.managerApproved === null
        ) {
          alert("Manager Approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (
          userType === "Manager" &&
          gmPosition !== GM &&
          HRMPosition !== "HR MANAGER" &&
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

        if (
          HRMPosition === "HR MANAGER" &&
          formData.probData.gmApproved === null
        ) {
          alert("GM Approval or Rejection is required!");
          setIsLoading(false);
          return;
        }

        if (HRMPosition === "HR MANAGER" && formData.probData.hrName === null) {
          alert("HR name is required!");
          setIsLoading(false);
          return;
        }

        if (HRMPosition === "HR MANAGER" && formData.probData.hrDate === null) {
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

        // console.log("update", formattedData);

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
          alert("Manager date is is required!");
          setIsLoading(false);
          return;
        }

        await ProbFormsData({ ProbValue });
        // console.log("CR");

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

  // console.log("EmailData", emailData)

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
        // console.log("GM block");

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
        // console.log("HR Block");

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
    // Hide buttons before download
    const editButton = document.getElementById("left-button");
    const downloadButton = document.getElementById("download-button");
    const printButton = document.getElementById("print-button");
    const saveButton = document.getElementById("save-button");

    if (editButton) editButton.style.visibility = "hidden";
    if (downloadButton) downloadButton.style.visibility = "hidden";
    if (printButton) printButton.style.visibility = "hidden";
    if (saveButton) saveButton.style.visibility = "hidden";

    // Wait for the PDF to be generated, then restore the buttons.
    ProbDownload("capture-section");

    setTimeout(() => {
      if (editButton) editButton.style.visibility = "visible";
      if (downloadButton) downloadButton.style.visibility = "visible";
      if (printButton) printButton.style.visibility = "visible";
      if (saveButton) saveButton.style.visibility = "visible";
      setIsDownloading(false);
    }, 500);
  };

  return (
    <>
      <div id="capture-section" ref={probationFormRef}>
        <style>
          <style>
            {`
      @media print {
        @page {
          size: A4 portrait;
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
                // {...register("deadline")}
                // value={formData.probData.deadline}
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
                  <td className="p-2 border-r border-b font-semibold">
                    Position
                  </td>
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
          {/* <div className="flex items-center justify-center mt-8">
        {userType !== "SuperAdmin" && (
          <button disabled={isLoading} type="submit" className="primary_btn">
            {isLoading ? "Loading..." : "Save"}{" "}
        
          </button>
        )}
      </div> */}
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

                  {/* Print & Download only if genManager is not set */}

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
