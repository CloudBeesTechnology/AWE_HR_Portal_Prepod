import React from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon7 from "../../assets/timeSheet/icon7.svg";
import icon3 from "../../assets/timeSheet/icon3.svg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import usePermission from "../../hooks/usePermissionDashInside";
export const OffshoreExcelSheets = () => {
  const timeSheetPermissions = usePermission("userID", "TimeSheet");
  return (
    <section className="p-16 bg-[#f5f6f1cc] h-screen ">
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
              img={icon3}
              text1="Offshore"
              borderColor="border-[#B70BA0]"
              bgColor="bg-white"
              link="/timesheetOffshore"
            />
          )}
          {timeSheetPermissions.includes("Offshore's ORMC") && (
            <SelectTiles
              img={icon7}
              text1="ORMC"
              borderColor="border-[#06830E]"
              bgColor="bg-white"
              link="/OffshoreSheets/OffshoreORMC"
            />
          )}
        </div>
      </div>
    </section>
  );
};
