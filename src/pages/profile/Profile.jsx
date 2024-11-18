// import { IoCameraOutline } from "react-icons/io5";
// import { IoMdLogOut } from "react-icons/io";
// import avatar from "../../assets/navabar/avatar.jpeg";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { signOut } from "@aws-amplify/auth";

// export const Profile = ({ setIsOpen, profilePhoto, name, email, contactNo }) => {
//   const SignOut = async () => {
//     try {
//       await signOut();
//       localStorage.removeItem("userID");
//       localStorage.removeItem("userType");
//       // console.log("Signed out successfully.");
//       window.location.href = "/login";
//     } catch (error) {
//       console.log("Error signing out", error);
//       setError("Failed to sign out. Please try again.");
//     }
//   };
//   return (
//     <section>
//       <div className="center flex-col gap-2 py-2">
//         <div className="relative">
//           <div className="max-w-10 h-10 w-full rounded-full relative overflow-hidden shadow-md shadow-[#00000033]">
//             <img
//               className="w-full object-cover"
//               src={profilePhoto}
//               alt="avatar not found"
//             />
//           </div>
//           <p className="absolute -right-2 bottom-0 h-5 w-5 rounded-full bg-[#D9D9D9] center">
//             <IoCameraOutline className="text-xs text-dark_grey" />
//           </p>
//         </div>
//         <Link
//           to="/personalInformation"
//           className="text-xs text-dark_grey"
//           onClick={()=>{setIsOpen(false)}}
//         >
//           Personal Info Edit
//         </Link>
//         <div className="h-1 w-full bg-[#AAAAAA]"></div>
//       </div>
//       <div className="space-y-2 mb-3 px-4">
//         <div className=" space-y-1 text-[#4F4F4F] text-xs">
//           <label htmlFor="name" className="font-medium ">
//             Name
//           </label>
//           <div className="border flex-1 rounded-md border-[#d4cfcf]  px-2 py-1 ">
//             <input
//               id="name"
//               className="outline-none w-full"
//               type="text"
//               value={name}
//               readOnly
//             />
//           </div>
//         </div>
//         <div className=" space-y-1 text-[#4F4F4F] text-xs">
//           <label htmlFor="phoneNo" className="font-medium ">
//             Phone Number
//           </label>
//           <div className="border rounded-md border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-1 ">
//             <input
//               id="phoneNo"
//               className="outline-none w-full"
//               type="text"
//               value={contactNo}
//               readOnly
//             />
//           </div>
//         </div>
//         <div className=" space-y-1 text-[#4F4F4F] text-xs">
//           <label htmlFor="email" className="font-medium ">
//             Email
//           </label>
//           <div className="border rounded-md border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-1 ">
//             <input
//               id="email"
//               className="outline-none w-full"
//               type="text"
//               value={email}
//               readOnly
//             />
//           </div>
//         </div>
//         <div className="flex justify-between text-xs text-dark_grey font-semibold pt-3">
//           <Link
//             to="/changePassword"
//             className="py-1 px-2 border-2 rounded-md border-primary "
//           >
//             Change Password
//           </Link>
//           <Link
//             className={`flex items-center gap-1 py-1 px-2 bg-primary  rounded-md `}
//             onClick={SignOut}
//           >
//             Logout
//             <span>
//               <IoMdLogOut className="text-lg text-dark_grey" />
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* <Link className="py-2 pl-1" onClick={toggleDropdown}>Change Password</Link>
//   <Link className="py-2 pl-1" onClick={toggleDropdown}>Edit Profile</Link>
// <Link
//             // to="/logout"
//             // className={({ isActive }) =>
//             //   `flex items-center gap-3 py-2 pl-1  rounded-lg ${
//             //     isActive ? "bg-primary text-secondary" : ""
//             //   }`
//             // }
//             className={`flex items-center gap-3 py-2 pl-1  rounded-lg text-dark_grey text-[15px]`}
//             onClick={SignOut}
//           >
         
//             Logout
//             <span><IoMdLogOut className="text-xl text-dark_grey" /></span>
//           </Link> */}
//     </section>
//   );
// };
import { IoCameraOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import avatar from "../../assets/navabar/avatar.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "@aws-amplify/auth";

export const Profile = ({ setIsOpen, profilePhoto, name, email, contactNo }) => {
  const SignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("userID");
      localStorage.removeItem("userType");
      // console.log("Signed out successfully.");
      window.location.href = "/login";
    } catch (error) {
      console.log("Error signing out", error);
    
    }
  };
  return (
    <section>
      <div className="center flex-col gap-2 py-2">
        <div className="relative">
          <div className="max-w-10 h-10 w-full rounded-full relative overflow-hidden shadow-md shadow-[#00000033]">
            <img
              className="w-full object-cover"
              src={profilePhoto}
              alt="avatar not found"
            />
          </div>
          <p className="absolute -right-2 bottom-0 h-5 w-5 rounded-full bg-[#D9D9D9] center">
            <IoCameraOutline className="text-xs text-dark_grey" />
          </p>
        </div>
        <Link
          to="/personalInformation"
          className="text-xs text-dark_grey"
          onClick={()=>{setIsOpen(false)}}
        >
          Personal Info Edit
        </Link>
        <div className="h-1 w-full bg-[#AAAAAA]"></div>
      </div>
      <div className="space-y-2 mb-3 px-4">
        <div className=" space-y-1 text-[#4F4F4F] text-xs">
          <label htmlFor="name" className="font-medium ">
            Name
          </label>
          <div className="border flex-1 rounded-md border-[#d4cfcf]  px-2 py-1 ">
            <input
              id="name"
              className="outline-none w-full"
              type="text"
              value={name}
              readOnly
            />
          </div>
        </div>
        <div className=" space-y-1 text-[#4F4F4F] text-xs">
          <label htmlFor="phoneNo" className="font-medium ">
            Phone Number
          </label>
          <div className="border rounded-md border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-1 ">
            <input
              id="phoneNo"
              className="outline-none w-full"
              type="text"
              value={contactNo}
              readOnly
            />
          </div>
        </div>
        <div className=" space-y-1 text-[#4F4F4F] text-xs">
          <label htmlFor="email" className="font-medium ">
            Email
          </label>
          <div className="border rounded-md border-[#d4cfcf] text-[#4F4F4F] text-xs px-2 py-1 ">
            <input
              id="email"
              className="outline-none w-full"
              type="text"
              value={email}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-dark_grey font-semibold pt-3">
          <Link
            to="/changePassword"
            className="py-1 px-2 border-2 rounded-md border-primary "
          >
            Change Password
          </Link>
          <Link
            className={`flex items-center gap-1 py-1 px-2 bg-primary  rounded-md `}
            onClick={SignOut}
          >
            Logout
            <span>
              <IoMdLogOut className="text-lg text-dark_grey" />
            </span>
          </Link>
        </div>
      </div>

      {/* <Link className="py-2 pl-1" onClick={toggleDropdown}>Change Password</Link>
  <Link className="py-2 pl-1" onClick={toggleDropdown}>Edit Profile</Link>
<Link
            // to="/logout"
            // className={({ isActive }) =>
            //   `flex items-center gap-3 py-2 pl-1  rounded-lg ${
            //     isActive ? "bg-primary text-secondary" : ""
            //   }`
            // }
            className={`flex items-center gap-3 py-2 pl-1  rounded-lg text-dark_grey text-[15px]`}
            onClick={SignOut}
          >
         
            Logout
            <span><IoMdLogOut className="text-xl text-dark_grey" /></span>
          </Link> */}
    </section>
  );
};