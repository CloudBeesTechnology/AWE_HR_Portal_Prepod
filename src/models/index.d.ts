import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerBlng = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blng, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly weeklySheet?: string[] | null;
  readonly date: string;
  readonly status: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBlng = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blng, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly weeklySheet?: string[] | null;
  readonly date: string;
  readonly status: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Blng = LazyLoading extends LazyLoadingDisabled ? EagerBlng : LazyBlng

export declare const Blng: (new (init: ModelInit<Blng>) => Blng) & {
  copyOf(source: Blng, mutator: (draft: MutableModel<Blng>) => MutableModel<Blng> | void): Blng;
}

type EagerWPTracking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WPTracking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID: string;
  readonly supportletterReqDate: string;
  readonly supportletterReceiveDate: string;
  readonly letterfile: string;
  readonly doesubmitdate: string;
  readonly doeapprovedate: string;
  readonly doeexpirydate: string;
  readonly doefile: string;
  readonly nlmssubmitdate: string;
  readonly submissionrefrenceno: string;
  readonly nlmsapprovedate: string;
  readonly ldreferenceno: string;
  readonly nlmsexpirydate: string;
  readonly nlmsfile: string;
  readonly bgsubmitdate: string;
  readonly bgreceivedate: string;
  readonly referenceno: string;
  readonly bgamount: string;
  readonly bgexpirydate: string;
  readonly bgfile: string;
  readonly tbapurchasedate: string;
  readonly jitpaamount: string;
  readonly jitpaexpirydate: string;
  readonly receiptno: string;
  readonly depositamount: string;
  readonly submitdateendorsement: string;
  readonly jitpafile: string;
  readonly immbdno: string;
  readonly docsubmitdate: string;
  readonly visaapprovedate: string;
  readonly visareferenceno: string;
  readonly visaFile: string;
  readonly departuredate: string;
  readonly arrivaldate: string;
  readonly cityname: string;
  readonly airfare: string;
  readonly airticketfile: string;
  readonly agentname: string;
  readonly mobSignDate: string;
  readonly mobFile: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWPTracking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WPTracking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID: string;
  readonly supportletterReqDate: string;
  readonly supportletterReceiveDate: string;
  readonly letterfile: string;
  readonly doesubmitdate: string;
  readonly doeapprovedate: string;
  readonly doeexpirydate: string;
  readonly doefile: string;
  readonly nlmssubmitdate: string;
  readonly submissionrefrenceno: string;
  readonly nlmsapprovedate: string;
  readonly ldreferenceno: string;
  readonly nlmsexpirydate: string;
  readonly nlmsfile: string;
  readonly bgsubmitdate: string;
  readonly bgreceivedate: string;
  readonly referenceno: string;
  readonly bgamount: string;
  readonly bgexpirydate: string;
  readonly bgfile: string;
  readonly tbapurchasedate: string;
  readonly jitpaamount: string;
  readonly jitpaexpirydate: string;
  readonly receiptno: string;
  readonly depositamount: string;
  readonly submitdateendorsement: string;
  readonly jitpafile: string;
  readonly immbdno: string;
  readonly docsubmitdate: string;
  readonly visaapprovedate: string;
  readonly visareferenceno: string;
  readonly visaFile: string;
  readonly departuredate: string;
  readonly arrivaldate: string;
  readonly cityname: string;
  readonly airfare: string;
  readonly airticketfile: string;
  readonly agentname: string;
  readonly mobSignDate: string;
  readonly mobFile: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WPTracking = LazyLoading extends LazyLoadingDisabled ? EagerWPTracking : LazyWPTracking

export declare const WPTracking: (new (init: ModelInit<WPTracking>) => WPTracking) & {
  copyOf(source: WPTracking, mutator: (draft: MutableModel<WPTracking>) => MutableModel<WPTracking> | void): WPTracking;
}

type EagerEmployeeNonLocalAcco = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmployeeNonLocalAcco, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly accommodation: string;
  readonly accommodationAddress: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmployeeNonLocalAcco = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmployeeNonLocalAcco, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly accommodation: string;
  readonly accommodationAddress: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmployeeNonLocalAcco = LazyLoading extends LazyLoadingDisabled ? EagerEmployeeNonLocalAcco : LazyEmployeeNonLocalAcco

