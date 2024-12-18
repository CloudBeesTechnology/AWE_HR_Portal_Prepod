import React from "react";
import { useForm } from "react-hook-form";
import { TiTick } from "react-icons/ti";

export const ConfirmationForm = ({register}) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <form className="w-full mx-auto mt-5">
      {/* Additional Information Section */}
      <div className="mb-8">
        <p className="mb-4">
          Please indicate any additional information or unusual circumstances
          considered relevant to the staff performance or assessment. Please
          specify accordingly.
        </p>
        <textarea
          {...register("additionalInfo")}
          className="w-full h-32 border p-2 rounded resize-none outline-none"
        />
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="font-bold bg-black text-white p-2">RECOMMENDATION</h2>
        <div className="space-y-4 mt-4">
          <label className="flex items-center relative">
            <input
              type="radio"
              {...register("recommendation")}
              value="confirmed"
              checked={selectedValue === "confirmed"}
              onChange={handleChange}
              className="mr-2 w-6 h-6 border-2 bg-white appearance-none rounded-none"
            />
            <span className="radio-label flex items-center">
              {selectedValue === "confirmed" && (
                <TiTick className="text-[#4ad84a] text-[28px] absolute bottom-0 -left-0.5" />
              )}
              The appointment to be confirmed
            </span>
          </label>

          <label className="flex items-center relative">
            <input
              type="radio"
              {...register("recommendation")}
              value="extended"
              checked={selectedValue === "extended"}
              onChange={handleChange}
              className="mr-2 w-6 h-6 border-2 border-gray-500 bg-white appearance-none rounded-none"
            />
            <span className="radio-label flex items-center">
              {selectedValue === "extended" && (
                <TiTick className="text-[#4ad84a] text-[28px] absolute bottom-0 -left-0.5" />
              )}
              The appointment to be extended for a further probationary period of
              <input
                type="text"
                {...register("extendProbED")}
                className="w-12 border-b outline-none text-center ml-2"
                placeholder="0"
              />{" "}
              months
            </span>
          </label>

          <label className="flex items-center relative">
            <input
              type="radio"
              {...register("recommendation")}
              value="terminated"
              checked={selectedValue === "terminated"}
              onChange={handleChange}
              className="mr-2 w-6 h-6 border-2 border-gray-500 bg-white appearance-none rounded-none"
            />
            <span className="radio-label flex items-center">
              {selectedValue === "terminated" && (
                <TiTick className="text-[#4ad84a] text-[28px] absolute bottom-0 -left-0.5" />
              )}
              The appointment to be terminated
            </span>
          </label>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-8">
        <p>
          Comments that you would like to include into the probation/employment
          confirmation letter:
        </p>
        <p className="italic">
          (It is <strong>compulsory</strong> for you to fill in your comment for
          the <strong>staff level</strong> considering his/her attitude,
          approach, and ability in performing the duties or responsibilities
          assigned.)
        </p>
      </div>

      {/* Signature Section */}
      <div className="mt-20 space-y-16">
        <div className="flex justify-between items-center space-x-8">
          <div className="flex justify-center items-center">
            <label className="text-sm font-medium">Name of Supervisor :</label>
            <input
              type="text"
              {...register("supervisorName")}
              className="border-b outline-none px-1"
            />
          </div>
          <div className="flex items-center space-x-10 border-b">
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      value="Approved"
      {...register("supervisorApproved")}
      id="approved"
      className=" h-4 w-4 form-checkbox"
    />
    <label htmlFor="approved" className="text-sm">Approved</label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      value="Reject"
      {...register("supervisorApproved")}
      id="reject"
      className=" h-4 w-4 form-checkbox"
    />
    <label htmlFor="reject" className="text-sm">Rejected</label>
  </div>
