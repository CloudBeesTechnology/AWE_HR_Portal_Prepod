import { useEffect, useLayoutEffect, useState } from "react";

import { BlngTBody } from "./tableBody/BlngTBody";
import { HoTBody } from "./tableBody/HoTBody";
import { OffshoreTBody } from "./tableBody/OffshoreTBody";
import { OrmcTBody } from "./tableBody/OrmcTBody";
import { SbwTBody } from "./tableBody/SbwTBody";
import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
import "../../../src/index.css";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";
import { useTempID } from "../../utils/TempIDContext";
import { ViewTimeSheet } from "./ViewTimeSheet";

export const VTimeSheetTable = (
  {
    // AllFieldData,
    // categoryFilter,
    // data,
    // handleScroll,
  }
) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [tableData, setTableData] = useState(null);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState(null);
  const savedData = localStorage.getItem("timeSheetData");
  // console.log(savedData)
  const {
    showListTimeSheet,
    timeSheetFileData,
    startDate,
    endDate,
    searchQuery,
  } = useTempID();
const nav=useNavigate();
  // console.log(typeof savedData === "object", Array.isArray(savedData));
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  useLayoutEffect(() => {
    if (showListTimeSheet === true) {
      const currentPath = window.location.pathname;
      if (currentPath === "/viewTsheetDetails" || currentPath === "/viewTsheetDetails/") {
        // window.history.replaceState(null, "", "/viewTimesheet"); // Replace URL in history
      nav("/viewTimesheet");
        // window.location.href = "/viewTimesheet";
        // window.location.reload(); // Reload to apply changes
   
      }
      
    }
  }, []);

  useEffect(() => {
    if (timeSheetFileData) {
      localStorage.setItem("timeSheetData", timeSheetFileData?.updatedAt);
      // console.log(savedData?.updatedAt)
     
    }
  }, [timeSheetFileData]);
  
  const AllFieldData = useTableFieldData(categoryFilter);
      console.log(AllFieldData);
 
  // const { startDate, endDate, searchQuery } = useOutletContext();

  // const convertStringToObject = (fetchedData) => {
  //   const processedData = fetchedData.map((item) => {
  //     const rawSheet = item.dailySheet;
  //     if (Array.isArray(rawSheet) && rawSheet.length > 0) {
  //       const rawData = rawSheet[0];
  //       const id = item.id;
  //       const Status = item.status;

  //       try {
  //         const cleanedData = rawData
  //           .replace(/^"|\s*'|\s*"$|\\'/g, "")
  //           .replace(/\\"/g, '"')
  //           .replace(/\\n/g, "")
  //           .replace(/\\\//g, "/");
  //         const arrayOfObjects = JSON.parse(cleanedData);
  //         const dataWithStatus = arrayOfObjects.map((obj) => ({
  //           ...obj,
  //           status: Status,
  //         }));
  //         return [{ id: id }, dataWithStatus];
  //       } catch (error) {
  //         console.error("Error parsing JSON:", error);
  //         return null;
  //       }
  //     }
  //     return null;
  //   });

  //   const addProKey = processedData
  //     .map((value) => ({
  //       id: value[0]?.id,
  //       data: value[1]?.filter(Boolean),
  //     }))
  //     .filter((item) => item.data?.length > 0);
  //   setData(addProKey);
  //   setSecondaryData(addProKey);

  // };

  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    "TimeKeeper"
  );

  // useEffect(() => {
  //   if (!secondaryData || secondaryData.length === 0) return;
  //   // if (secondaryData && secondaryData.length > 0) {
  //   let filteredData = [...secondaryData];

  //   if (searchQuery) {
  //     filteredData = searchQuery.filter((fil) => fil);
  //   }

  //   if (!startDate && !endDate) {
  //     setData(filteredData);
  //   } else if (startDate && endDate) {
  //     const start = new Date(startDate).toLocaleDateString().toString();
  //     const end = new Date(endDate).toLocaleDateString().toString();

  //     filteredData = filteredData.filter((val) => {
  //       const itemDate = new Date(val.date).toLocaleDateString().toString();
  //       return itemDate >= start && itemDate <= end;
  //     });
  //     console.log(filteredData);
  //     if (!filteredData[0]) {
  //       setVisibleData([]);
  //     } else {
  //       setData(filteredData);
  //     }
  //   }

  //   // }
  //   setLoading(false);
  // }, [secondaryData, startDate, endDate, searchQuery]);

  // console.log(fileData)

  console.log(secondaryData);
  useEffect(() => {
    if (!secondaryData || secondaryData.length === 0) {
      setData([]);
      setVisibleData([]);
      setLoading(false);
      setMessage("No matching results found.");
      return;
    }

    let filteredData = [...secondaryData];

    // Filter by search query
    if (searchQuery) {
      filteredData = searchQuery;

      setVisibleData(filteredData);
    }

    // Filter by date range
    if (startDate && endDate) {
      console.log(startDate && endDate)
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date.split("/").reverse().join("-")); // Converts '18/10/2024' to '2024-10-18'
        return itemDate >= start && itemDate <= end;
      });
    }

    // Final filtered data handling
    setData(filteredData);
    setVisibleData(filteredData.length > 0 ? filteredData : []);
    setLoading(false);
  }, [secondaryData, startDate, endDate, searchQuery]);

  useEffect(() => {
    if (!timeSheetFileData) return;
    if (timeSheetFileData) {
      setData(null);
      setSecondaryData(null);
      setVisibleData([]);
      setData(timeSheetFileData?.updatedAt);
      setSecondaryData(timeSheetFileData?.updatedAt);
      // setData(fileData?.updatedAt);
      // setSecondaryData(fileData?.updatedAt);
      setCategoryFilter(timeSheetFileData?.fileType);
      
      
    }
  }, [timeSheetFileData]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        // setMessage("Please wait few seconds.");
        setLoading(false);
      }, 3000);
    } else {
      setTimeout(() => {
        // setMessage("No Table Data Available Here.");
        setLoading(false);
      }, 3000);
    }
  }, [data]);

  return (
    // <section className={`${showListTimeSheet ? "hidden" : "h-screen bg-[#fafaf6]"}`}>
    <section className="h-screen bg-[#fafaf6]">
      {/* <article
        className={`flex justify-center text_size_5  text-dark_grey ${
          loading && "pt-6"
        }`}
      >
        {loading && <p>Please wait few seconds...</p>}
      </article> */}
      <ViewTimeSheet />
      <div className="screen-size">
        <div className="table-container" onScroll={handleScroll}>
          {/* <div className="mt-9  max-h-[500px] table-wrp block overflow-x-scroll border-2 border-lite_grey"> */}
          {/* w-[1190px] */}
          {/* <table className="styled-table text-center w-full rounded-md overflow-hidden shadow-md overflow-y-auto"> */}
          <table className="styled-table">
            <thead className="sticky-header">
              <tr className="text_size_7">
                {categoryFilter !== "HO" && (
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
            {categoryFilter === "BLNG" && (
              <BlngTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
              />
            )}
            {categoryFilter === "HO" && (
              <HoTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
              />
            )}
            {categoryFilter === "SBW" && (
              <SbwTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
              />
            )}
            {categoryFilter === "ORMC" && (
              <OrmcTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
              />
            )}
            {categoryFilter === "Offshore" && (
              <OffshoreTBody
                data={visibleData}
                loading={loading}
                setTableData={setTableData}
                message={message}
              />
            )}
          </table>
        </div>
      </div>
      {/* </div> */}
      <div className="flex justify-center p-7">
        <button
          className="rounded px-3 py-2 bg-[#FEF116] text_size_5 text-dark_grey"
          onClick={() => {
            ExportTableToExcel(categoryFilter || "TimeSheet", tableData);
          }}
        >
          Download
        </button>
      </div>
    </section>
  );
};
