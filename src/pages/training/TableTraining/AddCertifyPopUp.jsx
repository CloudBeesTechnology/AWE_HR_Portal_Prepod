import { getUrl } from "@aws-amplify/storage";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { DateFormat } from "../../../utils/DateFormat";

const AddCertifyPopUp = ({ details, popupAll, onClose }) => {
  const [fileUrls, setFileUrls] = useState({}); 
  const [mergedData, setMergedData] = useState([]);
  
  // Updated heading with new fields
  const heading = [
    { header: "Course Name", key: "courseName" },
    { header: "Course Code", key: "courseCode" },
    { header: "Company", key: "company" },
    { header: "Certificate Expiry", key: "certifiExpiry" },
    { header: "e-Certificate Date", key: "eCertifiDate" },
    { header: "Original Certificate Date", key: "orgiCertifiDate" },
    { header: "PO Number", key: "poNo" },
    { header: "Additional Discretion", key: "addDescretion" },
    { header: "Training Remarks", key: "tcRemarks" },
    { header: "Upload Certificate", key: "trainingUpCertifi" },
  ];

  useEffect(() => {
    const parsedTraineeTrack = JSON.parse(details?.traineeTrack || "[]");
    const parsedTrainingProof = JSON.parse(details?.trainingProof || "[]");

    // Merge the data by combining traineeTrack with each trainingProof item
    const merged = parsedTrainingProof.map((proofItem, index) => ({
      ...(parsedTraineeTrack[index] || {}), 
      ...proofItem
    }));
    
    
    setMergedData(merged);

    const fetchUrls = async () => {
      const urls = {};
      for (let i = 0; i < merged.length; i++) {
        const item = merged[i];
        try {
          const parsedCert = JSON.parse(item?.trainingUpCertifi || "[]");
          if (parsedCert.length > 0) {
            const filePath = parsedCert[0].upload;
            const { url } = await getUrl({ path: filePath });
            urls[i] = url; 
          }
        } catch (err) {
          console.error("Invalid certificate format:", err);
        }
      }
      setFileUrls(urls);
    };

    fetchUrls();
  }, [details, popupAll]);

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
        <div className="shadow-md rounded-md px-10 py-5">
          <article className="flex flex-col mb-4">
            {popupAll?.map((field, index) => {
              return (
                <article key={index} className="mb-2 flex flex-col">
                  <article className="flex justify-between text-[14px]">
                    <p className="flex-1 text-start font-medium">
                      {field?.header}
                    </p>
                    <p className="flex-1 text-start">{details[field?.key]}</p>
                  </article>
                </article>
              );
            })}
          </article>
          {mergedData?.length > 0 &&
            mergedData?.map((val, idx) => {
              return (
                <div key={idx} className="mb-4 pb-4">
                  <h3 className="font-bold underline mb-2">{`Training ${idx + 1}`}</h3>
                  {heading.map((item, index) => {
                    const value = val[item.key];
                    let formattedValue = value;

                    if (
                      item.key === "certifiExpiry" ||
                      item.key === "eCertifiDate" ||
                      item.key === "orgiCertifiDate"
                    ) {
                      formattedValue = DateFormat(value);
                    }

                    return (
                      <article key={index} className="flex justify-between text-[14px] mb-1 leading-7">
                        <p className="flex-1 text-start font-medium">
                          {item.header}
                        </p>
                        <p className="flex-1 text-start">
                          {item.key === "trainingUpCertifi" ? (
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

export default AddCertifyPopUp;
