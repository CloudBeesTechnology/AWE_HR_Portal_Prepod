import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createTrainingReq } from "../../graphql/mutations";

export const AddEmpFun = () => {
  const client = generateClient();
  const AddEmpData = useCallback(async ({ AddEmpValue  }) => {
    if (!AddEmpValue ) {
      throw new Error("Missing required parameters");
    }

    const totalData = {
      empID:AddEmpValue.empID,
      MRNo: AddEmpValue.MRNo,
      medicalName: AddEmpValue.medicalName,
      medicalExpiry: AddEmpValue.medicalExpiry,
      medicalAppointDate: AddEmpValue.medicalAppointDate,
      medicalReport: [JSON.stringify(AddEmpValue.medicalReport)],
      courseCode: [AddEmpValue.courseCode],
      courseName: [AddEmpValue.courseName],
      company: [AddEmpValue.company],
      traineeSD: AddEmpValue.traineeSD,
      traineeED: AddEmpValue.traineeED,
      traineeStatus: AddEmpValue.traineeStatus,
      traineeCourseFee: AddEmpValue.traineeCourseFee,
      mediRequired: AddEmpValue.mediRequired,
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: createTrainingReq,
             variables: {
               input: totalData,
             },
           })
         ])
         console.log(storedData,"successfully create data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { AddEmpData };
};
