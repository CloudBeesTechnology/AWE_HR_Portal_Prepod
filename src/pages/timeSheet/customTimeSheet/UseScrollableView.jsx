
import { useCallback, useEffect, useState } from "react";

export const UseScrollableView = (data, position) => {
  const ITEMS_PER_PAGE = 25; // Number of items to display per page
  const [visibleData, setVisibleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreData = useCallback(() => {
    try {
      const nextPage = currentPage + 1;
      const start = currentPage * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newItems = data.slice(start, end);

      setVisibleData((prevData) => [...prevData, ...newItems]);
      setCurrentPage(nextPage);
    } catch (err) {
      // console.error("Error occurred while loading data:", err);
    }
  }, [currentPage, data]);

  useEffect(() => {
    if (data && data.length > 0) {
      setVisibleData(data.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
    }
  }, [data]);

  const handleScroll = useCallback(
    (e) => {
      const threshold = 5;
      const bottomReached =
        e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + threshold;

      if (bottomReached) {
        loadMoreData();
      }
    },
    [loadMoreData]
  );

  return { handleScroll, visibleData, setVisibleData };
};
