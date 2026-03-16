// Import services
import { generateClient } from "@aws-amplify/api";
import { fetchAllData, initializeLeaveType } from "./services/dataFetchService";
import { handleEmpLeaveBalanace } from "./services/leaveBalanceService";
import { handleInitialLeaveDetails } from "./services/leaveCalculationService";
import { handleProDataLeaveCal } from "./services/proDataCalculationService";
import { publicHolidayList } from "./services/publicHolidayList";
import { updateEmpLeaveDetails } from "../../../graphql/mutations";

const client = generateClient();
export const TestALBalanceUpdate2 = ({ storedData, isLoading }) => {
  // useLeaveManagement.jsx code
  const formatToTwoDecimals = (num) => parseFloat(num.toFixed(2));

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const handleUpdateALBalance = async ({ updatedLatestALBalanace }) => {
    let successCount = 0;
    const chunks = chunkArray(updatedLatestALBalanace, 500);

    for (const chunk of chunks) {
      try {
        await Promise.all(
          chunk.map(async (lDetails) => {
            const { createdAt, updatedAt, __typename, ...rest } = lDetails;

            // try {
            //   const response = await client.graphql({
            //     query: updateEmpLeaveDetails,
            //     variables: {
            //       input: rest,
            //     },
            //   });

            //   if (response?.data?.updateEmpLeaveDetails) {
            successCount++;
            //   }
            // } catch (error) {
            //   console.log("Error : ", error);
            // }
          })
        );
      } catch (batchError) {
        console.log("batchError : ", batchError);
      }
    }

    console.log("successCount : ", successCount);
  };

  const handleALBalanceSubmit = async ({ storedData }) => {
    const { publicHoliday } = await publicHolidayList();
    const { mergedData, personalDetails } = await fetchAllData({ storedData });

    // EmpLeaveBalanace.jsx code
    const finalLeaveData = await handleEmpLeaveBalanace({
      mergedData,
      publicHoliday,
    });

    // EmpLeaveCalculation.jsx code
    const allCurrentYearLeaves = await handleInitialLeaveDetails(
      mergedData,
      finalLeaveData,
      formatToTwoDecimals,
      initializeLeaveType
    );

    // EmpLeaveCalculation.jsx

    const handleUpdateLeaveSummary = async (allCurrentYearLeaves) => {
      const getAllValues = Object.values(allCurrentYearLeaves);

      const getUpdatedData =
        Array.isArray(getAllValues) &&
        getAllValues?.map((leaveSummary) => {
          if (!leaveSummary) return;

          const ALandSL = {
            AL: leaveSummary?.annualLeaveEntitlement ?? "0",
            SL: leaveSummary?.sickLeaveEntitlement ?? "0",
          };
          if (leaveSummary?.workWeek === "5.5") {
            return {
              ...leaveSummary,
              status: {
                SAT: "0.5" ?? "0",
                ...ALandSL,
              },
            };
          } else if (leaveSummary?.workWeek === "6") {
            return {
              ...leaveSummary,
              status: {
                SAT: "1" ?? "0",
                ...ALandSL,
              },
            };
          } else {
            return {
              ...leaveSummary,
              status: {
                ...ALandSL,
              },
            };
          }
        });

      return getUpdatedData;
    };

    const updateStatusSection = await handleUpdateLeaveSummary(
      allCurrentYearLeaves
    );

    let finalResult = [];

    for (var getData of updateStatusSection) {
      const leaveSummaryDetails = await handleProDataLeaveCal(getData);
      finalResult.push(leaveSummaryDetails);
    }

    const updatedLatestALBalanace = storedData?.leaveDetailsData?.map((val) => {
      const matchedData = finalResult?.find(
        (fin) =>
          String(fin?.empId)?.toUpperCase()?.trim() ===
          String(val?.empID)?.toUpperCase()?.trim()
      );
      if (matchedData) {
        return {
          ...val,
          remainAnnualLeave: "0",
          proALBalance: JSON.stringify({ year: "2026", status: "Updated" }),
          pervAnnualLeaveBal: matchedData?.annualLeave?.remainingLeave || "0",
        };
      } else {
        return {
          ...val,
          remainAnnualLeave: "0",
          proALBalance: JSON.stringify({ year: "2026", status: "Updated" }),
        };
      }
    });

    console.log(
      "updatedLatestALBalanace : ",
      updatedLatestALBalanace?.filter((fil) => fil?.empID === "132")
    );
    await handleUpdateALBalance({ updatedLatestALBalanace });
  };
  return (
    <div className="text-dark_grey">
      <button
        className="rounded-lg bg-primary text-center px-3 py-1.5"
        onClick={() => {
          handleALBalanceSubmit({ storedData });
        }}
      >
        TestALBalanceUpdate2
      </button>
    </div>
  );
};
