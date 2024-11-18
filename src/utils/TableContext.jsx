// import React, { createContext, useState, useEffect } from "react";
// // import axios from "axios";
// import { generateClient } from "@aws-amplify/api";
// // import { listCandidateApplicationForms } from "../graphql/queries";

// // Create the Table Context
// export const TableDataContext = createContext();
// const client=generateClient()
// // Context provider
// export const TableContextProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
      // try {
      //   // const response = await axios.get('https://66e2301ac831c8811b575861.mockapi.io/api/v1/candidates/awe_dummydata');

      //   // console.log(response.data);
      //   await client
      //     .graphql({
      //       query: listCandidateApplicationForms,
      //     })
      //     .then((res) => {
      //       const data = res.data.listCandidateApplicationForms.items;

      //       setData(data);
      //     });
      // } catch (error) {
      //   setError(error);
      // } finally {
      //   setLoading(false);
      // }
//     };

//     fetchData();
//   }, []);

//   return (
//     <TableDataContext.Provider value={{ data, loading, error }}>
//       {children}
//     </TableDataContext.Provider>
//   );
// };
