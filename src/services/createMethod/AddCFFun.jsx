import { generateClient } from "@aws-amplify/api";
import { useCallback } from "react";
import { createAddCourse } from "../../graphql/mutations";

export const AddCFFun = () => {
  const client = generateClient();
  const AddCourseData = useCallback(async ({ AddCFCre }) => {
    if (!AddCFCre) {
      throw new Error("Missing required parameters");
    }
    const totalData = {
      courseSelect: AddCFCre.courseSelect,
      courseName: AddCFCre.courseName,
      company: AddCFCre.company,
    };
    console.log(totalData);

    try {
      const storedData = await Promise.all([
        client.graphql({
          query: createAddCourse,
          variables: {
            input: totalData,
          },
        }),
      ]);
      console.log(storedData, "successfully stored data");
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; // Rethrow error if needed
    }
  }, []);
  return { AddCourseData };
};
