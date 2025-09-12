// import { SelectTiles } from "../../utils/SelectTiles";
// import icon1 from "../../assets/timeSheet/icon1.svg";
// import icon2 from "../../assets/timeSheet/icon2.svg";
// import icon3 from "../../assets/timeSheet/icon3.svg";
// import icon4 from "../../assets/timeSheet/icon4.svg";
// import icon5 from "../../assets/timeSheet/icon5.svg";
// import icon6 from "../../assets/timeSheet/icon6.svg";
// import icon7 from "../../assets/timeSheet/icon7.svg";
// import icon8 from "../../assets/timeSheet/icon8.svg";
// import icon9 from "../../assets/timeSheet/icon9.svg";
// import icon10 from "../../assets/timeSheet/icon10.svg";

// import usePermission from "../../hooks/usePermissionDashInside";

// export const TimeSheet = () => {
//   const timeSheetPermissions = usePermission("userID", "TimeSheet");

//   return (
//     <section className="p-16 bg-[#f5f6f1cc] h-screen">
//       <div className=" screen-size">
//         <h4 className="text_size_4  w-fit py-2    text-dark_grey ">
//           Upload Time Sheet
//         </h4>
//         <div className="flex justify-start gap-20">
//           {/* ONSHORE */}
//           {timeSheetPermissions.includes("HO") && (
//             <SelectTiles
//               img={icon5}
//               text1="HO"
//               borderColor="border-[#4E00BC]"
//               bgColor="bg-white"
//               link="/timesheetHO"
//             />
//           )}

//           {timeSheetPermissions.includes("SBW") && (
//             <SelectTiles
//               img={icon1}
//               text1="SBW"
//               borderColor="border-[#B70B36]"
//               bgColor="bg-white"
//               link="/timesheetSBW"
//             />
//           )}

//           {timeSheetPermissions.includes("ORMC") && (
//             <SelectTiles
//               img={icon7}
//               text1="ORMC"
//               borderColor="border-[#06830E]"
//               bgColor="bg-white"
//               link="/timesheetORMC"
//             />
//           )}
//           {/* OFF SHORE */}

//           {timeSheetPermissions.includes("Offshore") ||
//           timeSheetPermissions.includes("Offshore's ORMC") ? (
//             <SelectTiles
//               img={icon3}
//               text1="Offshore's"
//               text2="excel Sheet"
//               borderColor="border-[#B70BA0]"
//               bgColor="bg-white"
//               link="/OffshoreSheets"
//             />
//           ) : null}
//         </div>

//         <div className="flex justify-start gap-20">
//           {/* BLNG */}
//           {timeSheetPermissions.includes("BLNG") && (
//             <SelectTiles
//               img={icon2}
//               text1="BLNG"
//               borderColor="border-[#EB9916]"
//               bgColor="bg-white"
//               link="/timesheetBlng"
//             />
//           )}
//           {/* VIEW TIME SHEET */}
//           {timeSheetPermissions.includes("View Time Sheet") && (
//             <SelectTiles
//               img={icon8}
//               text1="View Time"
//               text2="sheet"
//               borderColor="border-[#9B9F27]"
//               bgColor="bg-white"
//               link="/viewTimesheet"
//             />
//           )}
//           {/* VIEW SUMMARY */}

//           {timeSheetPermissions.includes("View Summary") && (
//             <SelectTiles
//               img={icon6}
//               text1="View"
//               text2="Summary"
//               borderColor="border-[#107B8E]"
//               bgColor="bg-white"
//               link="/viewSummary"
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/timeSheet/icon1.svg";
import icon2 from "../../assets/timeSheet/icon2.svg";
import icon3 from "../../assets/timeSheet/icon3.svg";
import icon5 from "../../assets/timeSheet/icon5.svg";
import icon6 from "../../assets/timeSheet/icon6.svg";
import icon7 from "../../assets/timeSheet/icon7.svg";
import icon8 from "../../assets/timeSheet/icon8.svg";
import usePermission from "../../hooks/usePermissionDashInside";

