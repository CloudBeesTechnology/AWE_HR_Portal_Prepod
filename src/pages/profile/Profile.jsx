import { IoCameraOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { signOut } from "@aws-amplify/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { PPPopUp } from "./PPPopUp";
import { UploadProfile } from "../../services/uploadsDocsS3/UploadProfile";
import avatar from "../../assets/navabar/avatar.jpeg";
import { handleDeleteFile } from "../../services/uploadsDocsS3/DeleteDocs";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../../graphql/queries";
import { updateEmpPersonalInfo } from "../../graphql/mutations";
const client = generateClient();
export const Profile = ({
  setIsOpen,
  profilePhoto,
  name,
  email,
  contactNo,
  getPPhotoString,
  setPersonalInfo,
  handleAfterUpload,
  loading,
  setLoading,
}) => {
  const fileInputRef = useRef(null);
  const watchedEmpID = localStorage.getItem("userID").toString().toUpperCase();
  const [changeProfilePhoto, setChangeProfilePhoto] = useState("");

  const [PPLastUP, setPPLastUP] = useState(null);
  const [popup, setPopUp] = useState(false);

  const [message, setMessage] = useState("");
  const handleProfile = () => {
    setPopUp(!popup);
  };

  const SignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("userID");
      localStorage.removeItem("userType");

      window.location.href = "/login";
    } catch (error) {
      // console.log("Error signing out", error);
    }
  };

  const deleteFile = async (fileName, watchedEmpID) => {
    try {
      await handleDeleteFile("profilePhoto", fileName, watchedEmpID);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const removeProfilePhoto = useCallback(async () => {
    try {
      setLoading(true);
      setMessage("Removing profile photo...");
      const fileName = getPPhotoString.split("/").pop();

      await deleteFile(fileName, watchedEmpID);

      setChangeProfilePhoto("");
      setPersonalInfo(({ profilePhoto, ...rest }) => ({
        ...rest,
        profilePhoto: null,
      }));
      setPPLastUP(null);

      await onSubmit(null, watchedEmpID);
      // await handleAfterUpload();
    } catch (err) {
    } finally {
    }
  }, [getPPhotoString]);

  const onSubmit = async (fileName, watchedEmpID) => {
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

          // window.location.reload();

          // setPPLastUP(null);

          let result = empDetails?.profilePhoto;
          const fileName = result?.split("/").pop();
          if (fileName !== "null") {
            await handleAfterUpload();
            // setLoading(false);
          } else if (fileName === "null") {
            setLoading(false);
          }

          const message =
            fileName === "null"
              ? "Profile photo removed."
              : fileName
              ? "Profile photo added."
              : "Change Profile File";

          setMessage(message);
        }
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    }

    async function fetchEmployeeData() {
      const empDetails = await fetchAllData(listEmpPersonalInfos);

      const fileKey = `public/${"profilePhoto"}/${watchedEmpID}/${fileName}`;
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

  const handleFileUpload = async (e, type) => {
    try {
      setLoading(true);
      setMessage("Uploading profile photo...");
      const fileInput = e.target;

      const file = fileInput.files[0];

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

      if (file) {
        setPopUp(true);
      }

      // setSelectedFile(file.name);
      await deleteFile(file.name, watchedEmpID);
      await UploadProfile(file, type, setChangeProfilePhoto, watchedEmpID);
      await onSubmit(file.name, watchedEmpID);
      fileInput.value = "";
    } catch (err) {}
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section>
      <div className="center flex-col gap-2 py-2">
        <div className="relative">
          <div className="max-w-10 h-10 w-full rounded-full center relative overflow-hidden shadow-md shadow-[#00000033]">
            <img
              className="w-full object-cover h-full "
              src={profilePhoto || avatar}
              alt="avatar not found"
              onError={(e) => (e.target.src = avatar)}
            />
          </div>
          <input
            type="file"
            id="fileInput"
            name="profilePhoto"
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e, "profilePhoto")}
            className="hidden"
          />
          <p
            className="absolute -right-2 bottom-0 h-5 w-5 rounded-full bg-[#D9D9D9] center"
            onClick={() => {
              handleUploadButtonClick();
            }}
          >
            <IoCameraOutline className="text-xs text-dark_grey cursor-pointer" />
          </p>
        </div>
        <Link
          to="/personalInformation"
          className="text-xs text-dark_grey"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Personal Info Edit
        </Link>
        <div className="h-1 w-full bg-[#AAAAAA]"></div>
      </div>
      <div className="space-y-2 mb-3 px-4">
        <div className=" space-y-1 text-[#4F4F4F] text-xs">
          <label htmlFor="name" className="font-medium ">
            Name
          </label>
          <div className="border flex-1 rounded-md border-[#d4cfcf]  px-2 py-1 ">
            <input
              id="name"
              className="outline-none w-full"
              type="text"
              value={name}
              readOnly
            />
          </div>
        </div>
        <div className=" space-y-1 text-[#4F4F4F] text-xs">
          <label htmlFor="phoneNo" className="font-medium ">
            Phone Number
          </label>
          <div className="border rounded-md border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-1 ">
            <input
              id="phoneNo"
              className="outline-none w-full"
              type="text"
              value={contactNo}
              readOnly
            />
          </div>
        </div>
        <div className=" space-y-1 text-[#4F4F4F] text-xs">
          <label htmlFor="email" className="font-medium ">
            Email
          </label>
          <div className="border rounded-md border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-1 ">
            <input
              id="email"
              className="outline-none w-full"
              type="text"
              value={email}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-dark_grey font-semibold pt-3">
          <Link
            to="/changePassword"
            className="py-1 px-2 border-2 rounded-md border-primary "
          >
            Change Password
          </Link>
          <Link
            className={`flex items-center gap-1 py-1 px-2 bg-primary  rounded-md `}
            onClick={SignOut}
          >
            Logout
            <span>
              <IoMdLogOut className="text-lg text-dark_grey" />
            </span>
          </Link>
        </div>
      </div>

      {popup && (
        <PPPopUp
          handleProfile={handleProfile}
          profilePhoto={profilePhoto}
          changeProfilePhoto={changeProfilePhoto}
          handleFileUpload={handleFileUpload}
          PPLastUP={PPLastUP}
          setPPLastUP={setPPLastUP}
          loading={loading}
          message={message}
          removeProfilePhoto={removeProfilePhoto}
        />
      )}
    </section>
  );
};
