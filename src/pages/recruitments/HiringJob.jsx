import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataSupply } from "../../utils/DataStoredContext";
import { FaArrowLeft } from "react-icons/fa";
import { useDeleteAccess } from "../../hooks/useDeleteAccess";
import { Pagination } from "../leaveManagement/Pagination";

export const HiringJob = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { hiringData } = useContext(DataSupply);
  const { formattedPermissions } = useDeleteAccess();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const latestData = hiringData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const heading = [
    "S.No",
    "Job Title",
    "Experience",
    "Job Description",
    "Location",
    "Quantity",
    "Start Date",
    "Expiry Date",
    "Download",
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

    return expiry < today ? "Expired" : "Live";
  };
  const getStatusClass = (status) => {
    return status === "Expired" ? "text-[green]" : "text-[#E8A317]";
  };

  const requiredPermissions = ["Status"];

  const access = "Recruitment";

  const totalPages = Math.ceil(latestData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;
  const paginatedData = latestData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <section className="bg-[#F5F6F1CC] mx-auto p-10 min-h-screen">
        <div className="flex items-center mb-7">
          <Link to="/recruitment" className="text-xl text-grey">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="mb-5 flex justify-between">
          <span className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
            Hiring Job
          </span>
          <Link
            to="/postJob"
            className="bg-primary py-2 px-5 text-zinc font-semibold text-lg flex items-center gap-5"
          >
            <span className="text-xl">+</span> Create Job
          </Link>
        </div>
        <div className="recruitmentTable w-full max-h-[calc(70vh-7rem)] overflow-y-auto rounded-xl">
          <table className="w-full text-center">
            <thead className="bg-[#939393] text-white sticky top-0">
              <tr>
                {heading.map((val, index) => (
                  <th key={index} className="px-4 py-4">
                    {val}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white cursor-pointer">
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((val, idx) => {
                  const status = getStatus(val?.expiryDate);

                  return (
                    <tr
                      key={idx}
                      className="text-center border-b-2 bg-white border-[#C7BCBC] text-[15px] text-[#303030] hover:bg-medium_blue"
                    >
                      <td className="pl-4 py-4">{startIndex + idx + 1}</td>
                      <td className="pl-4 py-4">{val?.jobTitle || "N/A"}</td>
                      <td className="pl-4 py-4">{val?.exper || "N/A"}</td>
                      <td className="pl-4 py-4 break-words overflow-x-auto">
                        {val?.jobContent || "N/A"}
                      </td>
                      <td className="pl-4 py-4">{val?.location || "N/A"}</td>
                      <td className="pl-4 py-4">
                        {val?.quantityPerson || "N/A"}
                      </td>
                      <td className="pl-4 py-4">{val?.startDate || "N/A"}</td>
                      <td className="pl-4 py-4">{val?.expiryDate || "N/A"}</td>
                      <td
                        className={`pl-4 py-4 ${
                          val?.uploadJobDetails
                            ? "text-[#3c3cc2]"
                            : "text-dark_grey"
                        } `}
                      >
                        <a href={val?.uploadJobDetails}>
                          {val?.uploadJobDetails ? "Download" : "N/A"}
                        </a>
                      </td>
                      <td className={`pl-4 py-4 ${getStatusClass(status)}`}>
                        {status}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={heading.length}
                    className="px-2 py-4 text-center"
                  >
                    No job postings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {paginatedData.length > 0 && (
          <div className="ml-20 flex justify-center">
            <div className="w-[60%] flex justify-start mt-10 px-10">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
