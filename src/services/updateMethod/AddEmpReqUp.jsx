import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateTrainingReq } from "../../graphql/mutations";

export const AddEmpReqUp = () => {
  const client = generateClient();
  const TrReqUp = useCallback(async ({ TMRDataUp  }) => {
    if (!TMRDataUp ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        id:TMRDataUp.id,
      empID:TMRDataUp.empID,
      MRNo: TMRDataUp.MRNo,
      medicalName: TMRDataUp.medicalName,
      medicalExpiry: TMRDataUp.medicalExpiry,
      medicalAppointDate: TMRDataUp.medicalAppointDate,
      medicalReport: [JSON.stringify(TMRDataUp.medicalReport)],
      courseCode: [TMRDataUp.courseCode],
      courseName: [TMRDataUp.courseName],
      company: [TMRDataUp.company],
      traineeSD: TMRDataUp.traineeSD,
      traineeED: TMRDataUp.traineeED,
      traineeStatus: TMRDataUp.traineeStatus,
      traineeCourseFee: TMRDataUp.traineeCourseFee,
      mediRequired: TMRDataUp.mediRequired,
    };
    console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateTrainingReq,
             variables: {
               input: totalData, limit:20000,
             },
           })
         ])
         console.log(storedData,"successfully update data");

       } catch (error) {
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { TrReqUp };
};
