import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { SearchDisplay } from "../../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { DataSupply } from "../../../utils/DataStoredContext";

export const InsuranceNav = () => {
  const {
    empPIData,
    EmpInsuranceData,
    workInfoData,
    IDData,
    depInsuranceData,
  } = useContext(DataSupply);
  // console.log(depInsuranceData);

  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [activeNavTab, setActiveNavTab] = useState("employeeInsurances");
  const [searchResultData, setSearchResultData] = useState([]);
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
    const fetchData = async () => {
      try {
        const mergedDataEmpInsu = empPIData.map((emp) => {
          const EIDetails = EmpInsuranceData
            ? EmpInsuranceData.find((user) => user.empID === emp.empID)
            : {};
          const WIDetails = workInfoData
            ? workInfoData.find((work) => work.empID === emp.empID)
            : {};
          const IDDetails = IDData
            ? IDData.find((value) => value.empID === emp.empID)
            : {};
          const DIDetails = depInsuranceData
            ? depInsuranceData.find((user) => user.empID === emp.empID)
            : {};
          return {
            ...emp,
            ...EIDetails,
            ...WIDetails,
            ...IDDetails,
            ...DIDetails,
          };
        });

        setAllEmpDetails(mergedDataEmpInsu);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [empPIData, EmpInsuranceData, workInfoData, IDData]);

  const handleNext = () => {
    switch (activeNavTab) {
      case "employeeInsurances":
        navigate("/insuranceAdd");
        setActiveNavTab("employeeInsurances");
        break;
      case "dependentInsurance":
        navigate("/insuranceAdd/dependentInsurance");
        setActiveNavTab("dependentInsurance");
        break;
      default:
        break;
    }
  };

  const handleTabClick = (tab, route) => {
    setActiveNavTab(tab);
    navigate(route);
  };

  // Adjusted useEffect to handle specific paths
  useEffect(() => {
    const path = location.pathname;
    if (path === "/insuranceAdd") {
      setActiveNavTab("employeeInsurances");
    } else if (path === "/insuranceAdd/dependentInsurance") {
      setActiveNavTab("dependentInsurance");
    } else {
      setActiveNavTab("employeeInsurances");
    }
  }, [location]);

  const searchResult = (result) => {
    // console.log(result);

    setSearchResultData(result);
  };

  return (
    <section
      className="w-full bg-[#F5F6F1]"
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
            Insurance Form
          </p>
          <div className="flex-1">
            {location.pathname === "/insuranceAdd" ? (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            ) : (
              <SearchDisplay
                searchResult={searchResult}
                newFormData={allEmpDetails}
                searchIcon2={<IoSearch />}
                placeholder="Employee Id"
                rounded="rounded-lg"
                filteredEmployees={filteredEmployees}
                setFilteredEmployees={setFilteredEmployees}
              />
            )}
          </div>
        </div>
        <div className="flex border-b m-4 text-[16px] font-semibold">
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "employeeInsurances"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick("employeeInsurances", "/insuranceAdd")
            }
          >
            Employee Insurance
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "dependentInsurance"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                "dependentInsurance",
                "/insuranceAdd/dependentInsurance"
              )
            }
          >
            Dependent Insurance
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