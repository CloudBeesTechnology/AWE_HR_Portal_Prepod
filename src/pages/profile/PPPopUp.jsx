import React, { useEffect } from "react";
import avatar from "../../assets/navabar/avatar.jpeg";
import { getUrl } from "@aws-amplify/storage";
import { FiLoader } from "react-icons/fi";

import { IoCloseCircleOutline } from "react-icons/io5";
export const PPPopUp = ({
  handleProfile,
  profilePhoto,

  changeProfilePhoto,
  handleFileUpload,
  PPLastUP,
  setPPLastUP,
  loading,
  message,
  removeProfilePhoto,
}) => {
  const watchedEmpID = localStorage.getItem("userID").toString().toUpperCase();

  useEffect(() => {
    if (changeProfilePhoto?.profilePhoto) {
      const lastUploadProf = changeProfilePhoto.profilePhoto;

      const linkToStorageFile = async (url) => {
        const result = await getUrl({ path: url });
        setPPLastUP(result?.url?.toString());
      };
      linkToStorageFile(lastUploadProf);
    }
  }, [changeProfilePhoto]);

  return (
    <section className="fixed top-0 left-0 center w-full h-full z-50 bg-grey bg-opacity-15 inset-0">
      <div className="bg-white max-w-md w-full max-h-80 h-full rounded-md center flex-col shadow-xl p-5 gap-1">
        <div
          className="flex justify-end w-full h-[50px] "
          onClick={handleProfile}
        >
          <IoCloseCircleOutline className="text-[28px] text-dark_grey cursor-pointer" />
        </div>
        <div className="center pb-2">
          <div className="py-2 center flex-col max-w-[160px]">
            <input
              type="file"
              id="fileInput"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, "profilePhoto")}
              className="hidden"
            />
            <div className="h-[180px] w-[180px] border border-grey rounded-full center ">
              <div
                className={`h-[150px] w-[150px] rounded-full overflow-hidden flex items-center justify-center ${
                  loading ? "bg-lite_grey" : ""
                }`}
              >
                {loading && (
                  <FiLoader className="absolute animate-spin-slow text-grey text-[40px]" />
                )}
                <img
                  src={
                    // PPLastUP
                    //   ? PPLastUP
                    //   : changeProfilePhoto || profilePhoto || avatar
                    profilePhoto || avatar
                  }
                  id="previewImg"
                  alt="profile"
                  className={`object-cover w-full h-full ${
                    loading ? "opacity-50" : ""
                  }`}
                  onError={(e) => (e.target.src = avatar)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {/* <p className="text-dark_grey text_size_6">{message}</p> */}
        </div>
        <div className="flex justify-evenly items-center w-full pb-2">
          <button
            className="border-2 border-primary bg-[#FFFCD7] rounded-md px-5 py-2"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Change
          </button>

          <button
            className="border-2 border-primary rounded-md px-5 py-2"
            onClick={() => {
              removeProfilePhoto();
            }}
          >
            Remove
          </button>

          {/* <button
            className="border-2 border-primary bg-[#FFFCD7] rounded-md px-5 py-2"
            onClick={handleProfile}
          >
            Cancel
          </button> */}
        </div>
      </div>
    </section>
  );
};
