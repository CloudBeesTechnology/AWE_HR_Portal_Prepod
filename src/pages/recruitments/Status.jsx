import React, { useState, useEffect, useRef, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { Table } from "../../utils/Table"; // Reusable table component
import { StatusForm } from "../recruitments/StatusForm";
import {
  // listCandidateApplicationForms,
  listInterviewSchedules,
  listLocalMobilizations,
} from "../../graphql/queries";

import { generateClient } from "@aws-amplify/api";
import { DataSupply } from "../../utils/DataStoredContext";
import { InterviewTable } from "./status/InterviewTable";
const client = generateClient();

// Column mappings for different statuses
const columnMapping = {
  "Interview Scheduled": [
    "TempID",
    "Name",
    "Nationality",
    "Interview Date",
    "Time",
    "Venue",
    "Interviewer",
  ],
  "Selected Candidate": [
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Selected Department",
  ],
  LOI: [
    "TempID",
    "Name",
    "Nationality",
    "Issue Date",
    "Accept Date",
    "LOI PDF",
    "Decline Date",
    "Decline Reason",
    "Status Update",
  ],
  CVEV_OffShore: [
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Approved Date",
    "CVEV PDF",
    "Status Update",
  ],
  PAAF_OnShore: [
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Approved Date",
    "PAAF PDF",
    "Status Update",
  ],
  Mobilization: [
    "TempID",
    "Name",
    "Nationality",
    "Position",
    "Signed Date",
    "Contract PDF",
    "Status Update",
  ],
};
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          interviewDatas, // Existing interview data fetch
          localMobilizationData, // New fetch for local mobilizations
        ] = await Promise.all([
          client.graphql({
            query: listInterviewSchedules, // Query for interviews
          }),
          client.graphql({
            query: listLocalMobilizations, // Query for local mobilizations
          }),
        ]);

        const interviews =
          interviewDatas?.data?.listInterviewSchedules?.items || [];
        const localMobilizations =
          localMobilizationData?.data?.listLocalMobilizations?.items || [];

        if (empPDData && educDetailsData && IVSSDetails) {
          // Filter empPDData to include only those whose tempID is also in IVSSDetails
          const filteredEmpPDData = empPDData.filter((emp) =>
            IVSSDetails.some((ivss) => ivss.tempID === emp.tempID)
          );

          // Merge the filtered empPDData with educDetailsData
          const merged = mergeContextData(filteredEmpPDData, educDetailsData);

          // Create a global mapping for interviews and mobilizations using tempID
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

          // Flatten the candidate data by adding interview and mobilization details globally
          const flattenedData = merged.map((candidate) => {
            const interview = interviewsMap[candidate.tempID] || {};
            const mobilization = mobilizationsMap[candidate.tempID] || {};

            return {
              ...candidate,
              // Retain the original names and pull the properties out
              interviewDetails: interview, // Keeping original name
              mobilizationDetails: mobilization, // Keeping original name
            };
          });

          // Update state with the flattened data
          setMergeData(flattenedData);
          setFilteredData(flattenedData);
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
    let filteredData = mergeData;
  
    // Filtering logic based on selected options
    if (selectedOptions.includes("LOCAL")) {
      filteredData = filteredData.filter((item) => item.contractType === "Local");
    }
  
    if (selectedOptions.includes("NON LOCAL")) {
      filteredData = filteredData.filter((item) => item.contractType === "Non Local");
    }
  
    if (selectedOptions.includes("ONSHORE")) {
      filteredData = filteredData.filter((item) => item.empType === "Onshore");
    }
  
    if (selectedOptions.includes("OFFSHORE")) {
      filteredData = filteredData.filter((item) => item.empType === "Offshore");
    }
  
    if (selectedOptions.includes("LPA")) {
      filteredData = filteredData.filter((item) => item.contractType  === "LPA");
    }
  
    if (selectedOptions.includes("SAWP")) {
      filteredData = filteredData.filter((item) => item.contractType  === "SAWP");
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

  // console.log(mergeData, "GFC");

  // Handle filter change
  const handleFilterChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedFilters(selectedValue);
    setFilterBoxTitle(selectedValue);

   
    switch (selectedValue) {
      case "Interview Scheduled":
        const pendingCandi = mergeData.filter(
          (val) =>
            val.interviewDetails.status === "pending" || "" && 
            val.interviewDetails.status !== "Selected" && 
            val.interviewDetails.mobSignDate === null || ""
        );

        setFilteredData(pendingCandi);
        console.log(pendingCandi, "pending")
        break;

      case "Selected Candidate":
        const selectedCandi = mergeData.filter(
          (val) =>
              val.interviewDetails.status === "Selected" &&
              val.loiAcceptDate === null || "" && 
              val.cvecApproveDate === null || "" && 
              val.paafApproveDate == null || "" &&
              val.mobSignDate === null
        );
        setFilteredData(selectedCandi);
        break;

      case "LOI":
        const loiAccept = mergeData.filter(
          (val) =>
              val.loiAcceptDate !== null && 
              val.cvecApproveDate === null || "" && 
              val.paafApproveDate !== null || "" 
        );
        setFilteredData(loiAccept);
        break;
      case "CVEV_OffShore":
        const cvevOff = mergeData.filter(
          (val) => 
            val.cvecApproveDate !== null && val.empType === "Offshore" &&
            val.paafApproveDate === null || "" &&
            val.mobSignDate === null || ""
        );
        setFilteredData(cvevOff);
        break;
      case "PAAF_OnShore":
        const paafOn = mergeData.filter(
          (val) => 
            val.paafApproveDate !== null && val.empType === "Onshore" &&
            val.mobSignDate === null || ""

        );
        setFilteredData(paafOn);
        break;
      case "Mobilization":
        const mobiliLocal = mergeData.filter(
          (val) => 
            val.contractType === "Local" &&
            val.mobSignDate !== null &&
            val.loiAcceptDate !== null && 
            val.cvecApproveDate !== null && 
            val.paafApproveDate !== null 
        );
        setFilteredData(mobiliLocal);
        break;
      default:
        setFilteredData(mergeData); // Show all data if no specific filter is applied
        break;
    }

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


  const flattenObject = (data) => {
    const result = { ...data };
  
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
  const flattenedData = filteredData.map(flattenObject);

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
        {selectedFilters === "Interview Scheduled" && <InterviewTable  data={flattenedData } />}
        
          {/* Table Component
          <Table
            columns={
              columnMapping[selectedFilters]
              // columnMapping["Interview Scheduled"]
            }
            data={filteredData}
            showCheckboxes={false}
            selectedRows={selectedRows}
            currentPage="status"
            selectedTable="status"
            edited={handleEditClick}
            showEditIcon={true}
          /> */}

          {/* Status Form for Editing */}
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

// import React, { useState, useEffect, useRef } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { LuFilter } from "react-icons/lu";
// import axios from "axios";
// import { Table } from "../../utils/Table"; // Reusable table component
// import { StatusForm } from "../recruitments/StatusForm";

// export const Status = () => {
//   const [data, setData] = useState([]); // Data will be fetched from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cvTypeDropdownOpen, setCvTypeDropdownOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [selectedInterviewCandidate, setSelectedInterviewCandidate] = useState(null);
//   const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState("Interview Scheduled");
//   const [filterBoxTitle, setFilterBoxTitle] = useState("Interview Scheduled");
//   const filterBoxRef = useRef(null);
//   const [selectedCandidates, setSelectedCandidates] = useState([]);

//   // Fetch data and filter candidates who have "Interview Scheduled" status
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://66e2301ac831c8811b575861.mockapi.io/api/v1/candidates/awe_InterviewData");
//         const allData = response.data.map((item) => ({
//           ...item,
//           status: "Interview Scheduled", // Assuming all candidates have this status
//         }));

//         // Initially show all candidates with "Interview Scheduled"
//         const interviewScheduledData = allData.filter((item) => item.status === "Interview Scheduled");

//         setData(allData);
//         setFilteredData(interviewScheduledData);
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching data.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchSelectedCandidates = async () => {
//       try {
//         const response = await axios.get('https://66f2884371c84d805875a370.mockapi.io/awe_selectedCandidate');
//         setSelectedCandidates(response.data); // Set the selected candidates to the state
//       } catch (error) {
//         console.error('Error fetching selected candidates:', error);
//       }
//     };

//     fetchSelectedCandidates();
//   }, []);

//   const toggleFilterBox = (event) => {
//     event?.stopPropagation();
//     setIsFilterBoxOpen((prevState) => !prevState);
//   };

//   const handleOptionSelect = (option) => {
//     let updatedOptions = [...selectedOptions];

//     // Update the selected options
//     if (updatedOptions.includes(option)) {
//       updatedOptions = updatedOptions.filter((opt) => opt !== option);
//     } else {
//       updatedOptions.push(option);
//     }

//     setSelectedOptions(updatedOptions);

//     // Filter data based on selected options
//     if (updatedOptions.length === 0) {
//       // If no options are selected, show all data
//       setFilteredData(data);
//     } else {
//       // Otherwise, filter based on selected options
//       const filtered = data.filter((d) => {
//         return updatedOptions.some((opt) => {
//           if (opt === "LOCAL") {
//             return d.nationality === "Brunei" || d.nationality === "Brunei PR";
//           }
//           if (opt === "NON LOCAL") {
//             return d.nationality !== "Brunei" && d.nationality !== "Brunei PR";
//           }
//           if (opt === "LPA") {
//             return d.contract === "LPA";
//           }
//           if (opt === "SAWP") {
//             return d.contract === "SAWP";
//           }
//           if (opt === "ONSHORE") {
//             return d.type === "OnShore";
//           }
//           if (opt === "OFFSHORE") {
//             return d.type === "OffShore";
//           }
//           return true;
//         });
//       });

//       setFilteredData(filtered);
//     }
//   };

//   const handleFilterChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedFilters(selectedValue);
//     setFilterBoxTitle(selectedValue);

//     if (selectedValue === "Selected Candidate") {
//       // Display selected candidates
//       setFilteredData(selectedCandidates);
//     } else {
//       // Otherwise filter from the main data
//       const newFilteredData = data.filter((item) => item.status === selectedValue);
//       setFilteredData(newFilteredData);
//     }
//     setIsFilterBoxOpen(false);
//   };

//   // const handleFilterChange = (event) => {
//   //   const selectedValue = event.target.value;
//   //   setSelectedFilters(selectedValue);
//   //   setFilterBoxTitle(selectedValue);

//   //   const newFilteredData = data.filter((item) => item.status === selectedValue);
//   //   setFilteredData(newFilteredData);
//   //   setIsFilterBoxOpen(false);
//   // };

//   const handleEditClick = (candidate) => {
//     setSelectedInterviewCandidate(candidate);
//     setIsFormVisible(true); // Show the status form when edit icon is clicked
//   };

//   const closeForm = () => setIsFormVisible(false);

//   const columns = selectedFilters === "Selected Candidate"
//   ? ["tempID", "Name", "Nationality", "Position", "Department", "Status Update"]
//   : ["tempID", "Name", "Nationality", "Position", "Date", "Time", "Venue", "Interviewer"];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
//         setIsFilterBoxOpen(false);
//       }
//       if (!event.target.closest(".cvTypeDropdown")) {
//         setCvTypeDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFormSave = (updatedCandidate) => {
//     // Update the main data array with the updated candidate information
//     const updatedData = data.map((candidate) =>
//       candidate.tempID === updatedCandidate.tempID
//         ? { ...candidate, ...updatedCandidate } // Replace the old candidate data with the updated data
//         : candidate
//     );

//     setData(updatedData); // Update the full data
//     setFilteredData((prevFilteredData) =>
//       prevFilteredData.map((candidate) =>
//         candidate.tempID === updatedCandidate.tempID
//           ? { ...candidate, ...updatedCandidate }
//           : candidate
//       )
//     ); // Ensure filtered data is updated as well

//     setIsFormVisible(false); // Close the form after saving
//   };

//   return (
//     <section className="screen-size min-h-screen mb-4">
//       <div className="relative">
//         {/* CV Type Dropdown */}
//         <button
//           className={`font-semibold py-2 px-6 mb-6 rounded-lg flex items-center ${
//             selectedOptions.length > 0 ? "bg-[#faf362]" : "bg-[#8d8f9036]"
//           } cvTypeDropdown`}
//           onClick={() => setCvTypeDropdownOpen(!cvTypeDropdownOpen)}
//         >
//           {selectedOptions.length > 0
//             ? selectedOptions.join(" + ")
//             : "CV TYPE"}
//           {cvTypeDropdownOpen ? (
//             <FaChevronUp className="ml-10" />
//           ) : (
//             <FaChevronDown className="ml-10" />
//           )}
//         </button>

//         {cvTypeDropdownOpen && (
//           <div className="absolute bg-white border shadow-lg rounded-lg z-20 cvTypeDropdown">
//             {["LOCAL", "NON LOCAL", "LPA", "SAWP", "ONSHORE", "OFFSHORE"].map(
//               (option) => (
//                 <label key={option} className="block w-full text-left px-4 py-2">
//                   <input
//                     type="checkbox"
//                     className="mr-2"
//                     checked={selectedOptions.includes(option)}
//                     onChange={() => handleOptionSelect(option)}
//                   />
//                   {option}
//                 </label>
//               )
//             )}
//           </div>
//         )}

//         {/* Filter Button */}
//         <button
//           onClick={toggleFilterBox}
//           className={`absolute top-0 right-0 px-6 py-2 font-semibold rounded-lg flex items-center ${
//             selectedFilters.length ? "bg-[#faf362]" : "bg-[#8d8f9036]"
//           }`}
//         >
//           <LuFilter className="mr-5" />
//           <span>{filterBoxTitle}</span>
//         </button>

//         {isFilterBoxOpen && (
//           <div
//             ref={filterBoxRef}
//             className="absolute top-12 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col space-y-2"
//           >
//             {[
//               "Interview Scheduled",
//               "Selected Candidate",
//               "LOI Accepted",
//               "CVEV_OffShore",
//               "PAAF_OnShore",
//               "Mobilization",
//             ].map((status) => (
//               <label
//                 key={status}
//                 className={`flex items-center font-semibold  space-x-2 hover:font-bold hover:text-[#c7bd03] p-2 rounded-md ${
//                   selectedFilters === status ? 'text-[#faf362]' : 'text-lite_grey'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   className="w-5 h-6"
//                   name="status"
//                   value={status}
//                   checked={selectedFilters === status}
//                   onChange={(e) => handleFilterChange(e)}
//                 />
//                 <span>{status}</span>
//               </label>
//             ))}

//             {/* Reset Button */}
//             <button
//               className="mt-4 px-1 py-2 border-2 border-yellow rounded-lg shadow-lg hover:bg-[#faf362]"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedFilters("Interview Scheduled");
//                 setFilteredData(data.filter((item) => item.status === "Interview Scheduled"));
//                 setFilterBoxTitle("Interview Scheduled");
//                 setIsFilterBoxOpen(false);
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Table rendering */}
//       {!loading && !error ? (
//         filteredData.length > 0 ? (
//           <Table
//             columns={columns}
//             data={filteredData}
//             showCheckboxes={false}
//             selectedRows={selectedRows}
//             currentPage="status"
//             selectedTable="status"
//             edited={handleEditClick} // Edit click shows StatusForm
//             showEditIcon={true}
//           />
//         ) : (
//           <div className="text-center text-grey py-10">No data found</div>
//         )
//       ) : (
//         <div>{loading ? "Loading..." : error}</div>
//       )}

//       {/* StatusForm */}
//       {isFormVisible && selectedInterviewCandidate && (
//         <StatusForm
//           candidate={selectedInterviewCandidate}
//           onClose={closeForm}
//           onSave={handleFormSave}
//         />
//       )}

//     </section>
//   );
// };
