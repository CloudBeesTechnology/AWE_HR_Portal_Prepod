import { useCallback, useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { Popup } from "../pages/timeSheet/Popup";
import { PopupForSave } from "../pages/timeSheet/PopupForSave";
import { ViewTSTBeforeSave } from "../pages/timeSheet/ViewTSTBeforeSave";
import { FaArrowLeft } from "react-icons/fa";
// import { UploadOffshoreFile } from "./UploadOffshoreFile";
// import { UploadBLNGfile } from "./UploadBLNGfile";

import { ViewBLNGsheet } from "../pages/timeSheet/ViewBLNGsheet";
import { ViewSBWsheet } from "../pages/timeSheet/ViewSBWsheet";
import { ViewORMCsheet } from "../pages/timeSheet/ViewORMCsheet";
import { ViewHOsheet } from "../pages/timeSheet/ViewHOsheet";
import { UploadOffshoreFile } from "../pages/timeSheet/UploadTimeSheet/UploadOffshoreFile";
import { UploadORMCfile } from "../pages/timeSheet/UploadTimeSheet/UploadORMCfile";
import { UploadSBWfile } from "../pages/timeSheet/UploadTimeSheet/UploadSBWfile";
import { UploadHOfile } from "../pages/timeSheet/UploadTimeSheet/UploadHOfile";
import { UploadBLNGfile } from "../pages/timeSheet/UploadTimeSheet/UploadBLNGfile";
import { listBlngs, listHeadOffices } from "../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { useFetchData } from "../pages/timeSheet/customTimeSheet/UseFetchData";
import { UploadEditedORMC } from "../pages/timeSheet/uploadManuallyEditedExcel/UploadEditedORMC";
import { UploadEditedSBW } from "../pages/timeSheet/uploadManuallyEditedExcel/UploadEditedSBW";

const client = generateClient();
export const TimeSheetBrowser = ({ title }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [closeSavedModel, setCloseSavedModel] = useState(false);
  const [fileNameForSuccessful, setFileNameForSuccessful] = useState("");
  const [ensureExcelFile, setEnsureExcelFile] = useState(true);
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [returnedTHeader, setReturnedTHeader] = useState();
  const [excelData, setExcelData] = useState(null);
  const [titleName, setTitleName] = useState("");
  // const [getPosition, setGetPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // const [convertedStringToArrayObj, setConvertedStringToArrayObj] = useState(
  //   []
  // );

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setExcelData(null);
  };
  useEffect(() => {
    if (isChecked === true) {
      setTitleName("ORMC");
    } else {
      setTitleName(title);
    }
  }, [isChecked]);

  const { convertedStringToArrayObj, getPosition } = useFetchData(titleName);

  // Convert string to array of object
  // useEffect(() => {
  //   const Position = localStorage.getItem("userType");

  //   // setGetPosition(Position);

  //   const fetchData = async () => {
  //     console.log("I am calling You");
  //     // Fetch the BLNG data using GraphQL
  //     const [fetchBLNGdata] = await Promise.all([
  //       client.graphql({
  //         query: listBlngs,
  //       }),
  //     ]);
  //     // const [fetchBLNGdata] = await Promise.all([
  //     //   client.graphql({
  //     //     query: listHeadOffices,
  //     //   }),
  //     // ]);

  //     // const k = JSON.parse(fetchBLNGdata?.data?.listBlngs?.items);
  //     // console.log(k);
  //     const BLNGdata = fetchBLNGdata?.data?.listBlngs?.items;
  //     // console.log("BLNGdata : ", BLNGdata);

  //     if (BLNGdata && BLNGdata.length > 0) {
  //       const result = BLNGdata.map((m, index) => {
  //         // Check if m.weeklySheet is an array and contains a string
  //         if (Array.isArray(m.weeklySheet) && m.weeklySheet.length > 0) {
  //           const rawWeeklySheet = m.weeklySheet[0]; // Safely access the first element of the array
  //           const id = m.id;
  //           console.log("ID : ", id);
  //           console.log("Status:", m.status);
  //           const Status = m.status; // Store the status dynamically

  //           // Step 1: Clean the data string
  //           const cleanedData = rawWeeklySheet.replace(
  //             /^"|\s*'|\s*"$|\\'/g,
  //             ""
  //           ); // Remove leading and trailing quotes and escape characters

  //           // Step 2: Unescape the string by replacing escaped quotes
  //           const unescapedData = cleanedData
  //             .replace(/\\"/g, '"') // Replace escaped quotes
  //             .replace(/\\n/g, "") // Replace escaped new lines
  //             .replace(/\\\//g, "/"); // Replace escaped slashes

  //           try {
  //             // Step 3: Parse the valid JSON string into an array of objects
  //             const arrayOfObjects = JSON.parse(unescapedData);

  //             // Log the result for debugging
  //             console.log("Parsed JSON:", arrayOfObjects);

  //             // const result = arrayOfObjects.map((obj) => ({
  //             //   id: id,
  //             //   weaklySheet: { ...obj, status: Status },
  //             // }));

  //             // console.log(...result, { id: id });

  //             const dataWithStatus = arrayOfObjects.map((obj) => ({
  //               ...obj,
  //               status: Status, // Dynamically assign the status to each object
  //             }));
  //             const dataWithIdStatus = [{ id: id }, dataWithStatus];

  //             // console.log("Raw Data", { id: id }, dataWithStatus);
  //             return dataWithIdStatus; // Return the modified objects
  //           } catch (error) {
  //             // console.error("Error parsing JSON:", error);
  //             return null; // Return null in case of error
  //           }
  //         } else {
  //           // console.warn(
  //           //   "weeklySheet is not an array or is empty:",
  //           //   m.weeklySheet
  //           // );
  //           return null; // Handle the case where weeklySheet is not valid
  //         }
  //       });
  //       console.log("Raw Data : ", result);
  //       // Flatten the resulting array and remove nulls
  //       const removedArray = result.filter((item) => item !== null);

  //       console.log("Final parsed data:", removedArray);

  //       setConvertedStringToArrayObj(removedArray);
  //     } else {
  //       console.log("BLNGdata is not available");
  //     }
  //   };

  //   return () => {
  //     fetchData();
  //   };
  // }, [callBLNGgetMethod]);

  // useEffect(() => {
  //   const Position = localStorage.getItem("userType");

  //   setGetPosition(Position);

  //   const fetchData = async () => {
  //     console.log("I am calling You");
  //     // Fetch the BLNG data using GraphQL
  //     const [fetchBLNGdata] = await Promise.all([
  //       client.graphql({
  //         query: listHeadOffices,
  //       }),
  //     ]);
  //     // const [fetchBLNGdata] = await Promise.all([
  //     //   client.graphql({
  //     //     query: listHeadOffices,
  //     //   }),
  //     // ]);

  //     // const k = JSON.parse(fetchBLNGdata?.data?.listBlngs?.items);
  //     // console.log(k);
  //     const headOffice = fetchBLNGdata?.data?.listHeadOffices?.items;
  //     // console.log("headOffice : ", headOffice);

  //     if (headOffice && headOffice.length > 0) {
  //       const result = headOffice.map((m, index) => {
  //         // Check if m.weeklySheet is an array and contains a string
  //         if (Array.isArray(m.dailySheet) && m.dailySheet.length > 0) {
  //           const rawWeeklySheet = m.dailySheet[0]; // Safely access the first element of the array
  //           const id = m.id;
  //           console.log("ID : ", id);
  //           console.log("Status:", m.status);
  //           const Status = m.status; // Store the status dynamically

  //           // Step 1: Clean the data string
  //           const cleanedData = rawWeeklySheet.replace(
  //             /^"|\s*'|\s*"$|\\'/g,
  //             ""
  //           ); // Remove leading and trailing quotes and escape characters

  //           // Step 2: Unescape the string by replacing escaped quotes
  //           const unescapedData = cleanedData
  //             .replace(/\\"/g, '"') // Replace escaped quotes
  //             .replace(/\\n/g, "") // Replace escaped new lines
  //             .replace(/\\\//g, "/"); // Replace escaped slashes

  //           try {
  //             // Step 3: Parse the valid JSON string into an array of objects
  //             const arrayOfObjects = JSON.parse(unescapedData);

  //             // Log the result for debugging
  //             console.log("Parsed JSON:", arrayOfObjects);

  //             // const result = arrayOfObjects.map((obj) => ({
  //             //   id: id,
  //             //   weaklySheet: { ...obj, status: Status },
  //             // }));

  //             // console.log(...result, { id: id });

  //             const dataWithStatus = arrayOfObjects.map((obj) => ({
  //               ...obj,
  //               status: Status, // Dynamically assign the status to each object
  //             }));
  //             const dataWithIdStatus = [{ id: id }, dataWithStatus];

  //             // console.log("Raw Data", { id: id }, dataWithStatus);
  //             return dataWithIdStatus; // Return the modified objects
  //           } catch (error) {
  //             // console.error("Error parsing JSON:", error);
  //             return null; // Return null in case of error
  //           }
  //         } else {
  //           // console.warn(
  //           //   "weeklySheet is not an array or is empty:",
  //           //   m.weeklySheet
  //           // );
  //           return null; // Handle the case where weeklySheet is not valid
  //         }
  //       });
  //       console.log("Raw Data : ", result);
  //       // Flatten the resulting array and remove nulls
  //       const removedArray = result.filter((item) => item !== null);

  //       console.log("Final parsed data:", removedArray);

  //       setConvertedStringToArrayObj(removedArray);
  //     } else {
  //       console.log("headOffice is not available");
  //     }
  //   };

  //   return () => {
  //     fetchData();
  //   };
  // }, [callBLNGgetMethod]);

  const handleForErrorMsg = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["xlsx", "xls"];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please upload a valid Excel file.");
        e.target.value = ""; // Clear the input field
      } else {
        setError("");
        // Handle the valid Excel file upload logic here
        // console.log("Uploaded file:", file);
      }
    }
  };

  const handleFile = (e) => {
    setFileNameForSuccessful(e.target.files[0].name);

    let fileType = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      setFileName(e.target.files[0].name);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        var result = selectedFile && fileType.includes(selectedFile.type);

        setEnsureExcelFile(result);
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    }
  };

  const handleImageClick = async () => {
    fileInputRef.current.click();
  };
  // useEffect(() => {
  //   if (loading === true) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [loading]);
  // Onshore
  const UploadFile = async () => {
    try {
    if (titleName === "Offshore") {
      const result = UploadOffshoreFile(
        excelFile,
        setExcelData,
        setExcelFile,
        fileInputRef,
        setLoading
      );

      setReturnedTHeader(result);
      fileInputRef.current.value = "";
      setExcelFile(null);
    }
    // else if (titleName === "ORMC") {
    //   const { result, checkTrueOrFalse } = UploadORMCfile(
    //     excelFile,
    //     setExcelData,
    //     setExcelFile,
    //     fileInputRef,
    //     setLoading
    //   );
    //   if (checkTrueOrFalse === true) {
    //     setReturnedTHeader(result);
    //   }

    //   if (checkTrueOrFalse === false) {
    //     const result = await UploadEditedORMC(
    //       excelFile,
    //       setExcelData,
    //       setExcelFile,
    //       fileInputRef,
    //       setLoading
    //     );
    //     console.log("Yes it works");
    //     setReturnedTHeader(result);
    //   }

    //   fileInputRef.current.value = "";
    //   setExcelFile(null);
    // }
    else if (titleName === "ORMC") {
      // if (!data) {
      //   console.error("UploadORMCfile returned undefined or null");
      //   return;
      // }

      // try {
      const result = UploadORMCfile(
        excelFile,
        setExcelData,
        setExcelFile,
        fileInputRef,
        setLoading
      );
      // const { result, checkTrueOrFalse } = data;

      setReturnedTHeader(result);

      // } catch {
      if (result === false) {
        const editedResult = await UploadEditedORMC(
          excelFile,
          setExcelData,
          setExcelFile,
          fileInputRef,
          setLoading
        );
        
        setReturnedTHeader(editedResult);
      }

      fileInputRef.current.value = "";
      setExcelFile(null);
    } else if (titleName === "SBW") {
      const result = UploadSBWfile(
        excelFile,
        setExcelData,
        setExcelFile,
        fileInputRef,
        setLoading
      );
      setReturnedTHeader(result);

      if (result === false) {
        const editedResult = await UploadEditedSBW(
          excelFile,
          setExcelData,
          setExcelFile,
          fileInputRef,
          setLoading
        );

        setReturnedTHeader(editedResult);
      }
      fileInputRef.current.value = "";
      setExcelFile(null);
    } else if (titleName === "HO") {
      const result = UploadHOfile(
        excelFile,
        setExcelData,
        setExcelFile,
        fileInputRef,
        setLoading
      );
      setReturnedTHeader(result);
      fileInputRef.current.value = "";
      setExcelFile(null);
    } else if (titleName === "BLNG") {
      const result = UploadBLNGfile(
        excelFile,
        setExcelData,
        setExcelFile,
        fileInputRef,
        setLoading
      );
      setReturnedTHeader(result);

      fileInputRef.current.value = "";
      setExcelFile(null);
    }
    } catch(err) {
      console.log("ERROR", err);
    }
  };

  const clearUseRefObject = () => {
    fileInputRef.current.value = "";
    setExcelFile(null);
  };
  const clearFileInput = () => {
    setFileName(""); // Clear the state
    fileInputRef.current.value = ""; // Clear the input reference
  };

  return (
    <div className="p-10 bg-[#fafaf6] min-h-screen  flex-col items-center">
      <div>
        <Link to="/timeSheet" className="text-xl flex-1 text-grey ">
          <FaArrowLeft />
        </Link>
      </div>
      <div
      // className={`${(fileName || excelData || closeSavedModel) && "hidden"}`}
      // className="h-full"
      >
        <div
          className={" m-9 screen-size my-5  flex flex-col items-center gap-3"}
        >
          <p className="text-2xl font-semibold text-dark_grey uppercase">
            {title}
          </p>
          {getPosition !== "Manager" && (
            <div className="my-2 flex flex-col gap-5">
              <div className="flex gap-5">
                <div className=" flex flex-col items-center  gap-5">
                  <div className="border-[#30303080] border-2">
                    <input
                      className="outline-none py-2 px-3 text-sm"
                      type="text"
                      placeholder="Please Upload the Time Sheet"
                      value={fileName || ""}
                      onChange={(e) => {
                        setFileName(e.target.value);
                      }}
                      readOnly
                    />
                  </div>
                  <div className="flex gap-2 p">
                    <span>
                      <GoDotFill className="text-xs mt-1.5" />
                    </span>
                    <span className="text-dark_grey">XLS / CSV Files only</span>
                  </div>
                </div>
                <div className="">
                  {!fileName && (
                    <div>
                      <button
                        className="text_size_4 border-[#30303080] border-2 py-1 px-10 text-dark_grey rounded-md bg-[#FEF116]"
                        onClick={() => {
                          handleImageClick();
                        }}
                      >
                        Upload
                      </button>
                      {title === "Offshore" && (
                        <div className="flex items-center space-x-3 m-5">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-dark_grey rounded checked:bg-red checked:border-transparent"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor="custom-checkbox"
                            className="text-dark_grey text_size_4 "
                          >
                            ORMC
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                  {fileName && (
                    <div className="flex gap-5">
                      <button
                        className="text_size_4 border-[#30303080] border-2 py-1 px-10 text-dark_grey rounded-md bg-[#FEF116]"
                        onClick={() => {
                          setLoading(true);

                          setTimeout(() => {
                            UploadFile();
                          }, 1000);
                          setEnsureExcelFile();
                          setFileName();

                          // clearFileInput();
                        }}
                      >
                        Submit
                      </button>
                      <button
                        className="text_size_4 border-[#30303080] border-2 py-1 px-10 text-dark_grey rounded-md "
                        onClick={() => {
                          clearFileInput();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    handleFile(e);
                    handleForErrorMsg(e);
                  }}
                  accept=".xls,.xlsx"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-center ">
          <Popup
            fileName={fileName}
            ensureExcelFile={ensureExcelFile}
            typeError={typeError}
            UploadFile={UploadFile}
            setEnsureExcelFile={setEnsureExcelFile}
            setFileName={setFileName}
            clearUseRefObject={clearUseRefObject}
          />
        </div>
      )}

   <div>
   {loading === true && (
            <div className="flex justify-center items-center text_size_5 text-dark_grey m-2">
              <p>Please wait a few seconds.....</p>
            </div>
          )}
   </div>
      {excelData && (
        <div>
         {" "}
          {/* <TSRawTable excelData={excelData} /> */}
          {/* <ViewTSTBeforeSave
            excelData={excelData}
            setExcelData={setExcelData}
            setCloseSavedModel={setCloseSavedModel}
            // fileName={fileName}
            // tsheetDate={tsheetDate}
            // tSlocation={tSlocation}
          /> */}
          {titleName === "Offshore" && (
            <ViewTSTBeforeSave
             
              setExcelData={setExcelData}
              excelData={excelData}
              returnedTHeader={returnedTHeader}
              Position={getPosition}
              titleName={titleName}
              fileName={fileNameForSuccessful}
            />
          )}
          {titleName === "HO" && (
            <ViewHOsheet
              
              setExcelData={setExcelData}
              excelData={excelData}
              returnedTHeader={returnedTHeader}
              Position={getPosition}
              titleName={titleName}
              fileName={fileNameForSuccessful}
            />
          )}
          {titleName === "SBW" && (
            <ViewSBWsheet
              setExcelData={setExcelData}
              excelData={excelData}
              returnedTHeader={returnedTHeader}
              Position={getPosition}
              titleName={titleName}
              fileName={fileNameForSuccessful}
            />
          )}
          {titleName === "ORMC" && (
            <ViewORMCsheet
              setExcelData={setExcelData}
              excelData={excelData}
              returnedTHeader={returnedTHeader}
              Position={getPosition}
              titleName={titleName}
              fileName={fileNameForSuccessful}
            />
          )}
          {titleName === "BLNG" && (
            <ViewBLNGsheet
              excelData={excelData}
              setExcelData={setExcelData}
              returnedTHeader={returnedTHeader}
              Position={getPosition}
              titleName={titleName}
              fileName={fileNameForSuccessful}
            />
          )}
        </div>
      )}
      {!excelData && getPosition === "Manager" && titleName === "BLNG" && (
        <ViewBLNGsheet
          titleName={titleName}
          returnedTHeader={null}
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
          fileName={fileNameForSuccessful}
        />
      )}
      {!excelData && getPosition === "Manager" && titleName === "HO" && (
        <ViewHOsheet
          titleName={titleName}
          returnedTHeader={null}
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
          fileName={fileNameForSuccessful}
        />
      )}
      {!excelData && getPosition === "Manager" && titleName === "SBW" && (
        <ViewSBWsheet
          titleName={titleName}
          returnedTHeader={null}
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
          fileName={fileNameForSuccessful}
        />
      )}
      {!excelData && getPosition === "Manager" && titleName === "ORMC" && (
        <ViewORMCsheet
          titleName={titleName}
          returnedTHeader={null}
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
          fileName={fileNameForSuccessful}
        />
      )}
      {!excelData && getPosition === "Manager" && titleName === "Offshore" && (
        <ViewTSTBeforeSave
          titleName={titleName}
          returnedTHeader={null}
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
          fileName={fileNameForSuccessful}
        />
      )}
      {closeSavedModel && (
        <div className="flex flex-col items-center">
          <PopupForSave
            fileNameForSuccessful={fileNameForSuccessful}
            setCloseSavedModel={setCloseSavedModel}
            // backToHome={backToHome}
          />
        </div>
      )}
    </div>
  );
};
