// export default AddCertifyPopUp;
import React, { useEffect, useState } from "react";
import AweLogo from "../../../assets/logo/logo-with-name.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getUrl } from "@aws-amplify/storage";
import { DateFormat } from "../../../utils/DateFormat";

const AddCertifyPopUp = ({ details, popupAll, onClose }) => {
  const [fileUrls, setFileUrls] = useState({});
  const [mergedData, setMergedData] = useState([]);

  // Updated heading with new fields
  const heading = [
    { header: "Course Name", key: "courseName" },
    { header: "Course Code", key: "courseCode" },
    { header: "Company", key: "company" },
    { header: "Training Start Date", key: "traineeSD" },
    { header: "Training End Date", key: "traineeED" },
    { header: "Certificate Expiry", key: "certifiExpiry" },
    { header: "e-Certificate Date", key: "eCertifiDate" },
    { header: "Original Certificate Date", key: "orgiCertifiDate" },
    { header: "PO Number", key: "poNo" },
    { header: "Expiry Condition", key: "addDescretion" },
    { header: "Training Remarks", key: "tcRemarks" },
    { header: "Uploaded Certificates", key: "trainingUpCertifi" },
  ];

  const safeParseData = (data) => {
    try {
      let raw;

      if (Array.isArray(data)) {
        raw = data[0];
      } else {
        raw = data;
      }

      if (typeof raw === "string" && raw.startsWith('"') && raw.endsWith('"')) {
        raw = JSON.parse(raw);
      }

      if (typeof raw === "string") {
        const fixedJSON = raw.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');
        const parsed = JSON.parse(fixedJSON);

        return Array.isArray(parsed) ? parsed : [parsed];
      }

      // ✅ If raw is already an object or array, wrap if needed
      return Array.isArray(raw) ? raw : [raw];
    } catch (error) {
      console.error("Error normalizing traineeTrackData:", error);
      return [];
    }
  };

  useEffect(() => {
    const parsedTraineeTrack = safeParseData(details?.traineeTrack);
    const parsedTrainingProof = safeParseData(details?.trainingProof);

    // Merge the data by combining traineeTrack with each trainingProof item
    const merged = parsedTrainingProof.map((proofItem, index) => ({
      ...(parsedTraineeTrack[index] || {}),
      ...proofItem,
    }));

    setMergedData(merged);

    const fetchUrls = async () => {
      const urls = {};
      for (let i = 0; i < merged.length; i++) {
        const item = merged[i];
        try {
          const parsedCert = JSON.parse(item?.trainingUpCertifi || "[]");
          if (parsedCert.length > 0) {
            const fileUrlsForItem = [];
            for (const cert of parsedCert) {
              const filePath = cert.upload;
              const { url } = await getUrl({ path: filePath });
              fileUrlsForItem.push({
                url,
                name: filePath.split('/').pop() // Extract filename from path
              });
            }
            urls[i] = fileUrlsForItem;
          }
        } catch (err) {
          console.error("Invalid certificate format:", err);
        }
      }
      setFileUrls(urls);
    };

    fetchUrls();
  }, [details, popupAll]);

  // Function to handle array fields (department and position)
  const getDisplayValue = (key, value) => {
    if (key === "department" || key === "position") {
      if (Array.isArray(value)) {
        return value[value.length - 1];
      }
    }
    return value;
  };

  console.log("Merged data", mergedData);
  

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
              const value = getDisplayValue(field.key, details[field.key]);
              return (
                <article key={index} className="mb-2 flex flex-col">
                  <article className="flex justify-between text-[14px]">
                    <p className="flex-1 text-start font-medium">
                      {field?.header}
                    </p>
                    <p className="flex-1 text-start">{value || "N/A"}</p>
                  </article>
                </article>
              );
            })}
          </article>
          {mergedData?.length > 0 &&
            mergedData?.map((val, idx) => {
              return (
                <div key={idx} className="mb-4 pb-4">
                  <h3 className="font-bold underline mb-2">{`Training ${
                    idx + 1
                  }`}</h3>
                  {heading.map((item, index) => {
                    const value = val[item.key];
                    let formattedValue = value;

                    if (
                      item.key === "certifiExpiry" ||
                      item.key === "eCertifiDate" ||
                      item.key === "orgiCertifiDate" ||
                      item.key === "traineeSD" ||
                      item.key === "traineeED"
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
                        <p className="flex-1 text-start">
                          {item.key === "trainingUpCertifi" ? (
                            fileUrls[idx] && fileUrls[idx].length > 0 ? (
                              <div className="flex flex-col">
                                {fileUrls[idx].map((file, fileIndex) => (
                                  <a
                                    key={fileIndex}
                                    href={file.url}
                                    className="text-blue underline mb-1"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {fileIndex + 1}. {file.name}
                                  </a>
                                ))}
                              </div>
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