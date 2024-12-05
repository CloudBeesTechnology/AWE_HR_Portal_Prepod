import { SelectTiles } from "../../utils/SelectTiles";
import icons3 from "../../assets/timeSheet/icons3.svg";
import icons5 from "../../assets/timeSheet/icons5.svg";
import icons8 from "../../assets/timeSheet/icons8.svg";
import icons10 from "../../assets/timeSheet/icons10.svg";
import icons11 from "../../assets/timeSheet/icons11.svg";

export const TimeSheet = () => {
  return (
    <section className="p-16 bg-[#f5f6f1cc] ">
      <h4 className="text_size_6 border w-fit py-2 px-4 bg-slate_grey text-white rounded">
        Please Upload the Time Sheet
      </h4>
      {/* grid grid-flow-col */}
      <div className="grid grid-cols-4  gap-10 my-5">
        {/* ONSHORE */}
        <SelectTiles
          img={icons5}
          text1="HO"
          borderColor="border-[#B70B36]"
          bgColor="bg-white"
          link="/timesheetHO"
        />
        <SelectTiles
          img={icons5}
          text1="SBW"
          borderColor="border-[#B70B36]"
          bgColor="bg-white"
          link="/timesheetSBW"
        />
        <SelectTiles
          img={icons5}
          text1="ORMC"
          borderColor="border-[#B70B36]"
          bgColor="bg-white"
          link="/timesheetORMC"
        />
        {/* OFF SHORE */}
        <SelectTiles
          img={icons3}
          text1="Offshore"
          borderColor="border-[#EB9916]"
          bgColor="bg-white"
          link="/timesheetOffshore"
        />
      </div>
      <div className="grid grid-cols-3 gap-10 my-5">
        {/* BLNG */}
        <SelectTiles
          img={icons10}
          text1="BLNG"
          borderColor="border-[#4E00BC]"
          bgColor="bg-white"
          link="/timesheetBlng"
        />
        {/* VIEW TIME SHEET */}
        <SelectTiles
          img={icons11}
          text1="View Time"
          text2="sheet"
          borderColor="border-[#4E00BC]"
          bgColor="bg-white"
          link="/viewTimesheet"
        />
        {/* VIEW SUMMARY */}
        <SelectTiles
          img={icons8}
          text1="View"
          text2="Summary"
          borderColor="border-[#107B8E]"
          bgColor="bg-white"
          link="/viewSummary"
        />
      </div>
    </section>
  );
};
