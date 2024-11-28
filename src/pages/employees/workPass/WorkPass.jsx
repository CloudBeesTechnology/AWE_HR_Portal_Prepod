import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { DataSupply } from "../../../utils/DataStoredContext";

export const WorkPass = () => {
  const { empPIData,SawpDetails,DNData,BJLData,PPValidsData } = useContext(DataSupply);

  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [activeNavTab, setActiveNavTab] = useState("sawp");
  const [searchResultData,setSearchResultData]=useState([]);
  const [empID, setEmpID] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setEmpID(userID);

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const SpDetails = SawpDetails.find(
              (user) => user.empID === emp.empID
            );
            const bjlDetails = SawpDetails.find(
              (user) => user.empID === emp.empID
            );
            const ppVDetails = SawpDetails.find(
              (user) => user.empID === emp.empID
            );
            const dndDetails = SawpDetails.find(
              (user) => user.empID === emp.empID
            );
            

            if (!SpDetails) return null;
            if (!dndDetails) return null;
            if (!ppVDetails) return null;
            if (!bjlDetails) return null;
           

            return {
              ...emp,
              ...SpDetails,
              ...dndDetails,
              ...ppVDetails,
              ...bjlDetails,
            };
          })
          .filter(Boolean);
   

        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, SawpDetails, DNData, BJLData, PPValidsData]);



  const handleNext = () => {
    switch (activeNavTab) {
      case "sawp":
        navigate("/sawp");
        setActiveNavTab("doe");
        break;
      case "doe":
        navigate("/sawp/doe");
        setActiveNavTab("nlms");
        break;
      case "nlms":
        navigate("/sawp/nlms");
        setActiveNavTab("bankGuarantee");
        break;
      case "bankGuarantee":
        navigate("/sawp/bankGuarantee");
        setActiveNavTab("jitpa");
        break;
      case "jitpa":
        navigate("/sawp/jitpa");
        setActiveNavTab("labourDeposit");
        break;
      case "labourDeposit":
        navigate("/sawp/labourDeposit");
        setActiveNavTab("immigration");
        break;
      case "immigration":
        navigate("/sawp/immigration");
        setActiveNavTab("immigration");
        break;
      default:
        break;
    }
  };

  const handleTabClick = (tab, route) => {
    setActiveNavTab(tab);
    navigate(route);
  };

  // Update activeNavTab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/doe")) {
      setActiveNavTab("doe");
    } else if (path.includes("/nlms")) {
      setActiveNavTab("nlms");
    } else if (path.includes("/bankGuarantee")) {
      setActiveNavTab("bankGuarantee");
    } else if (path.includes("/jitpa")) {
      setActiveNavTab("jitpa");
    } else if (path.includes("/labourDeposit")) {
      setActiveNavTab("labourDeposit");
    } else if (path.includes("/immigration")) {
      setActiveNavTab("immigration");
    } else {
      setActiveNavTab("sawp");
    }
  }, [location]);


  const searchResult = (result) => {

    setSearchResultData(result)
  };


  return (
    <section className="w-full min-h-screen bg-[#F5F6F1]">
      <div className="relative mx-auto p-10 h-full">
        <div className="w-full flex items-center justify-between gap-5">
          <Link to="/employee" className="text-xl flex-1 text-grey">
            <FaArrowLeft />
          </Link>
          <p className="flex-1 text-center mt-2 text_size_2 uppercase">
            Employee Work Pass
          </p>
          <div className="flex-1">
  {location.pathname === "/sawp" ? (
    <SearchDisplay
      searchResult={searchResult}
      newFormData={allEmpDetails}
      searchIcon2={<IoSearch />}
      placeholder="Employee Id"
      rounded="rounded-lg"
      empID={empID}
    />
  ) : location.pathname === "/sawp/doe" ? (
    <SearchDisplay
    searchResult={searchResult}
    newFormData={DNData}
    searchIcon2={<IoSearch />}
    placeholder="Employee Id"
    rounded="rounded-lg"
    empID={empID}
  />
  ) : location.pathname === "/sawp/nlms" ? (
    <SearchDisplay
      searchResult={searchResult}
      newFormData={DNData}
      searchIcon2={<IoSearch />}
      placeholder="Employee Id"
      rounded="rounded-lg"
      empID={empID}
    />
  ) : location.pathname === "/sawp/bankGuarantee" ? (
    <SearchDisplay
      searchResult={searchResult}
      newFormData={BJLData}
      searchIcon2={<IoSearch />}
      placeholder="Employee Id"
      rounded="rounded-lg"
      empID={empID}
    />
  ) :  location.pathname === "/sawp/jitpa" ? (
    <SearchDisplay
      searchResult={searchResult}
      newFormData={BJLData}
      searchIcon2={<IoSearch />}
      placeholder="Employee Id"
      rounded="rounded-lg"
      empID={empID}
    />
  ) :  location.pathname === "/sawp/labourDeposit" ? (
    <SearchDisplay
      searchResult={searchResult}
      newFormData={BJLData}
      searchIcon2={<IoSearch />}
      placeholder="Employee Id"
      rounded="rounded-lg"
      empID={empID}
    />
  ) :  location.pathname === "/sawp/immigration" ? (
    <SearchDisplay
      searchResult={searchResult}
      newFormData={PPValidsData}
      searchIcon2={<IoSearch />}
      placeholder="Employee Id"
      rounded="rounded-lg"
      empID={empID}
    />
  ) :null}
</div>

        </div>

        {/* Tab Navigation */}
        <div className="flex justify-between border-b m-4 text-[16px] font-semibold">
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "sawp" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("sawp", "/sawp")}
          >
            SAWP
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "doe" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("doe", "/sawp/doe")}
          >
            DOE
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "nlms" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("nlms", "/sawp/nlms")}
          >
            NLMS
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "bankGuarantee"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick("bankGuarantee", "/sawp/bankGuarantee")
            }
          >
            BANK GUARANTEE
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "jitpa" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("jitpa", "/sawp/jitpa")}
          >
            JITPA
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "labourDeposit"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick("labourDeposit", "/sawp/labourDeposit")
            }
          >
            LABOUR DEPOSIT
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "immigration"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() => handleTabClick("immigration", "/sawp/immigration")}
          >
            IMMIGRATION
          </button>
        </div>

        {/* Render Child Components */}
        <div>
          <Outlet context={{ activeNavTab, handleNext,searchResultData }} />

        </div>
      </div>
    </section>
  );
};



