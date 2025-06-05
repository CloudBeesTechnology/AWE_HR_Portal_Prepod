import React, { useState, useEffect, useContext } from "react";
import "jspdf-autotable";
import { useLocation, Link } from "react-router-dom";
import { downloadPDF } from "../../utils/DownloadPDF";
import { ContractForm } from "../../services/createMethod/CreateContract";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateContractData } from "../../services/updateMethod/UpdateContractForm";
import { sendEmail } from "../../services/EmailServices";
import { FaArrowLeft } from "react-icons/fa";
import { SpinLogo } from "../../utils/SpinLogo";
import { useTempID } from "../../utils/TempIDContext";
import { useCreateNotification } from "../../hooks/useCreateNotification";

export const ContractFormPDF = ({ contentRef }) => {
  const location = useLocation();
  const { contractForm } = ContractForm();
  const { gmPosition, PDInfo } = useTempID();
  const { contractDetails } = UpdateContractData();
  const { contractForms, workInfoData, empPIData } = useContext(DataSupply);
  const { employeeData } = location.state || {};
  const { createNotification } = useCreateNotification();
  const [userType, setUserType] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      remarkGm: "",
      renewalContract: "",
      status: "",
      createdAt: "",
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

  useEffect(() => {
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

        if (managerEmpID && managerEmpID.length > 0) {
          const lastManagerEmpID = managerEmpID[managerEmpID.length - 1];
          // console.log("Last managerEmpID:", lastManagerEmpID);

          const managerInfo = empPIData.find(
            (data) => data.empID === String(lastManagerEmpID)
          );

          if (managerInfo) {
            // console.log("Found manager info:", managerInfo);

            setManagerData((prevData) => ({
              ...prevData,
              managerOfficialMail: managerInfo.officialEmail,
              managerName: managerInfo.name,
            }));
          } else {
            // console.log("Manager info not found in empPIData for last managerEmpID:", lastManagerEmpID);
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
      const contractData = contractForms.find(
        (data) => data.empID === employeeData?.empID
      ); // Assuming we want to take the first item
      if (contractData) {
        setFormData({
          contract: {
            conAttn: contractData.conAttn,
            depHead: contractData.depHead,
            hrManager: contractData.hrManager,
            genManager: contractData.genManager,
            remarks: contractData.remarks,
            remarkHr: contractData.remarkHr,
            remarkGm: contractData.remarkGm,
            createdAt: contractData.createdAt,
            renewalContract: contractData.renewalContract,
          },
        });
      }
    }
  }, [contractForms, employeeData?.empID]);

  const subject = "Contract Completion Form Review";
  const from = "hr_no-reply@adininworks.com";

  // Parse "DD-MM-YYYY" into a proper Date object
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
    }, has been verified and checked by HR.`;

    if (Array.isArray(managerData?.genManagerEmail)) {
      for (let email of managerData.genManagerEmail) {
        await sendEmail(
          subject,
          `<html>
          <body>
            <p>Your Employee Mr./Ms. ${
              empName || "Not mentioned"
            }'s contract period ending on ${
            contractEndFormatted || "Not Mentioned"
          },
              <br/>
              has been verified and checked by HR.
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
    }, has been reviewed and added remarks by Manager, ${
      PDInfo || "Not Mentioned"
    }.`;

    await sendEmail(
      subject,
      `<html>
      <body>
        <p>Your Employee Mr./Ms. ${
          empName || "Not mentioned"
        }'s contract period ending on ${
        contractEndFormatted || "Not Mentioned"
      },
          <br/>
          has been reviewed and added remarks by Manager, ${
            PDInfo || "Not Mentioned"
          }.
        </p>
        <p>Click here <a href="https://hr.adininworks.co">to view the updates.</a></p>
      </body>
    </html>`,
      "hr_no-reply@adininworks.com",
      managerData.hrEmail
      // "hariharanofficial2812@gmail.com"
    );

    await createNotification({
      empID: employeeData?.empID,
      leaveType: subject,
      message: notifyMessageManager,
      senderEmail: "hr_no-reply@adininworks.com",
      receipentEmail: managerData?.hrEmail,
    });
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

    await sendEmail(
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
  };

  // console.log("Name", PDInfo);

  // Main submission handler
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Validate required fields based on user type
      if (userType === "HR" && !formData.contract.hrManager) {
        alert("HR Name is required!");
        return;
      }

      if (gmPosition === "GENERAL MANAGER" && !formData.contract.genManager) {
        alert("GM Name is required!");
        return;
      }

      if (
        userType === "Manager" &&
        gmPosition !== "GENERAL MANAGER" &&
        !formData.contract.depHead
      ) {
        alert("Manager Name is required!");
        return;
      }

      // Find existing records
      const selectedData = contractForms.find(
        (data) => data.empID === employeeData?.empID
      );
      const empPIRecord = empPIData.find(
        (match) => match?.empID === employeeData?.empID
      );
      const WorkInfoRecord = workInfoData.find(
        (match) => match?.empID === employeeData?.empID
      );

      // Prepare common data
      const empName = empPIRecord?.name;

      const contractEndFormatted =
        Array.isArray(WorkInfoRecord?.contractEnd) &&
        WorkInfoRecord?.contractEnd?.length > 0
          ? WorkInfoRecord.contractEnd[WorkInfoRecord.contractEnd.length - 1]
              .split("-")
              .reverse()
              .join("/")
          : "Not mentioned";

      // Prepare form data
      const formPayload = {
        empID: employeeData.empID,
        conAttn: formData.contract.conAttn,
        depHead: formData.contract.depHead,
        hrManager: formData.contract.hrManager,
        genManager: formData.contract.genManager,
        remarks: formData.contract.remarks,
        remarkHr: formData.contract.remarkHr,
        remarkGm: formData.contract.remarkGm,
        renewalContract: formData.contract.renewalContract,
        contStatus: true,
      };

      // Update or create record
      if (selectedData) {
        const formattedData = { ...formPayload, id: selectedData.id };
        await contractDetails({ ContractValue: formattedData });
      } else {
        await contractForm(formPayload);
      }

      // Send appropriate notifications
      if (userType === "HR") {
        await sendHRNotification(empName, contractEndFormatted, managerData);
      } else if (userType === "Manager" && gmPosition !== "GENERAL MANAGER") {
        await sendManagerNotification(
          empName,
          contractEndFormatted,
          PDInfo,
          managerData
        );
      } else if (gmPosition === "GENERAL MANAGER") {
        await sendGMNotification(empName, contractEndFormatted, managerData);
      }

      // Show success message
      setShowTitle(
        selectedData
          ? "Contract Form Updated Successfully"
          : "Contract Form Created Successfully"
      );
      setNotification(true);
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

  const handleDownloadClick = () => {
    // Hide buttons before download 7590
    const editButton = document.getElementById("edit-button");
    const downloadButton = document.getElementById("download-button");

    if (editButton) editButton.style.display = "none";
    if (downloadButton) downloadButton.style.display = "none";

    // Wait for the PDF to be generated, then restore the buttons.
    downloadPDF("capture-section");

    setTimeout(() => {
      if (editButton) editButton.style.display = "block";
      if (downloadButton) downloadButton.style.display = "block";
    }, 500);
  };

  return (
    <div
      id="capture-section"
      className="container mx-auto p-8"
      ref={contentRef}
    >
      <div className="relative">
        {/* Edit Icon or Close Icon */}

        <div className="flex items-center">
          <Link to="/reports" className="text-xl text-start w-[50px] text-grey">
            <FaArrowLeft />
          </Link>

          {/* <div className="text-center text-lg font-bold uppercase  flel-1 w-full">
            Contract Completion Form for the Month of January 2024
          </div> */}

          <div className="text-center text-lg font-bold uppercase w-full my-10">
            {`Contract Completion Form for the Month of ${ContractMonthYear}`}
          </div>
        </div>

        <div className="mb-16 mt-16">
          <label className="font-semibold">Attention:</label>
          <input
            type="text"
            name="conAttn"
            value={formData.contract.conAttn}
            onChange={handleInputChange}
            className="ml-2 border-b-2 border-black focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-center table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-2">No.</th>
                <th className="border border-black p-2 py-2 px-[30px]">
                  Employee Name
                </th>
                <th className="border border-black p-2 py-2 px-[30px]">
                  Emp ID
                </th>
                <th className="border border-black py-2 px-[40px]">
                  Badge No.
                </th>
                <th className="border border-black p-2">Position</th>
                <th className="border border-black p-2">Department</th>
                <th className="border border-black p-2">Nationality</th>
                <th className="border border-black py-2 px-[40px]">
                  Date Of Join
                </th>
                <th className="border border-black py-2 px-[30px]">
                  Contract Start Date
                </th>
                <th className="border border-black py-2 px-[30px]">
                  Contract End Date
                </th>
                <th className="border border-black py-2 px-[30px]">
                  LD Expiry
                </th>
                <th className="border border-black py-2 px-[30px]">
                  Duration of Renewal Contract
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(1)].map((_, i) => (
                <tr key={i}>
                  <td className="border border-black p-2">{i + 1}</td>
                  <td className="border border-black p-2">
                    {employeeData?.name}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.empID}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.empBadgeNo}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.position || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.department || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.nationality || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.dateOfJoin}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.contractStartDate || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.contractEndDate || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.nlmsEmpApproval || "N/A"}
                  </td>
                  <td className="border border-black p-2 h-full ">
                    <input
                      type="text"
                      className="border outline-none border-none p-1 w-full h-full"
                      name="renewalContract"
                      value={formData.contract.renewalContract}
                      onChange={handleInputChange}
                      disabled={userType !== "Manager"}
                      // defaultValue={employeeData?.contract || ""}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="mt-7">
          <p className="font-semibold">
            Notes: Deadline return to HRD after one week from the date received
            of Contract Completion Report
          </p>
        </div>

        {/* Remarks Section */}
        <div className="mt-7">
          <label className="text-sm font-semibold">Remarks Manager:</label>
          <textarea
            type="text"
            name="remarks"
            value={formData.contract.remarks}
            onChange={handleInputChange}
            disabled={userType !== "Manager"}
            className="border w-full text-sm font-semibold rounded resize-none outline-none p-2"
          />
        </div>
        <div className="mt-7">
          <label className="text-sm font-semibold">Remarks HR:</label>
          <textarea
            type="text"
            name="remarkHr"
            value={formData.contract.remarkHr}
            onChange={handleInputChange}
            disabled={userType !== "HR"}
            className="border w-full text-sm font-semibold rounded resize-none outline-none p-2"
          />
        </div>
        <div className="mt-7">
          <label className="text-sm font-semibold">Remarks GM:</label>
          <textarea
            type="text"
            name="remarkGm"
            value={formData.contract.remarkGm}
            onChange={handleInputChange}
            disabled={gmPosition !== "GENERAL MANAGER"}
            className="border w-full text-sm font-semibold rounded resize-none outline-none p-2"
          />
        </div>

        {/* Footer */}
        <div className="mt-20 flex justify-between items-center">
          <div className="text-center">
            <p className="font-semibold mb-5">Recommended By:</p>
            <input
              type="text"
              name="depHead"
              value={formData.contract.depHead}
              onChange={handleInputChange}
              disabled={userType !== "Manager"}
              className="border-b-2 border-black w-56 mx-auto outline-none text-center"
            />

            <p className="mt-3">Department Head</p>
          </div>

          <div className="text-center">
            <p className="font-semibold mb-5">Acknowledged & Checked By:</p>
            <input
              type="text"
              name="hrManager"
              value={formData.contract.hrManager}
              onChange={handleInputChange}
              disabled={userType !== "HR"}
              className="border-b-2 border-black w-56 mx-auto outline-none text-center"
            />

            <p className="mt-3">HRM</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mb-5">Approved By:</p>
            <input
              type="text"
              name="genManager"
              value={formData.contract.genManager}
              onChange={handleInputChange}
              disabled={gmPosition !== "GENERAL MANAGER"}
              className="border-b-2 border-black w-56 mx-auto outline-none text-center"
            />

            <p className="mt-3">GM</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="primary_btn"
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>

        {/* Download Button */}
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/reports"
        />
      )}
    </div>
  );
};
