import { useEffect, useState } from "react";
import { FindSpecificTimeKeeper } from "./FindSpecificTimeKeeper";

export const LoadingMessRejectTab = (finalData) => {
  const Position = localStorage.getItem("userType");
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    message: "Loading...",
  });
  const [showRejectTable, setShowRejectTable] = useState(false);
  const [wholeData, setWholeData] = useState([]);
  useEffect(() => {
    if (Position !== "Manager" && finalData) {
      const fetchData = async () => {
        const transformedData = await FindSpecificTimeKeeper(finalData);
        // console.log(transformedData);
        setWholeData(transformedData); // Set the converted data
      };
      fetchData();
    }
  }, [finalData, Position]);

  const [isDataLoaded, setIsDataLoaded] = useState(false); // Flag to track successful data load

  // Handle data loading with timeout
  const handleDataLoading = () => {
    if (wholeData && wholeData.length > 0) {
      // Data has been loaded successfully
      setShowRejectTable(true);
      setLoadingState({ isLoading: false, message: "Working..." });
      setIsDataLoaded(true); // Mark data as loaded
    } else {
      // Data hasn't loaded yet, set loading state
      setLoadingState({ isLoading: true, message: "Loading..." });
    }
  };

  // Timeout for fallback message if data is still not available after 15 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only set the fallback message if data has not been loaded successfully yet
      if (!isDataLoaded && (!wholeData || wholeData.length === 0)) {
        setLoadingState({
          isLoading: true,
          message: "No Data Available",
        });
      }
    }, 10000); // Fallback after 15 seconds

    handleDataLoading(); // Check the data immediately

    // Clean up timeout if component unmounts or if data is loaded
    return () => clearTimeout(timeoutId);
  }, [wholeData, isDataLoaded]);

  return { wholeData, loadingState, showRejectTable };
};