// import { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// import { SearchDisplay } from "../../../utils/SearchDisplay";
// import { IoSearch } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";

// export const WorkPass = () => {
//   const [activeNavTab, setActiveNavTab] = useState("sawp");
//   const navigate = useNavigate();
//   const location = useLocation();
//   useEffect(()=>{
//     window.scrollTo({
//       top:0,
//       behavior:"smooth"
//     })
//   })

//   const handleNext = () => {
//     switch (activeNavTab) {
//       case "sawp":
//         navigate("/sawp");

//         setActiveNavTab("doe");
//         break;
//         case "doe":
//         navigate("/sawp/doe");
//         setActiveNavTab("nlms");
//         break;
//         case "nlms":
//         navigate("/swap/nlms");
//         setActiveNavTab("bankGuarantee");
//         break;
//         case "bankGuarantee":
//         navigate("/swap/bankGuarantee");
//         setActiveNavTab("jitpa");
//         break;
//         case "jitpa":
//         navigate("/swap/jitpa");
//         setActiveNavTab("labourDeposit");
//         break;
//         case "labourDeposit":
//         navigate("/swap/labourDeposit");
//         setActiveNavTab("immigration");
//         break;
//         case "immigration":
//         navigate("/swap/immigration");
//         setActiveNavTab("immigration");
//         break;
//         default:
//           break;
//         }
//       };

//   const handleTabClick = (tab, route) => {
//     setActiveNavTab(tab);
//     navigate(route);
//   };

//   // Update activeNavTab based on current route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes("/doe")) {
//       setActiveNavTab("doe");
//     } else if (path.includes("/nlms")) {
//       setActiveNavTab("nlms");
//     } else if (path.includes("/bankGuarantee")) {
//       setActiveNavTab("bankGuarantee");
//     } else if (path.includes("/jitpa")) {
//       setActiveNavTab("jitpa");
//     } else if (path.includes("/labourDeposit")) {
//       setActiveNavTab("labourDeposit");
//     } else if (path.includes("/immigration")) {
//       setActiveNavTab("immigration");

//     } else {
//       setActiveNavTab("sawp");
//     }
//   }, [location]);

//   return (
//     <section className="w-full min-h-screen bg-[#F5F6F1]">
//       <div className="relative mx-auto p-10 h-full">
//       <div className="w-full flex items-center justify-between gap-5">
//         <Link to="/employee" className="text-xl flex-1 text-grey">
//           <FaArrowLeft />
//         </Link>
//         <p className="flex-1 text-center mt-2 text_size_2 uppercase">Employee Work Pass</p>
//         <div className="flex-1">
//           <SearchDisplay searchIcon2={<IoSearch />} placeholder="Employee Id" rounded="rounded-lg"/>
//         </div>
//       </div>
       
