import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardIcons,
  EmployeeIcons,
  InsuranceIcons,
  LeaveIcons,
  LogoutIcons,
  NotificationIcons,
  RecruitmentIcons,
  ReportIcons,
  RewardIcons,
  TimeIcons,
  TrainingIcons,
  UserIcons,
} from "./SvgIcons";
import { signOut } from "@aws-amplify/auth";
import { generateClient } from "@aws-amplify/api";
import { listUsers } from "../graphql/queries";
import {
  EmployeePaths,
  InsurancePaths,
  LeaveManagement,
  RecruitmentPaths,
  ReportPaths,
  TimePaths,
  TrainingPaths,
  UserPaths,
} from "./RouterPaths";
// import { useData } from "../services/Api";
const client = generateClient();
const Sidebar = () => {
  const location = useLocation();
  // const [userData, setUserData] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await client.graphql({ query: listUsers,variables:{limit:20000} });
        const result = res?.data?.listUsers?.items;
        const userID = localStorage.getItem("userID");
        const userType = localStorage.getItem("userType");
        const filteredResults = result.filter((val) => {
          // console.log(val);
        
          if (val.empID.toString().toLowerCase() === userID.toString() && val.selectType === userType) {
            const empID = val.empID.toString().toLowerCase();
            const isEqual = empID === userID.toString().toLowerCase();
            return isEqual;
          }
        });
        
        if (filteredResults.length > 0) {
          const permissionsString = filteredResults[0].setPermissions[0];
          // console.log(permissionsString);
          
          const categories = extractMainCategories(permissionsString);
          // const desiredOrder = ["Dashboard", "User", "Recruitment","Employee","Training","Time Sheet" ,"Leave Management" ,"Notification center" ,"Report","Benefits & Rewards"];
          const orderedCategories = sortCategories(categories, desiredOrder);
          setMainCategories(orderedCategories);
        } 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const extractMainCategories = (permissionsString) => {
    const regex = /(\w+)=\[/g;
    const matches = [];
    let match;
    while ((match = regex.exec(permissionsString)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };
  const sortCategories = (categories, desiredOrder) => {
    return categories.sort((a, b) => {
      return desiredOrder.indexOf(a) - desiredOrder.indexOf(b);
    });
  };
  const desiredOrder = [
    "Dashboard",
    "User",
    "Recruitment",
    "Employee",
    "Insurance",
    "Training",
    "TimeSheet",
    "LeaveManagement",
    "Notification",
    "Report",
    "BenefitsAndRewards",
  ];

  const isAnyActive = (paths) => paths.includes(location.pathname);

  return (
    <aside className="w-64 fixed top-0 left-0 z-40 h-screen pt-20 bg-secondary  text-white text_size_4 ">
      <section className="h-screen overflow-y-auto p-4 py-14 flex flex-col scrollbar-hide">
        {mainCategories.map((category, index) => {
          return (
            <div
              key={index}
              className="flex justify-between flex-col w-full pb-10 gap-4 "
            >
              {category === "Dashboard" && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 pl-1 rounded-lg ${
                      isActive ? "bg-primary text-secondary" : ""
                    }`
                  }
                >
                  <span>
                    {location.pathname === "/dashboard" ? (
                      <DashboardIcons color="#303030" />
                    ) : (
                      <DashboardIcons color="white" />
                    )}
                  </span>
                  Dashboard
                </NavLink>
              )}
              {category === "User" && (
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isAnyActive(UserPaths) ? "bg-primary text-secondary" : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(UserPaths) ? (
                      <UserIcons color="#303030" />
                    ) : (
                      <UserIcons color="white" />
                    )}
                  </span>
                  User
                </NavLink>
              )}
              {category === "Recruitment" && (
                <NavLink
                  to="/recruitment"
                  className={() =>
                    `flex items-center gap-3 py-2 pl-1 rounded-lg ${
                      isAnyActive(RecruitmentPaths)
                        ? "bg-primary text-secondary"
                        : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(RecruitmentPaths) ? (
                      <RecruitmentIcons color="#303030" />
                    ) : (
                      <RecruitmentIcons color="white" />
                    )}
                  </span>
                  Recruitment
                </NavLink>
              )}

              {category === "Employee" && (
                <NavLink
                  to="/employee"
                  className={() =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isAnyActive(EmployeePaths)
                        ? "bg-primary text-secondary"
                        : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(EmployeePaths) ? (
                      <EmployeeIcons color="#303030" />
                    ) : (
                      <EmployeeIcons color="white" />
                    )}
                  </span>
                  Employee
                </NavLink>
              )}


              {category === "Insurance" && (
                <NavLink
                  to="/insuranceHr"
                  className={() =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isAnyActive(InsurancePaths)
                        ? "bg-primary text-secondary"
                        : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(InsurancePaths) ? (
                      <InsuranceIcons color="#303030" />
                    ) : (
                      <InsuranceIcons color="white" />
                    )}
                  </span>
                  Insurance
                </NavLink>
              )}

              {category === "Training" && (
                <NavLink
                  to="/training"
                  className={() =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isAnyActive(TrainingPaths)
                        ? "bg-primary text-secondary"
                        : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(TrainingPaths) ? (
                      <TrainingIcons color="#303030" />
                    ) : (
                      <TrainingIcons color="white" />
                    )}
                  </span>
                  Training
                </NavLink>
              )}
              {category === "TimeSheet" && (
                <NavLink
                  to="/timeSheet"
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isAnyActive(TimePaths) ? "bg-primary text-secondary" : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(TimePaths) ? (
                      <TimeIcons color="#303030" />
                    ) : (
                      <TimeIcons color="white" />
                    )}
                  </span>
                  Time Sheet
                </NavLink>
              )}
              {category === "LeaveManagement" && (
                <NavLink
                  to="/leaveManagement"
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                  isAnyActive(LeaveManagement) ? "bg-primary text-secondary" : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(LeaveManagement) ? (
                      <LeaveIcons color="#303030" />
                    ) : (
                      <LeaveIcons color="white" />
                    )}
                  </span>
                  Leave Management
                </NavLink>
              )}
              {category === "Notification" && (
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isActive ? "bg-primary text-secondary" : ""
                    }`
                  }
                >
                  <span>
                    {location.pathname === "/notifications" ? (
                      <NotificationIcons color="#303030" />
                    ) : (
                      <NotificationIcons color="white" />
                    )}
                  </span>
                  Notification center
                </NavLink>
              )}
              {category === "Report" && (
                <NavLink
                  to="/reports"
                  className={() =>
                    `flex items-center gap-3 py-2 pl-1 rounded-lg ${
                      isAnyActive(ReportPaths)
                        ? "bg-primary text-secondary"
                        : ""
                    }`
                  }
                >
                  <span>
                    {isAnyActive(ReportPaths) ? (
                      <TimeIcons color="#303030" />
                    ) : (
                      <TimeIcons color="white" />
                    )}
                  </span>
                  Report
                </NavLink>
              )}
              {category === "BenefitsAndRewards" && (
                <NavLink
                  to="/benfitsAndrewards"
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 pl-1  rounded-lg ${
                      isActive ? "bg-primary text-secondary" : ""
                    }`
                  }
                >
                  <span>
                    {location.pathname === "/benfitsAndrewards" ? (
                      <RewardIcons color="#303030" />
                    ) : (
                      <RewardIcons color="white" />
                    )}
                  </span>
                  Benefits & Rewards
                </NavLink>
              )}
            </div>
          );
        })}
      </section>
    </aside>
  );
};
export default Sidebar;
