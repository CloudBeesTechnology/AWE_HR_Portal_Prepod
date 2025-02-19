import React, { useEffect, useState } from "react";
import avatar from "../../assets/navabar/avatar.jpeg";
import { getUrl } from "@aws-amplify/storage";
import { MdOutlineCancel } from "react-icons/md";
import { handleDeleteFile } from "../../services/uploadDocsS3/DeleteDocs";
import { listEmpPersonalInfos } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { updateEmpPersonalInfo } from "../../graphql/mutations";
import { UploadProfile } from "../../services/uploadDocsS3/UploadProfile";

export const PPPopUp = ({
  handleProfile,
  profilePhoto,
  getPPhotoString,
  setPersonalInfo,
}) => {

  const client = generateClient();
  const [changeProfilePhoto, setChangeProfilePhoto] = useState("");
  const [PPLastUP, setPPLastUP] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isRemoveButtonVisible, setIsRemoveButtonVisible] = useState(false);
  const watchedEmpID = localStorage.getItem("userID").toString().toUpperCase();

  const handleFileUpload = async (e, type) => {
    if (!watchedEmpID) {
      return;
    }

    const file = e.target.files[0];

    if (!file) return;

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Upload must be a PDF file or an image (JPG, JPEG, PNG)");
      return;
    }

    setSelectedFile(file.name);
    await UploadProfile(file, type, setChangeProfilePhoto, watchedEmpID);
  };

  useEffect(() => {
    if (changeProfilePhoto?.profilePhoto) {
      const lastUploadProf = changeProfilePhoto.profilePhoto;
      const linkToStorageFile = async (url) => {
        const result = await getUrl({ path: url });
        setPPLastUP(result?.url?.toString());

        setIsButtonVisible(false);
        setIsRemoveButtonVisible(true);
      };
      linkToStorageFile(lastUploadProf);
    }
  }, [changeProfilePhoto]);

  useEffect(() => {
    if (getPPhotoString) {
      const fileName = getPPhotoString.split("/").pop();

      if (String(fileName) === String(null)) {
        setIsButtonVisible(true);
        setIsRemoveButtonVisible(false);
      } else {
        setIsRemoveButtonVisible(true);
      }
      setSelectedFile(fileName);
      // setPPLastUP(null);
      // setChangeProfilePhoto("");
      // // profilePhoto=null
    }
  }, [getPPhotoString]);
  const deleteFile = async () => {
    if (!selectedFile) return;

    try {
      await handleDeleteFile("profilePhoto", selectedFile, watchedEmpID);
      setPPLastUP(null);
      setChangeProfilePhoto("");
      setSelectedFile(null);

      setPersonalInfo(({ profilePhoto, ...rest }) => ({
        ...rest,
        profilePhoto: null,
      }));
      setIsButtonVisible(true);
      setIsRemoveButtonVisible(false);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // id:,profilePhoto || null - updatemethod

  const onSubmit = () => {
    async function fetchAllData(queryName) {
      let allData = [];
      let nextToken = null;
      const filter = {
        and: [
          {
            empID: { eq: watchedEmpID || null },
          },
        ],
      };
      do {
        const response = await client.graphql({
          query: queryName,
          variables: { filter: filter, nextToken },
        });

        const items = response.data[Object.keys(response.data)[0]].items;
        allData = [...allData, ...items];
        nextToken = response.data[Object.keys(response.data)[0]].nextToken;
      } while (nextToken);

      return allData;
    }

    async function updateProfile(data) {
      try {
        for (const input of data) {
          const { __typename, createdAt, updatedAt, ...validTimeSheet } = input;
          const response = await client.graphql({
            query: updateEmpPersonalInfo,
            variables: { input: validTimeSheet },
          });

          const empDetails = response.data.updateEmpPersonalInfo;

          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    }

    async function fetchEmployeeData() {
      const empDetails = await fetchAllData(listEmpPersonalInfos);

      const fileKey = `public/${"profilePhoto"}/${watchedEmpID}/${selectedFile}`;
      const updatedData = empDetails.map((val) => {
        return {
          ...val,
          profilePhoto: fileKey || null,
        };
      });
      updateProfile(updatedData);
    }

    fetchEmployeeData();
  };
  return (
    <section className="fixed top-0 left-0 center w-full h-full z-50 bg-grey bg-opacity-15 inset-0">
      <div className="bg-white max-w-md w-full max-h-72 h-full rounded-md center flex-col shadow-xl p-5 gap-5">
        <button className="absolute top-4 right-5" onClick={handleProfile}>
          <MdOutlineCancel size={30} className="text-dark_grey" />
        </button>
        <div className="center">
          <div className="py-2 center flex-col max-w-[160px]">
            <input
              type="file"
              id="fileInput"
              name="profilePhoto"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, "profilePhoto")}
              className="hidden"
            />
            <div className="h-[180px] w-[180px] border border-grey rounded-full center">
              <div className="h-[150px] w-[150px] rounded-full overflow-hidden bg-lite_skyBlue">
                <img
                  src={
                    PPLastUP
                      ? PPLastUP
                      : changeProfilePhoto || profilePhoto || avatar
                  }
                  id="previewImg"
                  alt="profile"
                  className="object-cover w-full h-full"
                  onError={(e) => (e.target.src = avatar)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center w-full">
          {isButtonVisible && (
            <button
              className="border-2 border-primary bg-[#FFFCD7] rounded-md px-5 py-2"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Change
            </button>
          )}
          <button
            className="border-2 border-primary bg-[#FFFCD7] rounded-md px-5 py-2"
            onClick={() => {
              onSubmit();
            }}
          >
            Save
          </button>

          {isRemoveButtonVisible && (
            <button
              className="border-2 border-primary rounded-md px-5 py-2"
              onClick={deleteFile}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
