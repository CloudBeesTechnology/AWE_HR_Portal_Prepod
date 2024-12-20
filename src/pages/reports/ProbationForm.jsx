import React, { forwardRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import logo from "../../assets/logo/logo-with-name.svg";
import { ConfirmationForm } from './ConfirmationForm';
import { ContractChoose } from "./ContractChoose";
import { useLocation } from "react-router-dom";
import { SpinLogo } from "../../utils/SpinLogo";
import { useState } from "react";
import { ProbFormFun } from "../../services/createMethod/ProbFormFun";
import { UpdateProbForm } from "../../services/updateMethod/UpdateProbForm";
import {probationFormSchema} from "../../services/ReportValidation"
import { DataSupply } from "../../utils/DataStoredContext";
import { useContext } from "react";

export const ProbationForm = forwardRef(() => {

   const { empPIData,workInfoData,  ProbFData} =
     useContext(DataSupply);
   useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   }, []);

  const { ProbFormsData } = ProbFormFun();
    const { UpdateProb } = UpdateProbForm();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(probationFormSchema),
     
    });

  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const [showTitle,setShowTitle]=useState("")
  const { employeeData } = location.state || {};
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  // const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const provDetails = ProbFData
              ? ProbFData.find((user) => user.empID === emp.empID)
              : {};
        

            return {
              ...emp,
              ...WIDetails,
            ...provDetails
            };
          })
          .filter(Boolean);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, workInfoData, ProbFData]); 


  const onSubmit = async (data) => {
    console.log("Form data:", data);

    try {
      const PFDataRecord = ProbFData
        ? ProbFData.find((match) => match.empID === data.empID)
        : {};

      if (PFDataRecord) {
        const PbFDataUp = {
          ...data,
          id: PFDataRecord.id,
        };
        console.log(PbFDataUp);

        await UpdateProb({ PbFDataUp });
        // setShowTitle("Probation Form Updated successfully");
        // setNotification(true);
      } else {
        const ProbValue = {
          ...data,
        };
        console.log(ProbValue);
        
        await ProbFormsData({ ProbValue });
        // setShowTitle("Probation Form  Saved successfully");
        // setNotification(true);
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-white shadow-md w-full px-20 mx-auto">
      {/* Header */}
      <section className="center mb-16">
        <div className="max-w-[400px] w-full">
          <img className="w-full" src={logo} alt="Logo not found" />
        </div>
      </section>

      <div className="mb-10">
        <p className="text-md mt-2">
          For the attention of:{" "}
          <input
            type="text"
            {...register("attention")}
            className="border-b border-black focus:outline-none px-1"
          />
        </p>
        <p className="text-md mt-3">
          Deadline submit to Human Resources Department by{" "}
          <input
            type="text"
            {...register("deadline")}
            className="border-b border-black outline-none px-1"
          />
        </p>
      </div>

      {/* Employee Details */}
      <div className="w-full mx-auto mb-10">
        <h2 className="text-lg font-semibold mb-4">Employee Details:</h2>
        <table className="w-full border border-black">
          <tbody>
          <tr className="border">
            <td className="p-2 border-r border-b font-semibold">Employee Name</td>
            <td className="p-2 border-b">
              <input
                {...register("name")}
                defaultValue={employeeData?.name || "-"}
                className="w-full outline-none"
              />
            </td>
          </tr>
          <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Employee ID</td>
              <td className="p-2 border-b">
              {/* Displaying employee name and registering the input */}
              <input
                {...register("empID")}
                defaultValue={employeeData?.empID || ""}
                className="w-full outline-none"
              />
            </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Badge Number</td>
              <td className="p-2 border-b">
              {/* Displaying employee name and registering the input */}
              <input
                {...register("empBadgeNo")}
                defaultValue={employeeData?.empBadgeNo || ""}
                className="w-full outline-none"
              />
            </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Department</td>
              <td className="p-2 border-b">
              <input
                {...register("department")}
                defaultValue={employeeData?.department || ""}
                className="w-full outline-none"
              />
            </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Position</td>
              <td className="p-2 border-b">
              <input
                {...register("position")}
                defaultValue={employeeData?.position || ""}
                className="w-full outline-none"
              />
            </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Date Joined</td>
              <td className="p-2 border-b">
              <input
                {...register("doj")}
                defaultValue={employeeData?.doj || ""}
                className="w-full outline-none"
              />
            </td>
            </tr>
            <tr className="border">
              <td className="p-2 border-r border-b font-semibold">Probation End Date</td>
              <td className="p-2 border-b">
              <input
                {...register("probationEnd")}
                defaultValue={employeeData?.probationEndDate || "-"}
                className="w-full outline-none"
              />
            </td>
            </tr>
            {/* <tr className="border">
              <td className="p-2 border-r font-semibold">Extended Probation End Date</td>
              <td className="p-2 border-b">
              <input
                {...register("extendedProbationEndDate")}
                defaultValue={employeeData?.extendedPED || "-"}
                className="w-full outline-none"
              />
            </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <ContractChoose register={register} />
      <ConfirmationForm register={register} />

      {/* Save Button */}
      <div className="flex items-center justify-center mt-8">
        <button
          type="submit"
          className="primary_btn"
        >
          Save
        </button>
      </div>
      {/* {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/reports"
          />
        )} */}
    </form>
  );
});
// import React, { forwardRef } from "react"; // forwardRef to pass ref from parent
// import logo from "../../assets/logo/logo-with-name.svg";
// import { ConfirmationForm } from './ConfirmationForm';
// import { ContractChoose } from "./ContractChoose";
// import { useLocation } from "react-router-dom";

