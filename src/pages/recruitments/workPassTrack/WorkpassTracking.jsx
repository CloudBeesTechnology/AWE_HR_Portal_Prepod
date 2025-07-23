import React, { useState, useContext, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { WorkpassForm } from "./WorkpassForm";
import { SawpTable } from "./SawpTable";
import { DataSupply } from "../../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";
import { DoeTable } from "./DoeTable";
import { NlmsTable } from "./NlmsTable";
import { BankFormTable } from "./BankFormTable";
import { JitpaTable } from "./JitpaTable";
import { LabourDepTable } from "./LabourDepTable";
import { ImmigrationTable } from "./ImmigrationTable";
import { AirTKtTable } from "./AirTKtTable";
import { NonLocalMobTable } from "./NonLocalMobTable";
import { IoSearch } from "react-icons/io5";

export const WorkpassTracking = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const filterBoxRef = useRef(null);
  const [filterBoxTitle, setFilterBoxTitle] = useState("SAWP");
  const [selectedFilters, setSelectedFilters] = useState("SAWP");
  const [selectedCandidateType, setSelectedCandidateType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [candidateTypeDropdownOpen, setCandidateTypeDropdownOpen] =
    useState(false);
  const [urlValue, setURLValue] = useState("");
  const { WPTrackings, empPDData, IVSSDetails, educDetailsData, localMobiliz } =
    useContext(DataSupply);

  // Process and merge data
  useEffect(() => {
    // Create a map of education details for easy lookup
    const educDetailsMap = educDetailsData.reduce((acc, item) => {
      acc[item.tempID] = item;
      return acc;
    }, {});

    const empPDMap = empPDData.reduce((acc, item) => {
      acc[item.tempID] = item;
      return acc;
    }, {});

    const IVSSMap = IVSSDetails.reduce((acc, item) => {
      acc[item.tempID] = item;
      return acc;
    }, {});

    const WPTackingMap = WPTrackings.reduce((acc, item) => {
      acc[item.tempID] = item;
      return acc;
    }, {});

    const localMobilizMap = localMobiliz.reduce((acc, item) => {
      acc[item.tempID] = item;
      return acc;
    }, {});

    // Filter candidates where tempID is present in both empPDMap and IVSSMap
    const mergedInterviewData = Object.values(empPDMap)
      .filter((candi) => IVSSMap[candi.tempID])
      .map((candi) => {
        const IVSS = IVSSMap[candi.tempID] || {};
        const WPTrack = WPTackingMap[candi.tempID] || null;
        const educDetails = educDetailsMap[candi.tempID] || {};
        const localMobilizeDetails = localMobilizMap[candi.tempID] || {};

        return {
          ...candi,
          ...educDetails,
          ...localMobilizeDetails,
          interviewDetails: IVSS,
          WPTrackDetails: WPTrack,
        };
      });

    const flattenObject = mergedInterviewData.map((data) => {
      const result = { ...data };

      if (result.interviewDetails) {
        Object.entries(result.interviewDetails).forEach(([key, value]) => {
          result[`interviewDetails_${key}`] = value;
        });
        delete result.interviewDetails;
      }

      if (result.WPTrackDetails) {
        Object.entries(result.WPTrackDetails).forEach(([key, value]) => {
          result[`WPTrackDetails_${key}`] = value;
        });
        delete result.WPTrackDetails;
      }

      return result;
    });

    if (flattenObject && flattenObject.length > 0) {
      const initialFiltered = flattenObject.filter((val) => {
        return val?.interviewDetails_status === "SAWP";
      });

      setFilteredData(initialFiltered);
      setData(flattenObject);
    } else {
      setData([]);
    }
  }, [WPTrackings, empPDData, IVSSDetails, educDetailsData, localMobiliz]);

  // Apply filters whenever search term, selected filters, or candidate type changes
  useEffect(() => {
    if (!data || data.length === 0) return;

    let filtered = applyFiltersBasedOnStatus(selectedFilters, data);

    if (selectedCandidateType.length > 0) {
      filtered = filtered.filter((candidate) => {
        return selectedCandidateType.some((opt) => {
          if (opt === "SAWP") {
            return candidate.contractType === "SAWP";
          }
          if (opt === "LPA") {
            return (
              candidate.contractType === "LPA" &&
              (candidate.empType === "Onshore" || candidate.empType === "Offshore")
            );
          }
          if (opt === "OnShore") {
            return candidate.empType === "Onshore" && candidate.contractType !== "SAWP";
          }
          if (opt === "OffShore") {
            return candidate.empType === "Offshore" && candidate.contractType !== "SAWP";
          }
          return true;
        });
      });
    }

    setFilteredData(filtered);
     setIsFilterBoxOpen(false);
  }, [searchTerm, selectedFilters, selectedCandidateType, data]);

  const toggleFilterBox = (event) => {
    event?.stopPropagation();
    setIsFilterBoxOpen((prevState) => !prevState);
  };


  const filterBySearchTerm = (data) => {
    if (!searchTerm) return data;

    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      return (
        (item.tempID && item.tempID.toLowerCase().includes(term)) ||
        (item.firstName && item.firstName.toLowerCase().includes(term)) ||
        (item.lastName && item.lastName.toLowerCase().includes(term)) ||
        (item.email && item.email.toLowerCase().includes(term)) ||
        (item.phoneNumber && item.phoneNumber.includes(term))
      );
    });
  };

  const applyFiltersBasedOnStatus = (status, data) => {
    let filtered = data;

    // First apply status filter
    switch (status) {
      case "SAWP":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "SAWP"
        );
        break;
      case "DOE":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "DOE"
        );
        break;
      case "NLMS":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "NLMS"
        );
        break;
      case "Bank Guarantee":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status === "Bank Guarantee"
        );
        break;
      case "JITPA":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "JITPA"
        );
        break;
      case "Labour Deposit":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status === "Labour Deposit"
        );
        break;
      case "Immigration":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status?.toLowerCase() === "immigration"
        );
        break;
      case "Air Ticket":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status === "Air Ticket"
        );
        break;
      case "NonLocal Mobilization":
        filtered = filtered.filter(
          (val) => val?.interviewDetails_status === "NonLocal Mobilization"
        );
        break;
      default:
        break;
    }

    // Then apply search filter
    return filterBySearchTerm(filtered);
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilters(selectedValue);
    setFilterBoxTitle(selectedValue);
    setIsFilterBoxOpen(false);
  };

  const handleCandidateTypeSelect = (option) => {
    let updatedOptions = [...selectedCandidateType];

    if (option === "SAWP" && !updatedOptions.includes("SAWP")) {
      if (updatedOptions.includes("LPA")) {
        updatedOptions = updatedOptions.filter((opt) => opt !== "LPA");
      }
      updatedOptions.push("SAWP");
    } else if (option === "LPA" && !updatedOptions.includes("LPA")) {
      if (updatedOptions.includes("SAWP")) {
        updatedOptions = updatedOptions.filter((opt) => opt !== "SAWP");
      }
      updatedOptions.push("LPA");
    } else if (option === "OnShore" || option === "OffShore") {
      if (updatedOptions.includes("OnShore") && option === "OffShore") {
        updatedOptions = updatedOptions.filter((opt) => opt !== "OnShore");
      } else if (updatedOptions.includes("OffShore") && option === "OnShore") {
        updatedOptions = updatedOptions.filter((opt) => opt !== "OffShore");
      }
      if (!updatedOptions.includes(option)) {
        updatedOptions.push(option);
      }
    } else {
      if (updatedOptions.includes(option)) {
        updatedOptions = updatedOptions.filter((opt) => opt !== option);
      } else {
        updatedOptions.push(option);
      }
    }

    setSelectedCandidateType(updatedOptions);
  };

  const closeForm = () => setIsFormVisible(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(event.target)
      ) {
        setIsFilterBoxOpen(false);
      }
      if (!event.target.closest(".candidateTypeDropdown")) {
        setCandidateTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFormSave = (updatedFormData) => {
    const updatedData = data.map((candidate) =>
      candidate.tempid === selectedCandidate.tempid
        ? { ...candidate, ...updatedFormData }
        : candidate
    );
    setFilteredData(updatedData);
    setIsFormVisible(false);
  };

  const formatDate = (dateToString) => {
    if (!dateToString || isNaN(new Date(dateToString).getTime())) {
      return "";
    }

    const date = new Date(dateToString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const fileUpload = async (files) => {
    try {
      if (typeof files === "string") {
        let validJsonString = files
          .replace(/=/g, ":")
          .replace(/([{,])(\s*[a-zA-Z0-9_]+)(?=\s*:)/g, '$1"$2"')
          .replace(/:\s*([^",}\]]+)/g, ': "$1"')
          .replace(/"\s*[^"]+"\s*$/g, (match) => match.trim())
          .replace(/(\w)(,|})/g, "$1$2");

        const parsedArray = JSON.parse(validJsonString);

        const parsedFiles = parsedArray[parsedArray.length - 1].upload;
        const gettingUrl = await getUrl({
          path: parsedFiles,
        });

        return setURLValue(gettingUrl.url.toString());
      } else {
        console.error("Input must be a string.");
        return null;
      }
    } catch (error) {
      console.error("Error parsing files:", error.message);
      return null;
    }
  };

  const renderComponent = () => {
    switch (selectedFilters) {
      case "SAWP":
        return (
          <SawpTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "DOE":
        return (
          <DoeTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "NLMS":
        return (
          <NlmsTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "Bank Guarantee":
        return (
          <BankFormTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "JITPA":
        return (
          <JitpaTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "Labour Deposit":
        return (
          <LabourDepTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "Immigration":
        return (
          <ImmigrationTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "Air Ticket":
        return (
          <AirTKtTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "NonLocal Mobilization":
        return (
          <NonLocalMobTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      default:
        return (
          <SawpTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
          />
        );
    }
  };

  return (
    <section className="screen-size min-h-screen mb-4">
      <div className="py-4">
        {/* Top Control Bar */}
        <div className="flex justify-between items-start gap-4 flex-wrap">
          {/* LEFT SIDE: Dropdowns */}
          <div className="flex gap-4">
            {/* Candidate Type Dropdown */}
            <div className="relative">
              <button
                className={`font-semibold py-2 px-6 rounded-lg flex items-center ${
                  selectedCandidateType.length > 0
                    ? "bg-[#faf362]"
                    : "bg-[#8d8f9036]"
                }`}
                onClick={() =>
                  setCandidateTypeDropdownOpen(!candidateTypeDropdownOpen)
                }
              >
                {selectedCandidateType.length > 0
                  ? selectedCandidateType.join(" + ")
                  : "CANDIDATE TYPE"}
                {candidateTypeDropdownOpen ? (
                  <FaChevronUp className="ml-10" />
                ) : (
                  <FaChevronDown className="ml-10" />
                )}
              </button>

              {/* Candidate Type Dropdown Menu */}
              {candidateTypeDropdownOpen && (
                <div className="absolute mt-2 bg-white border shadow-lg rounded-lg z-20 w-48">
                  {["SAWP", "LPA", "OnShore", "OffShore"].map((option) => (
                    <label
                      key={option}
                      className="block w-full text-left px-4 py-2"
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedCandidateType.includes(option)}
                        onChange={() => handleCandidateTypeSelect(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Button + Dropdown */}
            <div className="relative">
              <button
                onClick={toggleFilterBox}
                className={`px-6 py-2 font-semibold rounded-lg flex items-center ${
                  selectedFilters.length ? "bg-[#faf362]" : "bg-[#8d8f9036]"
                }`}
              >
                <LuFilter className="mr-2" />
                <span>{filterBoxTitle}</span>
              </button>

              {/* Filter Box Dropdown */}
              {isFilterBoxOpen && (
                <div
                  ref={filterBoxRef}
                  className="absolute mt-2 w-60 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col space-y-2"
                >
                  {[
                    "SAWP",
                    "DOE",
                    "NLMS",
                    "Bank Guarantee",
                    "JITPA",
                    "Labour Deposit",
                    "Immigration",
                    "Air Ticket",
                    "NonLocal Mobilization",
                  ].map((workpasstracking) => (
                    <label
                      key={workpasstracking}
                      className={`flex items-center font-semibold space-x-2 hover:font-bold hover:text-[#c7bd03] p-2 rounded-md ${
                        selectedFilters === workpasstracking
                          ? "text-[#faf362]"
                          : "text-lite_grey"
                      }`}
                    >
                      <input
                        type="radio"
                        className="w-5 h-6"
                        name="workpasstracking"
                        value={workpasstracking}
                        checked={selectedFilters === workpasstracking}
                        onChange={handleFilterChange}
                      />
                      <span>{workpasstracking}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Search Input */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-sm">
              <div className="py-[9px] w-full text_size_5 bg-white border text-grey border-lite_grey rounded-lg flex items-center px-3 gap-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="text-dark_grey text-2xl cursor-pointer">
                  <IoSearch />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Component Display Area */}
        <div className="mt-6">{renderComponent()}</div>

        {/* Form Drawer */}
        {isFormVisible && selectedCandidate && (
          <WorkpassForm
            candidate={selectedCandidate}
            onClose={closeForm}
            onSave={handleFormSave}
          />
        )}
      </div>
    </section>
  );
};