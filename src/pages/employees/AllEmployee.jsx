import React, { useContext, useEffect, useState } from "react";
import searchIcon from "../../assets/recruitment/search.svg";
import { useNavigate } from "react-router-dom";
// import { getEmployeePersonalInfo, listEmployeePersonalDocs, listEmployeePersonalInfos } from '../../graphql/queries';
import { generateClient } from "@aws-amplify/api";
import { DataSupply } from "../../utils/DataStoredContext";
import { DetailsShowingForm } from "../../utils/details/DetailsShowingForm";
import { Pagination } from "../../pages/leaveManagement/Pagination";

import {Searchbox} from "../../utils/Searchbox"
const client = generateClient();

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
    NLAData
  } = useContext(DataSupply);
  const [searchTerm, setSearchTerm] = useState("");
  const [mergeData, setMergeData] = useState([]); // To store merged data
  const [filteredData, setFilteredData] = useState([]); // To store filtered data for search
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track error state
  const [showForm, setShowForm] = useState(false);
  const [passingValue, setPassingValue] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [paginatedData, setPaginatedData] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredData(filtered);
  };
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
      NLAData
    ) {
      // Merging all data based on empID
      const allDataValues = empPIData.map((empPIItem) => {
        const idMatch = IDData.find((item) => item.empID === empPIItem.empID) || {};
        const empPDMatch = empPDData.find((item) => item.empID === empPIItem.empID) || {};
        const sdnMatch = DNData.find((item) => item.empID === empPIItem.empID) || {};
        const bjlMatch = BJLData.find((item) => item.empID === empPIItem.empID) || {};
        const ppValidMatch = PPValidsData.find((item) => item.empID === empPIItem.empID) || {};
        const lmiMatch = LMIData.find((item) => item.empID === empPIItem.empID) || {};
        const empInsuranceMatch = EmpInsuranceData.find((item) => item.empID === empPIItem.empID) || {};
        const depInsuranceMatch = depInsuranceData.find((item) => item.empID === empPIItem.empID) || {};
        const nlaMatch = NLAData.find((item) => item.empID === empPIItem.empID) || {};
        const terminateMatch = terminateData.find((item) => item.empID === empPIItem.empID) || {};
        const leaveDetailsMatch = leaveDetailsData.find((item) => item.empID === empPIItem.empID) || {};
        const srMatch = SRData.find((item) => item.empID === empPIItem.empID) || {};
        const empLeaveStatusMatch = empLeaveStatusData.find((item) => item.empID === empPIItem.empID) || {};
        const educDetailsMatch = educDetailsData.find((item) => item.empID === empPIItem.empID) || {};
        const workInfoMatch = workInfoData.find((item) => item.empID === empPIItem.empID) || {};
        const userMatch = userData.find((item) => item.empID === empPIItem.empID) || {};

        return {
          ...empPIItem,
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
        };
      });

      const sorted = allDataValues.sort((a, b) =>
        a.empID.localeCompare(b.empID)
      );
      console.log(allDataValues, "kjhgfd");

      setMergeData(sorted);

      if (sorted.length > 0) {
        setLoading(false);
        setError(null);
      } else {
        setError("No data found.");
        setLoading(false);
      }
    } else {
      setLoading(true);
    }
  }, [
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
    NLAData
  ]);
  console.log(IDData);

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginated = mergeData.slice(startIndex, startIndex + rowsPerPage);
    setPaginatedData(paginated);
  }, [mergeData, currentPage, rowsPerPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleFormShow = (value) => {
    setShowForm(!showForm);
    setPassingValue(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');  // Adds leading zero if day is single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // getMonth() returns 0-11, so we add 1
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="bg-[#F5F6F1CC] w-full flex items-center flex-col h-screen pt-14">
      <div className="w-full px-10 flex justify-between items-center mb-10">
        <div className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
          All Employee Details
        </div>
        <div className="relative">
          <Searchbox
            type="text"
            placeholder="Search by Name or Position"
            newFormData={paginatedData}
            value={searchTerm}
            onChange={handleSearch}
            className="py-2 px-4 rounded-lg shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-4 h-4"
          />
        </div>
      </div>
      <div className=" overflow-x-auto  mt-8 w-[100%] ml-4 rounded-md">
        <div className="w-full px-4 max-h-[calc(70vh-7rem)] overflow-y-auto">
          <table className="w-full rounded-xl table-auto">
            <thead className="bg-[#939393] text-center text-white sticky top-0">
              <tr>
                <th className=" py-4 px-2 ">Employee Id</th>
                <th className="py-4 px-2 ">Badge No</th>
                <th className="py-4 px-2">Name</th>
                <th className="py-4 px-2 ">DOB</th>
                <th className="py-4 px-2">Nationality</th>
                <th className="py-4 px-2 ">Email</th>
                <th className="py-4 px-2 ">Contact No</th>
                {/* <th className="py-4 px-2 ">Action</th> */}
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedData.map((candidate, index) => (
                <tr
                  key={index}
                  className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
                  onClick={() => handleFormShow(candidate)}
                >
                  <td className=" py-4 px-4 ">{candidate?.empID}</td>
                  <td className=" py-4 px-4 ">{candidate?.empBadgeNo}</td>
                  <td className="py-4 px-4 ">{candidate?.name}</td>
                  <td className="py-4 px-4">{formatDate(candidate?.dob)}</td>

                  <td className="py-4 px-4">{candidate?.nationality}</td>
                  <td className="py-4 px-4 ">{candidate?.email}</td>
                  <td className="py-4 px-4 ">{candidate?.contactNo}</td>
                  {/* <td className="py-4 px-4 text-dark_skyBlue underline">
                    <button  onClick={() => handleFormShow(candidate)} className="underline">View</button>
                  </td> */}
                </tr>
              ))}
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
      <div className="flex justify-center">
        <div className="ml-[750px] flex justify-between mt-12 px-10">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(mergeData.length / rowsPerPage)}
            onPageChange={(newPage) => {
              if (
                newPage >= 1 &&
                newPage <= Math.ceil(mergeData.length / rowsPerPage)
              ) {
                setCurrentPage(newPage);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};