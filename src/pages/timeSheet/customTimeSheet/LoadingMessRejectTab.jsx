import { useEffect, useState } from "react";
import { FindSpecificTimeKeeper } from "./FindSpecificTimeKeeper";

export const LoadingMessRejectTab = ({ finalData }) => {
  const Position = localStorage.getItem("userType");
  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    message: "Loading...",
  });
  const [showRejectTable, setShowRejectTable] = useState(false);
  const [wholeData, setWholeData] = useState([]);
  useEffect(() => {
    if (Position !== "Manager" && finalData && finalData.length > 0) {
      const fetchData = async () => {
        const transformedData = await FindSpecificTimeKeeper(finalData);

        if (transformedData && transformedData.length > 0) {
          setWholeData(transformedData);
          setShowRejectTable(true);
          setLoadingState({
            isLoading: false,
            message: "Working...",
          });
        } else {
          setLoadingState({
            isLoading: true,
            message: "No Data Available",
          });
        }
      };
      fetchData();
    } else if (Position !== "Manager" && finalData && finalData.length === 0) {
      setLoadingState({
        isLoading: true,
        message: "No Data Available",
      });
    } else if (Position !== "Manager" && !finalData) {
      setLoadingState({
        isLoading: true,
        message: "Please wait few seconds...",
      });
    }

  
  }, [finalData, Position]);

  return { wholeData, loadingState, showRejectTable };
};