export declare const EmployeeNonLocalAcco: (new (init: ModelInit<EmployeeNonLocalAcco>) => EmployeeNonLocalAcco) & {
  copyOf(source: EmployeeNonLocalAcco, mutator: (draft: MutableModel<EmployeeNonLocalAcco>) => MutableModel<EmployeeNonLocalAcco> | void): EmployeeNonLocalAcco;
}

type EagerLabourMedicalInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LabourMedicalInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly overMD?: string | null;
  readonly overME?: string | null;
  readonly bruhimsRD?: string | null;
  readonly bruhimsRNo?: string | null;
  readonly bruneiMAD?: string | null;
  readonly bruneiME?: string | null;
  readonly uploadFitness?: string | null;
  readonly uploadRegis?: string | null;
  readonly uploadBwn?: string | null;
  readonly dependPass?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLabourMedicalInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LabourMedicalInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly overMD?: string | null;
  readonly overME?: string | null;
  readonly bruhimsRD?: string | null;
  readonly bruhimsRNo?: string | null;
  readonly bruneiMAD?: string | null;
  readonly bruneiME?: string | null;
  readonly uploadFitness?: string | null;
  readonly uploadRegis?: string | null;
  readonly uploadBwn?: string | null;
  readonly dependPass?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LabourMedicalInfo = LazyLoading extends LazyLoadingDisabled ? EagerLabourMedicalInfo : LazyLabourMedicalInfo

export declare const LabourMedicalInfo: (new (init: ModelInit<LabourMedicalInfo>) => LabourMedicalInfo) & {
  copyOf(source: LabourMedicalInfo, mutator: (draft: MutableModel<LabourMedicalInfo>) => MutableModel<LabourMedicalInfo> | void): LabourMedicalInfo;
}

type EagerServiceRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ServiceRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly depEmpDate?: string | null;
  readonly depEmp?: string | null;
  readonly positionRev?: string | null;
  readonly positionRevDate?: string | null;
  readonly revSalary?: string | null;
  readonly revSalaryDate?: string | null;
  readonly revLeavePass?: string | null;
  readonly revLeaveDate?: string | null;
  readonly revAnnualLeave?: string | null;
  readonly revALD?: string | null;
  readonly remarkWI?: string | null;
  readonly uploadPR?: string | null;
  readonly uploadSP?: string | null;
  readonly uploadLP?: string | null;
  readonly uploadAL?: string | null;
  readonly uploadDep?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyServiceRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ServiceRecord, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly depEmpDate?: string | null;
  readonly depEmp?: string | null;
  readonly positionRev?: string | null;
  readonly positionRevDate?: string | null;
  readonly revSalary?: string | null;
  readonly revSalaryDate?: string | null;
  readonly revLeavePass?: string | null;
  readonly revLeaveDate?: string | null;
  readonly revAnnualLeave?: string | null;
  readonly revALD?: string | null;
  readonly remarkWI?: string | null;
  readonly uploadPR?: string | null;
  readonly uploadSP?: string | null;
  readonly uploadLP?: string | null;
  readonly uploadAL?: string | null;
  readonly uploadDep?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ServiceRecord = LazyLoading extends LazyLoadingDisabled ? EagerServiceRecord : LazyServiceRecord

export declare const ServiceRecord: (new (init: ModelInit<ServiceRecord>) => ServiceRecord) & {
  copyOf(source: ServiceRecord, mutator: (draft: MutableModel<ServiceRecord>) => MutableModel<ServiceRecord> | void): ServiceRecord;
}

type EagerEmpLeaveDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmpLeaveDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly annualLeave?: string | null;
  readonly annualLeaveDate?: string | null;
  readonly destinateLeavePass?: string | null;
  readonly durLeavePass?: string | null;
  readonly dateLeavePass?: string | null;
  readonly leavePass?: string | null;
  readonly leavePassRevision?: string | null;
  readonly sickLeave?: string | null;
  readonly sickLeaveDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmpLeaveDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmpLeaveDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly annualLeave?: string | null;
  readonly annualLeaveDate?: string | null;
  readonly destinateLeavePass?: string | null;
  readonly durLeavePass?: string | null;
  readonly dateLeavePass?: string | null;
  readonly leavePass?: string | null;
  readonly leavePassRevision?: string | null;
  readonly sickLeave?: string | null;
  readonly sickLeaveDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmpLeaveDetails = LazyLoading extends LazyLoadingDisabled ? EagerEmpLeaveDetails : LazyEmpLeaveDetails

