import { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { RiCheckboxBlankLine } from "react-icons/ri";

export const SPDropDown = ({
  dropDownData,
  permissionData, 
  deletePermissionData,
}) => {
  const [openSections, setOpenSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    Dashboard: [],
    Recruitment: [],
    User: [],
    Employee: [],
    Insurance: [],
    Training: [],
    TimeSheet: [],
    LeaveManagement: [],
    Notification: [],
    Report: [],
    BenefitsAndRewards: [],
  });
  const [deleteSelectedItems, setDeleteSelectedItems] = useState({});
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
      setDeleteSelectedItems(deletePermissionData?.deleteAccess);
      // console.log("permissionData : ", permissionData);
    }
  }, [permissionData, deletePermissionData]);

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

  const handleDeleteClick = (item, sectionTitle) => {
    setDeleteSelectedItems((prev) => {
      const isSelected = prev?.[sectionTitle]?.includes(item);
      return {
        ...prev,
        [sectionTitle]: isSelected
          ? prev?.[sectionTitle].filter((i) => i !== item)
          : [...(prev?.[sectionTitle] || []), item],
      };
    });
  };

  useEffect(() => {
    const nonEmptySelectedItems = Object.fromEntries(
      Object.entries(selectedItems).filter(
        ([sectionTitle, items]) => items.length > 0
      )
    );
    // console.log("nonEmptySelectedItems : ", nonEmptySelectedItems);
    dropDownData(nonEmptySelectedItems, deleteSelectedItems);
    // console.log("deleteSelectedItems : ", deleteSelectedItems);
  }, [selectedItems, deleteSelectedItems]);

  const permissions = [
    {
      Dashboard: [
        "Employee count",
        "Recent Notifications",
        "Application Received",
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
        "Hiring Job",
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
      Insurance: [
        "Insurance",
        //  "Insurance Info", "Insurance Claim"
      ],
    },
    {
      Training: ["HR", "Training Requestor", "BLNG", "OME"],
    },
    {
      TimeSheet: [
        "HO",
        "SBW",
        "ORMC",
        "Offshore",
        "Offshore's ORMC",
        "BLNG",
        "View Time Sheet",
        "View Summary",
      ],
    },
    {
      LeaveManagement: ["LeaveManagement"],
    },
    {
      Notification: ["Notification"],
    },
    {
      Report: [
        "Recruitment & Mobilization",
        "Resignation",
        "Termination",
        "Probation Review",
        "Probation Form Update",
        "Contract Expiry Review",
        "Contract Expiry Form Update",
        "Employment Pass Expiry",
        "LD Expiry",
        "Passport Expiry",
        "Employment Medical",
        "New Recruitment",
        "Training Records",
        "LBD KPI",
        "Group H&S",
        "Leave Passage",
        "Promotion",
      ],
    },
    {
      BenefitsAndRewards: ["BenefitsAndRewards"],
    },
  ];

  const deletableSubtopics = {
    Recruitment: [
      "Status",
      "WorkPass Tracking",
      "Candidate",
      "Local CV",
      "Non Local CV",
      "Hiring Job",
    ],
    User: ["User"],
    
    Insurance: [
      "Insurance",
    ],
    Employee: [
      "Employee Info",
      "Work Info",
      "Work Pass",
      "Medical & Dependent Info",
      "Insurance",
    ],
    Training: ["HR", "Training Requestor"],
  };

  return (
    <section className="w-full">
      <div className="flex  text_size_3 p-3 ">
        <div className="w-4/6 pl-5">Module</div>
        <div className="w-1/6 text-right">Delete</div>
        <div className="w-1/6 text-right">Access</div>
      </div>
      {permissions.map((sectionObj, sectionIndex) => {
        const sectionTitle = Object.keys(sectionObj)[0] || [];
        const sectionItems = sectionObj[sectionTitle] || [];

        const allItemsSelected = sectionItems.every(
          (item) =>
            selectedItems[sectionTitle]
              ? selectedItems[sectionTitle].includes(item)
              : false // Check if section exists
        );
        return (
          <div key={sectionIndex}>
            <div className="flex items-center cursor-pointer py-1 px-2 justify-between">
              <div
                onClick={() => toggleMenu(sectionTitle)}
                className="flex items-center w-full"
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
                  className="text-dark_grey cursor-pointer pr-7"
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
            {openSections?.includes(sectionTitle) && (
              <ul className="pl-6 space-y-1 pr-7">
                {sectionItems?.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex justify-between items-center cursor-pointer p-2 gap-20"
                  >
                    <span className="w-full">{item}</span>

                    {deletableSubtopics?.[sectionTitle]?.includes(item) && (
                      <span
                        className="text-dark_grey cursor-pointer"
                        onClick={() => handleDeleteClick(item, sectionTitle)}
                      >
                        {deleteSelectedItems?.[sectionTitle]?.includes(item) ? (
                          <MdCheckBox />
                        ) : (
                          <RiCheckboxBlankLine className="text-lg" />
                        )}
                      </span>
                    )}
                    <span
                      className="text-dark_grey w"
                      onClick={() => handleItemClick(item, sectionTitle)}
                    >
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
