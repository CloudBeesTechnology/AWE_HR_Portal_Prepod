
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";

export const Round = () => {
  const { empPIData, IDData ,hiringData} = useContext(DataSupply);
// console.log(hiringData);

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
    <div className="flex justify-center h-full p-2 w-full">
    <div className="rounded-lg shadow-md w-full ">
      <div className=" font-semibold p-3">
        <h2 className=" mx-2">Application Received</h2>
      </div>
       
       <div className=" h-full flex flex-col  items-center gap-16 mt-5 p-1">
       <div className="w-full flex justify-evenly items-center gap-2">
       <div className="rounded-lg shadow-lg flex items-center h-[140px] w-[180px] border border-lite_grey">
            <div className="w-2 h-32  rounded-md bg-[#6E349E]"></div>
            <div className="w-full flex justify-center items-center flex-col m-1">
              <p className="text-sm font-medium">Marker Fitter</p>
              <h1 className="text-3xl font-bold">{totalCount}</h1>
            </div>   
            </div>  

        <div className="rounded-lg shadow-lg flex items-center justify-between h-[140px] w-[180px] border border-lite_grey">
            <div className="w-2 h-32  rounded-md bg-[#F1A924]"></div>
            <div  className="w-full flex justify-center items-center flex-col m-1">
              <p className="text-sm font-medium">Welder</p>
              <h1 className="text-3xl font-bold">{LPACount}</h1>
            </div>
          </div>
       </div>

         <div className="w-full flex justify-evenly items-center gap-2 ">
         <div className="rounded-lg shadow-lg flex items-center h-[140px] w-[180px] border border-lite_grey">
         <div className="w-2 h-32 rounded-md bg-[#E61A1A]"></div>
            <div className="w-full  flex justify-center items-center flex-col m-1">
              <p className="text-sm font-medium">Blasting/Painter</p>
              <h1 className="text-3xl font-bold">{totalCount}</h1>
            </div>     
        </div>

        <div className="rounded-lg shadow-lg flex items-center justify-between h-[140px] w-[180px] border border-lite_grey ">
        <div className="w-2 h-32 rounded-md bg-[#17C900] "></div>
            <div  className="w-full flex justify-center items-center flex-col m-1">
              <p className="text-sm font-medium">Trainer</p>
              <h1 className="text-3xl font-bold">{LPACount}</h1>
            </div>
          </div>
         </div>
       </div>
       
      </div>
    </div>
  );
};