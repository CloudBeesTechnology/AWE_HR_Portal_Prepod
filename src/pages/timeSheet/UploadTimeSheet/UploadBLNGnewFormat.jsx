import * as XLSX from "xlsx";
export const UploadBLNGnewFormat = (
  excelFile,
  setExcelData,
  setExcelFile,
  fileInputRef,
  setLoading
) => {
  try {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });

      const worksheetNameLength = workbook.SheetNames;

      const allSheets = [];

      const tableBodyData = [];
      var checkTrueOrFalse = false;

      worksheetNameLength.forEach((sheetName) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        allSheets.push({ sheetName, data: sheet });
      });

      const getResult =
        allSheets &&
        allSheets.map((sheet) => {
          const data = sheet.data;

          var headerSlicedData = data.slice(0, 1);

          const hasNameAndDate = headerSlicedData.some((obj) =>
            ["FID", "Name (FLAST)"].every((key) => key in obj)
          );

          checkTrueOrFalse = hasNameAndDate;
          var bodySlicedData = data.slice(0);
        
          tableBodyData.push(bodySlicedData);
          return headerSlicedData;
        });
      if (checkTrueOrFalse === true) {
        function cleanKey(key) {
          if (typeof key !== "string") {
            return key;
          }
          return key.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        }

        const data = tableBodyData.flat();
        const formattedData = data.map((item) => {
          const cleanedItem = {};

          for (const key in item) {
            const cleanedKey = cleanKey(key);
            cleanedItem[cleanedKey] = item[key];
          }
          const NewKeyValueAdded = {
            ...cleanedItem,
            NORMALWORKINGHRSPERDAY: "",
            WORKINGHOURS: "",
            OT: "",
            REMARKS: "",
          };
          return NewKeyValueAdded;
        });

        function convertDateFormat(dateStr) {
          const parts = dateStr.split("/");

          if (parts.length !== 3) {
            throw new Error("Invalid date format. Expected DD/MM/YYYY");
          }

          const [day, month, year] = parts;

          return `${day}/${month}/${year}`;
        }
        const excelSerialToDate = (serial, type) => {
          if (type === "dateTime") {
            const baseDate = new Date(1899, 11, 30);
            const excelDateInMillis = serial * 24 * 60 * 60 * 1000;
            return new Date(baseDate.getTime() + excelDateInMillis);
          } else if (type === "date") {
            const baseDate = new Date(1899, 11, 30);
            const daysToAdd = serial;
            return new Date(
              baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
            );
          } else if (type === "time") {
            const totalHours = serial * 24;
            const hours = Math.floor(totalHours);
            const totalMinutes = (totalHours - hours) * 60;
            const minutes = Math.floor(totalMinutes);
            const totalSeconds = (totalMinutes - minutes) * 60;
            const seconds = Math.round(totalSeconds);

            const formattedTime = `${hours
              .toString()
              .padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

            return formattedTime;
          } else if (type === "Avg. Daily Total By Day") {
            const totalMinutes = Math.round(serial * 24 * 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const formattedHours = String(hours).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");

            return `${formattedHours}:${formattedMinutes}`;
          }
        };
        const formatDateTime = (date) => {
          return date.toLocaleString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
        };
        const updatedDataArray =
          formattedData &&
          formattedData.map((item) => {
            if (typeof item.EXITDATETIME === "number") {
              const entranceDate = excelSerialToDate(
                item.EXITDATETIME,
                "dateTime"
              );

              item.EXITDATETIME = formatDateTime(entranceDate);
            }
            if (typeof item.ENTRANCEDATETIME === "number") {
              const entranceDate = excelSerialToDate(
                item.ENTRANCEDATETIME,
                "dateTime"
              );

              item.ENTRANCEDATETIME = formatDateTime(entranceDate);
            }
            if (typeof item.ENTRANCEDATEUSED === "number") {
              const entranceDate = excelSerialToDate(
                item.ENTRANCEDATEUSED,
                "date"
              );
              const dateObject = new Date(entranceDate);

              item.ENTRANCEDATEUSED = dateObject.toLocaleDateString();
            }
            if (typeof item.AVGDAILYTOTALBYDAY === "number") {
              const entranceDate = excelSerialToDate(
                item.AVGDAILYTOTALBYDAY,
                "Avg. Daily Total By Day"
              );

              item.AVGDAILYTOTALBYDAY = entranceDate;
            }
            if (typeof item.AVGDAILYTOTALBYDAY === "number") {
              const entranceDate = excelSerialToDate(
                item.AVGDAILYTOTALBYDAY,
                "Avg. Daily Total By Day"
              );

              item.ADININWORKSENGINEERINGSDNBHD = entranceDate;
            }

            return item;
          });
        function groupAndMergeData(updatedDataArray) {
          try {
            const groupedData = {};

            updatedDataArray.forEach((entry) => {
              const key = `${entry.FID}_${entry.ENTRANCEDATEUSED}`;

              if (!groupedData[key]) {
                groupedData[key] = { ...entry };
              } else {
                groupedData[key].ENTRANCEDATETIME =
                  groupedData[key].ENTRANCEDATETIME < entry.ENTRANCEDATETIME
                    ? groupedData[key].ENTRANCEDATETIME
                    : entry.ENTRANCEDATETIME;
                groupedData[key].EXITDATETIME =
                  groupedData[key].EXITDATETIME > entry.EXITDATETIME
                    ? groupedData[key].EXITDATETIME
                    : entry.EXITDATETIME;
              }

              // Assign avgDailyTotalByDay dynamically from the data
              groupedData[key].AHIGHLIGHTDAILYTOTALBYGROUP =
                entry.AVGDAILYTOTALBYDAY;
              groupedData[key].ADININWORKSENGINEERINGSDNBHD =
                entry.AVGDAILYTOTALBYDAY;
            });

            return Object.values(groupedData);
          } catch (err) {}
        }

        const convertSingleRow = groupAndMergeData(updatedDataArray);

        setExcelData(convertSingleRow);
        setLoading(false);

        const theaderResult = getResult.flat();

        return theaderResult;
      } else {
        return checkTrueOrFalse;
      }
    }

    fileInputRef.current.value = "";
    setExcelFile(null);
  } catch (err) {}
};