// // Make ProbationForm a functional component that accepts a ref
// export const ProbationForm = forwardRef(() => {
//   const location = useLocation();
//   const { employeeData } = location.state || {};

//   // Function to handle the save button click
//   const handleSave = () => {
//     console.log("Employee Data:", employeeData);
//   };
  

//   return (
//     <div className="p-10 bg-white shadow-md w-full px-20 mx-auto">
//       {/* Header */}
//       <section className="center mb-16">
//         <div className="max-w-[400px] w-full">
//           <img className="w-full" src={logo} alt="Logo not found" />
//         </div>
//       </section>

//       <div className="mb-10">
//         <p className="text-md mt-2">
//           For the attention of:{" "}
//           <input
//             type="text"
//             className="border-b border-black focus:outline-none px-1"
//           />
//         </p>
//         <p className="text-md mt-3">
//           Deadline submit to Human Resources Department by{" "}
//           <input
//             type="text"
//             className="border-b border-black outline-none px-1"
//           />
//         </p>
//       </div>

//       {/* Employee Details */}
//       <div className="w-full mx-auto mb-10">
//         <h2 className="text-lg font-semibold mb-4">Employee Details:</h2>
//         <table className="w-full border border-black">
//           <tbody>
//             <tr className="border">
//               <td className="p-2 border-r border-b font-semibold">Employee Name</td>
//               <td className="p-2 border-b">{employeeData?.name || '-'}</td>
//             </tr>
//             <tr className="border">
//               <td className="p-2 border-r border-b font-semibold">Badge Number</td>
//               <td className="p-2 border-b">{employeeData?.empBadgeNo || '-'}</td>
//             </tr>
//             <tr className="border">
//               <td className="p-2 border-r border-b font-semibold">Department</td>
//               <td className="p-2 border-b">{employeeData?.department || '-'}</td>
//             </tr>
//             <tr className="border">
//               <td className="p-2 border-r border-b font-semibold">Position</td>
//               <td className="p-2 border-b">{employeeData?.position || '-'}</td>
//             </tr>
//             <tr className="border">
//               <td className="p-2 border-r border-b font-semibold">Date Joined</td>
//               <td className="p-2 border-b">{employeeData?.doj || '-'}</td>
//             </tr>
//             <tr className="border">
//               <td className="p-2 border-r border-b font-semibold">Probation End Date</td>
//               <td className="p-2 border-b">{employeeData?.probationEnd || '-'}</td>
//             </tr>
//             <tr className="border">
//               <td className="p-2 border-r font-semibold">Extended Probation End Date</td>
//               <td className="p-2">{employeeData?.extendedProbationEndDate || '-'}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <ContractChoose />
//       <ConfirmationForm />

