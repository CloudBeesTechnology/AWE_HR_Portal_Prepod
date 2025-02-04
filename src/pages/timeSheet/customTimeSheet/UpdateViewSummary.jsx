import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";
import { createTimeSheet, updateTimeSheet } from "../../../graphql/mutations";

const client = generateClient();

export const UpdateViewSummary = async (object) => {
  try {
    let resData = [];

    // Convert to ISO date format
    const convertToISODate = async (dateString) => {
      const [day, month, year] = dateString.split("-");
      const formattedMonth = parseInt(month, 10); // Remove leading zeros
      const formattedDay = parseInt(day, 10);
      return `${formattedMonth}/${formattedDay}/${year}`; // 'M/D/YYYY'
    };

    //   {
    //     "id": "3ffb5b70-7960-4ac4-93a5-cbff8723ed03",
    //     "badgeNo": "3907A",
    //     "empName": "Lisa",
    //     "sapNo": "261450",
    //     "location": "OFFSHORE",
    //     "jobcode": "",
    //     "NWHPD": [
    //         "12"
    //     ],
    //     "NWHPM": [
    //         "25"
    //     ],
    //     "workingHrs": "x(7.0)5",
    //     "overtimeHrs": 2,
    //     "workingHrsKey": "16-7-2024",
    //     "mealAllow": [
    //         null
    //     ]
    // }
    const obj = {
      id: object?.id,
      empName: object?.empName,
      empBadgeNo: object?.badgeNo || "",
      sapNo: object?.sapNo || "",
      date: await convertToISODate(object?.workingHrsKey || ""),
      jobcode: object?.jobcode || "",
      workingHrs: object?.workingHrs || "",
      location: object?.location || "",
      ot: object?.overtimeHrs || "",
      normalWorkHrs: object?.NWHPD || "",
    };

    async function fetchAllData(queryName) {
      let allData = [];
      let nextToken = null;
      const filData = () => {
        return object.firstFileType === "Offshore" ||
          object.firstFileType === "BLNG"
          ? { fidNo: { eq: obj.sapNo || null } }
          : { empBadgeNo: { eq: obj.empBadgeNo || null } };
      };

      const filter = {
        // and: [

        //   {
        //     // empBadgeNo: { eq: obj.empBadgeNo || null },
        //     // fidNo: { eq: obj.sapNo || null },

        //     date: { eq: obj.date },
        //     companyName: { eq: obj.location },
        //   },
        // ],
        and: [
          ...(object.firstFileType === "Offshore" ||
          object.firstFileType === "BLNG"
            ? [{ fidNo: { eq: obj.sapNo || null } }]
            : [{ empBadgeNo: { eq: obj.empBadgeNo || null } }]),
          { date: { eq: obj.date } },
          { companyName: { eq: obj.location } },
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

    const summaryCreateMethod = async () => {
      const jobLocaWhrs = [
        {
          JOBCODE: object?.jobcode || "",
          LOCATION: object?.location || "",
          WORKINGHRS: object?.workingHrs || "",
          OVERTIMEHRS: object?.overtimeHrs || "",
        },
      ];
      const item = {
        empName: object?.empName,
        // fidNo: object?.sapNo || "",
        [object.firstFileType === "Offshore" || object.firstFileType === "BLNG"
          ? "fidNo"
          : "empBadgeNo"]:
          object.firstFileType === "Offshore" || object.firstFileType === "BLNG"
            ? object?.sapNo || ""
            : object?.badgeNo || "",
        date: await convertToISODate(object?.workingHrsKey || ""),
        actualWorkHrs: object?.workingHrs || "",
        companyName: object?.location || "",
        otTime: object?.overtimeHrs || "",
        normalWorkHrs: object?.NWHPD[object?.NWHPD.length - 1] || "",
        empWorkInfo: [JSON.stringify(jobLocaWhrs)] || [],
        fileType: object.firstFileType || "",
        status: "Approved",
        verify: "Yes",
      };

      try {
        const response = await client.graphql({
          query: createTimeSheet,
          variables: { input: item },
        });
        const Responses = response?.data?.createTimeSheet;
        resData = [Responses];
      } catch (err) {
        // console.error(err);
      }
    };
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
            resData = [Responses];
          } catch (err) {
            // console.error(err);
          }
        }
      }
    };

    async function fetchEmployeeData(empDetails) {
      // const empDetails = await fetchAllData(listTimeSheets);
      // console.log("Response : ", empDetails);
     
      const candidates = empDetails;
      function extractNumber(input) {
        const match = input?.match(/-?\d+(\.\d+)?/g); // Matches numbers like 1.5, 7.532648, etc.

        return match ? match?.[match.length - 1] : null; // Returns last number or null if no match
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

          return {
            ...val,
            verify: "Yes",
            empWorkInfo: [JSON.stringify(updatedWorkInfo)],
          };
        }
      });

      await UpdateMethod(assignUpdatedWorkHrs);
    }
    const empDetails = await fetchAllData(listTimeSheets);
    // console.log("empDetails : ", empDetails);
    if (empDetails && empDetails.length > 0) {
      await fetchEmployeeData(empDetails);
    } else if (empDetails.length === 0) {
      await summaryCreateMethod();
    } else {
      // console.log("Warning");
    }

    return resData; // Return the collected response data
  } catch (err) {
    // console.log(err);
  }
};
