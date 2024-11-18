import React from "react";

export const NewsEvent = () => {
  return (
    <div className="flex justify-center h-full max-w-[600px]">
      <div className="rounded-2xl shadow-md w-full h-full">
        <div className="bg-lite_grey rounded-t-2xl font-semibold p-2">
          <h2>Recent Notifications</h2>
        </div>

        {/* Notification 1 */}
        <div className="flex justify-between mt-5 items-center">
          <div className="w-[120px] p-4">
            <div className="border border-[#DEFFFF] rounded-md p-2 bg-[#DEFFFF] text-center">
              <small>29</small><br/>
              <small>AUGUST</small>
            </div>
          </div>
          <div className="px-2 flex flex-col w-[200px]">
            <small><b>Team meeting</b></small><br/>
            <small>IT project Software Upgrade.</small>
          </div>
        </div>

        {/* Notification 2 */}
        <div className="flex justify-between items-center mt-5">
          <div className="w-[120px] p-4">
            <div className="border border-[#ECF9E2] rounded-md p-2 bg-[#ECF9E2] text-center">
              <small>18</small><br/>
              <small>SEPTEMBER</small>
            </div>
          </div>
          <div className="px-2  flex flex-col w-[200px]">
            <small><b>Updated company policy</b></small><br/>
            <small>It is a long establishment.</small>
          </div>
        </div>

        {/* Notification 3 */}
        <div className="flex justify-between items-center mt-5">
          <div className="w-[120px] p-4">
            <div className="border border-[#FFF3DC] rounded-md p-2 bg-[#FFF3DC] text-center">
              <small>22</small><br/>
              <small>SEPTEMBER</small>
            </div>
          </div>
          <div className="px-2  flex flex-col w-[200px]">
            <small><b>Events conduct</b></small><br/>
            <small>It is a long establishment.</small>
          </div>
        </div>
      </div>
    </div>
  );
};
// import React from "react";
// import { Round } from "./Round";

// export const NewsEvent = () => {
//   return (
//     <div className="flex justify-center gap-3 w-full ">
//       <div className="rounded-md shadow-md  m-2 w-full">
//         <div className="bg-grey rounded-t-md   text-white">
//           <h2 className="text-">Recent Notification</h2>
//         </div>
//         {/* one */}
//         <div className=" flex justify-between mt-5 items-center">
//           <div className=" w-[120px] p-4 ">
//             <div className="border border-[#DEFFFF] rounded-md p-2 bg-[#DEFFFF] text-center">
//               <div className="">
//                 <small>29</small>
//               </div>
//               <div className="">
//                 <small>AUGUST </small>
//               </div>
//             </div>
//           </div>
//           <div className="px-2 ">
//             <div className="">
//               <small>
//                 <b>Team meeting</b>
//               </small>
//             </div>
//             <div className="">
//               <small> IT project Software Upgrade</small>
//             </div>
//           </div>
//         </div>
//         {/* two */}

//         <div className=" flex justify-between items-center mt-5">
//           <div className="w-[120px] p-4 ">
//             <div className=" border-[#ECF9E2] rounded-md p-2  bg-[#ECF9E2] text-center">
//               <div className="">
//                 <small>18</small>
//               </div>
//               <div className="">
//                 <small>SEPTEMBER</small>
//               </div>
//             </div>
//           </div>
//           <div className="px-2 ">
//             <div className="">
//               <small>
//                 <b>Updated company policy</b>
//               </small>
//             </div>
//             <div className="">
//               <small>It is a long establishment..</small>
//             </div>
//           </div>
//         </div>
//         {/* three */}

//         <div className=" flex justify-between items-center mt-5">
//           <div className=" w-[120px] p-4 ">
//             <div className=" border-[#FFF3DC] rounded-md p-2  bg-[#FFF3DC] text-center">
//               <div className="">
//                 <small>22</small>
//               </div>
//               <div className="">
//                 <small>SEPTEMBER</small>
//               </div>
//             </div>
//           </div>
//           <div className="px-2 ">
//             <div className="">
//               <small>
//                 <b>Events conduct</b>
//               </small>
//             </div>
//             <div className="">
//               <small>It is a long establishment..</small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

