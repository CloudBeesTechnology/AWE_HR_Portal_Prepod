import { useEffect } from "react";

export const BlngTBody = ({ data, loading, setTableData }) => {
  useEffect(() => {
    if (loading === false) {
      const rows = document.querySelectorAll("tbody tr");
      const tableData = Array.from(rows).map((row) => {
        const cells = row.querySelectorAll("td");
        return Array.from(cells).map((cell) => cell.innerText);
      });
      const handleDown = () => {
        setTimeout(() => {
          if (tableData) {
            setTableData(tableData);
          }
        }, 1000);
      };
      handleDown();
    }
  }, [loading, data]);

  return (
    <tbody className="">
      {loading === false && data && data?.length > 0
        ? data.map((value, index) => {
            const renderRows = (rowData, ind) => {
              console.log(rowData.fidNo)
              return (
                <tr
                  key={index}
                  className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]"
                >
                  <td className="text-start px-4 flex-1">{index + 1}</td>
                  <td className="text-start px-4 flex-1">{rowData.fidNo}</td>
                  <td className="text-center px-4 flex-1">{rowData.empName}</td>
                  <td className="text-center px-4 flex-1">{rowData.date}</td>
                  <td className="text-center px-4 flex-1">{rowData.inTime?.replace(/[\[\]]/g, "") || ""}</td>
                  <td className="text-center px-4 flex-1">{rowData.outTime?.replace(/[\[\]]/g, "") || ""}</td>
                  <td className="text-center px-4 flex-1">
                    {rowData.day || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData.avgDailyTD || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData.totalHrs || ""}
                  </td>
                  <td className="text-center px-4 flex-1">{rowData.aweSDN}</td>

                  <td className="text-center px-4 flex-1">
                    {rowData.normalWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData.actualWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">{rowData.totalOT || 0}</td>
                  <td className="text-center px-4 flex-1">{rowData.remarks}</td>
                  {/* <td
                    className={`text-center px-4 flex-1 ${
                      rowData.status === "Approved"
                        ? "text-[#0CB100]"
                        : "text_size_8"
                    }`}
                  >
                    {rowData.status}
                  </td> */}
                </tr>
              );
            };

            return renderRows(value);
          })
        : (
            <tr>
              <td
                colSpan="100%"
                className="text-center text-dark_ash text_size_5 bg-white"
              >
                <p className="p-5">Please wait few seconds...</p>
              </td>
            </tr>
            
          ) ?? (
            <tr>
              <td
                colSpan="50"
                className="text-center text-dark_ash text_size_5 bg-white"
              >
                {/* <p className="p-5">No Table Data Available Here.</p> */}
              </td>
            </tr>
          )}
    </tbody>
  );
};
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// import { useEffect } from "react";

// export const BlngTBody = ({ data, loading, useDownloadFunc }) => {

//   useEffect(() => {
//     if (loading === false) {
//       const rows = document.querySelectorAll("tbody tr");
//       const tableData = Array.from(rows).map((row) => {
//         const cells = row.querySelectorAll("td");
//         return Array.from(cells).map((cell) => cell.innerText);
//       });

//       setTimeout(() => {
//         useDownloadFunc(tableData);
//       }, 1000);
//     }
//   }, [loading, data]);
//   return (
//     <tbody className="overflow-y-auto">
//       {loading === false && data && data?.length > 0 ? (
//         data.map((value, index) => {
//           const renderRows = (rowData, ind) => {
//             return (
//               <tr
//                 key={ind}
//                 className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]"
//               >
//                 <td className="text-start px-4 flex-1">{ind + 1}</td>
//                 <td className="text-start px-4 flex-1">{rowData.fid}</td>
//                 <td className="text-center px-4 flex-1">{rowData.name}</td>
//                 <td className="text-center px-4 flex-1">{rowData.entDate}</td>
//                 <td className="text-center px-4 flex-1">{rowData.entDT}</td>
//                 <td className="text-center px-4 flex-1">{rowData.exitDT}</td>
//                 <td className="text-center px-4 flex-1">{rowData.day || 0}</td>
//                 <td className="text-center px-4 flex-1">
//                   {rowData.avgTotalDay || 0}
//                 </td>
//                 <td className="text-center px-4 flex-1">
//                   {rowData.totalhrs || ""}
//                 </td>
//                 <td className="text-center px-4 flex-1">{rowData.workDN}</td>

//                 <td className="text-center px-4 flex-1">
//                   {rowData.normalWhrsPerDay || 0}
//                 </td>
//                 <td className="text-center px-4 flex-1">
//                   {rowData.workhrs || 0}
//                 </td>
//                 <td className="text-center px-4 flex-1">{rowData.OT || 0}</td>
//                 <td className="text-center px-4 flex-1">{rowData.remarks}</td>
//                 <td
//                   className={`text-center px-4 flex-1 ${
//                     rowData.status === "Approved"
//                       ? "text-[#0CB100]"
//                       : "text_size_8"
//                   }`}
//                 >
//                   {rowData.status}
//                 </td>
//               </tr>
//             );
//           };

//           return value.data.map(renderRows);
//         })
//       ) : (
//         <tr>
//           <td
//             colSpan="15"
//             className="px-6 py-6 text-center text-dark_ash text_size_5"
//           >
//             <p>No Table Data Available Here</p>
//           </td>
//         </tr>
//       )}
//     </tbody>
//   );
// };
