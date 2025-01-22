import { useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";

import { PopupForSave } from "../../../PopupForSave";
import { ViewTSTBeforeSave } from "../../../ViewTSTBeforeSave";
import { UploadOffshoreFile } from "./UploadOffshoreFile";

import { UploadOnshoreFile } from "./UploadOnshoreFile";
import { ViewOnshoreTSheet } from "../../../ViewOnshoreTSheet";
import { Link } from "react-router-dom";
import { Popup } from "../../../Popup";
export const TimeSheetBrowser = ({ title }) => {
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [closeSavedModel, setCloseSavedModel] = useState(false);
  const [fileNameForSuccessful, setFileNameForSuccessful] = useState("");
  const [ensureExcelFile, setEnsureExcelFile] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  // const [onShoreHeader, setOnShoreHeader] = useState([
  //   {
  //     empID: "",
  //     employeeName: "",
  //     badge: "",
  //     department: "",
  //     date: "",
  //     inTime: "",
  //     outTime: "",
  //   },
  // ]);

  // const [tsheetDate, setTsheetDate] = useState("");
  // const [tSlocation, setTSlocation] = useState("");

  //
  const handleFile = (e) => {
    // File Name
    setFileName(e.target.files[0].name);
    // console.log("File  name : " + e.target.files[0].name);
    setFileNameForSuccessful(e.target.files[0].name);
    let fileType = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Onshore
  const UploadFile = () => {
    if (title === "Offshore") {
      UploadOffshoreFile(excelFile, setExcelData, setExcelFile, fileInputRef);
    } else if (title === "OnShore") {
      console.log("successfully entered in Onshore");
      UploadOnshoreFile(excelFile, setExcelData, setExcelFile, fileInputRef);
      fileInputRef.current.value = "";
      setExcelFile(null);
    } else {
      console.log("ERROR");
    }
  };

  const clearUseRefObject = () => {
    fileInputRef.current.value = "";
    setExcelFile(null);
  };

  const searchAllEmployee = (employee) => {
    setAfterSearchEmp(employee);
  };

  const emptySearch = () => {
    setAfterSearchEmp(arrayOfObjects);
  };
  return (
    <div className="p-10 ">
      <Link to="/timeSheet" className="text-[#0033ffe2]">
        Back
      </Link>
      <div
      // className={`${(fileName || excelData || closeSavedModel) && "hidden"}`}
      >
        <div
          className={" m-9 screen-size my-5  flex flex-col items-center gap-3"}
        >
          <p className="text-2xl font-semibold text-dark_grey uppercase">
            {title}
          </p>

          <div className="my-5 flex flex-col gap-5">
            <div className="flex gap-5">
              <div className=" flex flex-col items-center  gap-5">
                <div className="border-[#30303080] border-2">
                  <input
                    className="outline-none py-1.5 px-3"
                    type="text"
                    placeholder="Please Upload the Time Sheet"
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
                <button
                  className="text_size_4 border-[#30303080] border-2 py-1 px-10 text-dark_grey rounded-md bg-[#FEF116]"
                  onClick={handleImageClick}
                >
                  Upload
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFile}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
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
      {excelData && (
        <div>
          {" "}
          {title === "Offshore" && <ViewTSTBeforeSave excelData={excelData} />}
          {title === "OnShore" && <ViewOnshoreTSheet excelData={excelData} />}
        </div>
      )}

      {excelData && (
        <div className=" flex justify-center items-center p-7">
          <button
            className="text-dark_grey text_size_5 w-[126px] h-[45px] bg-[#FEF116] rounded "
            onClick={() => {
              setCloseSavedModel(true);
              setExcelData(null);
              // saveFileName();
            }}
          >
            Save
          </button>
        </div>
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
