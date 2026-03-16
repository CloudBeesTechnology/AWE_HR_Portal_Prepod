import { useEffect, useState } from "react";
import logo from "../../../assets/logo/logo.png"

export const TimeSheetSpinner = ({ text }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(notification);
//   }, [notification]);

  return (
    <section>
      {/* {isVisible && ( */}
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[70]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-dark_grey font-semibold">{text}</p>
            <img
              src={logo}
              alt="Logo"
              className="mt-4 cursor-pointer w-12 h-12 mx-auto animate-spin-slow"
            />
          </div>
        </div>
      {/* )} */}
    </section>
  );
};
