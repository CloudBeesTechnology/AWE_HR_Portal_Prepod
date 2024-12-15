import { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DataSupply } from '../../../utils/DataStoredContext';
import { TrainVT } from './TrainVT';

export const TableBlasting = () => {
  const { tableColumns } = useOutletContext();
  const { empPIData, BastingInfo } = useContext(DataSupply);

  const addBastingForm = [
    { header: "Employee ID", key: "empID" },
    { header: "Name", key: "name" },
    { header: "Remarks for Blasting", key: "blastingRemarks" },
    { header: "Start Date", key: "blastingStartDate" },
    { header: "End Date", key: "blastingEndDate" },
    { header: "Painting Badge Number", key: "blastingBadgeNo" },
    { header: "Qualification Expiry", key: "blastingQulifiExp" },
    { header: "Upload File", key: "blastingUpload" },
  ];

  const [mergeData, setMergeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (empPIData && BastingInfo) {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const baste = BastingInfo.find((item) => item.empID === emp.empID);
            return baste ? { ...emp, ...baste } : null;
          })
          .filter(Boolean) // Remove nulls
          .sort((a, b) => a.empID.localeCompare(b.empID));

        setMergeData(mergedData);
        setLoading(false);
      } catch (err) {
        setError('Error merging data.');
        setLoading(false);
      }
    } else {
      setError('Required data is missing.');
      setLoading(false);
    }
  }, [empPIData, BastingInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TrainVT
        mergering={mergeData.map((data) => ({
          ...data,
          blastingStartDate: formatDate(data.blastingStartDate),
          blastingEndDate: formatDate(data.blastingEndDate),
          blastingQulifiExp: formatDate(data.blastingQulifiExp),
        }))}
        columns={tableColumns?.blastingpainting}
        popupAll={addBastingForm}
      />
    </div>
  );
};


