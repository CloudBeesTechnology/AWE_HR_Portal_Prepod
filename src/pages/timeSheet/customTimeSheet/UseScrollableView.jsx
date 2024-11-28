// import { useCallback, useEffect, useState } from "react";

// export const useScrollableView = (data, Position) => {
//   const ITEMS_PER_PAGE = 50; // Initial number of items to display
//   const [visibleData, setVisibleData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   if (Position === "Manager") {
//     useEffect(() => {
//       if (data && data.length > 0) {
//         // const formattedData = setData(inputData);

//         // Dynamically access the first "data" array from all objects
//         const initialData = data.reduce((acc, item) => {
//           acc.push(...item.data);
//           return acc;
//         }, []);

//         // Slice the initial data based on the chunk size
//         const initialItems = initialData.slice(0, ITEMS_PER_PAGE);
//         setVisibleData(initialItems);
//       }
//     }, [data]);

//     // Load more data dynamically
//     const loadMoreData = useCallback(() => {
//       const nextPage = currentPage + 1;
//       const start = nextPage * ITEMS_PER_PAGE;
//       const end = start + ITEMS_PER_PAGE;

//       const allData = data.reduce((acc, item) => {
//         acc.push(...item.data);
//         return acc;
//       }, []);

//       const newItems = allData.slice(start, end);
//       console.log(newItems);
//       setVisibleData((prevData) => [...prevData, ...newItems]);

//       setCurrentPage(nextPage);
//     }, [currentPage, data]);

//     useEffect(() => {
//       if (visibleData) {
//         console.log(visibleData);
//       }
//     }, [visibleData]);
//     // Handle scroll event
//     const handleScroll = (e) => {
//       const threshold = 5;
//       const bottomReached =
//         e.target.scrollHeight - e.target.scrollTop <=
//         e.target.clientHeight + threshold;

//       if (bottomReached) {
//         if (data && data.length > 0) {
//           loadMoreData();
//         }
//       }
//     };
//   } else if (Position !== "Manager") {
//     useEffect(() => {
//       // Load initial data
//       if (data && data.length > 0) {
//         setVisibleData(data.slice(0, ITEMS_PER_PAGE));
//       }
//     }, [data]);

//     const loadMoreData = useCallback(() => {
//       // Calculate new visible data when user scrolls down
//       const nextPage = currentPage + 1;
//       const start = currentPage * ITEMS_PER_PAGE;
//       const end = start + ITEMS_PER_PAGE;

//       const newItems = data.slice(start, end);

//       setVisibleData((prevData) => [...prevData, ...newItems]);
//       setCurrentPage(nextPage);
//     }, [currentPage, data]);

//     const handleScroll = (e) => {
//       const threshold = 5;
//       const bottomReached =
//         e.target.scrollHeight - e.target.scrollTop <=
//         e.target.clientHeight + threshold;

//       if (bottomReached) {
//         if (data && data.length > 0) {
//           console.log(true);
//           loadMoreData();
//         }
//       }
//     };
//   }
//   return { handleScroll, visibleData };
// };

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// import { useCallback, useEffect, useState } from "react";

// export const useScrollableView = (data, Position) => {
//   const ITEMS_PER_PAGE = 50; // Initial number of items to display
//   const [visibleData, setVisibleData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Function to load more data dynamically
//   const loadMoreData = useCallback(() => {
//     if (!data || data.length === 0) return;

//     const nextPage = currentPage + 1;
//     const start = currentPage * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;

//     const allData = data.reduce((acc, item) => {
//       if (item.data) acc.push(...item.data); // Ensure `item.data` exists
//       return acc;
//     }, []);

//     const newItems = allData.slice(start, end);
//     setVisibleData((prevData) => [...prevData, ...newItems]);
//     setCurrentPage(nextPage);
//   }, [currentPage, data]);

//   const loadMoreDatas = useCallback(() => {
//     // Calculate new visible data when user scrolls down
//     const nextPage = currentPage + 1;
//     const start = currentPage * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;

//     const newItems = data.slice(start, end);

//     setVisibleData((prevData) => [...prevData, ...newItems]);
//     setCurrentPage(nextPage);
//   }, [currentPage, data]);

//   // Handle scroll event
//   const handleScroll = (e) => {
//     if (!data || data.length === 0) return;

//     const threshold = 5;
//     const bottomReached =
//       e.target.scrollHeight - e.target.scrollTop <=
//       e.target.clientHeight + threshold;

//     if (bottomReached) {
//       if (Position === "Manager") {
//         loadMoreData();
//       } else {
//         loadMoreDatas();
//       }
//     }
//   };

//   // Effect to load initial data for "Manager" position
//   useEffect(() => {
//     if (!data || data.length === 0) {
//       setVisibleData([]); // Fallback for empty or undefined data
//       return;
//     }

//     if (Position === "Manager") {
//       const initialData = data.reduce((acc, item) => {
//         if (item.data) acc.push(...item.data); // Ensure `item.data` exists
//         return acc;
//       }, []);
//       setVisibleData(initialData.slice(0, ITEMS_PER_PAGE));
//     } else {
//       setVisibleData(data.slice(0, ITEMS_PER_PAGE));
//     }
//   }, [data, Position]);

//   return { handleScroll, visibleData };
// };
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// import { useCallback, useEffect, useState } from "react";

// export const useScrollableView = (data, Position) => {
//   const ITEMS_PER_PAGE = 50; // Number of items to display per page
//   const [visibleData, setVisibleData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const loadMoreData = useCallback(() => {
//     if (!data || data.length === 0) return;

//     const allData =
//       Position === "Manager"
//         ? data.reduce((acc, item) => {
//             if (item.data) acc.push(...item.data);
//             return acc;
//           }, [])
//         : data;

//     const start = currentPage * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;

//     setVisibleData((prevData) => [...prevData, ...allData.slice(start, end)]);
//     setCurrentPage((prevPage) => prevPage + 1);
//   }, [currentPage, data, Position]);

//   useEffect(() => {
//     if (!data || data.length === 0) {
//       setVisibleData([]);
//       setCurrentPage(1);
//       return;
//     }

//     const initialData =
//       Position === "Manager"
//         ? data.reduce((acc, item) => {
//             if (item.data) acc.push(...item.data);
//             return acc;
//           }, [])
//         : data;

//     const start = 0;
//     const end = currentPage * ITEMS_PER_PAGE;

//     setVisibleData(initialData.slice(start, end));
//   }, [data, Position, currentPage]);

//   return { handleScroll: loadMoreData, visibleData };
// };

// ****************************************************************************
// ****************************************************************************
import { useCallback, useEffect, useState } from "react";

export const useScrollableView = (data, Position) => {
  const ITEMS_PER_PAGE = 25; // Number of items to display per page
  const [visibleData, setVisibleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreDataForNonManager = useCallback(() => {
    // Logic for Position !== "Manager"
    const nextPage = currentPage + 1;
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const newItems = data.slice(start, end);

    setVisibleData((prevData) => [...prevData, ...newItems]);
    setCurrentPage(nextPage);
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
    if (Position !== "Manager") {
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
          loadMoreDataForManager();
        }
      }
    },
    [loadMoreDataForNonManager, loadMoreDataForManager, Position]
  );

  return { handleScroll, visibleData, setVisibleData };
};
