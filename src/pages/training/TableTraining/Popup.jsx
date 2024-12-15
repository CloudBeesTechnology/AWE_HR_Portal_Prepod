import { getUrl } from "@aws-amplify/storage";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AweLogo from "../../../assets/logo/logo-with-name.svg";

const Popup = ({ details, popupAll, onClose }) => {
  const [fileUrls, setFileUrls] = useState({}); // To store resolved URLs
  const uploadFields = [
    "medicalReport",
    "blastingUpload",
    "trainingUpCertifi",
    "weldingUpload",
  ]; // List of keys that are upload fields

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = {};

      for (const field of popupAll) {
        if (uploadFields.includes(field.key)) {
          // Check if the field is an upload field
          const value = details[field.key];
          if (value) {
            const fileKey = JSON.parse(value);
            if (Array.isArray(fileKey) && fileKey.length > 0) {
              const lastUpload = fileKey[fileKey.length - 1].upload;
              try {
                // const trimmedPath = lastUpload?.replace(/^public\//, ""); // Remove 'public/' if it exists
                const result = await getUrl({ path: lastUpload });

                urls[field.key] = result.url.href; // Store resolved URL for the specific file
              } catch (error) {
                console.error(`Error fetching URL for ${field.key}:`, error);
              }
            }
          }
        }
      }

      setFileUrls(urls); // Update state with the resolved URLs
    };

    fetchUrls();
  }, [details, popupAll]);

  return (
    <div className="fixed top-0 w-full left-0 bg-black bg-opacity-50 z-[9999] py-10 min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[40%] overflow-y-auto scrollBar">
       <div className="flex justify-between items-center pb-3 ">
<div className="w-full  center ">
<img src={AweLogo} alt="Logo" className="max-w-[200px] " />
</div>       
<button
          onClick={onClose}
          className="rounded-md  "
        >
          <IoIosCloseCircleOutline className="text-[32px] font-xs" />
        </button>
       
       </div>
       <h2 className="text-xl mt-2 font-bold underline text-center mb-7">
          Candidate Details
        </h2>
        <div className=" shadow-md rounded-md px-10">
          <article className="flex flex-col">
            {popupAll.map((field, index) => {
              // console.log(details[field.key]);

              return (
                <article key={index} className="mb-2 flex flex-col">
                <article className="flex justify-between text-[14px]">
                  <p className="flex-1 text-start font-medium">
                    {field.header}
                  </p>
                  <p className="flex-1 text-center">:</p>
                  <p className="flex-1 text-start">
                    {uploadFields.includes(field.key) && fileUrls[field.key] ? (
                      <a
                        href={fileUrls[field.key]}
                        // target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue underline"
                      >
                        Download
                      </a>
                    ) : (
                      // If the value is an empty array or undefined, show "N/A"
                      (Array.isArray(details[field.key]) && details[field.key].length === 0) || !details[field.key] ? "N/A" : details[field.key]
                    )}
                  </p>
                </article>
              </article>
              
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
};

export default Popup;