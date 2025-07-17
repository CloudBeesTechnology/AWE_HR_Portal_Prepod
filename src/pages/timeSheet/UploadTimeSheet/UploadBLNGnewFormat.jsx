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

        function convertExcelDateToBruneiTime(serial) {
          // Excel base: 1899-12-30. Convert serial to UTC
          const utcMilliseconds = (serial - 25569) * 86400 * 1000;
          const bruneiDate = new Date(utcMilliseconds); // Already Brunei time

          // Format helper
          const pad2 = (num) => String(num).padStart(2, "0");

          let hours = bruneiDate.getUTCHours();
          const minutes = pad2(bruneiDate.getUTCMinutes());
          const seconds = pad2(bruneiDate.getUTCSeconds());

          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12; // Convert to 12-hour format
          hours = String(hours); // no leading zero for hours

          const day = bruneiDate.getUTCDate(); // no pad
          const month = bruneiDate.getUTCMonth() + 1; // no pad
          const year = bruneiDate.getUTCFullYear();

          return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
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

        const updatedDataArray =
          formattedData &&
          formattedData.map((item) => {
            if (typeof item.EXITDATETIME === "number") {
              // const entranceDate = excelSerialToDate(
              //   item.EXITDATETIME,
              //   "dateTime"
              // );

              // item.EXITDATETIME = formatDateTime(entranceDate);
              item.EXITDATETIME = convertExcelDateToBruneiTime(
                item.EXITDATETIME
              );
            }
            if (typeof item.ENTRANCEDATETIME === "number") {
              //   const entranceDate = excelSerialToDate(
              //     item.ENTRANCEDATETIME,
              //     "dateTime"
              //   );
              //  item.ENTRANCEDATETIME = formatDateTime(entranceDate);

              item.ENTRANCEDATETIME = convertExcelDateToBruneiTime(
                item.ENTRANCEDATETIME
              );
            }
            if (typeof item.ENTRANCEDATEUSED === "number") {
              const entranceDate = excelSerialToDate(
                item.ENTRANCEDATEUSED,
                "date"
              );
              const dateObject = new Date(entranceDate);

              let localDateObject = dateObject.toLocaleDateString();

              const convertToDMY = (inputDateStr) => {
                const [day, month, year] = inputDateStr.split("/");

                // Convert string to numbers to remove any leading zeros
                const dayNum = parseInt(day, 10);
                const monthNum = parseInt(month, 10);

                return `${dayNum}/${monthNum}/${year}`;
              };

              item.ENTRANCEDATEUSED = convertToDMY(localDateObject);
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

              // Convert strings to Date objects for comparison
              const currentEntryIn = new Date(entry.ENTRANCEDATETIME);
              const currentEntryOut = new Date(entry.EXITDATETIME);

              if (!groupedData[key]) {
                // First time entry — clone original and assign Date values
                groupedData[key] = { ...entry };
              } else {
                // Compare and update earliest ENTRANCEDATETIME
                const existingIn = new Date(groupedData[key].ENTRANCEDATETIME);
                groupedData[key].ENTRANCEDATETIME =
                  currentEntryIn < existingIn
                    ? entry.ENTRANCEDATETIME
                    : groupedData[key].ENTRANCEDATETIME;

                // Compare and update latest EXITDATETIME
                const existingOut = new Date(groupedData[key].EXITDATETIME);
                groupedData[key].EXITDATETIME =
                  currentEntryOut > existingOut
                    ? entry.EXITDATETIME
                    : groupedData[key].EXITDATETIME;
              }

              // Assign AVGDAILYTOTALBYDAY for AHIGHLIGHTDAILYTOTALBYGROUP and ADININWORKSENGINEERINGSDNBHD
              groupedData[key].AHIGHLIGHTDAILYTOTALBYGROUP =
                entry.AVGDAILYTOTALBYDAY;
              groupedData[key].ADININWORKSENGINEERINGSDNBHD =
                entry.AVGDAILYTOTALBYDAY;
            });

            return Object.values(groupedData);
          } catch (err) {
            console.error("Error in groupAndMergeData:", err);
            return [];
          }
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