export declare const EmpLeaveDetails: (new (init: ModelInit<EmpLeaveDetails>) => EmpLeaveDetails) & {
  copyOf(source: EmpLeaveDetails, mutator: (draft: MutableModel<EmpLeaveDetails>) => MutableModel<EmpLeaveDetails> | void): EmpLeaveDetails;
}

type EagerTerminationInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TerminationInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly resignDate?: string | null;
  readonly resignNoticeProb?: string | null;
  readonly resignNoticeConfirm?: string | null;
  readonly reasonResign?: string | null;
  readonly reasonTerminate?: string | null;
  readonly terminateDate?: string | null;
  readonly terminateNoticeProb?: string | null;
  readonly terminateNoticeConfirm?: string | null;
  readonly uploadCont?: string | null;
  readonly uploadProb?: string | null;
  readonly uploadResign?: string | null;
  readonly uploadTerminate?: string | null;
  readonly uploadLeave?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTerminationInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TerminationInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly resignDate?: string | null;
  readonly resignNoticeProb?: string | null;
  readonly resignNoticeConfirm?: string | null;
  readonly reasonResign?: string | null;
  readonly reasonTerminate?: string | null;
  readonly terminateDate?: string | null;
  readonly terminateNoticeProb?: string | null;
  readonly terminateNoticeConfirm?: string | null;
  readonly uploadCont?: string | null;
  readonly uploadProb?: string | null;
  readonly uploadResign?: string | null;
  readonly uploadTerminate?: string | null;
  readonly uploadLeave?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TerminationInfo = LazyLoading extends LazyLoadingDisabled ? EagerTerminationInfo : LazyTerminationInfo

export declare const TerminationInfo: (new (init: ModelInit<TerminationInfo>) => TerminationInfo) & {
  copyOf(source: TerminationInfo, mutator: (draft: MutableModel<TerminationInfo>) => MutableModel<TerminationInfo> | void): TerminationInfo;
}

type EagerEmpWorkInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmpWorkInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly contractStart: string;
  readonly contractEnd: string;
  readonly contractPeriod?: string | null;
  readonly doj: string;
  readonly department: string;
  readonly jobCat: string;
  readonly jobDesc: string;
  readonly otherJobCat?: string | null;
  readonly otherDepartment?: string | null;
  readonly otherPosition?: string | null;
  readonly probationStart?: string | null;
  readonly probationEnd?: string | null;
  readonly position: string;
  readonly relationship: string;
  readonly skillPool: string;
  readonly salaryType: string;
  readonly upgradeDate?: string | null;
  readonly upgradePosition?: string | null;
  readonly workStatus: string;
  readonly workHrs: string;
  readonly workWeek: string;
  readonly workMonth: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmpWorkInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmpWorkInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly contractStart: string;
  readonly contractEnd: string;
  readonly contractPeriod?: string | null;
  readonly doj: string;
  readonly department: string;
  readonly jobCat: string;
  readonly jobDesc: string;
  readonly otherJobCat?: string | null;
  readonly otherDepartment?: string | null;
  readonly otherPosition?: string | null;
  readonly probationStart?: string | null;
  readonly probationEnd?: string | null;
  readonly position: string;
  readonly relationship: string;
  readonly skillPool: string;
  readonly salaryType: string;
  readonly upgradeDate?: string | null;
  readonly upgradePosition?: string | null;
  readonly workStatus: string;
  readonly workHrs: string;
  readonly workWeek: string;
  readonly workMonth: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmpWorkInfo = LazyLoading extends LazyLoadingDisabled ? EagerEmpWorkInfo : LazyEmpWorkInfo

export declare const EmpWorkInfo: (new (init: ModelInit<EmpWorkInfo>) => EmpWorkInfo) & {
  copyOf(source: EmpWorkInfo, mutator: (draft: MutableModel<EmpWorkInfo>) => MutableModel<EmpWorkInfo> | void): EmpWorkInfo;
}

type EagerEmpPersonalInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmpPersonalInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly age?: number | null;
  readonly aTQualify?: string | null;
  readonly alternateNo?: string | null;
  readonly agent?: string | null;
  readonly contactNo: string;
  readonly cob?: string | null;
  readonly contractType?: string | null;
  readonly ctryOfOrigin?: string | null;
  readonly chinese?: string | null;
  readonly dob: string;
  readonly educLevel?: string | null;
  readonly email: string;
  readonly eduDetails?: (string | null)[] | null;
  readonly empBadgeNo?: string | null;
  readonly empType?: string | null;
  readonly familyDetails?: (string | null)[] | null;
  readonly gender: string;
  readonly lang?: string | null;
  readonly marital: string;
  readonly name: string;
  readonly oCOfOrigin?: string | null;
  readonly profilePhoto?: string | null;
  readonly permanentAddress: string;
  readonly position?: string | null;
  readonly sapNo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEmpPersonalInfo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EmpPersonalInfo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly age?: number | null;
  readonly aTQualify?: string | null;
  readonly alternateNo?: string | null;
  readonly agent?: string | null;
  readonly contactNo: string;
  readonly cob?: string | null;
  readonly contractType?: string | null;
  readonly ctryOfOrigin?: string | null;
  readonly chinese?: string | null;
  readonly dob: string;
  readonly educLevel?: string | null;
  readonly email: string;
  readonly eduDetails?: (string | null)[] | null;
  readonly empBadgeNo?: string | null;
  readonly empType?: string | null;
  readonly familyDetails?: (string | null)[] | null;
  readonly gender: string;
  readonly lang?: string | null;
  readonly marital: string;
  readonly name: string;
  readonly oCOfOrigin?: string | null;
  readonly profilePhoto?: string | null;
  readonly permanentAddress: string;
  readonly position?: string | null;
  readonly sapNo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EmpPersonalInfo = LazyLoading extends LazyLoadingDisabled ? EagerEmpPersonalInfo : LazyEmpPersonalInfo

export declare const EmpPersonalInfo: (new (init: ModelInit<EmpPersonalInfo>) => EmpPersonalInfo) & {
  copyOf(source: EmpPersonalInfo, mutator: (draft: MutableModel<EmpPersonalInfo>) => MutableModel<EmpPersonalInfo> | void): EmpPersonalInfo;
}

type EagerIDDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IDDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly bwnIcNo?: string | null;
  readonly bwnIcColour?: string | null;
  readonly bwnIcExpiry?: string | null;
  readonly driveLic?: string | null;
  readonly empUpDocs?: (string | null)[] | null;
  readonly inducBrief?: string | null;
  readonly inducBriefUp?: string | null;
  readonly myIcNo?: string | null;
  readonly nationality: string;
  readonly nationalCat?: string | null;
  readonly otherNation?: string | null;
  readonly otherRace?: string | null;
  readonly otherReligion?: string | null;
  readonly ppNo?: string | null;
  readonly ppIssued?: string | null;
  readonly ppExpiry?: string | null;
  readonly ppDestinate?: string | null;
  readonly preEmp?: string | null;
  readonly preEmpPeriod?: string | null;
  readonly profilePhoto?: string | null;
  readonly race: string;
  readonly religion: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIDDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IDDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly bwnIcNo?: string | null;
  readonly bwnIcColour?: string | null;
  readonly bwnIcExpiry?: string | null;
  readonly driveLic?: string | null;
  readonly empUpDocs?: (string | null)[] | null;
  readonly inducBrief?: string | null;
  readonly inducBriefUp?: string | null;
  readonly myIcNo?: string | null;
  readonly nationality: string;
  readonly nationalCat?: string | null;
  readonly otherNation?: string | null;
  readonly otherRace?: string | null;
  readonly otherReligion?: string | null;
  readonly ppNo?: string | null;
  readonly ppIssued?: string | null;
  readonly ppExpiry?: string | null;
  readonly ppDestinate?: string | null;
  readonly preEmp?: string | null;
  readonly preEmpPeriod?: string | null;
  readonly profilePhoto?: string | null;
  readonly race: string;
  readonly religion: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type IDDetails = LazyLoading extends LazyLoadingDisabled ? EagerIDDetails : LazyIDDetails

