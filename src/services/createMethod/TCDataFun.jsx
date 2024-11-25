import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createTrainingCertificates } from "../../graphql/mutations";

export const TCDataFun = () => {
  const client = generateClient();
  const SubmitMPData = useCallback(async ({ TCValue  }) => {
    if (!TCValue ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      empID:TCValue.empID,
      courseCode:TCValue.courseCode,
      courseName:TCValue.courseName,
      company:TCValue.company,
      certifiExpiry:TCValue.certifiExpiry,
      department:TCValue.department,
      empBadgeNo:TCValue.empBadgeNo,
      employeeName:TCValue.employeeName,
      eCertifiDate:TCValue.eCertifiDatev,
      trainingUpCertifi: JSON.stringify(TCValue.trainingUpCertifi),
      orgiCertifiDate:TCValue.orgiCertifiDate,
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createTrainingCertificates,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully stored data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { SubmitMPData };
};
