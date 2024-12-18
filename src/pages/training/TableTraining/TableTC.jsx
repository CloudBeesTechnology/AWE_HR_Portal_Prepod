import { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DataSupply } from '../../../utils/DataStoredContext';
import { TrainVT } from './TrainVT';

export const TableTC = () => {
  const { tableColumns } = useOutletContext();
  const {
    empPIData,
    trainingCertifi,AddEmpReq
  } = useContext(DataSupply);
  
  const addTCForm = [
    { header: "Employee ID", key: "empID" },
    { header: "Employee Badge No", key: "empBadgeNo" },
    { header: "Name", key: "name" },
    { header: "Course", key: "courseCode" },
    { header: "Course Name", key: "courseName" },
    { header: "Company", key: "company" },
    { header: "Purchase Order No", key: "poNo" },
    { header: "Expiry Condition", key: "addDescretion" },
    { header: "Date E-certificate", key: "eCertifiDate" },
    { header: "Training Certificate Expiry", key: "certifiExpiry" },
    { header: "Original Certificate", key: "orgiCertifiDate" },
    { header: "Upload File", key: "trainingUpCertifi" },
  ];

    const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [mergeData, setMergeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (empPIData && trainingCertifi && AddEmpReq) {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const TCertifi = trainingCertifi.find((item) => item.empID === emp.empID);
            const addEmp = AddEmpReq.find((item) => item.empID === emp.empID);
            return TCertifi ? { ...emp, ...TCertifi, ...addEmp } : null;
          })
          .filter(Boolean) // Remove nulls
          .sort((a, b) => a.empID.localeCompare(b.empID));
          console.log(mergedData);

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
  }, [empPIData, trainingCertifi,AddEmpReq]);

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
          certifiExpiry: formatDate(data.certifiExpiry),
          orgiCertifiDate: formatDate(data.orgiCertifiDate),
          eCertifiDate: formatDate(data.eCertifiDate),
        }))}
        columns={tableColumns?.trainCertifi} popupAll={addTCForm}
      />
    </div>
  );
};