export declare const IDDetails: (new (init: ModelInit<IDDetails>) => IDDetails) & {
  copyOf(source: IDDetails, mutator: (draft: MutableModel<IDDetails>) => MutableModel<IDDetails> | void): IDDetails;
}

type EagerCandIToEMP = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CandIToEMP, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly crime?: string | null;
  readonly crimeDesc?: string | null;
  readonly emgDetails?: string[] | null;
  readonly noExperience: string;
  readonly empStatement: string;
  readonly desc?: string | null;
  readonly disease?: string | null;
  readonly diseaseDesc?: string | null;
  readonly liquor?: string | null;
  readonly liquorDesc?: string | null;
  readonly perIS: string;
  readonly perID?: string | null;
  readonly referees?: (string | null)[] | null;
  readonly relatives?: (string | null)[] | null;
  readonly salaryExpectation?: string | null;
  readonly supportInfo?: string | null;
  readonly workExperience?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCandIToEMP = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CandIToEMP, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly crime?: string | null;
  readonly crimeDesc?: string | null;
  readonly emgDetails?: string[] | null;
  readonly noExperience: string;
  readonly empStatement: string;
  readonly desc?: string | null;
  readonly disease?: string | null;
  readonly diseaseDesc?: string | null;
  readonly liquor?: string | null;
  readonly liquorDesc?: string | null;
  readonly perIS: string;
  readonly perID?: string | null;
  readonly referees?: (string | null)[] | null;
  readonly relatives?: (string | null)[] | null;
  readonly salaryExpectation?: string | null;
  readonly supportInfo?: string | null;
  readonly workExperience?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CandIToEMP = LazyLoading extends LazyLoadingDisabled ? EagerCandIToEMP : LazyCandIToEMP

export declare const CandIToEMP: (new (init: ModelInit<CandIToEMP>) => CandIToEMP) & {
  copyOf(source: CandIToEMP, mutator: (draft: MutableModel<CandIToEMP>) => MutableModel<CandIToEMP> | void): CandIToEMP;
}

type EagerLocalMobilization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LocalMobilization, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID?: string | null;
  readonly mobSignDate?: string | null;
  readonly mobFile?: string | null;
  readonly paafApproveDate?: string | null;
  readonly paafFile?: string | null;
  readonly loiIssueDate?: string | null;
  readonly loiAcceptDate?: string | null;
  readonly loiDeclineDate?: string | null;
  readonly declineReason?: string | null;
  readonly loiFile?: string | null;
  readonly cvecApproveDate?: string | null;
  readonly cvecFile?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLocalMobilization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LocalMobilization, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID?: string | null;
  readonly mobSignDate?: string | null;
  readonly mobFile?: string | null;
  readonly paafApproveDate?: string | null;
  readonly paafFile?: string | null;
  readonly loiIssueDate?: string | null;
  readonly loiAcceptDate?: string | null;
  readonly loiDeclineDate?: string | null;
  readonly declineReason?: string | null;
  readonly loiFile?: string | null;
  readonly cvecApproveDate?: string | null;
  readonly cvecFile?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LocalMobilization = LazyLoading extends LazyLoadingDisabled ? EagerLocalMobilization : LazyLocalMobilization

export declare const LocalMobilization: (new (init: ModelInit<LocalMobilization>) => LocalMobilization) & {
  copyOf(source: LocalMobilization, mutator: (draft: MutableModel<LocalMobilization>) => MutableModel<LocalMobilization> | void): LocalMobilization;
}

type EagerInterviewScheduleSchema = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterviewScheduleSchema, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly time: string;
  readonly venue: string;
  readonly interviewType: string;
  readonly interviewer: string;
  readonly message?: string | null;
  readonly tempID: string;
  readonly candidateStatus?: string | null;
  readonly department?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInterviewScheduleSchema = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InterviewScheduleSchema, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly time: string;
  readonly venue: string;
  readonly interviewType: string;
  readonly interviewer: string;
  readonly message?: string | null;
  readonly tempID: string;
  readonly candidateStatus?: string | null;
  readonly department?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InterviewScheduleSchema = LazyLoading extends LazyLoadingDisabled ? EagerInterviewScheduleSchema : LazyInterviewScheduleSchema

