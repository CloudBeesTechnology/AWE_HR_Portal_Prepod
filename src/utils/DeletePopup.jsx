import React from "react";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";
// export const DeletePopup = ({
//   handleDeleteMsg,
//   deleteConfirm,
//   handleDeleteConfirm,
//   title1,
//   title2,
//   deleteFile,
//   fileName,fileType
// }) => {
//   return (
//     <section className="fixed top-0 left-0 bg-[#433e3e50] w-full min-h-screen z-[9999] center">
//       {deleteConfirm ? (
//         <div className="max-w-md w-full py-10 px-5 flex flex-col gap-8 bg-white rounded-md shadow-md">
//           <h5 className="text-center text-xl text-[green]"> {title2 || ""}</h5>
//           <div className="flex items-center justify-evenly text-dark_grey">
//             <button
//               className="border px-5 py-1 rounded-md bg-primary"
//               onClick={() => {
//                 handleDeleteMsg();
//                 handleDeleteConfirm();
//               }}
//             >
//               Okay
//             </button>
//             {/* <button className='border px-5 py-1 rounded-md bg-primary'>Cancel</button> */}
//           </div>
//         </div>
//       ) : (
//         <div className="max-w-md w-full py-10 px-5 flex flex-col gap-5 bg-white rounded-md shadow-md">
//           <h5 className="text-center mb-8">{title1 || ""}</h5>{" "}
//           <div className="flex items-center justify-evenly text-dark_grey">
//             <button
//               className="border px-5 py-1 rounded-md bg-primary"
//               onClick={async () => {
//                 await deleteFile(fileType,fileName);
//                 handleDeleteConfirm();
//               }}
//             >
//               Yes
//             </button>
//             <button
//               className="border px-5 py-1 rounded-md border-primary"
//               onClick={handleDeleteMsg}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

export const DeletePopup = ({ handleDeleteMsg, title1, path }) => {
  return (
    <section className="fixed top-0 left-0 bg-[#433e3e50] w-full min-h-screen z-[9999] center">
      <div className="max-w-md w-full py-10 px-5 flex flex-col gap-2 bg-white rounded-md shadow-md">
        <p className="center text-[30px] text-[green] mt-5">
          <SiTicktick />
        </p>
        <h4 className="text-[blue] text-center font-semibold text-lg">
          Deleted Successfully !
        </h4>
        <h5 className="text-center mb-5 font-medium">{title1 || ""}</h5>{" "}
        <div className="flex items-center justify-evenly text-dark_grey">
          <button
            className="border px-5 py-1 rounded-md bg-primary"
            onClick={async () => {
              await handleDeleteMsg();
              if (path) {
                window.location.href = path;
              }
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </section>
  );
};
