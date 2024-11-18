import { useEffect, useState } from "react";
import logo from "../assets/logo/logo.png";

export const SpinLogo = ({ notification, text, path }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the logo after 3 seconds
        if (path) {
          window.location.href = path; // Navigate with a full page refresh
        }
      }, 3000);

      // Cleanup the timer when the component unmounts or notification changes
      return () => clearTimeout(timer);
    }
  }, [notification, path]);

  return (
    <section>
      {isVisible && (
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
      )}
    </section>
  );
};
// import { useEffect, useState } from "react";
// import logo from "../assets/logo/logo.png";

// export const SpinLogo = ({ notification, text, path }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (notification) {
//       setIsVisible(true);
//       const timer = setTimeout(() => {
//         setIsVisible(false);
//         if (path) {
//           window.location.href = path; // Navigate with a full page refresh
//         }
//       }, 3000);

//       // Clean up the timer on unmount or if dependencies change
//       return () => clearTimeout(timer);
//     }
//   }, [notification, path]);

//   return (
//     <section>
//       {isVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[70]">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <p className="text-dark_grey font-semibold">{text}</p>
//             <img
//               src={logo}
//               alt="Logo"
//               className="mt-4 cursor-pointer w-12 h-12 mx-auto animate-spin-slow"
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
// import { useEffect, useState } from "react";
// import logo from "../assets/logo/logo.png";
// import { useNavigate } from "react-router-dom";

// export const SpinLogo = ({ notification, text, path }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (notification) {
//       setIsVisible(true);
//       const timer = setTimeout(() => {
//         setIsVisible(false);
//         navigate(`${path}`);
//       }, 3000);

//       return () => clearTimeout(timer); // Clean up the timer
//     }
//   }, [notification]);

//   return (
//     <section>
//       {isVisible && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[70]">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <p className="text-dark_grey font-semibold">{text}</p>
//             <img
//               src={logo}
//               alt="Logo"
//               className="mt-4 cursor-pointer w-12 h-12 mx-auto animate-spin-slow"
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