export declare const InterviewScheduleSchema: (new (init: ModelInit<InterviewScheduleSchema>) => InterviewScheduleSchema) & {
  copyOf(source: InterviewScheduleSchema, mutator: (draft: MutableModel<InterviewScheduleSchema>) => MutableModel<InterviewScheduleSchema> | void): InterviewScheduleSchema;
}

type EagerEducationDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EducationDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID: string;
  readonly crime?: string | null;
  readonly crimeDesc?: string | null;
  readonly emgDetails?: string[] | null;
  readonly noExperience: string;
  readonly empStatement: string;
  readonly desc?: string | null;
  readonly disease?: string | null;
  readonly diseaseDesc?: string | null;
  readonly liquor?: string | null;
  readonly liquorDesc?: string | null;
  readonly noticePeriod: string;
  readonly perIS: string;
  readonly perIDesc?: string | null;
  readonly referees?: (string | null)[] | null;
  readonly relatives?: (string | null)[] | null;
  readonly salaryExpectation?: string | null;
  readonly supportInfo?: string | null;
  readonly uploadResume: string;
  readonly uploadCertificate: string;
  readonly uploadPp: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEducationDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EducationDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID: string;
  readonly crime?: string | null;
  readonly crimeDesc?: string | null;
  readonly emgDetails?: string[] | null;
  readonly noExperience: string;
  readonly empStatement: string;
  readonly desc?: string | null;
  readonly disease?: string | null;
  readonly diseaseDesc?: string | null;
  readonly liquor?: string | null;
  readonly liquorDesc?: string | null;
  readonly noticePeriod: string;
  readonly perIS: string;
  readonly perIDesc?: string | null;
  readonly referees?: (string | null)[] | null;
  readonly relatives?: (string | null)[] | null;
  readonly salaryExpectation?: string | null;
  readonly supportInfo?: string | null;
  readonly uploadResume: string;
  readonly uploadCertificate: string;
  readonly uploadPp: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EducationDetails = LazyLoading extends LazyLoadingDisabled ? EagerEducationDetails : LazyEducationDetails

export declare const EducationDetails: (new (init: ModelInit<EducationDetails>) => EducationDetails) & {
  copyOf(source: EducationDetails, mutator: (draft: MutableModel<EducationDetails>) => MutableModel<EducationDetails> | void): EducationDetails;
}

type EagerPersonalDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonalDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID: string;
  readonly age: number;
  readonly alternateNo?: string | null;
  readonly agent?: string | null;
  readonly bwnIcNo?: string | null;
  readonly bwnIcExpiry?: string | null;
  readonly bwnIcColour?: string | null;
  readonly contactNo: string;
  readonly cob: string;
  readonly contractType: string;
  readonly chinese?: string | null;
  readonly dob: string;
  readonly driveLic?: string | null;
  readonly email: string;
  readonly empType: string;
  readonly eduDetails?: string[] | null;
  readonly familyDetails?: (string | null)[] | null;
  readonly gender: string;
  readonly lang: string;
  readonly marital: string;
  readonly name: string;
  readonly nationality: string;
  readonly otherNation?: string | null;
  readonly otherRace?: string | null;
  readonly otherReligion?: string | null;
  readonly ppNo?: string | null;
  readonly ppIssued?: string | null;
  readonly ppExpiry?: string | null;
  readonly ppDestinate?: string | null;
  readonly presentAddress: string;
  readonly permanentAddress: string;
  readonly profilePhoto: string;
  readonly position: string;
  readonly race: string;
  readonly religion: string;
  readonly workExperience?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonalDetails = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonalDetails, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tempID: string;
  readonly age: number;
  readonly alternateNo?: string | null;
  readonly agent?: string | null;
  readonly bwnIcNo?: string | null;
  readonly bwnIcExpiry?: string | null;
  readonly bwnIcColour?: string | null;
  readonly contactNo: string;
  readonly cob: string;
  readonly contractType: string;
  readonly chinese?: string | null;
  readonly dob: string;
  readonly driveLic?: string | null;
  readonly email: string;
  readonly empType: string;
  readonly eduDetails?: string[] | null;
  readonly familyDetails?: (string | null)[] | null;
  readonly gender: string;
  readonly lang: string;
  readonly marital: string;
  readonly name: string;
  readonly nationality: string;
  readonly otherNation?: string | null;
  readonly otherRace?: string | null;
  readonly otherReligion?: string | null;
  readonly ppNo?: string | null;
  readonly ppIssued?: string | null;
  readonly ppExpiry?: string | null;
  readonly ppDestinate?: string | null;
  readonly presentAddress: string;
  readonly permanentAddress: string;
  readonly profilePhoto: string;
  readonly position: string;
  readonly race: string;
  readonly religion: string;
  readonly workExperience?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonalDetails = LazyLoading extends LazyLoadingDisabled ? EagerPersonalDetails : LazyPersonalDetails

