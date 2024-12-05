// import React, { useState, useEffect } from "react";

// export const DummyViewSummary = () => {
//   const initialDataset = [
//     {
//       name: "Hari pk",
//       sapNo: "261450",
//       badge: "2435A",
//       workHrs: ["8"],
//       workMonth: ["2"],
//       salaryType: ["Month"],
//     },
//     {
//       sapNo: "261451",
//       badge: "3435A",
//       workHrs: ["9"],
//       workMonth: ["3"],
//       name: "John Doe",
//       salaryType: ["Day"],
//     },
//     {
//       sapNo: "261452",
//       badge: "4435A",
//       workHrs: ["10"],
//       workMonth: ["3"],
//       name: "Jane Smith",
//       salaryType: ["Month"],
//     },
//   ];

//   const dataSet = [
//     {
//       sapNo: "261450",
//       data: [
//         { date: "7/19/2024", normalWhrsPerDay: 12 },
//         { date: "7/20/2024", normalWhrsPerDay: 10 },
//       ],
//     },
//     {
//       sapNo: "261451",
//       data: [
//         { date: "7/19/2024", normalWhrsPerDay: 11 },
//         { date: "7/20/2024", normalWhrsPerDay: 9 },
//       ],
//     },
//     {
//       sapNo: "261452",
//       data: [
//         { date: "7/19/2024", normalWhrsPerDay: 8 },
//         { date: "7/20/2024", normalWhrsPerDay: 7 },
//       ],
//     },
//   ];

//   const [tableData, setTableData] = useState([]);

//   // Function to update NORMALWORKHRSPERDAY for each sapNo
//   const updateNormalWorkHrs = (sapNo) => {
//     // Find the matching object in dataSet
//     const matchedObject = dataSet.find((obj) => obj.sapNo === sapNo);
//     if (!matchedObject) return null;

//     // Create an object for NORMALWORKHRSPERDAY
//     const updatedData = {};
//     matchedObject.data.forEach((entry) => {
//       const day = parseInt(entry.date.split("/")[1], 10); // Extract day from date
//       updatedData[day] = entry.normalWhrsPerDay;
//     });

//     return { NORMALWORKHRSPERDAY: updatedData };
//   };

//   // useEffect to automatically populate tableData
//   useEffect(() => {
//     const updatedTableData = initialDataset.map((entry) => {
//       return updateNormalWorkHrs(entry.sapNo);
//     });

//     setTableData(updatedTableData.filter((item) => item !== null)); // Filter out nulls in case of missing sapNos
//   }, []);

//   return (
//     <div>
//       <h1>Table Data</h1>
//       <pre>{JSON.stringify(tableData, null, 2)}</pre>
//     </div>
//   );
// };
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
import React, { useState, useEffect } from "react";

export const DummyViewSummary = () => {
  const initialDataset = [
    {
      name: "Hari pk",
      sapNo: "261450",
      badge: "2435A",
      workHrs: ["8"],
      workMonth: ["2"],
      salaryType: ["Month"],
    },
    {
      sapNo: "261451",
      badge: "3435A",
      workHrs: ["9"],
      workMonth: ["3"],
      name: "John Doe",
      salaryType: ["Day"],
    },
    {
      sapNo: "261452",
      badge: "4435A",
      workHrs: ["10"],
      workMonth: ["3"],
      name: "Jane Smith",
      salaryType: ["Month"],
    },
  ];

  const dataSet = [
    {
      sapNo: "261450",
      data: [
        {
          date: "7/19/2024",
          normalWhrsPerDay: 12,
          jobLocaWhrs: [{ OVERTIMEHRS: "2", JOBCODE: "J9001" }],
        },
        {
          date: "7/20/2024",
          normalWhrsPerDay: 10,
          jobLocaWhrs: [{ OVERTIMEHRS: "3", JOBCODE: "J9002" }],
        },
      ],
    },
    {
      sapNo: "261451",
      data: [
        {
          date: "7/19/2024",
          normalWhrsPerDay: 11,
          jobLocaWhrs: [{ OVERTIMEHRS: "4", JOBCODE: "J9003" }],
        },
        {
          date: "7/20/2024",
          normalWhrsPerDay: 9,
          jobLocaWhrs: [{ OVERTIMEHRS: "1", JOBCODE: "J9004" }],
        },
      ],
    },
    {
      sapNo: "261452",
      data: [
        {
          date: "7/19/2024",
          normalWhrsPerDay: 8,
          jobLocaWhrs   : [{ OVERTIMEHRS: "1", JOBCODE: "J9002" }],     },
        {
          date: "7/20/2024",
          normalWhrsPerDay: 7,
          jobLocaWhrs: [{ OVERTIMEHRS: "2", JOBCODE: "J9006" }],
        },
      ],
    },
  ];

  const [tableData, setTableData] = useState([]);

  const transformedData = dataSet
    .map((item) => {
      const correspondingEmployee = initialDataset.find(
        (emp) => emp.sapNo === item.sapNo
      );

      if (!correspondingEmployee) return null;

      const normalWorkHours = item.data.reduce(
        (acc, { date, normalWhrsPerDay }) => {
          const day = new Date(date).getDate();
          acc[day] = normalWhrsPerDay;
          return acc;
        },
        {}
      );

      const overtimeHours = item.data.reduce(
        (acc, { date, jobLocaWhrs }) => {
          const day = new Date(date).getDate();
          const overtime = jobLocaWhrs[0]?.OVERTIMEHRS;
          if (overtime) {
            acc[day] = parseInt(overtime, 10);
          }
          return acc;
        },
        {}
      );

      const jobcode = item.data
        .map(({ jobLocaWhrs }) => jobLocaWhrs[0]?.JOBCODE)
        .join(", ");

      return {
        jobcode: jobcode || "",
        ...correspondingEmployee,
        NORMALWORKHRSPERDAY: normalWorkHours,
        OVERTIMEHRS: overtimeHours,
      };
    })
    .filter(Boolean);

  console.log(transformedData);

  return (
    <div>
      <h1>Table Data</h1>
      <pre>{JSON.stringify(transformedData, null, 2)}</pre>
    </div>
  );
};
