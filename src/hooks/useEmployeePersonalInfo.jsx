import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../graphql/queries";

const client = generateClient();

const useEmployeePersonalInfo = (userID) => {
  const [personalInfo, setPersonalInfo] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    contactNo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`useEmployeePersonalInfo: Fetching data for userID: ${userID}`);
    
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching employee data...");
        const empPersonalInfosData = await client.graphql({
          query: listEmpPersonalInfos,
        });

        const empPersonalInfos = empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];
        console.log("Fetched employee data:", empPersonalInfos);

        if (empPersonalInfos.length === 0) {
          setError("No employee data found.");
          console.log("No employee data found.");
          setLoading(false);
          return;
        }

        const userPersonalInfo = empPersonalInfos.find(
          (emp) => emp.empID.toLowerCase() === userID.toLowerCase()
        );
        console.log("Matching user data: 20000", userPersonalInfo);

        if (userPersonalInfo) {
          setPersonalInfo({
            profilePhoto: userPersonalInfo.profilePhoto,
            name: userPersonalInfo.name,
            email: userPersonalInfo.email,
            contactNo: userPersonalInfo.contactNo || "",
          });
        } else {
          setError(`No matching employee found for userID: ${userID}`);
          console.log(`No matching employee found for userID: ${userID}`);
        }
      } catch (err) {
        setError("Error fetching employee personal info.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
        console.log("Data fetching completed.");
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

  return { personalInfo, loading, error };
};

export default useEmployeePersonalInfo;
