import * as XLSX from "xlsx";
export const UploadEditedORMC = (
  excelFile,
  setExcelData,
  setExcelFile,
  fileInputRef,
  setLoading
) => {
  if (excelFile !== null) {
    const workbook = XLSX.read(excelFile, { type: "buffer" });

    const worksheetNameLength = workbook.SheetNames;

    const allSheets = [];

    const tableBodyData = [];
    worksheetNameLength.map((sheetName) => {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      allSheets.push({ sheetName, data: sheet });
    });

    const getResult =
      allSheets &&
      allSheets.map((sheet) => {
        const data = sheet.data;

        var headerSlicedData = data.slice(1, 2);

        const changedHeader = headerSlicedData.map((columns) => {
          const foundKey = Object.entries(columns).map(([key, value]) => {
            return [{ key, value }];
          });
          return foundKey;
        });

        const result = changedHeader.flat().flat();

        var bodySlicedData = data.slice(2);

        bodySlicedData.forEach((bodyData) => {
          const row = {};

          Object.entries(bodyData).forEach(([key, value]) => {
            const headerKey = result.find((header) => header.key === key);

            if (headerKey) {
              row[headerKey.value] = value;
            }
          });

          tableBodyData.push(row);
        });
        return headerSlicedData;
      });

    const convertDecimalToTime = (decimal, value) => {
      if (value === "time") {
        const totalHours = decimal * 24;
        const hours = Math.floor(totalHours);
        const totalMinutes = (totalHours - hours) * 60;
        const minutes = Math.floor(totalMinutes);
        const totalSeconds = (totalMinutes - minutes) * 60;
        const seconds = Math.round(totalSeconds);

        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        return formattedTime;
      } else if (value === "date") {
        const baseDate = new Date(1899, 11, 30);

        const daysToAdd = decimal;
        return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
      }
    };

    function cleanKey(key) {
      if (typeof key !== "string") {
        return key;
      }
      return key.replace(/[^a-zA-Z0-9]/g, "");
    }

    const formattedData = tableBodyData.map((item) => {
      const cleanedItem = {};

      for (const key in item) {
        const cleanedKey = cleanKey(key);
        cleanedItem[cleanedKey] = item[key];
      }

      return cleanedItem;
    });

    const updatedDataArray =
      formattedData &&
      formattedData.map((item) => {
        if (typeof item.IN === "number") {
          item.IN = convertDecimalToTime(item.IN, "time");
        }
        if (typeof item.OUT === "number") {
          item.OUT = convertDecimalToTime(item.OUT, "time");
        }
        if (typeof item.DATE === "number") {
          const jsDate = convertDecimalToTime(item.DATE, "date");
          const dateObject = new Date(jsDate);
          item.DATE = dateObject.toLocaleDateString();
        }

        return item;
      });

    const forStringDate = async (inputData) => {
      try {
        const badgeDateMap = {};

        // Step 1: Assign missing DATEs based on BADGE
        const updatedData = inputData?.reduce((acc, item) => {
          const badge = item.BADGE?.trim();

          if (item.DATE) {
            badgeDateMap[badge] = item.DATE;
          }

          if (item.IN && item.OUT && !item.DATE) {
            const storedDate = badgeDateMap[badge];
            if (storedDate) {
              item.DATE = storedDate;
            }
          }

          acc.push(item);
          return acc;
        }, []);

        // Helper to remove weekday (e.g., 5/6/2025(tue) → 5/6/2025)
        const getCleanedDate = (dateStr) => {
          return dateStr?.replace(/\(\w+\)/, "")?.trim();
        };

        const convertToDMY = (inputDateStr) => {
          const [month, day, year] = inputDateStr.split("/");

          // Convert string to numbers to remove any leading zeros
          const dayNum = parseInt(day, 10);
          const monthNum = parseInt(month, 10);

          return `${monthNum}/${dayNum}/${year} `;
        };

        // Step 2: Clean and format each DATE in updatedData
        updatedData.forEach((obj) => {
          if (obj.DATE && typeof obj.DATE === "string") {
            const cleanedDate = getCleanedDate(obj.DATE);
            try {
              obj.DATE = convertToDMY(cleanedDate);
            } catch (error) {
              console.error("Date format error in:", cleanedDate);
            }
          }
        });

        return updatedData;
      } catch (err) {
        console.log("Error : ", err);
      }
    };
    const getDateFromPrevRow = forStringDate(updatedDataArray);

    const finalData =
      getDateFromPrevRow && getDateFromPrevRow.length > 0
        ? getDateFromPrevRow
        : updatedDataArray && updatedDataArray.length > 0
        ? updatedDataArray
        : [];

    function filterDataByDateFormat(data) {
      return data.filter((obj) => obj.IN && obj.OUT);
    }
    const filteredData = filterDataByDateFormat(finalData);

    setExcelData(filteredData);

    const transformData = (data) => {
      return data.map((innerArray) =>
        innerArray.map((item) => {
          return Object.entries(item).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
          }, {});
        })
      );
    };

    const transformedData = transformData(getResult);

    setLoading(false);
    const resultOfTheader = transformedData.flat();
    return resultOfTheader;
  }

  fileInputRef.current.value = "";
  setExcelFile(null);
};
