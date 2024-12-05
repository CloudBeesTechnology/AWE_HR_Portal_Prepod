import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { DataSupply } from "../../../utils/DataStoredContext";

export const WorkPass = () => {
  const { empPIData, SawpDetails, DNData, BJLData, PPValidsData } =
    useContext(DataSupply);

  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [activeNavTab, setActiveNavTab] = useState("sawp");
  const [searchResultData, setSearchResultData] = useState([]);
  const [empID, setEmpID] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
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
    console.log("Navbar: User ID from localStorage:", userID);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const SpDetails = SawpDetails ? SawpDetails.find(
              (user) => user.empID === emp.empID
            ) : {};
            const bjlDetails = BJLData ? BJLData.find(
              (user) => user.empID === emp.empID
            ): {};
            const ppVDetails =PPValidsData ?  PPValidsData.find(
              (user) => user.empID === emp.empID
            ) :{};
            const dndDetails = DNData ? DNData.find(
              (user) => user.empID === emp.empID
            ): {};

        

            return {
              ...emp,
              ...SpDetails,
              ...dndDetails,
              ...ppVDetails,
              ...bjlDetails,
            };
          })
          .filter(Boolean);
        // console.log(mergedData);

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
    console.log(result);
    setSearchResultData(result);
  };

  return (
    <section
      className="w-full min-h-screen bg-[#F5F6F1]"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
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
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : location.pathname === "/sawp/doe" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                empID={empID}
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : location.pathname === "/sawp/nlms" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                empID={empID}
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : location.pathname === "/sawp/bankGuarantee" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                empID={empID}
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : location.pathname === "/sawp/jitpa" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                empID={empID}
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : location.pathname === "/sawp/labourDeposit" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                empID={empID}
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : location.pathname === "/sawp/immigration" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                empID={empID}
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : null}
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
              activeNavTab === "bankGuarantee" ? "border-b-8 border-yellow" : ""
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
              activeNavTab === "labourDeposit" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() =>
              handleTabClick("labourDeposit", "/sawp/labourDeposit")
            }
          >
            LABOUR DEPOSIT
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "immigration" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("immigration", "/sawp/immigration")}
          >
            IMMIGRATION
          </button>
        </div>

        {/* Render Child Components */}
        <div>
          <Outlet context={{ activeNavTab, handleNext, searchResultData }} />
        </div>
      </div>
    </section>
  );
};
