import { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

export const SPDropDown = ({ dropDownData, permissionData }) => {
  const [openSections, setOpenSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    Dashboard: [],
    Recruitment: [],
    User: [],
    Employee: [],
    Training: [],
    TimeSheet: [],
    LeaveManagement: [],
    Notification: [],
    Report: [],
    BenefitsAndRewards: [],
  });

  const toggleMenu = (section) => {
    if (openSections.includes(section)) {
      setOpenSections(openSections.filter((item) => item !== section));
    } else {
      setOpenSections([...openSections, section]);
    }
  };

  useEffect(() => {
    if (permissionData) {
      setSelectedItems(permissionData);
    }
  }, [permissionData]);

  const handleItemClick = (item, sectionTitle, sectionItems = []) => {
    // Select or deselect all items in the section
    if (sectionItems.length > 0) {
      const allSelected = sectionItems.every(
        (i) =>
          selectedItems[sectionTitle] && selectedItems[sectionTitle].includes(i) // Check if section exists
      );

      if (allSelected) {
        setSelectedItems((prev) => ({
          ...prev,
          [sectionTitle]: prev[sectionTitle].filter(
            (i) => !sectionItems.includes(i)
          ),
        }));
      } else {
        setSelectedItems((prev) => ({
          ...prev,
          [sectionTitle]: [
            ...(prev[sectionTitle] || []), // Ensure it defaults to an empty array if undefined
            ...sectionItems.filter(
              (i) => !(prev[sectionTitle] || []).includes(i)
            ),
          ],
        }));
      }
    } else {
      // Handle individual item selection
      setSelectedItems((prev) => ({
        ...prev,
        [sectionTitle]: prev[sectionTitle]
          ? prev[sectionTitle].includes(item)
            ? prev[sectionTitle].filter((i) => i !== item)
            : [...(prev[sectionTitle] || []), item]
          : [item], // If section is undefined, initialize it with the item
      }));
    }
  };

  useEffect(() => {
    const nonEmptySelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(
        ([sectionTitle, items]) => items.length > 0
      )
    );
    dropDownData(nonEmptySelectedItems);
  }, [selectedItems]);

  const permissions = [
    {
      Dashboard: [
        "Employee count",
        "Recent Notifications",
        "Attendance",
        "User Action",
        "Birthday Reminder",
        "New Joinee",
      ],
    },
    {
      User: ["User"],
    },
    {
      Recruitment: [
        "Employee Requisition",
        "Candidate",
        "Apply Employee Requisition",
        "Local CV",
        "Non Local CV",
        "Status",
        "WorkPass Tracking",
      ],
    },
    {
      Employee: [
        "All Employee",
        "Employee Info",
        "Work Info",
        "Work Pass",
        "Medical & Dependent Info",
        "Insurance",
        "Non-Local Accommodation in Brunei",
      ],
    },
    {
      Training: ["HR", "Training Requestor","QA / QC"],
    },
    {
      TimeSheet: ["HO","SBW","ORMC", "Offshore", "BLNG", "View Time Sheet","View Summary"],
    },
    {
      LeaveManagement: [
        "Request Leave",
        "History of leave",
        "Employee Leave Balance",
        "Request Tickets",
      ],
    },
    {
      Notification: ["Notification"],
    },
    {
      Report: ["Report"],
    },
    {
      BenefitsAndRewards: [
        "Leave Benefits",
        "Paternity Benefits",
        "Employee Benefits",
      ],
    },
  ];

  return (
    <section className="w-full">
      {permissions.map((sectionObj, sectionIndex) => {
        const sectionTitle = Object.keys(sectionObj)[0];
        const sectionItems = sectionObj[sectionTitle];

        const allItemsSelected = sectionItems.every(
          (item) =>
            selectedItems[sectionTitle]
              ? selectedItems[sectionTitle].includes(item)
              : false // Check if section exists
        );

        return (
          <div key={sectionIndex}>
            <div className="flex items-center cursor-pointer py-1 px-2 justify-between">
              {/* Click to toggle the sub-items (open/close) */}
              <div
                onClick={() => toggleMenu(sectionTitle)}
                className="flex items-center"
              >
                {openSections.includes(sectionTitle) ? (
                  <IoMdArrowDropdown className="text-2xl" />
                ) : (
                  <IoMdArrowDropright className="text-2xl" />
                )}
                <p className="font-semibold text-lg flex justify-between items-center px-2 w-full">
                  {sectionTitle}
                </p>
              </div>

              {/* Click to select/deselect all sub-items */}
              {openSections.includes(sectionTitle) && (
                <span
                  className="text-dark_grey cursor-pointer"
                  onClick={() =>
                    handleItemClick(null, sectionTitle, sectionItems)
                  } // Pass null for item when selecting all
                >
                  {allItemsSelected ? (
                    <FaCheckCircle />
                  ) : (
                    <MdOutlineRadioButtonUnchecked className="text-lg" />
                  )}
                </span>
              )}
            </div>

            {openSections.includes(sectionTitle) && (
              <ul className="pl-6 space-y-1">
                {sectionItems.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    onClick={() => handleItemClick(item, sectionTitle)} // Pass the sectionTitle to handleItemClick
                    className="flex justify-between items-center cursor-pointer p-2"
                  >
                    <span>{item}</span>
                    <span className="text-dark_grey">
                      {selectedItems[sectionTitle] &&
                      selectedItems[sectionTitle].includes(item) ? ( // Check if section exists
                        <FaCheckCircle />
                      ) : (
                        <MdOutlineRadioButtonUnchecked className="text-lg" />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
};
