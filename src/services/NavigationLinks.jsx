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
import { FilterTable } from "../pages/reports/FilterTable";
import { Termination } from "../pages/reports/Termination";
import { ProbationReview } from "../pages/reports/ProbationReview";
import { ContractReview } from "../pages/reports/ContractReview";
import { EmpPE } from "../pages/reports/EmpPE";
import { PassportExpiry } from "../pages/reports/PassportExpiry";
import { LDexpiry } from "../pages/reports/LDexpiry";
import { EmploymentMedical } from "../pages/reports/EmploymentMedical";
import { NewRecruit } from "../pages/reports/NewRecruit";
import { TrainingRCData } from "../pages/reports/TrainingRCData";
import { LbdKpi } from "../pages/reports/LbdKpi";
import { GroupHSData } from "../pages/reports/GroupHSData";
import { LeavePassData } from "../pages/reports/LeavePassData";
import { ContractPDF } from "../pages/reports/ContractPDF";
import { PromotionRep } from "../pages/reports/PromotionRep";
import { ServiceRecordedMD } from "../components/migratingData/ServiceRecordedMD";
import { PassportValidMD } from "../components/migratingData/PassportValidMD";
import { NlmsMD } from "../components/migratingData/NlmsMD";
import { LabourMedicalInfoMD } from "../components/migratingData/LabourMedicalInfoMD";
import { ContractFormPDF } from "../pages/reports/ContractFormPDF";
import { ProbationPDF } from "../pages/reports/ProbationPDF";
import { FiLoader } from "react-icons/fi";
// import ForgotEmail from "../pages/forgotPassword/ForgotEmail";
// import ForgotOtp from "../pages/forgotPassword/ForgotOtp";
// import ForgotPassword from "../pages/forgotPassword/ForgotPassword";

const client = generateClient();

