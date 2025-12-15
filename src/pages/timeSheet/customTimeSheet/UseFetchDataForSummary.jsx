
import { useState, useEffect } from "react";

export const UseFetchDataForSummary = (
  startDate,
  endDate,
  location,
  ProcessedDataFunc,
  offshoreType,
  allData,
  selectSapNoOrBadgeNo,
  refreshTrigger
) => {
  const [loading, setLoading] = useState(null);
  const [emptyTableMess, setEmptyTableMess] = useState(null);
  const [convertedStringToArrayObj, setConvertedStringToArrayObj] =
    useState(null);
  const [getPosition, setGetPosition] = useState(null);

  // ✅ Date range filter
  const isDateInRange = (dateStr, start, end) => {
    const date = new Date(dateStr).setHours(0, 0, 0, 0);
    const sDate = new Date(start).setHours(0, 0, 0, 0);
    const eDate = new Date(end).setHours(0, 0, 0, 0);
    return date >= sDate && date <= eDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false); // Start loading
      setEmptyTableMess(false); // Reset empty table only if starting fresh
      ProcessedDataFunc(null);
      setConvertedStringToArrayObj(null);

      const hasData = Array.isArray(allData) && allData.length > 0;

      // if (!startDate || !endDate || !location || !hasData) {
      //   console.log("Missing required data.");
      //   setLoading(false);
      //   setEmptyTableMess(true);
      //   return;
      // }

      try {
        if (
          startDate &&
          endDate &&
          location &&
          hasData &&
          selectSapNoOrBadgeNo
        ) {
          const Position = localStorage.getItem("userType");
          setGetPosition(Position);

          // ---- 1️⃣ Filter by Status & Date Range ----
          const CHUNK_SIZE = 1000;

          let statusFiltered = [];
          for (let i = 0; i < allData.length; i += CHUNK_SIZE) {
            const chunk = allData.slice(i, i + CHUNK_SIZE);
            for (const item of chunk) {
              if (
                item?.status &&
                (item.status === "Approved" || item.status === "Verified") &&
                // item?.companyName === location &&
                item?.date &&
                isDateInRange(item.date, startDate, endDate)
              ) {
                statusFiltered.push(item);
              }
            }
            // statusFiltered.push(
            //   ...chunk.filter(
            //     (item) =>
            //       item?.status &&
            //       (item.status === "Approved" || item.status === "Verified") &&
            //       item?.date &&
            //       isDateInRange(item.date, startDate, endDate)
            //   )
            // );
          }

          // ---- 2️⃣ Filter by Location ----
          const locationFiltered = statusFiltered
            .flatMap((entry) => {
              if (entry?.fileType === "HO") {
                const parsedWorkInfo = JSON.parse(
                  entry.empWorkInfo?.[0] || "[]"
                );

                const filteredWorkInfo = parsedWorkInfo.filter(
                  (info) =>
                    String(info?.LOCATION)?.toUpperCase()?.trim() ===
                    String(location)?.toUpperCase()?.trim()
                );
                if (filteredWorkInfo.length === 0) return [];
                return [
                  {
                    ...entry,
                    companyName: location,
                    empWorkInfo: [JSON.stringify(filteredWorkInfo)],
                  },
                ];
              } else {
                return String(entry?.companyName)?.toUpperCase()?.trim() ===
                  String(location)?.toUpperCase()?.trim()
                  ? [{ ...entry }] // 🟢 clone to avoid reference issues
                  : [];
              }
            })
            .filter(Boolean);

          // ---- 3️⃣ Filter by Offshore Type ----
          const isDirectOrIndirect =
            offshoreType === "Direct" || offshoreType === "Indirect"
              ? locationFiltered.filter((fil) =>
                  fil.fileName
                    .toUpperCase()
                    .split(/[ .,\\-_]+/)
                    .includes(offshoreType.toUpperCase())
                )
              : locationFiltered;

          const identifyFileType =
            Array.isArray(isDirectOrIndirect) && isDirectOrIndirect?.length > 0
              ? isDirectOrIndirect[0]?.fileType
              : "";

          const excelTypes = ["Offshore", "Offshore's ORMC", "BLNG"];
          let filteredData = [];
          if (
            String(selectSapNoOrBadgeNo?.sapNo)?.toUpperCase()?.trim() ===
            "SELECT ALL"
          ) {
            filteredData = isDirectOrIndirect;
          } else if (
            excelTypes?.includes(identifyFileType) &&
            Array.isArray(isDirectOrIndirect) &&
            isDirectOrIndirect?.length > 0
          ) {
            filteredData = isDirectOrIndirect?.filter(
              (val) =>
                String(val.fidNo)?.toUpperCase()?.trim() ===
                String(selectSapNoOrBadgeNo?.sapNo)?.toUpperCase()?.trim()
            );
          } else if (
            !excelTypes?.includes(identifyFileType) &&
            Array.isArray(isDirectOrIndirect) &&
            isDirectOrIndirect?.length > 0
          ) {
            filteredData = isDirectOrIndirect?.filter(
              (val) =>
                String(val.empBadgeNo)?.toUpperCase()?.trim() ===
                String(selectSapNoOrBadgeNo?.empBadgeNo)?.toUpperCase()?.trim()
            );
          }

          // ---- 4️⃣ Final Results ----
          if (filteredData.length === 0) {
            setEmptyTableMess(true);
          }
          if (filteredData.length > 0) {
            setConvertedStringToArrayObj(filteredData);
            setLoading(true);
            setEmptyTableMess(false);
          }
        } else {
          console.log(
            "startDate && endDate && location these are not have the data"
          );
        }
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };
    fetchData();
  }, [
    startDate,
    endDate,
    location,
    offshoreType,
    allData,
    selectSapNoOrBadgeNo,
    refreshTrigger,
  ]);    

  return {
    convertedStringToArrayObj,
    getPosition,
    loading,
    emptyTableMess,
    setEmptyTableMess,
    setLoading,
  };
};
