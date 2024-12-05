import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";

export const HrInsuranceNav = () => {


  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [activeNavTab, setActiveNavTab] = useState("insurance");
  const [searchResultData, setSearchResultData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

 
  const handleNext = () => {
    switch (activeNavTab) {
      case "insurance":
        navigate("/insuranceHr");
        setActiveNavTab("insurance");
        break;
      case "groupHS":
        navigate("/insuranceHr/groupHS");
        setActiveNavTab("groupHS");
        break;
      case "workmenComp":
        navigate("/insuranceHr/workmenComp");
        setActiveNavTab("workmenComp");
        break;
      case "travelling":
        navigate("/insuranceHr/travelling");
        setActiveNavTab("travelling");
        break;
      case "personalAcci":
        navigate("/insuranceHr/personalAcci");
        setActiveNavTab("personalAcci");
        break;
      case "insuranceClaim":
        navigate("/insuranceHr/insuranceClaim");
        setActiveNavTab("insuranceClaim");
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
    if (path === "/insuranceHr") {
      setActiveNavTab("insurance");
    } else if (path === "/insuranceHr/groupHS") {
      setActiveNavTab("groupHS");
    } else if (path === "/insuranceHr/workmenComp") {
      setActiveNavTab("workmenComp");
    } else if (path === "/insuranceHr/travelling") {
      setActiveNavTab("travelling");
    } else if (path === "/insuranceHr/personalAcci") {
      setActiveNavTab("personalAcci");
    } else if (path === "/insuranceHr/insuranceClaim") {
      setActiveNavTab("insuranceClaim");
    } else {
      setActiveNavTab("insurance");
    }
  }, [location]);

//   const searchResult = (result) => {
//     setSearchResultData(result);
//   };

  return (
    <section className="w-full bg-[#F5F6F1]">
      <div className="relative mx-auto p-5 h-full">
        <div className="w-full">
          <p className="flex-1 text-center mt-2 text_size_2 uppercase">
            Insurance Info
          </p>
        </div>
        <div className="flex justify-between border-b m-4 text-[16px] font-semibold">
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "insurance"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick("insurance", "/insuranceHr")
            }
          >
            Insurance Type
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "groupHS"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                "groupHS",
                "/insuranceHr/groupHS"
              )
            }
          >
            GroupH&S
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "workmenComp"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                "workmenComp",
                "/insuranceHr/workmenComp"
              )
            }
          >
            Workmen Compensation
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "travelling"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                "travelling",
                "/insuranceHr/travelling"
              )
            }
          >
            Travelling
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "personalAcci"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                "personalAcci",
                "/insuranceHr/personalAcci"
              )
            }
          >
            Personal Accident
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeNavTab === "insuranceClaim"
                ? "border-b-8 border-yellow"
                : ""
            }`}
            onClick={() =>
              handleTabClick(
                "insuranceClaim",
                "/insuranceHr/insuranceClaim"
              )
            }
          >
            Insurance Claim
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