const NavigationLinks = () => {
  const loginAuth = localStorage.getItem("userID")?.toUpperCase();
  const [mainCategories, setMainCategories] = useState([]);
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  // const [defaultRoute, setDefaultRoute] = useState("");
  const [firstCategory, setFirstCategory] = useState(null); // To hold the first matching category

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUserData() {
      try {
        // const userID = localStorage.getItem("userID").toUpperCase();
        const userType = localStorage.getItem("userType");
        const userID = localStorage.getItem("userID");
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
        setUserID(userID);
        setUserType(userType);
        setMainCategories(categories);
        setFirstCategory(findFirstValidCategory(categories));
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
  const findFirstValidCategory = (categories) => {
    // Define the order of priorities for the categories
    const categoryOrder = [
      "Dashboard",
      "User",
      "Recruitment",
      "Employee",
      "Training",
      "TimeSheet",
      "Insurance",
      "LeaveManagement",
      "Notification",
      "Report",
      "BenefitsAndRewards",
    ];

    // Return the first category that matches the user's permissions and is valid (exists in categories)
    return categoryOrder.find((category) => categories.includes(category));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[82vh] bg-transparent">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-semibold">Loading </p>
          <p>
            <FiLoader className="animate-spin mt-[4px]" size={15} />
          </p>
        </div>
      </div>
    );
  }

  const allowedCategories = mainCategories.filter((category) =>
    [
      "Dashboard",
      "User",
      "Recruitment",
      "Employee",
      "Training",
      "TimeSheet",
      "LeaveManagement",
      "Insurance",
      "Notification",
      "Report",
      "BenefitsAndRewards",
    ].includes(category)
  );

  return (
      <Routes>
        {/* <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/forgotEmail" element={<ForgotEmail />} />
        <Route path="/forgotOtp" element={<ForgotOtp />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} /> */}
        <Route path="/migrationDataID" element={<IDDetailsMD />} />
        <Route path="/migrationDataEPI" element={<EmpPersonalMD />} />
        <Route path="/migrationDataWorkI" element={<WorkInfoMD />} />
        <Route path="/migrationDataService" element={<ServiceRecordedMD />} />
        <Route path="/migrationDataEmpInsu" element={<EmpInsuranceMD />} />
        <Route path="/migrationDataLeaveDetails" element={<LeaveDetailsMD />} />
        <Route path="/migrationDataNLA" element={<NonLocalAccMD />} />
        <Route path="/migrationDataDN" element={<DNDetailsMD />} />
        <Route path="/migrationDataTerminated" element={<TerminatedMD />} />
        <Route path="/migrationDataBJL" element={<BJLDetailsMD />} />{" "}
        {/* Redirect to the first matching allowed category */}
        <Route path="/migrationPPValid" element={<PassportValidMD />} />
        <Route path="/migrationLMInfo" element={<LabourMedicalInfoMD />} />
        <Route path="/migrationNlms" element={<NlmsMD />} />
        <Route
          path="/"
          element={<Navigate to={`/${firstCategory?.toLowerCase()}`} />}
        />
        {/* Personal Information Route */}
        <Route path="/personalInformation" element={<PersonalInformation />} />
        {/* Only show the routes that are in allowedCategories */}
        {allowedCategories.includes("Dashboard") && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {allowedCategories.includes("User") && (
          <>
            <Route path="/user" element={<User />} />
            <Route path="/addNewForm" element={<AddNewForm />} />
          </>
        )}
        {allowedCategories.includes("Recruitment") && (
          <>
            <Route path="/recruitment" Component={Recruitments} />
            {/* <Route path="/applyemployreq" Component={ApplyEmployReq}/> */}
            <Route path="/recrutiles" Component={RecruTiles}>
              <Route path="candidate" element={<Candidate />} />
              <Route path="applyemployreq" element={<ApplyEmployReq />} />
              <Route path="listofcandi" element={<ListofCandi />} />
              <Route path="localcandi" element={<Localcandi />} />
              <Route path="nonloccandi" element={<NonlocCandi />} />
              <Route path="employreq" element={<EmployReq />} />
              {/* <Route path="employreq" element={<EmployReq />} /> */}
              <Route path="status" element={<Status />} />
              <Route path="workpasstracking" element={<WorkpassTracking />} />
            </Route>
            <Route path="/hiringJob" element={<HiringJob />} />
            <Route path="/postJob" element={<CreateJob />} />
            <Route path="/addCandidates" Component={AddCandidates}>
              <Route index element={<ApplicantDetails />} />
              <Route path="personalDetails" element={<PersonalDetails />} />
              <Route path="educationDetails" element={<EducationDetails />} />
              <Route path="otherDetails" element={<OtherDetails />} />
            </Route>
          </>
        )}
        {allowedCategories.includes("Employee") && (
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
              <Route path="bankGuarantee" element={<BankGuarantee />} />
              <Route path="jitpa" element={<Jitpa />} />
              <Route path="labourDeposit" element={<LabourDeposit />} />
              <Route path="immigration" element={<Immigration />} />
            </Route>

            <Route path="/allempDetails" Component={AllEmployee} />
            <Route path="/employee" Component={Employee} />
            <Route path="/empRequistion" Component={EmpRequisitionForm} />

            <Route path="/employeeInfo" Component={EmployeeInfo} />
            <Route path="/workInfo" Component={WorkInfo} />
            <Route path="/workPass" Component={WorkPass} />
            <Route path="/nonLocalAcco" Component={NonLocalAcco} />
            <Route path="/labourImmigration" Component={LabourImmigration} />
          </>
        )}
        {allowedCategories.includes("Insurance") && (
          <>
            <Route path="/insuranceHr" Component={HrInsuranceNav}>
              <Route index element={<Insurance />} />
              <Route path="groupHS" element={<GroupHS />} />
              <Route path="workmenComp" element={<WorkmenComp />} />
              <Route path="travelling" element={<Travelling />} />
              <Route path="personalAcci" element={<PersonalAcci />} />
              <Route path="insuranceClaim" element={<InsuranceClaim />} />
            </Route>
          </>
        )}
        {allowedCategories.includes("Training") && (
          <>
            <Route path="/training" Component={Training} />
            <Route path="/training/AcTc" Component={AddCourse} />
            <Route
              path="/training/trainingCertify"
              Component={TrainingCertificatesForm}
            />
            <Route path="/trainingReq" Component={AddEmpReq} />
            <Route path="/trainingReq/add" Component={AddEmployeeForm} />
            <Route path="/trainingReq/view" Component={ViewAddEmp} />
            <Route path="/blngCertify" Component={BlngCertify} />
            <Route path="/omgCertify" Component={OMEDataCertify} />
            <Route path="/training/hr" Component={HRSplit} />
            <Route path="/training/tcView" Component={TcViewData} />
          </>
        )}
        {allowedCategories.includes("TimeSheet") && (
          <>
            <Route path="/timeSheet" element={<TimeSheet />} />
            <Route path="/timesheetHO" element={<HO />} />
            <Route path="/timesheetSBW" element={<SBW />} />
            <Route path="/timesheetORMC" element={<ORMC />} />
            <Route path="/timesheetOffshore" element={<Offshore />} />
            <Route path="/timesheetBlng" element={<Blng />} />

            <Route path="/viewTimesheet" element={<ViewTimeSheet />} />
            <Route path="/viewTSheetList" element={<ListTimeSheet />} />

            <Route path="/viewTsheetDetails" element={<VTimeSheetTable />} />

            <Route path="/viewSummary" element={<ViewSummary />} />
          </>
        )}
        {allowedCategories.includes("LeaveManagement") && (
          <Route path="/leaveManagement" Component={LeaveManage}>
            <Route index element={<LMTable />} />
            <Route path="historyLeave" element={<HOLTable />} />
            <Route path="leaveBalance" element={<EmpLeaveBalance />} />
            <Route path="requestTickets" element={<TicketsTable />} />
          </Route>
        )}
        {allowedCategories.includes("Notification") && (
          <Route path="/notifications" Component={Notifications} />
        )}
        {allowedCategories.includes("Report") && (
          <>
            <Route path="/reports" Component={Reports} />
            <Route path="/probForm" Component={ProbationForm} />
            <Route path="/contractForms" Component={ContractFormPDF} />

            <Route path="/rm" Component={RM} />
            <Route path="/filterTable" Component={FilterTable} />
            <Route path="/resignation" Component={Resignation} />
            <Route path="/termination" Component={Termination} />
            <Route path="/probationReview" Component={ProbationReview} />
            <Route path="/contractReview" Component={ContractReview} />
            <Route path="/empPassExpiry" Component={EmpPE} />
            <Route path="/ldExpiry" Component={LDexpiry} />
            <Route path="/passportExpiry" Component={PassportExpiry} />
            <Route path="/empMedical" Component={EmploymentMedical} />
            <Route path="/newRecruit" Component={NewRecruit} />
            <Route path="/trainingRC" Component={TrainingRCData} />
            <Route path="/lbdKpi" Component={LbdKpi} />
            <Route path="/groupHS" Component={GroupHSData} />
            <Route path="/leavePass" Component={LeavePassData} />
            <Route
              path="/contractForms"
              element={<ContractPDF userID={userID} userType={userType} />}
            />
            <Route path="/promotion" Component={PromotionRep} />
            <Route path="/probFormUpdate" Component={ProbationPDF} />
            <Route
              path="/ContractUp"
              element={<ContractPDF userID={userID} userType={userType} />}
            />
          </>
        )}
        {allowedCategories.includes("BenefitsAndRewards") && (
          <Route path="/benfitsAndrewards" Component={BenfitsAndRewards} />
        )}
        <Route path="/logout" Component={Logout} />
        {/* Default redirect route if no category is matched */}
        <Route
          path="*"
          element={<Navigate to={`/${firstCategory?.toLowerCase()}`} />}
        />
      </Routes>
  );
};
export default NavigationLinks;
