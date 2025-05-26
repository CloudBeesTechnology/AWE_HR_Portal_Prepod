import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../graphql/queries";

const client = generateClient();

export const usePersonalDetails = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const userID = localStorage.getItem("userID");
      if (!userID) {
        setError("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      let allPersonalInfos = [];
      let nextToken = null;

      try {
        do {
          const response = await client.graphql({
            query: listEmpPersonalInfos,
            variables: {
              // filter: {
              //   empID: { eq: userID },
              // },
              nextToken,
            },
          });

          allPersonalInfos = [
            ...allPersonalInfos,
            ...response.data.listEmpPersonalInfos.items,
          ];

          nextToken = response.data.listEmpPersonalInfos.nextToken;
        } while (nextToken);

        // Find the specific employee's data
        const userData = allPersonalInfos.find((emp) => emp.empID === userID);

        if (!userData) {
          setError(`No employee found with ID: ${userID}`);
          setPersonalInfo(null);
        } else {
          setPersonalInfo({
            empID: userData.empID,
            profilePhoto: userData.profilePhoto || "",
            name: userData.name || "",
            email: userData.email || "",
            officialEmail: userData.officialEmail || "",
            contactNo: userData.contactNo || "",
          });
        }
      } catch (err) {
        setError("Error fetching employee data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("personalInfo", personalInfo);

  return {
    personalInfo,
    loading,
    error,
    notFound: !personalInfo && !loading && !error,
  };
};
