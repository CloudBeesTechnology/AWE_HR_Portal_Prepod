import React from "react";
import { useTempID } from "../../../utils/TempIDContext";

export const DateFilter = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useTempID();
  return (
    <div className="flex items-center gap-4">
      <div className="grid grid-cols-1">
        <label htmlFor="" className=" text-dark_grey text_size_5">
          Start Date
        </label>
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-lite_grey rounded px-2 py-1 outline-none"
        />
      </div>

      <div className="grid grid-cols-1">
        <label htmlFor="" className="px-2 text-dark_grey text_size_5">
          End Date
        </label>
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => setEndDate(e.target.value)}
          className="ml-2 border border-lite_grey rounded px-2 py-1 outline-none"
        />
      </div>
    </div>
  );
};
