import { generateClient } from "@aws-amplify/api";
import { createTimeSheet, updateTimeSheet } from "../../../graphql/mutations";

const client = generateClient();

export const UpdateViewSummary = async (object) => {
  try {
    let finalResult = [];

    // dd-mm-yyyy to yyyy-mm-dd
    const convertToISODate = (dateString) => {
      const [day, month, year] = dateString
        ?.split(/[-/]/)
        ?.map((p) => p.trim());
      const formattedMonth = String(parseInt(month, 10)).padStart(2, "0");
      const formattedDay = String(parseInt(day, 10)).padStart(2, "0");
      return `${year}-${formattedMonth}-${formattedDay}`;
    };

    // mm/dd/yyyy to yyyy-mm-dd
    const convertToDateFormat = (dateString) => {
      const [day, month, year] = dateString
        ?.split(/[-/]/)
        ?.map((p) => p.trim());
      const formattedMonth = String(parseInt(month, 10)).padStart(2, "0");
      const formattedDay = String(parseInt(day, 10)).padStart(2, "0");
      return `${year}-${formattedDay}-${formattedMonth}`;
    };

    // dd-mm-yyyy to mm/dd/yyyy
    const handleDateFormat = (dateString) => {
      const [day, month, year] = dateString.split("-")?.map((p) => p.trim());
      const formattedMonth = String(parseInt(month, 10)).padStart(2, "0");
      const formattedDay = String(parseInt(day, 10)).padStart(2, "0");
      return `${formattedMonth}/${formattedDay}/${year}`;
    };

    const obj = {
      id: object?.id,
      empName: object?.empName,
      empBadgeNo: object?.badgeNo || "",
      sapNo: object?.sapNo || "",
      date: convertToISODate(object?.workingHrsKey || ""),
      jobcode: object?.jobcode || "",
      workingHrs: object?.workingHrs || "",
      location: object?.location || "",
      ot: object?.overtimeHrs || "",
      normalWorkHrs: String(object?.NWHPD) || "",
    };

    const groupedData = new Map();
    const getFirstData = object?.data[0];

    object?.data.forEach((item) => {
      const key = convertToDateFormat(item.date);
      groupedData.set(key, item);
    });

    const handleUpdateMethod = async (updatedData, type) => {
      const { __typename, createdAt, updatedAt, ...validTimeSheet } =
        updatedData;

      const typeOfMethod =
        type === "update" ? updateTimeSheet : createTimeSheet;

      try {
        const response = await client.graphql({
          query: typeOfMethod,
          variables: { input: validTimeSheet },
        });
        const keyName =
          type === "update" ? "updateTimeSheet" : "createTimeSheet";
        const Responses = response?.data?.[keyName];
        return Responses;
      } catch (error) {
        console.log("ERROR : ", error);
      }
    };

    // Suppose you already have groupedData (a Map with date as key)
    const jobLocaWhrs = [
      {
        id: 1,
        JOBCODE: object?.jobcode || "",
        LOCATION: object?.location || "",
        WORKINGHRS: object?.workingHrs || "",
        OVERTIMEHRS: object?.overtimeHrs || "",
        verify: "Yes",
      },
    ];

    if (groupedData.has(obj?.date)) {
      const value = groupedData.get(obj?.date);

      const updatedData = {
        ...value,
        empWorkInfo: [JSON.stringify(jobLocaWhrs)],
        status: "Verified",
      };

      const response = await handleUpdateMethod(updatedData, "update");
      finalResult = { response: response, type: "update" };
    } else {
      const { id, ...rest } = getFirstData;
      const createData = {
        ...rest, // or spread `value` if you want from some base
        date: handleDateFormat(object?.workingHrsKey),
        empWorkInfo: [JSON.stringify(jobLocaWhrs)],
        status: "Verified",
      };

      const response = await handleUpdateMethod(createData, "create");
      finalResult = { response: response, type: "create" };
    }

    return { finalResult };
  } catch (error) {
    console.log("ERROR : ", error);
  }
};
