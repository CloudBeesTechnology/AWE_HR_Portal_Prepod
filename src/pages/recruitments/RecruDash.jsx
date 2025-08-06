import { useNavigate } from "react-router-dom";
import { RecDashdetails } from "./RecDashdetails";
import usePermission from "../../hooks/usePermissionDashInside";

export const RecruDash = () => {
  const navigate = useNavigate();
  const recruitmentPermissions = usePermission("userID", "Recruitment");

  const handleTileClick = (title) => {
    if (title === "Apply Employee Requisition") {
      navigate("/recrutiles/applyemployreq");
    } else if (title === "Employee Requisition") {
      navigate("/recrutiles/employreq");
    } else if (title === "Candidate") {
      navigate("/recrutiles/candidate");
    } else if (title === "Local CV") {
      navigate("/recrutiles/localcandi");
    } else if (title === "Non Local CV") {
      navigate("/recrutiles/nonloccandi");
    } else if (title === "Status") {
      navigate("/recrutiles/status");
    } else if (title === "WorkPass Tracking") {
      navigate("/recrutiles/workpasstracking");
    } else if (title === "Hiring Job") {
      navigate("/recrutiles/hiringJob");
    }
  };
  // console.log(recruitmentPermissions);

  const filteredCards = RecDashdetails.filter((card) =>
    recruitmentPermissions.includes(card.title)
  );

  return (
    <section className="min-h-screen p-10 bg-[#F5F6F1]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 justify-items-center py-10 text-black">
        {filteredCards.map((value, index) => (
          <div
            key={index}
            onClick={() => handleTileClick(value.title)}
            className={`${value.bg} rounded-3xl w-[320px] h-50 p-4 bg-white border-4 border-white cursor-pointer transition-all duration-50 hover:border-[#faf362] hover:border-4`}
          >
            <div
              className={`${value.bg1} rounded-full my-8 w-24 h-24 center m-auto`}
            >
              <img
                className="w-13 h-16 object-cover"
                src={value.icons}
                alt={`${index} Icon not found`}
              />
            </div>
            <h5 className="text-[18px] font-semibold text-center">
              {value.title}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};
