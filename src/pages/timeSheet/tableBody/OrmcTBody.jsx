import { useEffect } from "react";

export const OrmcTBody = ({ data, loading, setTableData }) => {
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
    <tbody>
      {loading === false && data && data?.length > 0
        ? data.map((value, index) => {
            const renderRows = (m, ind) => {
              return (
                <tr
                  key={index}
                  className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]"
                >
                  <td className="text-start px-4 flex-1">{index + 1}</td>
                  <td className="text-start px-4 flex-1">{m.name}</td>
                  <td className="text-center px-4 flex-1">{m.deptDiv}</td>
                  <td className="text-center px-4 flex-1">{m.badge}</td>
                  <td className="text-center px-4 flex-1">{m.date}</td>
                  <td className="text-center px-4 flex-1">{m.in}</td>
                  <td className="text-center px-4 flex-1">{m.out}</td>
                  <td className="text-center px-4 flex-1">{m.totalInOut}</td>
                  <td className="text-center px-4 flex-1">{m.allDayMin}</td>
                  <td className="text-center px-4 flex-1">{m.netMin}</td>
                  <td className="text-center px-4 flex-1">{m.totalHrs}</td>
                  <td className="text-center px-4 flex-1">
                    {m.normalWhrsPerDay || 0}
                  </td>
                  <td className="text-center px-4 flex-1">{m.workHrs || 0}</td>
                  <td className="text-center px-4 flex-1">{m.OT || 0}</td>
                  <td className="text-center px-4 flex-1">{m.remarks}</td>
                  <td
                    className={`text-center px-4 flex-1 ${
                      m.status === "Approved" ? "text-[#0CB100]" : "text_size_8"
                    }`}
                  >
                    {m.status}
                  </td>
                </tr>
              );
            };
            return renderRows(value);
          })
        : (
            <tr>
              <td
                colSpan="15"
                className="text-center text-dark_ash text_size_5"
              >
                <p className="p-5">No Table Data Available Here</p>
              </td>
            </tr>
          ) ?? (
            <tr>
              <td
                colSpan="15"
                className="text-center text-dark_ash text_size_5"
              >
                <p className="p-5">No Table Data Available Here</p>
              </td>
            </tr>
          )}
    </tbody>
  );
};
