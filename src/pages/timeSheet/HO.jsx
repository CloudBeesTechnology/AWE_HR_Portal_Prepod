import { useEffect, useMemo, useState } from "react";
import { TimeSheetBrowser } from "../../utils/TimeSheetBrowser";

import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";

import { useFetchData } from "./customTimeSheet/UseFetchData";

export const HO = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [showing, setShowing] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const Position = localStorage.getItem("userType");

  const userIdetification =
    Position === "Manager"
      ? "Manager"
      : Position !== "Manager"
      ? "Unsubmitted"
      : "";
  const titleName = "HO";
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
        } catch (error) {}

        return {
          id: val.id,
          fileName: val.fileName,
          REC: val.rec || 0,
          CTR: val.ctr || "",
          DEPT: val.empDept || "",
          EMPLOYEEID: val.empID || "",
          BADGE: val.empBadgeNo || "",
          NAME: val.empName || 0,
          DATE: val.date || "",
          ONAM: val.onAM || "",
          OFFAM: val.offAM || "",
          ONPM: val.onPM || 0,
          OFFPM: val.offPM || 0,
          IN: val?.inTime || 0,
          OUT: val.outTime || 0,
          TOTALINOUT: val.totalInOut || "",
          ALLDAYMINUTES: val.allDayHrs || "",
          NETMINUTES: val.netMins || "",
          TOTALHOURS: val.totalHrs || "",
          NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
          WORKINGHOURS: val?.actualWorkHrs || 0,
          OT: val?.otTime || 0,
          TOTALACTUALHOURS: val.actualWorkHrs || "",
          jobLocaWhrs: parsedEmpWorkInfo.flat() || [],
          fileType: val.fileType,
          timeKeeper: val.assignBy,
          manager: val.assignTo,
          REMARKS: val.remarks || "",
          status: val.status || "",
        };
      });
    }
    return [];
  };

  useEffect(() => {
    if (Position !== "Manager") {
      const fetchData = async () => {
        setIsFetching(true);
        try {
          const hasData = await new Promise((resolve) => {
            if (
              convertedStringToArrayObj &&
              convertedStringToArrayObj.length > 0
            ) {
              resolve(true);
            } else if (!convertedStringToArrayObj) {
              setShowing(0);
            } else if (convertedStringToArrayObj.length === 0) {
              setShowing(2);
            }
          });

          if (hasData) {
            const finalData = await FindSpecificTimeKeeper(
              convertedStringToArrayObj
            );
            if (finalData && finalData.length > 0) {
              setSubmittedData(pendingData(finalData));
              setShowing(1);
            } else {
              setShowing(2);
            }
          } else {
            setShowing(2);
          }
        } catch (err) {
          setShowing(2);
        } finally {
          setIsFetching(false);
        }
      };

      fetchData();
    } else if (Position === "Manager") {
      setShowing(null);
      setManagerData(convertedStringToArrayObj);
    }
  }, [convertedStringToArrayObj, Position]);

  return (
    <div>
      <TimeSheetBrowser
        title="HO"
        submittedData={submittedData || []}
        showing={showing}
        ManagerData={ManagerData}
      />
    </div>
  );
};
