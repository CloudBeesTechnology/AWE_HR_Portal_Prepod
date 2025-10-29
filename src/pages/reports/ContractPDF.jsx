import React, { useContext, useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-with-name.svg";
import { VscClose } from "react-icons/vsc";
import { useTempID } from "../../utils/TempIDContext";
import { DataSupply } from "../../utils/DataStoredContext";

export const ContractPDF = ({ userID, userType }) => {
  const { contractForms, loading: dataLoading } = useContext(DataSupply);
  const navigate = useNavigate();
  const location = useLocation();
  const { gmPosition, HRMPosition } = useTempID();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  // const [skillPool, setskillPool] = useState("");
  const [tableHead] = useState(
    [
      "Emp ID",
      "Badge No",
      "Name",
      "Nationality",
      "Date of Join",
      "Department",
      "other Department",
      "Position",
      "Other Position",
      "Contract Start Date",
      "Contract End Date",
      "LD Expiry",
      userType !== "SuperAdmin" && "Status",
    ].filter(Boolean)
  );

  const formatDate = (date) => {
    const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (typeof date === "string" && ddmmyyyyRegex.test(date)) {
      return date;
    }
    if (Array.isArray(date)) {
      if (date.length === 0) return "-";
      const lastDate = date[date.length - 1];
      return formatDate(lastDate);
    }
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const contractExpiryMergedData = (data) => {
    const processedEmpIDs = new Set();

    const mergedData = contractForms
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((contract) => {
        // if (processedEmpIDs.has(contract.empID)) return null;
        // processedEmpIDs.add(contract.empID);

        const emp = data.find((d) => d.empID === contract.empID);
        if (!emp) return null;

        const lastWorkStatus =
          Array.isArray(emp.workStatus) && emp.workStatus.length > 0
            ? emp.workStatus[emp.workStatus.length - 1]
            : "";

        if (
          lastWorkStatus.toUpperCase() === "TERMINATION" ||
          lastWorkStatus.toUpperCase() === "RESIGNATION"
        ) {
          return null;
        }

        const skillPool = emp?.skillPool ? emp?.skillPool.toUpperCase() : "";
        
        // console.log(skillPool,"checkingpool");
        
        const contractEndDates = emp.contractEnd || [];
        const lastDate = contractEndDates[contractEndDates.length - 1];
        const isContractActive = lastDate && emp.contStatus === true;

        if (!isContractActive) return null;

        if (gmPosition === "GENERAL MANAGER") {
          if (skillPool === "SKILLED" || skillPool === "UNSKILLED") {
            return false;
          }
        }
        const contractStartDates = emp.contractStart || [];
        const startDate = contractStartDates[contractStartDates.length - 1];
        const today = new Date();
        const positionRevDate =
          emp.positionRevDate?.[emp.positionRevDate.length - 1];
        const positionRev = emp.positionRev?.[emp.positionRev.length - 1];
        const upgradePosition =
          emp.upgradePosition?.[emp.upgradePosition.length - 1];
        const upgradeDate = emp.upgradeDate?.[emp.upgradeDate.length - 1];

        let finalPosition;

        const revDateObj = positionRevDate ? new Date(positionRevDate) : null;
        const upgradeDateObj = upgradeDate ? new Date(upgradeDate) : null;

        if (revDateObj && upgradeDateObj) {
          if (revDateObj.toDateString() === upgradeDateObj.toDateString()) {
            finalPosition = emp.position?.[emp.position.length - 1];
          } else if (revDateObj > upgradeDateObj) {
            finalPosition =
              today >= revDateObj
                ? positionRev
                : today >= upgradeDateObj
                ? upgradePosition
                : emp.position?.[emp.position.length - 1];
          } else if (upgradeDateObj > revDateObj) {
            finalPosition =
              today >= upgradeDateObj
                ? upgradePosition
                : today >= revDateObj
                ? positionRev
                : emp.position?.[emp.position.length - 1];
          }
        } else if (revDateObj && !upgradeDateObj) {
          finalPosition = today >= revDateObj && positionRev;
        } else if (upgradeDateObj && !revDateObj) {
          finalPosition = today >= upgradeDateObj && upgradePosition;
        } else {
          finalPosition = emp.position?.[emp.position.length - 1];
        }
        // console.log(contract,"contract");

        return {
          empID: emp.empID,
          empBadgeNo: emp.empBadgeNo,
          name: emp.name,
          nationality: emp.nationality,
          dateOfJoin: formatDate(emp.doj),
          department:
            Array.isArray(emp.department) &&
            emp.department[emp.department.length - 1],
          otherDepartment:
            Array.isArray(emp.otherDepartment) &&
            emp.otherDepartment[emp.otherDepartment.length - 1],
          position: finalPosition,
          otherPosition:
            Array.isArray(emp.otherPosition) &&
            emp.otherPosition[emp.otherPosition.length - 1],
          contractStartDate: formatDate(startDate),
          contractEndDate: formatDate(lastDate),
          oldCSD: contract.oldCSD,
          oldCED: formatDate(contract.oldCED),
          nlmsEmpApproval: Array.isArray(emp.nlmsEmpValid)
            ? formatDate(emp.nlmsEmpValid[emp.nlmsEmpValid.length - 1])
            : "N/A",
          headStatus: contract.depHead,
          hrmStatus: contract.hrManager,
          gmStatus: contract.genManager,
          skillPool: skillPool,
          matchedID: contract.id,
          ...(userType === "Manager" &&
            gmPosition !== "GENERAL MANAGER" &&
            HRMPosition !== "HR MANAGER" && {
              status: contract.depHead ? "Approved" : "Pending",
            }),
          ...(HRMPosition === "HR MANAGER"
            ? {
                status: contract.hrManager ? "Approved" : "Pending",
              }
            : {}),
          ...(gmPosition === "GENERAL MANAGER" && {
            status: contract.genManager ? "Approved" : "Pending",
          }),
          ...(userType === "HR" && {
            status: contract.hrSign
              ? contract.extendedStatus === "extended"
                ? "Extended"
                : "Not Extended"
              : "Pending",
          }),
        };
      })
      .filter((item) => item !== null)
      .sort((a, b) => {
        const getPriority = (item) => {
          if (item.status === "Pending") return 1;
          if (item.status === "Not Extended") return 2;
          return 3;
        };

        return getPriority(a) - getPriority(b);
      });
    // console.log(mergedData,"mergedData");

    return mergedData;
  };

  useEffect(() => {
    if (allData.length > 0 && contractForms.length > 0) {
      const data = contractExpiryMergedData(
        allData,
        contractForms,
        userType,
        gmPosition,
        userID,
        HRMPosition
      );
      setTableBody(data);
    }
  }, [allData, contractForms, userType, gmPosition, userID, HRMPosition]);

  const handleViewDetails = (personData) => {
    // const employeeHistory = contractForms.filter(
    //   (val) =>
    //     (val.empID === personData.empID && val.genManager.trim() !== "") 
    // );
  
  //   setHistoryData(employeeHistory);
  //   console.log(personData);

  //   setSelectedPerson(personData);
  // };
  const employeeHistory = contractForms
  .filter((val) => {
    const emp = allData.find((d) => d.empID === val.empID);
    if (!emp) return false;

    const isSameEmployee = val.empID === personData.empID;
    const hasGenManager = val.genManager?.trim() !== "";
    const hasHrManager = val.hrManager?.trim() !== "";
    const skillPool = emp?.skillPool ? emp.skillPool.toUpperCase() : "";
const hasSkillPool = skillPool === "SKILLED" || skillPool === "UNSKILLED"
    return (
      isSameEmployee &&
      (hasGenManager ||
        (val.genManager?.trim() === "" && hasSkillPool && hasHrManager)) 
    );
  })
  .map((val) => {
    const emp = allData.find((d) => d.empID === val.empID);
    const skillPool = emp?.skillPool ? emp.skillPool.toUpperCase() : "";
    return { ...val, skillPool }; // ✅ attach skillPool to each history record
  });

setHistoryData(employeeHistory);
setSelectedPerson(personData);
  }

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handleNavigate = (id) => {
    closeModal();
    if (selectedPerson) {
      console.log(selectedPerson, "select");
      navigate("/contractForms", {
        state: { employeeData: selectedPerson, matchedID: id },
      });
    }
  };

  return (
    <div>
      <FilterTable
        tableBody={filteredData?.length ? filteredData : tableBody}
        startDate={startDate}
        endDate={endDate}
        tableHead={tableHead}
        title={title}
        allData={allData}
        // handleDate={handleDate}
        handleViewDetails={handleViewDetails}
        loading={dataLoading}
      />

      {selectedPerson && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/3 w-1/2 h-[600px] overflow-y-auto">
            <section className="flex justify-between gap-10 items-center mb-5">
              <div className="w-full flex-1 center">
                <img className="max-w-[200px]" src={logo} alt="Logo" />
              </div>
              <button className="text-[24px] rounded" onClick={closeModal}>
                <VscClose />
              </button>
            </section>
            <h2 className="text-xl font-semibold underline text-center mb-5">
              Person Details
            </h2>
            <p className="flex mb-2">
              <strong className="w-[30%]">Name</strong>{" "}
              <span className=" flex-1">: &nbsp;{selectedPerson.name}</span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Emp ID</strong>{" "}
              <span className=" flex-1">: &nbsp;{selectedPerson.empID}</span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Emp Badge No</strong>{" "}
              <span className=" flex-1">
                : &nbsp;{selectedPerson.empBadgeNo}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Nationality</strong>{" "}
              <span className=" flex-1">
                : &nbsp;{selectedPerson.nationality}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Date of Join</strong>{" "}
              <span className=" flex-1">
                : &nbsp;{selectedPerson.dateOfJoin}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Position:</strong>
              <span className=" flex-1">
                {" "}
                : &nbsp;
                {selectedPerson.position === "OTHER"
                  ? selectedPerson.otherPosition
                  : selectedPerson.position}
              </span>
            </p>
            <p className="flex mb-2">
              <strong className="w-[30%]">Department:</strong>
              <span className=" flex-1">
                {" "}
                : &nbsp;
                {selectedPerson.department === "OTHER"
                  ? selectedPerson.otherDepartment
                  : selectedPerson.department}
              </span>
            </p>
            {historyData.length > 0 && (
              <div className="mt-10">
                <h5 className="text-xl font-semibold text-center mb-5">
                  Contract Extension History
                </h5>
                <div className=" center">
                  <div className="py-7 max-w-[350px] w-full center shadow-[2px_2px_8px_rgba(0,0,0,0.3)] rounded-md">
                    <table className="border ">
                      <thead className="border ">
                        <tr className="bg-medium_grey  text-white  border">
                          <th className="border px-3 py-2">No of Time</th>
                          <th className="border px-3 py-2">Date</th>
                          {/* <th className="border px-3 py-2">Status</th> */}
                          <th className="border px-3 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {historyData.map((val, idx) => {
                          console.log(val, "dfghjk");

                          const hasGenManager = val.genManager?.trim() !== "";
                          const hasHrManager = val.hrManager?.trim() !== "";
const hasSkillPool =val?.skillPool?.toUpperCase() === "SKILLED" || val?.skillPool?.toUpperCase() === "UNSKILLED"
                          const showRow =
                           hasGenManager ||
                            (val.genManager?.trim() === "" &&
                             hasSkillPool && hasHrManager);

                          return (
                            showRow && (
                              <tr key={idx}>
                                <th className="border px-3 py-2 text-dark_grey">
                                  {idx + 1}
                                </th>
                                <th className="border px-3 py-2 text-dark_grey">
                                  {formatDate(val.oldCED)}
                                </th>
                                <th
                                  className="border px-3 py-2 text-blue underline cursor-pointer"
                                  onClick={() => handleNavigate(val.id)}
                                >
                                  View
                                </th>
                              </tr>
                            )
                          );
                        })}

                        {/* {historyData.map((val, idx) => {
                          return (
                            <tr key={idx}>
                              {(val.genManager ||
                                val.genManager.trim() !== "") && (
                                <th className="border px-3 py-2 text-dark_grey">
                                  {idx + 1}
                                </th>
                              )}
                              {(val.genManager ||
                                val.genManager.trim() !== "") && (
                                <>
                                  <th className="border px-3 py-2 text-dark_grey">
                                    {formatDate(val.oldCED)}
                                  </th>

                                  <th
                                    className="border px-3 py-2 text-blue underline cursor-pointer"
                                    onClick={() => handleNavigate(val.id)}
                                  >
                                    View
                                  </th>
                                </>
                              )}
                            </tr>
                          );
                        })} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* {!selectedPerson.gmStatus && (
              <div className="flex justify-evenly items-center p-3 mt-10">
                <button
                  className="primary_btn"
                  onClick={() =>
                    selectedPerson.gmStatus
                      ? handleNavigate()
                      : handleNavigate(selectedPerson.matchedID)
                  }
                >
                  Go to Contract Form
                </button>
              </div>
            )} */}
            {(() => {
              const hasHrManager = selectedPerson.hrmStatus?.trim() !== "";
              const gmApproved = !!selectedPerson.gmStatus;
              console.log(selectedPerson,"sele");
              
              const hasSkillPool =selectedPerson?.skillPool?.toUpperCase() === "SKILLED" || selectedPerson?.skillPool?.toUpperCase() === "UNSKILLED"
              console.log(hasHrManager, "manager");
              console.log(gmApproved, "GM");
              console.log(hasSkillPool, "skillpool",selectedPerson.skillPool);

              let showSection = false;

              if (hasSkillPool && hasHrManager) {
                // Case 1: SkillPool has a value (SKILLED / UNSKILLED)
                showSection = false; // show only if HRM not filled
              } else {
                // Case 2: SkillPool empty
                showSection = !gmApproved; // show only if GM not approved yet
              }

              return (
                showSection && (
                  <div className="flex justify-evenly items-center p-3 mt-10">
                    <button
                      className="primary_btn"
                      onClick={() =>
                        selectedPerson.gmStatus
                          ? handleNavigate()
                          : handleNavigate(selectedPerson.matchedID)
                      }
                    >
                      Go to Contract Form
                    </button>
                  </div>
                )
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
