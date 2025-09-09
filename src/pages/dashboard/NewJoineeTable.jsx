import { useContext, useEffect, useState } from "react";
import { DataSupply } from "../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";
import avatar from "../../assets/navabar/avatar.jpeg";
import { Link } from "react-router-dom";
import { DateFormat } from "../../utils/DateFormat";

export const NewJoineeTable = () => {
  const { empPIData, workInfoData, IDData } = useContext(DataSupply);

  // State variables
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [latestJoinees, setLatestJoinees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Merge employee data with work info and ID data
        const mergedData = empPIData
          .map((emp) => {
            const WIDetails = workInfoData
              ? workInfoData.find((user) => user.empID === emp.empID)
              : {};
            const IDDetails = IDData
              ? IDData.find((user) => user.empID === emp.empID)
              : {};

            return {
              ...emp,
              ...WIDetails,
              ...IDDetails,
            };
          })
          .filter(Boolean);

        // Sort data by createdAt timestamp (descending) and take the last 4 entries
        const sortedData = mergedData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setUserDetails(sortedData);
        setAllEmpDetails(mergedData);
        setLatestJoinees(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, workInfoData, IDData]);

  useEffect(() => {
    const fetchProfilePhotos = async () => {
      try {
        const updatedJoinees = await Promise.all(
          latestJoinees.map(async (joinee) => {
            if (joinee.profilePhoto) {
              const result = await getUrl({ path: joinee.profilePhoto });
              return { ...joinee, profilePhotoUrl: result.url };
            }
            return { ...joinee, profilePhotoUrl: null };
          })
        );
        setLatestJoinees(updatedJoinees);
      } catch (err) {
        console.error("Error fetching profile photos:", err);
      }
    };

    if (latestJoinees.length > 0) {
      fetchProfilePhotos();
    }
  }, [latestJoinees]);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg m-2">
      {/* Header */}
      <div className="bg-lite_grey px-6 py-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-dark_grey">New Joinee</h2>
        <Link to="/allempDetails" className="text-[blue] text-sm underline">
          View All
        </Link>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-center text-sm text-dark_grey border-b border-lite_grey">
            <th className="py-3 px-6">Employee</th>
            <th className="py-3 px-6">Country</th>
            <th className="py-3 px-6">Position</th>
            <th className="py-3 px-6">Start date</th>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {latestJoinees.map((joinee, index) => (
            <tr
              key={index}
              className="text-sm text-dark_grey text-center border-b border-lite_grey"
            >
              {/* Employee + photo */}
              <td className="py-4 px-6 flex items-center gap-3">
                <img
                  src={joinee.profilePhotoUrl || avatar}
                  alt={joinee.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span>{joinee.name}</span>
              </td>

              {/* Country */}
              <td className="py-4 px-6">{joinee.nationality || "N/A"}</td>

              {/* Position */}
              <td className="py-4 px-6">
                {joinee?.position?.[0]?.trim() ? joinee.position : "N/A"}
              </td>

              {/* Start date */}
              <td className="py-4 px-6">{DateFormat(joinee.doj) || "N/A"}</td>

              {/* Type */}
              <td className="py-4 px-6">
                {joinee.empType?.[joinee.empType.length - 1] || "N/A"}
              </td>

              {/* Status */}
              <td className="py-4 px-6">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green text-[#14532d]">
                  {joinee.workStatus?.[joinee?.workStatus.length - 1] || "N/A"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
