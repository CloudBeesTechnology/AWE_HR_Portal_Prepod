import React, { useState, useEffect, useContext } from "react";
import "jspdf-autotable"; // Ensure this is imported
import { useLocation } from "react-router-dom";
import { downloadPDF } from "../../utils/DownloadPDF";
import { ContractForm } from "../../services/createMethod/CreateContract";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateContractData } from "../../services/updateMethod/UpdateContractForm";
import { sendEmail } from "../../services/EmailServices";

export const ContractFormPDF = ({ contentRef }) => {
  const { contractForm } = ContractForm();
  const { contractDetails } = UpdateContractData();
  const { contractForms, workInfoData, empPIData } = useContext(DataSupply);
  const location = useLocation();
  const { employeeData } = location.state || {};
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [managerData, setManagerData] = useState({
    managerEmpID: "",
    managerOfficialMail: "",
    hrEmail: "hr_no-reply@adininworks.com",
    genManagerEamil: "",
  });



  const [formData, setFormData] = useState({
    contract: {
      empID: "",
      conAttn: "",
      depHead: "",
      hrManager: "",
      genManager: "",
      remarks: "",
    },
  });

  console.log(workInfoData, "WF DATA");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // console.log("Fetched contract form",contractForms);

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
    const userID = localStorage.getItem("userID");
    setUserID(userID);
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
        const managerEmpID = workInfo.manager; // Assuming this field exists and contains the manager's employee ID.
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
              managerOfficialMail: managerInfo.officialEmail, // Assuming this field exists.
            }));
          }
        }

      }
    }
  }, [workInfoData, employeeData?.empID, empPIData]); // Depend on all the relevant data sources

  console.log("hello world ---- working");
  

  // Filter workInfoData to find entries where position includes "GENERAL MANAGER"
const generalManagerPositions = workInfoData.filter(item => item.position.includes("GENERAL MANAGER"));

// Log the count of "GENERAL MANAGER" entries
console.log("LIST",generalManagerPositions);



// Log the number of entries with empID === "12345"

console.log(managerData);

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
          },
        });
      }
    }
  }, [contractForms, employeeData?.empID]);

  const subject = "Contract Form approved";
  const message = "Dear Hari employee Arjun contract period is expired...";
  const from = "hr_no-reply@adininworks.com";
  const to = "hariharanofficial2812@gmail.com";

  const handleSubmit = async () => {
    const selectedData = contractForms.find(
      (data) => data.empID === employeeData?.empID
    );

    const createFormattedData = {
      empID: employeeData?.empID || "",
      conAttn: formData.contract.conAttn,
      depHead: formData.contract.depHead,
      hrManager: formData.contract.hrManager,
      genManager: formData.contract.genManager,
      remarks: formData.contract.remarks,
    };

    try {
      if (selectedData) {
        const formattedData = {
          id: selectedData.id,
          conAttn: formData.contract.conAttn,
          depHead: formData.contract.depHead,
          hrManager: formData.contract.hrManager,
          genManager: formData.contract.genManager,
          remarks: formData.contract.remarks,
        };
        await contractDetails({ ContractValue: formattedData })
        console.log("Updated Data", formattedData);
        
         if (userType === "HR") {
          sendEmail(subject, message, from, formData.contract.managerOfficialMail, );
        } 
       
      } else {
        await contractForm(createFormattedData);
        if (userType === "Manager") {
          sendEmail(subject, message, from, to);
        } 
        console.log("Create Data", createFormattedData);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

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
        <button
          onClick={handleEditClick}
          id="edit-button"
          className="absolute top-0 right-0 p-2 border rounded-full"
        >
          {isEditing ? (
            <span className="text-xl">❌</span> // Close icon when editing
          ) : (
            <span className="text-xl">✏</span> // Edit icon when not editing
          )}
        </button>

        <div className="text-center text-lg font-bold uppercase mb-4">
          Contract Completion Form for the Month of January 2024
        </div>

        <div className="mb-16 mt-10">
          <label className="font-semibold">Attention:</label>
          {isEditing ? (
            <input
              type="text"
              name="conAttn"
              value={formData.contract.conAttn}
              onChange={handleInputChange}
              className="ml-2 border-b-2 border-black focus:outline-none"
            />
          ) : (
            <span>{formData.contract.conAttn}</span>
          )}
          {!isEditing && (
            <div className="border-b-2 border-black w-52 ml-[9%]"></div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-2">No.</th>
                <th className="border border-black p-2">Employee Name</th>
                <th className="border border-black p-2">Badge No.</th>
                <th className="border border-black p-2">Position</th>
                <th className="border border-black p-2">Department</th>
                <th className="border border-black p-2">Nationality</th>
                <th className="border border-black p-2">Date Of Join</th>
                <th className="border border-black p-2">Contract Start Date</th>
                <th className="border border-black p-2">Contract End Date</th>
                <th className="border border-black p-2">LD Expiry</th>
                <th className="border border-black p-2">
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
                    {employeeData?.empBadgeNo}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.position}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.department}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.nationality}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.doj}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.contractStartDate}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.contractEndDate}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.ldEx || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.balanceMonths}
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
          <label className="text-sm font-semibold">Remarks:</label>
          {isEditing ? (
            <textarea
              type="text"
              name="remarks"
              value={formData.contract.remarks}
              onChange={handleInputChange}
              className="border w-full text-sm font-semibold rounded resize-none outline-none"
            />
          ) : (
            <span>{formData.contract.remarks}</span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-20 flex justify-between items-center">
          <div className="text-center">
            <p className="font-semibold mb-10">Recommended By:</p>
            {isEditing ? (
              <input
                type="text"
                name="depHead"
                value={formData.contract.depHead}
                onChange={handleInputChange}
                className="border-b-2 border-black w-52 mx-auto"
              />
            ) : (
              <span>{formData.contract.depHead}</span>
            )}

            {!isEditing && (
              <div className="border-b-2 border-black w-52 mx-auto"></div>
            )}

            <p className="mt-3">Department Head</p>
          </div>

          <div className="text-center">
            <p className="font-semibold mb-10">Acknowledged & Checked By:</p>
            {isEditing ? (
              <input
                type="text"
                name="hrManager"
                value={formData.contract.hrManager}
                onChange={handleInputChange}
                className="border-b-2 border-black w-52 mx-auto"
              />
            ) : (
              <span>{formData.contract.hrManager}</span>
            )}
            {!isEditing && (
              <div className="border-b-2 border-black w-52 mx-auto"></div>
            )}
            <p className="mt-3">HRM</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mb-10">Approved By:</p>
            {isEditing ? (
              <input
                type="text"
                name="genManager"
                value={formData.contract.genManager}
                onChange={handleInputChange}
                className="border-b-2 border-black w-52 mx-auto"
              />
            ) : (
              <span>{formData.contract.genManager}</span>
            )}
            {!isEditing && (
              <div className="border-b-2 border-black w-52 mx-auto"></div>
            )}
            <p className="mt-3">GM</p>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                handleSubmit();
                setIsEditing(false);
              }}
              className="bg-grey text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        )}

        {/* Download Button */}
      
      </div>
    </div>
  );
};