//         {/* Tab Navigation */}
//         <div className="flex justify-between border-b m-4 text-[16px] font-semibold">
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "swap" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("swap", "/swap")}
//           >
//           SAWP
//           </button>
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "doe" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("doe", "/sawp/doe")}
//           >
//             DOE
//           </button>
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "nlms" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("nlms", "/sawp/nlms")}
//           >
//             NLMS
//           </button>
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "bankGuarantee" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("bankGuarantee", "/sawp/bankGuarantee")}
//           >
//             BANK GUARANTEE
//           </button>
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "jitpa" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("jitpa", "/sawp/jitpa")}
//           >
//             JITPA
//           </button>
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "labourDeposit" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("labourDeposit", "/sawp/labourDeposit")}
//           >
//             LABOUR DEPOSIT
//           </button>
//           <button
//             className={`py-2 px-4 focus:outline-none ${
//               activeNavTab === "immigration" ? "border-b-8 border-yellow" : ""
//             }`}
//             onClick={() => handleTabClick("immigration", "/sawp/immigration")}
//           >
//             IMMIGRATION
//           </button>

//         </div>
   
//         {/* Render Child Components */}
//         <div>
//           <Outlet context={{ activeNavTab, handleNext }} />
//         </div>
//       </div>
//     </section>
//   );
// };

















// import React, { useState, useContext, useEffect, useRef } from 'react';
// import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
// import { LuFilter } from "react-icons/lu";
// import { Table } from '../../utils/Table'; // Import your existing Table component
// import { WorkpassForm } from '../recruitments/WorkpassForm';

// export const WorkPass = () => {
//   useEffect(()=>{
//     window.scrollTo({
//       top:0,
//       behavior:"smooth"
//     })
//   })
//   const [data, setData] = useState([]); // Data fetched from API
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
//   const [isFormVisible, setIsFormVisible] = useState(false); // Control form visibility
//   const [selectedCandidate, setSelectedCandidate] = useState(null); // Store selected candidate for the form
//   const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
//   const [filteredData, setFilteredData] = useState([]); // To store filtered table data
//   const filterBoxRef = useRef(null); // Ref to track clicks outside the filter box
//   const [filterBoxTitle, setFilterBoxTitle] = useState('Check status');
//   const [selectedFilters, setSelectedFilters] = useState('');
//   const [selectedCandidateType, setSelectedCandidateType] = useState([]);
//   const [candidateTypeDropdownOpen, setCandidateTypeDropdownOpen] = useState(false);

//   const tableData = data || []; // Example: reuse the same data, but you can filter or change it as needed


  
//   const toggleFilterBox = (event) => {
//     event?.stopPropagation();
//     setIsFilterBoxOpen((prevState) => !prevState);
//   };

//   const handleRowClick = (candidate) => {
//     setSelectedCandidate(candidate);
//     setIsFormVisible(true); 
//   };

//   const handleFilterChange = (event) => {
//     const selectedValue = event.target.value; // Get the correct selected value
//     setSelectedFilters(selectedValue); // Update the selected filter state
//     setFilterBoxTitle(selectedValue); // Update the filter box title with the selected value
    
//     // Filter data based on the selected value
//     const newFilteredData = data.filter(item => item.workpass === selectedValue);
//     setFilteredData(newFilteredData); // Update the filtered data
    
//     // Close the filter box after selection
//     setIsFilterBoxOpen(false);
//   };
  
//   const closeForm = () => setIsFormVisible(false);

//   const columns = ['EmpId', 'Name', 'Nationality', 'Position', 'Contract', 'Type', 'Email', 'Contact'];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
//         setIsFilterBoxOpen(false); // Close the filter box when clicking outside
//       }
//       if (!event.target.closest(".candidateTypeDropdown")) {
//         setCandidateTypeDropdownOpen(false);
//       }
//     };
  
//     document.addEventListener('mousedown', handleClickOutside);
  
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
  
//   const handleFormSave = (updatedFormData) => {
//     const updatedData = data.map(candidate => 
//       candidate.tempid === selectedCandidate.tempid ? { ...candidate, ...updatedFormData } : candidate
//     );
//     setFilteredData(updatedData);
//     setIsFormVisible(false); 
//   };

//   // Function to handle selecting options in the "Candidate type" dropdown
//   const handleCandidateTypeSelect = (option) => {
//     let updatedOptions = [...selectedCandidateType];

//     if (updatedOptions.includes(option)) {
//       updatedOptions = updatedOptions.filter((opt) => opt !== option);
//     } else {
//       updatedOptions.push(option);
//     }

//     setSelectedCandidateType(updatedOptions);