export const TimeSheet = () => {
  const timeSheetPermissions = usePermission("userID", "TimeSheet");

  const isLoading = !timeSheetPermissions || timeSheetPermissions.length === 0;

  return (
    <section className="p-16 bg-[#f5f6f1cc] h-screen">
      <div className="screen-size">
        <h4 className="text_size_4 w-fit py-2 text-dark_grey">
          Upload Time Sheet
        </h4>

        {isLoading ? (
          // 🔹 Skeleton/Ghost Loader
          <section>
            <div className="flex justify-start gap-20">
              {[...Array(4)].map((_, i) => (
                // <div key={i} className="border">
                <div
                  key={i}
                  className="shadow-lg border border-grey bg-white my-5 h-36 max-w-48 w-full rounded-xl flex flex-col items-center justify-center text-center gap-3 p-5 animate-pulse"
                >
                  <div className="w-full max-w-[60px]">
                    <div className="w-full h-12 bg-grey rounded-md"></div>
                  </div>
                  <div className="w-20 h-3 bg-grey rounded"></div>
                  <div className="w-20 h-3 bg-grey rounded"></div>
                </div>
              ))}
            </div>

            {/* Second row */}
            <div className="flex justify-start gap-20">
              {[...Array(3)].map((_, i) => (
                // <div key={i} className="border">
                <div
                  key={i}
                  className="shadow-lg border border-grey bg-white my-5 h-36 max-w-48 w-full rounded-xl flex flex-col items-center justify-center text-center gap-3 p-5 animate-pulse"
                >
                  <div className="w-full max-w-[60px]">
                    <div className="w-full h-12 bg-grey rounded-md"></div>
                  </div>
                  <div className="w-20 h-3 bg-grey rounded"></div>
                  <div className="w-20 h-3 bg-grey rounded"></div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <div className="flex justify-start gap-20">
              {timeSheetPermissions.includes("HO") && (
                <SelectTiles
                  img={icon5}
                  text1="HO"
                  borderColor="border-[#4E00BC]"
                  bgColor="bg-white"
                  link="/timesheetHO"
                />
              )}
              {timeSheetPermissions.includes("SBW") && (
                <SelectTiles
                  img={icon1}
                  text1="SBW"
                  borderColor="border-[#B70B36]"
                  bgColor="bg-white"
                  link="/timesheetSBW"
                />
              )}
              {timeSheetPermissions.includes("ORMC") && (
                <SelectTiles
                  img={icon7}
                  text1="ORMC"
                  borderColor="border-[#06830E]"
                  bgColor="bg-white"
                  link="/timesheetORMC"
                />
              )}
              {(timeSheetPermissions.includes("Offshore") ||
                timeSheetPermissions.includes("Offshore's ORMC")) && (
                <SelectTiles
                  img={icon3}
                  text1="Offshore's"
                  text2="excel Sheet"
                  borderColor="border-[#B70BA0]"
                  bgColor="bg-white"
                  link="/OffshoreSheets"
                />
              )}
            </div>

            <div className="flex justify-start gap-20 mt-6">
              {timeSheetPermissions.includes("BLNG") && (
                <SelectTiles
                  img={icon2}
                  text1="BLNG"
                  borderColor="border-[#EB9916]"
                  bgColor="bg-white"
                  link="/timesheetBlng"
                />
              )}
              {timeSheetPermissions.includes("View Time Sheet") && (
                <SelectTiles
                  img={icon8}
                  text1="View Time"
                  text2="sheet"
                  borderColor="border-[#9B9F27]"
                  bgColor="bg-white"
                  link="/viewTimesheet"
                />
              )}
              {timeSheetPermissions.includes("View Summary") && (
                <SelectTiles
                  img={icon6}
                  text1="View"
                  text2="Summary"
                  borderColor="border-[#107B8E]"
                  bgColor="bg-white"
                  link="/viewSummary"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
