import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";
import { updateTimeSheet } from "../../../graphql/mutations";

const client = generateClient();

export const UpdateViewSummary = async (object) => {
  let resData = [];

  // Convert to ISO date format
  const convertToISODate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedMonth = parseInt(month, 10); // Remove leading zeros
    const formattedDay = parseInt(day, 10);
    return `${formattedMonth}/${formattedDay}/${year}`; // 'M/D/YYYY'
  };

  const obj = {
    id: object?.id,
    empBadgeNo: object?.badgeNo || "",
    sapNo: object?.sapNo || "",
    date: convertToISODate(object?.workingHrsKey || ""),
    jobcode: object?.jobcode || "",
    workingHrs: object?.workingHrs || "",
    location: object?.location || "",
    ot: object?.overtimeHrs || "",
    mealAllow: object?.mealAllow || "",
  };
  // console.log(obj);
  async function fetchAllData(queryName) {
    let allData = [];
    let nextToken = null;
    const filter = {
      and: [
        {
          // empBadgeNo: { eq: obj.empBadgeNo || null },
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

      const items = response.data[Object.keys(response.data)[0]].items;
      allData = [...allData, ...items];
      nextToken = response.data[Object.keys(response.data)[0]].nextToken;
    } while (nextToken);

    return allData;
  }

  const UpdateMethod = async (finalData) => {
    if (finalData && finalData.length > 0) {
      for (const timeSheet of finalData) {
        const { __typename, createdAt, updatedAt, ...validTimeSheet } =
          timeSheet;
        try {
          const response = await client.graphql({
            query: updateTimeSheet,
            variables: { input: validTimeSheet },
          });
          const Responses = response?.data?.updateTimeSheet;
          resData.push(Responses);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  async function fetchEmployeeData() {
    const empDetails = await fetchAllData(listTimeSheets);

    const candidates = empDetails;
    function extractNumber(input) {
      const match = input.match(/-?\d+(\.\d+)?/g); // Matches numbers like 1.5, 7.532648, etc.

      return match ? match[match.length - 1] : null; // Returns last number or null if no match
    }
    const assignUpdatedWorkHrs = candidates.map((val) => {
      if (Array.isArray(val.empWorkInfo)) {
        const parsedEmpWorkInfo = val.empWorkInfo.map((info) =>
          typeof info === "string" ? JSON.parse(info) : info
        );
        const processedWorkInfo = parsedEmpWorkInfo.flat();
        const updatedWorkInfo = processedWorkInfo.map((info) => {
          if (info.JOBCODE === obj.jobcode) {
            return {
              ...info,
              WORKINGHRS: extractNumber(obj.workingHrs) || "",
              OVERTIMEHRS: obj.ot || "",
            };
          }
          return info;
        });
        // console.log(obj.mealAllow);
        return {
          ...val,
          verify: "Yes",
          empWorkInfo: [JSON.stringify(updatedWorkInfo)],
          mealAllow: Array.isArray(obj.mealAllow)
            ? obj.mealAllow[0]
            : obj.mealAllow || "",
        };
      }
    });

    await UpdateMethod(assignUpdatedWorkHrs);
  }

  await fetchEmployeeData();
  return resData; // Return the collected response data
};