//       {/* Save Button */}
//       <div className="flex justify-end mt-8">
//         <button
//           onClick={handleSave}
//           className="px-6 py-2 bg-blue font-semibold rounded hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// });
// // import React, { forwardRef } from "react"; // forwardRef to pass ref from parent
// // import logo from "../../assets/logo/logo-with-name.svg";
// // import { ConfirmationForm } from './ConfirmationForm';
// // import { ContractChoose } from "./ContractChoose";
// // import { useLocation } from "react-router-dom";

// // // Make ProbationForm a functional component that accepts a ref
// // export const ProbationForm = forwardRef(() => {
// //   const location = useLocation();
// //   const { employeeData } = location.state || {};
// //   return (
// //     <div  className="p-10 bg-white shadow-md w-full px-20 mx-auto">
// //       {/* Header */}
// //       <section className="center mb-16">
// //         <div className="max-w-[400px] w-full">
// //           <img className="w-full" src={logo} alt="Logo not found" />
// //         </div>
// //       </section>

// //       <div className="mb-10">
// //   <p className="text-md mt-2">
// //     For the attention of:{" "}
// //     <input
// //       type="text"
// //       className="border-b border-black focus:outline-none px-1"
// //     />
// //   </p>
// //   <p className="text-md mt-3">
// //     Deadline submit to Human Resources Department by{" "}
// //     <input
// //       type="text"
// //       className="border-b border-black outline-none px-1"
// //     />
// //   </p>
// // </div>


// //       {/* Employee Details */}
// //       <div className="w-full mx-auto mb-10">
// //         <h2 className="text-lg font-semibold mb-4">Employee Details:</h2>
// //         <table className="w-full border border-black">
// //           <tbody>
// //             <tr className="border">
// //               <td className="p-2 border-r border-b font-semibold">Employee Name</td>
// //               <td className="p-2 border-b">{employeeData.name || '-'}</td>
// //             </tr>
// //             <tr className="border">
// //               <td className="p-2 border-r border-b font-semibold">Badge Number</td>
// //               <td className="p-2 border-b">{employeeData.empBadgeNo || '-'}</td>
// //             </tr>
// //             <tr className="border">
// //               <td className="p-2 border-r border-b font-semibold">Department</td>
// //               <td className="p-2 border-b">{employeeData.department || '-'}</td>
// //             </tr>
// //             <tr className="border">
// //               <td className="p-2 border-r border-b font-semibold">Position</td>
// //               <td className="p-2 border-b">{employeeData.position || '-'}</td>
// //             </tr>
// //             <tr className="border">
// //               <td className="p-2 border-r border-b font-semibold">Date Joined</td>
// //               <td className="p-2 border-b">{employeeData.doj || '-'}</td>
// //             </tr>
// //             <tr className="border">
// //               <td className="p-2 border-r border-b font-semibold">Probation End Date</td>
// //               <td className="p-2 border-b">{employeeData.probationEnd || '-'}</td>
// //             </tr>
// //             <tr className="border">
// //               <td className="p-2 border-r font-semibold">Extended Probation End Date</td>
// //               <td className="p-2">{employeeData.extendedProbationEndDate || '-'}</td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>

// //       <ContractChoose />
// //       <ConfirmationForm />
// //     </div>
// //   );
// // });
