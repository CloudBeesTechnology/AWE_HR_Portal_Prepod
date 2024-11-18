import React from 'react';

// Function to parse the empUpDocs string into a usable object
const parseDocumentData = (data) => {
  // Extract the first element (because it's an array with one string)
  const docString = data[0];
  
  // Split the string by commas (each key-value pair)
  const docEntries = docString.split(',').map(item => item.trim());
  
  // Convert the array into an object
  const docObject = docEntries.reduce((acc, entry) => {
    const [label, url] = entry.split('=').map(part => part.trim());
    acc[label] = decodeURIComponent(url); // Decoding the URL
    return acc;
  }, {});

  return docObject;
};

const EmployeeDocuments = ({ empUpDocs, inducBriefUp }) => {
  // Parse the document data
  const documents = parseDocumentData(empUpDocs);

  return (
    <section className="py-8 bg-gray-50 rounded-lg">
      <h6 className="uppercase text-xl font-semibold text-dark_grey mb-6">
        Employee Documents:
      </h6>
      <div className="space-y-6">
        {Object.keys(documents).length > 0 ? (
          Object.entries(documents).map(([label, url], index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h6 className="font-semibold text-lg text-gray-800 mb-4">
                {label}
              </h6>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View Document
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No documents available.</p>
        )}
      </div>
    </section>
  );
};

export default EmployeeDocuments;