</div>
          {/* <div className="flex items-center space-x-2 border-b">
            <label className="text-sm font-medium">Approved</label>
            <input type="checkbox" {...register("supervisorApproved")} className="form-checkbox h-4 w-4" />
          </div> */}

          <div className="flex items-center space-x-2 border-b">
            <input type="date" {...register("supervisorDate")} className="outline-none" />
          </div>
        </div>

        {/* Manager Section */}
        <div className="flex justify-between items-center space-x-8">
          <div className="flex justify-center items-center">
            <label className="text-sm font-medium">Name of Manager :</label>
            <input
              type="text"
              {...register("managerName")}
              className="border-b outline-none px-1"
            />
          </div>
          <div className="flex items-center space-x-10 border-b">
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      value="Approved"
      {...register("managerApproved")}
      id="approved"
      className=" h-4 w-4 form-checkbox"
    />
    <label htmlFor="approved" className="text-sm">Approved</label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      value="Reject"
      {...register("managerApproved")}
      id="reject"
      className=" h-4 w-4 form-checkbox"
    />
    <label htmlFor="reject" className="text-sm">Rejected</label>
  </div>
</div>
          {/* <div className="flex items-center space-x-2 border-b">
            <label className="text-sm font-medium">Approved</label>
            <input type="checkbox" {...register("managerApproved")} className="form-checkbox h-4 w-4" />
          </div> */}

          <div className="flex items-center space-x-2 border-b">
            <input type="date" {...register("managerDate")} className="outline-none" />
          </div>
        </div>

        {/* GM Section */}
        <div className="flex justify-between items-center">
          <div className="w-[350px]">
            <p className="font-semibold">Concurred By GM :</p>
            <p>(For Staff Category Only)</p>
          </div>
          <div className="flex items-center space-x-10 border-b">
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      value="Approved"
      {...register("gmApproved")}
      id="approved"
      className=" h-4 w-4 form-checkbox"
    />
    <label htmlFor="approved" className="text-sm">Approved</label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      value="Reject"
      {...register("gmApproved")}
      id="reject"
      className=" h-4 w-4 form-checkbox"
    />
    <label htmlFor="reject" className="text-sm">Rejected</label>
  </div>
</div>

          <div className="flex items-center space-x-2 border-b">
            <input type="date" {...register("gmDate")} className="outline-none" />
          </div>
        </div>
      </div>

      {/* HR Section */}
      <div className="border pt-4 mt-5">
        <h3 className="font-bold underline p-2">Human Resources Department</h3>
        <div>
          <p className="font-semibold border-b p-2">Received & Action By :</p>
        </div>
        <div className="flex justify-evenly items-center border-b py-5">
          <div className="flex justify-center items-center">
            <label className="text-sm font-medium">Name :</label>
            <input type="text" {...register("hrName")} className="border-b outline-none px-1" />
          </div>
          <div className="flex items-center space-x-2 border-b">
            <input type="date" {...register("hrDate")} className="outline-none" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </form>
  );
};
// import React from "react";
// import { TiTick } from "react-icons/ti";

// export const ConfirmationForm = () => {
//   const [selectedValue, setSelectedValue] = React.useState("");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };
//   return (
//     <div className="w-full mx-auto mt-5">
//       {/* Additional Information Section */}
//       <div className="mb-8">
//         <p className="mb-4">
//           Please indicate any additional information or unusual circumstances
//           considered relevant to the staff performance or assessment. Please
//           specify accordingly.
//         </p>
//         <textarea
//           className="w-full h-32 border p-2 rounded resize-none outline-none"
//         />
//       </div>

//       {/* Recommendations Section */}
//       <div className="mb-8">
//       <h2 className="font-bold bg-black text-white p-2">RECOMMENDATION</h2>
//       <div className="space-y-4 mt-4">
//         <label className=" flex items-center relative">
//           <input
//             type="radio"
//             name="recommendation"
//             value="confirmed"
//             checked={selectedValue === "confirmed"}
//             onChange={handleChange}
//             className="mr-2 w-6 h-6 border-2  bg-white appearance-none rounded-none "
//           />
//           <span className="radio-label flex items-center">
//             {selectedValue === "confirmed" && (
//               <TiTick className="text-[#4ad84a] text-[28px]  absolute bottom-0 -left-0.5" />
//             )}
//             The appointment to be confirmed
//           </span>
//         </label>

//         <label className=" flex items-center relative">
//           <input
//             type="radio"
//             name="recommendation"
//             value="extended"
//             checked={selectedValue === "extended"}
//             onChange={handleChange}
//             className="mr-2 w-6 h-6 border-2 border-gray-500 bg-white appearance-none rounded-none relative"
//           />
//           <span className="radio-label flex items-center">
//             {selectedValue === "extended" && (
//               <TiTick className="text-[#4ad84a] text-[28px]  absolute bottom-0 -left-0.5" />
//             )}
//             The appointment to be extended for a further probationary period of
//             <input
//               type="text"
//               className="w-12 border-b outline-none text-center ml-2"
//               placeholder="0"
//             />{" "}
//             months
//           </span>
//         </label>

