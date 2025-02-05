import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { updateAddCourse } from "../../graphql/mutations";

export const AddCFUpdate = () => {
  const client = generateClient();
  const AddCUpdateFun = useCallback(async ({ AddCFUpp }) => {
    if (!AddCFUpp ) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
        id:AddCFUpp.id,
        courseSelect:AddCFUpp.courseSelect,
        courseName:AddCFUpp.courseName,
        company:AddCFUpp.company,
    };
    // console.log(totalData);

    try {
      const storedData=   await Promise.all([
           client.graphql({
             query: updateAddCourse,
             variables: {
               input: totalData, 
             },
           })
         ])
        //  console.log(storedData,"successfully Updated data");

       } catch (error) {
        console.log(error);
        
         console.error("Error executing GraphQL requests:", error);
         throw error; // Rethrow error if needed
       }
  }, []);
  return { AddCUpdateFun };
};