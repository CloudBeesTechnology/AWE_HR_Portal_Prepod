import { SelectTiles } from "../../utils/SelectTiles";
import icons3 from "../../assets/timeSheet/icons3.svg";
import icons5 from "../../assets/timeSheet/icons5.svg";
import icons8 from "../../assets/timeSheet/icons8.svg";
import icons10 from "../../assets/timeSheet/icons10.svg";
import icons11 from "../../assets/timeSheet/icons11.svg";
export const TimeSheet = () => {
  return (
    <section className="p-16 bg-[#F5F6F1CC] ">
      <h4 className="text_size_6 text-dark_grey">
        Please Upload the Time Sheet
      </h4>
      {/* grid grid-flow-col */}
      <div className="grid grid-cols-4  gap-10 my-5">
        {/* ONSHORE */}
        <SelectTiles
          img={icons5}
          text1="HO"
          borderColor="border-[red]"
          link="/timesheetHO"
        />
        <SelectTiles
          img={icons5}
          text1="SBW"
          borderColor="border-[red]"
          link="/timesheetSBW"
        />
        <SelectTiles
          img={icons5}
          text1="ORMC"
          borderColor="border-[red]"
          link="/timesheetORMC"
        />
        {/* OFF SHORE */}
        <SelectTiles
          img={icons3}
          text1="Offshore"
          borderColor="border-[orange]"
          link="/timesheetOffshore"
        />
      </div>
      <div className="grid grid-cols-3 gap-10 my-5">
        {/* BLNG */}
        <SelectTiles
          img={icons10}
          text1="BLNG"
          borderColor="border-[violet]"
          link="/timesheetBlng"
        />
        {/* VIEW TIME SHEET */}
        <SelectTiles
          img={icons11}
          text1="View Time"
          text2="sheet"
          borderColor="border-[violet]"
          link="/viewTimesheet"
        />
        {/* VIEW SUMMARY */}
        <SelectTiles
          img={icons8}
          text1="View"
          text2="Summary"
          borderColor="border-[green]"
          link="/viewTimesheet"
        />
      </div>
    </section>
  );
};
