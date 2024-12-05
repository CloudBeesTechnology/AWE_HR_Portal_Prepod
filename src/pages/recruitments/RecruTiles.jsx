import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RecDashdetails } from "./RecDashdetails";
import usePermission from "../../hooks/usePermissionDashInside";

export const RecruTiles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTile, setSelectedTile] = useState("");
  const recruitmentPermissions = usePermission("userID", "Recruitment");
  useEffect(() => {
    if (location.pathname.includes("applyemployreq")) {
      setSelectedTile("Apply Employee Requisition");
    } else if (location.pathname.includes("employreq")) {
      setSelectedTile("Employee Requisition");
    } else if (location.pathname.includes("candidate")) {
      setSelectedTile("Candidate");
    } else if (location.pathname.includes("localcandi")) {
      setSelectedTile("Local CV");
    } else if (location.pathname.includes("nonloccandi")) {
      setSelectedTile("Non Local CV");
    } else if (location.pathname.includes("status")) {
      setSelectedTile("Status");
    } else if (location.pathname.includes("workpasstracking")) {
      setSelectedTile("WorkPass Tracking");
    }
  }, [location.pathname]);

  const handleTileClick = (title, path) => {
    setSelectedTile(title);
    navigate(path);
  };
  const filteredCards = RecDashdetails.filter((card) =>
    recruitmentPermissions.includes(card.title)
  );
  return (
    <section className="h-full bg-[#F5F6F1]">
      <div className="flex flex-wrap justify-center sm:justify-evenly items-center gap-4 py-10 text-black">
        {filteredCards.map((value, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(value.title, value.path)}
            className={`${
              value.bg
            } rounded-3xl w-[10rem] sm:w-[11.1rem] h-40 p-4 cursor-pointer ${
              selectedTile === value.title
                ? "border-4 bg-white border-[#faf362]"
                : ""
            }`}
          >
            <div
              className={`${value.bg1} rounded-full my-4 w-16 h-16 flex justify-center items-center m-auto`}
            >
              <img
                className="w-[2.2rem] h-9 object-cover"
                src={value.icons}
                alt={`${index} Icon not found`}
              />
            </div>
            <h5 className="text-[14px] font-semibold text-center">
              {value.title}
            </h5>
          </div>
        ))}
      </div>
      <Outlet />
    </section>
  );
};
