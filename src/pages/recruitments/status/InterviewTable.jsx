import React from "react";

export const InterviewTable = ({ data }) => {
  const heading = [
    "TempID",
    "Name",
    "Nationality",
    "Interview Date",
    "Time",
    "Venue",
    "Interviewer",
  ];
  console.log(data);

  return (
    <div>
      {data && data.length > 0 ? (
        <table className=" w-full">
          <thead className="bg-[#939393] text-white">
            {" "}
            <tr>
              {heading.map((header, index) => (
                <th key={index} className="pl-4 py-4 text-[15px] text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data && data.length > 0 ? <tr></tr> : <tr></tr>}</tbody>
        </table>
      ) : (
        <div></div>
      )}
    </div>
  );
};
