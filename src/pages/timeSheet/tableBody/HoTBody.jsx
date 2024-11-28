import { useEffect } from "react";

export const HoTBody = ({ data, loading, useDownloadFunc }) => {
  useEffect(() => {
    if (loading === false) {
      const rows = document.querySelectorAll("tbody tr");
      const tableData = Array.from(rows).map((row) => {
        const cells = row.querySelectorAll("td");
        return Array.from(cells).map((cell) => cell.innerText);
      });
      setTimeout(() => {
        useDownloadFunc(tableData);
      }, 1000);
    }
  }, [loading, data]);
  return (
    <tbody>
      {loading === false && data && data?.length > 0
        ? data.map((value, index) => {
            const renderRows = (m, ind) => {
              return (
                <tr
                  key={ind}
                  className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start border-b-2 border-[#CECECE]"
                >
                  <td className="text-start px-4 flex-1">{ind + 1}</td>
                  <td className="text-start px-4 flex-1">{m.rec}</td>
                  <td className="text-center px-4 flex-1">{m.ctr}</td>
                  <td className="text-center px-4 flex-1">{m.dept}</td>
                  <td className="text-center px-4 flex-1">{m.empId}</td>
                  <td className="text-center px-4 flex-1">{m.badge}</td>
                  <td className="text-center px-4 flex-1">{m.name}</td>
                  <td className="text-center px-4 flex-1">{m.date}</td>
                  <td className="text-center px-4 flex-1">{m.onAm}</td>
                  <td className="text-center px-4 flex-1">{m.offAm}</td>
                  <td className="text-center px-4 flex-1">{m.onPm}</td>
                  <td className="text-center px-4 flex-1">{m.offPm}</td>
                  <td className="text-center px-4 flex-1">{m.in}</td>
                  <td className="text-center px-4 flex-1">{m.out}</td>
                  <td className="text-center px-4 flex-1">
                    {m.totalInOut || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {m.allDayMin || 0}
                  </td>
                  <td className="text-center px-4 flex-1">{m.netMin || 0}</td>
                  <td className="text-center px-4 flex-1">{m.totalHrs || 0}</td>
                  <td className="text-center px-4 flex-1">
                    {m.normalWhrsPerDay || 0}
                  </td>
                  <td className="text-center px-4 flex-1">
                    {m.totalActHrs || 0}
                  </td>
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
            return value.data.map(renderRows);
          })
        : (
            <tr>
              <td
                colSpan="15"
                className="text-center text-dark_ash text_size_5 bg-white"
              >
                <p className="p-5">No Table Data Available Here.</p>
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
