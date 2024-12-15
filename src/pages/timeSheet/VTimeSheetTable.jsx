import { useEffect, useState } from "react";

import { BlngTBody } from "./tableBody/BlngTBody";
import { HoTBody } from "./tableBody/HoTBody";
import { OffshoreTBody } from "./tableBody/OffshoreTBody";
import { OrmcTBody } from "./tableBody/OrmcTBody";
import { SbwTBody } from "./tableBody/SbwTBody";
import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
import "../../../src/index.css";
import { useLocation, useOutletContext } from "react-router-dom";

import { useTableFieldData } from "./customTimeSheet/UseTableFieldData";
import { UseScrollableView } from "./customTimeSheet/UseScrollableView";




export const VTimeSheetTable = (
  {
    // AllFieldData,
    // categoryFilter,
    // data,
    // handleScroll,
  }
) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState(null);
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const location = useLocation();
  const { fileData } = location.state || {};
  const [categoryFilter, setCategoryFilter] = useState(fileData.type);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const AllFieldData = useTableFieldData(categoryFilter);

  const { startDate, endDate, searchQuery } = useOutletContext();

  const convertStringToObject = (fetchedData) => {
    const processedData = fetchedData.map((item) => {
      const rawSheet = item.dailySheet;
      if (Array.isArray(rawSheet) && rawSheet.length > 0) {
        const rawData = rawSheet[0];
        const id = item.id;
        const Status = item.status;

        try {
          const cleanedData = rawData
            .replace(/^"|\s*'|\s*"$|\\'/g, "")
            .replace(/\\"/g, '"')
            .replace(/\\n/g, "")
            .replace(/\\\//g, "/");
          const arrayOfObjects = JSON.parse(cleanedData);
          const dataWithStatus = arrayOfObjects.map((obj) => ({
            ...obj,
            status: Status,
          }));
          return [{ id: id }, dataWithStatus];
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
        }
      }
      return null;
    });

    const addProKey = processedData
      .map((value) => ({
        id: value[0]?.id,
        data: value[1]?.filter(Boolean),
      }))
      .filter((item) => item.data?.length > 0);
    setData(addProKey);
    setSecondaryData(addProKey);

  };


  const { handleScroll, visibleData, setVisibleData } = UseScrollableView(
    data,
    "Manager"
  );

  useEffect(() => {
    if (!secondaryData) return;
    if (secondaryData && secondaryData.length > 0) {
      let filteredData = [...secondaryData];

      if (searchQuery) {
        filteredData = searchQuery.filter((fil) => fil);
      }

      if (startDate && endDate) {
        const start = new Date(startDate).toLocaleDateString().toString();
        const end = new Date(endDate).toLocaleDateString().toString();
        filteredData = filteredData.map((item) => ({
          id: item.id,
          data: item.data.filter((val) => {
            const itemDate = new Date(val.date || val.entDate)
              .toLocaleDateString()
              .toString();
            return itemDate >= start && itemDate <= end;
          }),
        }));
      }

      filteredData = filteredData.filter((item) => item.data !== null || item.data !== undefined );
      
      setData(filteredData);
    }
    setLoading(false);
  }, [secondaryData, startDate, endDate,searchQuery]);

  useEffect(() => {
    if (fileData) {
      convertStringToObject([fileData]);
      console.log(fileData);
    }
  }, [fileData]);
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [data]);

  return (
    <section>
      <article
        className={`flex justify-center text_size_5  text-dark_grey ${
          loading && "pt-6"
        }`}
      >
        {loading && <p>Please wait few seconds...</p>}
      </article>

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
                <tr>
                  <td colSpan="100%" className="text-center">
                    No headers available
                  </td>
                </tr>
              )}
            </tr>
          </thead>
          {categoryFilter === "BLNG" && (
            <BlngTBody
              data={visibleData}
              loading={loading}
              setTableData={setTableData}
            />
          )}
          {categoryFilter === "HO" && (
            <HoTBody
              data={visibleData}
              loading={loading}
              setTableData={setTableData}
            />
          )}
          {categoryFilter === "SBW" && (
            <SbwTBody
              data={visibleData}
              loading={loading}
              setTableData={setTableData}
            />
          )}
          {categoryFilter === "ORMC" && (
            <OrmcTBody
              data={visibleData}
              loading={loading}
              setTableData={setTableData}
            />
          )}
          {categoryFilter === "Offshore" && (
            <OffshoreTBody
              data={visibleData}
              loading={loading}
              setTableData={setTableData}
            />
          )}
        </table>
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