//         <label className=" flex items-center relative">
//           <input
//             type="radio"
//             name="recommendation"
//             value="terminated"
//             checked={selectedValue === "terminated"}
//             onChange={handleChange}
//             className="mr-2 w-6 h-6 border-2 border-gray-500 bg-white appearance-none rounded-none relative"
//           />
//           <span className="radio-label flex items-center">
//             {selectedValue === "terminated" && (
//               <TiTick className="text-[#4ad84a] text-[28px]  absolute bottom-0 -left-0.5" />
//             )}
//             The appointment to be terminated
//           </span>
//         </label>
//       </div>
//     </div>
 





//       {/* Comments Section */}
//       <div className="mb-8">
//         <p>
//           Comments that you would like to include into the probation/employment
//           confirmation letter:
//         </p>
//         <p className="italic">
//           (It is <strong>compulsory</strong> for you to fill in your comment for
//           the <strong>staff level</strong> considering his/her attitude,
//           approach, and ability in performing the duties or responsibilities
//           assigned.)
//         </p>
//       </div>

//       {/* Signature Section */}
//       <div className="mt-20">
//       <div className="flex justify-between items-center space-x-8">
      
//       {/* Name and Signature */}
//       <div className="flex justify-center items-center">
//         <label className="text-sm font-medium">Name of Supervisor :</label>
//         <input type="text" className=" border-b outline-none px-1" />
//       </div>

//       {/* Approved and Checkbox */}
//       <div className="flex items-center space-x-2 border-b">
//         <label className="text-sm font-medium">Approved</label>
//         <input type="checkbox" className="form-checkbox h-4 w-4 " />
//       </div>

//       {/* Date and Calendar Icon */}
//       <div className="flex items-center space-x-2 border-b">
//       <input type="date" className=" outline-none " />
//       </div>
//     </div>

//         <div className="flex justify-between items-center space-x-8 mt-16">
//       {/* Name and Signature */}
//       <div className="flex justify-center items-center">
//         <label className="text-sm font-medium">Name of Manager :</label>
//         <input type="text" className=" border-b outline-none px-1" />
//       </div>

//       {/* Approved and Checkbox */}
//       <div className="flex items-center space-x-2 border-b">
//         <label className="text-sm font-medium">Approved</label>
//         <input type="checkbox" className="form-checkbox h-4 w-4 " />
//       </div>

//       {/* Date and Calendar Icon */}
//       <div className="flex items-center space-x-2 border-b">
//       <input type="date" className=" outline-none " />
//       </div>
//     </div>

//         <div className="flex justify-between items-center mt-16">
//           <div className="w-[350px] h-auto ">
//             <p className="font-semibold">Concurred By GM :</p>
//             <p>(For Staff Category Only)</p>
//           </div>
//            {/* Approved and Checkbox */}
//       <div className="flex justify-center  items-center space-x-2 border-b">
//         <label className="text-sm font-medium">Approved</label>
//         <input type="checkbox" className="form-checkbox h-4 w-4 " />
//       </div>

//       {/* Date and Calendar Icon */}
//       <div className="flex items-center space-x-2 border-b">
//       <input type="date" className=" outline-none " />
//       </div>
//         </div>
//       </div>

//       {/* HR Section */}
//       <div className="border pt-4 mt-5 ">
//         <h3 className="font-bold underline p-2 ">Human Resources Department</h3>
//         <div>
//             <p className="font-semibold border-b p-2">Received & Action By :</p>
//           </div>
//         <div className="flex justify-evenly items-center border-b py-5">
//         <div className="flex justify-center items-center">
//         <label className="text-sm font-medium">Name :</label>
//         <input type="text" className=" border-b outline-none px-1" />
//       </div>

//       {/* Date and Calendar Icon */}
//       <div className="flex items-center space-x-2 border-b">
//       <input type="date" className=" outline-none " />
//       </div>
//         </div>
//       </div>
//     </div>
//   );
// };