import React from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon7 from "../../assets/timeSheet/icon7.svg";
import icon3 from "../../assets/timeSheet/icon3.svg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import icon9 from "../../assets/timeSheet/icon9.svg";
import icon10 from "../../assets/timeSheet/icon10.svg";
import usePermission from "../../hooks/usePermissionDashInside";
export const OffshoreExcelSheets = () => {
  const timeSheetPermissions = usePermission("userID", "TimeSheet");
  return (
    <section className="p-16 bg-[#F5F6F1] h-screen ">
      <div className="text-start screen-size mb-3">
        <Link to="/timeSheet" className="text-xl flex-1 text-grey  ">
          <FaArrowLeft />
        </Link>
      </div>

      <div className=" screen-size ">
        <h4 className="text_size_4  w-fit py-2    text-dark_grey ">
          Upload Time Sheet
        </h4>
        <div className="flex justify-start gap-20">
          {timeSheetPermissions.includes("Offshore") && (
            <SelectTiles
              img={icon9}
              text1="Offshore"
              borderColor="border-[#B7610B]"
              bgColor="bg-white"
              link="/timesheetOffshore"
            />
          )}
          {timeSheetPermissions.includes("Offshore's ORMC") && (
            <SelectTiles
              img={icon10}
              text1="ORMC"
              borderColor="border-[#0B47B7]"
              bgColor="bg-white"
              link="/OffshoreSheets/OffshoreORMC"
            />
          )}
        </div>
      </div>
    </section>
  );
};
