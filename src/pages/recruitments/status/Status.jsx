import React, { useState, useEffect, useRef, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { StatusForm } from "./StatusForm";
import {
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
import { IoSearch } from "react-icons/io5";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cvTypeDropdownOpen, setCvTypeDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedInterviewCandidate, setSelectedInterviewCandidate] =
    useState(null);
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("Interview Scheduled");
  const [filterBoxTitle, setFilterBoxTitle] = useState("Interview Scheduled");
  const filterBoxRef = useRef(null);
  const [mergeData, setMergeData] = useState([]);
  const [urlValue, setURLValue] = useState("");
  const [dropOption, setDropOption] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { empPDData, educDetailsData, IVSSDetails } = useContext(DataSupply);

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

    if (result.interviewDetails) {
      Object.entries(result.interviewDetails).forEach(([key, value]) => {
        result[`interviewDetails_${key}`] = value;
      });
      delete result.interviewDetails;
    }

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
        const fetchInterviewData = async () => {
          let allInterviewSchedules = [];
          let nextToken = null;
          do {
            const response = await client.graphql({
              query: listInterviewSchedules,
              variables: { nextToken },
            });
            const interviews =
              response?.data?.listInterviewSchedules?.items || [];
            allInterviewSchedules = [...allInterviewSchedules, ...interviews];
            nextToken = response?.data?.listInterviewSchedules?.nextToken;
          } while (nextToken);
          return allInterviewSchedules;
        };

        const fetchLocalMobilizationData = async () => {
          let allLocalMobilizations = [];
          let nextToken = null;
          do {
            const response = await client.graphql({
              query: listLocalMobilizations,
              variables: { nextToken },
            });
            const mobilizations =
              response?.data?.listLocalMobilizations?.items || [];
            allLocalMobilizations = [
              ...allLocalMobilizations,
              ...mobilizations,
            ];
            nextToken = response?.data?.listLocalMobilizations?.nextToken;
          } while (nextToken);
          return allLocalMobilizations;
        };

        // Fetch interview and mobilization data in parallel
        const [interviewDatas, localMobilizationData] = await Promise.all([
          fetchInterviewData(),
          fetchLocalMobilizationData(),
        ]);

        const interviews = interviewDatas || [];
        const localMobilizations = localMobilizationData || [];

        if (empPDData && educDetailsData && IVSSDetails) {
          // Filter data based on IVSSDetails
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

          // Merge and flatten the data
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
  }, [cvTypeDropdownOpen, isFilterBoxOpen]);

  // Toggle Filter Box
  const toggleFilterBox = (event) => {
    event?.stopPropagation();
    setIsFilterBoxOpen((prevState) => !prevState);
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;

    setSelectedFilters(selectedValue);
    setFilterBoxTitle(selectedValue);
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

  useEffect(() => {
    if (!mergeData) {
      setFilteredData([]);
      return;
    }

    let result = [...mergeData];
    result = filterBySearchTerm(result);

    // Apply status filter if selected
    if (selectedFilters) {
      result = result.filter((val) => {
        switch (selectedFilters) {
          case "Interview Scheduled":
            return (
              val?.interviewDetails_status?.toLowerCase() ===
              "interviewscheduled"
            );
          case "Selected Candidate":
            return val?.interviewDetails_status === "Selected";
          case "LOI":
            return val?.interviewDetails_status?.toUpperCase() === "LOI";
          case "CVEV_OffShore":
            return (
              val?.interviewDetails_status?.toUpperCase() === "CVEV" &&
              val?.empType === "Offshore"
            );
          case "PAAF_OnShore":
            return (
              val?.interviewDetails_status?.toUpperCase() === "PAAF"
              // val?.empType === "Onshore"
            );
          case "Mobilization":
            return (
              val?.contractType === "Local" &&
              val?.interviewDetails_status?.toLowerCase() === "mobilization"
            );
          default:
            return val?.interviewDetails_status?.toLowerCase() === "pending";
        }
      });
    }

    // Apply additional filters if any
    if (selectedOptions.length > 0) {
      result = result.filter((item) => {
        return selectedOptions.every((option) => {
          switch (option) {
            case "LOCAL":
              return item.contractType === "Local";
            case "NON LOCAL":
              return item.contractType === "Non Local";
            case "ONSHORE":
              return item.empType === "Onshore";
            case "OFFSHORE":
              return item.empType === "Offshore";
            case "LPA":
              return item.contractType === "LPA";
            case "SAWP":
              return item.contractType === "SAWP";
            default:
              return true;
          }
        });
      });
    }

    setFilteredData(result);
  }, [selectedFilters, selectedOptions, mergeData, searchTerm]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        const newSelectedOptions = prevSelectedOptions.filter(
          (opt) => opt !== option
        );

        return newSelectedOptions;
      } else {
        if (option === "LOCAL") {
          const newSelectedOptions = [
            "LOCAL",
            ...prevSelectedOptions.filter(
              (opt) => opt !== "NON LOCAL" && opt !== "LPA" && opt !== "SAWP"
            ),
          ];

          return newSelectedOptions;
        }

        if (option === "NON LOCAL") {
          const newSelectedOptions = [
            "NON LOCAL",
            ...prevSelectedOptions.filter((opt) => opt !== "LOCAL"),
          ];

          return newSelectedOptions;
        }

        if (option === "ONSHORE" || option === "OFFSHORE") {
          const newSelectedOptions = [
            option,
            ...prevSelectedOptions.filter(
              (opt) => opt !== "ONSHORE" && opt !== "OFFSHORE"
            ),
          ];

          return newSelectedOptions;
        }

        if (option === "LPA" || option === "SAWP") {
          const newSelectedOptions = [
            option,
            ...prevSelectedOptions.filter(
              (opt) => opt !== "LPA" && opt !== "SAWP"
            ),
          ];

          return newSelectedOptions;
        }

        // If none of the special rules apply, just add the option
        const newSelectedOptions = [...prevSelectedOptions, option];

        return newSelectedOptions;
      }
    });
  };

  const isOptionDisabled = (option) => {
    if (selectedOptions.includes("LOCAL")) {
      // Disable NON LOCAL, LPA, SAWP if LOCAL is selected
      if (option === "NON LOCAL" || option === "LPA" || option === "SAWP") {
        return true;
      }
    }

    if (selectedOptions.includes("NON LOCAL")) {
      // Disable LOCAL if NON LOCAL is selected
      if (option === "LOCAL") {
        return true;
      }
    }

    return false;
  };

  const handleEditClick = (candidate) => {
    setSelectedInterviewCandidate(candidate);
    setIsFormVisible(true);
  };

  // Close form
  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedInterviewCandidate(null);
  };

  const handleFormSave = (updatedCandidate) => {
    // Function to update the candidate in both mergeData and filteredData
    const updateCandidates = (candidates) =>
      candidates.map((candidate) =>
        candidate.tempID === updatedCandidate.tempID
          ? { ...candidate, ...updatedCandidate }
          : candidate
      );

    setMergeData((prevMergeData) => updateCandidates(prevMergeData));
    setFilteredData((prevFilteredData) => updateCandidates(prevFilteredData));

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
      // Check if input is a string
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
      <div className="flex justify-between items-start flex-wrap gap-4 py-4">
        {/* LEFT SIDE: CV Type Dropdown + Filter Button */}
        <div className="flex gap-4 items-start">
          {/* CV Type Dropdown */}
          <div className="relative">
            <button
              className={`font-semibold py-2 px-6 rounded-lg flex items-center ${
                selectedOptions.length > 0 ? "bg-[#faf362]" : "bg-[#8d8f9036]"
              }`}
              onClick={() => setCvTypeDropdownOpen(!cvTypeDropdownOpen)}
            >
              {selectedOptions.length > 0
                ? selectedOptions.join(" + ")
                : "CV TYPE"}
              {cvTypeDropdownOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>

            {cvTypeDropdownOpen && (
              <div className="absolute bg-white border shadow-lg rounded-lg z-20 mt-2">
                {[
                  "LOCAL",
                  "NON LOCAL",
                  "LPA",
                  "SAWP",
                  "ONSHORE",
                  "OFFSHORE",
                ].map((option) => (
                  <label
                    key={option}
                    className="block w-full text-left px-4 py-2"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionSelect(option)}
                      disabled={isOptionDisabled(option)}
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

            {isFilterBoxOpen && (
              <div
                ref={filterBoxRef}
                className="absolute z-50 bg-white shadow-lg rounded-lg p-4 mt-2 w-48"
              >
                {filterOptions.map((status) => (
                  <label
                    key={status}
                    className={`flex items-center font-semibold space-x-2 hover:font-bold hover:text-[#c7bd03] p-2 rounded-md ${
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

      {/* Results Section */}
      {loading ? (
        <p className="mt-24 flex items-center justify-center">Loading...</p>
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
