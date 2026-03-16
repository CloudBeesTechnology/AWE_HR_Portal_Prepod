import { useEffect, useState } from "react";
import { SendDataToManager } from "./SendDataToManager";

export const LoadingMessManagerTable = ({ ManagerData }) => {
  const Position = localStorage.getItem("userType");
  const [loadingStateManager, setLoadingState] = useState({
    isLoading: true,
    message: "Loading...",
  });
  const [showManagerTable, setShowManagerTable] = useState(false);
  const [managerWholeData, setManagerWholeData] = useState([]);

  useEffect(() => {
    if (Position === "Manager" && ManagerData && ManagerData.length > 0) {
      const fetchData = async () => {
        const transformedData = await SendDataToManager(ManagerData);

        if (transformedData && transformedData.length > 0) {
          setManagerWholeData(transformedData);
          setShowManagerTable(true);
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
    } else if (
      Position === "Manager" &&
      ManagerData &&
      ManagerData.length === 0
    ) {
      setLoadingState({
        isLoading: true,
        message: "No Data Available",
      });
    } else if (Position === "Manager" && !ManagerData) {
      setLoadingState({
        isLoading: true,
        message: "Please wait few seconds...",
      });
    }
  }, [ManagerData, Position]);

  return { managerWholeData, loadingStateManager, showManagerTable };
};
