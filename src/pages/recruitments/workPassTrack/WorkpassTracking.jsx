import React, { useState, useContext, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons for the dropdown
import { LuFilter } from "react-icons/lu";
import { Table } from "../../../utils/Table"; // Import your existing Table component
import { WorkpassForm } from "./WorkpassForm";
import { useFetchInterview } from "../../../hooks/useFetchInterview";
import { SawpTable } from "./SawpTable";
import { DateFormat } from "../../../utils/DateFormat";
import { DataSupply } from "../../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";

export const WorkpassTracking = () => {
  const [data, setData] = useState([]); // Data fetched from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [isFormVisible, setIsFormVisible] = useState(false); // Control form visibility
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Store selected candidate for the form
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // To store filtered table data
  const filterBoxRef = useRef(null); // Ref to track clicks outside the filter box
  const [filterBoxTitle, setFilterBoxTitle] = useState("SAWP");
  const [selectedFilters, setSelectedFilters] = useState("SAWP");
  const [selectedCandidateType, setSelectedCandidateType] = useState([]);
  const [candidateTypeDropdownOpen, setCandidateTypeDropdownOpen] =
    useState(false);
  const [urlValue, setURLValue] = useState("");

  const { WPTrackings, empPDData, IVSSDetails } = useContext(DataSupply);
  const tableData = data || []; // Example: reuse the same data, but you can filter or change it as needed

  // console.log(mergedInterviewData);

  useEffect(() => {
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
    const mergedInterviewData = Object.values(empPDMap).map((candi) => {
      const WPTrack = WPTackingMap[candi.tempID] || {};
      const IVSS = IVSSMap[candi.tempID] || {};

      return {
        ...candi,
        interviewDetails: IVSS,
        WPTrackDetails: WPTrack,
      };
    });

    const flattenObject = mergedInterviewData.map((data) => {
      const result = { ...data };

      // Flatten `interviewDetails`
      if (result.interviewDetails) {
        Object.entries(result.interviewDetails).forEach(([key, value]) => {
          result[`interviewDetails_${key}`] = value;
        });
        delete result.interviewDetails; // Remove original nested object
      }

      // Flatten `localMobilization`
      if (result.WPTrackDetails) {
        Object.entries(result.WPTrackDetails).forEach(([key, value]) => {
          result[`WPTrackDetails_${key}`] = value;
        });
        delete result.WPTrackDetails;
      }

      return result;
    });
    if (flattenObject && flattenObject.length > 0) {
      // Filter candidates based on approvalStatus
      // console.log(flattenObject);
      const initialFiltered = flattenObject.filter(
        (val) => val?.interviewDetails_status?.toUpperCase() === "SAWP"
      );

      setFilteredData(initialFiltered);
      setData(initialFiltered);
    } else {
      setData([]); // Set to empty array if no candidates are approved
    }
  }, [WPTrackings, empPDData, IVSSDetails]);

  // console.log("Interview Data", flattenObject)

  const toggleFilterBox = (event) => {
    event?.stopPropagation();
    setIsFilterBoxOpen((prevState) => !prevState);
  };

  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsFormVisible(true);
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value; // Get the correct selected value

    setSelectedFilters(selectedValue); // Update the selected filter state
    setFilterBoxTitle(selectedValue); // Update the filter box title with the selected value

    if (!data) return; // Guard clause for null data

    let filtered = [];
    switch (selectedValue) {
      case "SAWP":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "SAWP"
        );
        break;

      case "DOE":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "DOE"
        );
        break;

      case "NLMS":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "NLMS"
        );
        break;

      case "Bank Guarantee":
        filtered = data.filter(
          (val) =>
            val?.interviewDetails_status?.toUpperCase() === "BANKGUARANTEE"
        );
        break;

      case "JITPA":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "JIPTA"
        );
        break;

      case "Labour Deposit":
        filtered = data.filter(
          (val) =>
            val?.interviewDetails_status?.toLowerCase() === "LABOURDEPOSIT"
        );
        break;
      case "Immigration":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toLowerCase() === "IMMIGRATION"
        );
        break;
      case "Air Ticket":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toLowerCase() === "AIRTICKET"
        );
        break;
      case "NonLocal Mobilization":
        filtered = data.filter(
          (val) => val?.interviewDetails_status?.toLowerCase() === "NONLOCALMOB"
        );
        break;
    }
    console.log(filtered);

    setFilteredData(filtered);

    // Close the filter box after selection
    setIsFilterBoxOpen(false);
  };

  const closeForm = () => setIsFormVisible(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(event.target)
      ) {
        setIsFilterBoxOpen(false); // Close the filter box when clicking outside
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

  // Function to handle selecting options in the "Candidate type" dropdown
  const handleCandidateTypeSelect = (option) => {
    let updatedOptions = [...selectedCandidateType];

    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((opt) => opt !== option);
    } else {
      updatedOptions.push(option);
    }

    setSelectedCandidateType(updatedOptions);

    // Filter data based on selected options
    if (updatedOptions.length === 0) {
      setFilteredData(data); // If no options selected, show all data
    } else {
      const filtered = data.filter((d) => {
        return updatedOptions.some((opt) => {
          if (opt === "SAWP") return d.contract === "SAWP";
          if (opt === "LPA") return d.contract === "LPA";
          if (opt === "OnShore") return d.type === "OnShore";
          if (opt === "OffShore") return d.type === "OffShore";
          return true;
        });
      });

      setFilteredData(filtered); // Update the filtered data
    }
  };
  const fileUpload = async (files) => {
    try {
      // Check if input is a string
      if (typeof files === "string") {
        let validJsonString = files
          .replace(/=/g, ":") // Replace `=` with `:`
          .replace(/([{,])(\s*[a-zA-Z0-9_]+)(?=\s*:)/g, '$1"$2"') // Wrap keys in quotes
          .replace(/:\s*([^",}\]]+)/g, ': "$1"') // Wrap unquoted values in quotes
          .replace(/"\s*[^"]+"\s*$/g, (match) => match.trim()) // Trim unnecessary spaces
          .replace(/(\w)(,|})/g, "$1$2"); // Ensure commas and closing brackets are in place

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
  return (
    <section className="screen-size min-h-screen mb-4 ">
      <div className="relative">
        {/* Candidate Type Dropdown */}
        <button
          className={`font-semibold py-2 px-6 mb-6 rounded-lg flex items-center ${
            selectedCandidateType.length > 0 ? "bg-[#faf362]" : "bg-[#8d8f9036]"
          } candidateTypeDropdown`}
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

        {candidateTypeDropdownOpen && (
          <div className="absolute bg-white border shadow-lg rounded-lg z-20 candidateTypeDropdown">
            {["SAWP", "LPA", "OnShore", "OffShore"].map((option) => (
              <label key={option} className="block w-full text-left px-4 py-2">
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

        <button
          onClick={toggleFilterBox}
          className={`absolute top-0 right-10 px-6 py-2 font-semibold rounded-lg flex items-center ${
            selectedFilters.length ? "bg-[#faf362]" : "bg-[#8d8f9036]"
          }`}
        >
          <LuFilter className="mr-5" />
          <span>{filterBoxTitle}</span>
        </button>

        {isFilterBoxOpen && (
          <div
            ref={filterBoxRef}
            className="absolute top-12 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col space-y-2"
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

            {/* Reset Button */}
            {/* <button 
              className="mt-4 px-1 py-2 border-2 border-yellow rounded-lg shadow-lg hover:bg-[#faf362]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFilters(''); // Clear the selected filter
                setFilteredData(data);  // Reset to the original unfiltered data
                setFilterBoxTitle('Check status'); // Reset filter box title
                setIsFilterBoxOpen(false); // Close the filter box
              }}
            >
              Reset
            </button>  */}
          </div>
        )}

        {loading && !error ? (
          filteredData.length > 0 ? (
            <SawpTable
              data={filteredData}
              formatDate={DateFormat}
              fileUpload={fileUpload}
              urlValue={urlValue}
            />
          ) : (
            // <Table
            //   columns={columns}
            //   data={filteredData}
            //   rowClickHandler={handleRowClick}
            //   showCheckboxes={false}
            //   selectedRows={selectedRows}
            //   currentPage="workpasstracking"
            //   selectedTable="workpasstracking"
            //   edited={handleRowClick}
            //   showEditIcon={true}
            // />
            <div className="text-center text-grey py-10">No data found</div>
          )
        ) : (
          <div>
            {loading
              ? "Loading..."
              : "Error fetching data. Check your Internet connection."}
          </div>
        )}

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
