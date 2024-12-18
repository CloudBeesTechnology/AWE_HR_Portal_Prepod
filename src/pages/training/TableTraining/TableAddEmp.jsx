import React from 'react'
import { TrainVT } from './TrainVT'
import { useOutletContext } from 'react-router-dom'

export const TableAddEmp = () => {
  const {mergeData,tableColumns}=useOutletContext()
  // console.log(tableColumns.addTraining);

  const addTrainingForm = [
    { header: "Employee ID", key: "empID" },
    { header: "Employee Badge No", key: "empBadgeNo" },
    { header: "Name", key: "name" },
    { header: "Material Requisition ", key: "MRNo" },
    { header: "Medical Name", key: "medicalName" },
    { header: "Medical Expiry", key: "medicalExpiry" },
    { header: "Medical Appointment Date", key: "medicalAppointDate" },
    { header: "Course", key: "courseCode" },
    { header: "Course Name", key: "courseName" },
    { header: "Company", key: "company" },
    { header: "Start Date", key: "traineeSD" },
    { header: "End Date", key: "traineeED" },
    { header: "Status", key: "traineeStatus" },
    { header: "Training Course Fee", key: "traineeCourseFee" },
    { header: "Upload Report", key: "medicalReport" },

  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle empty or invalid date
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
         <div>
      <TrainVT
        mergering={mergeData.map((data) => ({
          ...data,
          medicalExpiry: formatDate(data.medicalExpiry),
          medicalAppointDate: formatDate(data.medicalAppointDate),
          traineeSD: formatDate(data.traineeSD),
          traineeED: formatDate(data.traineeED),
        }))}
        columns={tableColumns.addTraining} popupAll={addTrainingForm}
      />
    </div>
            {/* <TrainVT mergering={mergeData} /> */}

    </div>
  )
}





