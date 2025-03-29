import * as Yup from "yup";

export const probationFormSchema = Yup.object({
  // empID: Yup.string().required("UserID is mandatory"),
  // adaptability: Yup.string().notRequired(),
  // additionalInfo: Yup.string().notRequired(),
  // attention: Yup.string().notRequired(),
  // attitude: Yup.string().notRequired(),
  // commitment: Yup.string().notRequired(),
  // communication: Yup.string().notRequired(),
  // deadline: Yup.string().notRequired(),
  extendDate:Yup.string().notRequired(),
  // diligent: Yup.string().notRequired(),
  // extendProbED: Yup.string().notRequired(),
  // gmApproved: Yup.string().notRequired(),
  // gmDate: Yup.string().notRequired(),
  // gmName: Yup.string().notRequired(),
  // hrDate: Yup.string().notRequired(),
  // hrName: Yup.string().notRequired(),
  // initiative: Yup.string().notRequired(),
  // managerApproved: Yup.string().notRequired(),
  // managerDate: Yup.string().notRequired(),
  // managerName: Yup.string().notRequired(),
  // pace: Yup.string().notRequired(),
  // quality: Yup.string().notRequired(),
  // recommendation: Yup.string().notRequired(),
  // responsibility: Yup.string().notRequired(),
  // supervisorApproved: Yup.string().notRequired(),
  // // supervisorDate: Yup.string().notRequired(),
  // supervisorName: Yup.string().notRequired(),
  // teamwork: Yup.string().notRequired(),
});
export const ContractFormSchema = Yup.object({
  empID: Yup.string().required("UserID is mandatory"),
  adaptability: Yup.string().notRequired(),

});
