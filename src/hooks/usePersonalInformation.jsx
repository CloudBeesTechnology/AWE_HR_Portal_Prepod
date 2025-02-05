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
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let allEmpPersonalInfos = [];
    let nextToken = null;

    try {
      do {
        const response = await client.graphql({
          query: listEmpPersonalInfos,
          variables: {
            nextToken,
          },
        });

        allEmpPersonalInfos = [
          ...allEmpPersonalInfos,
          ...response.data.listEmpPersonalInfos.items,
        ];

        // console.log("Personal Details", allEmpPersonalInfos);
        

        nextToken = response.data.listEmpPersonalInfos.nextToken;
      } while (nextToken);

      const userPersonalInfo = allEmpPersonalInfos.find(
        (emp) => emp.empID.toLowerCase() === userID.toLowerCase()
      );

      if (userPersonalInfo) {
        setPersonalInfo({
          id: userPersonalInfo.id,
          name: userPersonalInfo.name,
          email: userPersonalInfo.email,
          contactNo: userPersonalInfo.contactNo || "",
          dob: userPersonalInfo.dob || "",
        });
      } else {
        setError(`No employee found with ID: ${userID}`);
      }
    } catch (err) {
      setError("Error fetching employee personal information.");
      console.error("Error fetching employee personal info:", err);
    } finally {
      setLoading(false);
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
    };

    try {
      const response = await client.graphql({
        query: updateEmpPersonalInfo,
        variables: { input },
      });

      if (response.data.updateEmpPersonalInfo) {
        const updatedInfo = response.data.updateEmpPersonalInfo;
        setPersonalInfo({
          id: updatedInfo.id,
          name: updatedInfo.name,
          email: updatedInfo.email,
          contactNo: updatedInfo.contactNo,
          dob: updatedInfo.dob,
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

  return {
    personalInfo,
    isEditing,
    setIsEditing,
    handleSave,
    setPersonalInfo,
    loading,
    error,
  };
};
