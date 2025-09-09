import { generateClient } from "@aws-amplify/api";

export const useFetchDropdownValue = () => {
  const client = generateClient(); // GraphQL client
  let listOfJobcode = [];
  let listOfLocation = [];
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       let nextToken = null;
  //       let allData = [];

  //       try {
  //         do {
  //           const response = await client.graphql({
  //             query: listTimeSheets,
  //             variables: {
  //               limit: 20,
  //               nextToken,
  //             },
  //           });

  //           const fetchedData = response?.data?.listTimeSheets?.items || [];
  //           nextToken = response?.data?.listTimeSheets?.nextToken;

  //           allData = [...allData, ...fetchedData];
  //         } while (nextToken);
  //       } catch (error) {}
  //     };

  //     fetchData();
  //   }, []);

  const allData = [
    { id: "12342", dropDownType: "JOBCODE", value: "JC0001" },
    { id: "87658", dropDownType: "JOBCODE", value: "JC0002" },
    { id: "65645", dropDownType: "LOCATION", value: "BLNG" },
    { id: "51245", dropDownType: "LOCATION", value: "HO" },
  ];

  allData?.forEach((val, index) => {
    if (val?.dropDownType === "JOBCODE") {
      listOfJobcode.push({
        id: index + 1,
        JOBCODE: val?.value,
      });
    } else if (val?.dropDownType === "LOCATION") {
      listOfLocation.push({
        id: index + 1,
        location: val?.value,
      });
    }
  });

  console.log("listOfJobcode : ", listOfJobcode);
  console.log("listOfLocation : ", listOfLocation);

  return { listOfJobcode, listOfLocation };
};
