import React from 'react';

const TabNavigation = ({ activeTab, handleTabClick }) => {
  const tabs = [
    "Personal Details",
    "Educational Details",
    "Family Details",
    "Medical Details",
    "Accommodation Details",
    "Insurance Details",
    "Work Info",
    "Work Pass",
  ];

  return (
    <div className="sticky top-11 bg-white flex justify-between items-center  z-40">
      <p className="text_size_5">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 cursor-pointer ${
              activeTab === index && "after:bg-primary"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab} {index < tabs.length - 1 && " -> "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TabNavigation;
