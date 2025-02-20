import { useContext, useEffect, useState } from "react";
import { DataSupply } from "../../utils/DataStoredContext";
import { getUrl } from "@aws-amplify/storage";
import avatar from "../../assets/navabar/avatar.jpeg";
import { Link } from "react-router-dom";
import { DateFormat } from "../../utils/DateFormat";

export const NewJoineeTable = () => {
  const { empPIData, workInfoData, IDData } = useContext(DataSupply);

  console.log(empPIData);
  console.log(workInfoData);
  console.log(IDData);
  
  // State variables
  const [userDetails, setUserDetails] = useState([]);
  const [latestJoinees, setLatestJoinees] = useState([]);

  /** ✅ First useEffect - Merge and Sort Data **/
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching employee data...");

        // Merge data from different sources
        const mergedData = empPIData.map((emp) => {
          const WIDetails = workInfoData.find((user) => user.empID === emp.empID) || {};
          const IDDetails = IDData.find((user) => user.empID === emp.empID) || {};

          return { ...emp, ...WIDetails, ...IDDetails };
        });

        // Sort by `createdAt` in descending order and take the latest 4
        const sortedData = mergedData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        console.log("Sorted latest joinees:", sortedData);
        setUserDetails(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, workInfoData, IDData]);

  /** ✅ Second useEffect - Fetch Profile Photos **/
  useEffect(() => {
    const fetchProfilePhotos = async (joineesList) => {
      try {
        console.log("Fetching profile photos for:", joineesList);

        const updatedJoinees = await Promise.all(
          joineesList.map(async (joinee) => {
            console.log(`Checking profile photo for ${joinee.name}:`, joinee.profilePhoto);

            if (joinee.profilePhoto) {
              try {
                const result = await getUrl({ path: joinee.profilePhoto });
                console.log(`Profile photo URL for ${joinee.name}:`, result?.url);
                return { ...joinee, profilePhotoUrl: result?.url || null };
              } catch (photoError) {
                console.error(`Error fetching profile photo for ${joinee.name}:`, photoError);
                return { ...joinee, profilePhotoUrl: null };
              }
            }

            return { ...joinee, profilePhotoUrl: null };
          })
        );

        console.log("Updated latest joinees with photos:", updatedJoinees);
        setLatestJoinees(updatedJoinees);
      } catch (err) {
        console.error("Error fetching profile photos:", err);
      }
    };

    if (userDetails.length > 0) {
      fetchProfilePhotos(userDetails);
    }
  }, [userDetails]);

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden m-2">
      <div className="bg-lite_grey p-4 flex justify-between">
        <h2 className="text-lg font-semibold">New Joinee</h2>
        <Link to="/allempDetails" className="px-10 underline text-[blue]"> View All </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-6 text-left text-sm font-medium">Employee</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Date of Join</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Nationality</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Position</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Type</th>
          </tr>
        </thead>
        <tbody>
          {latestJoinees.map((joinee, index) => (
            <tr key={index} className="border-b last:border-none text-sm">
              <td className="py-4 px-6 flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={joinee.profilePhotoUrl || avatar}
                  alt={joinee.name || "Employee"}
                />
                <span className="text-grey">{joinee.name}</span>
              </td>
              <td className="py-4 text-grey text-center">{DateFormat(joinee.doj) || "N/A"}</td>
              <td className="py-4 px-6 text-grey">{joinee.nationality || "N/A"}</td>
              <td className="py-4 px-6 text-grey">{joinee.position || "N/A"}</td>
              <td className="py-4 px-6 text-grey">{joinee.empType || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