//     // Filter data based on selected options
//     if (updatedOptions.length === 0) {
//       setFilteredData(data); // If no options selected, show all data
//     } else {
//       const filtered = data.filter((d) => {
//         return updatedOptions.some((opt) => {
//           if (opt === "SAWP") return d.contract === "SAWP";
//           if (opt === "LPA") return d.contract === "LPA";
//           if (opt === "OnShore") return d.type === "OnShore";
//           if (opt === "OffShore") return d.type === "OffShore";
//           return true;
//         });
//       });

//       setFilteredData(filtered); // Update the filtered data
//     }
//   };

//   return (
//     <section className="min-h-screen bg-[#F5F6F1CC]"> 
//     <div className='screen-size'>
//             <div className="my-5  flex justify-between items-center">
//           <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
//             Work Pass
//           </button>
//           <div>
//           <label className="">Employee ID</label> <br />
//             <input
//               type="text"
//               className="input-field"
//             />
//             </div>
//         </div>
//       <div className="relative">
//         {/* Candidate Type Dropdown */}
//         <button
//           className={`font-semibold py-2 px-6 mb-6 rounded-lg flex items-center ${
//             selectedCandidateType.length > 0 ? "bg-[#faf362]" : "bg-[#8d8f9036]"
//           } candidateTypeDropdown`}
//           onClick={() => setCandidateTypeDropdownOpen(!candidateTypeDropdownOpen)}
//         >
//           {selectedCandidateType.length > 0
//             ? selectedCandidateType.join(" + ")
//             : "CANDIDATE TYPE"}
//           {candidateTypeDropdownOpen ? (
//             <FaChevronUp className="ml-10" />
//           ) : (
//             <FaChevronDown className="ml-10" />
//           )}
//         </button>

//         {candidateTypeDropdownOpen && (
//           <div className="absolute bg-white border shadow-lg rounded-lg z-20 candidateTypeDropdown">
//             {["SAWP", "LPA", "OnShore", "OffShore"].map((option) => (
//               <label key={option} className="block w-full text-left px-4 py-2">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selectedCandidateType.includes(option)}
//                   onChange={() => handleCandidateTypeSelect(option)}
//                 />

//                 {option}
//               </label>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={toggleFilterBox}
//           className={`absolute top-0 right-0 px-6 py-2 font-semibold rounded-lg flex items-center ${selectedFilters.length ? 'bg-[#faf362]' : 'bg-[#8d8f9036]'}`}
//         >
//           <LuFilter className="mr-5" />
//           <span>{filterBoxTitle}</span>
//         </button>

//         {isFilterBoxOpen && (
//           <div 
//             ref={filterBoxRef} 
//             className="absolute top-12 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col space-y-2"
//           >
//             {['DOE', 'NLMS', 'Bank Guarantee', 'JITPA', 'Immigration'].map((workpass) => (
//               <label
//                 key={workpass} 
//                 className={`flex items-center font-semibold space-x-2 hover:font-bold hover:text-[#c7bd03] p-2 rounded-md ${selectedFilters === workpass ? 'text-[#faf362]' : 'text-lite_grey'}`}
//               >
//                 <input 
//                   type="radio" 
//                   className="w-5 h-6" 
//                   name="workpass" 
//                   value={workpass}
//                   checked={selectedFilters === workpass} 
//                   onChange={handleFilterChange} 
//                 />
//                 <span>{workpass}</span>
//               </label>
//             ))}

//             {/* Reset Button */}
//             <button 
//               className="mt-4 px-1 py-2 border-2 border-yellow rounded-lg shadow-lg hover:bg-[#faf362]"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedFilters(''); // Clear the selected filter
//                 setFilteredData(data);  // Reset to the original unfiltered data
//                 setFilterBoxTitle('Check status'); // Reset filter box title
//                 setIsFilterBoxOpen(false); // Close the filter box
//               }}
//             >
//               Reset
//             </button> 
//           </div>
//         )}

//         {!loading && !error ? (
//           filteredData.length > 0 ? (
//             <Table
//               columns={columns}
//               data={filteredData}
//               rowClickHandler={handleRowClick}
//               showCheckboxes={false}
//               selectedRows={selectedRows}
//               currentPage="workpass" 
//               selectedTable="workpass" 
//               edited={handleRowClick} 
//               showEditIcon={true} 
//             />
//           ) : (
//             <div className="text-center text-grey py-10">No data found</div>
//           )
//         ) : (
//           <div className='text-center'>{loading ? "Loading..." : "Error fetching data. Check your Internet connection."}</div>
//         )}

//         {isFormVisible && selectedCandidate && (
//           <WorkpassForm candidate={selectedCandidate} onClose={closeForm} onSave={handleFormSave} />
//         )}
//       </div>
//       </div>
//     </section>
//   );
// };

