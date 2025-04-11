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
    const parsedData = JSON.parse(details?.traineeTrack || "[]");

    setStoredData(parsedData);
    const fetchUrls = async () => {
      const urls = {};
      for (let i = 0; i < parsedData.length; i++) {
        const item = parsedData[i];
        try {
          const parsedReport = JSON.parse(item?.medicalReport || "[]");
          if (parsedReport.length > 0) {
            const filePath = parsedReport[0].upload;
            const { url } = await getUrl({ path: filePath });
            urls[i] = url; // index-based mapping
          }
        } catch (err) {
          console.error("Invalid report format:", err);
        }
      }
      setFileUrls(urls);
    };

    fetchUrls();
  }, [details, popupAll]);
  console.log(storedData);

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
            {popupAll?.map((field, index) => {
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
