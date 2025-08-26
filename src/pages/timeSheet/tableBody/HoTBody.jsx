import { useEffect } from "react";

export const HoTBody = ({
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

      return `${month}/${year}/${day}`; // 'M/D/YYYY'
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
                  className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]   hover:bg-[#f1f5f9] cursor-pointer"
                  onClick={() => {
                    assignObjectFun(m, "HO");
                    toggleFunction();
                    editFormTitleFunc("View Form");
                  }}
                >
                  {/* <td className="text-start px-4 flex-1">{index + 1}</td> */}
                  <td className="text-start px-4 flex-1">{serialNumber}</td>
                  <td className="text-center px-4 flex-1">{m.ctr}</td>
                  <td className="text-center px-4 flex-1">{m.empDept}</td>
                  <td className="text-center px-4 flex-1">{m.empID}</td>
                  <td className="text-center px-4 flex-1">{m.empBadgeNo}</td>
                  <td className="text-center px-4 flex-1">{m.empName}</td>
                  <td className="text-center px-4 flex-1">
                    {convertToISODate(m.date)}
                  </td>
                  <td className="text-center px-4 flex-1">{m.onAM || 0}</td>
                  <td className="text-center px-4 flex-1">{m.offAM || 0}</td>
                  <td className="text-center px-4 flex-1">{m.onPM || 0}</td>
                  <td className="text-center px-4 flex-1">{m.offPM || 0}</td>
                  <td className="text-center px-4 flex-1">{m.inTime || 0}</td>
                  <td className="text-center px-4 flex-1">{m.outTime || 0}</td>
                  <td className="text-center px-4 flex-1">
                    {m.totalInOut || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {m.allDayHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">{m.netMins || 0}</td>
                  <td className="text-center px-4 flex-1">{m.totalHrs || 0}</td>
                  <td className="text-center px-4 flex-1">
                    {m.normalWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {m.actualWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">{m.otTime || 0}</td>
                  {/* <td className="text-center px-4 flex-1">{m.remarks}</td> */}
                  <td className="text-center px-4 flex-1">
                    <div className="truncate w-[100px]" title={m.remarks}>
                      {m.remarks}
                    </div>
                  </td>
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
                colSpan="15"
                className="text-center text-dark_ash text_size_5 bg-white"
              >
                {/* <p className="p-5">No Table Data Available Here</p> */}
              </td>
            </tr>
          )}
    </tbody>
  );
};
