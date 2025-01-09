import { useCallback, useEffect, useState } from "react";

export const UseScrollableView = (data, Position) => {
  const ITEMS_PER_PAGE = 25; // Number of items to display per page
  const [visibleData, setVisibleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreDataForNonManager = useCallback(() => {
    try {
      // if (!data || data.length === 0) {
      //   return ; // Return early if no data available
      // }
      // if (!visibleData || visibleData.length === 0) {
      //   return ; // Return early if no data available
      // }
      if (data && data) {
        // Logic for Position !== "Manager"
        const nextPage = currentPage + 1;
        const start = currentPage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        const newItems = data.slice(start, end);

        setVisibleData((prevData) => [...prevData, ...newItems]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      console.log(err, " : Error occur");
    }
  }, [currentPage, data]);

  const loadMoreDataForManager = useCallback(() => {
    // Logic for Position === "Manager"
    if (!data || data.length === 0) return;

    const allData = data.reduce((acc, item) => {
      if (item.data) acc.push(...item.data);
      return acc;
    }, []);

    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setVisibleData((prevData) => [...prevData, ...allData.slice(start, end)]);
    setCurrentPage((prevPage) => prevPage + 1);
  }, [currentPage, data]);

  useEffect(() => {
    // Load initial data for Position !== "Manager"
    if (Position !== "Manager" || Position === "Manager") {
      if (data && data.length > 0) {
        setVisibleData(data.slice(0, ITEMS_PER_PAGE));
        setCurrentPage(1);
      }
    }
  }, [data, Position]);

  useEffect(() => {
    // Load initial data for Position === "Manager"
    if (Position === "Manager") {
      if (!data || data.length === 0) {
        setVisibleData([]);
        setCurrentPage(1);
        return;
      }

      const allData = data.reduce((acc, item) => {
        if (item.data) acc.push(...item.data);
        return acc;
      }, []);

      const start = 0;
      const end = currentPage * ITEMS_PER_PAGE;

      setVisibleData(allData.slice(start, end));
    }
  }, [data, Position, currentPage]);

  const handleScroll = useCallback(
    (e) => {
      const threshold = 5;
      const bottomReached =
        e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + threshold;

      if (bottomReached) {
        if (Position !== "Manager") {
          loadMoreDataForNonManager();
        } else {
          // loadMoreDataForManager();
          loadMoreDataForNonManager()
        }
      }
    },
    [loadMoreDataForNonManager, loadMoreDataForManager, Position]
  );

  return { handleScroll, visibleData, setVisibleData };
};
