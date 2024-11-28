// import { useEffect, useState } from "react";
// import { BlngTBody } from "./tableBody/BlngTBody";
// import { HoTBody } from "./tableBody/HoTBody";
// import { OffshoreTBody } from "./tableBody/OffshoreTBody";
// import { OrmcTBody } from "./tableBody/OrmcTBody";
// import { SbwTBody } from "./tableBody/SbwTBody";
// import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
// import "../../../src/index.css";

// export const VTimeSheetTable = ({
//   AllFieldData,
//   categoryFilter,
//   data,
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [tableData, setTableData] = useState(null);

//   useEffect(() => {
//     if (data) {
//       setTimeout(() => {
//         setLoading(false);
//       }, 5000);
//     }
//   }, [data]);

//   const useDownloadFunc = (res) => {
//     console.log(res);
//     setTableData(res);
//   };

//   return (
//     <section>
//       <article
//         className={`flex justify-center text_size_5 text-dark_grey ${
//           loading && "pt-6"
//         }`}
//       >
//         {loading && <p>Please wait a few seconds...</p>}
//       </article>

//       <div className="table-container">
//         <table className="styled-table">
//           <thead className="sticky-header">
//             <tr className="text_size_5">
//               <td className="px-5 text-center">S No.</td>

//               {AllFieldData?.tableHeader?.map((header, index) => (
//                 <td key={index} className="px-4 flex-1 text-center">
//                   {header}
//                 </td>
//               )) ?? (
//                 <tr>
//                   <td colSpan="100%" className="text-center">
//                     No headers available
//                   </td>
//                 </tr>
//               )}
//               <td className="px-5 text-center">STATUS</td>
//             </tr>
//           </thead>

//           {categoryFilter === "BLNG" && (
//             <BlngTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "HO" && (
//             <HoTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "SBW" && (
//             <SbwTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "ORMC" && (
//             <OrmcTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "Offshore" && (
//             <OffshoreTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//         </table>
//       </div>

//       <div className="flex justify-center p-7">
//         <button
//           className="rounded px-3 py-2 bg-[#FEF116] text_size_5 text-dark_grey"
//           onClick={() => {
//             ExportTableToExcel(categoryFilter || "TimeSheet", tableData);
//           }}
//         >
//           Download
//         </button>
//       </div>
//     </section>
//   );
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
import { useEffect, useState } from "react";

import { BlngTBody } from "./tableBody/BlngTBody";
import { HoTBody } from "./tableBody/HoTBody";
import { OffshoreTBody } from "./tableBody/OffshoreTBody";
import { OrmcTBody } from "./tableBody/OrmcTBody";
import { SbwTBody } from "./tableBody/SbwTBody";
import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
import "../../../src/index.css";
export const VTimeSheetTable = ({
  AllFieldData,
  categoryFilter,
  data,
  // loading,
}) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState(null);
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [data]);
  const useDownloadFunc = (res) => {
    console.log(res);
    setTableData(res);
  };

  return (
    <section>
      <article
        className={`flex justify-center text_size_5  text-dark_grey ${
          loading && "pt-6"
        }`}
      >
        {loading && <p>Please wait few seconds...</p>}
      </article>

      <div className="table-container">
        {/* <div className="mt-9  max-h-[500px] table-wrp block overflow-x-scroll border-2 border-lite_grey"> */}
        {/* w-[1190px] */}
        {/* <table className="styled-table text-center w-full rounded-md overflow-hidden shadow-md overflow-y-auto"> */}
        <table className="styled-table">
          <thead className="sticky-header">
            <tr className="text_size_5">
              <td className="px-5 text-center">S No.</td>

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
              <td className="px-5 text-center">STATUS</td>
            </tr>
          </thead>
          {categoryFilter === "BLNG" && (
            <BlngTBody
              data={data}
              loading={loading}
              useDownloadFunc={useDownloadFunc}
            />
          )}
          {categoryFilter === "HO" && (
            <HoTBody
              data={data}
              loading={loading}
              useDownloadFunc={useDownloadFunc}
            />
          )}
          {categoryFilter === "SBW" && (
            <SbwTBody
              data={data}
              loading={loading}
              useDownloadFunc={useDownloadFunc}
            />
          )}
          {categoryFilter === "ORMC" && (
            <OrmcTBody
              data={data}
              loading={loading}
              useDownloadFunc={useDownloadFunc}
            />
          )}
          {categoryFilter === "Offshore" && (
            <OffshoreTBody
              data={data}
              loading={loading}
              useDownloadFunc={useDownloadFunc}
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
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// import { useEffect, useState } from "react";
// import { BlngTBody } from "./tableBody/BlngTBody";
// import { HoTBody } from "./tableBody/HoTBody";
// import { OffshoreTBody } from "./tableBody/OffshoreTBody";
// import { OrmcTBody } from "./tableBody/OrmcTBody";
// import { SbwTBody } from "./tableBody/SbwTBody";
// import { ExportTableToExcel } from "./customTimeSheet/DownloadTableToExcel";
// import "../../../src/index.css";
// export const VTimeSheetTable = ({
//   AllFieldData,
//   categoryFilter,
//   data,
//   // loading,
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [tableData, setTableData] = useState(null);
//   useEffect(() => {
//     if (data) {
//       setTimeout(() => {
//         setLoading(false);
//       }, 5000);
//     }
//   }, [data]);
//   const useDownloadFunc = (res) => {
//     console.log(res);
//     setTableData(res);
//   };

//   return (
//     <section>
//       <article
//         className={`flex justify-center text_size_5  text-dark_grey ${
//           loading && "pt-6"
//         }`}
//       >
//         {loading && <p>Please wait few seconds...</p>}
//       </article>

//       <div className=" mt-9  max-h-[500px] table-wrp block overflow-x-scroll border-2 border-lite_grey">
//         {/* <div className="mt-9  max-h-[500px] table-wrp block overflow-x-scroll border-2 border-lite_grey"> */}
//         {/* w-[1190px] */}
//         {/* <table className="styled-table text-center w-full rounded-md overflow-hidden shadow-md overflow-y-auto"> */}
//         <table className="text-center w-full rounded-md overflow-hidden shadow-md overflow-y-auto ">
//           <thead className="sticky top-0 ">
//             <tr className="bg-lite_grey h-10 text-dark_grey text_size_5 text-start ">
//               <td className="px-5 text-center">S No.</td>

//               {AllFieldData?.tableHeader?.map((header, index) => (
//                 <td key={index} className="px-4 flex-1 text-center">
//                   {header}
//                 </td>
//               )) ?? (
//                 <tr>
//                   <td colSpan="100%" className="text-center">
//                     No headers available
//                   </td>
//                 </tr>
//               )}
//               <td className="px-5 text-center">STATUS</td>
//             </tr>
//           </thead>
//           {categoryFilter === "BLNG" && (
//             <BlngTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "HO" && (
//             <HoTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "SBW" && (
//             <SbwTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "ORMC" && (
//             <OrmcTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//           {categoryFilter === "Offshore" && (
//             <OffshoreTBody
//               data={data}
//               loading={loading}
//               useDownloadFunc={useDownloadFunc}
//             />
//           )}
//         </table>
//       </div>
//       {/* </div> */}
//       <div className="flex justify-center p-7">
//         <button
//           className="rounded px-3 py-2 bg-[#FEF116] text_size_5 text-dark_grey"
//           onClick={() => {
//             ExportTableToExcel(categoryFilter || "TimeSheet", tableData);
//           }}
//         >
//           Download
//         </button>
//       </div>
//     </section>
//   );
// };
