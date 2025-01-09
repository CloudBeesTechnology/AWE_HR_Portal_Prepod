import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";
import { updateTimeSheet } from "../../../graphql/mutations";
// import { useEffect } from "react";

const client = generateClient();
export const UpdateViewSummary = (object) => {
  //   const fetchWorkInfo = async () => {
  //     // Fetch the BLNG data using GraphQL
  //     const [empWorkInfos] = await Promise.all([
  //       client.graphql({
  //         query: listTimeSheets,
  //       }),
  //     ]);
  //     const workInfo = empWorkInfos?.data?.listTimeSheets?.items;
  //     console.log(workInfo);
  //   };
  //   fetchWorkInfo();
  // Correct the date format
  const convertToISODate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedMonth = parseInt(month, 10); // Remove leading zeros
    const formattedDay = parseInt(day, 10);
    console.log(`${formattedMonth}/${formattedDay}/${year}`);
    return `${formattedMonth}/${formattedDay}/${year}`; // 'M/D/YYYY'
  };

  const obj = {
    empBadgeNo: object?.badgeNo || "",
    sapNo: object?.sapNo || "",
    date: convertToISODate(object?.workingHrsKey || ""),
    jobcode: object?.jobcode || "",
    workingHrs: object?.workingHrs || "",
    location: object?.location || "",
    ot: object?.overtimeHrs || "",
  };
  console.log(obj);

  const findBadgeNoOrSapNo = obj.empBadgeNo ? obj.empBadgeNo : obj.sapNo;
  console.log(findBadgeNoOrSapNo);
  async function fetchAllData(queryName) {
    let allData = [];
    let nextToken = null;
    const filter = {
      and: [
        {
          empBadgeNo: { eq: obj.empBadgeNo || null },
          fidNo: { eq: obj.sapNo || null },
          date: { eq: obj.date },
          companyName: { eq: obj.location },
        },
      ],
    };
    do {
      const response = await client.graphql({
        query: queryName,
        variables: { filter: filter, nextToken },
      });

      const items = response.data[Object.keys(response.data)[0]].items; // Extract items
      allData = [...allData, ...items]; // Append fetched items
      nextToken = response.data[Object.keys(response.data)[0]].nextToken; // Get nextToken
    } while (nextToken); // Continue if there's more data

    return allData;
  }

  const UpdateMethod = async (finalData) => {
    console.log(finalData);
    try {
      if (finalData && finalData.length > 0) {
        for (var timeSheet of finalData) {
          console.log(timeSheet);
          const { __typename, createdAt, updatedAt, ...validTimeSheet } =
            timeSheet;
          const response = await client
            .graphql({
              query: updateTimeSheet,
              variables: {
                input: validTimeSheet, // Send each object individually
              },
            })
            .then((res) => {
              console.log(res);
              console.log("Updated Successfully...");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } catch (err) {
      console.log("Update Method", err);
    }
  };
  async function fetchEmployeeData() {
    // try {
    // Fetch all data with pagination
    const [empDetails] = await Promise.all([fetchAllData(listTimeSheets)]);

    const candidates = empDetails; // Data from listEmpPersonalInfos

    function extractNumber(input) {
      const match = input.match(/-?\d+(\.\d+)?/g); // Matches numbers like 1.5, 7.532648, etc.

      return match ? match[match.length - 1] : null; // Returns last number or null if no match
    }
    console.log(candidates);
    const assignUpdatedWorkHrs =
      candidates &&
      candidates.length > 0 &&
      candidates.map((val) => {
        try {
          if (Array.isArray(val.empWorkInfo)) {
            const parsedEmpWorkInfo = val.empWorkInfo.map((info) =>
              typeof info === "string" ? JSON.parse(info) : info
            );
            console.log(parsedEmpWorkInfo);
            const processedWorkInfo = parsedEmpWorkInfo.flat();
            const updatedWorkInfo = processedWorkInfo.map((info) => {
              if (info.JOBCODE === obj.jobcode) {
                console.log(obj.workingHrs);
                return {
                  ...info,
                  WORKINGHRS: extractNumber(obj.workingHrs),
                  OVERTIMEHRS: obj.ot,
                }; // Update working hours
              }

              return info; // Keep unchanged info
            });
            console.log(updatedWorkInfo);
            // Return updated employee details
            return {
              ...val,
              verify: "Yes",
              empWorkInfo: [JSON.stringify(updatedWorkInfo)], // Replace with updated info
            };
          }
        } catch (error) {
          console.error("Assign Updated WorkingHrs", error);
        }
      });
    UpdateMethod(assignUpdatedWorkHrs);
    console.log(assignUpdatedWorkHrs);
    // } catch (err) {
    //   console.error("Error fetching data:", err.message);
    // }
  }

  fetchEmployeeData();
};
