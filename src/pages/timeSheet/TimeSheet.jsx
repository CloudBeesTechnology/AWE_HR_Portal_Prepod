import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/timeSheet/icon1.svg";
import icon2 from "../../assets/timeSheet/icon2.svg";
import icon3 from "../../assets/timeSheet/icon3.svg";
import icon4 from "../../assets/timeSheet/icon4.svg";
import icon5 from "../../assets/timeSheet/icon5.svg";
import icon6 from "../../assets/timeSheet/icon6.svg";
import icon7 from "../../assets/timeSheet/icon7.svg";
import usePermission from "../../hooks/usePermissionDashInside";

export const TimeSheet = () => {
  const timeSheetPermissions = usePermission("userID", "TimeSheet");

  return (
    <section className="p-16 bg-[#f5f6f1cc] h-screen">
      {/* grid grid-flow-col */}
      {/* <div className="grid grid-cols-4  gap-10 my-5 "></div> */}
      <div className=" screen-size">
        <h4 className="text_size_4  w-fit py-2    text-dark_grey ">
          Upload Time Sheet
        </h4>
        <div className="flex justify-start gap-20">
          {/* ONSHORE */}
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
          {/* OFF SHORE */}

          {timeSheetPermissions.includes("Offshore") && (
            <SelectTiles
              img={icon3}
              text1="Offshore"
              borderColor="border-[#B70BA0]"
              bgColor="bg-white"
              link="/timesheetOffshore"
            />
          )}
        </div>
        {/* <div className="flex justify-center gap-20"> */}
        <div className="flex justify-start gap-20">
          {/* BLNG */}
          {timeSheetPermissions.includes("BLNG") && (
            <SelectTiles
              img={icon2}
              text1="BLNG"
              borderColor="border-[#EB9916]"
              bgColor="bg-white"
              link="/timesheetBlng"
            />
          )}
          {/* VIEW TIME SHEET */}
          {timeSheetPermissions.includes("View Time Sheet") && (
            <SelectTiles
              img={icon4}
              text1="View Time"
              text2="sheet"
              borderColor="border-[#D0D716]"
              bgColor="bg-white"
              link="/viewTimesheet"
            />
          )}
          {/* VIEW SUMMARY */}

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
      </div>
    </section>
  );
};
