import React, { useContext } from "react";
import { DataSupply } from "../../utils/DataStoredContext";

export const UserProgress = () => {
  const { userData } = useContext(DataSupply);
  const userCounts = userData.reduce(
    (acc, val) => {
      if (val.selectType !== "Employee" && val.status === "Active") {
        acc.active += 1;
      } else if (val.selectType !== "Employee" && val.status === "InActive") {
        acc.inactive += 1;
      }
      return acc;
    },
    { active: 0, inactive: 0 }
  );

  return (
    <div className="flex justify-evenly items-center w-full gap-3 bg-white py-7 px-2 rounded-2xl shadow-lg">
      {/* Active Users */}
      <div className="text-center w-full ">
        <h3 className="text-lg font-semibold">Active users</h3>
        <div className="relative w-full h-2 bg-grey rounded-full overflow-hidden my-2">
          <div
            className="absolute h-full bg-[#32d432]"
            style={{ width: `${userCounts.active}%` }}
          />
        </div>
        <p className="font-medium">{userCounts.active} user</p>
      </div>

      {/* Inactive Users */}
      <div className="text-center  w-full">
        <h3 className="text-lg font-semibold">Inactive users</h3>
        <div className="relative w-full h-2 bg-grey rounded-full overflow-hidden my-2">
          <div
            className="absolute h-full bg-yellow"
            style={{ width: `${userCounts.inactive}%` }}
          />
        </div>
        <p className="font-medium">{userCounts.inactive} user</p>
      </div>
    </div>
  );
};
