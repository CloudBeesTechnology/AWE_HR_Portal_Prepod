import { useEffect } from "react";

export const BlngTBody = ({
  data,
  loading,
  setTableData,
  message,
  assignObjectFun,
  toggleFunction,
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

  const ENTRANCEDATETIME = (getDate) => {
    try {
      const inputDate = String(getDate);
      const date = new Date(inputDate);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const time = inputDate?.split(" ")[1] + " " + inputDate?.split(" ")[2];

      return `${day}/${month}/${year} ${time}`;
    } catch {}
  };

  return (
    <tbody>
      {loading === false && data && data?.length > 0
        ? data.map((value, index) => {
            const renderRows = (rowData, ind) => {
              return (
                <tr
                  key={index}
                  className="text-dark_grey h-[53px]  bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]  hover:bg-[#f1f5f9] cursor-pointer"
                  onClick={() => {
                    assignObjectFun(rowData, "BLNG");
                    toggleFunction();
                  }}
                >
                  <td className="text-start px-4 flex-1">{index + 1}</td>
                  <td className="text-start px-4 flex-1">{rowData?.fidNo}</td>
                  <td className="text-center px-4 flex-1">
                    {rowData?.empName}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {convertToISODate(rowData?.date)}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {ENTRANCEDATETIME(
                      rowData?.inTime?.replace(/[\[\]]/g, "") || 0
                    )}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {ENTRANCEDATETIME(
                      rowData?.outTime?.replace(/[\[\]]/g, "") || 0
                    )}
                  </td>

                  <td className="text-center px-4 flex-1">
                    {rowData?.avgDailyTD || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData?.totalHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData?.aweSDN || 0}
                  </td>

                  <td className="text-center px-4 flex-1">
                    {rowData?.normalWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData?.actualWorkHrs || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData?.otTime || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {rowData?.remarks}
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
                <p className="p-5">{message || "Please wait few seconds"}</p>
              </td>
            </tr>
          ) ?? (
            <tr>
              <td
                colSpan="50"
                className="text-center text-dark_ash text_size_5 bg-white"
              ></td>
            </tr>
          )}
    </tbody>
  );
};
