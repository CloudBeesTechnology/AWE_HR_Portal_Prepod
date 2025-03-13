import { generateClient } from "@aws-amplify/api";
import { listTimeSheets } from "../../../graphql/queries";
import { createTimeSheet, updateTimeSheet } from "../../../graphql/mutations";

const client = generateClient();

export const UpdateViewSummary = async (object, updateGroupedData) => {
  try {
    let resData = [];
    let newresData = [];
    let resDataForJobcode = [];
    const convertToISODate = async (dateString) => {
      const [day, month, year] = dateString.split("-");
      const formattedMonth = parseInt(month, 10);
      const formattedDay = parseInt(day, 10);
      return `${formattedMonth}/${formattedDay}/${year}`;
    };

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
    const UpdateMethodForJobcode = async (finalData) => {
      if (finalData) {
        const { __typename, createdAt, updatedAt, ...validTimeSheet } =
          finalData;

        try {
          const response = await client.graphql({
            query: updateTimeSheet,
            variables: { input: validTimeSheet },
          });
          const Responses = response?.data?.updateTimeSheet;

          resDataForJobcode = [Responses] || [];
          if (Responses) {
            return true;
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    async function findMatchingObject(inputData) {
      try {
        if (
          !inputData ||
          !inputData.data ||
          !Array.isArray(inputData.data) ||
          !inputData.workingHrsKey
        ) {
          return [];
        }

        const matchedObject = inputData?.data.find((item) => {
          const dateObj = new Date(item?.date);
          const day = dateObj?.getDate();
          const month = dateObj?.getMonth() + 1; // Months are zero-based in JS
          const year = dateObj?.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;

          return formattedDate === inputData?.workingHrsKey;
        });

        if (!matchedObject) {
          const addEmpWorkInfo = await unMatchedObject(
            inputData,
            inputData.grouped
          );

          if (addEmpWorkInfo) {
            const convertEmpWorkInfo = {
              ...addEmpWorkInfo,
              empWorkInfo: [JSON.stringify(addEmpWorkInfo.empWorkInfo)],
            };

            const result = await UpdateMethodForJobcode(convertEmpWorkInfo);

            return result;
          } else {
            return false;
          }
        } else if (matchedObject) {
          return matchedObject;
        }
        // return await unMatchedObject(inputData, inputData.grouped);

        // return matchedObject ? matchedObject : null;
      } catch (err) {
        // console.log("error : ", err);
        return null;
      }
    }

    const dateFormatFunc = (date) => {
      const dateObj = new Date(date);
      const day = dateObj?.getDate();
      const month = dateObj?.getMonth() + 1; // Months are zero-based in JS
      const year = dateObj?.getFullYear();
      return `${day}-${month}-${year}`;
    };
    const unMatchedObject = async (inputData, grouped) => {
      const getEmpBadgeNo = inputData?.data[0].empBadgeNo;
      const getFidNo = inputData?.data[0].fidNo;

      const matchedEmp = grouped.find(
        (emp) =>
          (emp?.empBadgeNo &&
            getEmpBadgeNo &&
            String(emp?.empBadgeNo) === String(getEmpBadgeNo)) ||
          (emp?.fidNo && getFidNo && String(emp?.fidNo) === String(getFidNo))
      );

      const filteredGroupData =
        matchedEmp.data.find((record) => {
          let formattedDate = dateFormatFunc(record.date);
          return formattedDate === inputData?.workingHrsKey;
        }) || null;

      if (filteredGroupData) {
        const updatedEmpWorkInfo = filteredGroupData.empWorkInfo.filter(
          (info) => info.JOBCODE !== inputData?.jobcode
        );

        updatedEmpWorkInfo.push({
          LOCATION: inputData?.location || "",
          OVERTIMEHRS: inputData?.overtimeHrs || "",
          JOBCODE: inputData?.jobcode || "",
          WORKINGHRS: inputData?.workingHrs || "",
          id: updatedEmpWorkInfo.length + 1,
          verify: "Yes",
        });

        const addEmpWorkInfo = {
          ...filteredGroupData,
          empWorkInfo: updatedEmpWorkInfo,
          status: "Verified",
        };

        if (addEmpWorkInfo && object) {
          await updateGroupedData(addEmpWorkInfo, object);
        }
        return addEmpWorkInfo ? addEmpWorkInfo : null;
      } else {
        return null;
      }
    };
    const MatchingObject = async (existingObj, outputData) => {
      if (!existingObj?.grouped || !Array.isArray(existingObj.grouped)) {
        return null;
      }

      const matchedEmp = existingObj.grouped.find(
        (emp) =>
          (emp?.empBadgeNo &&
            outputData?.empBadgeNo &&
            String(emp?.empBadgeNo) === String(outputData?.empBadgeNo)) ||
          (emp?.fidNo &&
            outputData?.fidNo &&
            String(emp?.fidNo) === String(outputData?.fidNo))
      );

      if (!matchedEmp?.data || !Array.isArray(matchedEmp.data)) {
        return null;
      }

      return (
        matchedEmp.data.find((record) => record.date === outputData.date) ||
        null
      );
    };

    const findFileName =
      object &&
      object?.data?.find(
        async (fi) => fi.fileName !== null || fi.fileName !== undefined
      );

    const findDepartment =
      object &&
      object?.data?.find(
        async (fi) => fi.empDept !== null || fi.empDept !== undefined
      );

    let idCounter = 10;
    const summaryCreateMethod = async () => {
      const jobLocaWhrs = [
        {
          id: idCounter++,
          JOBCODE: object?.jobcode || "",
          LOCATION: object?.location || "",
          WORKINGHRS: object?.workingHrs || "",
          OVERTIMEHRS: object?.overtimeHrs || "",
          verify: "Yes",
        },
      ];
      const item = {
        empName: object?.empName,
        // fidNo: object?.sapNo || "",
        [object.firstFileType === "Offshore" ||
        object.firstFileType === "BLNG" ||
        object.firstFileType === "Offshore's ORMC"
          ? "fidNo"
          : "empBadgeNo"]:
          object.firstFileType === "Offshore" ||
          object.firstFileType === "BLNG" ||
          object.firstFileType === "Offshore's ORMC"
            ? object?.sapNo || ""
            : object?.badgeNo || "",
        fileName: (await findFileName?.fileName) || "N/A",
        empDept: (await findDepartment?.empDept) || "N/A",
        date: await convertToISODate(object?.workingHrsKey || ""),
        actualWorkHrs: object?.workingHrs || "",
        companyName: object?.location || "",
        otTime: object?.overtimeHrs || "",
        normalWorkHrs: object?.NWHPD[object?.NWHPD.length - 1] || "",
        empWorkInfo: [JSON.stringify(jobLocaWhrs)] || [],
        fileType: object.firstFileType || "",
        status: "Verified",
        // verify: "Yes",
      };

      try {
        const response = await client.graphql({
          query: createTimeSheet,
          variables: { input: item },
        });
        const Responses = response?.data?.createTimeSheet;

        newresData = [Responses];
      } catch (err) {}
    };

    const UpdateMethod = async (finalData) => {
      if (finalData) {
        const { __typename, createdAt, updatedAt, ...validTimeSheet } =
          finalData;

        try {
          const response = await client.graphql({
            query: updateTimeSheet,
            variables: { input: validTimeSheet },
          });
          const Responses = response?.data?.updateTimeSheet;

          resData = [Responses];
          if (Responses) {
            return true;
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    async function fetchEmployeeData(empDetails) {
      const val = empDetails;
      function extractNumber(input) {
        const match = input?.match(/-?\d+(\.\d+)?/g);

        return match ? match?.[match.length - 1] : null;
      }

      const assignUpdatedWorkHrs = async (val) => {
        if (Array.isArray(val?.empWorkInfo)) {
          const parsedEmpWorkInfo = val.empWorkInfo.map((info) =>
            typeof info === "string" ? JSON.parse(info) : info
          );
          const processedWorkInfo = parsedEmpWorkInfo.flat();
          const updatedWorkInfo = processedWorkInfo.map((info) => {
            return {
              ...info,
              JOBCODE: obj.jobcode || "",
              LOCATION: object?.location || "",
              WORKINGHRS: extractNumber(obj.workingHrs) || "",
              OVERTIMEHRS: obj.ot || "",
              verify: "Yes",
            };
          });

          return {
            ...val,
            verify: "Yes",
            empWorkInfo: [JSON.stringify(updatedWorkInfo)],
          };
        }
      };

      const insertUpdatedObject = async (updatedObject, seperatedData) => {
        if (Array.isArray(updatedObject.empWorkInfo)) {
          const parsedEmpWorkInfo = updatedObject.empWorkInfo.map((info) =>
            typeof info === "string" ? JSON.parse(info) : info
          );
        
          const seperatedDataEmpWorkInfo = seperatedData.empWorkInfo.map(
            (info) => (typeof info === "string" ? JSON.parse(info) : info)
          );

          

          const processedWorkInfo = parsedEmpWorkInfo.flat();

          const updatedWorkInfo = seperatedDataEmpWorkInfo.map((info) => {
            
            const matchingInfo = processedWorkInfo.find(
              (seperatedInfo) => info.id === seperatedInfo.id
            );
           
            if (matchingInfo) {
             
              return {
                ...info,
                JOBCODE: obj.jobcode || "",
                LOCATION: object?.location || "",
                WORKINGHRS: extractNumber(obj.workingHrs) || "",
                OVERTIMEHRS: obj.ot || "",
                verify: "Yes",
              };
            }
            return info;
          });

          return {
            ...seperatedData,
            // verify: "Yes",
            status: "Verified",
            empWorkInfo: [JSON.stringify(updatedWorkInfo)],
          };
        }
      };

      const updatedObject = await assignUpdatedWorkHrs(val);

      const seperatedData = await MatchingObject(object, updatedObject);
   
      var finalData = await insertUpdatedObject(updatedObject, seperatedData);

      await UpdateMethod(finalData);
    }

    const empDetails = await findMatchingObject(object);
 
    if (empDetails && empDetails !== true) {
      await fetchEmployeeData(empDetails);
    } else if (empDetails === false) {
      await summaryCreateMethod();
    }
  
    return { resData, object, newresData, resDataForJobcode };
  } catch (err) {}
};
