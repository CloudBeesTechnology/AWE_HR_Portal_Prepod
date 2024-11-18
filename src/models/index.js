// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Blng, WPTracking, EmployeeNonLocalAcco, LabourMedicalInfo, ServiceRecord, EmpLeaveDetails, TerminationInfo, EmpWorkInfo, EmpPersonalInfo, IDDetails, CandIToEMP, LocalMobilization, InterviewScheduleSchema, EducationDetails, PersonalDetails, User, TicketRequest, LeaveStatus, SampleTest1 } = initSchema(schema);

export {
  Blng,
  WPTracking,
  EmployeeNonLocalAcco,
  LabourMedicalInfo,
  ServiceRecord,
  EmpLeaveDetails,
  TerminationInfo,
  EmpWorkInfo,
  EmpPersonalInfo,
  IDDetails,
  CandIToEMP,
  LocalMobilization,
  InterviewScheduleSchema,
  EducationDetails,
  PersonalDetails,
  User,
  TicketRequest,
  LeaveStatus,
  SampleTest1
};