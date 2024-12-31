import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Employee } from "../pages/employees/Employee";
import { Training } from "../pages/training/Training";
import { TimeSheet } from "../pages/timeSheet/TimeSheet";
import { Reports } from "../pages/reports/Reports";
import { Recruitments } from "../pages/recruitments/Recruitments";
import { LeaveManage } from "../pages/leaveManagement/LeaveManage";
import { BenfitsAndRewards } from "../pages/benfitsAndrewards/BenfitsAndRewards";
import { Notifications } from "../pages/notifications/Notifications";
import { Logout } from "../pages/logout/Logout";
import { ApplicantDetails } from "../pages/recruitments/ApplicatDetails";
import { PersonalDetails } from "../pages/recruitments/PersonalDetails";
import { EducationDetails } from "../pages/recruitments/EducationaDetails";
import { OtherDetails } from "../pages/recruitments/OtherDetails";
import { RecruTiles } from "../pages/recruitments/RecruTiles";
import { Candidate } from "../pages/recruitments/Candidate";
import { Localcandi } from "../pages/recruitments/LocalCandi";
import { NonlocCandi } from "../pages/recruitments/NonlocCandi";
import { AddCandidates } from "../pages/recruitments/AddCandidates";
import { User } from "../pages/user/User";
import { EmployReq } from "../pages/recruitments/empRequisition/EmployReq";
import { Status } from "../pages/recruitments/status/Status";
import { WorkpassTracking } from "../pages/recruitments/workPassTrack/WorkpassTracking";
import { AllEmployee } from "../pages/employees/AllEmployee";
import { EmployeeInfo } from "../pages/employees/employeeInfos/EmployeeInfo";
import { WorkInfo } from "../pages/employees/workInfoFile/WorkInfo";
import LabourImmigration from "../pages/employees/medicalDep/LabourImmigration";
import { EmpRequisitionForm } from "../pages/recruitments/empRequisition/EmpRequisitionForm";
import { InsuranceNav } from "../pages/employees/insurance/InsuranceNav";
import { EmployeeInsurance } from "../pages/employees/insurance/EmployeeInsurance";
import { DependentInsurance } from "../pages/employees/insurance/DependentInsurance";
import { WorkPass } from "../pages/employees/workPass/WorkPass";
import { NonLocalAcco } from "../pages/employees/NonLocalAcco";
import { ChangePassword } from "../pages/changePassword/ChangePassword";
import { PersonalInformation } from "../pages/profile/PersonalInformation";
import { Onshore } from "../pages/timeSheet/Onshore";
import { Offshore } from "../pages/timeSheet/Offshore";
import { Blng } from "../pages/timeSheet/Blng";
import { ViewTimeSheet } from "../pages/timeSheet/ViewTimeSheet";
import { AddCourse } from "../pages/training/trainingForm/AddCourse";
import { AddEmployeeForm } from "../pages/training/trainingForm/AddEmployeeForm";
import { AddNewForm } from "../pages/user/AddUserForm";
import React, { useEffect, useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { listUsers } from "../graphql/queries";
import { Sawp } from "../pages/employees/workPass/Sawp";
import { Doe } from "../pages/employees/workPass/Doe";
import { Nlms } from "../pages/employees/workPass/Nlms";
import { BankGuarantee } from "../pages/employees/workPass/BankGuarantee";
import { Jitpa } from "../pages/employees/workPass/Jitpa";
import { LabourDeposit } from "../pages/employees/workPass/LabourDeposit";
import { Immigration } from "../pages/employees/workPass/Immigration";
import { HO } from "../pages/timeSheet/HO";
import { SBW } from "../pages/timeSheet/SBW";
import { ORMC } from "../pages/timeSheet/ORMC";
import { ListofCandi } from "../pages/recruitments/ListofCandi";
import { ApplyEmployReq } from "../pages/recruitments/empRequisition/ApplyEmployReq";
import { ProbationForm } from "../pages/reports/ProbationForm";
import { ViewSummary } from "../pages/timeSheet/ViewSummary";
import { HrInsuranceNav } from "../pages/insuranceSid/HrInsuranceNav";
import { InsuranceClaim } from "../pages/insuranceSid/InsuranceClaim";
import { GroupHS } from "../pages/insuranceSid/GroupHS";
import { WorkmenComp } from "../pages/insuranceSid/WorkmenComp";
import { Travelling } from "../pages/insuranceSid/Travelling";
import { PersonalAcci } from "../pages/insuranceSid/PersonalAcci";
import { CreateJob } from "../pages/recruitments/CreateJob";
import { HiringJob } from "../pages/recruitments/HiringJob";
import { Insurance } from "../pages/insuranceSid/Insurance";
import { ViewAddEmp } from "../pages/training/trainingForm/ViewAddEmp";
import { OMEDataCertify } from "../pages/training/trainingForm/OMEDataCertify";
import { LMTable } from "../pages/leaveManagement/LMTable";
import { HOLTable } from "../pages/leaveManagement/HOLTable";
import { EmpLeaveBalance } from "../pages/leaveManagement/EmpLeaveBalance";
import { TicketsTable } from "../pages/leaveManagement/TicketsTable";
import { ListTimeSheet } from "../pages/timeSheet/ListTimeSheet";
import { VTimeSheetTable } from "../pages/timeSheet/VTimeSheetTable";
import { RM } from "../pages/reports/RM";
import { Resignation } from "../pages/reports/Resignation";
import { TempIDProvider } from "../utils/TempIDContext";
import { AddEmpReq } from "../pages/training/trainingForm/AddEmpReq";
import { BlngCertify } from "../pages/training/trainingForm/BlngCertify";
import { HRSplit } from "../pages/training/trainingForm/HRSplit";
import { TcViewData } from "../pages/training/trainingForm/TcViewData";
import { TrainingCertificatesForm } from "../pages/training/trainingForm/TrainingCertificatesForm";
import { IDDetailsMD } from "../components/migratingData/IDDetailsMD";
import { EmpPersonalMD } from "../components/migratingData/EmpPersonalMD";
import { WorkInfoMD } from "../components/migratingData/WorkInfoMD";
import { EmpInsuranceMD } from "../components/migratingData/EmpInsuranceMD";
import { LeaveDetailsMD } from "../components/migratingData/LeaveDetailsMD";
import { NonLocalAccMD } from "../components/migratingData/NonLocalAccMD";
import { DNDetailsMD } from "../components/migratingData/DNDetailsMD";
import { TerminatedMD } from "../components/migratingData/TerminatedMD";
import { BJLDetailsMD } from "../components/migratingData/BJLDetailsMD";

const client = generateClient();

const NavigationLinks = () => {
  const loginAuth = localStorage.getItem("userID")?.toUpperCase();
  const [mainCategories, setMainCategories] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUserData() {
      try {
        // const userID = localStorage.getItem("userID").toUpperCase();
        const userType = localStorage.getItem("userType");
        const res = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              and: [
                { empID: { eq: loginAuth } },
                { selectType: { eq: userType } },
              ],
            },
          },
        });

        const result = res?.data?.listUsers?.items[0];
        // console.log(result);
        const permissionsString = result?.setPermissions[0];
        const categories = extractMainCategories(permissionsString);
        // console.log(categories.includes("Dashboard"));

        setMainCategories(categories);
        if (categories.includes("Dashboard")) {
          setDefaultRoute("/dashboard");
        } else if (categories.includes("User")) {
          setDefaultRoute("/user");
        } else if (categories.includes("Recruitment")) {
          setDefaultRoute("/recruitment");
        } else if (categories.includes("Employee")) {
          setDefaultRoute("/employee");
        } else if (categories.includes("Insurance")) {
          setDefaultRoute("/insuranceHr");
        } else if (categories.includes("Training")) {
          setDefaultRoute("/training");
        } else if (categories.includes("TimeSheet")) {
          setDefaultRoute("/timeSheet");
        } else if (categories.includes("LeaveManagement")) {
          setDefaultRoute("/leaveManage");
        } else if (categories.includes("Notification")) {
          setDefaultRoute("/notifications");
        } else if (categories.includes("Report")) {
          setDefaultRoute("/reports");
        } else if (categories.includes("BenefitsAndRewards")) {
          setDefaultRoute("/benfitsAndrewards");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
          <p className="text-18 font-serif font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <TempIDProvider>
      <Routes>
        {/* Login and Change Password Routes */}
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/migrationDataID" element={<IDDetailsMD />} />
        <Route path="/migrationDataEPI" element={<EmpPersonalMD />} />
        <Route path="/migrationDataWorkI" element={<WorkInfoMD />} />
        <Route path="/migrationDataEmpInsu" element={<EmpInsuranceMD />} />
        <Route path="/migrationDataLeaveDetails" element={<LeaveDetailsMD />} />
        <Route path="/migrationDataNLA" element={<NonLocalAccMD />} />
        <Route path="/migrationDataDN" element={<DNDetailsMD />} />
        <Route path="/migrationDataTerminated" element={<TerminatedMD />} />
        <Route path="/migrationDataBJL" element={<BJLDetailsMD />} />

        {loginAuth && (
          <>
            {/* <Route path="/" element={<Navigate to={defaultRoute} />} /> */}
            {mainCategories.map((show, index) => {
              return (
                <React.Fragment key={index}>
                  <Route path="/" element={<Navigate to={defaultRoute} />} />
                  {/* <Route path="/" element={<Navigate to="/dashboard" />} />{" "} */}
                  <Route
                    path="/personalInformation"
                    Component={PersonalInformation}
                  />
                  {show === "Dashboard" && (
                    <Route path="/Dashboard" Component={Dashboard} />
                  )}
                  {/* User Routes started here */}
                  {show === "User" && (
                    <>
                      {" "}
                      <Route path="/user" Component={User} />
                      <Route path="/addNewForm" Component={AddNewForm} />
                    </>
                  )}
                  {/* Recruitments Routes started here */}
                  {show === "Recruitment" && (
                    <>
                      <Route path="/recruitment" Component={Recruitments} />
                      {/* <Route path="/applyemployreq" Component={ApplyEmployReq}/> */}
                      <Route path="/recrutiles" Component={RecruTiles}>
                        <Route path="candidate" element={<Candidate />} />
                        <Route
                          path="applyemployreq"
                          element={<ApplyEmployReq />}
                        />
                        <Route path="listofcandi" element={<ListofCandi />} />
                        <Route path="localcandi" element={<Localcandi />} />
                        <Route path="nonloccandi" element={<NonlocCandi />} />
                        <Route path="employreq" element={<EmployReq />} />
                        {/* <Route path="employreq" element={<EmployReq />} /> */}
                        <Route path="status" element={<Status />} />
                        <Route
                          path="workpasstracking"
                          element={<WorkpassTracking />}
                        />
                      </Route>
                      <Route path="/hiringJob" element={<HiringJob />} />
                      <Route path="/postJob" element={<CreateJob />} />
                      <Route path="/addCandidates" Component={AddCandidates}>
                        <Route index element={<ApplicantDetails />} />
                        <Route
                          path="personalDetails"
                          element={<PersonalDetails />}
                        />
                        <Route
                          path="educationDetails"
                          element={<EducationDetails />}
                        />
                        <Route path="otherDetails" element={<OtherDetails />} />
                      </Route>
                    </>
                  )}
                  {/*EmployeeRoutes started here */}
                  {show === "Employee" && (
                    <>
                      <Route path="/insuranceAdd" Component={InsuranceNav}>
                        <Route index element={<EmployeeInsurance />} />
                        <Route
                          path="dependentInsurance"
                          element={<DependentInsurance />}
                        />
                      </Route>

                      <Route path="/sawp" Component={WorkPass}>
                        <Route index element={<Sawp />} />
                        <Route path="doe" element={<Doe />} />
                        <Route path="nlms" element={<Nlms />} />
                        <Route
                          path="bankGuarantee"
                          element={<BankGuarantee />}
                        />
                        <Route path="jitpa" element={<Jitpa />} />
                        <Route
                          path="labourDeposit"
                          element={<LabourDeposit />}
                        />
                        <Route path="immigration" element={<Immigration />} />
                      </Route>

                      <Route path="/allempDetails" Component={AllEmployee} />
                      <Route path="/employee" Component={Employee} />
                      <Route
                        path="/empRequistion"
                        Component={EmpRequisitionForm}
                      />

                      <Route path="/employeeInfo" Component={EmployeeInfo} />
                      <Route path="/workInfo" Component={WorkInfo} />
                      <Route path="/workPass" Component={WorkPass} />
                      <Route path="/nonLocalAcco" Component={NonLocalAcco} />
                      <Route
                        path="/labourImmigration"
                        Component={LabourImmigration}
                      />
                    </>
                  )}
                  {show === "Insurance" && (
                    <>
                      <Route path="/insuranceHr" Component={HrInsuranceNav}>
                        <Route index element={<Insurance />} />
                        <Route path="groupHS" element={<GroupHS />} />
                        <Route path="workmenComp" element={<WorkmenComp />} />
                        <Route path="travelling" element={<Travelling />} />
                        <Route path="personalAcci" element={<PersonalAcci />} />
                        <Route
                          path="insuranceClaim"
                          element={<InsuranceClaim />}
                        />
                      </Route>
                    </>
                  )}
                  {show === "LeaveManagement" && (
                    <Route path="/leaveManage" Component={LeaveManage}>
                      <Route index element={<LMTable />} />
                      <Route path="historyLeave" element={<HOLTable />} />
                      <Route
                        path="leaveBalance"
                        element={<EmpLeaveBalance />}
                      />
                      <Route path="requestTickets" element={<TicketsTable />} />
                    </Route>
                  )}
                  {show === "Notification" && (
                    <Route path="/notifications" Component={Notifications} />
                  )}
                  {show === "Report" && (
                    <>
                      <Route path="/reports" Component={Reports} />
                      <Route path="/probForm" Component={ProbationForm} />

                      <Route path="/rm" Component={RM} />
                      <Route path="/resignation" Component={Resignation} />
                    </>
                  )}
                  {show === "BenefitsAndRewards" && (
                    <Route
                      path="/benfitsAndrewards"
                      Component={BenfitsAndRewards}
                    />
                  )}
                  {/* TimeSheetRoutes started here */}
                  {show === "TimeSheet" && (
                    <>
                      <Route path="/timeSheet" element={<TimeSheet />} />
                      <Route path="/timesheetHO" element={<HO />} />
                      <Route path="/timesheetSBW" element={<SBW />} />
                      <Route path="/timesheetORMC" element={<ORMC />} />
                      <Route path="/timesheetOffshore" element={<Offshore />} />
                      <Route path="/timesheetBlng" element={<Blng />} />

                      <Route
                        path="/viewTimesheet"
                        element={<ViewTimeSheet />}
                      />
                      <Route
                        path="/viewTSheetList"
                        element={<ListTimeSheet />}
                      />

                      <Route
                        path="/viewTsheetDetails"
                        element={<VTimeSheetTable />}
                      />

                      <Route path="/viewSummary" element={<ViewSummary />} />
                    </>
                  )}
                  {/* Tranining Routes Started here */}
                  {show === "Training" && (
                    <>
                      <Route path="/training" Component={Training} />
                      <Route path="/training/AcTc" Component={AddCourse} />
                      <Route
                        path="/training/trainingCertify"
                        Component={TrainingCertificatesForm}
                      />
                      <Route path="/trainingReq" Component={AddEmpReq} />
                      <Route
                        path="/trainingReq/add"
                        Component={AddEmployeeForm}
                      />
                      <Route path="/trainingReq/view" Component={ViewAddEmp} />
                      <Route path="/blngCertify" Component={BlngCertify} />
                      <Route path="/omgCertify" Component={OMEDataCertify} />
                      <Route path="/training/hr" Component={HRSplit} />
                      <Route path="/training/tcView" Component={TcViewData} />
                    </>
                  )}
                  <Route path="/logout" Component={Logout} />
                </React.Fragment>
              );
            })}
          </>
        )}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </TempIDProvider>
  );
};
export default NavigationLinks;
