/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContractForm = /* GraphQL */ `
  mutation CreateContractForm(
    $input: CreateContractFormInput!
    $condition: ModelContractFormConditionInput
  ) {
    createContractForm(input: $input, condition: $condition) {
      id
      empID
      conAttn
      depHead
      hrManager
      genManager
      remarks
      contStatus
      remarkHr
      remarkGm
      renewalContract
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateContractForm = /* GraphQL */ `
  mutation UpdateContractForm(
    $input: UpdateContractFormInput!
    $condition: ModelContractFormConditionInput
  ) {
    updateContractForm(input: $input, condition: $condition) {
      id
      empID
      conAttn
      depHead
      hrManager
      genManager
      remarks
      contStatus
      remarkHr
      remarkGm
      renewalContract
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteContractForm = /* GraphQL */ `
  mutation DeleteContractForm(
    $input: DeleteContractFormInput!
    $condition: ModelContractFormConditionInput
  ) {
    deleteContractForm(input: $input, condition: $condition) {
      id
      empID
      conAttn
      depHead
      hrManager
      genManager
      remarks
      contStatus
      remarkHr
      remarkGm
      renewalContract
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createKeyValueStore = /* GraphQL */ `
  mutation CreateKeyValueStore(
    $input: CreateKeyValueStoreInput!
    $condition: ModelKeyValueStoreConditionInput
  ) {
    createKeyValueStore(input: $input, condition: $condition) {
      id
      departmentDD
      positionDD
      jobCatDD
      raceDD
      religionDD
      nationalityDD
      countryORDD
      educLevelDD
      workStatusDD
      relationshipDD
      resignNotifProbDD
      termiNotifProbDD
      resignNotifConfDD
      termiNotifConfDD
      insuHSDD
      insuClaimDD
      permitWorkDD
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateKeyValueStore = /* GraphQL */ `
  mutation UpdateKeyValueStore(
    $input: UpdateKeyValueStoreInput!
    $condition: ModelKeyValueStoreConditionInput
  ) {
    updateKeyValueStore(input: $input, condition: $condition) {
      id
      departmentDD
      positionDD
      jobCatDD
      raceDD
      religionDD
      nationalityDD
      countryORDD
      educLevelDD
      workStatusDD
      relationshipDD
      resignNotifProbDD
      termiNotifProbDD
      resignNotifConfDD
      termiNotifConfDD
      insuHSDD
      insuClaimDD
      permitWorkDD
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteKeyValueStore = /* GraphQL */ `
  mutation DeleteKeyValueStore(
    $input: DeleteKeyValueStoreInput!
    $condition: ModelKeyValueStoreConditionInput
  ) {
    deleteKeyValueStore(input: $input, condition: $condition) {
      id
      departmentDD
      positionDD
      jobCatDD
      raceDD
      religionDD
      nationalityDD
      countryORDD
      educLevelDD
      workStatusDD
      relationshipDD
      resignNotifProbDD
      termiNotifProbDD
      resignNotifConfDD
      termiNotifConfDD
      insuHSDD
      insuClaimDD
      permitWorkDD
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBastingPaint = /* GraphQL */ `
  mutation CreateBastingPaint(
    $input: CreateBastingPaintInput!
    $condition: ModelBastingPaintConditionInput
  ) {
    createBastingPaint(input: $input, condition: $condition) {
      id
      empID
      blastingRemarks
      blastingEndDate
      blastingStartDate
      blastingBadgeNo
      blastingQulifiExp
      blastingUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBastingPaint = /* GraphQL */ `
  mutation UpdateBastingPaint(
    $input: UpdateBastingPaintInput!
    $condition: ModelBastingPaintConditionInput
  ) {
    updateBastingPaint(input: $input, condition: $condition) {
      id
      empID
      blastingRemarks
      blastingEndDate
      blastingStartDate
      blastingBadgeNo
      blastingQulifiExp
      blastingUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBastingPaint = /* GraphQL */ `
  mutation DeleteBastingPaint(
    $input: DeleteBastingPaintInput!
    $condition: ModelBastingPaintConditionInput
  ) {
    deleteBastingPaint(input: $input, condition: $condition) {
      id
      empID
      blastingRemarks
      blastingEndDate
      blastingStartDate
      blastingBadgeNo
      blastingQulifiExp
      blastingUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTimeSheet = /* GraphQL */ `
  mutation CreateTimeSheet(
    $input: CreateTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    createTimeSheet(input: $input, condition: $condition) {
      id
      date
      status
      fileName
      fileType
      assignTo
      assignBy
      empName
      empBadgeNo
      empID
      empDept
      inTime
      outTime
      totalInOut
      allDayHrs
      totalHrs
      remarks
      otTime
      netMins
      actualWorkHrs
      normalWorkHrs
      fidNo
      companyName
      trade
      tradeCode
      onAM
      offAM
      onPM
      offPM
      ctr
      rec
      avgDailyTD
      highlightDayTG
      aweSDN
      totalNT
      totalOT
      totalNTOT
      empWorkInfo
      fromDate
      untilDate
      location
      mealAllow
      verify
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTimeSheet = /* GraphQL */ `
  mutation UpdateTimeSheet(
    $input: UpdateTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    updateTimeSheet(input: $input, condition: $condition) {
      id
      date
      status
      fileName
      fileType
      assignTo
      assignBy
      empName
      empBadgeNo
      empID
      empDept
      inTime
      outTime
      totalInOut
      allDayHrs
      totalHrs
      remarks
      otTime
      netMins
      actualWorkHrs
      normalWorkHrs
      fidNo
      companyName
      trade
      tradeCode
      onAM
      offAM
      onPM
      offPM
      ctr
      rec
      avgDailyTD
      highlightDayTG
      aweSDN
      totalNT
      totalOT
      totalNTOT
      empWorkInfo
      fromDate
      untilDate
      location
      mealAllow
      verify
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTimeSheet = /* GraphQL */ `
  mutation DeleteTimeSheet(
    $input: DeleteTimeSheetInput!
    $condition: ModelTimeSheetConditionInput
  ) {
    deleteTimeSheet(input: $input, condition: $condition) {
      id
      date
      status
      fileName
      fileType
      assignTo
      assignBy
      empName
      empBadgeNo
      empID
      empDept
      inTime
      outTime
      totalInOut
      allDayHrs
      totalHrs
      remarks
      otTime
      netMins
      actualWorkHrs
      normalWorkHrs
      fidNo
      companyName
      trade
      tradeCode
      onAM
      offAM
      onPM
      offPM
      ctr
      rec
      avgDailyTD
      highlightDayTG
      aweSDN
      totalNT
      totalOT
      totalNTOT
      empWorkInfo
      fromDate
      untilDate
      location
      mealAllow
      verify
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createHiringJob = /* GraphQL */ `
  mutation CreateHiringJob(
    $input: CreateHiringJobInput!
    $condition: ModelHiringJobConditionInput
  ) {
    createHiringJob(input: $input, condition: $condition) {
      id
      jobTitle
      exper
      location
      quantityPerson
      startDate
      expiryDate
      jobContent
      uploadJobDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateHiringJob = /* GraphQL */ `
  mutation UpdateHiringJob(
    $input: UpdateHiringJobInput!
    $condition: ModelHiringJobConditionInput
  ) {
    updateHiringJob(input: $input, condition: $condition) {
      id
      jobTitle
      exper
      location
      quantityPerson
      startDate
      expiryDate
      jobContent
      uploadJobDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteHiringJob = /* GraphQL */ `
  mutation DeleteHiringJob(
    $input: DeleteHiringJobInput!
    $condition: ModelHiringJobConditionInput
  ) {
    deleteHiringJob(input: $input, condition: $condition) {
      id
      jobTitle
      exper
      location
      quantityPerson
      startDate
      expiryDate
      jobContent
      uploadJobDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createInsuranceType = /* GraphQL */ `
  mutation CreateInsuranceType(
    $input: CreateInsuranceTypeInput!
    $condition: ModelInsuranceTypeConditionInput
  ) {
    createInsuranceType(input: $input, condition: $condition) {
      id
      typeIns
      insDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateInsuranceType = /* GraphQL */ `
  mutation UpdateInsuranceType(
    $input: UpdateInsuranceTypeInput!
    $condition: ModelInsuranceTypeConditionInput
  ) {
    updateInsuranceType(input: $input, condition: $condition) {
      id
      typeIns
      insDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteInsuranceType = /* GraphQL */ `
  mutation DeleteInsuranceType(
    $input: DeleteInsuranceTypeInput!
    $condition: ModelInsuranceTypeConditionInput
  ) {
    deleteInsuranceType(input: $input, condition: $condition) {
      id
      typeIns
      insDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGroupHandS = /* GraphQL */ `
  mutation CreateGroupHandS(
    $input: CreateGroupHandSInput!
    $condition: ModelGroupHandSConditionInput
  ) {
    createGroupHandS(input: $input, condition: $condition) {
      id
      groupHSExp
      groupHSNo
      groupHSUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGroupHandS = /* GraphQL */ `
  mutation UpdateGroupHandS(
    $input: UpdateGroupHandSInput!
    $condition: ModelGroupHandSConditionInput
  ) {
    updateGroupHandS(input: $input, condition: $condition) {
      id
      groupHSExp
      groupHSNo
      groupHSUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGroupHandS = /* GraphQL */ `
  mutation DeleteGroupHandS(
    $input: DeleteGroupHandSInput!
    $condition: ModelGroupHandSConditionInput
  ) {
    deleteGroupHandS(input: $input, condition: $condition) {
      id
      groupHSExp
      groupHSNo
      groupHSUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWorkMen = /* GraphQL */ `
  mutation CreateWorkMen(
    $input: CreateWorkMenInput!
    $condition: ModelWorkMenConditionInput
  ) {
    createWorkMen(input: $input, condition: $condition) {
      id
      empStatusType
      workmenCompExp
      workmenCompNo
      workmenComUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWorkMen = /* GraphQL */ `
  mutation UpdateWorkMen(
    $input: UpdateWorkMenInput!
    $condition: ModelWorkMenConditionInput
  ) {
    updateWorkMen(input: $input, condition: $condition) {
      id
      empStatusType
      workmenCompExp
      workmenCompNo
      workmenComUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWorkMen = /* GraphQL */ `
  mutation DeleteWorkMen(
    $input: DeleteWorkMenInput!
    $condition: ModelWorkMenConditionInput
  ) {
    deleteWorkMen(input: $input, condition: $condition) {
      id
      empStatusType
      workmenCompExp
      workmenCompNo
      workmenComUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTravelIns = /* GraphQL */ `
  mutation CreateTravelIns(
    $input: CreateTravelInsInput!
    $condition: ModelTravelInsConditionInput
  ) {
    createTravelIns(input: $input, condition: $condition) {
      id
      travelExp
      travelNo
      travelUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTravelIns = /* GraphQL */ `
  mutation UpdateTravelIns(
    $input: UpdateTravelInsInput!
    $condition: ModelTravelInsConditionInput
  ) {
    updateTravelIns(input: $input, condition: $condition) {
      id
      travelExp
      travelNo
      travelUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTravelIns = /* GraphQL */ `
  mutation DeleteTravelIns(
    $input: DeleteTravelInsInput!
    $condition: ModelTravelInsConditionInput
  ) {
    deleteTravelIns(input: $input, condition: $condition) {
      id
      travelExp
      travelNo
      travelUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPersonalAccident = /* GraphQL */ `
  mutation CreatePersonalAccident(
    $input: CreatePersonalAccidentInput!
    $condition: ModelPersonalAccidentConditionInput
  ) {
    createPersonalAccident(input: $input, condition: $condition) {
      id
      perAccExp
      perAccNo
      perAccUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePersonalAccident = /* GraphQL */ `
  mutation UpdatePersonalAccident(
    $input: UpdatePersonalAccidentInput!
    $condition: ModelPersonalAccidentConditionInput
  ) {
    updatePersonalAccident(input: $input, condition: $condition) {
      id
      perAccExp
      perAccNo
      perAccUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePersonalAccident = /* GraphQL */ `
  mutation DeletePersonalAccident(
    $input: DeletePersonalAccidentInput!
    $condition: ModelPersonalAccidentConditionInput
  ) {
    deletePersonalAccident(input: $input, condition: $condition) {
      id
      perAccExp
      perAccNo
      perAccUp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createInsClaim = /* GraphQL */ `
  mutation CreateInsClaim(
    $input: CreateInsClaimInput!
    $condition: ModelInsClaimConditionInput
  ) {
    createInsClaim(input: $input, condition: $condition) {
      id
      empID
      insuranceClaims
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateInsClaim = /* GraphQL */ `
  mutation UpdateInsClaim(
    $input: UpdateInsClaimInput!
    $condition: ModelInsClaimConditionInput
  ) {
    updateInsClaim(input: $input, condition: $condition) {
      id
      empID
      insuranceClaims
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteInsClaim = /* GraphQL */ `
  mutation DeleteInsClaim(
    $input: DeleteInsClaimInput!
    $condition: ModelInsClaimConditionInput
  ) {
    deleteInsClaim(input: $input, condition: $condition) {
      id
      empID
      insuranceClaims
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProbForm = /* GraphQL */ `
  mutation CreateProbForm(
    $input: CreateProbFormInput!
    $condition: ModelProbFormConditionInput
  ) {
    createProbForm(input: $input, condition: $condition) {
      id
      empID
      adaptability
      additionalInfo
      attention
      attitude
      commitment
      communication
      deadline
      diligent
      extensionPeriod
      gmDate
      hrDate
      hrName
      initiative
      managerDate
      managerName
      pace
      quality
      recommendation
      responsibility
      supervisorDate
      supervisorName
      teamwork
      extendProbED
      gmApproved
      managerApproved
      supervisorApproved
      communicationDetails
      qualityDetails
      paceDetails
      initiativeDetails
      attitudeDetails
      adaptabilityDetails
      teamworkDetails
      responsibilityDetails
      diligentDetails
      commitmentDetails
      probStatus
      gmName
      extendDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProbForm = /* GraphQL */ `
  mutation UpdateProbForm(
    $input: UpdateProbFormInput!
    $condition: ModelProbFormConditionInput
  ) {
    updateProbForm(input: $input, condition: $condition) {
      id
      empID
      adaptability
      additionalInfo
      attention
      attitude
      commitment
      communication
      deadline
      diligent
      extensionPeriod
      gmDate
      hrDate
      hrName
      initiative
      managerDate
      managerName
      pace
      quality
      recommendation
      responsibility
      supervisorDate
      supervisorName
      teamwork
      extendProbED
      gmApproved
      managerApproved
      supervisorApproved
      communicationDetails
      qualityDetails
      paceDetails
      initiativeDetails
      attitudeDetails
      adaptabilityDetails
      teamworkDetails
      responsibilityDetails
      diligentDetails
      commitmentDetails
      probStatus
      gmName
      extendDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProbForm = /* GraphQL */ `
  mutation DeleteProbForm(
    $input: DeleteProbFormInput!
    $condition: ModelProbFormConditionInput
  ) {
    deleteProbForm(input: $input, condition: $condition) {
      id
      empID
      adaptability
      additionalInfo
      attention
      attitude
      commitment
      communication
      deadline
      diligent
      extensionPeriod
      gmDate
      hrDate
      hrName
      initiative
      managerDate
      managerName
      pace
      quality
      recommendation
      responsibility
      supervisorDate
      supervisorName
      teamwork
      extendProbED
      gmApproved
      managerApproved
      supervisorApproved
      communicationDetails
      qualityDetails
      paceDetails
      initiativeDetails
      attitudeDetails
      adaptabilityDetails
      teamworkDetails
      responsibilityDetails
      diligentDetails
      commitmentDetails
      probStatus
      gmName
      extendDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmailNotifi = /* GraphQL */ `
  mutation CreateEmailNotifi(
    $input: CreateEmailNotifiInput!
    $condition: ModelEmailNotifiConditionInput
  ) {
    createEmailNotifi(input: $input, condition: $condition) {
      id
      empID
      leaveType
      senderEmail
      receipentEmail
      receipentEmpID
      status
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmailNotifi = /* GraphQL */ `
  mutation UpdateEmailNotifi(
    $input: UpdateEmailNotifiInput!
    $condition: ModelEmailNotifiConditionInput
  ) {
    updateEmailNotifi(input: $input, condition: $condition) {
      id
      empID
      leaveType
      senderEmail
      receipentEmail
      receipentEmpID
      status
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmailNotifi = /* GraphQL */ `
  mutation DeleteEmailNotifi(
    $input: DeleteEmailNotifiInput!
    $condition: ModelEmailNotifiConditionInput
  ) {
    deleteEmailNotifi(input: $input, condition: $condition) {
      id
      empID
      leaveType
      senderEmail
      receipentEmail
      receipentEmpID
      status
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmpRequisition = /* GraphQL */ `
  mutation CreateEmpRequisition(
    $input: CreateEmpRequisitionInput!
    $condition: ModelEmpRequisitionConditionInput
  ) {
    createEmpRequisition(input: $input, condition: $condition) {
      id
      department
      justification
      project
      position
      quantity
      qualification
      reasonForReq
      replacementFor
      tentativeDate
      status
      remarkReq
      reqName
      requestorID
      approverID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmpRequisition = /* GraphQL */ `
  mutation UpdateEmpRequisition(
    $input: UpdateEmpRequisitionInput!
    $condition: ModelEmpRequisitionConditionInput
  ) {
    updateEmpRequisition(input: $input, condition: $condition) {
      id
      department
      justification
      project
      position
      quantity
      qualification
      reasonForReq
      replacementFor
      tentativeDate
      status
      remarkReq
      reqName
      requestorID
      approverID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmpRequisition = /* GraphQL */ `
  mutation DeleteEmpRequisition(
    $input: DeleteEmpRequisitionInput!
    $condition: ModelEmpRequisitionConditionInput
  ) {
    deleteEmpRequisition(input: $input, condition: $condition) {
      id
      department
      justification
      project
      position
      quantity
      qualification
      reasonForReq
      replacementFor
      tentativeDate
      status
      remarkReq
      reqName
      requestorID
      approverID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWeldingInfo = /* GraphQL */ `
  mutation CreateWeldingInfo(
    $input: CreateWeldingInfoInput!
    $condition: ModelWeldingInfoConditionInput
  ) {
    createWeldingInfo(input: $input, condition: $condition) {
      id
      empID
      diameterRange
      fillerMetal
      thicknessRange
      weldingStampNor
      wpsNumber
      weldingProcess
      weldingPosition
      WQExpiry
      WQRemarks
      weldingUpload
      WQRNo
      weldingCode
      weldingMaterial
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWeldingInfo = /* GraphQL */ `
  mutation UpdateWeldingInfo(
    $input: UpdateWeldingInfoInput!
    $condition: ModelWeldingInfoConditionInput
  ) {
    updateWeldingInfo(input: $input, condition: $condition) {
      id
      empID
      diameterRange
      fillerMetal
      thicknessRange
      weldingStampNor
      wpsNumber
      weldingProcess
      weldingPosition
      WQExpiry
      WQRemarks
      weldingUpload
      WQRNo
      weldingCode
      weldingMaterial
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWeldingInfo = /* GraphQL */ `
  mutation DeleteWeldingInfo(
    $input: DeleteWeldingInfoInput!
    $condition: ModelWeldingInfoConditionInput
  ) {
    deleteWeldingInfo(input: $input, condition: $condition) {
      id
      empID
      diameterRange
      fillerMetal
      thicknessRange
      weldingStampNor
      wpsNumber
      weldingProcess
      weldingPosition
      WQExpiry
      WQRemarks
      weldingUpload
      WQRNo
      weldingCode
      weldingMaterial
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTrainingReq = /* GraphQL */ `
  mutation CreateTrainingReq(
    $input: CreateTrainingReqInput!
    $condition: ModelTrainingReqConditionInput
  ) {
    createTrainingReq(input: $input, condition: $condition) {
      id
      empID
      MRNo
      medicalName
      medicalExpiry
      medicalAppointDate
      medicalReport
      traineeSD
      traineeED
      traineeStatus
      traineeCourseFee
      courseCode
      courseName
      company
      mediRequired
      traineeTrack
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTrainingReq = /* GraphQL */ `
  mutation UpdateTrainingReq(
    $input: UpdateTrainingReqInput!
    $condition: ModelTrainingReqConditionInput
  ) {
    updateTrainingReq(input: $input, condition: $condition) {
      id
      empID
      MRNo
      medicalName
      medicalExpiry
      medicalAppointDate
      medicalReport
      traineeSD
      traineeED
      traineeStatus
      traineeCourseFee
      courseCode
      courseName
      company
      mediRequired
      traineeTrack
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTrainingReq = /* GraphQL */ `
  mutation DeleteTrainingReq(
    $input: DeleteTrainingReqInput!
    $condition: ModelTrainingReqConditionInput
  ) {
    deleteTrainingReq(input: $input, condition: $condition) {
      id
      empID
      MRNo
      medicalName
      medicalExpiry
      medicalAppointDate
      medicalReport
      traineeSD
      traineeED
      traineeStatus
      traineeCourseFee
      courseCode
      courseName
      company
      mediRequired
      traineeTrack
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTrainingCertificates = /* GraphQL */ `
  mutation CreateTrainingCertificates(
    $input: CreateTrainingCertificatesInput!
    $condition: ModelTrainingCertificatesConditionInput
  ) {
    createTrainingCertificates(input: $input, condition: $condition) {
      id
      empID
      certifiExpiry
      eCertifiDate
      trainingUpCertifi
      orgiCertifiDate
      poNo
      addDescretion
      tcRemarks
      trainingProof
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTrainingCertificates = /* GraphQL */ `
  mutation UpdateTrainingCertificates(
    $input: UpdateTrainingCertificatesInput!
    $condition: ModelTrainingCertificatesConditionInput
  ) {
    updateTrainingCertificates(input: $input, condition: $condition) {
      id
      empID
      certifiExpiry
      eCertifiDate
      trainingUpCertifi
      orgiCertifiDate
      poNo
      addDescretion
      tcRemarks
      trainingProof
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTrainingCertificates = /* GraphQL */ `
  mutation DeleteTrainingCertificates(
    $input: DeleteTrainingCertificatesInput!
    $condition: ModelTrainingCertificatesConditionInput
  ) {
    deleteTrainingCertificates(input: $input, condition: $condition) {
      id
      empID
      certifiExpiry
      eCertifiDate
      trainingUpCertifi
      orgiCertifiDate
      poNo
      addDescretion
      tcRemarks
      trainingProof
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAddCourse = /* GraphQL */ `
  mutation CreateAddCourse(
    $input: CreateAddCourseInput!
    $condition: ModelAddCourseConditionInput
  ) {
    createAddCourse(input: $input, condition: $condition) {
      id
      courseSelect
      courseName
      company
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAddCourse = /* GraphQL */ `
  mutation UpdateAddCourse(
    $input: UpdateAddCourseInput!
    $condition: ModelAddCourseConditionInput
  ) {
    updateAddCourse(input: $input, condition: $condition) {
      id
      courseSelect
      courseName
      company
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAddCourse = /* GraphQL */ `
  mutation DeleteAddCourse(
    $input: DeleteAddCourseInput!
    $condition: ModelAddCourseConditionInput
  ) {
    deleteAddCourse(input: $input, condition: $condition) {
      id
      courseSelect
      courseName
      company
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmpDepInsurance = /* GraphQL */ `
  mutation CreateEmpDepInsurance(
    $input: CreateEmpDepInsuranceInput!
    $condition: ModelEmpDepInsuranceConditionInput
  ) {
    createEmpDepInsurance(input: $input, condition: $condition) {
      id
      empID
      depInsurance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmpDepInsurance = /* GraphQL */ `
  mutation UpdateEmpDepInsurance(
    $input: UpdateEmpDepInsuranceInput!
    $condition: ModelEmpDepInsuranceConditionInput
  ) {
    updateEmpDepInsurance(input: $input, condition: $condition) {
      id
      empID
      depInsurance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmpDepInsurance = /* GraphQL */ `
  mutation DeleteEmpDepInsurance(
    $input: DeleteEmpDepInsuranceInput!
    $condition: ModelEmpDepInsuranceConditionInput
  ) {
    deleteEmpDepInsurance(input: $input, condition: $condition) {
      id
      empID
      depInsurance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmpInsurance = /* GraphQL */ `
  mutation CreateEmpInsurance(
    $input: CreateEmpInsuranceInput!
    $condition: ModelEmpInsuranceConditionInput
  ) {
    createEmpInsurance(input: $input, condition: $condition) {
      id
      empID
      groupIns
      groupInsEffectDate
      groupInsEndDate
      empStatusType
      workmenCompNo
      travelIns
      accidentIns
      empInsUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmpInsurance = /* GraphQL */ `
  mutation UpdateEmpInsurance(
    $input: UpdateEmpInsuranceInput!
    $condition: ModelEmpInsuranceConditionInput
  ) {
    updateEmpInsurance(input: $input, condition: $condition) {
      id
      empID
      groupIns
      groupInsEffectDate
      groupInsEndDate
      empStatusType
      workmenCompNo
      travelIns
      accidentIns
      empInsUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmpInsurance = /* GraphQL */ `
  mutation DeleteEmpInsurance(
    $input: DeleteEmpInsuranceInput!
    $condition: ModelEmpInsuranceConditionInput
  ) {
    deleteEmpInsurance(input: $input, condition: $condition) {
      id
      empID
      groupIns
      groupInsEffectDate
      groupInsEndDate
      empStatusType
      workmenCompNo
      travelIns
      accidentIns
      empInsUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSawpDetails = /* GraphQL */ `
  mutation CreateSawpDetails(
    $input: CreateSawpDetailsInput!
    $condition: ModelSawpDetailsConditionInput
  ) {
    createSawpDetails(input: $input, condition: $condition) {
      id
      empID
      sawpEmpLtrReq
      sawpEmpLtrReci
      sawpEmpUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSawpDetails = /* GraphQL */ `
  mutation UpdateSawpDetails(
    $input: UpdateSawpDetailsInput!
    $condition: ModelSawpDetailsConditionInput
  ) {
    updateSawpDetails(input: $input, condition: $condition) {
      id
      empID
      sawpEmpLtrReq
      sawpEmpLtrReci
      sawpEmpUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSawpDetails = /* GraphQL */ `
  mutation DeleteSawpDetails(
    $input: DeleteSawpDetailsInput!
    $condition: ModelSawpDetailsConditionInput
  ) {
    deleteSawpDetails(input: $input, condition: $condition) {
      id
      empID
      sawpEmpLtrReq
      sawpEmpLtrReci
      sawpEmpUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createDNDetails = /* GraphQL */ `
  mutation CreateDNDetails(
    $input: CreateDNDetailsInput!
    $condition: ModelDNDetailsConditionInput
  ) {
    createDNDetails(input: $input, condition: $condition) {
      id
      empID
      doeEmpSubmit
      doeEmpApproval
      doeEmpValid
      doeEmpRefNo
      doeEmpUpload
      permitType
      nlmsEmpSubmit
      nlmsEmpSubmitRefNo
      nlmsEmpApproval
      nlmsRefNo
      nlmsEmpValid
      nlmsEmpUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDNDetails = /* GraphQL */ `
  mutation UpdateDNDetails(
    $input: UpdateDNDetailsInput!
    $condition: ModelDNDetailsConditionInput
  ) {
    updateDNDetails(input: $input, condition: $condition) {
      id
      empID
      doeEmpSubmit
      doeEmpApproval
      doeEmpValid
      doeEmpRefNo
      doeEmpUpload
      permitType
      nlmsEmpSubmit
      nlmsEmpSubmitRefNo
      nlmsEmpApproval
      nlmsRefNo
      nlmsEmpValid
      nlmsEmpUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDNDetails = /* GraphQL */ `
  mutation DeleteDNDetails(
    $input: DeleteDNDetailsInput!
    $condition: ModelDNDetailsConditionInput
  ) {
    deleteDNDetails(input: $input, condition: $condition) {
      id
      empID
      doeEmpSubmit
      doeEmpApproval
      doeEmpValid
      doeEmpRefNo
      doeEmpUpload
      permitType
      nlmsEmpSubmit
      nlmsEmpSubmitRefNo
      nlmsEmpApproval
      nlmsRefNo
      nlmsEmpValid
      nlmsEmpUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBJLDetails = /* GraphQL */ `
  mutation CreateBJLDetails(
    $input: CreateBJLDetailsInput!
    $condition: ModelBJLDetailsConditionInput
  ) {
    createBJLDetails(input: $input, condition: $condition) {
      id
      empID
      bankSubmit
      bankRece
      bankRefNo
      bankAmt
      bankValid
      bankEndorse
      bankEmpUpload
      tbaPurchase
      jitpaAmt
      jpValid
      jpEndorse
      jpEmpUpload
      lbrReceiptNo
      lbrDepoAmt
      lbrDepoSubmit
      lbrDepoUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBJLDetails = /* GraphQL */ `
  mutation UpdateBJLDetails(
    $input: UpdateBJLDetailsInput!
    $condition: ModelBJLDetailsConditionInput
  ) {
    updateBJLDetails(input: $input, condition: $condition) {
      id
      empID
      bankSubmit
      bankRece
      bankRefNo
      bankAmt
      bankValid
      bankEndorse
      bankEmpUpload
      tbaPurchase
      jitpaAmt
      jpValid
      jpEndorse
      jpEmpUpload
      lbrReceiptNo
      lbrDepoAmt
      lbrDepoSubmit
      lbrDepoUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBJLDetails = /* GraphQL */ `
  mutation DeleteBJLDetails(
    $input: DeleteBJLDetailsInput!
    $condition: ModelBJLDetailsConditionInput
  ) {
    deleteBJLDetails(input: $input, condition: $condition) {
      id
      empID
      bankSubmit
      bankRece
      bankRefNo
      bankAmt
      bankValid
      bankEndorse
      bankEmpUpload
      tbaPurchase
      jitpaAmt
      jpValid
      jpEndorse
      jpEmpUpload
      lbrReceiptNo
      lbrDepoAmt
      lbrDepoSubmit
      lbrDepoUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPassportValid = /* GraphQL */ `
  mutation CreatePassportValid(
    $input: CreatePassportValidInput!
    $condition: ModelPassportValidConditionInput
  ) {
    createPassportValid(input: $input, condition: $condition) {
      id
      empID
      ppLocation
      arrivStampUpload
      immigEmpUpload
      reEntryUpload
      arrivStampExp
      immigRefNo
      ppSubmit
      empPassExp
      empPassStatus
      airTktStatus
      reEntryVisa
      immigApproval
      reEntryVisaExp
      remarkImmig
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePassportValid = /* GraphQL */ `
  mutation UpdatePassportValid(
    $input: UpdatePassportValidInput!
    $condition: ModelPassportValidConditionInput
  ) {
    updatePassportValid(input: $input, condition: $condition) {
      id
      empID
      ppLocation
      arrivStampUpload
      immigEmpUpload
      reEntryUpload
      arrivStampExp
      immigRefNo
      ppSubmit
      empPassExp
      empPassStatus
      airTktStatus
      reEntryVisa
      immigApproval
      reEntryVisaExp
      remarkImmig
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePassportValid = /* GraphQL */ `
  mutation DeletePassportValid(
    $input: DeletePassportValidInput!
    $condition: ModelPassportValidConditionInput
  ) {
    deletePassportValid(input: $input, condition: $condition) {
      id
      empID
      ppLocation
      arrivStampUpload
      immigEmpUpload
      reEntryUpload
      arrivStampExp
      immigRefNo
      ppSubmit
      empPassExp
      empPassStatus
      airTktStatus
      reEntryVisa
      immigApproval
      reEntryVisaExp
      remarkImmig
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWPTracking = /* GraphQL */ `
  mutation CreateWPTracking(
    $input: CreateWPTrackingInput!
    $condition: ModelWPTrackingConditionInput
  ) {
    createWPTracking(input: $input, condition: $condition) {
      id
      tempID
      supportletterReqDate
      supportletterReceiveDate
      letterfile
      doesubmitdate
      doeapprovedate
      doeexpirydate
      doefile
      nlmssubmitdate
      submissionrefrenceno
      nlmsapprovedate
      ldreferenceno
      nlmsexpirydate
      nlmsfile
      bgsubmitdate
      bgreceivedate
      referenceno
      bgamount
      bgexpirydate
      bgfile
      tbapurchasedate
      jitpaamount
      jitpaexpirydate
      receiptno
      depositamount
      submitdateendorsement
      jitpafile
      immbdno
      docsubmitdate
      visaapprovedate
      visareferenceno
      visaFile
      departuredate
      arrivaldate
      cityname
      airfare
      airticketfile
      agentname
      mobSignDate
      mobFile
      doerefno
      sawpDate
      sawpRecivedDate
      sawpFile
      lbrDepoNum
      lbrEndroseDate
      lbrDepoAmount
      lbrFile
      remarkNLMob
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWPTracking = /* GraphQL */ `
  mutation UpdateWPTracking(
    $input: UpdateWPTrackingInput!
    $condition: ModelWPTrackingConditionInput
  ) {
    updateWPTracking(input: $input, condition: $condition) {
      id
      tempID
      supportletterReqDate
      supportletterReceiveDate
      letterfile
      doesubmitdate
      doeapprovedate
      doeexpirydate
      doefile
      nlmssubmitdate
      submissionrefrenceno
      nlmsapprovedate
      ldreferenceno
      nlmsexpirydate
      nlmsfile
      bgsubmitdate
      bgreceivedate
      referenceno
      bgamount
      bgexpirydate
      bgfile
      tbapurchasedate
      jitpaamount
      jitpaexpirydate
      receiptno
      depositamount
      submitdateendorsement
      jitpafile
      immbdno
      docsubmitdate
      visaapprovedate
      visareferenceno
      visaFile
      departuredate
      arrivaldate
      cityname
      airfare
      airticketfile
      agentname
      mobSignDate
      mobFile
      doerefno
      sawpDate
      sawpRecivedDate
      sawpFile
      lbrDepoNum
      lbrEndroseDate
      lbrDepoAmount
      lbrFile
      remarkNLMob
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWPTracking = /* GraphQL */ `
  mutation DeleteWPTracking(
    $input: DeleteWPTrackingInput!
    $condition: ModelWPTrackingConditionInput
  ) {
    deleteWPTracking(input: $input, condition: $condition) {
      id
      tempID
      supportletterReqDate
      supportletterReceiveDate
      letterfile
      doesubmitdate
      doeapprovedate
      doeexpirydate
      doefile
      nlmssubmitdate
      submissionrefrenceno
      nlmsapprovedate
      ldreferenceno
      nlmsexpirydate
      nlmsfile
      bgsubmitdate
      bgreceivedate
      referenceno
      bgamount
      bgexpirydate
      bgfile
      tbapurchasedate
      jitpaamount
      jitpaexpirydate
      receiptno
      depositamount
      submitdateendorsement
      jitpafile
      immbdno
      docsubmitdate
      visaapprovedate
      visareferenceno
      visaFile
      departuredate
      arrivaldate
      cityname
      airfare
      airticketfile
      agentname
      mobSignDate
      mobFile
      doerefno
      sawpDate
      sawpRecivedDate
      sawpFile
      lbrDepoNum
      lbrEndroseDate
      lbrDepoAmount
      lbrFile
      remarkNLMob
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmployeeNonLocalAcco = /* GraphQL */ `
  mutation CreateEmployeeNonLocalAcco(
    $input: CreateEmployeeNonLocalAccoInput!
    $condition: ModelEmployeeNonLocalAccoConditionInput
  ) {
    createEmployeeNonLocalAcco(input: $input, condition: $condition) {
      id
      empID
      accommodation
      accommodationAddress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmployeeNonLocalAcco = /* GraphQL */ `
  mutation UpdateEmployeeNonLocalAcco(
    $input: UpdateEmployeeNonLocalAccoInput!
    $condition: ModelEmployeeNonLocalAccoConditionInput
  ) {
    updateEmployeeNonLocalAcco(input: $input, condition: $condition) {
      id
      empID
      accommodation
      accommodationAddress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmployeeNonLocalAcco = /* GraphQL */ `
  mutation DeleteEmployeeNonLocalAcco(
    $input: DeleteEmployeeNonLocalAccoInput!
    $condition: ModelEmployeeNonLocalAccoConditionInput
  ) {
    deleteEmployeeNonLocalAcco(input: $input, condition: $condition) {
      id
      empID
      accommodation
      accommodationAddress
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLabourMedicalInfo = /* GraphQL */ `
  mutation CreateLabourMedicalInfo(
    $input: CreateLabourMedicalInfoInput!
    $condition: ModelLabourMedicalInfoConditionInput
  ) {
    createLabourMedicalInfo(input: $input, condition: $condition) {
      id
      empID
      overMD
      overME
      bruhimsRD
      bruhimsRNo
      bruneiMAD
      bruneiME
      uploadFitness
      uploadRegis
      uploadBwn
      dependPass
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLabourMedicalInfo = /* GraphQL */ `
  mutation UpdateLabourMedicalInfo(
    $input: UpdateLabourMedicalInfoInput!
    $condition: ModelLabourMedicalInfoConditionInput
  ) {
    updateLabourMedicalInfo(input: $input, condition: $condition) {
      id
      empID
      overMD
      overME
      bruhimsRD
      bruhimsRNo
      bruneiMAD
      bruneiME
      uploadFitness
      uploadRegis
      uploadBwn
      dependPass
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLabourMedicalInfo = /* GraphQL */ `
  mutation DeleteLabourMedicalInfo(
    $input: DeleteLabourMedicalInfoInput!
    $condition: ModelLabourMedicalInfoConditionInput
  ) {
    deleteLabourMedicalInfo(input: $input, condition: $condition) {
      id
      empID
      overMD
      overME
      bruhimsRD
      bruhimsRNo
      bruneiMAD
      bruneiME
      uploadFitness
      uploadRegis
      uploadBwn
      dependPass
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createServiceRecord = /* GraphQL */ `
  mutation CreateServiceRecord(
    $input: CreateServiceRecordInput!
    $condition: ModelServiceRecordConditionInput
  ) {
    createServiceRecord(input: $input, condition: $condition) {
      id
      empID
      depEmpDate
      depEmp
      positionRev
      positionRevDate
      revSalary
      revSalaryDate
      revLeavePass
      revLeaveDate
      revAnnualLeave
      revALD
      remarkWI
      uploadPR
      uploadSP
      uploadLP
      uploadAL
      uploadDep
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateServiceRecord = /* GraphQL */ `
  mutation UpdateServiceRecord(
    $input: UpdateServiceRecordInput!
    $condition: ModelServiceRecordConditionInput
  ) {
    updateServiceRecord(input: $input, condition: $condition) {
      id
      empID
      depEmpDate
      depEmp
      positionRev
      positionRevDate
      revSalary
      revSalaryDate
      revLeavePass
      revLeaveDate
      revAnnualLeave
      revALD
      remarkWI
      uploadPR
      uploadSP
      uploadLP
      uploadAL
      uploadDep
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteServiceRecord = /* GraphQL */ `
  mutation DeleteServiceRecord(
    $input: DeleteServiceRecordInput!
    $condition: ModelServiceRecordConditionInput
  ) {
    deleteServiceRecord(input: $input, condition: $condition) {
      id
      empID
      depEmpDate
      depEmp
      positionRev
      positionRevDate
      revSalary
      revSalaryDate
      revLeavePass
      revLeaveDate
      revAnnualLeave
      revALD
      remarkWI
      uploadPR
      uploadSP
      uploadLP
      uploadAL
      uploadDep
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmpLeaveDetails = /* GraphQL */ `
  mutation CreateEmpLeaveDetails(
    $input: CreateEmpLeaveDetailsInput!
    $condition: ModelEmpLeaveDetailsConditionInput
  ) {
    createEmpLeaveDetails(input: $input, condition: $condition) {
      id
      empID
      annualLeave
      annualLeaveDate
      compasLeave
      destinateLeavePass
      durLeavePass
      dateLeavePass
      leavePass
      materLeave
      mrageLeave
      paterLeave
      sickLeave
      sickLeaveDate
      hospLeave
      pervAnnualLeaveBal
      sickLeaveTaken
      remainAnnualLeave
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmpLeaveDetails = /* GraphQL */ `
  mutation UpdateEmpLeaveDetails(
    $input: UpdateEmpLeaveDetailsInput!
    $condition: ModelEmpLeaveDetailsConditionInput
  ) {
    updateEmpLeaveDetails(input: $input, condition: $condition) {
      id
      empID
      annualLeave
      annualLeaveDate
      compasLeave
      destinateLeavePass
      durLeavePass
      dateLeavePass
      leavePass
      materLeave
      mrageLeave
      paterLeave
      sickLeave
      sickLeaveDate
      hospLeave
      pervAnnualLeaveBal
      sickLeaveTaken
      remainAnnualLeave
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmpLeaveDetails = /* GraphQL */ `
  mutation DeleteEmpLeaveDetails(
    $input: DeleteEmpLeaveDetailsInput!
    $condition: ModelEmpLeaveDetailsConditionInput
  ) {
    deleteEmpLeaveDetails(input: $input, condition: $condition) {
      id
      empID
      annualLeave
      annualLeaveDate
      compasLeave
      destinateLeavePass
      durLeavePass
      dateLeavePass
      leavePass
      materLeave
      mrageLeave
      paterLeave
      sickLeave
      sickLeaveDate
      hospLeave
      pervAnnualLeaveBal
      sickLeaveTaken
      remainAnnualLeave
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTerminationInfo = /* GraphQL */ `
  mutation CreateTerminationInfo(
    $input: CreateTerminationInfoInput!
    $condition: ModelTerminationInfoConditionInput
  ) {
    createTerminationInfo(input: $input, condition: $condition) {
      id
      empID
      resignDate
      resignNotProb
      otherResignNotProb
      resignNotConf
      otherResignNotConf
      reasonResign
      reasonTerminate
      termiDate
      termiNotProb
      otherTermiNotProb
      termiNotConf
      otherTermiNotConf
      WIContract
      WIProbation
      WIResignation
      WITermination
      WILeaveEntitle
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTerminationInfo = /* GraphQL */ `
  mutation UpdateTerminationInfo(
    $input: UpdateTerminationInfoInput!
    $condition: ModelTerminationInfoConditionInput
  ) {
    updateTerminationInfo(input: $input, condition: $condition) {
      id
      empID
      resignDate
      resignNotProb
      otherResignNotProb
      resignNotConf
      otherResignNotConf
      reasonResign
      reasonTerminate
      termiDate
      termiNotProb
      otherTermiNotProb
      termiNotConf
      otherTermiNotConf
      WIContract
      WIProbation
      WIResignation
      WITermination
      WILeaveEntitle
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTerminationInfo = /* GraphQL */ `
  mutation DeleteTerminationInfo(
    $input: DeleteTerminationInfoInput!
    $condition: ModelTerminationInfoConditionInput
  ) {
    deleteTerminationInfo(input: $input, condition: $condition) {
      id
      empID
      resignDate
      resignNotProb
      otherResignNotProb
      resignNotConf
      otherResignNotConf
      reasonResign
      reasonTerminate
      termiDate
      termiNotProb
      otherTermiNotProb
      termiNotConf
      otherTermiNotConf
      WIContract
      WIProbation
      WIResignation
      WITermination
      WILeaveEntitle
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmpWorkInfo = /* GraphQL */ `
  mutation CreateEmpWorkInfo(
    $input: CreateEmpWorkInfoInput!
    $condition: ModelEmpWorkInfoConditionInput
  ) {
    createEmpWorkInfo(input: $input, condition: $condition) {
      id
      empID
      contractStart
      contractEnd
      contractPeriod
      doj
      department
      hr
      jobCat
      jobDesc
      manager
      otherJobCat
      otherDepartment
      otherPosition
      probationStart
      probationEnd
      probDuration
      position
      relationship
      supervisor
      skillPool
      salaryType
      sapNo
      upgradeDate
      upgradePosition
      workStatus
      workHrs
      workWeek
      workMonth
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmpWorkInfo = /* GraphQL */ `
  mutation UpdateEmpWorkInfo(
    $input: UpdateEmpWorkInfoInput!
    $condition: ModelEmpWorkInfoConditionInput
  ) {
    updateEmpWorkInfo(input: $input, condition: $condition) {
      id
      empID
      contractStart
      contractEnd
      contractPeriod
      doj
      department
      hr
      jobCat
      jobDesc
      manager
      otherJobCat
      otherDepartment
      otherPosition
      probationStart
      probationEnd
      probDuration
      position
      relationship
      supervisor
      skillPool
      salaryType
      sapNo
      upgradeDate
      upgradePosition
      workStatus
      workHrs
      workWeek
      workMonth
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmpWorkInfo = /* GraphQL */ `
  mutation DeleteEmpWorkInfo(
    $input: DeleteEmpWorkInfoInput!
    $condition: ModelEmpWorkInfoConditionInput
  ) {
    deleteEmpWorkInfo(input: $input, condition: $condition) {
      id
      empID
      contractStart
      contractEnd
      contractPeriod
      doj
      department
      hr
      jobCat
      jobDesc
      manager
      otherJobCat
      otherDepartment
      otherPosition
      probationStart
      probationEnd
      probDuration
      position
      relationship
      supervisor
      skillPool
      salaryType
      sapNo
      upgradeDate
      upgradePosition
      workStatus
      workHrs
      workWeek
      workMonth
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEmpPersonalInfo = /* GraphQL */ `
  mutation CreateEmpPersonalInfo(
    $input: CreateEmpPersonalInfoInput!
    $condition: ModelEmpPersonalInfoConditionInput
  ) {
    createEmpPersonalInfo(input: $input, condition: $condition) {
      id
      empID
      age
      aTQualify
      alternateNo
      agent
      bankName
      bankAccNo
      contactNo
      cob
      contractType
      ctryOfOrigin
      chinese
      dob
      educLevel
      email
      eduDetails
      empBadgeNo
      empType
      familyDetails
      gender
      lang
      marital
      name
      officialEmail
      oCOfOrigin
      profilePhoto
      permanentAddress
      position
      sapNo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmpPersonalInfo = /* GraphQL */ `
  mutation UpdateEmpPersonalInfo(
    $input: UpdateEmpPersonalInfoInput!
    $condition: ModelEmpPersonalInfoConditionInput
  ) {
    updateEmpPersonalInfo(input: $input, condition: $condition) {
      id
      empID
      age
      aTQualify
      alternateNo
      agent
      bankName
      bankAccNo
      contactNo
      cob
      contractType
      ctryOfOrigin
      chinese
      dob
      educLevel
      email
      eduDetails
      empBadgeNo
      empType
      familyDetails
      gender
      lang
      marital
      name
      officialEmail
      oCOfOrigin
      profilePhoto
      permanentAddress
      position
      sapNo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmpPersonalInfo = /* GraphQL */ `
  mutation DeleteEmpPersonalInfo(
    $input: DeleteEmpPersonalInfoInput!
    $condition: ModelEmpPersonalInfoConditionInput
  ) {
    deleteEmpPersonalInfo(input: $input, condition: $condition) {
      id
      empID
      age
      aTQualify
      alternateNo
      agent
      bankName
      bankAccNo
      contactNo
      cob
      contractType
      ctryOfOrigin
      chinese
      dob
      educLevel
      email
      eduDetails
      empBadgeNo
      empType
      familyDetails
      gender
      lang
      marital
      name
      officialEmail
      oCOfOrigin
      profilePhoto
      permanentAddress
      position
      sapNo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createIDDetails = /* GraphQL */ `
  mutation CreateIDDetails(
    $input: CreateIDDetailsInput!
    $condition: ModelIDDetailsConditionInput
  ) {
    createIDDetails(input: $input, condition: $condition) {
      id
      empID
      applicationUpload
      bwnIcNo
      bwnIcColour
      bwnIcExpiry
      bwnUpload
      cvCertifyUpload
      driveLic
      inducBrief
      inducBriefUp
      loiUpload
      myIcNo
      myIcUpload
      nationality
      nationalCat
      otherNation
      otherRace
      otherReligion
      ppNo
      paafCvevUpload
      ppIssued
      ppExpiry
      ppUpload
      ppDestinate
      preEmp
      preEmpPeriod
      race
      religion
      supportDocUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateIDDetails = /* GraphQL */ `
  mutation UpdateIDDetails(
    $input: UpdateIDDetailsInput!
    $condition: ModelIDDetailsConditionInput
  ) {
    updateIDDetails(input: $input, condition: $condition) {
      id
      empID
      applicationUpload
      bwnIcNo
      bwnIcColour
      bwnIcExpiry
      bwnUpload
      cvCertifyUpload
      driveLic
      inducBrief
      inducBriefUp
      loiUpload
      myIcNo
      myIcUpload
      nationality
      nationalCat
      otherNation
      otherRace
      otherReligion
      ppNo
      paafCvevUpload
      ppIssued
      ppExpiry
      ppUpload
      ppDestinate
      preEmp
      preEmpPeriod
      race
      religion
      supportDocUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteIDDetails = /* GraphQL */ `
  mutation DeleteIDDetails(
    $input: DeleteIDDetailsInput!
    $condition: ModelIDDetailsConditionInput
  ) {
    deleteIDDetails(input: $input, condition: $condition) {
      id
      empID
      applicationUpload
      bwnIcNo
      bwnIcColour
      bwnIcExpiry
      bwnUpload
      cvCertifyUpload
      driveLic
      inducBrief
      inducBriefUp
      loiUpload
      myIcNo
      myIcUpload
      nationality
      nationalCat
      otherNation
      otherRace
      otherReligion
      ppNo
      paafCvevUpload
      ppIssued
      ppExpiry
      ppUpload
      ppDestinate
      preEmp
      preEmpPeriod
      race
      religion
      supportDocUpload
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCandIToEMP = /* GraphQL */ `
  mutation CreateCandIToEMP(
    $input: CreateCandIToEMPInput!
    $condition: ModelCandIToEMPConditionInput
  ) {
    createCandIToEMP(input: $input, condition: $condition) {
      id
      empID
      crime
      crimeDesc
      emgDetails
      noExperience
      empStatement
      desc
      disease
      diseaseDesc
      liquor
      liquorDesc
      perIS
      perID
      referees
      relatives
      salaryExpectation
      supportInfo
      workExperience
      mobSignDate
      mobFile
      paafApproveDate
      paafFile
      loiIssueDate
      loiAcceptDate
      loiDeclineDate
      declineReason
      loiFile
      cvecApproveDate
      cvecFile
      uploadCertificate
      pcNoticePeriod
      venue
      managerBadgeNo
      message
      interType
      interTime
      interDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCandIToEMP = /* GraphQL */ `
  mutation UpdateCandIToEMP(
    $input: UpdateCandIToEMPInput!
    $condition: ModelCandIToEMPConditionInput
  ) {
    updateCandIToEMP(input: $input, condition: $condition) {
      id
      empID
      crime
      crimeDesc
      emgDetails
      noExperience
      empStatement
      desc
      disease
      diseaseDesc
      liquor
      liquorDesc
      perIS
      perID
      referees
      relatives
      salaryExpectation
      supportInfo
      workExperience
      mobSignDate
      mobFile
      paafApproveDate
      paafFile
      loiIssueDate
      loiAcceptDate
      loiDeclineDate
      declineReason
      loiFile
      cvecApproveDate
      cvecFile
      uploadCertificate
      pcNoticePeriod
      venue
      managerBadgeNo
      message
      interType
      interTime
      interDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCandIToEMP = /* GraphQL */ `
  mutation DeleteCandIToEMP(
    $input: DeleteCandIToEMPInput!
    $condition: ModelCandIToEMPConditionInput
  ) {
    deleteCandIToEMP(input: $input, condition: $condition) {
      id
      empID
      crime
      crimeDesc
      emgDetails
      noExperience
      empStatement
      desc
      disease
      diseaseDesc
      liquor
      liquorDesc
      perIS
      perID
      referees
      relatives
      salaryExpectation
      supportInfo
      workExperience
      mobSignDate
      mobFile
      paafApproveDate
      paafFile
      loiIssueDate
      loiAcceptDate
      loiDeclineDate
      declineReason
      loiFile
      cvecApproveDate
      cvecFile
      uploadCertificate
      pcNoticePeriod
      venue
      managerBadgeNo
      message
      interType
      interTime
      interDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLocalMobilization = /* GraphQL */ `
  mutation CreateLocalMobilization(
    $input: CreateLocalMobilizationInput!
    $condition: ModelLocalMobilizationConditionInput
  ) {
    createLocalMobilization(input: $input, condition: $condition) {
      id
      tempID
      mobSignDate
      mobFile
      paafApproveDate
      paafFile
      loiIssueDate
      loiAcceptDate
      loiDeclineDate
      declineReason
      loiFile
      cvecApproveDate
      cvecFile
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLocalMobilization = /* GraphQL */ `
  mutation UpdateLocalMobilization(
    $input: UpdateLocalMobilizationInput!
    $condition: ModelLocalMobilizationConditionInput
  ) {
    updateLocalMobilization(input: $input, condition: $condition) {
      id
      tempID
      mobSignDate
      mobFile
      paafApproveDate
      paafFile
      loiIssueDate
      loiAcceptDate
      loiDeclineDate
      declineReason
      loiFile
      cvecApproveDate
      cvecFile
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLocalMobilization = /* GraphQL */ `
  mutation DeleteLocalMobilization(
    $input: DeleteLocalMobilizationInput!
    $condition: ModelLocalMobilizationConditionInput
  ) {
    deleteLocalMobilization(input: $input, condition: $condition) {
      id
      tempID
      mobSignDate
      mobFile
      paafApproveDate
      paafFile
      loiIssueDate
      loiAcceptDate
      loiDeclineDate
      declineReason
      loiFile
      cvecApproveDate
      cvecFile
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createInterviewSchedule = /* GraphQL */ `
  mutation CreateInterviewSchedule(
    $input: CreateInterviewScheduleInput!
    $condition: ModelInterviewScheduleConditionInput
  ) {
    createInterviewSchedule(input: $input, condition: $condition) {
      id
      interDate
      interTime
      venue
      interType
      bagdeNo
      message
      tempID
      manager
      candidateStatus
      department
      otherDepartment
      status
      empID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateInterviewSchedule = /* GraphQL */ `
  mutation UpdateInterviewSchedule(
    $input: UpdateInterviewScheduleInput!
    $condition: ModelInterviewScheduleConditionInput
  ) {
    updateInterviewSchedule(input: $input, condition: $condition) {
      id
      interDate
      interTime
      venue
      interType
      bagdeNo
      message
      tempID
      manager
      candidateStatus
      department
      otherDepartment
      status
      empID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteInterviewSchedule = /* GraphQL */ `
  mutation DeleteInterviewSchedule(
    $input: DeleteInterviewScheduleInput!
    $condition: ModelInterviewScheduleConditionInput
  ) {
    deleteInterviewSchedule(input: $input, condition: $condition) {
      id
      interDate
      interTime
      venue
      interType
      bagdeNo
      message
      tempID
      manager
      candidateStatus
      department
      otherDepartment
      status
      empID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEducationDetails = /* GraphQL */ `
  mutation CreateEducationDetails(
    $input: CreateEducationDetailsInput!
    $condition: ModelEducationDetailsConditionInput
  ) {
    createEducationDetails(input: $input, condition: $condition) {
      id
      tempID
      crime
      crimeDesc
      emgDetails
      noExperience
      empStatement
      desc
      disease
      diseaseDesc
      liquor
      liquorDesc
      noticePeriod
      perIS
      perIDesc
      referees
      relatives
      salaryExpectation
      supportInfo
      uploadResume
      uploadCertificate
      uploadPp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEducationDetails = /* GraphQL */ `
  mutation UpdateEducationDetails(
    $input: UpdateEducationDetailsInput!
    $condition: ModelEducationDetailsConditionInput
  ) {
    updateEducationDetails(input: $input, condition: $condition) {
      id
      tempID
      crime
      crimeDesc
      emgDetails
      noExperience
      empStatement
      desc
      disease
      diseaseDesc
      liquor
      liquorDesc
      noticePeriod
      perIS
      perIDesc
      referees
      relatives
      salaryExpectation
      supportInfo
      uploadResume
      uploadCertificate
      uploadPp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEducationDetails = /* GraphQL */ `
  mutation DeleteEducationDetails(
    $input: DeleteEducationDetailsInput!
    $condition: ModelEducationDetailsConditionInput
  ) {
    deleteEducationDetails(input: $input, condition: $condition) {
      id
      tempID
      crime
      crimeDesc
      emgDetails
      noExperience
      empStatement
      desc
      disease
      diseaseDesc
      liquor
      liquorDesc
      noticePeriod
      perIS
      perIDesc
      referees
      relatives
      salaryExpectation
      supportInfo
      uploadResume
      uploadCertificate
      uploadPp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPersonalDetails = /* GraphQL */ `
  mutation CreatePersonalDetails(
    $input: CreatePersonalDetailsInput!
    $condition: ModelPersonalDetailsConditionInput
  ) {
    createPersonalDetails(input: $input, condition: $condition) {
      id
      tempID
      age
      alternateNo
      agent
      bwnIcNo
      bwnIcExpiry
      bwnIcColour
      contactNo
      cob
      contractType
      chinese
      dob
      driveLic
      email
      empType
      eduDetails
      familyDetails
      gender
      lang
      marital
      name
      nationality
      otherNation
      otherRace
      otherReligion
      ppNo
      ppIssued
      ppExpiry
      ppDestinate
      presentAddress
      permanentAddress
      profilePhoto
      position
      race
      religion
      status
      workExperience
      otherLang
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePersonalDetails = /* GraphQL */ `
  mutation UpdatePersonalDetails(
    $input: UpdatePersonalDetailsInput!
    $condition: ModelPersonalDetailsConditionInput
  ) {
    updatePersonalDetails(input: $input, condition: $condition) {
      id
      tempID
      age
      alternateNo
      agent
      bwnIcNo
      bwnIcExpiry
      bwnIcColour
      contactNo
      cob
      contractType
      chinese
      dob
      driveLic
      email
      empType
      eduDetails
      familyDetails
      gender
      lang
      marital
      name
      nationality
      otherNation
      otherRace
      otherReligion
      ppNo
      ppIssued
      ppExpiry
      ppDestinate
      presentAddress
      permanentAddress
      profilePhoto
      position
      race
      religion
      status
      workExperience
      otherLang
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePersonalDetails = /* GraphQL */ `
  mutation DeletePersonalDetails(
    $input: DeletePersonalDetailsInput!
    $condition: ModelPersonalDetailsConditionInput
  ) {
    deletePersonalDetails(input: $input, condition: $condition) {
      id
      tempID
      age
      alternateNo
      agent
      bwnIcNo
      bwnIcExpiry
      bwnIcColour
      contactNo
      cob
      contractType
      chinese
      dob
      driveLic
      email
      empType
      eduDetails
      familyDetails
      gender
      lang
      marital
      name
      nationality
      otherNation
      otherRace
      otherReligion
      ppNo
      ppIssued
      ppExpiry
      ppDestinate
      presentAddress
      permanentAddress
      profilePhoto
      position
      race
      religion
      status
      workExperience
      otherLang
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      empID
      selectType
      setPermissions
      password
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      empID
      selectType
      setPermissions
      password
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      empID
      selectType
      setPermissions
      password
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTicketRequest = /* GraphQL */ `
  mutation CreateTicketRequest(
    $input: CreateTicketRequestInput!
    $condition: ModelTicketRequestConditionInput
  ) {
    createTicketRequest(input: $input, condition: $condition) {
      id
      empID
      empStatus
      empDate
      empRemarks
      departureDate
      arrivalDate
      destination
      remarks
      hrStatus
      hrDate
      hrRemarks
      hrName
      hrEmpID
      from
      to
      fromDate
      toDate
      gmDate
      gmEmpID
      gmRemarks
      gmStatus
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTicketRequest = /* GraphQL */ `
  mutation UpdateTicketRequest(
    $input: UpdateTicketRequestInput!
    $condition: ModelTicketRequestConditionInput
  ) {
    updateTicketRequest(input: $input, condition: $condition) {
      id
      empID
      empStatus
      empDate
      empRemarks
      departureDate
      arrivalDate
      destination
      remarks
      hrStatus
      hrDate
      hrRemarks
      hrName
      hrEmpID
      from
      to
      fromDate
      toDate
      gmDate
      gmEmpID
      gmRemarks
      gmStatus
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTicketRequest = /* GraphQL */ `
  mutation DeleteTicketRequest(
    $input: DeleteTicketRequestInput!
    $condition: ModelTicketRequestConditionInput
  ) {
    deleteTicketRequest(input: $input, condition: $condition) {
      id
      empID
      empStatus
      empDate
      empRemarks
      departureDate
      arrivalDate
      destination
      remarks
      hrStatus
      hrDate
      hrRemarks
      hrName
      hrEmpID
      from
      to
      fromDate
      toDate
      gmDate
      gmEmpID
      gmRemarks
      gmStatus
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLeaveStatus = /* GraphQL */ `
  mutation CreateLeaveStatus(
    $input: CreateLeaveStatusInput!
    $condition: ModelLeaveStatusConditionInput
  ) {
    createLeaveStatus(input: $input, condition: $condition) {
      id
      empID
      leaveType
      fromDate
      toDate
      days
      applyTo
      reason
      medicalCertificate
      supervisorName
      supervisorEmpID
      supervisorStatus
      supervisorDate
      supervisorRemarks
      managerName
      managerEmpID
      managerStatus
      managerDate
      managerRemarks
      empStatus
      empDate
      empRemarks
      selectedTo
      selectedFrom
      startDate
      endDate
      receivedDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLeaveStatus = /* GraphQL */ `
  mutation UpdateLeaveStatus(
    $input: UpdateLeaveStatusInput!
    $condition: ModelLeaveStatusConditionInput
  ) {
    updateLeaveStatus(input: $input, condition: $condition) {
      id
      empID
      leaveType
      fromDate
      toDate
      days
      applyTo
      reason
      medicalCertificate
      supervisorName
      supervisorEmpID
      supervisorStatus
      supervisorDate
      supervisorRemarks
      managerName
      managerEmpID
      managerStatus
      managerDate
      managerRemarks
      empStatus
      empDate
      empRemarks
      selectedTo
      selectedFrom
      startDate
      endDate
      receivedDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLeaveStatus = /* GraphQL */ `
  mutation DeleteLeaveStatus(
    $input: DeleteLeaveStatusInput!
    $condition: ModelLeaveStatusConditionInput
  ) {
    deleteLeaveStatus(input: $input, condition: $condition) {
      id
      empID
      leaveType
      fromDate
      toDate
      days
      applyTo
      reason
      medicalCertificate
      supervisorName
      supervisorEmpID
      supervisorStatus
      supervisorDate
      supervisorRemarks
      managerName
      managerEmpID
      managerStatus
      managerDate
      managerRemarks
      empStatus
      empDate
      empRemarks
      selectedTo
      selectedFrom
      startDate
      endDate
      receivedDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
