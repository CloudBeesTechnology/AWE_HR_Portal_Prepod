import { useEffect, useMemo, useState } from "react";
import { TimeSheetBrowser } from "../../utils/TimeSheetBrowser";

import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";
import { useFetchDataTwo } from "./customTimeSheet/useFetchDataTwo";
import { useFetchData } from "./customTimeSheet/UseFetchData";

export const Offshore = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [showing, setShowing] = useState(0);
  const [isFetching, setIsFetching] = useState(true); // Track fetching state
  const Position = localStorage.getItem("userType");

  const userIdetification =
    Position === "Manager" ? "Manager" : Position !== "Manager" ? "All" : "";
  const titleName = "Offshore";
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
          NAME: val.empName || "",
          NO: val.fidNo || "",
          LOCATION: val.location || "",
          TRADE: val.trade || "",
          DATE: val.date || "",
          TOTALHOURS: val.totalNT || 0,
          TOTALHOURS2: val.totalOT || 0,
          TOTALHOURS3: val.totalNTOT || 0,
          WORKINGHOURS: val.actualWorkHrs || 0,
          OT: val?.otTime || 0,
          NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
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
        title="Offshore"
        submittedData={submittedData || []}
        showing={showing}
        ManagerData={ManagerData}
      />
    </div>
  );
};
