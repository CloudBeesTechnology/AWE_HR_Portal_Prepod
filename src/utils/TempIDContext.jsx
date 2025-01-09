import React, { createContext, useContext, useState } from "react";

const TempIDContext = createContext();

export const useTempID = () => {
  return useContext(TempIDContext);
};

export const TempIDProvider = ({ children }) => {
  const [tempID, setTempID] = useState(null);
  const [timeSheetFileData, setTimeSheetFileData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchQuery, setSearchQuery] = useState(null);
  const [showListTimeSheet, setShowListTimeSheet] = useState(true);
 const [categoryFilter, setCategoryFilter] = useState("Select Excel Sheet");
  // For View Summary
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [getStartDate, setGetStartDate] = useState(new Date()); // Initialize with current date
  const [getEndDate, setGetEndDate] = useState(new Date()); // Initialize with current date
  return (
    <TempIDContext.Provider
      value={{
        tempID,
        setTempID,
        timeSheetFileData,
        setTimeSheetFileData,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchQuery,
        setSearchQuery,
        showListTimeSheet,
        setShowListTimeSheet,
        selectedLocation,
        setSelectedLocation,
        getStartDate,
        setGetStartDate,
        getEndDate,
        setGetEndDate,
        categoryFilter,
        setCategoryFilter
      }}
    >
      {children}
    </TempIDContext.Provider>
  );
};
