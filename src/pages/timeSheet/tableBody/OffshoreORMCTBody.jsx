import { useEffect } from "react";

export const OffshoreORMCTBody = ({
  data,
  loading,
  setTableData,
  message,
  assignObjectFun,
  toggleFunction,
  editFormTitleFunc,
  itemsPerPage,
  currentPage,
}) => {
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

  const convertToISODate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("/");

      return `${month}/${year}/${day}`;
    } catch {}
  };
  return (
    <tbody>
      {loading === false && data && data?.length > 0
        ? data.map((value, index) => {
            const renderRows = (m, ind) => {
              const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
              return (
                <tr
                  key={index}
                  className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]  hover:bg-[#f1f5f9] cursor-pointer"
                  onClick={() => {
                    assignObjectFun(m, "Offshore's ORMC");
                    toggleFunction();
                    editFormTitleFunc?.("View Form");
                  }}
                >
                  <td className="text-start px-4 flex-1">{serialNumber}</td>
                  <td className="text-start px-4 flex-1">{m.empName}</td>
                  <td className="text-start px-4 flex-1">{m.trade}</td>
                  <td className="text-center px-4 flex-1">{m.fidNo}</td>
                  <td className="text-center px-4 flex-1">{m.location}</td>
                  <td className="text-center px-4 flex-1">
                    {convertToISODate(m.date)}
                  </td>
                  <td className="text-center px-4 flex-1">{m.totalNT || 0}</td>
                  <td className="text-center px-4 flex-1">{m.totalOT || 0}</td>
                  <td className="text-center px-4 flex-1">
                    {m.totalNTOT || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {m.normalWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {m.actualWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">{m.otTime || 0}</td>
                  <td className="text-center px-4 flex-1">{m.remarks}</td>
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
                <p className="p-5">{message || "No data available."}</p>
              </td>
            </tr>
          ) ?? (
            <tr>
              <td
                colSpan="100%"
                className="text-center text-dark_ash text_size_5 bg-white"
              >
                {/* <p className="p-5">No Table Data Available Here</p> */}
              </td>
            </tr>
          )}
    </tbody>
  );
};
