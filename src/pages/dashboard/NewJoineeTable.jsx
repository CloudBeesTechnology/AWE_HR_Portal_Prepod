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
    <div className="bg-white shadow-md rounded-2xl overflow-hidden m-2">
      <div className="bg-lite_grey p-4 flex justify-between">
        <h2 className="text-lg font-semibold">New Joinee</h2>
        <Link to="/allempDetails" className="px-10 underline text-[blue]">
          {" "}
          View All
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-6 text-left text-sm font-medium">
              Employee
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium">
              Date of Join
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium">
              Nationality
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium">
              Position
            </th>
            <th className="py-3 px-6 text-left text-sm font-medium">Type</th>
          </tr>
        </thead>
        <tbody>
          {latestJoinees.map((joinee, index) => {
            // console.log(joinee);

            return (
              <tr key={index} className="border-b last:border-none text-sm">
                <td className="py-4 px-6 flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={joinee.profilePhotoUrl || avatar}
                    alt={joinee.name}
                  />
                  <span className="text-grey">{joinee.name}</span>
                </td>
                <td className="py-4 px-6 text-grey ">
                  {DateFormat(joinee.doj) || "N/A"}
                </td>
                <td className="py-4 px-6 text-grey">
                  {joinee.nationality || "N/A"}
                </td>
                <td className="py-4 px-6 text-grey">
                  {joinee?.position?.[0]?.trim() ? joinee.position : "N/A"}
                </td>
                <td className="py-4 px-6 text-grey">
                  {joinee.empType?.[0]?.trim() ? joinee.empType : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
