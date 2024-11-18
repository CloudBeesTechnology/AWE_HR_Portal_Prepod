import React from 'react';


const WorkInformation = ({ workInfo, bankEmpUpload, jpEmpUpload, empUpDocs, renderPdfLink }) => {
  return (
    <section className="py-3">
      <h6 className="text_size_5 text-dark_grey my-3">Work Information:</h6>
      <div>
        {Object.entries(workInfo).map(([key, value], index) => (
          <p key={index}>
            <strong>{key}:</strong> {value || "N/A"}
          </p>
        ))}
      </div>
      {renderPdfLink(bankEmpUpload, "Bank Emp Upload")}
      {renderPdfLink(jpEmpUpload, "Jp Emp Upload")}
      {renderPdfLink(empUpDocs, "Employee Document")}
    </section>
  );
};

export default WorkInformation;
