import { useEffect, useMemo, useState } from "react";
import { TimeSheetBrowser } from "../../utils/TimeSheetBrowser";
import { useFetchData } from "./customTimeSheet/UseFetchData";
import { FindSpecificTimeKeeper } from "./customTimeSheet/FindSpecificTimeKeeper";

export const Blng = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [showing, setShowing] = useState(0);
  const Position = localStorage.getItem("userType");
  let userIdetification =
    Position === "Manager" ? "Manager" : Position !== "Manager" ? "All" : "";
  let titleName = "BLNG";
  let cardName = userIdetification;
  const memoizedTitleName = useMemo(() => titleName, [titleName]);
  const memoizedCardName = useMemo(() => cardName, [cardName]);
  const { convertedStringToArrayObj } = useFetchData(
    memoizedTitleName,
    memoizedCardName
  );

  const pendingData = (data) => {
    if (data && data.length > 0) {
      const result = data?.map((val) => {
        let parsedEmpWorkInfo = [];
        try {
          if (Array.isArray(val.empWorkInfo)) {
            parsedEmpWorkInfo = val.empWorkInfo.map((info) =>
              typeof info === "string" ? JSON.parse(info) : info
            );
          }
        } catch (error) {
          // console.error("Error parsing empWorkInfo for ID:", val.id, error);
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
      return result;
      // setData(result);
      // setSecondaryData(result);
    }
  };
  useEffect(() => {
    if (Position !== "Manager") {
      const fetchData = async () => {
        // setLoading(true);
        try {
          const dataPromise = await new Promise((resolve, reject) => {
            if (
              convertedStringToArrayObj &&
              convertedStringToArrayObj.length > 0
            ) {
              resolve(convertedStringToArrayObj);
            } else {
              setTimeout(() => {
                setShowing(2);
                reject("No data found after waiting.");
              }, 30000);
            }
          });

          const fetchedData = await dataPromise;

          if (Position !== "Manager" && fetchedData && fetchedData.length > 0) {
            const finalData = await FindSpecificTimeKeeper(fetchedData);
            if (finalData && finalData.length > 0) {
              const result = pendingData(finalData);

              setSubmittedData(result);
              setShowing(1);
            } else {
              setShowing(2);
            }
          }
          // else {
          //   setTimeout(() => {
          //     if (showing === 0 || showing !== 1) {
          //       setShowing(2);
          //     }
          //   }, 30000);
          // }
        } catch (err) {
        } finally {
          // setLoading(false);
        }
      };

      fetchData();
    } else if (Position === "Manager") {
      setManagerData(convertedStringToArrayObj);
    }
  }, [convertedStringToArrayObj]);

  return (
    <div>
      {showing === 0 && (
        <div className="flex justify-center items-center h-[85vh] w-full">
          <p className="text-dark_grey text_size_5 ">Loading...</p>
        </div>
      )}

      {showing === 1 && submittedData.length > 0 && (
        <TimeSheetBrowser title="BLNG" submittedData={submittedData || []} />
      )}

      {showing === 2 && <TimeSheetBrowser title="BLNG" submittedData={[]} />}
      {Position === "Manager" && (
        <TimeSheetBrowser
          title="BLNG"
          submittedData={[]}
          ManagerData={ManagerData}
        />
      )}
    </div>
  );
};
