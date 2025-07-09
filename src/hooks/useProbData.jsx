import { useContext, useEffect, useState } from "react";
import { DataSupply } from "../utils/DataStoredContext";

const useMergedEmployeeData = () => {
  const {
    empPIData = [],
    workInfoData = [],
    ProbFData = [],
    SRData = [],
  } = useContext(DataSupply);

  const [mergedProbData, setMergedProbData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!empPIData || empPIData.length === 0) {
      setMergedProbData([]);
      setLoading(false);
      return;
    }

    const empPIMap = new Map(empPIData.map((emp) => [emp.empID, emp]));
    const workInfoMap = new Map(workInfoData.map((info) => [info.empID, info]));
    const SRDataMap = new Map(SRData.map((info) => [info.empID, info]));

    const finalMergedData = [];

    // 1. Iterate through ProbFData first — use as root only if matching empPIData exists
    for (const prob of ProbFData) {
      const pi = empPIMap.get(prob.empID);
      if (pi) {
        const work = workInfoMap.get(prob.empID) || {};
        const srdata = SRDataMap.get(prob.empID) || {};
        const merged = {
          empCreatedAt: pi.createdAt,
          probCreatedAt: prob?.createdAt,
          workInfoCreatedAt: work?.createdAt,
          ...pi,
          ...prob,
          ...work,
          ...srdata,
        };
        finalMergedData.push(merged);
        // finalMergedData.push({
        //   ...prob,
        //   ...pi,
        //   ...work,
        // });
      }
    }

    // 2. Add any empPIData-only records (no ProbFData match)
    for (const pi of empPIData) {
      if (!ProbFData.find((p) => p.empID === pi.empID)) {
        const work = workInfoMap.get(pi.empID) || {};
        const srdata = SRDataMap.get(pi.empID) || {};
        const merged = {
          empCreatedAt: pi.createdAt,
          probCreatedAt: null,
          workInfoCreatedAt: work?.createdAt,
          ...pi,
          ...work,
          ...srdata,
        };
        finalMergedData.push(merged);
        // finalMergedData.push({
        //   ...pi,
        //   ...work,
        // });
      }
    }

    setMergedProbData((prev) => {
      const isEqual = JSON.stringify(prev) === JSON.stringify(finalMergedData);
      return isEqual ? prev : finalMergedData;
    });

    setLoading(false);
  }, [empPIData, workInfoData, ProbFData]);

  // console.log("MP", mergedProbData);
  return { mergedProbData, loading };
};

export default useMergedEmployeeData;
