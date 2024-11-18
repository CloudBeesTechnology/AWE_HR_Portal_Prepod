import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { usePersonalInformation } from "../../hooks/usePersonalInformation";



export const PersonalInformation = () => {
  const [userID, setUserID] = useState("");
  const {
    personalInfo,
    isEditing,
    setIsEditing,
    handleSave,
    setPersonalInfo,
  } = usePersonalInformation(userID);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    console.log("UserID from localStorage:", userID);
  }, []);


  return (
    <section className="screen-size center py-20">
      <div className="rounded-lg shadow-lg p-5 px-10 space-y-4 max-w-xl w-full text_size_8 text-dark_grey">
        <div className="flex items-center justify-between">
          <h3 className="text_size_2">Personal Information</h3>
          <Link to="/dashboard">
            <IoMdClose className="text-2xl font-semibold" />
          </Link>
        </div>
        <hr className="border border-[#d4cfcf]" />
        <section className="space-y-4">
          <div className="flex justify-between gap-10">
            <div className="w-full space-y-2 ">
              <label htmlFor="name">Name</label>
              <div className="border rounded-sm flex-1 border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-3 ">
                <input
                  id="name"
                  className="outline-none w-full"
                  type="text"
                  name="name"
                  readOnly={!isEditing}
                  value={personalInfo.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email Address</label>
            <div className="border rounded-sm border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-3 ">
              <input
                id="email"
                className="outline-none w-full"
                type="email"
                name="email"
                readOnly={!isEditing}
                value={personalInfo.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between gap-10">
            <div className="w-full space-y-2">
              <label htmlFor="contactNo">Mobile Number</label>
              <div className="border rounded-sm flex-1 border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-3.5 ">
                <input
                  id="contactNo"
                  className="outline-none w-full"
                  type="text"
                  name="contactNo"
                  readOnly={!isEditing}
                  value={personalInfo.contactNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="dob">Date of Birth</label>
              <div className="border flex rounded-sm flex-1 border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-3 ">
                <input
                  id="dob"
                  className="outline-none w-full"
                  type="text"
                  name="dob"
                  readOnly={!isEditing}
                  value={personalInfo.dob}
                  onChange={handleChange}
                />
                <span>
                  <IoCalendarNumberOutline className="text-xl" />
                </span>
              </div>
            </div>
          </div>
          <div className="center flex justify-between py-3">
            {isEditing ? (
              <button onClick={handleSave} className="primary_btn">
                Save
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="primary_btn">
                Edit
              </button>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
