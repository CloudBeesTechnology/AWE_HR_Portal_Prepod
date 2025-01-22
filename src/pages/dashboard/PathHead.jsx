import React, { useContext, useEffect, useState } from "react";
import Group1 from "../../assets/Dashboard/Group1.svg";
import Group2 from "../../assets/Dashboard/Group2.svg";
import Group3 from "../../assets/Dashboard/Group3.svg";
import Group4 from "../../assets/Dashboard/Group4.svg";
import { Link } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";


export const PathHead = () => {
  const { empPIData, IDData } = useContext(DataSupply);

  const [mergeData, setMergeData] = useState([]);
  const [bruneianCount, setBruneianCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [LPACount, setLPACount] = useState(0);
  const [SAWPCount, setSAWPCount] = useState(0);
  
  
  // Function to merge and calculate counts
  const calculateCounts = () => {
    try {
      const candidates = [...empPIData, ...IDData];

      setMergeData(candidates);
    
      const bruneian = candidates.filter(
        (item) =>
          Array.isArray(item.contractType) &&
          item.contractType.map((type) => type.toUpperCase()).includes("LOCAL")
      ).length;
      
      setBruneianCount(bruneian);

      // Calculate LPA count
      const LPA = candidates.filter(
        (item) => Array.isArray(item.contractType) && item.contractType.map((type) => type.toUpperCase()).includes("LPA")
      ).length;
      setLPACount(LPA);

      // Calculate SAWP count
      const SAWP = candidates.filter(
        (item) => Array.isArray(item.contractType) && item.contractType.map((type) => type.toUpperCase()).includes("SAWP")
      ).length;
      setSAWPCount(SAWP);

      // Total count
      setTotalCount(bruneian + LPA + SAWP);
    } catch (err) {
      // console.error("Error calculating counts:", err.message);
    }
  };

  useEffect(() => {
    calculateCounts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 p-4 gap-5">
        {/* Total Employees Card */}
        <Link
          to="/allempDetails"
          className="p-4 bg-gradient-to-r from-[#FFAAAA] to-[#EBEBEB] rounded-lg shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="w-1 h-16 mr-4 border rounded-md bg-[#B17A7A] border-[#B17A7A]"></div>
            <div>
              <h1 className="text-3xl font-bold">{totalCount}</h1>
              <p className="text-sm font-medium">Total Employees</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-2">
            <img src={Group1} alt="icon1" />
          </div>
        </Link>

        {/* LPA Card */}
        <Link
          to="/allempDetails" className="p-4 bg-gradient-to-r from-[#DAFFA6] to-[#EBEBEB] rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1 h-16 mr-4 border rounded-md bg-[#91A672] border-[#91A672]"></div>
            <div>
              <h1 className="text-3xl font-bold">{LPACount}</h1>
              <p className="text-sm font-medium">LPA</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-2">
            <img src={Group2} alt="icon2" />
          </div>
        </Link>

        {/* SAWP Card */}
        <Link
          to="/allempDetails" className="p-4 bg-gradient-to-r from-[#C9DFFF] to-[#EBEBEB] rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1 h-16 mr-4 border rounded-md bg-[#687FA4] border-[#B17A7A]"></div>
            <div>
              <h1 className="text-3xl font-bold">{SAWPCount}</h1>
              <p className="text-sm font-medium">SAWP</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-2">
            <img src={Group3} alt="icon3" />
          </div>
        </Link>

        {/* Bruneian Card */}
        <Link
          to="/allempDetails" className="p-4 bg-gradient-to-r from-[#FFDFAB] to-[#EBEBEB] rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1 h-16 mr-4 border rounded-md bg-[#AB8851] border-[#B17A7A]"></div>
            <div>
              <h1 className="text-3xl font-bold">{bruneianCount}</h1>
              <p className="text-sm font-medium">
                BRUNEIAN / PR{" "}
                <span className="text-[#B17A7A] text-xs">Citizen / PR</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-2">
            <img src={Group4} alt="icon4" />
          </div>
        </Link>
      </div>
    </div>
  );
};


