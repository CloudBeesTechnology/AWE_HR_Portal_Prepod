import { getUrl } from "@aws-amplify/storage";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { DateFormat } from "../../../utils/DateFormat";

const AddEmpPopup = ({ details, popupAll, onClose }) => {
  const [fileUrls, setFileUrls] = useState({}); // To store resolved URLs
  const [storedData, setStoredData] = useState([]);
  const heading = [
    { header: "Material Requisition ", key: "MRNo" },
    { header: "Medical Name", key: "medicalName" },
    { header: "Medical Expiry", key: "medicalExpiry" },
    { header: "Medical Appointment Date", key: "medicalAppointDate" },
    { header: "Course", key: "courseCode" },
    { header: "Course Name", key: "courseName" },
    { header: "Company", key: "company" },
    { header: "Start Date", key: "traineeSD" },
    { header: "End Date", key: "traineeED" },
    { header: "Status", key: "traineeStatus" },
    { header: "Training Course Fee", key: "traineeCourseFee" },
    { header: "Upload Report", key: "medicalReport" },
  ];
  useEffect(() => {
    let parsedData = [];

    try {
      let raw = details?.traineeTrack || "[]";
      let firstParse = JSON.parse(raw);

      // If it's a string, and looks like invalid JSON, try fixing keys (very hacky!)
      if (typeof firstParse === "string") {
        let fixed = firstParse
          .replace(/([{,])(\s*)(\w+)\s*:/g, '$1"$3":') // add quotes to keys
          .replace(/:\s*'([^']+)'/g, ': "$1"'); // convert single quotes to double quotes

        parsedData = JSON.parse(fixed);
      } else {
        parsedData = firstParse;
      }

      setStoredData(Array.isArray(parsedData) ? parsedData : [parsedData]);

      const fetchUrls = async () => {
        const urls = {};
        for (let i = 0; i < parsedData.length; i++) {
          const item = parsedData[i];
          try {
            const rawReport = item?.medicalReport;

            // Log the raw value to inspect what's coming through
            // console.log("Raw medicalReport:", rawReport);

            // Check for empty, null, or non-JSON values
            if (
              !rawReport ||
              rawReport === "[]" ||
              rawReport === "null" ||
              rawReport === ""
            ) {
              // console.log(`Skipping empty or invalid report at index ${i}`);
              continue; // Skip empty or invalid reports
            }
            // console.log(rawReport);

            // Try parsing the raw report string
            let parsedReport = [];
            if (Array.isArray(rawReport)) {
              parsedReport = rawReport;
            } else if (typeof rawReport === "string") {
              // Parse the string only if it's a string
              parsedReport = JSON.parse(rawReport);
            } else {
              // console.warn(`Unexpected rawReport type at index ${i}:`, typeof rawReport);
              continue; // Skip if rawReport is neither an array nor a string
            }

            // Check if parsedReport is an array and contains data
            if (Array.isArray(parsedReport) && parsedReport.length > 0) {
              const filePath = parsedReport[0].upload;
              const { url } = await getUrl({ path: filePath });
              urls[i] = url;
            }
          } catch (err) {
            console.error("Error processing report at index", i, err);
          }
        }
        setFileUrls(urls);
      };

      fetchUrls();
    } catch (error) {
      console.error("Error parsing traineeTrack:", error);
    }
  }, [details, popupAll]);

  // console.log(storedData);

  return (
    <div className="fixed top-0 w-full left-0 bg-black bg-opacity-50 z-[9999] py-7 min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[45%] h-[550px] overflow-y-auto scrollBar ">
        <div className="flex justify-between items-center pb-3 ">
          <div className="w-full center">
            <img src={AweLogo} alt="Logo" className="max-w-[200px] " />
          </div>
          <button onClick={onClose} className="rounded-md">
            <IoIosCloseCircleOutline className="text-[32px] font-xs" />
          </button>
        </div>
        <h2 className="text-xl mt-2 font-bold underline text-center mb-7">
          Training Details
        </h2>
        <div className=" shadow-md rounded-md px-10 py-5">
          <article className="flex flex-col mb-4">
            {popupAll?.flatMap((field, index) => {
              // console.log(details[field.key]);
              return (
                <article key={index} className="mb-2 flex flex-col">
                  <article className="flex justify-between text-[14px]">
                    <p className="flex-1 text-start font-medium">
                      {field?.header}
                    </p>
                    {/* <p className="flex-1 text-center">:</p> */}
                    <p className="flex-1 text-start">{details[field?.key]}</p>
                  </article>
                </article>
              );
            })}
          </article>
          {storedData?.length > 0 &&
            storedData?.map((val, idx) => {
              return (
                <div key={idx} className="mb-4 pb-4">
                  <h3 className="font-bold underline mb-2">{`Training ${
                    idx + 1
                  }`}</h3>
                  {heading.map((item, index) => {
                    const value = val[item.key];
                    let formattedValue = value;

                    if (
                      item.key === "traineeED" ||
                      item.key === "traineeSD" ||
                      item.key === "medicalAppointDate" ||
                      item.key === "medicalExpiry"
                    ) {
                      formattedValue = DateFormat(value);
                    }

                    return (
                      <article
                        key={index}
                        className="flex justify-between text-[14px] mb-1 leading-7"
                      >
                        <p className="flex-1 text-start font-medium">
                          {item.header}
                        </p>
                        {/* <p className=" text-center">:</p> */}

                        <p className="flex-1 text-start">
                          {item.key === "medicalReport" ? (
                            fileUrls[idx] ? (
                              <a
                                href={fileUrls[idx]}
                                className="text-blue underline"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Download
                              </a>
                            ) : (
                              "N/A"
                            )
                          ) : (
                            // val[item.key] || "N/A"
                            formattedValue || "N/A"
                          )}
                        </p>
                      </article>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AddEmpPopup;
