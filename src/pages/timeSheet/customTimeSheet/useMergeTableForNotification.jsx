// import { useEffect, useState } from "react";
// import { listEmpPersonalInfos } from "../../../graphql/queries";
// import { generateClient } from "@aws-amplify/api";

// const client = generateClient();

// export const useMergeTableForNotification = (responseData, Position) => {
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const empPersonalInfosResponse = await client.graphql({
//           query: listEmpPersonalInfos,
//         });

//         const candidates =
//           empPersonalInfosResponse?.data?.listEmpPersonalInfos?.items;

//         if (candidates) {
//           if (Position !== "Manager") {
//             const result = candidates.find((fil) => {
//               if (fil.empBadgeNo === responseData.assignTo) {
//                 return fil;
//               }
//             });

//             setEmail(result || null);
//           } else  {
//             const result = candidates.find((fil) => {
//               if (fil.empID === responseData.assignBy) {
//                 return fil;
//               }
//             });
// console.log(result)
//             setEmail(result || null);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err.message);
//       }
//     };

//     if (responseData?.assignTo) {
//       fetchData();
//     }
//   }, [responseData]);

//   return email;
// };

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import { useEffect, useState } from "react";
// import { listEmpPersonalInfos, listTimeSheets } from "../../../graphql/queries";
// import { generateClient } from "@aws-amplify/api";

// const client = generateClient();

// export const useMergeTableForNotification = (responseData, Position) => {
//   const [email, setEmail] = useState({});
//   console.log(responseData);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [empPersonalInfos] = await Promise.all([
//           client.graphql({ query: listEmpPersonalInfos }),
//         ]);

//         const candidates = empPersonalInfos?.data?.listEmpPersonalInfos?.items;

//         if (candidates) {
//           const getManager = candidates.find((fil) => {
//             if (fil.empBadgeNo === responseData.assignTo) {
//               return fil;
//             }
//           });

//           const getTimeKeeper = candidates.find((fil) => {
//             if (fil.empID === responseData.assignBy) {
//               // return { empInfo: fil, TimeSheet: responseData };
//               return fil;
//             }
//           });
//           if (getManager && getTimeKeeper && responseData) {
//             setEmail({
//               ManagerDetails: getManager,
//               TimeSheetData: responseData,
//               TimeKeeperDetails: getTimeKeeper,

//             });
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err.message);
//       }
//     };

//     if (responseData) {
//       fetchData();
//     }
//   }, [responseData]);
//   console.log(email);
//   return email;
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
import { useEffect, useState } from "react";
import { listEmpPersonalInfos } from "../../../graphql/queries";
import { generateClient } from "@aws-amplify/api";

const client = generateClient();

export const useMergeTableForNotification = (responseData) => {
  const [email, setEmail] = useState(null);
  console.log("Response Data:", responseData);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const empPersonalInfosResponse = await client.graphql({
          query: listEmpPersonalInfos,
        });

        const candidates =
          empPersonalInfosResponse?.data?.listEmpPersonalInfos?.items;

        if (candidates && responseData) {
          const getManager = candidates.find(
            (candidate) => candidate.empBadgeNo === responseData.assignTo
          );

          const getTimeKeeper = candidates.find(
            (candidate) => candidate.empID === responseData.assignBy
          );
          // if (getManager || getTimeKeeper) {
            setEmail({
              ManagerDetails: getManager || null,
              TimeKeeperDetails: getTimeKeeper || null,
              TimeSheetData: responseData && responseData,
            });
          // }
        }
      } catch (err) {
        console.error("Error fetching data from GraphQL:", err.message);
      }
    };

 
  fetchData();
 
   

  }, [responseData]);

  console.log("Email State:", email);
  return email;
};
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import { useEffect, useState, useRef } from "react";
// import { listEmpPersonalInfos } from "../../../graphql/queries";
// import { generateClient } from "@aws-amplify/api";

// const client = generateClient();

// export const useMergeTableForNotification = (responseData) => {
//   const [email, setEmail] = useState(null);
//   const hasFetched = useRef(false); // Ref to track execution

//   console.log("Response Data:", responseData);

//   useEffect(() => {
//     if (hasFetched.current || !responseData) return; // Skip if already fetched or no responseData

//     const fetchData = async () => {
//       try {
//         const empPersonalInfosResponse = await client.graphql({
//           query: listEmpPersonalInfos,
//         });

//         const candidates =
//           empPersonalInfosResponse?.data?.listEmpPersonalInfos?.items;

//         if (candidates) {
//           const getManager = candidates.find(
//             (candidate) => candidate.empBadgeNo === responseData.assignTo
//           );

//           const getTimeKeeper = candidates.find(
//             (candidate) => candidate.empID === responseData.assignBy
//           );

//           setEmail({
//             ManagerDetails: getManager || null,
//             TimeKeeperDetails: getTimeKeeper || null,
//             TimeSheetData: responseData,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching data from GraphQL:", err.message);
//       }
//     };

//     fetchData();
//     hasFetched.current = true; // Mark as fetched
//   }, [responseData]);

//   console.log("Email State:", email);
//   return email;
// };
