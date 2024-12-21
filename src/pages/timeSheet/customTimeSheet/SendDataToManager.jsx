import { generateClient } from "@aws-amplify/api";
import {
  listEmpPersonalInfos,
  listEmpWorkInfos,
  listUsers,
} from "../../../graphql/queries";

const client = generateClient();
export const SendDataToManager = async (filterPending) => {
  try {
    const loginAuth = localStorage.getItem("userID")?.toUpperCase();
    //   useEffect(() => {
    const fetchData = async () => {
      const [empPersonalInfos, empPersonalDocs, userDetails] =
        await Promise.all([
          client.graphql({ query: listEmpPersonalInfos }),
          client.graphql({ query: listEmpWorkInfos }),
          client.graphql({ query: listUsers }),
        ]);

      const candidates = empPersonalInfos?.data?.listEmpPersonalInfos?.items;

      const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;
      const usersData = userDetails?.data?.listUsers?.items;

      const mergedData = candidates
        .map((candidate) => {
          const interviewDetails = interviews.find(
            (item) => item.empID === candidate.empID
          );

          const allUser = usersData.find(
            (item) => item.empID === candidate.empID
          );

          // Return null if all details are undefined
          if (!interviewDetails && !allUser) {
            return null;
          }

          return {
            ...candidate,
            ...interviewDetails,
            ...allUser,
          };
        })
        .filter((item) => item !== null);

      const filterdData = mergedData.filter(
        (value) => value.empID === loginAuth && value.selectType === "Manager"
      );
      return filterdData;
    };
    const getOneObject = await fetchData();

    const finalOutput = filterPending?.filter((pendingItem) => {
      return getOneObject.some((manager) => {
        const lastDepartment =
          manager.department[manager.department.length - 1];

        return (
          pendingItem.assignTo === manager.empBadgeNo 
          // pendingItem.mdepartment === lastDepartment
        );
      });
    });

    console.log(finalOutput);

    // const finalOutput = filterPending?.map((pendingItem) => {
    //   return {
    //     id: pendingItem.id,
    //     data: pendingItem.data.filter((dataItem) => {
    //       // Iterate over getOneObject to check for a match

    //       return getOneObject.some((manager) => {
    //         // Get the last department of the manager

    //         const lastDepartment =
    //           manager.department[manager.department.length - 1];
    //         // Check if the mdepartment matches the manager's empBadgeNo

    // return (
    //   dataItem.managerData.mbadgeNo === manager.empBadgeNo &&
    //   dataItem.managerData.mdepartment === lastDepartment
    // );
    //       });
    //     }),
    //   };
    // });

    const filteredOutput = finalOutput.filter((item) => item !== null && item !== undefined);
    console.log(filteredOutput)
    return filteredOutput;
  } catch (err) {
    console.log("ERROR : ", err);
  }
};

// import { generateClient } from "@aws-amplify/api";
// import {
//   listEmpPersonalInfos,
//   listEmpWorkInfos,
//   listUsers,
// } from "../../../graphql/queries";

// const client = generateClient();
// export const SendDataToManager = async (filterPending) => {
//   try {
//     const loginAuth = localStorage.getItem("userID")?.toUpperCase();
//     //   useEffect(() => {
//     const fetchData = async () => {
//       const [empPersonalInfos, empPersonalDocs, userDetails] =
//         await Promise.all([
//           client.graphql({ query: listEmpPersonalInfos }),
//           client.graphql({ query: listEmpWorkInfos }),
//           client.graphql({ query: listUsers }),
//         ]);

//       const candidates = empPersonalInfos?.data?.listEmpPersonalInfos?.items;

//       const interviews = empPersonalDocs?.data?.listEmpWorkInfos?.items;
//       const usersData = userDetails?.data?.listUsers?.items;

//       const mergedData = candidates
//         .map((candidate) => {
//           const interviewDetails = interviews.find(
//             (item) => item.empID === candidate.empID
//           );

//           const allUser = usersData.find(
//             (item) => item.empID === candidate.empID
//           );

//           // Return null if all details are undefined
//           if (!interviewDetails && !allUser) {
//             return null;
//           }

//           return {
//             ...candidate,
//             ...interviewDetails,
//             ...allUser,
//           };
//         })
//         .filter((item) => item !== null);

//       const filterdData = mergedData.filter(
//         (value) => value.empID === loginAuth && value.selectType === "Manager"
//       );
//       return filterdData;
//     };
//     const getOneObject = await fetchData();

//     console.log(getOneObject);
//     console.log("filterPending : ", filterPending);
//     const finalOutput = filterPending?.map((pendingItem) => {
//       return {
//         id: pendingItem.id,
//         data: pendingItem.data,
//         managerData: pendingItem.managerData,

//       };
//     });

//     // const result = finalOutput?.map((pendingItem) => {
//     //   return getOneObject.find((manager) => {
//     //     const lastDepartment =
//     //       manager.department[manager.department.length - 1];

//     //     // return (
//     //     if (
//     //       pendingItem.managerData.mbadgeNo === manager.empBadgeNo &&
//     //       pendingItem.managerData.mdepartment === lastDepartment
//     //     ) {
//     //       return pendingItem;
//     //     }

//     //     // );
//     //   });
//     // });

//     const result = getOneObject.flatMap((manager) => {
//       return finalOutput.filter((pendingItem) => {
//         const lastDepartment =
//               manager.department[manager.department.length - 1];
//         return (
//           pendingItem.managerData.mbadgeNo === manager.empBadgeNo &&
//           pendingItem.managerData.mdepartment === lastDepartment
//         );
//       });
//     });

//     console.log(result);
//     const filteredOutput = result.filter(
//       (item) => item.data !== null || item.data !== undefined
//     );
//     console.log(filteredOutput);
//     return filteredOutput;
//   } catch (err) {
//     console.log("ERROR : ", err);
//   }
// };
