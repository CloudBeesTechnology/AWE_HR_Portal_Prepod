

import { useEffect, useMemo, useState } from "react";
import { TimeSheetBrowser } from "../../utils/TimeSheetBrowser";

import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";

import { useFetchData } from "./customTimeSheet/UseFetchData";

export const SBW = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [showing, setShowing] = useState(0);
  const [isFetching, setIsFetching] = useState(true); // Track fetching state
  const Position = localStorage.getItem("userType");

  const userIdetification =
    Position === "Manager" ? "Manager" : Position !== "Manager" ? "All" : "";
  const titleName = "SBW";
  const cardName = userIdetification;

  const memoizedTitleName = useMemo(() => titleName, [titleName]);
  const memoizedCardName = useMemo(() => cardName, [cardName]);

  const { convertedStringToArrayObj } = useFetchData(
    memoizedTitleName,
    memoizedCardName
  );

  const pendingData = (data) => {
    if (data && data.length > 0) {
      return data.map((val) => {
        let parsedEmpWorkInfo = [];
        try {
          if (Array.isArray(val.empWorkInfo)) {
            parsedEmpWorkInfo = val.empWorkInfo.map((info) =>
              typeof info === "string" ? JSON.parse(info) : info
            );
          }
        } catch (error) {
          // Handle parsing errors
        }

        return {
          id: val.id,
          fileName: val.fileName,
          NAME: val.empName || 0,
          DEPTDIV: val.empDept || "",
          BADGE: val.empBadgeNo || "",
          DATE: val.date || "",
          IN: val.inTime || "",
          OUT: val.outTime || 0,
          TOTALINOUT: val.totalInOut || "",
          ALLDAYMINHRS: val.allDayHrs || "",
          NETMINUTES: val.netMins || "",
          TOTALHOURS: val.totalHrs || 0,
          NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
          WORKINGHOURS: val.actualWorkHrs || 0,
          OT: val?.otTime || 0,
          jobLocaWhrs: parsedEmpWorkInfo.flat() || [],
          fileType: val.fileType || "",
          timeKeeper: val.assignBy || "",
          manager: val.assignTo || "",
          REMARKS: val.remarks || "",
          status: val.status || "",
        };
      });
    }
    return [];
  };

  useEffect(() => {
    let timeoutId;

    if (Position !== "Manager") {
      const fetchData = async () => {
        setIsFetching(true); // Start fetching
        try {
          // Wait for the data to arrive
          const hasData = await new Promise((resolve) => {
            timeoutId = setTimeout(() => resolve(false), 15000); // Fallback after 30 seconds
            if (
              convertedStringToArrayObj &&
              convertedStringToArrayObj.length > 0
            ) {
              clearTimeout(timeoutId); // Clear fallback timeout
              resolve(true);
            }
          });

          if (hasData) {
            const finalData = await FindSpecificTimeKeeper(
              convertedStringToArrayObj
            );
            if (finalData && finalData.length > 0) {
              setSubmittedData(pendingData(finalData));
              setShowing(1); // Data available
            } else {
              setShowing(2); // No valid data
            }
          } else {
            setShowing(2); // Data not fetched in time
          }
        } catch (err) {
          setShowing(2); // Handle error case
        } finally {
          setIsFetching(false); // Done fetching
        }
      };

      fetchData();
    } else if (Position === "Manager") {
      setShowing(null);
      setManagerData(convertedStringToArrayObj);
    }

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [convertedStringToArrayObj, Position]);

  return (
    <div>
      <TimeSheetBrowser
        title="SBW"
        submittedData={submittedData || []}
        showing={showing}
        ManagerData={ManagerData}
      />
    </div>
  );
};
