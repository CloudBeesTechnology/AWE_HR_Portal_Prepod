import React, { useContext, useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { DataSupply } from "../../utils/DataStoredContext";
import { DetailsShowingForm } from "../../utils/details/DetailsShowingForm";
import { Pagination } from "../../pages/leaveManagement/Pagination";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../utils/Searchbox";
import { FiLoader } from "react-icons/fi";

export const AllEmployee = () => {
  const {
    userData,
    empLeaveStatusData,
    educDetailsData,
    empPDData,
    empPIData,
    IDData,
    workInfoData,
    terminateData,
    leaveDetailsData,
    SRData,
    DNData,
    BJLData,
    PPValidsData,
    LMIData,
    EmpInsuranceData,
    depInsuranceData,
    NLAData,
    SawpDetails,
    insuranceClaimsData,
    candyToEmp,
  } = useContext(DataSupply);

  const [mergeData, setMergeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [passingValue, setPassingValue] = useState([]);
  const [paginateLoading, setPaginateLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [paginatedData, setPaginatedData] = useState([]);
  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query) {
      const results = mergeData.filter(
        (employee) =>
          employee.empID?.toLowerCase().includes(query) ||
          employee.name?.toLowerCase().includes(query) ||
          employee.position?.toLowerCase().includes(query) ||
          employee.empBadgeNo?.toLowerCase().includes(query)
      );
      setFilteredData(results);
    } else {
      setFilteredData(mergeData);
    }
  };

  const searchUserList = async (data) => {
    try {
      const result = await data;
      setData(result);
    } catch (error) {
      console.error("Error search data", error);
    }
  };

  const getLatestValue = (field) =>
    Array.isArray(field) ? field[field.length - 1] : field;

  useEffect(() => {
    // Check if both data sets are available
    if (
      userData &&
      empLeaveStatusData &&
      educDetailsData &&
      empPDData &&
      empPIData &&
      IDData &&
      workInfoData &&
      terminateData &&
      leaveDetailsData &&
      SRData &&
      DNData &&
      BJLData &&
      PPValidsData &&
      LMIData &&
      EmpInsuranceData &&
      depInsuranceData &&
      NLAData &&
      SawpDetails &&
      insuranceClaimsData &&
      candyToEmp
    ) {
      // Merging all data based on empID
      const allDataValues = empPIData
        .map((empPIItem) => {
          const idMatch =
            IDData.find((item) => item.empID === empPIItem.empID) || {};
          const empPDMatch =
            empPDData.find((item) => item.empID === empPIItem.empID) || {};
          const sdnMatch =
            DNData.find((item) => item.empID === empPIItem.empID) || {};
          const bjlMatch =
            BJLData.find((item) => item.empID === empPIItem.empID) || {};
          const ppValidMatch =
            PPValidsData.find((item) => item.empID === empPIItem.empID) || {};
          const lmiMatch =
            LMIData.find((item) => item.empID === empPIItem.empID) || {};
          const empInsuranceMatch =
            EmpInsuranceData.find((item) => item.empID === empPIItem.empID) ||
            {};
          const depInsuranceMatch =
            depInsuranceData.find((item) => item.empID === empPIItem.empID) ||
            {};
          const nlaMatch =
            NLAData.find((item) => item.empID === empPIItem.empID) || {};
          const terminateMatch =
            terminateData.find((item) => item.empID === empPIItem.empID) || {};
          const leaveDetailsMatch =
            leaveDetailsData.find((item) => item.empID === empPIItem.empID) ||
            {};
          const srMatch =
            SRData.find((item) => item.empID === empPIItem.empID) || {};
          const empLeaveStatusMatch =
            empLeaveStatusData.find((item) => item.empID === empPIItem.empID) ||
            {};
          const educDetailsMatch =
            educDetailsData.find((item) => item.empID === empPIItem.empID) ||
            {};
          const workInfoMatch =
            workInfoData.find((item) => item.empID === empPIItem.empID) || {};
          const userMatch =
            userData.find((item) => item.empID === empPIItem.empID) || {};
          const swapMatch =
            SawpDetails.find((item) => item.empID === empPIItem.empID) || {};
          const insClaimMatch =
            insuranceClaimsData.find(
              (item) => item.empID === empPIItem.empID
            ) || {};
          const candyMatch =
            candyToEmp.find((item) => item.empID === empPIItem.empID) || {};
          return {
            ...idMatch,
            ...empPDMatch,
            ...sdnMatch,
            ...bjlMatch,
            ...ppValidMatch,
            ...lmiMatch,
            ...empInsuranceMatch,
            ...depInsuranceMatch,
            ...nlaMatch,
            ...terminateMatch,
            ...leaveDetailsMatch,
            ...srMatch,
            ...empLeaveStatusMatch,
            ...educDetailsMatch,
            ...workInfoMatch,
            ...userMatch,
            ...swapMatch,
            ...insClaimMatch,
            ...empPIItem,
            ...candyMatch,
            position: workInfoMatch.position,
          };
        })
        .filter((item) => item?.empID)
        .reduce((unique, item) => {
          if (!unique.some((emp) => emp.empID === item.empID)) {
            unique.push(item);
          }
          return unique;
        }, []);
      const sorted = allDataValues.sort((a, b) =>
        a.empID.localeCompare(b.empID)
      );

      setMergeData(sorted);
      setFilteredData(sorted);

      if (sorted.length > 0) {
        setLoading(false);
        setError(null);
      } else {
        setLoading(true);
      }
    } else {
      setError("No data found.");
    }
  }, [
    userData,
    empLeaveStatusData,
    educDetailsData,
    IDData,
    workInfoData,
    terminateData,
    leaveDetailsData,
    SRData,
    DNData,
    BJLData,
    PPValidsData,
    LMIData,
    EmpInsuranceData,
    depInsuranceData,
    NLAData,
    SawpDetails,
    insuranceClaimsData,
    empPDData,
    empPIData,
    candyToEmp,
  ]);

  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value.toLowerCase();

    if (selectedStatus === "all") {
      setFilteredData(mergeData);
    } else {
      const filtered = mergeData.filter((candidate) => {
        const contractType = getLatestValue(
          candidate.contractType
        )?.toLowerCase();
        const empType = getLatestValue(candidate.empType)?.toLowerCase();
        const workStatus = getLatestValue(candidate.workStatus)?.toLowerCase();
        const nationality = getLatestValue(
          candidate.nationality
        )?.toLowerCase();

        switch (selectedStatus) {
          case "local":
            return ["bruneian", "brunei pr"].includes(nationality);
          case "foreigner":
            return (
              nationality && !["bruneian", "brunei pr"].includes(nationality)
            );
          case "lpa":
            return contractType === "lpa";
          case "sawp":
            return contractType === "sawp";
          case "onshore":
            return empType === "onshore";
          case "offshore":
            return empType === "offshore";
          case "active":
          case "probationary":
          case "resignation":
          case "termination":
            return workStatus === selectedStatus;
          default:
            return false;
        }
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginated = filteredData.slice(startIndex, startIndex + rowsPerPage);
    setPaginatedData(paginated);

    // Update loading state when data is paginated
    if (paginated.length > 0) {
      setPaginateLoading(false);
    }
  }, [filteredData, currentPage, rowsPerPage]);

  // Conditional rendering for loading state
  if (paginateLoading) {
    return (
      <div className="flex items-center justify-center h-[82vh] bg-transparent">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-semibold">Loading </p>
          <p>
            <FiLoader className="animate-spin mt-[4px]" size={15} />
          </p>
        </div>
      </div>
    );
  }

  const handleFormShow = (value) => {
    setShowForm(!showForm);
    setPassingValue(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatusClass = (workStatus) => {
    const normalizedStatus = workStatus?.toLowerCase();

    return (
      {
        active: "text-[green]",
        probationary: "text-[#E8A317]",
        resignation: "text-red",
        termination: "text-[red]",
      }[normalizedStatus] || "text-medium_grey"
    );
  };

  // console.log("me",mergeData);

  return (
    <section className="bg-[#F5F6F1CC] w-full flex items-center flex-col h-screen pt-14">
      <div className="w-full px-10 flex justify-between items-center mb-10">
        <div className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
          All Employee Details
        </div>
        <div className="flex items-center space-x-4 ">
          <div className="relative">
            <Searchbox
              type="text"
              placeholder="Emp ID or Badge No or Name"
              allEmpDetails={mergeData}
              searchUserList={setFilteredData}
              className="py-2 px-4"
              // searchIcon2={<FiSearch />}
              searchIcon2={<IoSearch />}
            />
            {/* <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-4 h-4"
          /> */}
          </div>
          <select
            className="py-2.5 px-2 border border-lite_grey focus:outline-none focus:ring-0"
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Local">Local</option>
            <option value="Foreigner">Foreigner</option>
            <option value="LPA">LPA</option>
            <option value="SAWP">SAWP</option>
            <option value="OnShore">OnShore</option>
            <option value="OffShore">OffShore</option>
            <option value="Active">Active</option>
            <option value="Probationary">Probationary</option>
            <option value="Resignation">Resignation</option>
            <option value="Termination">Termination</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto mt-8 max-w-[100%] px-6">
        <div className="allEmployeeTable w-full max-h-[calc(70vh-7rem)] overflow-y-auto rounded-xl">
          <table className="w-full rounded-xl table-auto">
            <thead className="bg-[#939393] text-center text-white sticky top-0">
              <tr className="">
                <th className="py-4 px-2">S.No</th>
                <th className="py-4 px-2">Employee ID</th>
                <th className="py-4 px-2">Badge No</th>
                <th className="py-4 px-2">Name</th>
                <th className="py-4 px-2">DOB</th>
                <th className="py-4 px-2">Nationality</th>
                <th className="py-4 px-2">Contract</th>
                <th className="py-4 px-2">Type</th>
                <th className="py-4 px-2">Email</th>
                <th className="py-4 px-2">Contact No</th>
                <th className="py-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center text-sm font-semibold text-dark_grey cursor-pointer">
              {paginatedData.length > 0 ? (
                paginatedData.map((candidate, index) => {
                  const serialNumber =
                    (currentPage - 1) * rowsPerPage + index + 1;
                  return (
                    <tr
                      key={index}
                      className="border-b-2 bg-white border-[#C7BCBC] text-[13px] text-[#303030] hover:bg-medium_blue"
                      onClick={() => {
                        handleFormShow(candidate);
                      }}
                    >
                      <td className="py-4 px-4 max-w-[50px] min-w-[50px]  overflow-hidden">
                        {serialNumber}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {candidate?.empID || "N/A"}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {candidate?.empBadgeNo || "N/A"}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px] break-words overflow-hidden ">
                        {candidate?.name || "N/A"}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {formatDate(candidate?.dob || "N/A")}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {candidate?.nationality || "N/A"}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {candidate?.contractType?.[
                          candidate.contractType.length - 1
                        ] || "N/A"}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {candidate?.empType?.[candidate.empType.length - 1] ||
                          "N/A"}
                      </td>
                      <td className="py-4 px-4 max-w-[150px] min-w-[150px] break-words  overflow-hidden">
                        {candidate?.email || "N/A"}
                      </td>

                      <td className="py-4 px-4 max-w-[150px] min-w-[150px]  overflow-hidden">
                        {candidate?.contactNo || "N/A"}
                      </td>
                      <td
                        className={`uppercase py-4 px-4 font-bold max-w-[150px] min-w-[150px] ${getStatusClass(
                          candidate?.workStatus?.[
                            candidate?.workStatus.length - 1
                          ] || "N/A"
                        )}`}
                      >
                        {candidate?.workStatus?.[
                          candidate?.workStatus.length - 1
                        ] || "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="11" className="py-4 px-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <DetailsShowingForm
          passingValue={passingValue}
          handleFormShow={handleFormShow}
        />
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center items-center w-full">
        {paginatedData.length > 0 && (
          <div className="flex mt-12 px-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / rowsPerPage)}
              onPageChange={(newPage) => {
                if (
                  newPage >= 1 &&
                  newPage <= Math.ceil(filteredData.length / rowsPerPage)
                ) {
                  setCurrentPage(newPage);
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
