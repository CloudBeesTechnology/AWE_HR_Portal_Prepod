import { useEffect, useLayoutEffect, useState } from "react";

import { BlngTBody } from "./tableBody/BlngTBody";
import { HoTBody } from "./tableBody/HoTBody";
import { OffshoreTBody } from "./tableBody/OffshoreTBody";
import { OrmcTBody } from "./tableBody/OrmcTBody";
import { SbwTBody } from "./tableBody/SbwTBody";

import "../../../src/index.css";
import { useNavigate } from "react-router-dom";

import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";

import { useTempID } from "../../utils/TempIDContext";
import { ViewTimeSheet } from "./ViewTimeSheet";
import { Pagination } from "./timeSheetSearch/Pagination";
import { EditTimeSheet } from "./EditTimeSheet";
import { ViewTimesheetDetails } from "./customTimeSheet/ViewTimesheetDetails";

export const VTimeSheetTable = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  // const [tableData, setTableData] = useState(null);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState([]);
  const [toggleForViewTS, setToggleForViewTS] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  // const [categoryFilters, setCategoryFilters] = useState(null);
  const [editFormTitle, setEditFormTitle] = useState("Edit Form");

  const [currentPage, setCurrentPage] = useState(1);

  const [fileType, setFileType] = useState("");
  const AllfieldData = useTableFieldData(fileType);

  const {
    showListTimeSheet,
    timeSheetFileData,
    startDate,
    endDate,
    searchQuery,
    setCategoryFilters,
    categoryFilters,
    setTableData,
    tableData,
  } = useTempID();
  const nav = useNavigate();

  useLayoutEffect(() => {
    if (showListTimeSheet === true) {
      const currentPath = window.location.pathname;
      if (
        currentPath === "/viewTsheetDetails" ||
        currentPath === "/viewTsheetDetails/"
      ) {
        nav("/viewTimesheet");
      }
    }
  }, []);

  useEffect(() => {
    if (timeSheetFileData) {
      localStorage.setItem("timeSheetData", timeSheetFileData?.updatedAt);
    }
  }, [timeSheetFileData]);

  const AllFieldData = useTableFieldData(categoryFilters);

  const safeData = data || [];
  const itemsPerPage = 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = safeData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(safeData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // currentData.sort((a, b) => a.empName.localeCompare(b.empName));
  let visibleData = currentData;

  useEffect(() => {
    if (secondaryData && secondaryData.length > 0) {
      setCurrentPage(1);

      setLoading(false);

      let filteredData = [...secondaryData];

      if (searchQuery) {
        filteredData = searchQuery;
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        filteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.date);
          itemDate?.setHours(0, 0, 0, 0);
          start?.setHours(0, 0, 0, 0);
          end?.setHours(0, 0, 0, 0);
          return itemDate >= start && itemDate <= end;
        });
      }

      setData(filteredData);

      setLoading(false);
    }
  }, [secondaryData, startDate, endDate, searchQuery]);

  useEffect(() => {
    if (!timeSheetFileData) return;
    if (timeSheetFileData) {
      setData(timeSheetFileData?.updatedAt);
      setSecondaryData(timeSheetFileData?.updatedAt);

      setCategoryFilters(timeSheetFileData?.fileType);
    }
  }, [timeSheetFileData]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [data]);

  const toggleFunction = () => {
    setToggleForViewTS(!toggleForViewTS);
  };

  const assignObjectFun = async (obj, type) => {
    if (obj) {
      const result = await ViewTimesheetDetails(obj, type);
      setFileType(type);
      setViewDetails(result);
    }
  };

  const editFormTitleFunc = (title) => {
    if (title === "View Form") {
      setEditFormTitle(title);
    } else {
      setEditFormTitle("Edit Form");
    }
  };
  return (
    <section className="h-screen bg-[#fafaf6] ">
      <ViewTimeSheet />

      {/* </header> */}
      <div className="screen-size top-0 ">
        <div className="table-container ">
          <table className="styled-table  w-[100%]">
            <thead className="sticky-header">
              <tr className="text_size_7">
                {categoryFilters !== "HO" && (
                  <td className="px-5 text-center">S No.</td>
                )}

                {AllFieldData?.tableHeader?.map((header, index) => (
                  <td key={index} className="px-4 flex-1 text-center">
                    {header}
                  </td>
                )) ?? (
                  <td colSpan="100%" className="text-center">
                    No headers available
                  </td>
                )}
              </tr>
            </thead>
            {categoryFilters === "BLNG" && (
              <BlngTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
                assignObjectFun={assignObjectFun}
                toggleFunction={toggleFunction}
              />
            )}
            {categoryFilters === "HO" && (
              <HoTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
                assignObjectFun={assignObjectFun}
                toggleFunction={toggleFunction}
              />
            )}
            {categoryFilters === "SBW" && (
              <SbwTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
                assignObjectFun={assignObjectFun}
                toggleFunction={toggleFunction}
              />
            )}
            {categoryFilters === "ORMC" && (
              <OrmcTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
                assignObjectFun={assignObjectFun}
                toggleFunction={toggleFunction}
              />
            )}

            {categoryFilters === "Offshore's ORMC" && (
              <OffshoreTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
                assignObjectFun={assignObjectFun}
                toggleFunction={toggleFunction}
                editFormTitleFunc={editFormTitleFunc}
              />
            )}
            {categoryFilters === "Offshore" && (
              <OffshoreTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
                assignObjectFun={assignObjectFun}
                toggleFunction={toggleFunction}
                editFormTitleFunc={editFormTitleFunc}
              />
            )}
          </table>
        </div>
      </div>
      {/* </div> */}

      <div className="flex justify-center py-7">
        {visibleData.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>
      {toggleForViewTS && viewDetails && (
        <EditTimeSheet
          fieldObj={AllfieldData?.fieldObj || {}}
          fields={AllfieldData?.fields || []}
          tableHeader={AllfieldData?.tableHeader || []}
          toggleFunction={toggleFunction}
          titleName={fileType}
          Position="Manager"
          editObject={viewDetails}
          editFormTitle={editFormTitle}
        />
      )}
    </section>
  );
};
