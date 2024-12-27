import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";


export const Round = () => {
  const { empPIData, IDData } = useContext(DataSupply);

  const [mergeData, setMergeData] = useState([]);
  const [bruneianCount, setBruneianCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [LPACount, setLPACount] = useState(0);
  const [SAWPCount, setSAWPCount] = useState(0);
  
  
  const calculateCounts = () => {
    try {
      const candidates = [...empPIData, ...IDData];

      setMergeData(candidates);
    
      const bruneian = candidates.filter(
        (item) => Array.isArray(item.contractType) && item.contractType.includes("Local")
      ).length;
      setBruneianCount(bruneian);

      // Calculate LPA count
      const LPA = candidates.filter(
        (item) => Array.isArray(item.contractType) && item.contractType.includes("LPA")
      ).length;
      setLPACount(LPA);

      // Calculate SAWP count
      const SAWP = candidates.filter(
        (item) => Array.isArray(item.contractType) && item.contractType.includes("SAWP")
      ).length;
      setSAWPCount(SAWP);

      // Total count
      // setTotalCount(bruneian + LPA + SAWP);
    } catch (err) {
      // console.error("Error calculating counts:", err.message);
    }
  };

  useEffect(() => {
    calculateCounts();
  }, []);

  return (
    <div className="flex justify-center h-full max-w-[500px] p-2 w-full ">
    <div className="rounded-lg shadow-md w-full h-full">
      <div className=" font-semibold p-3">
        <h2 className=" mx-2">Application Received</h2>
      </div>
       
      <div className="flex justify-evenly items-center flex-wrap h-full">
       <div
          className="rounded-lg shadow-lg flex items-center h-[120px] w-[150px] "
        >
            <div className="w-1 h-16 mr-4 rounded-md bg-[#B17A7A] border-[#B17A7A]"></div>
            <div className="text-center flex justify-center items-center flex-col">
              <h1 className="text-3xl font-bold">{totalCount}</h1>
              <p className="text-sm font-medium">Marker Fitter</p>
            </div>     
        </div>

        <div className="rounded-lg shadow-lg flex items-center justify-between  h-[120px] w-[150px] ">
            <div className="w-1 h-16 rounded-md bg-[#91A672] border-[#91A672]"></div>
            <div  className="text-start  w-full  pl-16">
              <h1 className="text-3xl font-bold">{LPACount}</h1>
              <p className="text-sm font-medium">Welder</p>
            </div>
          </div>

          <div
          className="rounded-lg shadow-lg flex items-center   h-[120px] w-[150px] "
        >
            <div className="w-1 h-16 mr-4 border rounded-md bg-[#B17A7A] border-[#B17A7A]"></div>
            <div className="text-center flex justify-center items-center flex-col">
              <h1 className="text-3xl font-bold">{totalCount}</h1>
              <p className="text-sm font-medium">Marker Fitter</p>
            </div>     
        </div>

        <div className="rounded-lg shadow-lg flex items-center  h-[120px] w-[150px] ">
            <div className="w-1 h-16 mr-4 border rounded-md bg-[#91A672] border-[#91A672]"></div>
            <div  className="text-center flex justify-center items-center flex-col">
              <h1 className="text-3xl font-bold">{LPACount}</h1>
              <p className="text-sm font-medium">Welder</p>
            </div>
          </div>
       </div>
      </div>
    </div>
  );
};