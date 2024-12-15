import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";

export const HiringJob = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { hiringData } = useContext(DataSupply);
  // console.log(hiringData);
  const latestData = hiringData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const heading = [
    "Job Title",
    "Experience",
    "Job Description",
    "Location",
    "Quantity",
    "Start Date",
    "Expiry Date",
    "Status",
  ];
  const getStatus = (expiryDate) => {
    if (!expiryDate) {
      return "Live"; // Default status if expiryDate is not available
    }

    const normalizedDate = expiryDate.replace(/[-/]/g, "-");
    const [day, month, year] = normalizedDate.split("-");
    const expiry = new Date(year, month - 1, day);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return expiry < today ? "Completed" : "Live";
  };
  const getStatusClass = (status) => {
    return status === "Completed" ? "text-[green]" : "text-[#E8A317]";
  };
  
  
  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10 min-h-screen ">
      <div className="mb-5">
        {" "}
        <span className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
          Hiring Job
        </span>
      </div>{" "}
      <table className="w-full text-left">
        {/* Table Header */}
        <thead className="bg-[#939393] text-white">
          <tr>
            {heading.map((val, index) => (
              <th key={index} className="pl-4 py-4">
                {val}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white cursor-pointer">
          {latestData && latestData.length > 0 ? (
            latestData.map((val, idx) => {
              const status = getStatus(val?.expiryDate);
              return (
                <tr
                  key={idx}
                  className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)]"
                >
                  <td className=" pl-4 py-4">{val?.jobTitle || "N/A"}</td>
                  <td className=" pl-4 py-4">{val?.exper || "N/A"}</td>
                  <td className=" pl-4 py-4  max-w-[200px]">
                    {val?.jobContent || "N/A"}
                  </td>
                  <td className=" pl-4 py-4">{val?.location || "N/A"}</td>
                  <td className=" pl-4 py-4">{val?.quantityPerson || "N/A"}</td>
                  <td className=" pl-4 py-4">{val?.startDate || "N/A"}</td>
                  <td className=" pl-4 py-4">{val?.expiryDate || "N/A"}</td>
                  <td className={` pl-4 py-4 ${getStatusClass(status)}`}>
                    {status}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={heading.length} className="px-2  py-4 text-center">
                No job postings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full center my-10">
        <Link
          to="/postJob"
          className="bg-primary py-2 px-5 text-zinc font-semibold text-lg flex items-center gap-5"
        >
          <span className="text-xl">+</span> Create Job
        </Link>
      </div>
    </section>
  );
};
