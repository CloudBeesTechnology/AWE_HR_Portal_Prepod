// src/hooks/usePersonalInformation.js
import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../graphql/queries";
import { updateEmpPersonalInfo } from "../graphql/mutations";

const client = generateClient();

export const usePersonalInformation = (userID) => {
  const [personalInfo, setPersonalInfo] = useState({
    id: "",
    name: "",
    email: "",
    contactNo: "",
    dob: "",
    // _version: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const empPersonalInfosData = await client.graphql({
        query: listEmpPersonalInfos,          variables: { limit: 20000 },

      });

      const empPersonalInfos = empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
      const userPersonalInfo = empPersonalInfos.find(emp => emp.empID.toLowerCase() === userID.toLowerCase());

      if (userPersonalInfo) {
        setPersonalInfo({
          id: userPersonalInfo.id,
          name: userPersonalInfo.name,
          email: userPersonalInfo.email,
          contactNo: userPersonalInfo.contactNo || "",
          dob: userPersonalInfo.dob || "",
        //   _version: userPersonalInfo._version,
        });
      }
    } catch (err) {
      console.error("Error fetching employee personal infos:", err);
    }
  };

  const handleSave = async () => {
    const input = {
      id: personalInfo.id,
      empID: userID.toUpperCase(),
      name: personalInfo.name,
      email: personalInfo.email,
      contactNo: personalInfo.contactNo,
      dob: personalInfo.dob,
    //   _version: personalInfo._version || 1,
    };

    try {
      const response = await client.graphql({
        query: updateEmpPersonalInfo,
        variables: { input ,          variables: { limit: 20000 },
      },
      });

      if (response.data.updateEmpPersonalInfo) {
        const updatedInfo = response.data.updateEmpPersonalInfo;
        setPersonalInfo({
          id: updatedInfo.id,
          name: updatedInfo.name,
          email: updatedInfo.email,
          contactNo: updatedInfo.contactNo,
          dob: updatedInfo.dob,
        //   _version: updatedInfo._version,
        });
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchData();
    }
  }, [userID]);
  // console.log(personalInfo, "Ih")

  return {
    personalInfo,
    isEditing,
    setIsEditing,
    handleSave,
    setPersonalInfo,
  };
};
