import { generateClient } from "@aws-amplify/api";
import { listTimesheetDropdowns } from "../../../graphql/queries";
import { useEffect, useState } from "react";

export const useFetchDropdownValue = () => {
  const client = generateClient(); // GraphQL client
  const [listOfJobcode, setListOfJobcode] = useState([]);
  const [listOfLocation, setListOfLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let nextToken = null;
      let allData = [];

      try {
        do {
          const response = await client.graphql({
            query: listTimesheetDropdowns,
            variables: {
              limit: 20,
              nextToken,
            },
          });

          const fetchedData =
            response?.data?.listTimesheetDropdowns?.items || [];
          nextToken = response?.data?.listTimesheetDropdowns?.nextToken;

          allData = [...allData, ...fetchedData];
        } while (nextToken);

        // filter and map data
        const jobcodes = allData
          .filter(
            (val) =>
              String(val?.dropdownType)?.toUpperCase()?.trim() === "JOBCODE"
          )
          .map((val, index) => ({
            id: index + 1,
            JOBCODE: val?.value,
          }));

        const locations = allData
          .filter(
            (val) =>
              String(val?.dropdownType)?.toUpperCase()?.trim() === "LOCATION"
          )
          .map((val, index) => ({
            id: index + 1,
            location: val?.value,
          }));

        setListOfJobcode(jobcodes);
        setListOfLocation(locations);
      } catch (error) {
        console.log("ERROR : ", error);
      }
    };

    fetchData();
  }, []);

  return { listOfJobcode, listOfLocation };
};
