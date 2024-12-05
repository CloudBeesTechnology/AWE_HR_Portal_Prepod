/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInsuranceType = /* GraphQL */ `
  query GetInsuranceType($id: ID!) {
    getInsuranceType(id: $id) {
      id
      typeIns
      insDetails
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listInsuranceTypes = /* GraphQL */ `
  query ListInsuranceTypes(
    $filter: ModelInsuranceTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInsuranceTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        typeIns
        insDetails
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGroupHandS = /* GraphQL */ `
  query GetGroupHandS($id: ID!) {
    getGroupHandS(id: $id) {
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
export const listGroupHandS = /* GraphQL */ `
  query ListGroupHandS(
    $filter: ModelGroupHandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupHandS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupHSExp
        groupHSNo
        groupHSUpload
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkMen = /* GraphQL */ `
  query GetWorkMen($id: ID!) {
    getWorkMen(id: $id) {
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
export const listWorkMen = /* GraphQL */ `
  query ListWorkMen(
    $filter: ModelWorkMenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkMen(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        empStatusType
        workmenCompExp
        workmenCompNo
        workmenComUp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTravelIns = /* GraphQL */ `
  query GetTravelIns($id: ID!) {
    getTravelIns(id: $id) {
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
export const listTravelIns = /* GraphQL */ `
  query ListTravelIns(
    $filter: ModelTravelInsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTravelIns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        travelExp
        travelNo
        travelUp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPersonalAccident = /* GraphQL */ `
  query GetPersonalAccident($id: ID!) {
    getPersonalAccident(id: $id) {
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
export const listPersonalAccidents = /* GraphQL */ `
  query ListPersonalAccidents(
    $filter: ModelPersonalAccidentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalAccidents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        perAccExp
        perAccNo
        perAccUp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInsClaim = /* GraphQL */ `
  query GetInsClaim($id: ID!) {
    getInsClaim(id: $id) {
      id
      empID
      insuranceClaims
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listInsClaims = /* GraphQL */ `
  query ListInsClaims(
    $filter: ModelInsClaimFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInsClaims(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        empID
        insuranceClaims
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProbForm = /* GraphQL */ `
  query GetProbForm($id: ID!) {
    getProbForm(id: $id) {
      id
      empID
      adaptability
      additionalInfo
      attention
      attitude
      commitment
      communication
      deadline
      department
      diligent
      doj
      empBadgeNo
      extendedProbationEndDate
      extensionPeriod
      gmApproved
      gmDate
      hrDate
      hrName
      initiative
      managerApproved
      managerDate
      managerName
      name
      pace
      position
      probationEnd
      quality
      recommendation
      responsibility
      supervisorApproved
      supervisorDate
      supervisorName
      teamwork
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProbForms = /* GraphQL */ `
  query ListProbForms(
    $filter: ModelProbFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProbForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        empID
        adaptability
        additionalInfo
        attention
        attitude
        commitment
        communication
        deadline
        department
        diligent
        doj
        empBadgeNo
        extendedProbationEndDate
        extensionPeriod
        gmApproved
        gmDate
        hrDate
        hrName
        initiative
        managerApproved
        managerDate
        managerName
        name
        pace
        position
        probationEnd
        quality
        recommendation
        responsibility
        supervisorApproved
        supervisorDate
        supervisorName
        teamwork
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEmailNotifi = /* GraphQL */ `
  query GetEmailNotifi($id: ID!) {
    getEmailNotifi(id: $id) {
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
export const listEmailNotifis = /* GraphQL */ `
  query ListEmailNotifis(
    $filter: ModelEmailNotifiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailNotifis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getOffshoreSheet = /* GraphQL */ `
  query GetOffshoreSheet($id: ID!) {
    getOffshoreSheet(id: $id) {
      id
      date
      dailySheet
      status
      manager
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listOffshoreSheets = /* GraphQL */ `
  query ListOffshoreSheets(
    $filter: ModelOffshoreSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOffshoreSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        dailySheet
        status
        manager
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getORMCSheet = /* GraphQL */ `
  query GetORMCSheet($id: ID!) {
    getORMCSheet(id: $id) {
      id
      date
      dailySheet
      status
      manager
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listORMCSheets = /* GraphQL */ `
  query ListORMCSheets(
    $filter: ModelORMCSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listORMCSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        dailySheet
        status
        manager
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSBWSheet = /* GraphQL */ `
  query GetSBWSheet($id: ID!) {
    getSBWSheet(id: $id) {
      id
      date
      dailySheet
      status
      manager
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSBWSheets = /* GraphQL */ `
  query ListSBWSheets(
    $filter: ModelSBWSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSBWSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        dailySheet
        status
        manager
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBlng = /* GraphQL */ `
  query GetBlng($id: ID!) {
    getBlng(id: $id) {
      id
      weeklySheet
      date
      status
      manager
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBlngs = /* GraphQL */ `
  query ListBlngs(
    $filter: ModelBlngFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlngs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        weeklySheet
        date
        status
        manager
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getHeadOffice = /* GraphQL */ `
  query GetHeadOffice($id: ID!) {
    getHeadOffice(id: $id) {
      id
      dailySheet
      date
      status
      manager
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listHeadOffices = /* GraphQL */ `
  query ListHeadOffices(
    $filter: ModelHeadOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeadOffices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dailySheet
        date
        status
        manager
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEmpRequisition = /* GraphQL */ `
  query GetEmpRequisition($id: ID!) {
    getEmpRequisition(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEmpRequisitions = /* GraphQL */ `
  query ListEmpRequisitions(
    $filter: ModelEmpRequisitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpRequisitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWeldingInfo = /* GraphQL */ `
  query GetWeldingInfo($id: ID!) {
    getWeldingInfo(id: $id) {
      id
      empID
      department
      diameterRange
      empBadgeNo
      empName
      fillerMetal
      position
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
export const listWeldingInfos = /* GraphQL */ `
  query ListWeldingInfos(
    $filter: ModelWeldingInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeldingInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        empID
        department
        diameterRange
        empBadgeNo
        empName
        fillerMetal
        position
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
      nextToken
      __typename
    }
  }
`;
export const getTrainingReq = /* GraphQL */ `
  query GetTrainingReq($id: ID!) {
    getTrainingReq(id: $id) {
      id
      empID
      MRNo
      medicalName
      medicalExpiry
      medicalAppointDate
      medicalReport
      purchaseONo
      traineeCourseCode
      traineeCourseName
      traineeCompany
      traineeSD
      traineeED
      traineeStatus
      traineeCourseFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTrainingReqs = /* GraphQL */ `
  query ListTrainingReqs(
    $filter: ModelTrainingReqFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingReqs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        empID
        MRNo
        medicalName
        medicalExpiry
        medicalAppointDate
        medicalReport
        purchaseONo
        traineeCourseCode
        traineeCourseName
        traineeCompany
        traineeSD
        traineeED
        traineeStatus
        traineeCourseFee
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTrainingCertificates = /* GraphQL */ `
  query GetTrainingCertificates($id: ID!) {
    getTrainingCertificates(id: $id) {
      id
      empID
      courseCode
      courseName
      company
      certifiExpiry
      eCertifiDate
      trainingUpCertifi
      orgiCertifiDate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTrainingCertificates = /* GraphQL */ `
  query ListTrainingCertificates(
    $filter: ModelTrainingCertificatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingCertificates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        empID
        courseCode
        courseName
        company
        certifiExpiry
        eCertifiDate
        trainingUpCertifi
        orgiCertifiDate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAddCourse = /* GraphQL */ `
  query GetAddCourse($id: ID!) {
    getAddCourse(id: $id) {
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
export const listAddCourses = /* GraphQL */ `
  query ListAddCourses(
    $filter: ModelAddCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        courseSelect
        courseName
        company
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEmpDepInsurance = /* GraphQL */ `
  query GetEmpDepInsurance($id: ID!) {
    getEmpDepInsurance(id: $id) {
      id
      empID
      depInsurance
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEmpDepInsurances = /* GraphQL */ `
  query ListEmpDepInsurances(
    $filter: ModelEmpDepInsuranceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpDepInsurances(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        empID
        depInsurance
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEmpInsurance = /* GraphQL */ `
  query GetEmpInsurance($id: ID!) {
    getEmpInsurance(id: $id) {
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
export const listEmpInsurances = /* GraphQL */ `
  query ListEmpInsurances(
    $filter: ModelEmpInsuranceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpInsurances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSawpDetails = /* GraphQL */ `
  query GetSawpDetails($id: ID!) {
    getSawpDetails(id: $id) {
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
export const listSawpDetails = /* GraphQL */ `
  query ListSawpDetails(
    $filter: ModelSawpDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSawpDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        empID
        sawpEmpLtrReq
        sawpEmpLtrReci
        sawpEmpUpload
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDNDetails = /* GraphQL */ `
  query GetDNDetails($id: ID!) {
    getDNDetails(id: $id) {
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
export const listDNDetails = /* GraphQL */ `
  query ListDNDetails(
    $filter: ModelDNDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDNDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getBJLDetails = /* GraphQL */ `
  query GetBJLDetails($id: ID!) {
    getBJLDetails(id: $id) {
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
export const listBJLDetails = /* GraphQL */ `
  query ListBJLDetails(
    $filter: ModelBJLDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBJLDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPassportValid = /* GraphQL */ `
  query GetPassportValid($id: ID!) {
    getPassportValid(id: $id) {
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
export const listPassportValids = /* GraphQL */ `
  query ListPassportValids(
    $filter: ModelPassportValidFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPassportValids(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getWPTracking = /* GraphQL */ `
  query GetWPTracking($id: ID!) {
    getWPTracking(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listWPTrackings = /* GraphQL */ `
  query ListWPTrackings(
    $filter: ModelWPTrackingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWPTrackings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEmployeeNonLocalAcco = /* GraphQL */ `
  query GetEmployeeNonLocalAcco($id: ID!) {
    getEmployeeNonLocalAcco(id: $id) {
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
export const listEmployeeNonLocalAccos = /* GraphQL */ `
  query ListEmployeeNonLocalAccos(
    $filter: ModelEmployeeNonLocalAccoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeeNonLocalAccos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        empID
        accommodation
        accommodationAddress
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLabourMedicalInfo = /* GraphQL */ `
  query GetLabourMedicalInfo($id: ID!) {
    getLabourMedicalInfo(id: $id) {
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
export const listLabourMedicalInfos = /* GraphQL */ `
  query ListLabourMedicalInfos(
    $filter: ModelLabourMedicalInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabourMedicalInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getServiceRecord = /* GraphQL */ `
  query GetServiceRecord($id: ID!) {
    getServiceRecord(id: $id) {
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
export const listServiceRecords = /* GraphQL */ `
  query ListServiceRecords(
    $filter: ModelServiceRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getEmpLeaveDetails = /* GraphQL */ `
  query GetEmpLeaveDetails($id: ID!) {
    getEmpLeaveDetails(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEmpLeaveDetails = /* GraphQL */ `
  query ListEmpLeaveDetails(
    $filter: ModelEmpLeaveDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpLeaveDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTerminationInfo = /* GraphQL */ `
  query GetTerminationInfo($id: ID!) {
    getTerminationInfo(id: $id) {
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
export const listTerminationInfos = /* GraphQL */ `
  query ListTerminationInfos(
    $filter: ModelTerminationInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTerminationInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getEmpWorkInfo = /* GraphQL */ `
  query GetEmpWorkInfo($id: ID!) {
    getEmpWorkInfo(id: $id) {
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
export const listEmpWorkInfos = /* GraphQL */ `
  query ListEmpWorkInfos(
    $filter: ModelEmpWorkInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpWorkInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getEmpPersonalInfo = /* GraphQL */ `
  query GetEmpPersonalInfo($id: ID!) {
    getEmpPersonalInfo(id: $id) {
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
export const listEmpPersonalInfos = /* GraphQL */ `
  query ListEmpPersonalInfos(
    $filter: ModelEmpPersonalInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmpPersonalInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getIDDetails = /* GraphQL */ `
  query GetIDDetails($id: ID!) {
    getIDDetails(id: $id) {
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
export const listIDDetails = /* GraphQL */ `
  query ListIDDetails(
    $filter: ModelIDDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIDDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCandIToEMP = /* GraphQL */ `
  query GetCandIToEMP($id: ID!) {
    getCandIToEMP(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCandIToEMPS = /* GraphQL */ `
  query ListCandIToEMPS(
    $filter: ModelCandIToEMPFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCandIToEMPS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLocalMobilization = /* GraphQL */ `
  query GetLocalMobilization($id: ID!) {
    getLocalMobilization(id: $id) {
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
export const listLocalMobilizations = /* GraphQL */ `
  query ListLocalMobilizations(
    $filter: ModelLocalMobilizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocalMobilizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getInterviewSchedule = /* GraphQL */ `
  query GetInterviewSchedule($id: ID!) {
    getInterviewSchedule(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listInterviewSchedules = /* GraphQL */ `
  query ListInterviewSchedules(
    $filter: ModelInterviewScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterviewSchedules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEducationDetails = /* GraphQL */ `
  query GetEducationDetails($id: ID!) {
    getEducationDetails(id: $id) {
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
export const listEducationDetails = /* GraphQL */ `
  query ListEducationDetails(
    $filter: ModelEducationDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEducationDetails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPersonalDetails = /* GraphQL */ `
  query GetPersonalDetails($id: ID!) {
    getPersonalDetails(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPersonalDetails = /* GraphQL */ `
  query ListPersonalDetails(
    $filter: ModelPersonalDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonalDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTicketRequest = /* GraphQL */ `
  query GetTicketRequest($id: ID!) {
    getTicketRequest(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTicketRequests = /* GraphQL */ `
  query ListTicketRequests(
    $filter: ModelTicketRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTicketRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLeaveStatus = /* GraphQL */ `
  query GetLeaveStatus($id: ID!) {
    getLeaveStatus(id: $id) {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLeaveStatuses = /* GraphQL */ `
  query ListLeaveStatuses(
    $filter: ModelLeaveStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeaveStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
