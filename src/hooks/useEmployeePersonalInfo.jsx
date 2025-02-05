import { useState, useEffect } from "react";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos, listEmpWorkInfos } from "../graphql/queries";

const client = generateClient();

const useEmployeePersonalInfo = (userID) => {
  const [personalInfo, setPersonalInfo] = useState({
    empID: "",
    profilePhoto: "",
    name: "",
    email: "",
    officialEmail: "",
    contactNo: "",
  });

  const [workInfo, setWorkInfo] = useState({
    empID: "",
    department: "",
    position: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let allEmpPersonalInfos = [];
      let allEmpWorkInfos = [];

      let nextTokenPersonal = null;
      let nextTokenWork = null;

      try {
        do {
          const response = await client.graphql({
            query: listEmpPersonalInfos,
            variables: {
              nextToken: nextTokenPersonal,
            },
          });

          allEmpPersonalInfos = [
            ...allEmpPersonalInfos,
            ...response.data.listEmpPersonalInfos.items,
          ];

          nextTokenPersonal = response.data.listEmpPersonalInfos.nextToken;
        } while (nextTokenPersonal);

        do {
          const response = await client.graphql({
            query: listEmpWorkInfos,
            variables: {
              nextToken: nextTokenWork,
            },
          });

          allEmpWorkInfos = [
            ...allEmpWorkInfos,
            ...response.data.listEmpWorkInfos.items,
          ];

          nextTokenWork = response.data.listEmpWorkInfos.nextToken;
        } while (nextTokenWork);

        if (allEmpPersonalInfos.length === 0) {
          setError("No employee data found.");
          setLoading(false);
          return;
        }

        const userPersonalInfo = allEmpPersonalInfos.find(
          (emp) => emp.empID.toLowerCase() === userID.toLowerCase()
        );

        if (userPersonalInfo) {
          setPersonalInfo({
            empID: userPersonalInfo.empID,
            profilePhoto: userPersonalInfo.profilePhoto,
            name: userPersonalInfo.name,
            email: userPersonalInfo.email,
            officialEmail: userPersonalInfo.officialEmail,
            contactNo: userPersonalInfo.contactNo || "",
          });
        } else {
          setError(`No matching employee found for userID: ${userID}`);
        }

        const userWorkInfo = allEmpWorkInfos.find(
          (emp) => emp.empID.toLowerCase() === userID.toLowerCase()
        );

        if (userWorkInfo) {
          setWorkInfo({
            empID: userWorkInfo.empID,
            department: userWorkInfo.department,
            position: userWorkInfo.position,
          });
        } else {
          // console.log(`No matching work info for userID: ${userID}`); 
        }
      } catch (err) {
        setError("Error fetching employee data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
        console.log("Finished fetching employee data"); 
      }
    };

    if (userID) {
      // console.log("Starting to fetch data for userID:", userID); 
      fetchData();
    }
  }, [userID]);

  return { personalInfo, workInfo, loading, error };
};

export default useEmployeePersonalInfo;
