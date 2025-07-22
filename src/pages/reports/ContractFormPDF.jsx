import React, { useState, useEffect, useContext, useRef } from "react";
import "jspdf-autotable"; // Ensure this is imported
import { useLocation, Link } from "react-router-dom";
import { downloadPDF } from "../../utils/DownloadPDF";
import { ContractForm } from "../../services/createMethod/CreateContract";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateContractData } from "../../services/updateMethod/UpdateContractForm";
import { sendEmail } from "../../services/EmailServices";
import { FaArrowLeft, FaSave, FaPrint, FaDownload } from "react-icons/fa";
import { SpinLogo } from "../../utils/SpinLogo";
import { useTempID } from "../../utils/TempIDContext";
import { useCreateNotification } from "../../hooks/useCreateNotification";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/logo/logo-with-name.svg";

export const ContractFormPDF = ({ contentRef }) => {
  const { contractForm } = ContractForm();
  const { gmPosition, PDInfo, HRMPosition } = useTempID();
  const { contractDetails } = UpdateContractData();
  const { contractForms, workInfoData, empPIData } = useContext(DataSupply);
  const location = useLocation();
  const { employeeData,matchedID } = location.state || {};
  const { createNotification } = useCreateNotification();
  const [userType, setUserType] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
    const [isExtended, setIsExtended] = useState(false);

  const contractEndDateStr = employeeData?.contractEndDate;

  const [managerData, setManagerData] = useState({
    managerEmpID: "",
    managerOfficialMail: "",
    managerName: "",
    hrEmail: "Hr-notification@adininworks.com",
    genManagerEmail: [],
  });

  const [formData, setFormData] = useState({
    contract: {
      empID: "",
      conAttn: "",
      depHead: "",
      hrManager: "",
      genManager: "",
      remarks: "",
      remarkHr: "",
      hrmDate: "",
      managerDate: "",
      remarkGm: "",
      extendedStatus: "noExtended", // Default value
      gmDate: "",
      renewalContract: "",
      status: "",
      createdAt: "",
      hrSign: "",
      hrDate: ""
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      contract: {
        ...prevState.contract,
        [name]: value,
      },
    }));
  };
 const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsExtended(checked);
    setFormData((prevState) => ({
      ...prevState,
      contract: {
        ...prevState.contract,
        extendedStatus: checked ? "extended" : "noExtended",
      },
    }));
  };
  useEffect(() => {
    // const userID = localStorage.getItem("userID");
    // setUserID(userID);
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  useEffect(() => {
    // Step 1: Extract managerEmpID from workInfoData based on employeeData.empID
    if (workInfoData.length > 0 && employeeData?.empID) {
      const workInfo = workInfoData.find(
        (data) => data.empID === employeeData.empID
      );
      if (workInfo) {
        const managerEmpID = workInfo.manager;
        setManagerData((prevData) => ({
          ...prevData,
          managerEmpID: managerEmpID,
        }));

        // Step 2: If managerEmpID is set, fetch manager's official email from empPIData
        if (managerEmpID && managerEmpID.length > 0) {
          const managerInfo = empPIData.find(
            (data) => data.empID === String(managerEmpID[0])
          );
          if (managerInfo) {
            setManagerData((prevData) => ({
              ...prevData,
              managerOfficialMail: managerInfo.officialEmail,
              managerName: managerInfo.name,
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

          generalManagerPositions?.forEach((gmPosition) => {
            const gmInfo = empPIData.find(
              (data) => data.empID === String(gmPosition.empID)
            );

            if (gmInfo) {
              gmEmails.push(gmInfo.officialEmail);
              setManagerData((prevData) => ({
                ...prevData,
                genManagerEmail: gmEmails,
              }));
              // console.log("Updated Email Data with GM Email:", gmInfo.officialEmail);
            } else {
              console.log("GM Info not found.");
            }
          });

          // console.log("GM Info:", gmInfo);
        } else {
          console.log("No GENERAL MANAGER positions found.");
        }
      }
    }
  }, [workInfoData, employeeData?.empID, empPIData]);

  // console.log(managerData);

   useEffect(() => {
    if (contractForms.length > 0) {
      const contractValue = contractForms.filter((val) => val.id === matchedID);
      const contractData = contractValue.find(
        (data) => data.empID === employeeData?.empID
      );
      if (contractData) {
        setFormData({
          contract: {
            conAttn: contractData.conAttn,
            depHead: contractData.depHead,
            hrManager: contractData.hrManager,
            genManager: contractData.genManager,
            remarks: contractData.remarks,
            managerDate: contractData.managerDate,
            remarkHr: contractData.remarkHr,
            hrmDate: contractData.hrmDate,
            remarkGm: contractData.remarkGm,
            gmDate: contractData.gmDate,
            hrDate: contractData.hrDate,
            hrSign: contractData.hrSign,
            extendedStatus: contractData.extendedStatus || "noExtended",
            createdAt: contractData.createdAt,
            renewalContract: contractData.renewalContract,
          },
        });
        setIsExtended(contractData.extendedStatus === "extended");
      }
    }
  }, [contractForms, employeeData?.empID]);


  const sendHRNotification = async (
    empName,
    contractEndFormatted,
    managerData
  ) => {
    const subject = "Contract Verification by HR";
    const notifyMessageHR = `Your Employee Mr./Ms. ${
      empName || "Not mentioned"
    }'s contract period ending on ${
      contractEndFormatted || "Not Mentioned"
    }, has been verified by HR.`;

    if (Array.isArray(managerData?.genManagerEmail)) {
      for (let email of managerData.genManagerEmail) {
        const result = await sendEmail(
          subject,
          `<html>
          <body>
            <p>Your Employee Mr./Ms. ${
              empName || "Not mentioned"
            }'s contract period ending on ${
            contractEndFormatted || "Not Mentioned"
          },
              <br/>
              has been verified by HR.
            </p>
            <p>Click here <a href="https://hr.adininworks.co">to view the updates.</a></p>
          </body>
        </html>`,
          "hr_no-reply@adininworks.com",
          email
        );

        await createNotification({
          empID: employeeData?.empID,
          leaveType: subject,
          message: notifyMessageHR,
          senderEmail: "hr_no-reply@adininworks.com",
          receipentEmail: email,
        });
        return result;
      }
    }
  };

  const sendManagerNotification = async (
    empName,
    contractEndFormatted,
    PDInfo,
    managerData
  ) => {
    const subject = "Contract Review by Manager";
    const notifyMessageManager = `Your Employee Mr./Ms. ${
      empName || "Not mentioned"
    }'s contract period ending on ${
      contractEndFormatted || "Not Mentioned"
    }, has been reviewed by Manager, ${PDInfo || "Not Mentioned"}.`;

    const result = await sendEmail(
      subject,
      `<html>
      <body>
        <p>Your Employee Mr./Ms. ${
          empName || "Not mentioned"
        }'s contract period ending on ${
        contractEndFormatted || "Not Mentioned"
      },
          <br/>
          has been reviewed by Manager, ${PDInfo || "Not Mentioned"}.
        </p>
        <p>Click here <a href="https://hr.adininworks.co">to view the updates.</a></p>
      </body>
    </html>`,
      "hr_no-reply@adininworks.com",
      managerData?.hrEmail
    );

    await createNotification({
      empID: employeeData?.empID,
      leaveType: subject,
      message: notifyMessageManager,
      senderEmail: "hr_no-reply@adininworks.com",
      receipentEmail: managerData?.hrEmail,
    });

    return result;
  };

  const sendGMNotification = async (
    empName,
    contractEndFormatted,
    managerData
  ) => {
    const subject = "Contract Confirmation by General Manager";
    const notifyMessageGM = `Your Employee Mr./Ms. ${
      empName || "Not mentioned"
    }'s contract period ending on ${
      contractEndFormatted || "Not Mentioned"
    }, has been confirmed by the GENERAL MANAGER.`;

    const result = await sendEmail(
      subject,
      `<html>
      <body>
        <p>Your Employee Mr./Ms. ${
          empName || "Not mentioned"
        }'s contract period ending on ${
        contractEndFormatted || "Not Mentioned"
      },
          <br/>
          has been confirmed by the GENERAL MANAGER,
        </p>
        <p>Please proceed with the necessary actions.</p>
        <p>Click here <a href="https://hr.adininworks.co">to view the updates.</a></p>
      </body>
    </html>`,
      "hr_no-reply@adininworks.com",
      managerData.hrEmail
    );

    await createNotification({
      empID: employeeData?.empID,
      leaveType: subject,
      message: notifyMessageGM,
      senderEmail: "hr_no-reply@adininworks.com",
      receipentEmail: managerData?.hrEmail,
    });

    return result;
  };

  // console.log("Name", PDInfo);

  // Main submission handler
  const handleSubmit = async () => {
    // console.log(contractEndDateStr,"aaaaaaaaaaaaaaaaaaaa");

    let HRResult = null;
    let managerResult = null;
    let GMResult = null;

    try {
      if (
        HRMPosition === "HR MANAGER" &&
        (!formData.contract.hrManager || !formData.contract.hrmDate) &&
        (formData.contract.hrManager.trim() === "" ||
          formData.contract.hrmDate.trim() === "")
      ) {
        alert("HRM Name and Date is required!");
        return;
      }

      if (
        gmPosition === "GENERAL MANAGER" &&
        (!formData.contract.genManager || !formData.contract.gmDate) &&
        (formData.contract.genManager.trim() === "" ||
          formData.contract.gmDate.trim() === "")
      ) {
        alert("GM Name and Date is required!");
        return;
      }
      if (
        userType === "HR" &&
        (!formData.contract.hrSign || !formData.contract.hrDate) &&
        (formData.contract.hrSign.trim() === "" ||
          formData.contract.hrDate.trim() === "")
      ) {
        alert("HR Name and Date is required!");
        return;
      }

      if (
        userType === "Manager" &&
        gmPosition !== "GENERAL MANAGER" &&
        HRMPosition !== "HR MANAGER" &&
        (!formData.contract.depHead || !formData.contract.managerDate) &&
        (formData.contract.depHead.trim() === "" ||
          formData.contract.managerDate.trim() === "")
      ) {
        alert(" Department Head Name and Date is required!");
        return;
      }
      setIsLoading(true);
      const selectedData = contractForms.find(
        (data) => data.empID === employeeData?.empID
      );
      const empPIRecord = empPIData.find(
        (match) => match?.empID === employeeData?.empID
      );
      const WorkInfoRecord = workInfoData.find(
        (match) => match?.empID === employeeData?.empID
      );

      const empName = empPIRecord?.name;

      const contractEndFormatted =
        Array.isArray(WorkInfoRecord?.contractEnd) &&
          WorkInfoRecord?.contractEnd?.length > 0
          ? WorkInfoRecord.contractEnd[WorkInfoRecord.contractEnd.length - 1]
            .split("-")
            .reverse()
            .join("/")
          : "Not mentioned";

      let renewalStatus = "";
      if (HRMPosition === "HR MANAGER") {
        renewalStatus = !isExtended && "gmView";
      }
      if (gmPosition === "GENERAL MANAGER") {
        renewalStatus = !isExtended && "noExtended";
      }
      if (userType === "HR") {
        renewalStatus = isExtended && "extended";
      }

      if (
        userType === "Manager" &&
        gmPosition !== "GENERAL MANAGER" &&
        HRMPosition !== "HR MANAGER"
      ) {
        renewalStatus = !isExtended && "hrmView";
      }
      //created form
      const formPayload = {
        empID: employeeData.empID,
        conAttn: formData.contract.conAttn,
        depHead: formData.contract.depHead,
        hrManager: formData.contract.hrManager,
        genManager: formData.contract.genManager,
        remarks: formData.contract.remarks,
        managerDate: formData.contract.managerDate,
        remarkHr: formData.contract.remarkHr,
        hrmDate: formData.contract.hrmDate,
        remarkGm: formData.contract.remarkGm,
        gmDate: formData.contract.gmDate,
        hrDate: formData.contract.hrDate,
        hrSign: formData.contract.hrSign,
        extendedStatus: renewalStatus,
        renewalContract: formData.contract.renewalContract,
        contStatus: true,
        oldCED: contractEndDateStr,
        // status:"Approved"
      };
        
      if (matchedID) {
        const formattedData = { ...formPayload, id: matchedID };
        await contractDetails({ ContractValue: formattedData });
        // console.log(formattedData, "update");
      } else { 
        // console.log(formPayload, "create");
        await contractForm(formPayload);
      }

      if (HRMPosition === "HR MANAGER" || userType === "HR") {
        HRResult = await sendHRNotification(
          empName,
          contractEndFormatted,
          managerData
        );
      } else if (
        userType === "Manager" &&
        gmPosition !== "GENERAL MANAGER" &&
        HRMPosition !== "HR MANAGER"
      ) {
        managerResult = await sendManagerNotification(
          empName,
          contractEndFormatted,
          PDInfo,
          managerData
        );
      }
       else if (gmPosition === "GENERAL MANAGER") {
        GMResult = await sendGMNotification(
          empName,
          contractEndFormatted,
          managerData
        );
      }


      const notificationRes =
        managerResult === "success" ||
        HRResult === "success" ||
        GMResult === "success";

      if (notificationRes) {
        setShowTitle(
          selectedData
            ? "Contract Form Updated Successfully"
            : "Contract Form Created Successfully"
        );
        setNotification(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setShowTitle("Error occurred during submission");
      setNotification(true);
    } finally {
      setIsLoading(false);
    }
  };

  let ContractMonthYear = "Invalid Date";

  if (contractEndDateStr) {
    const [day, month, year] = contractEndDateStr.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`); // Format to YYYY-MM-DD

    if (!isNaN(parsedDate)) {
      ContractMonthYear = parsedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
  }

  const contractFormRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => contractFormRef.current,
    onBeforePrint: () => console.log("Preparing to print PDF..."),
    onAfterPrint: () => console.log("Print complete"),
  });

  const handleDownloadClick = () => {
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
    downloadPDF("capture-section");

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
      <div
        id="capture-section"
        className="container mx-auto px-8 print-contract-form"
        ref={contractFormRef}
      >
        <div className="relative">
          <style>
            {`
              @media print {
                   .no-print, .no-print-parent {
                      display: none !important;
                     
                   }
                }
           `}
          </style>
          <section className="flex items-center pt-4 ">
            <Link
              to="/reports"
              id="left-button"
              className="no-print left-button text-xl text-start w-[50px] text-grey"
            >
              <FaArrowLeft />
            </Link>
            <div className=" w-full center pr-10">
              <img className=" max-w-[300px]" src={logo} alt="Logo not found" />
            </div>
          </section>
          <div className="text-center text-sm font-bold uppercase w-full py-6">
            {`Contract Completion Form for the Month of ${ContractMonthYear}`}
          </div>

          <div className="mb-6">
            <label className="text-sm">Attention:</label>
            <input
              type="text"
              name="conAttn"
              value={formData.contract.conAttn}
              onChange={handleInputChange}
              className="ml-2 border-b border-black focus:outline-none"
            />
          </div>

          <div className="w-full print-box">
            <table className="min-w-full table-fixed print:table-auto print:w-[95%] text-xs text-center border-collapse border">
              <thead>
                <tr>
                  <th className="border p-1 py-4">No.</th>
                  <th className="border p-1 py-4">Employee Name</th>
                  <th className="border p-1 py-4">Emp ID</th>
                  <th className="border p-1 py-4">Badge No.</th>
                  <th className="border p-1 py-4">Position</th>
                  <th className="border p-1 py-4">Department</th>
                  <th className="border p-1 py-4">Nationality</th>
                  <th className="border p-1 py-4">Date Of Join</th>
                  <th className="border p-1 py-4">Contract Start Date</th>
                  <th className="border p-1 py-4">Contract End Date</th>
                  <th className="border p-1 py-4">LD Expiry</th>
                  <th className="border p-1 py-4">Renewal Duration</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(1)].map((_, i) => (
                  <tr key={i}>
                    <td className="border p-1 py-4">{i + 1}</td>
                    <td className="border p-1 py-4">{employeeData?.name}</td>
                    <td className="border p-1 py-4">{employeeData?.empID}</td>
                    <td className="border p-1 py-4">
                      {employeeData?.empBadgeNo}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.position === "OTHER"
                        ? employeeData.otherPosition
                        : employeeData.position || "N/A"}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.department === "OTHER"
                        ? employeeData.otherDepartment
                        : employeeData.department || "N/A"}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.nationality || "N/A"}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.dateOfJoin}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.contractStartDate || "N/A"}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.oldCED?.trim()
                        ? employeeData.oldCED
                        : employeeData?.contractEndDate
                          ? employeeData.contractEndDate
                          : "N/A"}
                    </td>
                    <td className="border p-1 py-4">
                      {employeeData?.nlmsEmpApproval || "N/A"}
                    </td>
                    <td className="border p-1 py-4">
                      <textarea
                        name="renewalContract"
                        value={formData.contract.renewalContract}
                        onChange={handleInputChange}
                        disabled={userType !== "Manager"}
                        className="outline-none p-1 w-full print-renewalContract text-xs resize-none break-words whitespace-normal"
                        rows={3} // or any number based on height you want
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="mt-7 text-sm">
            <p>
              Notes: Deadline return to HRD after one week from the date
              received of Contract Completion Report
            </p>
          </div>

          {/* Remarks Section */}
          <div className="mt-10">
            <label className="text-sm block py-4">Manager Remarks:</label>
            <textarea
              type="text"
              name="remarks"
              value={formData.contract.remarks}
              onChange={handleInputChange}
              disabled={
                (userType !== "Manager" && gmPosition === "GENERAL MANAGER") ||
                HRMPosition === "HR MANAGER"
              }
              className="border w-full text-sm  rounded resize-none outline-none p-2"
            />
          </div>
          <div className="mt-10">
            <label className="text-sm block py-4">HRM Remarks:</label>
            <textarea
              type="text"
              name="remarkHr"
              value={formData.contract.remarkHr}
              onChange={handleInputChange}
              disabled={HRMPosition !== "HR MANAGER" && userType !== "HR"}
              className="border w-full text-sm  rounded resize-none outline-none p-2"
            />
          </div>
          <div className="mt-10 ">
            <label className="text-sm block py-4">GM Remarks:</label>
            <textarea
              type="text"
              name="remarkGm"
              value={formData.contract.remarkGm}
              onChange={handleInputChange}
              disabled={gmPosition !== "GENERAL MANAGER"}
              className="border w-full text-sm  rounded resize-none outline-none p-2"
            />
          </div>

          {/* Extended Status Checkbox */}
          {userType === "HR" && (
            <div className="mt-10 flex items-center">
              <input
                type="checkbox"
                id="extendedStatus"
                checked={isExtended}
                onChange={handleCheckboxChange}
           
                className="mr-2"
              />
              <label htmlFor="extendedStatus" className="text-sm">
                Extended Contract
              </label>
            </div>
          )}

          {/* Footer */}
          <div className="mt-14 mb-10 flex justify-between items-center gap-x-5">
            <div className="text-center ">
              <p className=" mb-5 text-sm">Recommended By:</p>
              <input
                type="text"
                name="depHead"
                value={formData.contract.depHead}
                onChange={handleInputChange}
                disabled={
                  (userType !== "Manager" &&
                    gmPosition === "GENERAL MANAGER") ||
                  HRMPosition === "HR MANAGER"
                }
                className="border-b border-black w-56 print-width mx-auto outline-none text-center leading-loose"
              />

              <p className="mt-3 text-sm">Department Head</p>
              <div className=" mt-5">
                <input
                  type="date"
                  name="managerDate"
                  value={formData.contract.managerDate}
                  onChange={handleInputChange}
                  disabled={
                    (userType !== "Manager" &&
                      gmPosition === "GENERAL MANAGER") ||
                    HRMPosition === "HR MANAGER"
                  }
                  className="outline-none text-dark_grey border rounded-md p-2"
                />
              </div>
            </div>

            <div className="text-center ">
              <p className=" mb-5 text-sm">Acknowledged & Checked By:</p>
              <input
                type="text"
                name="hrManager"
                value={formData.contract.hrManager}
                onChange={handleInputChange}
                disabled={HRMPosition !== "HR MANAGER" && userType !== "HR"}
                className="border-b border-black w-56 print-width mx-auto outline-none text-center leading-loose"
              />

              <p className="mt-3 text-sm">HRM</p>
              <div className=" mt-5">
                <input
                  type="date"
                  name="hrmDate"
                  value={formData.contract.hrmDate}
                  onChange={handleInputChange}
                  disabled={HRMPosition !== "HR MANAGER" && userType !== "HR"}
                  className="outline-none text-dark_grey border rounded-md p-2"
                />
              </div>
            </div>
            <div className="text-center">
              <p className=" mb-5 text-sm">Approved By:</p>
              <input
                type="text"
                name="genManager"
                value={formData.contract.genManager}
                onChange={handleInputChange}
                disabled={gmPosition !== "GENERAL MANAGER"}
                className="border-b border-black w-56 print-width mx-auto outline-none text-center leading-loose"
              />

              <p className="mt-3 text-sm">GM</p>
              <div className=" mt-5">
                <input
                  type="date"
                  name="gmDate"
                  value={formData.contract.gmDate}
                  onChange={handleInputChange}
                  disabled={gmPosition !== "GENERAL MANAGER"}
                  className="outline-none text-dark_grey border rounded-md p-2"
                />
              </div>
            </div>
            <div className="text-center">
              <p className=" mb-5 text-sm">Verified By:</p>
              <input
                type="text"
                name="hrSign"
                value={formData.contract.hrSign}
                onChange={handleInputChange}
                disabled={userType !== "HR"}
                className="border-b border-black w-56 print-width mx-auto outline-none text-center leading-loose"
              />

              <p className="mt-3 text-sm">HR</p>
              <div className=" mt-5">
                <input
                  type="date"
                  name="hrDate"
                  value={formData.contract.hrDate}
                  onChange={handleInputChange}
                  disabled={userType !== "HR"}
                  className="outline-none text-dark_grey border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {userType !== "SuperAdmin" && (
            <div className="flex justify-center gap-4 py-8 no-print-parent text-center">
              {isDownloading ? (
                <p className="text-lg font-semibold">Downloading...</p>
              ) : (
                <>
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
                          <span>Submiting</span>
                          <span className="ml-1 animate-spin border-2 border-t-2 border-t-white border-gray-300 rounded-full w-4 h-4"></span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <FaSave className="ml-2 mt-1" />
                        </>
                      )}
                    </button>
                  </>

                  {/* Download Button */}
                  <button
                    id="download-button"
                    onClick={handleDownloadClick}
                    className="border-yellow border-2 text-dark_grey text_size_3 rounded-md px-4 py-2 flex items-center justify-center gap-2 min-w-[160px] h-[40px] no-print"
                  >
                    <span>Download</span>
                    <FaDownload className="ml-2 mt-1" />
                  </button>

                  {/* Print Button */}
                  <button
                    id="print-button"
                    onClick={handlePrint}
                    className="border-yellow border-2 text-dark_grey text_size_3 rounded-md px-4 py-2 flex items-center justify-center gap-2 min-w-[160px] h-[40px] no-print"
                  >
                    <span>Print</span>
                    <FaPrint className="ml-2 mt-1" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/reports"
          />
        )}
      </div>
    </>
  );
};
