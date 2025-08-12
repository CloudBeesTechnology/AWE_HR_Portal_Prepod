import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaArrowLeft, FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { FormField } from "../../utils/FormField";
import { AddInsuranceSchema } from "../../services/EmployeeValidation";
import { SpinLogo } from "../../utils/SpinLogo";
import { generateClient } from "@aws-amplify/api";
import { createInsuranceType } from "../../graphql/mutations";
import { listInsuranceTypes } from "../../graphql/queries";
import { Link } from "react-router-dom";

export const Insurance = () => {
  const client = generateClient();
  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userType = localStorage.getItem("userID");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddInsuranceSchema),
    defaultValues: {
      insDetails: [{ company: "" }],
    },
  });

  const {
    fields: insuranceFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "insDetails",
  });

  const handleAddInsurance = () => {
    append({ company: "" });
  };

  const groupByTypeIns = (data) => {
    const grouped = {};
    data.forEach((item) => {
      if (grouped[item.typeIns]) {
        grouped[item.typeIns] = [
          ...new Set([...grouped[item.typeIns], ...item.insDetails]),
        ];
      } else {
        grouped[item.typeIns] = item.insDetails;
      }
    });
    return Object.entries(grouped).map(([typeIns, insDetails]) => ({
      typeIns,
      insDetails,
    }));
  };

  const onSubmit = async (data) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const InsTypeData = {
        typeIns: data.typeIns,
        insDetails: data.insDetails.map((detail) => detail.company),
        createdBy: JSON.stringify([{ userID: userType, date: today }]),
      };

      const response = await client.graphql({
        query: createInsuranceType,
        variables: { input: InsTypeData },
      });
      // console.log("Successfully submitted data:", response);
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        let allInsuranceTypes = [];
        let nextToken = null;

        do {
          const response = await client.graphql({
            query: listInsuranceTypes,
            variables: {
              nextToken: nextToken,
            },
          });

          const rawData = response?.data?.listInsuranceTypes?.items || [];

          allInsuranceTypes = [...allInsuranceTypes, ...rawData];

          nextToken = response?.data?.listInsuranceTypes?.nextToken;
        } while (nextToken);

        const groupedData = groupByTypeIns(allInsuranceTypes);

        setInsuranceData(groupedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  return (
    <section>
      <div className="w-full flex items-center justify-between gap-5 px-10">
        <Link to="/dashboard" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Insurance Type
        </p>
        <div className="flex-1"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto  pt-2 px-10 mt-10 bg-[#F5F6F1CC]"
      >
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-x-14">
            <FormField
              name="typeIns"
              type="text"
              placeholder="Enter Insurance Type"
              label="Insurance Type"
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex justify-end items-end">
            <button
              type="button"
              onClick={handleAddInsurance}
              className="mt-4 flex items-center text-medium_grey text-[25px]"
            >
              <CiSquarePlus /> <span className="text-[16px]"> Add Company</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-14">
            {insuranceFields.map((field, index) => (
              <div key={field.id} className="mb-2 relative">
                <FormField
                  name={`insDetails.${index}.company`}
                  type="text"
                  placeholder="Enter Insurance Company"
                  label="Insurance Company"
                  register={register}
                  errors={errors}
                />
                {insuranceFields.length > 1 &&
                  index !== 0 && ( // Add condition to exclude first element
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-10 -right-10 text-medium_grey text-[25px]"
                    >
                      <FaRegMinusSquare />
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>
      </form>

      {notification && (
        <SpinLogo
          text="Insurance Type Saved Successfully"
          notification={notification}
          path="/insuranceHr"
        />
      )}

      {loading && (
        <p className="text-center mt-10">Loading insurance data...</p>
      )}

      {error && <p className="text-center mt-10 text-red-600">{error}</p>}

      <div className="mt-20">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[270px] text-center">
          View Insurance Info
        </p>

        {insuranceData.length > 0 ? (
          <div className=" h-[400px] overflow-y-auto scrollBar">
            <table className="w-full text-center">
              <thead className=" bg-[#939393] text-white sticky top-0">
                <tr>
                  <th className="pl-4 py-4 rounded-tl-lg">Insurance Type</th>
                  <th className="pl-4 py-4 rounded-tr-lg">
                    Insurance Companies
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white cursor-pointer">
                {insuranceData.map((data, index) => (
                  <tr
                    key={index}
                    className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="pl-4 py-4">{data.typeIns}</td>
                    <td className="pl-4 py-4">
                      {data.insDetails.map((detail, detailIndex) => (
                        <div key={detailIndex}>{detail}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-10">
            No insurance information available.
          </p>
        )}
      </div>
    </section>
  );
};

//New UI Design Code

// import { useState, useEffect } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { FaArrowLeft, FaRegMinusSquare } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { CiSquarePlus } from "react-icons/ci";
// import { FormField } from "../../utils/FormField";
// import { AddInsuranceSchema } from "../../services/EmployeeValidation";
// import { SpinLogo } from "../../utils/SpinLogo";
// import { generateClient } from "@aws-amplify/api";
// import { createInsuranceType } from "../../graphql/mutations";
// import { listInsuranceTypes } from "../../graphql/queries";
// import { Link } from "react-router-dom";
// import { Pagination } from "../leaveManagement/Pagination";
// import AweLogo from "../../assets/logo/logo-with-name.svg";

// export const Insurance = () => {
//   const client = generateClient();
//   const [notification, setNotification] = useState(false);
//   const [insuranceData, setInsuranceData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const userType = localStorage.getItem("userID");
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(AddInsuranceSchema),
//     defaultValues: {
//       insDetails: [{ company: "" }],
//     },
//   });

//   const {
//     fields: insuranceFields,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: "insDetails",
//   });

//   const handleAddInsurance = () => {
//     append({ company: "" });
//   };

//   const groupByTypeIns = (data) => {
//     const grouped = {};
//     data.forEach((item) => {
//       if (grouped[item.typeIns]) {
//         grouped[item.typeIns] = [
//           ...new Set([...grouped[item.typeIns], ...item.insDetails]),
//         ];
//       } else {
//         grouped[item.typeIns] = item.insDetails;
//       }
//     });
//     return Object.entries(grouped).map(([typeIns, insDetails]) => ({
//       typeIns,
//       insDetails,
//     }));
//   };

//   const onSubmit = async (data) => {
//     try {
//       const today = new Date().toISOString().split("T")[0];
//       const InsTypeData = {
//         typeIns: data.typeIns,
//         insDetails: data.insDetails.map((detail) => detail.company),
//         createdBy: JSON.stringify([{ userID: userType, date: today }]),
//       };

//       const response = await client.graphql({
//         query: createInsuranceType,
//         variables: { input: InsTypeData },
//       });
//       // console.log("Successfully submitted data:", response);
//       setNotification(true);
//     } catch (error) {
//       console.log("Error submitting data:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchInsuranceData = async () => {
//       try {
//         let allInsuranceTypes = [];
//         let nextToken = null;

//         do {
//           const response = await client.graphql({
//             query: listInsuranceTypes,
//             variables: {
//               nextToken: nextToken,
//             },
//           });

//           const rawData = response?.data?.listInsuranceTypes?.items || [];

//           allInsuranceTypes = [...allInsuranceTypes, ...rawData];

//           nextToken = response?.data?.listInsuranceTypes?.nextToken;
//         } while (nextToken);

//         const groupedData = groupByTypeIns(allInsuranceTypes);

//         setInsuranceData(groupedData);
//         setLoading(false);
//       } catch (error) {
//         setFetchError(error.message || "Failed to fetch insurance data");
//         setLoading(false);
//       }
//     };

//     fetchInsuranceData();
//   }, []);

//   useEffect(() => {
//     if (showModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     // Cleanup when component unmounts or modal closes
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showModal]);

//   const filteredData = insuranceData.filter((item) =>
//     item.typeIns.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   return (
//     <section className="relative">
//       <div className="w-full flex items-center justify-between gap-5 px-10">
//         <Link to="/dashboard" className="text-xl flex-1 text-grey">
//           <FaArrowLeft />
//         </Link>
//         <div className="text-dark_grey underline uppercase w-full center gap-4 px-10 py-4">
//           <h2 className="text-lg font-medium">Insurance Type</h2>
//         </div>
//       </div>
//       <div className="px-10 py-4">
//         {/* Card Header */}
//         <div className="flex items-center justify-end px-6 py-4">
//           <div className="flex items-center gap-4 w-full sm:w-auto">
//             <div className="relative w-full sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Search insurance type..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-3 py-[10px] border border-lite_grey rounded-md text-sm focus:outline-none w-full sm:w-auto"
//               />
//               <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-grey pointer-events-none">
//                 <CiSearch />
//               </span>
//             </div>

//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-primary px-4 py-2 rounded-lg shadow-md hover:bg-primary_hover transition-colors"
//             >
//               + Add
//             </button>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Table */}
//           <div className="max-h-[400px] min-h-[400px] overflow-y-auto scrollBar">
//             <table className="w-full text-sm text-dark_grey text-left">
//               <thead className="bg-tableHeadCol sticky top-0 z-0">
//                 <tr className="text-sm font-medium uppercase">
//                   <th className="pl-6 py-4">S.No</th>
//                   <th className="py-4">Insurance type</th>
//                   <th className="pr-6 py-4">Insurance companies</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="3" className="text-center py-36">
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary border-opacity-50"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : fetchError ? (
//                   <tr>
//                     <td colSpan="3" className="text-center py-10">
//                       <div className="flex flex-col items-center justify-center gap-2 text-red-500">
//                         <span className="text-4xl">⚠️</span>
//                         <p className="text-sm font-medium">
//                           Failed to load insurance data
//                         </p>
//                         <p className="text-xs text-red-400 italic">
//                           {fetchError}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : insuranceData?.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center py-10">
//                       <div className="flex flex-col items-center justify-center gap-2 text-dark_grey">
//                         {/* <IoSearch className="text-4xl opacity-30" /> */}
//                         <p className="text-sm font-medium">No data available</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedData.length === 0 ? (
//                   <tr>
//                     <td colSpan="3" className="text-center py-10">
//                       <div className="flex flex-col items-center justify-center gap-2 text-dark_grey">
//                         <CiSearch className="text-4xl opacity-30" />
//                         <p className="text-sm font-medium">
//                           No matching insurance types found
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedData.map((data, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-lite_grey hover:bg-gray-50"
//                     >
//                       <td className="pl-6 py-4">
//                         {(currentPage - 1) * itemsPerPage + index + 1}
//                       </td>
//                       <td className="py-4">{data.typeIns}</td>
//                       <td className="pr-6 py-4">
//                         {data.insDetails.map((detail, detailIndex) => (
//                           <div key={detailIndex} className="text-sm">
//                             {/* <span>{detailIndex + 1}.</span> */}
//                             <span>{detail}</span>
//                           </div>
//                         ))}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {showModal && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
//               <div className="bg-white w-full max-w-md min-h-[70vh] max-h-[70vh] overflow-hidden p-6 rounded-lg relative shadow-lg flex flex-col">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
//                 >
//                   &times;
//                 </button>

//                 {/* Logo and Heading */}
//                 <div className="flex flex-col items-center mb-4">
//                   <img
//                     src={AweLogo}
//                     alt="Logo"
//                     className="max-w-[240px] w-full mb-2"
//                   />
//                   <h2 className="font-lg text-base text-dark_grey leading-[100%] uppercase underline mt-4">
//                     Add insurance type
//                   </h2>
//                 </div>

//                 {/* Form */}
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="flex flex-col flex-1 overflow-hidden"
//                 >
//                   <div className="flex-1 overflow-y-auto pr-2 space-y-4">
//                     <FormField
//                       name="typeIns"
//                       type="text"
//                       placeholder="Enter Insurance Type"
//                       label="Insurance type"
//                       register={register}
//                       errors={errors}
//                     />

//                     <div className="space-y-2">
//                       {insuranceFields.map((field, index) => (
//                         <div key={field.id} className="relative">
//                           <FormField
//                             name={`insDetails.${index}.company`}
//                             type="text"
//                             placeholder="Enter Insurance Company"
//                             label={`${index + 1}.Company`}
//                             register={register}
//                             errors={errors}
//                           />
//                           {insuranceFields.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => remove(index)}
//                               className="absolute top-11 right-4 text-medium_grey text-[20px]"
//                             >
//                               <FaRegMinusSquare />
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>

//                     <button
//                       type="button"
//                       onClick={handleAddInsurance}
//                       className="text-medium_grey text-sm flex items-center gap-1"
//                     >
//                       <CiSquarePlus className="text-xl" />
//                       Add Company
//                     </button>
//                   </div>

//                   {/* Fixed Save Button */}
//                   <div className="pt-4 mt-4 border-t border-lite_grey flex justify-center">
//                     <button type="submit" className="primary_btn">
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//           {/* Pagination */}

//           {paginatedData?.length > 0 && (
//             <div className="mt-6 py-4 center border-t border-lite_grey">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) => setCurrentPage(page)}
//               />
//             </div>
//           )}

//           {notification && (
//             <SpinLogo
//               text="Insurance Type Saved Successfully"
//               notification={notification}
//               path="/insuranceHr"
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };
