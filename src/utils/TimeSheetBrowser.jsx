import { useCallback, useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { Popup } from "../pages/timeSheet/Popup";
import { PopupForSave } from "../pages/timeSheet/PopupForSave";
import { ViewTSTBeforeSave } from "../pages/timeSheet/ViewTSTBeforeSave";
import { FaArrowLeft } from "react-icons/fa";

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
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [assignPosition, setAssignPosition] = useState("");

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
  const Position = localStorage.getItem("userType");
  useEffect(() => {
    if (Position === "Manager") {
      setAssignPosition("Manager");
    } else {
      setAssignPosition("timeKeeper");
    }
  }, [Position, count]);
  const { convertedStringToArrayObj, getPosition } = useFetchData(
    titleName,
    assignPosition
  );

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

      // }
      else if (titleName === "ORMC") {
        const result = UploadORMCfile(
          excelFile,
          setExcelData,
          setExcelFile,
          fileInputRef,
          setLoading
        );

        setReturnedTHeader(result);

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
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const clearUseRefObject = () => {
    fileInputRef.current.value = "";
    setExcelFile(null);
  };
  const clearFileInput = () => {
    setFileName("");
    fileInputRef.current.value = "";
  };

  return (
    <div className="p-10 bg-[#fafaf6] min-h-screen  flex-col items-center">
      <div
        className={`flex ${
          getPosition === "Manager" ? "justify-start" : "justify-center"
        }  mt-5`}
      >
        <div>
          <Link to="/timeSheet" className="text-xl flex-1 text-grey w-1/12">
            <FaArrowLeft />
          </Link>
        </div>
        {getPosition !== "Manager" && (
          <div className="flex justify-center gap-11 w-11/12 pr-5 ">
            <p
              className={`${
                count === 0 && "border-b-4 border-b-primary"
              } pb-1 cursor-pointer text_size_5`}
              onClick={() => {
                setCount(0);
              }}
            >
              {`Upload ${title} Excel Sheet`}
            </p>
            <p
              className={`${
                count === 1 && "border-b-4 border-b-primary"
              } pb-1 cursor-pointer text_size_5`}
              onClick={() => {
                setCount(1);
              }}
            >
              {`${title} Rejected Items`}
            </p>
          </div>
        )}
      </div>

      <div>
        <div
          className={" m-9 screen-size my-5  flex flex-col items-center gap-3"}
        >
          <p
            className={`${
              count === 0
                ? "text-2xl font-semibold text-dark_grey uppercase mt-4"
                : "hidden"
            }`}
          >
            {title}
          </p>

          {getPosition !== "Manager" && count === 0 && (
            <div className="my-2 flex flex-col gap-5">
              <div className="flex gap-5">
                <div className=" flex flex-col items-center  gap-5">
                  <div className="border-[#30303080] border-2">
                    <input
                      className="outline-none py-2 px-3 text-sm w-64"
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

      {/* Show Rejected Items Only */}
      {titleName === "Offshore" && getPosition !== "Manager" && count === 1 && (
        <ViewTSTBeforeSave
          titleName={titleName}
          showRejectedItemTable="Rejected"
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
        />
      )}

      {titleName === "BLNG" && getPosition !== "Manager" && count === 1 && (
        <ViewBLNGsheet
          titleName={titleName}
          showRejectedItemTable="Rejected"
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
        />
      )}
      {titleName === "HO" && getPosition !== "Manager" && count === 1 && (
        <ViewHOsheet
          titleName={titleName}
          showRejectedItemTable="Rejected"
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
        />
      )}

      {titleName === "ORMC" && getPosition !== "Manager" && count === 1 && (
        <ViewORMCsheet
          titleName={titleName}
          showRejectedItemTable="Rejected"
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
        />
      )}

      {titleName === "SBW" && getPosition !== "Manager" && count === 1 && (
        <ViewSBWsheet
          titleName={titleName}
          showRejectedItemTable="Rejected"
          convertedStringToArrayObj={convertedStringToArrayObj}
          Position={getPosition}
        />
      )}

      {closeSavedModel && (
        <div className="flex flex-col items-center">
          <PopupForSave
            fileNameForSuccessful={fileNameForSuccessful}
            setCloseSavedModel={setCloseSavedModel}
            returnedTHeader={[]}
          />
        </div>
      )}
    </div>
  );
};
