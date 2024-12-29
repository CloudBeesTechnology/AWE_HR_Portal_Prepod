import React, { useState, useEffect, useRef, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { StatusForm } from "./StatusForm";
import {
  // listCandidateApplicationForms,
  listInterviewSchedules,
  listLocalMobilizations,
} from "../../../graphql/queries";

import { generateClient } from "@aws-amplify/api";
import { DataSupply } from "../../../utils/DataStoredContext";
import { InterviewTable } from "./InterviewTable";
import { SelectedCandi } from "./SelectedCandi";
import { LOIRecru } from "./LOIRecru";
import { CVEVRecru } from "./CVEVRecru";
import { PAAFRecru } from "./PAAFRecru";
import { MobilizationRecru } from "./MobilizationRecru";
import { getUrl } from "@aws-amplify/storage";
const client = generateClient();

const filterOptions = [
  "Interview Scheduled",
  "Selected Candidate",
  "LOI",
  "CVEV_OffShore",
  "PAAF_OnShore",
  "Mobilization",
];

export const Status = () => {
  const [data, setData] = useState(null); // Data fetched from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cvTypeDropdownOpen, setCvTypeDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedInterviewCandidate, setSelectedInterviewCandidate] =
    useState(null);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("Interview Scheduled");
  const [filterBoxTitle, setFilterBoxTitle] = useState("Interview Scheduled");
  const filterBoxRef = useRef(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [mergeData, setMergeData] = useState([]);
  const [urlValue, setURLValue] = useState("");
  const [dropOption, setDropOption] = useState();
  const { empPDData, educDetailsData, IVSSDetails } = useContext(DataSupply);
  // console.log(empPDData);
  // console.log(educDetailsData);

  // Merge function for context data
  const mergeContextData = (empPDData, educDetailsData) => {
    return empPDData.map((piData) => {
      const edData =
        educDetailsData.find((item) => item.tempID === piData.tempID) || {};

      return {
        ...piData,
        ...edData,
      };
    });
  };

  const flattenObject = (data) => {
    const result = { ...data };
    console.log(data);

    // Flatten `interviewDetails`
    if (result.interviewDetails) {
      Object.entries(result.interviewDetails).forEach(([key, value]) => {
        result[`interviewDetails_${key}`] = value;
      });
      delete result.interviewDetails; // Remove original nested object
    }

    // Flatten `mobilizationDetails`
    if (result.mobilizationDetails) {
      Object.entries(result.mobilizationDetails).forEach(([key, value]) => {
        result[`mobilizationDetails_${key}`] = value;
      });
      delete result.mobilizationDetails;
    }

    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interviewDatas, localMobilizationData] = await Promise.all([
          client.graphql({
            query: listInterviewSchedules,
            variables: { limit: 20000 },
          }),
          client.graphql({
            query: listLocalMobilizations,
            variables: { limit: 20000 },
          }),
        ]);

        const interviews =
          interviewDatas?.data?.listInterviewSchedules?.items || [];
        const localMobilizations =
          localMobilizationData?.data?.listLocalMobilizations?.items || [];

        if (empPDData && educDetailsData && IVSSDetails) {
          const filteredEmpPDData = empPDData.filter((emp) =>
            IVSSDetails.some((ivss) => ivss.tempID === emp.tempID)
          );

          const merged = mergeContextData(filteredEmpPDData, educDetailsData);

          const interviewsMap = interviews.reduce((acc, interview) => {
            acc[interview.tempID] = interview;
            return acc;
          }, {});

          const mobilizationsMap = localMobilizations.reduce(
            (acc, mobilization) => {
              acc[mobilization.tempID] = mobilization;
              return acc;
            },
            {}
          );

          const flattenedData = merged.map((candidate) => {
            const interview = interviewsMap[candidate.tempID] || {};
            const mobilization = mobilizationsMap[candidate.tempID] || {};

            return {
              ...candidate,
              interviewDetails: interview,
              mobilizationDetails: mobilization,
            };
          });
          const flattingData = flattenedData.map(flattenObject);
          setMergeData(flattingData);

          const initialFiltered = flattingData.filter(
            (val) =>
              val?.interviewDetails_status?.toLowerCase() ===
              "interviewscheduled"
          );

          setFilteredData(initialFiltered);
          setDropOption(initialFiltered);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [empPDData, educDetailsData, IVSSDetails]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      // Handle toggling of options
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((opt) => opt !== option);
      } else {
        // Logic for disabling conflicting options
        if (option === "LOCAL") {
          // When LOCAL is selected, remove "NON LOCAL", "LPA", "SAWP" from the list
          return [
            "LOCAL",
            ...prevSelectedOptions.filter(
              (opt) => opt !== "NON LOCAL" && opt !== "LPA" && opt !== "SAWP"
            ),
          ];
        }
        if (option === "NON LOCAL") {
          // When NON LOCAL is selected, remove "LOCAL"
          return [
            "NON LOCAL",
            ...prevSelectedOptions.filter((opt) => opt !== "LOCAL"),
          ];
        }
        if (option === "ONSHORE" || option === "OFFSHORE") {
          // Ensure only one of ONSHORE or OFFSHORE is selected
          return [
            option,
            ...prevSelectedOptions.filter(
              (opt) => opt !== "ONSHORE" && opt !== "OFFSHORE"
            ),
          ];
        }
        if (option === "LPA" || option === "SAWP") {
          // Ensure only one of LPA or SAWP is selected
          return [
            option,
            ...prevSelectedOptions.filter(
              (opt) => opt !== "LPA" && opt !== "SAWP"
            ),
          ];
        }

        // If none of the special rules apply, just add the option
        return [...prevSelectedOptions, option];
      }
    });

    // Now filter mergeData based on the selected options
    filterMergeDataBasedOnOptions();
  };

  const filterMergeDataBasedOnOptions = () => {
    let filteredData = dropOption;

    // Filtering logic based on selected options
    if (selectedOptions.includes("LOCAL")) {
      filteredData = filteredData.filter(
        (item) => item.contractType === "Local"
      );
    }

    if (selectedOptions.includes("NON LOCAL")) {
      filteredData = filteredData.filter(
        (item) => item.contractType === "Non Local"
      );
    }

    if (selectedOptions.includes("ONSHORE")) {
      filteredData = filteredData.filter((item) => item.empType === "Onshore");
    }

    if (selectedOptions.includes("OFFSHORE")) {
      filteredData = filteredData.filter((item) => item.empType === "Offshore");
    }

    if (selectedOptions.includes("LPA")) {
      filteredData = filteredData.filter((item) => item.contractType === "LPA");
    }

    if (selectedOptions.includes("SAWP")) {
      filteredData = filteredData.filter(
        (item) => item.contractType === "SAWP"
      );
    }

    // After applying all the filters, set the filtered data
    setFilteredData(filteredData);
  };

  const isOptionDisabled = (option) => {
    if (selectedOptions.includes("LOCAL")) {
      // Disable NON LOCAL, LPA, SAWP if LOCAL is selected
      return option === "NON LOCAL" || option === "LPA" || option === "SAWP";
    }
    if (selectedOptions.includes("NON LOCAL")) {
      // Disable LOCAL if NON LOCAL is selected
      return option === "LOCAL";
    }
    return false; // Default: no option is disabled
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close CV type dropdown if clicked outside
      if (!event.target.closest(".cvTypeDropdown") && cvTypeDropdownOpen) {
        setCvTypeDropdownOpen(false);
      }

      // Close filter box if clicked outside
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(event.target) &&
        isFilterBoxOpen
      ) {
        setIsFilterBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cvTypeDropdownOpen, isFilterBoxOpen]); // Added dependencies

  // Toggle Filter Box
  const toggleFilterBox = (event) => {
    event?.stopPropagation();
    setIsFilterBoxOpen((prevState) => !prevState);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilters(selectedValue);
    setFilterBoxTitle(selectedValue);

    if (!mergeData) return; // Guard clause for null mergeData

    let filtered = [];
    switch (selectedValue) {
      case "Interview Scheduled":
        filtered = mergeData.filter(
          (val) =>
            val?.interviewDetails_status?.toLowerCase() === "interviewscheduled"
        );
        break;

      case "Selected Candidate":
        filtered = mergeData.filter(
          (val) => val?.interviewDetails_status === "Selected"
        );
        break;

      case "LOI":
        filtered = mergeData.filter(
          (val) => val?.interviewDetails_status?.toUpperCase() === "LOI"
        );
        break;

      case "CVEV_OffShore":
        filtered = mergeData.filter(
          (val) =>
            val?.interviewDetails_status?.toUpperCase() === "CVEV" &&
            val?.empType === "Offshore"
        );
        break;

      case "PAAF_OnShore":
        filtered = mergeData.filter(
          (val) =>
            val?.interviewDetails_status?.toUpperCase() === "PAAF" &&
            val?.empType === "Onshore"
        );
        break;

      case "Mobilization":
        filtered = mergeData.filter(
          (val) =>
            val?.contractType === "Local" &&
            val?.interviewDetails_status?.toLowerCase() === "mobilization"
        );
        break;

      default:
        filtered = mergeData.filter(
          (val) => val?.interviewDetails_status?.toLowerCase() === "pending"
        );
        break;
    }

    setFilteredData(filtered);
    setIsFilterBoxOpen(false);
  };

  // console.log("Hello World", mergeData);
  // Handle edit click
  const handleEditClick = (candidate) => {
    setSelectedInterviewCandidate(candidate);
    setIsFormVisible(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedInterviewCandidate(null); // Clear the selected candidate
  };

  const handleFormSave = (updatedCandidate) => {
    // Function to update the candidate in both mergeData and filteredData
    const updateCandidates = (candidates) =>
      candidates.map((candidate) =>
        candidate.tempID === updatedCandidate.tempID
          ? { ...candidate, ...updatedCandidate } // Replace the old candidate data with the updated data
          : candidate
      );

    setMergeData((prevMergeData) => updateCandidates(prevMergeData)); // Update mergeData
    setFilteredData((prevFilteredData) => updateCandidates(prevFilteredData)); // Update filteredData

    setIsFormVisible(false); // Close the form after saving
  };

  // const flattenedData = filteredData.map(flattenObject);
  // console.log("Flattened Data:", flattenedData);
  // console.log("Selected Filters:", selectedFilters);

  const formatDate = (dateToString) => {
    if (!dateToString || isNaN(new Date(dateToString).getTime())) {
      return "";
    }

    const date = new Date(dateToString);

    const day = date.getDate().toString().padStart(2, "0"); // Local day
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Local month
    const year = date.getFullYear(); // Local year

    return `${day}-${month}-${year}`; // Format as DD/MM/YYYY
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

  const renderComponent = () => {
    switch (selectedFilters) {
      case "Interview Scheduled":
        return (
          <InterviewTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "Selected Candidate":
        return (
          <SelectedCandi
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "LOI":
        return (
          <LOIRecru
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "CVEV_OffShore":
        return (
          <CVEVRecru
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "PAAF_OnShore":
        return (
          <PAAFRecru
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      case "Mobilization":
        return (
          <MobilizationRecru
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
            urlValue={urlValue}
          />
        );
      default:
        return (
          <InterviewTable
            data={filteredData}
            formatDate={formatDate}
            fileUpload={fileUpload}
          />
        );
    }
  };

  return (
    <section className="screen-size min-h-screen mb-4">
      <div className="relative">
        {/* CV Type Dropdown */}
        <button
          className={`font-semibold py-2 px-6 mb-6 rounded-lg flex items-center ${
            selectedOptions.length > 0 ? "bg-[#faf362]" : "bg-[#8d8f9036]"
          } cvTypeDropdown`}
          onClick={() => setCvTypeDropdownOpen(!cvTypeDropdownOpen)}
        >
          {selectedOptions.length > 0 ? selectedOptions.join(" + ") : "CV TYPE"}
          {cvTypeDropdownOpen ? (
            <FaChevronUp className="ml-10" />
          ) : (
            <FaChevronDown className="ml-10" />
          )}
        </button>

        {cvTypeDropdownOpen && (
          <div className="absolute bg-white border shadow-lg rounded-lg z-20 cvTypeDropdown">
            {["LOCAL", "NON LOCAL", "LPA", "SAWP", "ONSHORE", "OFFSHORE"].map(
              (option) => (
                <label
                  key={option}
                  className="block w-full text-left px-4 py-2"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionSelect(option)}
                    disabled={isOptionDisabled(option)} // Disable based on the logic
                  />
                  {option}
                </label>
              )
            )}
          </div>
        )}

        {/* Filter Button */}
        <button
          onClick={toggleFilterBox}
          className={`absolute top-0 right-0 px-6 py-2 font-semibold rounded-lg flex items-center ${
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
            {filterOptions.map((status) => (
              <label
                key={status}
                className={`flex items-center font-semibold  space-x-2 hover:font-bold hover:text-[#c7bd03] p-2 rounded-md ${
                  selectedFilters === status
                    ? "text-[#faf362]"
                    : "text-lite_grey"
                }`}
              >
                <input
                  type="radio"
                  className="w-5 h-6"
                  name="status"
                  value={status}
                  checked={selectedFilters === status}
                  onChange={handleFilterChange}
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {renderComponent()}

          {isFormVisible && (
            <StatusForm
              candidate={selectedInterviewCandidate}
              onSave={handleFormSave}
              onClose={closeForm}
            />
          )}
        </>
      )}
    </section>
  );
};