export declare const PersonalDetails: (new (init: ModelInit<PersonalDetails>) => PersonalDetails) & {
  copyOf(source: PersonalDetails, mutator: (draft: MutableModel<PersonalDetails>) => MutableModel<PersonalDetails> | void): PersonalDetails;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly selectType: string;
  readonly setPermissions?: (string | null)[] | null;
  readonly password: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly selectType: string;
  readonly setPermissions?: (string | null)[] | null;
  readonly password: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerTicketRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TicketRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly departureDate?: string | null;
  readonly arrivalDate?: string | null;
  readonly destination?: string | null;
  readonly remarks?: string | null;
  readonly hrStatus?: string | null;
  readonly hrDate?: string | null;
  readonly hrRemarks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTicketRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TicketRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly departureDate?: string | null;
  readonly arrivalDate?: string | null;
  readonly destination?: string | null;
  readonly remarks?: string | null;
  readonly hrStatus?: string | null;
  readonly hrDate?: string | null;
  readonly hrRemarks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TicketRequest = LazyLoading extends LazyLoadingDisabled ? EagerTicketRequest : LazyTicketRequest

export declare const TicketRequest: (new (init: ModelInit<TicketRequest>) => TicketRequest) & {
  copyOf(source: TicketRequest, mutator: (draft: MutableModel<TicketRequest>) => MutableModel<TicketRequest> | void): TicketRequest;
}

type EagerLeaveStatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LeaveStatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly leaveType: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly days: number;
  readonly applyTo?: string[] | null;
  readonly reason: string;
  readonly medicalCertificate?: string | null;
  readonly supervisorName?: string | null;
  readonly supervisorStatus?: string | null;
  readonly supervisorDate?: string | null;
  readonly supervisorRemarks?: string | null;
  readonly managerName?: string | null;
  readonly managerStatus?: string | null;
  readonly managerDate?: string | null;
  readonly managerRemarks?: string | null;
  readonly empStatus?: string | null;
  readonly empDate?: string | null;
  readonly empRemarks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLeaveStatus = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LeaveStatus, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly empID: string;
  readonly leaveType: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly days: number;
  readonly applyTo?: string[] | null;
  readonly reason: string;
  readonly medicalCertificate?: string | null;
  readonly supervisorName?: string | null;
  readonly supervisorStatus?: string | null;
  readonly supervisorDate?: string | null;
  readonly supervisorRemarks?: string | null;
  readonly managerName?: string | null;
  readonly managerStatus?: string | null;
  readonly managerDate?: string | null;
  readonly managerRemarks?: string | null;
  readonly empStatus?: string | null;
  readonly empDate?: string | null;
  readonly empRemarks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LeaveStatus = LazyLoading extends LazyLoadingDisabled ? EagerLeaveStatus : LazyLeaveStatus

export declare const LeaveStatus: (new (init: ModelInit<LeaveStatus>) => LeaveStatus) & {
  copyOf(source: LeaveStatus, mutator: (draft: MutableModel<LeaveStatus>) => MutableModel<LeaveStatus> | void): LeaveStatus;
}

type EagerSampleTest1 = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SampleTest1, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly gender?: string | null;
  readonly empID?: string | null;
  readonly password?: string | null;
  readonly tempID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySampleTest1 = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SampleTest1, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly gender?: string | null;
  readonly empID?: string | null;
  readonly password?: string | null;
  readonly tempID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SampleTest1 = LazyLoading extends LazyLoadingDisabled ? EagerSampleTest1 : LazySampleTest1

export declare const SampleTest1: (new (init: ModelInit<SampleTest1>) => SampleTest1) & {
  copyOf(source: SampleTest1, mutator: (draft: MutableModel<SampleTest1>) => MutableModel<SampleTest1> | void): SampleTest1;
}