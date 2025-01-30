import { useEffect, useState } from "react";
import { SendDataToManager } from "./SendDataToManager";

export const LoadingMessManagerTable = (finalData) => {
  const Position = localStorage.getItem("userType");
  const [loadingStateManager, setLoadingState] = useState({
    isLoading: true,
    message: "Loading...",
  });
  const [showManagerTable, setShowManagerTable] = useState(false);
  const [managerWholeData, setManagerWholeData] = useState([]);
 
  useEffect(() => {
    if (Position === "Manager" && finalData) {
      const fetchData = async () => {
        const transformedData = await SendDataToManager(finalData);
       
        setManagerWholeData(transformedData);
      };
      fetchData();
    }
  }, [finalData, Position]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataLoading = () => {
    if (managerWholeData && managerWholeData.length > 0) {
      setShowManagerTable(true);
      setLoadingState({ isLoading: false, message: "Working..." });
      setIsDataLoaded(true);
    } else {
      setLoadingState({ isLoading: true, message: "Loading..." });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        !isDataLoaded &&
        (!managerWholeData || managerWholeData.length === 0)
      ) {
        setLoadingState({
          isLoading: true,
          message: "No Data Available",
        });
      }
    }, 10000);

    handleDataLoading();

    return () => clearTimeout(timeoutId);
  }, [managerWholeData, isDataLoaded]);

  return { managerWholeData, loadingStateManager, showManagerTable };
};
