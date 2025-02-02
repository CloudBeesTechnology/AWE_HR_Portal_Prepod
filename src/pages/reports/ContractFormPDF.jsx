import React, { useState, useEffect, useContext } from "react";
import "jspdf-autotable"; // Ensure this is imported
import { useLocation, Link } from "react-router-dom";
import { downloadPDF } from "../../utils/DownloadPDF";
import { ContractForm } from "../../services/createMethod/CreateContract";
import { DataSupply } from "../../utils/DataStoredContext";
import { UpdateContractData } from "../../services/updateMethod/UpdateContractForm";
import { sendEmail } from "../../services/EmailServices";
import { FaArrowLeft } from "react-icons/fa";
import { SpinLogo } from "../../utils/SpinLogo";
import { useTempID } from "../../utils/TempIDContext";
import { ContractFormSchema } from "../../services/ReportValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export const ContractFormPDF = ({ contentRef }) => {
  const { contractForm } = ContractForm();
  const { gmPosition } = useTempID();
  const { contractDetails } = UpdateContractData();
  const { contractForms, workInfoData, empPIData } = useContext(DataSupply);
  const location = useLocation();
  const { employeeData } = location.state || {};
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [showTitle, setShowTitle] = useState("");
  const [notification, setNotification] = useState(false);

  const [managerData, setManagerData] = useState({
    managerEmpID: "",
    managerOfficialMail: "",
    managerName: "",
    hrEmail: "Hr-notification@adininworks.com",
    genManagerEmail: "",
  });


  const [formData, setFormData] = useState({
    contract: {
      empID: "",
      conAttn: "",
      depHead: "",
      hrManager: "",
      genManager: "",
      remarks: "",
      status: "",
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
              managerOfficialMail: managerInfo.officialEmail,
              managerName: managerInfo.name,
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
            setManagerData((prevData) => ({
              ...prevData,
              genManagerEmail: gmInfo.officialEmail,
            }));
            // console.log("Updated Email Data with GM Email:", gmInfo.officialEmail);
          } else {
            console.log("GM Info not found.");
          }
        } else {
          console.log("No General Manager positions found.");
        }
      }
    }
  }, [workInfoData, employeeData?.empID, empPIData]);


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

  const subject = "Contract Completion Form Review";
  const from = "hr_no-reply@adininworks.com";

  const handleSubmit = async () => {

    const selectedData = contractForms.find(
      (data) => data.empID === employeeData?.empID
    );
    

    const createFormattedData = {
      empID: employeeData.empID,
      conAttn: formData.contract.conAttn,
      depHead: formData.contract.depHead,
      hrManager: formData.contract.hrManager,
      genManager: formData.contract.genManager,
      remarks: formData.contract.remarks,
      contStatus: true,
    };


    const empPIRecord = empPIData.find(
      (match) => match?.empID === selectedData?.empID
    );

    const WorkInfoRecord = workInfoData.find(
      (match) => match?.empID === selectedData?.empID
    );

    console.log(WorkInfoRecord, empPIRecord);
    

    const probationEndFormatted =
      Array.isArray(WorkInfoRecord?.probationEnd) &&
      WorkInfoRecord?.probationEnd?.length > 0
        ? WorkInfoRecord?.probationEnd[WorkInfoRecord?.probationEnd?.length - 1]
            .split("-")
            .reverse()
            .join("/")
        : "Not mentioned";

    try {
      if (selectedData) {
        const formattedData = {
          id: selectedData.id,
          conAttn: formData.contract.conAttn,
          depHead: formData.contract.depHead,
          hrManager: formData.contract.hrManager,
          genManager: formData.contract.genManager,
          remarks: formData.contract.remarks,
          contStatus: true,
        };

        
        if (userType === "HR" && !formData.contract.hrManager) {
          alert("HR Name is is required!");
          return;
        }

        if (gmPosition === "General Manager" && !formData.contract.genManager) {
          alert("GM Name is is required!");
          return;
        }

        await contractDetails({ ContractValue: formattedData });
        // console.log("Updated Data", formattedData);
        setShowTitle("Contract Form Updated Successfully");
        setNotification(true);

        if (userType === "HR") {
          sendEmail(
            subject,
            `<html>
            <body>
               <p> 
                 Your Employee Mr./Ms. ${
                   empPIRecord?.name || "Not mentioned"
                 }'s contract period ending on ${
              probationEndFormatted || "Not Mentioned"
            },
               <br/>
                  has been verified and checked by HR.
               </p>
              <p>Click here https://hr.adininworks.co" to view the updates.</p>
           </body>
         </html>`,
            from,
            managerData.genManagerEmail
          );
        } else if (userType === "Manager" && !gmPosition) {
          sendEmail(
            subject,
            `<html>
                        <body>
                           <p> 
                             Your Employee Mr./Ms. ${
                               empPIRecord?.name || "Not mentioned"
                             }'s contract period ending on ${
              probationEndFormatted || "Not Mentioned"
            },
                           <br/>
                               has been reviewed and added remarks by Manager, ${
                                managerData?.managerName || "Not Mentioned"
                              }.
                           </p>
                          <p>Click here https://hr.adininworks.co" to view the updates.</p>
                       </body>
                     </html>`,
            from,
            // "hariharanofficial2812@gmail.com"
            managerData.hrEmail
          );
        } else if (gmPosition === "General Manager") {
          sendEmail(
            subject,
            `<html>
            <body>
               <p> 
                 Your Employee Mr./Ms. ${
                   empPIRecord?.name || "Not mentioned"
                 }'s contract period ending on ${
              probationEndFormatted || "Not Mentioned"
            },
               <br/>
                  been confirmed by the General manager,
               </p>
               <p>Please proceed with the necessary actions.</p>
              <p>Click here https://hr.adininworks.co to view the updates.</p>
           </body>
         </html>`,
            from,
            managerData.hrEmail
          );

        }
      } 
      else {

        if (userType === "Manager" && !gmPosition && !formData.contract.depHead) {
          alert("Manager Name is is required!");
          return;
        }

        await contractForm(createFormattedData);

        if (userType === "Manager" && !gmPosition) {
          sendEmail(
            subject,
            `<html>
                        <body>
                           <p> 
                             Your Employee Mr./Ms. ${
                               empPIRecord?.name || "Not mentioned"
                             }'s contract period ending on ${
              probationEndFormatted || "Not Mentioned"
            },
                           <br/>
                              has been reviewed and added remarks by Manager, ${
                                managerData?.managerName || "Not Mentioned"
                              }.
                           </p>
                          <p>Click here https://hr.adininworks.co to view the contract completion  form.</p>
                       </body>
                     </html>`,
            from,
            // "hariharanofficial2812@gmail.com"
            managerData.hrEmail
          );
        }
        // console.log("Create Data", createFormattedData);
        setShowTitle("Contract Form Created Successfully");
        setNotification(true);
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

        <div className="flex items-center">
          <Link to="/reports" className="text-xl text-start w-[50px] text-grey">
            <FaArrowLeft />
          </Link>
          <div className="text-center text-lg font-bold uppercase  flel-1 w-full">
            Contract Completion Form for the Month of January 2024
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
          <table className="min-w-full table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-2">No.</th>
                <th className="border border-black p-2">Employee Name</th>
                <th className="border border-black p-2">Emp ID</th>
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
                  <td className="border border-black p-2">
                    {employeeData?.contractRenewalDuration || "N/A"}
                  </td>
                  {/* <td className="border border-black p-2">
                    {employeeData?.ldEx || "N/A"}
                  </td>
                  <td className="border border-black p-2">
                    {employeeData?.balanceMonths || "N/A"}
                  </td> */}
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
          <textarea
            type="text"
            name="remarks"
            value={formData.contract.remarks}
            onChange={handleInputChange}
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
              disabled={gmPosition !== "General Manger"} 
              className="border-b-2 border-black w-56 mx-auto outline-none text-center"
            />

            <p className="mt-3">GM</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="primary_btn"
          >
            Save
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