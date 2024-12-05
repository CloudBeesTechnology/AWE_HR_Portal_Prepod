import { useEffect } from "react";
import { Link } from "react-router-dom";

export const HiringJob = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const heading = [
    "Job Title",
    "Job Code",
    "Department",
    "Experience",
    "Location",
    "Quantity",
    "Start Date",
    "Expiry Date",
    "Status",
  ];
  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10 ">
      <h5 className="text-secondary mt-2 text_size_2 mb-5">Hiring Job</h5>
      <table className="w-full text-left">
        {/* Table Header */}
        <thead className="bg-[#939393] text-white">
          <tr>
            {heading.map((val) => (
              <th key={val} className="pl-4 py-4">
                {val}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white cursor-pointer">
          <tr>
            <td>lkjhgf</td>
          </tr>
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
