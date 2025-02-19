import { useEffect, useMemo, useState } from "react";
import { TimeSheetBrowser } from "../../utils/TimeSheetBrowser";

import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";

import { useFetchData } from "./customTimeSheet/UseFetchData";

export const Blng = () => {
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
  const titleName = "BLNG";
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
          FID: val.fidNo || 0,
          NAMEFLAST: val.empName || "",
          ENTRANCEDATEUSED: val.date || "",
          ENTRANCEDATETIME: val.inTime?.replace(/[\[\]]/g, "") || "",
          EXITDATETIME: val.outTime?.replace(/[\[\]]/g, "") || "",
          AVGDAILYTOTALBYDAY: val.avgDailyTD || "",
          AHIGHLIGHTDAILYTOTALBYGROUP: val.totalHrs || "",
          ADININWORKSENGINEERINGSDNBHD: val.aweSDN || "",
          WORKINGHOURS: val.actualWorkHrs || 0,
          OT: val.otTime || 0,
          NORMALWORKINGHRSPERDAY: val?.normalWorkHrs || 0,
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
            }else if (!convertedStringToArrayObj) {
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
        title="BLNG"
        submittedData={submittedData || []}
        showing={showing}
        ManagerData={ManagerData}
      />
    </div>
  );
};
