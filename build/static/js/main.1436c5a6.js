/*! For license information please see main.1436c5a6.js.LICENSE.txt */
(() => {
  var e = {
      83646: (e, t, n) => {
        "use strict";
        n.d(t, {
          $1: () => R,
          $m: () => g,
          CT: () => i,
          C_: () => b,
          Gz: () => A,
          HQ: () => d,
          Io: () => O,
          Kc: () => v,
          MC: () => u,
          N8: () => p,
          TV: () => h,
          WQ: () => a,
          YT: () => m,
          Yv: () => o,
          ZZ: () => L,
          _n: () => F,
          bJ: () => x,
          c2: () => D,
          dt: () => c,
          eC: () => r,
          gD: () => f,
          iS: () => w,
          it: () => N,
          lv: () => S,
          lx: () => k,
          nL: () => E,
          om: () => C,
          pw: () => P,
          sU: () => T,
          tt: () => M,
          uh: () => I,
          vL: () => l,
          wQ: () => s,
          yf: () => _,
          yz: () => y,
        });
        const r =
            "\n  query ListHiringJobs(\n    $filter: ModelHiringJobFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listHiringJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        jobTitle\n        exper\n        location\n        quantityPerson\n        startDate\n        expiryDate\n        jobContent\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          o =
            "\n  query ListInsuranceTypes(\n    $filter: ModelInsuranceTypeFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listInsuranceTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        typeIns\n        insDetails\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          i =
            "\n  query ListGroupHandS(\n    $filter: ModelGroupHandSFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listGroupHandS(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        groupHSExp\n        groupHSNo\n        groupHSUpload\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          a =
            "\n  query ListWorkMen(\n    $filter: ModelWorkMenFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listWorkMen(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empStatusType\n        workmenCompExp\n        workmenCompNo\n        workmenComUp\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          s =
            "\n  query ListTravelIns(\n    $filter: ModelTravelInsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listTravelIns(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        travelExp\n        travelNo\n        travelUp\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          l =
            "\n  query ListPersonalAccidents(\n    $filter: ModelPersonalAccidentFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPersonalAccidents(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        perAccExp\n        perAccNo\n        perAccUp\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          u =
            "\n  query ListInsClaims(\n    $filter: ModelInsClaimFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listInsClaims(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        insuranceClaims\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          c =
            "\n  query ListEmailNotifis(\n    $filter: ModelEmailNotifiFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmailNotifis(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        leaveType\n        senderEmail\n        receipentEmail\n        receipentEmpID\n        status\n        message\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          d =
            "\n  query ListOffshoreSheets(\n    $filter: ModelOffshoreSheetFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listOffshoreSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        date\n        dailySheet\n        status\n        manager\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          f =
            "\n  query ListORMCSheets(\n    $filter: ModelORMCSheetFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listORMCSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        date\n        dailySheet\n        status\n        manager\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          p =
            "\n  query ListSBWSheets(\n    $filter: ModelSBWSheetFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listSBWSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        date\n        dailySheet\n        status\n        manager\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          h =
            "\n  query ListBlngs(\n    $filter: ModelBlngFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listBlngs(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        weeklySheet\n        date\n        status\n        manager\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          m =
            "\n  query ListHeadOffices(\n    $filter: ModelHeadOfficeFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listHeadOffices(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        dailySheet\n        date\n        status\n        manager\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          v =
            "\n  query ListEmpRequisitions(\n    $filter: ModelEmpRequisitionFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmpRequisitions(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        department\n        justification\n        project\n        position\n        quantity\n        qualification\n        reasonForReq\n        replacementFor\n        tentativeDate\n        status\n        remarkReq\n        reqName\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          y =
            "\n  query ListAddCourses(\n    $filter: ModelAddCourseFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listAddCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        courseSelect\n        courseName\n        company\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          g =
            "\n  query ListEmpDepInsurances(\n    $filter: ModelEmpDepInsuranceFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmpDepInsurances(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        empID\n        depInsurance\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          b =
            "\n  query ListEmpInsurances(\n    $filter: ModelEmpInsuranceFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmpInsurances(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        groupIns\n        groupInsEffectDate\n        groupInsEndDate\n        empStatusType\n        workmenCompNo\n        travelIns\n        accidentIns\n        empInsUpload\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          w =
            "\n  query ListSawpDetails(\n    $filter: ModelSawpDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listSawpDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        sawpEmpLtrReq\n        sawpEmpLtrReci\n        sawpEmpUpload\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          S =
            "\n  query ListDNDetails(\n    $filter: ModelDNDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listDNDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        doeEmpSubmit\n        doeEmpApproval\n        doeEmpValid\n        doeEmpRefNo\n        doeEmpUpload\n        permitType\n        nlmsEmpSubmit\n        nlmsEmpSubmitRefNo\n        nlmsEmpApproval\n        nlmsRefNo\n        nlmsEmpValid\n        nlmsEmpUpload\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          k =
            "\n  query ListBJLDetails(\n    $filter: ModelBJLDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listBJLDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        bankSubmit\n        bankRece\n        bankRefNo\n        bankAmt\n        bankValid\n        bankEndorse\n        bankEmpUpload\n        tbaPurchase\n        jitpaAmt\n        jpValid\n        jpEndorse\n        jpEmpUpload\n        lbrReceiptNo\n        lbrDepoAmt\n        lbrDepoSubmit\n        lbrDepoUpload\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          E =
            "\n  query ListPassportValids(\n    $filter: ModelPassportValidFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPassportValids(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        ppLocation\n        arrivStampUpload\n        immigEmpUpload\n        reEntryUpload\n        arrivStampExp\n        immigRefNo\n        ppSubmit\n        empPassExp\n        empPassStatus\n        airTktStatus\n        reEntryVisa\n        immigApproval\n        reEntryVisaExp\n        remarkImmig\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          T =
            "\n  query ListEmployeeNonLocalAccos(\n    $filter: ModelEmployeeNonLocalAccoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmployeeNonLocalAccos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        empID\n        accommodation\n        accommodationAddress\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          A =
            "\n  query ListLabourMedicalInfos(\n    $filter: ModelLabourMedicalInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listLabourMedicalInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        empID\n        overMD\n        overME\n        bruhimsRD\n        bruhimsRNo\n        bruneiMAD\n        bruneiME\n        uploadFitness\n        uploadRegis\n        uploadBwn\n        dependPass\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          _ =
            "\n  query ListServiceRecords(\n    $filter: ModelServiceRecordFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listServiceRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        depEmpDate\n        depEmp\n        positionRev\n        positionRevDate\n        revSalary\n        revSalaryDate\n        revLeavePass\n        revLeaveDate\n        revAnnualLeave\n        revALD\n        remarkWI\n        uploadPR\n        uploadSP\n        uploadLP\n        uploadAL\n        uploadDep\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          I =
            "\n  query ListEmpLeaveDetails(\n    $filter: ModelEmpLeaveDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmpLeaveDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        annualLeave\n        annualLeaveDate\n        compasLeave\n        destinateLeavePass\n        durLeavePass\n        dateLeavePass\n        leavePass\n        materLeave\n        mrageLeave\n        paterLeave\n        sickLeave\n        sickLeaveDate\n        hospLeave\n        remainingAnualLeave\n        remainingSickLeave\n        remainingMateLeave\n        remainingMrageLeave\n        remainingPaternityLeave\n        remainingHosLeave\n        remainingCompasLeave\n        unPaidAuthorize\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          C =
            "\n  query ListTerminationInfos(\n    $filter: ModelTerminationInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listTerminationInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        empID\n        resignDate\n        resignNotProb\n        otherResignNotProb\n        resignNotConf\n        otherResignNotConf\n        reasonResign\n        reasonTerminate\n        termiDate\n        termiNotProb\n        otherTermiNotProb\n        termiNotConf\n        otherTermiNotConf\n        WIContract\n        WIProbation\n        WIResignation\n        WITermination\n        WILeaveEntitle\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          x =
            "\n  query ListEmpWorkInfos(\n    $filter: ModelEmpWorkInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmpWorkInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        contractStart\n        contractEnd\n        contractPeriod\n        doj\n        department\n        hr\n        jobCat\n        jobDesc\n        manager\n        otherJobCat\n        otherDepartment\n        otherPosition\n        probationStart\n        probationEnd\n        probDuration\n        position\n        relationship\n        supervisor\n        skillPool\n        salaryType\n        sapNo\n        upgradeDate\n        upgradePosition\n        workStatus\n        workHrs\n        workWeek\n        workMonth\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          N =
            "\n  query ListEmpPersonalInfos(\n    $filter: ModelEmpPersonalInfoFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEmpPersonalInfos(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        empID\n        age\n        aTQualify\n        alternateNo\n        agent\n        bankName\n        bankAccNo\n        contactNo\n        cob\n        contractType\n        ctryOfOrigin\n        chinese\n        dob\n        educLevel\n        email\n        eduDetails\n        empBadgeNo\n        empType\n        familyDetails\n        gender\n        lang\n        marital\n        name\n        officialEmail\n        oCOfOrigin\n        profilePhoto\n        permanentAddress\n        position\n        sapNo\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          O =
            "\n  query ListIDDetails(\n    $filter: ModelIDDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listIDDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        applicationUpload\n        bwnIcNo\n        bwnIcColour\n        bwnIcExpiry\n        bwnUpload\n        cvCertifyUpload\n        driveLic\n        inducBrief\n        inducBriefUp\n        loiUpload\n        myIcNo\n        myIcUpload\n        nationality\n        nationalCat\n        otherNation\n        otherRace\n        otherReligion\n        ppNo\n        paafCvevUpload\n        ppIssued\n        ppExpiry\n        ppUpload\n        ppDestinate\n        preEmp\n        preEmpPeriod\n        race\n        religion\n        supportDocUpload\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          D =
            "\n  query ListInterviewSchedules(\n    $filter: ModelInterviewScheduleFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listInterviewSchedules(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        interDate\n        interTime\n        venue\n        interType\n        bagdeNo\n        message\n        tempID\n        manager\n        candidateStatus\n        department\n        otherDepartment\n        status\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          P =
            "\n  query ListEducationDetails(\n    $filter: ModelEducationDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listEducationDetails(\n      filter: $filter\n      limit: $limit\n      nextToken: $nextToken\n    ) {\n      items {\n        id\n        tempID\n        crime\n        crimeDesc\n        emgDetails\n        noExperience\n        empStatement\n        desc\n        disease\n        diseaseDesc\n        liquor\n        liquorDesc\n        noticePeriod\n        perIS\n        perIDesc\n        referees\n        relatives\n        salaryExpectation\n        supportInfo\n        uploadResume\n        uploadCertificate\n        uploadPp\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          R =
            "\n  query ListPersonalDetails(\n    $filter: ModelPersonalDetailsFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listPersonalDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        tempID\n        age\n        alternateNo\n        agent\n        bwnIcNo\n        bwnIcExpiry\n        bwnIcColour\n        contactNo\n        cob\n        contractType\n        chinese\n        dob\n        driveLic\n        email\n        empType\n        eduDetails\n        familyDetails\n        gender\n        lang\n        marital\n        name\n        nationality\n        otherNation\n        otherRace\n        otherReligion\n        ppNo\n        ppIssued\n        ppExpiry\n        ppDestinate\n        presentAddress\n        permanentAddress\n        profilePhoto\n        position\n        race\n        religion\n        status\n        workExperience\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          L =
            "\n  query ListUsers(\n    $filter: ModelUserFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        selectType\n        setPermissions\n        password\n        status\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          M =
            "\n  query ListTicketRequests(\n    $filter: ModelTicketRequestFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listTicketRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        empStatus\n        empDate\n        empRemarks\n        departureDate\n        arrivalDate\n        destination\n        remarks\n        hrStatus\n        hrDate\n        hrRemarks\n        hrName\n        hrEmpID\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n",
          F =
            "\n  query ListLeaveStatuses(\n    $filter: ModelLeaveStatusFilterInput\n    $limit: Int\n    $nextToken: String\n  ) {\n    listLeaveStatuses(filter: $filter, limit: $limit, nextToken: $nextToken) {\n      items {\n        id\n        empID\n        leaveType\n        fromDate\n        toDate\n        days\n        applyTo\n        reason\n        medicalCertificate\n        supervisorName\n        supervisorEmpID\n        supervisorStatus\n        supervisorDate\n        supervisorRemarks\n        managerName\n        managerEmpID\n        managerStatus\n        managerDate\n        managerRemarks\n        empStatus\n        empDate\n        empRemarks\n        createdAt\n        updatedAt\n        __typename\n      }\n      nextToken\n      __typename\n    }\n  }\n";
      },
      71444: (e, t, n) => {
        "use strict";
        n.d(t, { A: () => c, Y: () => l });
        var r = n(89379),
          o = n(68382),
          i = n(65043),
          a = n(83646),
          s = n(70579);
        const l = (0, i.createContext)(),
          u = (0, o.D)(),
          c = (e) => {
            let { children: t } = e;
            const [n, o] = (0, i.useState)({
              userData: [],
              empPIData: [],
              empLeaveStatusData: [],
              empPDData: [],
              IDData: [],
              workInfoData: [],
              terminateData: [],
              leaveDetailsData: [],
              SRData: [],
              educDetailsData: [],
              DNData: [],
              BJLData: [],
              PPValidsData: [],
              LMIData: [],
              EmpInsuranceData: [],
              depInsuranceData: [],
              NLAData: [],
              SawpDetails: [],
              IVSSDetails: [],
              AddCourseDetails: [],
              insuranceClaimsData: [],
              workMenDetails: [],
              hiringData: [],
            });
            return (
              (0, i.useEffect)(() => {
                (async () => {
                  try {
                    const e = [
                        { query: a.ZZ, key: "userData" },
                        { query: a.$1, key: "empPDData" },
                        { query: a.pw, key: "educDetailsData" },
                        { query: a._n, key: "empLeaveStatusData" },
                        { query: a.it, key: "empPIData" },
                        { query: a.Io, key: "IDData" },
                        { query: a.bJ, key: "workInfoData" },
                        { query: a.om, key: "terminateData" },
                        { query: a.uh, key: "leaveDetailsData" },
                        { query: a.yf, key: "SRData" },
                        { query: a.lv, key: "DNData" },
                        { query: a.lx, key: "BJLData" },
                        { query: a.nL, key: "PPValidsData" },
                        { query: a.Gz, key: "LMIData" },
                        { query: a.C_, key: "EmpInsuranceData" },
                        { query: a.$m, key: "depInsuranceData" },
                        { query: a.iS, key: "SawpDetails" },
                        { query: a.c2, key: "IVSSDetails" },
                        { query: a.sU, key: "NLAData" },
                        { query: a.yz, key: "AddCourseDetails" },
                        { query: a.MC, key: "insuranceClaimsData" },
                        { query: a.WQ, key: "workMenDetails" },
                        { query: a.eC, key: "hiringData" },
                      ],
                      t = 1e4,
                      n = await Promise.all(
                        e.map((e) => {
                          let { query: n } = e;
                          return u
                            .graphql({ query: n, variables: { limit: t } })
                            .catch(
                              (e) => (
                                console.error("GraphQL Error:", e),
                                { data: { items: [] } }
                              )
                            );
                        })
                      ),
                      i = e.reduce((e, t, o) => {
                        var i, a, s;
                        let { key: l } = t;
                        const u =
                          (null === (i = n[o]) ||
                          void 0 === i ||
                          null === (a = i.data) ||
                          void 0 === a ||
                          null === (s = a[Object.keys(n[o].data)[0]]) ||
                          void 0 === s
                            ? void 0
                            : s.items) || [];
                        return (0, r.A)((0, r.A)({}, e), {}, { [l]: u });
                      }, {});
                    console.log(i), o((e) => (0, r.A)((0, r.A)({}, e), i));
                  } catch (e) {
                    console.error("Data Fetch Error:", e);
                  }
                })();
              }, []),
              (0, s.jsx)(l.Provider, { value: n, children: t })
            );
          };
      },
      83157: (e, t, n) => {
        "use strict";
        n.d(t, { I: () => f });
        var r = n(6326),
          o = 64,
          i = new Uint32Array([
            1116352408, 1899447441, 3049323471, 3921009573, 961987163,
            1508970993, 2453635748, 2870763221, 3624381080, 310598401,
            607225278, 1426881987, 1925078388, 2162078206, 2614888103,
            3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
            1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
            2952996808, 3210313671, 3336571891, 3584528711, 113926993,
            338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
            1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
            3259730800, 3345764771, 3516065817, 3600352804, 4094571909,
            275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
            1322822218, 1537002063, 1747873779, 1955562222, 2024104815,
            2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
          ]),
          a = [
            1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
            2600822924, 528734635, 1541459225,
          ],
          s = Math.pow(2, 53) - 1,
          l = (function () {
            function e() {
              (this.state = Int32Array.from(a)),
                (this.temp = new Int32Array(64)),
                (this.buffer = new Uint8Array(64)),
                (this.bufferLength = 0),
                (this.bytesHashed = 0),
                (this.finished = !1);
            }
            return (
              (e.prototype.update = function (e) {
                if (this.finished)
                  throw new Error(
                    "Attempted to update an already finished hash."
                  );
                var t = 0,
                  n = e.byteLength;
                if (((this.bytesHashed += n), 8 * this.bytesHashed > s))
                  throw new Error("Cannot hash more than 2^53 - 1 bits");
                for (; n > 0; )
                  (this.buffer[this.bufferLength++] = e[t++]),
                    n--,
                    this.bufferLength === o &&
                      (this.hashBuffer(), (this.bufferLength = 0));
              }),
              (e.prototype.digest = function () {
                if (!this.finished) {
                  var e = 8 * this.bytesHashed,
                    t = new DataView(
                      this.buffer.buffer,
                      this.buffer.byteOffset,
                      this.buffer.byteLength
                    ),
                    n = this.bufferLength;
                  if ((t.setUint8(this.bufferLength++, 128), n % o >= 56)) {
                    for (var r = this.bufferLength; r < o; r++)
                      t.setUint8(r, 0);
                    this.hashBuffer(), (this.bufferLength = 0);
                  }
                  for (r = this.bufferLength; r < 56; r++) t.setUint8(r, 0);
                  t.setUint32(56, Math.floor(e / 4294967296), !0),
                    t.setUint32(60, e),
                    this.hashBuffer(),
                    (this.finished = !0);
                }
                var i = new Uint8Array(32);
                for (r = 0; r < 8; r++)
                  (i[4 * r] = (this.state[r] >>> 24) & 255),
                    (i[4 * r + 1] = (this.state[r] >>> 16) & 255),
                    (i[4 * r + 2] = (this.state[r] >>> 8) & 255),
                    (i[4 * r + 3] = (this.state[r] >>> 0) & 255);
                return i;
              }),
              (e.prototype.hashBuffer = function () {
                for (
                  var e = this.buffer,
                    t = this.state,
                    n = t[0],
                    r = t[1],
                    a = t[2],
                    s = t[3],
                    l = t[4],
                    u = t[5],
                    c = t[6],
                    d = t[7],
                    f = 0;
                  f < o;
                  f++
                ) {
                  if (f < 16)
                    this.temp[f] =
                      ((255 & e[4 * f]) << 24) |
                      ((255 & e[4 * f + 1]) << 16) |
                      ((255 & e[4 * f + 2]) << 8) |
                      (255 & e[4 * f + 3]);
                  else {
                    var p = this.temp[f - 2],
                      h =
                        ((p >>> 17) | (p << 15)) ^
                        ((p >>> 19) | (p << 13)) ^
                        (p >>> 10),
                      m =
                        (((p = this.temp[f - 15]) >>> 7) | (p << 25)) ^
                        ((p >>> 18) | (p << 14)) ^
                        (p >>> 3);
                    this.temp[f] =
                      ((h + this.temp[f - 7]) | 0) +
                      ((m + this.temp[f - 16]) | 0);
                  }
                  var v =
                      ((((((l >>> 6) | (l << 26)) ^
                        ((l >>> 11) | (l << 21)) ^
                        ((l >>> 25) | (l << 7))) +
                        ((l & u) ^ (~l & c))) |
                        0) +
                        ((d + ((i[f] + this.temp[f]) | 0)) | 0)) |
                      0,
                    y =
                      ((((n >>> 2) | (n << 30)) ^
                        ((n >>> 13) | (n << 19)) ^
                        ((n >>> 22) | (n << 10))) +
                        ((n & r) ^ (n & a) ^ (r & a))) |
                      0;
                  (d = c),
                    (c = u),
                    (u = l),
                    (l = (s + v) | 0),
                    (s = a),
                    (a = r),
                    (r = n),
                    (n = (v + y) | 0);
                }
                (t[0] += n),
                  (t[1] += r),
                  (t[2] += a),
                  (t[3] += s),
                  (t[4] += l),
                  (t[5] += u),
                  (t[6] += c),
                  (t[7] += d);
              }),
              e
            );
          })(),
          u = n(39152),
          c =
            "undefined" !== typeof Buffer && Buffer.from
              ? function (e) {
                  return Buffer.from(e, "utf8");
                }
              : u.a;
        function d(e) {
          return e instanceof Uint8Array
            ? e
            : "string" === typeof e
            ? c(e)
            : ArrayBuffer.isView(e)
            ? new Uint8Array(
                e.buffer,
                e.byteOffset,
                e.byteLength / Uint8Array.BYTES_PER_ELEMENT
              )
            : new Uint8Array(e);
        }
        var f = (function () {
          function e(e) {
            (this.secret = e), (this.hash = new l()), this.reset();
          }
          return (
            (e.prototype.update = function (e) {
              var t;
              if (
                ("string" === typeof (t = e)
                  ? 0 !== t.length
                  : 0 !== t.byteLength) &&
                !this.error
              )
                try {
                  this.hash.update(d(e));
                } catch (n) {
                  this.error = n;
                }
            }),
            (e.prototype.digestSync = function () {
              if (this.error) throw this.error;
              return this.outer
                ? (this.outer.finished || this.outer.update(this.hash.digest()),
                  this.outer.digest())
                : this.hash.digest();
            }),
            (e.prototype.digest = function () {
              return (0, r.sH)(this, void 0, void 0, function () {
                return (0, r.YH)(this, function (e) {
                  return [2, this.digestSync()];
                });
              });
            }),
            (e.prototype.reset = function () {
              if (((this.hash = new l()), this.secret)) {
                this.outer = new l();
                var e = (function (e) {
                    var t = d(e);
                    if (t.byteLength > o) {
                      var n = new l();
                      n.update(t), (t = n.digest());
                    }
                    var r = new Uint8Array(o);
                    return r.set(t), r;
                  })(this.secret),
                  t = new Uint8Array(o);
                t.set(e);
                for (var n = 0; n < o; n++) (e[n] ^= 54), (t[n] ^= 92);
                this.hash.update(e), this.outer.update(t);
                for (n = 0; n < e.byteLength; n++) e[n] = 0;
              }
            }),
            e
          );
        })();
      },
      21547: (e, t, n) => {
        "use strict";
        n.d(t, { n: () => i });
        const r = {},
          o = {};
        for (let a = 0; a < 256; a++) {
          let e = a.toString(16).toLowerCase();
          1 === e.length && (e = "0".concat(e)), (r[a] = e), (o[e] = a);
        }
        function i(e) {
          let t = "";
          for (let n = 0; n < e.byteLength; n++) t += r[e[n]];
          return t;
        }
      },
      39152: (e, t, n) => {
        "use strict";
        n.d(t, { a: () => r });
        const r = (e) => new TextEncoder().encode(e);
      },
      83175: (e, t) => {
        "use strict";
        const n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
          r = /^[\u0021-\u003A\u003C-\u007E]*$/,
          o =
            /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
          i = /^[\u0020-\u003A\u003D-\u007E]*$/,
          a = Object.prototype.toString,
          s = (() => {
            const e = function () {};
            return (e.prototype = Object.create(null)), e;
          })();
        function l(e, t, n) {
          do {
            const n = e.charCodeAt(t);
            if (32 !== n && 9 !== n) return t;
          } while (++t < n);
          return n;
        }
        function u(e, t, n) {
          for (; t > n; ) {
            const n = e.charCodeAt(--t);
            if (32 !== n && 9 !== n) return t + 1;
          }
          return n;
        }
        function c(e) {
          if (-1 === e.indexOf("%")) return e;
          try {
            return decodeURIComponent(e);
          } catch (t) {
            return e;
          }
        }
      },
      22740: (e) => {
        "use strict";
        e.exports = function (e, t, n, r, o, i, a, s) {
          if (!e) {
            var l;
            if (void 0 === t)
              l = new Error(
                "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
              );
            else {
              var u = [n, r, o, i, a, s],
                c = 0;
              (l = new Error(
                t.replace(/%s/g, function () {
                  return u[c++];
                })
              )).name = "Invariant Violation";
            }
            throw ((l.framesToPop = 1), l);
          }
        };
      },
      82730: (e, t, n) => {
        "use strict";
        var r = n(65043),
          o = n(77067);
        function i(e) {
          for (
            var t =
                "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
              n = 1;
            n < arguments.length;
            n++
          )
            t += "&args[]=" + encodeURIComponent(arguments[n]);
          return (
            "Minified React error #" +
            e +
            "; visit " +
            t +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        var a = new Set(),
          s = {};
        function l(e, t) {
          u(e, t), u(e + "Capture", t);
        }
        function u(e, t) {
          for (s[e] = t, e = 0; e < t.length; e++) a.add(t[e]);
        }
        var c = !(
            "undefined" === typeof window ||
            "undefined" === typeof window.document ||
            "undefined" === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          f =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          p = {},
          h = {};
        function m(e, t, n, r, o, i, a) {
          (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = r),
            (this.attributeNamespace = o),
            (this.mustUseProperty = n),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = i),
            (this.removeEmptyString = a);
        }
        var v = {};
        "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
          .split(" ")
          .forEach(function (e) {
            v[e] = new m(e, 0, !1, e, null, !1, !1);
          }),
          [
            ["acceptCharset", "accept-charset"],
            ["className", "class"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
          ].forEach(function (e) {
            var t = e[0];
            v[t] = new m(t, 1, !1, e[1], null, !1, !1);
          }),
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(
            function (e) {
              v[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1);
            }
          ),
          [
            "autoReverse",
            "externalResourcesRequired",
            "focusable",
            "preserveAlpha",
          ].forEach(function (e) {
            v[e] = new m(e, 2, !1, e, null, !1, !1);
          }),
          "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
            .split(" ")
            .forEach(function (e) {
              v[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1);
            }),
          ["checked", "multiple", "muted", "selected"].forEach(function (e) {
            v[e] = new m(e, 3, !0, e, null, !1, !1);
          }),
          ["capture", "download"].forEach(function (e) {
            v[e] = new m(e, 4, !1, e, null, !1, !1);
          }),
          ["cols", "rows", "size", "span"].forEach(function (e) {
            v[e] = new m(e, 6, !1, e, null, !1, !1);
          }),
          ["rowSpan", "start"].forEach(function (e) {
            v[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1);
          });
        var y = /[\-:]([a-z])/g;
        function g(e) {
          return e[1].toUpperCase();
        }
        function b(e, t, n, r) {
          var o = v.hasOwnProperty(t) ? v[t] : null;
          (null !== o
            ? 0 !== o.type
            : r ||
              !(2 < t.length) ||
              ("o" !== t[0] && "O" !== t[0]) ||
              ("n" !== t[1] && "N" !== t[1])) &&
            ((function (e, t, n, r) {
              if (
                null === t ||
                "undefined" === typeof t ||
                (function (e, t, n, r) {
                  if (null !== n && 0 === n.type) return !1;
                  switch (typeof t) {
                    case "function":
                    case "symbol":
                      return !0;
                    case "boolean":
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                            "aria-" !== e)
                      );
                    default:
                      return !1;
                  }
                })(e, t, n, r)
              )
                return !0;
              if (r) return !1;
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !t;
                  case 4:
                    return !1 === t;
                  case 5:
                    return isNaN(t);
                  case 6:
                    return isNaN(t) || 1 > t;
                }
              return !1;
            })(t, n, o, r) && (n = null),
            r || null === o
              ? (function (e) {
                  return (
                    !!d.call(h, e) ||
                    (!d.call(p, e) &&
                      (f.test(e) ? (h[e] = !0) : ((p[e] = !0), !1)))
                  );
                })(t) &&
                (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
              : o.mustUseProperty
              ? (e[o.propertyName] = null === n ? 3 !== o.type && "" : n)
              : ((t = o.attributeName),
                (r = o.attributeNamespace),
                null === n
                  ? e.removeAttribute(t)
                  : ((n =
                      3 === (o = o.type) || (4 === o && !0 === n)
                        ? ""
                        : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
        }
        "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
          .split(" ")
          .forEach(function (e) {
            var t = e.replace(y, g);
            v[t] = new m(t, 1, !1, e, null, !1, !1);
          }),
          "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
            .split(" ")
            .forEach(function (e) {
              var t = e.replace(y, g);
              v[t] = new m(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
            }),
          ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
            var t = e.replace(y, g);
            v[t] = new m(
              t,
              1,
              !1,
              e,
              "http://www.w3.org/XML/1998/namespace",
              !1,
              !1
            );
          }),
          ["tabIndex", "crossOrigin"].forEach(function (e) {
            v[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1);
          }),
          (v.xlinkHref = new m(
            "xlinkHref",
            1,
            !1,
            "xlink:href",
            "http://www.w3.org/1999/xlink",
            !0,
            !1
          )),
          ["src", "href", "action", "formAction"].forEach(function (e) {
            v[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0);
          });
        var w = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          S = Symbol.for("react.element"),
          k = Symbol.for("react.portal"),
          E = Symbol.for("react.fragment"),
          T = Symbol.for("react.strict_mode"),
          A = Symbol.for("react.profiler"),
          _ = Symbol.for("react.provider"),
          I = Symbol.for("react.context"),
          C = Symbol.for("react.forward_ref"),
          x = Symbol.for("react.suspense"),
          N = Symbol.for("react.suspense_list"),
          O = Symbol.for("react.memo"),
          D = Symbol.for("react.lazy");
        Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
        var P = Symbol.for("react.offscreen");
        Symbol.for("react.legacy_hidden"),
          Symbol.for("react.cache"),
          Symbol.for("react.tracing_marker");
        var R = Symbol.iterator;
        function L(e) {
          return null === e || "object" !== typeof e
            ? null
            : "function" === typeof (e = (R && e[R]) || e["@@iterator"])
            ? e
            : null;
        }
        var M,
          F = Object.assign;
        function U(e) {
          if (void 0 === M)
            try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              M = (t && t[1]) || "";
            }
          return "\n" + M + e;
        }
        var j = !1;
        function z(e, t) {
          if (!e || j) return "";
          j = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                "object" === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, []);
                } catch (u) {
                  var r = u;
                }
                Reflect.construct(e, [], t);
              } else {
                try {
                  t.call();
                } catch (u) {
                  r = u;
                }
                e.call(t.prototype);
              }
            else {
              try {
                throw Error();
              } catch (u) {
                r = u;
              }
              e();
            }
          } catch (u) {
            if (u && r && "string" === typeof u.stack) {
              for (
                var o = u.stack.split("\n"),
                  i = r.stack.split("\n"),
                  a = o.length - 1,
                  s = i.length - 1;
                1 <= a && 0 <= s && o[a] !== i[s];

              )
                s--;
              for (; 1 <= a && 0 <= s; a--, s--)
                if (o[a] !== i[s]) {
                  if (1 !== a || 1 !== s)
                    do {
                      if ((a--, 0 > --s || o[a] !== i[s])) {
                        var l = "\n" + o[a].replace(" at new ", " at ");
                        return (
                          e.displayName &&
                            l.includes("<anonymous>") &&
                            (l = l.replace("<anonymous>", e.displayName)),
                          l
                        );
                      }
                    } while (1 <= a && 0 <= s);
                  break;
                }
            }
          } finally {
            (j = !1), (Error.prepareStackTrace = n);
          }
          return (e = e ? e.displayName || e.name : "") ? U(e) : "";
        }
        function $(e) {
          switch (e.tag) {
            case 5:
              return U(e.type);
            case 16:
              return U("Lazy");
            case 13:
              return U("Suspense");
            case 19:
              return U("SuspenseList");
            case 0:
            case 2:
            case 15:
              return (e = z(e.type, !1));
            case 11:
              return (e = z(e.type.render, !1));
            case 1:
              return (e = z(e.type, !0));
            default:
              return "";
          }
        }
        function V(e) {
          if (null == e) return null;
          if ("function" === typeof e) return e.displayName || e.name || null;
          if ("string" === typeof e) return e;
          switch (e) {
            case E:
              return "Fragment";
            case k:
              return "Portal";
            case A:
              return "Profiler";
            case T:
              return "StrictMode";
            case x:
              return "Suspense";
            case N:
              return "SuspenseList";
          }
          if ("object" === typeof e)
            switch (e.$$typeof) {
              case I:
                return (e.displayName || "Context") + ".Consumer";
              case _:
                return (e._context.displayName || "Context") + ".Provider";
              case C:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      "" !== (e = t.displayName || t.name || "")
                        ? "ForwardRef(" + e + ")"
                        : "ForwardRef"),
                  e
                );
              case O:
                return null !== (t = e.displayName || null)
                  ? t
                  : V(e.type) || "Memo";
              case D:
                (t = e._payload), (e = e._init);
                try {
                  return V(e(t));
                } catch (n) {}
            }
          return null;
        }
        function K(e) {
          var t = e.type;
          switch (e.tag) {
            case 24:
              return "Cache";
            case 9:
              return (t.displayName || "Context") + ".Consumer";
            case 10:
              return (t._context.displayName || "Context") + ".Provider";
            case 18:
              return "DehydratedFragment";
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ""),
                t.displayName ||
                  ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef")
              );
            case 7:
              return "Fragment";
            case 5:
              return t;
            case 4:
              return "Portal";
            case 3:
              return "Root";
            case 6:
              return "Text";
            case 16:
              return V(t);
            case 8:
              return t === T ? "StrictMode" : "Mode";
            case 22:
              return "Offscreen";
            case 12:
              return "Profiler";
            case 21:
              return "Scope";
            case 13:
              return "Suspense";
            case 19:
              return "SuspenseList";
            case 25:
              return "TracingMarker";
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ("function" === typeof t)
                return t.displayName || t.name || null;
              if ("string" === typeof t) return t;
          }
          return null;
        }
        function q(e) {
          switch (typeof e) {
            case "boolean":
            case "number":
            case "string":
            case "undefined":
            case "object":
              return e;
            default:
              return "";
          }
        }
        function B(e) {
          var t = e.type;
          return (
            (e = e.nodeName) &&
            "input" === e.toLowerCase() &&
            ("checkbox" === t || "radio" === t)
          );
        }
        function H(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = B(e) ? "checked" : "value",
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = "" + e[t];
              if (
                !e.hasOwnProperty(t) &&
                "undefined" !== typeof n &&
                "function" === typeof n.get &&
                "function" === typeof n.set
              ) {
                var o = n.get,
                  i = n.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return o.call(this);
                    },
                    set: function (e) {
                      (r = "" + e), i.call(this, e);
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: n.enumerable }),
                  {
                    getValue: function () {
                      return r;
                    },
                    setValue: function (e) {
                      r = "" + e;
                    },
                    stopTracking: function () {
                      (e._valueTracker = null), delete e[t];
                    },
                  }
                );
              }
            })(e));
        }
        function W(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var n = t.getValue(),
            r = "";
          return (
            e && (r = B(e) ? (e.checked ? "true" : "false") : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          );
        }
        function G(e) {
          if (
            "undefined" ===
            typeof (e =
              e || ("undefined" !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        function Q(e, t) {
          var n = t.checked;
          return F({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked,
          });
        }
        function Y(e, t) {
          var n = null == t.defaultValue ? "" : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
          (n = q(null != t.value ? t.value : n)),
            (e._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                "checkbox" === t.type || "radio" === t.type
                  ? null != t.checked
                  : null != t.value,
            });
        }
        function J(e, t) {
          null != (t = t.checked) && b(e, "checked", t, !1);
        }
        function X(e, t) {
          J(e, t);
          var n = q(t.value),
            r = t.type;
          if (null != n)
            "number" === r
              ? ((0 === n && "" === e.value) || e.value != n) &&
                (e.value = "" + n)
              : e.value !== "" + n && (e.value = "" + n);
          else if ("submit" === r || "reset" === r)
            return void e.removeAttribute("value");
          t.hasOwnProperty("value")
            ? ee(e, t.type, n)
            : t.hasOwnProperty("defaultValue") &&
              ee(e, t.type, q(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked);
        }
        function Z(e, t, n) {
          if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
            var r = t.type;
            if (
              !(
                ("submit" !== r && "reset" !== r) ||
                (void 0 !== t.value && null !== t.value)
              )
            )
              return;
            (t = "" + e._wrapperState.initialValue),
              n || t === e.value || (e.value = t),
              (e.defaultValue = t);
          }
          "" !== (n = e.name) && (e.name = ""),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            "" !== n && (e.name = n);
        }
        function ee(e, t, n) {
          ("number" === t && G(e.ownerDocument) === e) ||
            (null == n
              ? (e.defaultValue = "" + e._wrapperState.initialValue)
              : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
        }
        var te = Array.isArray;
        function ne(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {};
            for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
            for (n = 0; n < e.length; n++)
              (o = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== o && (e[n].selected = o),
                o && r && (e[n].defaultSelected = !0);
          } else {
            for (n = "" + q(n), t = null, o = 0; o < e.length; o++) {
              if (e[o].value === n)
                return (
                  (e[o].selected = !0), void (r && (e[o].defaultSelected = !0))
                );
              null !== t || e[o].disabled || (t = e[o]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function re(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(i(91));
          return F({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue,
          });
        }
        function oe(e, t) {
          var n = t.value;
          if (null == n) {
            if (((n = t.children), (t = t.defaultValue), null != n)) {
              if (null != t) throw Error(i(92));
              if (te(n)) {
                if (1 < n.length) throw Error(i(93));
                n = n[0];
              }
              t = n;
            }
            null == t && (t = ""), (n = t);
          }
          e._wrapperState = { initialValue: q(n) };
        }
        function ie(e, t) {
          var n = q(t.value),
            r = q(t.defaultValue);
          null != n &&
            ((n = "" + n) !== e.value && (e.value = n),
            null == t.defaultValue &&
              e.defaultValue !== n &&
              (e.defaultValue = n)),
            null != r && (e.defaultValue = "" + r);
        }
        function ae(e) {
          var t = e.textContent;
          t === e._wrapperState.initialValue &&
            "" !== t &&
            null !== t &&
            (e.value = t);
        }
        function se(e) {
          switch (e) {
            case "svg":
              return "http://www.w3.org/2000/svg";
            case "math":
              return "http://www.w3.org/1998/Math/MathML";
            default:
              return "http://www.w3.org/1999/xhtml";
          }
        }
        function le(e, t) {
          return null == e || "http://www.w3.org/1999/xhtml" === e
            ? se(t)
            : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
            ? "http://www.w3.org/1999/xhtml"
            : e;
        }
        var ue,
          ce,
          de =
            ((ce = function (e, t) {
              if (
                "http://www.w3.org/2000/svg" !== e.namespaceURI ||
                "innerHTML" in e
              )
                e.innerHTML = t;
              else {
                for (
                  (ue = ue || document.createElement("div")).innerHTML =
                    "<svg>" + t.valueOf().toString() + "</svg>",
                    t = ue.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild);
                for (; t.firstChild; ) e.appendChild(t.firstChild);
              }
            }),
            "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ce(e, t);
                  });
                }
              : ce);
        function fe(e, t) {
          if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t);
          }
          e.textContent = t;
        }
        var pe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          he = ["Webkit", "ms", "Moz", "O"];
        function me(e, t, n) {
          return null == t || "boolean" === typeof t || "" === t
            ? ""
            : n ||
              "number" !== typeof t ||
              0 === t ||
              (pe.hasOwnProperty(e) && pe[e])
            ? ("" + t).trim()
            : t + "px";
        }
        function ve(e, t) {
          for (var n in ((e = e.style), t))
            if (t.hasOwnProperty(n)) {
              var r = 0 === n.indexOf("--"),
                o = me(n, t[n], r);
              "float" === n && (n = "cssFloat"),
                r ? e.setProperty(n, o) : (e[n] = o);
            }
        }
        Object.keys(pe).forEach(function (e) {
          he.forEach(function (t) {
            (t = t + e.charAt(0).toUpperCase() + e.substring(1)),
              (pe[t] = pe[e]);
          });
        });
        var ye = F(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        );
        function ge(e, t) {
          if (t) {
            if (
              ye[e] &&
              (null != t.children || null != t.dangerouslySetInnerHTML)
            )
              throw Error(i(137, e));
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(i(60));
              if (
                "object" !== typeof t.dangerouslySetInnerHTML ||
                !("__html" in t.dangerouslySetInnerHTML)
              )
                throw Error(i(61));
            }
            if (null != t.style && "object" !== typeof t.style)
              throw Error(i(62));
          }
        }
        function be(e, t) {
          if (-1 === e.indexOf("-")) return "string" === typeof t.is;
          switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return !1;
            default:
              return !0;
          }
        }
        var we = null;
        function Se(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var ke = null,
          Ee = null,
          Te = null;
        function Ae(e) {
          if ((e = wo(e))) {
            if ("function" !== typeof ke) throw Error(i(280));
            var t = e.stateNode;
            t && ((t = ko(t)), ke(e.stateNode, e.type, t));
          }
        }
        function _e(e) {
          Ee ? (Te ? Te.push(e) : (Te = [e])) : (Ee = e);
        }
        function Ie() {
          if (Ee) {
            var e = Ee,
              t = Te;
            if (((Te = Ee = null), Ae(e), t))
              for (e = 0; e < t.length; e++) Ae(t[e]);
          }
        }
        function Ce(e, t) {
          return e(t);
        }
        function xe() {}
        var Ne = !1;
        function Oe(e, t, n) {
          if (Ne) return e(t, n);
          Ne = !0;
          try {
            return Ce(e, t, n);
          } finally {
            (Ne = !1), (null !== Ee || null !== Te) && (xe(), Ie());
          }
        }
        function De(e, t) {
          var n = e.stateNode;
          if (null === n) return null;
          var r = ko(n);
          if (null === r) return null;
          n = r[t];
          e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (r = !r.disabled) ||
                (r = !(
                  "button" === (e = e.type) ||
                  "input" === e ||
                  "select" === e ||
                  "textarea" === e
                )),
                (e = !r);
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (n && "function" !== typeof n) throw Error(i(231, t, typeof n));
          return n;
        }
        var Pe = !1;
        if (c)
          try {
            var Re = {};
            Object.defineProperty(Re, "passive", {
              get: function () {
                Pe = !0;
              },
            }),
              window.addEventListener("test", Re, Re),
              window.removeEventListener("test", Re, Re);
          } catch (ce) {
            Pe = !1;
          }
        function Le(e, t, n, r, o, i, a, s, l) {
          var u = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(n, u);
          } catch (c) {
            this.onError(c);
          }
        }
        var Me = !1,
          Fe = null,
          Ue = !1,
          je = null,
          ze = {
            onError: function (e) {
              (Me = !0), (Fe = e);
            },
          };
        function $e(e, t, n, r, o, i, a, s, l) {
          (Me = !1), (Fe = null), Le.apply(ze, arguments);
        }
        function Ve(e) {
          var t = e,
            n = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return);
            } while (e);
          }
          return 3 === t.tag ? n : null;
        }
        function Ke(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function qe(e) {
          if (Ve(e) !== e) throw Error(i(188));
        }
        function Be(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = Ve(e))) throw Error(i(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t; ; ) {
                var o = n.return;
                if (null === o) break;
                var a = o.alternate;
                if (null === a) {
                  if (null !== (r = o.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (o.child === a.child) {
                  for (a = o.child; a; ) {
                    if (a === n) return qe(o), e;
                    if (a === r) return qe(o), t;
                    a = a.sibling;
                  }
                  throw Error(i(188));
                }
                if (n.return !== r.return) (n = o), (r = a);
                else {
                  for (var s = !1, l = o.child; l; ) {
                    if (l === n) {
                      (s = !0), (n = o), (r = a);
                      break;
                    }
                    if (l === r) {
                      (s = !0), (r = o), (n = a);
                      break;
                    }
                    l = l.sibling;
                  }
                  if (!s) {
                    for (l = a.child; l; ) {
                      if (l === n) {
                        (s = !0), (n = a), (r = o);
                        break;
                      }
                      if (l === r) {
                        (s = !0), (r = a), (n = o);
                        break;
                      }
                      l = l.sibling;
                    }
                    if (!s) throw Error(i(189));
                  }
                }
                if (n.alternate !== r) throw Error(i(190));
              }
              if (3 !== n.tag) throw Error(i(188));
              return n.stateNode.current === n ? e : t;
            })(e))
            ? He(e)
            : null;
        }
        function He(e) {
          if (5 === e.tag || 6 === e.tag) return e;
          for (e = e.child; null !== e; ) {
            var t = He(e);
            if (null !== t) return t;
            e = e.sibling;
          }
          return null;
        }
        var We = o.unstable_scheduleCallback,
          Ge = o.unstable_cancelCallback,
          Qe = o.unstable_shouldYield,
          Ye = o.unstable_requestPaint,
          Je = o.unstable_now,
          Xe = o.unstable_getCurrentPriorityLevel,
          Ze = o.unstable_ImmediatePriority,
          et = o.unstable_UserBlockingPriority,
          tt = o.unstable_NormalPriority,
          nt = o.unstable_LowPriority,
          rt = o.unstable_IdlePriority,
          ot = null,
          it = null;
        var at = Math.clz32
            ? Math.clz32
            : function (e) {
                return (e >>>= 0), 0 === e ? 32 : (31 - ((st(e) / lt) | 0)) | 0;
              },
          st = Math.log,
          lt = Math.LN2;
        var ut = 64,
          ct = 4194304;
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 1073741824;
            default:
              return e;
          }
        }
        function ft(e, t) {
          var n = e.pendingLanes;
          if (0 === n) return 0;
          var r = 0,
            o = e.suspendedLanes,
            i = e.pingedLanes,
            a = 268435455 & n;
          if (0 !== a) {
            var s = a & ~o;
            0 !== s ? (r = dt(s)) : 0 !== (i &= a) && (r = dt(i));
          } else 0 !== (a = n & ~o) ? (r = dt(a)) : 0 !== i && (r = dt(i));
          if (0 === r) return 0;
          if (
            0 !== t &&
            t !== r &&
            0 === (t & o) &&
            ((o = r & -r) >= (i = t & -t) || (16 === o && 0 !== (4194240 & i)))
          )
            return t;
          if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= r; 0 < t; )
              (o = 1 << (n = 31 - at(t))), (r |= e[n]), (t &= ~o);
          return r;
        }
        function pt(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function ht(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes)
            ? e
            : 1073741824 & e
            ? 1073741824
            : 0;
        }
        function mt() {
          var e = ut;
          return 0 === (4194240 & (ut <<= 1)) && (ut = 64), e;
        }
        function vt(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e);
          return t;
        }
        function yt(e, t, n) {
          (e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - at(t))] = n);
        }
        function gt(e, t) {
          var n = (e.entangledLanes |= t);
          for (e = e.entanglements; n; ) {
            var r = 31 - at(n),
              o = 1 << r;
            (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
          }
        }
        var bt = 0;
        function wt(e) {
          return 1 < (e &= -e)
            ? 4 < e
              ? 0 !== (268435455 & e)
                ? 16
                : 536870912
              : 4
            : 1;
        }
        var St,
          kt,
          Et,
          Tt,
          At,
          _t = !1,
          It = [],
          Ct = null,
          xt = null,
          Nt = null,
          Ot = new Map(),
          Dt = new Map(),
          Pt = [],
          Rt =
            "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
              " "
            );
        function Lt(e, t) {
          switch (e) {
            case "focusin":
            case "focusout":
              Ct = null;
              break;
            case "dragenter":
            case "dragleave":
              xt = null;
              break;
            case "mouseover":
            case "mouseout":
              Nt = null;
              break;
            case "pointerover":
            case "pointerout":
              Ot.delete(t.pointerId);
              break;
            case "gotpointercapture":
            case "lostpointercapture":
              Dt.delete(t.pointerId);
          }
        }
        function Mt(e, t, n, r, o, i) {
          return null === e || e.nativeEvent !== i
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: i,
                targetContainers: [o],
              }),
              null !== t && null !== (t = wo(t)) && kt(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== o && -1 === t.indexOf(o) && t.push(o),
              e);
        }
        function Ft(e) {
          var t = bo(e.target);
          if (null !== t) {
            var n = Ve(t);
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = Ke(n)))
                  return (
                    (e.blockedOn = t),
                    void At(e.priority, function () {
                      Et(n);
                    })
                  );
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function Ut(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Qt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (null !== n)
              return null !== (t = wo(n)) && kt(t), (e.blockedOn = n), !1;
            var r = new (n = e.nativeEvent).constructor(n.type, n);
            (we = r), n.target.dispatchEvent(r), (we = null), t.shift();
          }
          return !0;
        }
        function jt(e, t, n) {
          Ut(e) && n.delete(t);
        }
        function zt() {
          (_t = !1),
            null !== Ct && Ut(Ct) && (Ct = null),
            null !== xt && Ut(xt) && (xt = null),
            null !== Nt && Ut(Nt) && (Nt = null),
            Ot.forEach(jt),
            Dt.forEach(jt);
        }
        function $t(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            _t ||
              ((_t = !0),
              o.unstable_scheduleCallback(o.unstable_NormalPriority, zt)));
        }
        function Vt(e) {
          function t(t) {
            return $t(t, e);
          }
          if (0 < It.length) {
            $t(It[0], e);
            for (var n = 1; n < It.length; n++) {
              var r = It[n];
              r.blockedOn === e && (r.blockedOn = null);
            }
          }
          for (
            null !== Ct && $t(Ct, e),
              null !== xt && $t(xt, e),
              null !== Nt && $t(Nt, e),
              Ot.forEach(t),
              Dt.forEach(t),
              n = 0;
            n < Pt.length;
            n++
          )
            (r = Pt[n]).blockedOn === e && (r.blockedOn = null);
          for (; 0 < Pt.length && null === (n = Pt[0]).blockedOn; )
            Ft(n), null === n.blockedOn && Pt.shift();
        }
        var Kt = w.ReactCurrentBatchConfig,
          qt = !0;
        function Bt(e, t, n, r) {
          var o = bt,
            i = Kt.transition;
          Kt.transition = null;
          try {
            (bt = 1), Wt(e, t, n, r);
          } finally {
            (bt = o), (Kt.transition = i);
          }
        }
        function Ht(e, t, n, r) {
          var o = bt,
            i = Kt.transition;
          Kt.transition = null;
          try {
            (bt = 4), Wt(e, t, n, r);
          } finally {
            (bt = o), (Kt.transition = i);
          }
        }
        function Wt(e, t, n, r) {
          if (qt) {
            var o = Qt(e, t, n, r);
            if (null === o) qr(e, t, r, Gt, n), Lt(e, r);
            else if (
              (function (e, t, n, r, o) {
                switch (t) {
                  case "focusin":
                    return (Ct = Mt(Ct, e, t, n, r, o)), !0;
                  case "dragenter":
                    return (xt = Mt(xt, e, t, n, r, o)), !0;
                  case "mouseover":
                    return (Nt = Mt(Nt, e, t, n, r, o)), !0;
                  case "pointerover":
                    var i = o.pointerId;
                    return Ot.set(i, Mt(Ot.get(i) || null, e, t, n, r, o)), !0;
                  case "gotpointercapture":
                    return (
                      (i = o.pointerId),
                      Dt.set(i, Mt(Dt.get(i) || null, e, t, n, r, o)),
                      !0
                    );
                }
                return !1;
              })(o, e, t, n, r)
            )
              r.stopPropagation();
            else if ((Lt(e, r), 4 & t && -1 < Rt.indexOf(e))) {
              for (; null !== o; ) {
                var i = wo(o);
                if (
                  (null !== i && St(i),
                  null === (i = Qt(e, t, n, r)) && qr(e, t, r, Gt, n),
                  i === o)
                )
                  break;
                o = i;
              }
              null !== o && r.stopPropagation();
            } else qr(e, t, r, null, n);
          }
        }
        var Gt = null;
        function Qt(e, t, n, r) {
          if (((Gt = null), null !== (e = bo((e = Se(r))))))
            if (null === (t = Ve(e))) e = null;
            else if (13 === (n = t.tag)) {
              if (null !== (e = Ke(t))) return e;
              e = null;
            } else if (3 === n) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          return (Gt = e), null;
        }
        function Yt(e) {
          switch (e) {
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
              return 1;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "toggle":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
              return 4;
            case "message":
              switch (Xe()) {
                case Ze:
                  return 1;
                case et:
                  return 4;
                case tt:
                case nt:
                  return 16;
                case rt:
                  return 536870912;
                default:
                  return 16;
              }
            default:
              return 16;
          }
        }
        var Jt = null,
          Xt = null,
          Zt = null;
        function en() {
          if (Zt) return Zt;
          var e,
            t,
            n = Xt,
            r = n.length,
            o = "value" in Jt ? Jt.value : Jt.textContent,
            i = o.length;
          for (e = 0; e < r && n[e] === o[e]; e++);
          var a = r - e;
          for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
          return (Zt = o.slice(e, 1 < t ? 1 - t : void 0));
        }
        function tn(e) {
          var t = e.keyCode;
          return (
            "charCode" in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function nn() {
          return !0;
        }
        function rn() {
          return !1;
        }
        function on(e) {
          function t(t, n, r, o, i) {
            for (var a in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = o),
            (this.target = i),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(a) && ((t = e[a]), (this[a] = t ? t(o) : o[a]));
            return (
              (this.isDefaultPrevented = (
                null != o.defaultPrevented
                  ? o.defaultPrevented
                  : !1 === o.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            );
          }
          return (
            F(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : "unknown" !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = nn));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : "unknown" !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = nn));
              },
              persist: function () {},
              isPersistent: nn,
            }),
            t
          );
        }
        var an,
          sn,
          ln,
          un = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          cn = on(un),
          dn = F({}, un, { view: 0, detail: 0 }),
          fn = on(dn),
          pn = F({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: An,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return "movementX" in e
                ? e.movementX
                : (e !== ln &&
                    (ln && "mousemove" === e.type
                      ? ((an = e.screenX - ln.screenX),
                        (sn = e.screenY - ln.screenY))
                      : (sn = an = 0),
                    (ln = e)),
                  an);
            },
            movementY: function (e) {
              return "movementY" in e ? e.movementY : sn;
            },
          }),
          hn = on(pn),
          mn = on(F({}, pn, { dataTransfer: 0 })),
          vn = on(F({}, dn, { relatedTarget: 0 })),
          yn = on(
            F({}, un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          gn = F({}, un, {
            clipboardData: function (e) {
              return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
          bn = on(gn),
          wn = on(F({}, un, { data: 0 })),
          Sn = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified",
          },
          kn = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta",
          },
          En = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey",
          };
        function Tn(e) {
          var t = this.nativeEvent;
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = En[e]) && !!t[e];
        }
        function An() {
          return Tn;
        }
        var _n = F({}, dn, {
            key: function (e) {
              if (e.key) {
                var t = Sn[e.key] || e.key;
                if ("Unidentified" !== t) return t;
              }
              return "keypress" === e.type
                ? 13 === (e = tn(e))
                  ? "Enter"
                  : String.fromCharCode(e)
                : "keydown" === e.type || "keyup" === e.type
                ? kn[e.keyCode] || "Unidentified"
                : "";
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: An,
            charCode: function (e) {
              return "keypress" === e.type ? tn(e) : 0;
            },
            keyCode: function (e) {
              return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
            },
            which: function (e) {
              return "keypress" === e.type
                ? tn(e)
                : "keydown" === e.type || "keyup" === e.type
                ? e.keyCode
                : 0;
            },
          }),
          In = on(_n),
          Cn = on(
            F({}, pn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          xn = on(
            F({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: An,
            })
          ),
          Nn = on(
            F({}, un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          On = F({}, pn, {
            deltaX: function (e) {
              return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
            },
            deltaY: function (e) {
              return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          Dn = on(On),
          Pn = [9, 13, 27, 32],
          Rn = c && "CompositionEvent" in window,
          Ln = null;
        c && "documentMode" in document && (Ln = document.documentMode);
        var Mn = c && "TextEvent" in window && !Ln,
          Fn = c && (!Rn || (Ln && 8 < Ln && 11 >= Ln)),
          Un = String.fromCharCode(32),
          jn = !1;
        function zn(e, t) {
          switch (e) {
            case "keyup":
              return -1 !== Pn.indexOf(t.keyCode);
            case "keydown":
              return 229 !== t.keyCode;
            case "keypress":
            case "mousedown":
            case "focusout":
              return !0;
            default:
              return !1;
          }
        }
        function $n(e) {
          return "object" === typeof (e = e.detail) && "data" in e
            ? e.data
            : null;
        }
        var Vn = !1;
        var Kn = {
          color: !0,
          date: !0,
          datetime: !0,
          "datetime-local": !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function qn(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return "input" === t ? !!Kn[e.type] : "textarea" === t;
        }
        function Bn(e, t, n, r) {
          _e(r),
            0 < (t = Hr(t, "onChange")).length &&
              ((n = new cn("onChange", "change", null, n, r)),
              e.push({ event: n, listeners: t }));
        }
        var Hn = null,
          Wn = null;
        function Gn(e) {
          Ur(e, 0);
        }
        function Qn(e) {
          if (W(So(e))) return e;
        }
        function Yn(e, t) {
          if ("change" === e) return t;
        }
        var Jn = !1;
        if (c) {
          var Xn;
          if (c) {
            var Zn = "oninput" in document;
            if (!Zn) {
              var er = document.createElement("div");
              er.setAttribute("oninput", "return;"),
                (Zn = "function" === typeof er.oninput);
            }
            Xn = Zn;
          } else Xn = !1;
          Jn = Xn && (!document.documentMode || 9 < document.documentMode);
        }
        function tr() {
          Hn && (Hn.detachEvent("onpropertychange", nr), (Wn = Hn = null));
        }
        function nr(e) {
          if ("value" === e.propertyName && Qn(Wn)) {
            var t = [];
            Bn(t, Wn, e, Se(e)), Oe(Gn, t);
          }
        }
        function rr(e, t, n) {
          "focusin" === e
            ? (tr(), (Wn = n), (Hn = t).attachEvent("onpropertychange", nr))
            : "focusout" === e && tr();
        }
        function or(e) {
          if ("selectionchange" === e || "keyup" === e || "keydown" === e)
            return Qn(Wn);
        }
        function ir(e, t) {
          if ("click" === e) return Qn(t);
        }
        function ar(e, t) {
          if ("input" === e || "change" === e) return Qn(t);
        }
        var sr =
          "function" === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                );
              };
        function lr(e, t) {
          if (sr(e, t)) return !0;
          if (
            "object" !== typeof e ||
            null === e ||
            "object" !== typeof t ||
            null === t
          )
            return !1;
          var n = Object.keys(e),
            r = Object.keys(t);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var o = n[r];
            if (!d.call(t, o) || !sr(e[o], t[o])) return !1;
          }
          return !0;
        }
        function ur(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function cr(e, t) {
          var n,
            r = ur(e);
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e };
              e = n;
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling;
                  break e;
                }
                r = r.parentNode;
              }
              r = void 0;
            }
            r = ur(r);
          }
        }
        function dr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dr(e, t.parentNode)
                  : "contains" in e
                  ? e.contains(t)
                  : !!e.compareDocumentPosition &&
                    !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function fr() {
          for (var e = window, t = G(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var n = "string" === typeof t.contentWindow.location.href;
            } catch (r) {
              n = !1;
            }
            if (!n) break;
            t = G((e = t.contentWindow).document);
          }
          return t;
        }
        function pr(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (("input" === t &&
              ("text" === e.type ||
                "search" === e.type ||
                "tel" === e.type ||
                "url" === e.type ||
                "password" === e.type)) ||
              "textarea" === t ||
              "true" === e.contentEditable)
          );
        }
        function hr(e) {
          var t = fr(),
            n = e.focusedElem,
            r = e.selectionRange;
          if (
            t !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && pr(n))
              if (
                ((t = r.start),
                void 0 === (e = r.end) && (e = t),
                "selectionStart" in n)
              )
                (n.selectionStart = t),
                  (n.selectionEnd = Math.min(e, n.value.length));
              else if (
                (e =
                  ((t = n.ownerDocument || document) && t.defaultView) ||
                  window).getSelection
              ) {
                e = e.getSelection();
                var o = n.textContent.length,
                  i = Math.min(r.start, o);
                (r = void 0 === r.end ? i : Math.min(r.end, o)),
                  !e.extend && i > r && ((o = r), (r = i), (i = o)),
                  (o = cr(n, i));
                var a = cr(n, r);
                o &&
                  a &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== o.node ||
                    e.anchorOffset !== o.offset ||
                    e.focusNode !== a.node ||
                    e.focusOffset !== a.offset) &&
                  ((t = t.createRange()).setStart(o.node, o.offset),
                  e.removeAllRanges(),
                  i > r
                    ? (e.addRange(t), e.extend(a.node, a.offset))
                    : (t.setEnd(a.node, a.offset), e.addRange(t)));
              }
            for (t = [], e = n; (e = e.parentNode); )
              1 === e.nodeType &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
            for (
              "function" === typeof n.focus && n.focus(), n = 0;
              n < t.length;
              n++
            )
              ((e = t[n]).element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
          }
        }
        var mr = c && "documentMode" in document && 11 >= document.documentMode,
          vr = null,
          yr = null,
          gr = null,
          br = !1;
        function wr(e, t, n) {
          var r =
            n.window === n
              ? n.document
              : 9 === n.nodeType
              ? n
              : n.ownerDocument;
          br ||
            null == vr ||
            vr !== G(r) ||
            ("selectionStart" in (r = vr) && pr(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (gr && lr(gr, r)) ||
              ((gr = r),
              0 < (r = Hr(yr, "onSelect")).length &&
                ((t = new cn("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = vr))));
        }
        function Sr(e, t) {
          var n = {};
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n["Webkit" + e] = "webkit" + t),
            (n["Moz" + e] = "moz" + t),
            n
          );
        }
        var kr = {
            animationend: Sr("Animation", "AnimationEnd"),
            animationiteration: Sr("Animation", "AnimationIteration"),
            animationstart: Sr("Animation", "AnimationStart"),
            transitionend: Sr("Transition", "TransitionEnd"),
          },
          Er = {},
          Tr = {};
        function Ar(e) {
          if (Er[e]) return Er[e];
          if (!kr[e]) return e;
          var t,
            n = kr[e];
          for (t in n)
            if (n.hasOwnProperty(t) && t in Tr) return (Er[e] = n[t]);
          return e;
        }
        c &&
          ((Tr = document.createElement("div").style),
          "AnimationEvent" in window ||
            (delete kr.animationend.animation,
            delete kr.animationiteration.animation,
            delete kr.animationstart.animation),
          "TransitionEvent" in window || delete kr.transitionend.transition);
        var _r = Ar("animationend"),
          Ir = Ar("animationiteration"),
          Cr = Ar("animationstart"),
          xr = Ar("transitionend"),
          Nr = new Map(),
          Or =
            "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
              " "
            );
        function Dr(e, t) {
          Nr.set(e, t), l(t, [e]);
        }
        for (var Pr = 0; Pr < Or.length; Pr++) {
          var Rr = Or[Pr];
          Dr(Rr.toLowerCase(), "on" + (Rr[0].toUpperCase() + Rr.slice(1)));
        }
        Dr(_r, "onAnimationEnd"),
          Dr(Ir, "onAnimationIteration"),
          Dr(Cr, "onAnimationStart"),
          Dr("dblclick", "onDoubleClick"),
          Dr("focusin", "onFocus"),
          Dr("focusout", "onBlur"),
          Dr(xr, "onTransitionEnd"),
          u("onMouseEnter", ["mouseout", "mouseover"]),
          u("onMouseLeave", ["mouseout", "mouseover"]),
          u("onPointerEnter", ["pointerout", "pointerover"]),
          u("onPointerLeave", ["pointerout", "pointerover"]),
          l(
            "onChange",
            "change click focusin focusout input keydown keyup selectionchange".split(
              " "
            )
          ),
          l(
            "onSelect",
            "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
              " "
            )
          ),
          l("onBeforeInput", [
            "compositionend",
            "keypress",
            "textInput",
            "paste",
          ]),
          l(
            "onCompositionEnd",
            "compositionend focusout keydown keypress keyup mousedown".split(
              " "
            )
          ),
          l(
            "onCompositionStart",
            "compositionstart focusout keydown keypress keyup mousedown".split(
              " "
            )
          ),
          l(
            "onCompositionUpdate",
            "compositionupdate focusout keydown keypress keyup mousedown".split(
              " "
            )
          );
        var Lr =
            "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
              " "
            ),
          Mr = new Set(
            "cancel close invalid load scroll toggle".split(" ").concat(Lr)
          );
        function Fr(e, t, n) {
          var r = e.type || "unknown-event";
          (e.currentTarget = n),
            (function (e, t, n, r, o, a, s, l, u) {
              if (($e.apply(this, arguments), Me)) {
                if (!Me) throw Error(i(198));
                var c = Fe;
                (Me = !1), (Fe = null), Ue || ((Ue = !0), (je = c));
              }
            })(r, t, void 0, e),
            (e.currentTarget = null);
        }
        function Ur(e, t) {
          t = 0 !== (4 & t);
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              o = r.event;
            r = r.listeners;
            e: {
              var i = void 0;
              if (t)
                for (var a = r.length - 1; 0 <= a; a--) {
                  var s = r[a],
                    l = s.instance,
                    u = s.currentTarget;
                  if (((s = s.listener), l !== i && o.isPropagationStopped()))
                    break e;
                  Fr(o, s, u), (i = l);
                }
              else
                for (a = 0; a < r.length; a++) {
                  if (
                    ((l = (s = r[a]).instance),
                    (u = s.currentTarget),
                    (s = s.listener),
                    l !== i && o.isPropagationStopped())
                  )
                    break e;
                  Fr(o, s, u), (i = l);
                }
            }
          }
          if (Ue) throw ((e = je), (Ue = !1), (je = null), e);
        }
        function jr(e, t) {
          var n = t[vo];
          void 0 === n && (n = t[vo] = new Set());
          var r = e + "__bubble";
          n.has(r) || (Kr(t, e, 2, !1), n.add(r));
        }
        function zr(e, t, n) {
          var r = 0;
          t && (r |= 4), Kr(n, e, r, t);
        }
        var $r = "_reactListening" + Math.random().toString(36).slice(2);
        function Vr(e) {
          if (!e[$r]) {
            (e[$r] = !0),
              a.forEach(function (t) {
                "selectionchange" !== t &&
                  (Mr.has(t) || zr(t, !1, e), zr(t, !0, e));
              });
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[$r] || ((t[$r] = !0), zr("selectionchange", !1, t));
          }
        }
        function Kr(e, t, n, r) {
          switch (Yt(t)) {
            case 1:
              var o = Bt;
              break;
            case 4:
              o = Ht;
              break;
            default:
              o = Wt;
          }
          (n = o.bind(null, t, n, e)),
            (o = void 0),
            !Pe ||
              ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) ||
              (o = !0),
            r
              ? void 0 !== o
                ? e.addEventListener(t, n, { capture: !0, passive: o })
                : e.addEventListener(t, n, !0)
              : void 0 !== o
              ? e.addEventListener(t, n, { passive: o })
              : e.addEventListener(t, n, !1);
        }
        function qr(e, t, n, r, o) {
          var i = r;
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return;
              var a = r.tag;
              if (3 === a || 4 === a) {
                var s = r.stateNode.containerInfo;
                if (s === o || (8 === s.nodeType && s.parentNode === o)) break;
                if (4 === a)
                  for (a = r.return; null !== a; ) {
                    var l = a.tag;
                    if (
                      (3 === l || 4 === l) &&
                      ((l = a.stateNode.containerInfo) === o ||
                        (8 === l.nodeType && l.parentNode === o))
                    )
                      return;
                    a = a.return;
                  }
                for (; null !== s; ) {
                  if (null === (a = bo(s))) return;
                  if (5 === (l = a.tag) || 6 === l) {
                    r = i = a;
                    continue e;
                  }
                  s = s.parentNode;
                }
              }
              r = r.return;
            }
          Oe(function () {
            var r = i,
              o = Se(n),
              a = [];
            e: {
              var s = Nr.get(e);
              if (void 0 !== s) {
                var l = cn,
                  u = e;
                switch (e) {
                  case "keypress":
                    if (0 === tn(n)) break e;
                  case "keydown":
                  case "keyup":
                    l = In;
                    break;
                  case "focusin":
                    (u = "focus"), (l = vn);
                    break;
                  case "focusout":
                    (u = "blur"), (l = vn);
                    break;
                  case "beforeblur":
                  case "afterblur":
                    l = vn;
                    break;
                  case "click":
                    if (2 === n.button) break e;
                  case "auxclick":
                  case "dblclick":
                  case "mousedown":
                  case "mousemove":
                  case "mouseup":
                  case "mouseout":
                  case "mouseover":
                  case "contextmenu":
                    l = hn;
                    break;
                  case "drag":
                  case "dragend":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "dragstart":
                  case "drop":
                    l = mn;
                    break;
                  case "touchcancel":
                  case "touchend":
                  case "touchmove":
                  case "touchstart":
                    l = xn;
                    break;
                  case _r:
                  case Ir:
                  case Cr:
                    l = yn;
                    break;
                  case xr:
                    l = Nn;
                    break;
                  case "scroll":
                    l = fn;
                    break;
                  case "wheel":
                    l = Dn;
                    break;
                  case "copy":
                  case "cut":
                  case "paste":
                    l = bn;
                    break;
                  case "gotpointercapture":
                  case "lostpointercapture":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "pointerup":
                    l = Cn;
                }
                var c = 0 !== (4 & t),
                  d = !c && "scroll" === e,
                  f = c ? (null !== s ? s + "Capture" : null) : s;
                c = [];
                for (var p, h = r; null !== h; ) {
                  var m = (p = h).stateNode;
                  if (
                    (5 === p.tag &&
                      null !== m &&
                      ((p = m),
                      null !== f &&
                        null != (m = De(h, f)) &&
                        c.push(Br(h, m, p))),
                    d)
                  )
                    break;
                  h = h.return;
                }
                0 < c.length &&
                  ((s = new l(s, u, null, n, o)),
                  a.push({ event: s, listeners: c }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((l = "mouseout" === e || "pointerout" === e),
                (!(s = "mouseover" === e || "pointerover" === e) ||
                  n === we ||
                  !(u = n.relatedTarget || n.fromElement) ||
                  (!bo(u) && !u[mo])) &&
                  (l || s) &&
                  ((s =
                    o.window === o
                      ? o
                      : (s = o.ownerDocument)
                      ? s.defaultView || s.parentWindow
                      : window),
                  l
                    ? ((l = r),
                      null !==
                        (u = (u = n.relatedTarget || n.toElement)
                          ? bo(u)
                          : null) &&
                        (u !== (d = Ve(u)) || (5 !== u.tag && 6 !== u.tag)) &&
                        (u = null))
                    : ((l = null), (u = r)),
                  l !== u))
              ) {
                if (
                  ((c = hn),
                  (m = "onMouseLeave"),
                  (f = "onMouseEnter"),
                  (h = "mouse"),
                  ("pointerout" !== e && "pointerover" !== e) ||
                    ((c = Cn),
                    (m = "onPointerLeave"),
                    (f = "onPointerEnter"),
                    (h = "pointer")),
                  (d = null == l ? s : So(l)),
                  (p = null == u ? s : So(u)),
                  ((s = new c(m, h + "leave", l, n, o)).target = d),
                  (s.relatedTarget = p),
                  (m = null),
                  bo(o) === r &&
                    (((c = new c(f, h + "enter", u, n, o)).target = p),
                    (c.relatedTarget = d),
                    (m = c)),
                  (d = m),
                  l && u)
                )
                  e: {
                    for (f = u, h = 0, p = c = l; p; p = Wr(p)) h++;
                    for (p = 0, m = f; m; m = Wr(m)) p++;
                    for (; 0 < h - p; ) (c = Wr(c)), h--;
                    for (; 0 < p - h; ) (f = Wr(f)), p--;
                    for (; h--; ) {
                      if (c === f || (null !== f && c === f.alternate)) break e;
                      (c = Wr(c)), (f = Wr(f));
                    }
                    c = null;
                  }
                else c = null;
                null !== l && Gr(a, s, l, c, !1),
                  null !== u && null !== d && Gr(a, d, u, c, !0);
              }
              if (
                "select" ===
                  (l =
                    (s = r ? So(r) : window).nodeName &&
                    s.nodeName.toLowerCase()) ||
                ("input" === l && "file" === s.type)
              )
                var v = Yn;
              else if (qn(s))
                if (Jn) v = ar;
                else {
                  v = or;
                  var y = rr;
                }
              else
                (l = s.nodeName) &&
                  "input" === l.toLowerCase() &&
                  ("checkbox" === s.type || "radio" === s.type) &&
                  (v = ir);
              switch (
                (v && (v = v(e, r))
                  ? Bn(a, v, n, o)
                  : (y && y(e, s, r),
                    "focusout" === e &&
                      (y = s._wrapperState) &&
                      y.controlled &&
                      "number" === s.type &&
                      ee(s, "number", s.value)),
                (y = r ? So(r) : window),
                e)
              ) {
                case "focusin":
                  (qn(y) || "true" === y.contentEditable) &&
                    ((vr = y), (yr = r), (gr = null));
                  break;
                case "focusout":
                  gr = yr = vr = null;
                  break;
                case "mousedown":
                  br = !0;
                  break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                  (br = !1), wr(a, n, o);
                  break;
                case "selectionchange":
                  if (mr) break;
                case "keydown":
                case "keyup":
                  wr(a, n, o);
              }
              var g;
              if (Rn)
                e: {
                  switch (e) {
                    case "compositionstart":
                      var b = "onCompositionStart";
                      break e;
                    case "compositionend":
                      b = "onCompositionEnd";
                      break e;
                    case "compositionupdate":
                      b = "onCompositionUpdate";
                      break e;
                  }
                  b = void 0;
                }
              else
                Vn
                  ? zn(e, n) && (b = "onCompositionEnd")
                  : "keydown" === e &&
                    229 === n.keyCode &&
                    (b = "onCompositionStart");
              b &&
                (Fn &&
                  "ko" !== n.locale &&
                  (Vn || "onCompositionStart" !== b
                    ? "onCompositionEnd" === b && Vn && (g = en())
                    : ((Xt = "value" in (Jt = o) ? Jt.value : Jt.textContent),
                      (Vn = !0))),
                0 < (y = Hr(r, b)).length &&
                  ((b = new wn(b, e, null, n, o)),
                  a.push({ event: b, listeners: y }),
                  g ? (b.data = g) : null !== (g = $n(n)) && (b.data = g))),
                (g = Mn
                  ? (function (e, t) {
                      switch (e) {
                        case "compositionend":
                          return $n(t);
                        case "keypress":
                          return 32 !== t.which ? null : ((jn = !0), Un);
                        case "textInput":
                          return (e = t.data) === Un && jn ? null : e;
                        default:
                          return null;
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (Vn)
                        return "compositionend" === e || (!Rn && zn(e, t))
                          ? ((e = en()), (Zt = Xt = Jt = null), (Vn = !1), e)
                          : null;
                      switch (e) {
                        case "paste":
                        default:
                          return null;
                        case "keypress":
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case "compositionend":
                          return Fn && "ko" !== t.locale ? null : t.data;
                      }
                    })(e, n)) &&
                  0 < (r = Hr(r, "onBeforeInput")).length &&
                  ((o = new wn("onBeforeInput", "beforeinput", null, n, o)),
                  a.push({ event: o, listeners: r }),
                  (o.data = g));
            }
            Ur(a, t);
          });
        }
        function Br(e, t, n) {
          return { instance: e, listener: t, currentTarget: n };
        }
        function Hr(e, t) {
          for (var n = t + "Capture", r = []; null !== e; ) {
            var o = e,
              i = o.stateNode;
            5 === o.tag &&
              null !== i &&
              ((o = i),
              null != (i = De(e, n)) && r.unshift(Br(e, i, o)),
              null != (i = De(e, t)) && r.push(Br(e, i, o))),
              (e = e.return);
          }
          return r;
        }
        function Wr(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag);
          return e || null;
        }
        function Gr(e, t, n, r, o) {
          for (var i = t._reactName, a = []; null !== n && n !== r; ) {
            var s = n,
              l = s.alternate,
              u = s.stateNode;
            if (null !== l && l === r) break;
            5 === s.tag &&
              null !== u &&
              ((s = u),
              o
                ? null != (l = De(n, i)) && a.unshift(Br(n, l, s))
                : o || (null != (l = De(n, i)) && a.push(Br(n, l, s)))),
              (n = n.return);
          }
          0 !== a.length && e.push({ event: t, listeners: a });
        }
        var Qr = /\r\n?/g,
          Yr = /\u0000|\uFFFD/g;
        function Jr(e) {
          return ("string" === typeof e ? e : "" + e)
            .replace(Qr, "\n")
            .replace(Yr, "");
        }
        function Xr(e, t, n) {
          if (((t = Jr(t)), Jr(e) !== t && n)) throw Error(i(425));
        }
        function Zr() {}
        var eo = null,
          to = null;
        function no(e, t) {
          return (
            "textarea" === e ||
            "noscript" === e ||
            "string" === typeof t.children ||
            "number" === typeof t.children ||
            ("object" === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var ro = "function" === typeof setTimeout ? setTimeout : void 0,
          oo = "function" === typeof clearTimeout ? clearTimeout : void 0,
          io = "function" === typeof Promise ? Promise : void 0,
          ao =
            "function" === typeof queueMicrotask
              ? queueMicrotask
              : "undefined" !== typeof io
              ? function (e) {
                  return io.resolve(null).then(e).catch(so);
                }
              : ro;
        function so(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function lo(e, t) {
          var n = t,
            r = 0;
          do {
            var o = n.nextSibling;
            if ((e.removeChild(n), o && 8 === o.nodeType))
              if ("/$" === (n = o.data)) {
                if (0 === r) return e.removeChild(o), void Vt(t);
                r--;
              } else ("$" !== n && "$?" !== n && "$!" !== n) || r++;
            n = o;
          } while (n);
          Vt(t);
        }
        function uo(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
              if ("/$" === t) return null;
            }
          }
          return e;
        }
        function co(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("$" === n || "$!" === n || "$?" === n) {
                if (0 === t) return e;
                t--;
              } else "/$" === n && t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        var fo = Math.random().toString(36).slice(2),
          po = "__reactFiber$" + fo,
          ho = "__reactProps$" + fo,
          mo = "__reactContainer$" + fo,
          vo = "__reactEvents$" + fo,
          yo = "__reactListeners$" + fo,
          go = "__reactHandles$" + fo;
        function bo(e) {
          var t = e[po];
          if (t) return t;
          for (var n = e.parentNode; n; ) {
            if ((t = n[mo] || n[po])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = co(e); null !== e; ) {
                  if ((n = e[po])) return n;
                  e = co(e);
                }
              return t;
            }
            n = (e = n).parentNode;
          }
          return null;
        }
        function wo(e) {
          return !(e = e[po] || e[mo]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e;
        }
        function So(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode;
          throw Error(i(33));
        }
        function ko(e) {
          return e[ho] || null;
        }
        var Eo = [],
          To = -1;
        function Ao(e) {
          return { current: e };
        }
        function _o(e) {
          0 > To || ((e.current = Eo[To]), (Eo[To] = null), To--);
        }
        function Io(e, t) {
          To++, (Eo[To] = e.current), (e.current = t);
        }
        var Co = {},
          xo = Ao(Co),
          No = Ao(!1),
          Oo = Co;
        function Do(e, t) {
          var n = e.type.contextTypes;
          if (!n) return Co;
          var r = e.stateNode;
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext;
          var o,
            i = {};
          for (o in n) i[o] = t[o];
          return (
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                t),
              (e.__reactInternalMemoizedMaskedChildContext = i)),
            i
          );
        }
        function Po(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e;
        }
        function Ro() {
          _o(No), _o(xo);
        }
        function Lo(e, t, n) {
          if (xo.current !== Co) throw Error(i(168));
          Io(xo, t), Io(No, n);
        }
        function Mo(e, t, n) {
          var r = e.stateNode;
          if (
            ((t = t.childContextTypes), "function" !== typeof r.getChildContext)
          )
            return n;
          for (var o in (r = r.getChildContext()))
            if (!(o in t)) throw Error(i(108, K(e) || "Unknown", o));
          return F({}, n, r);
        }
        function Fo(e) {
          return (
            (e =
              ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
              Co),
            (Oo = xo.current),
            Io(xo, e),
            Io(No, No.current),
            !0
          );
        }
        function Uo(e, t, n) {
          var r = e.stateNode;
          if (!r) throw Error(i(169));
          n
            ? ((e = Mo(e, t, Oo)),
              (r.__reactInternalMemoizedMergedChildContext = e),
              _o(No),
              _o(xo),
              Io(xo, e))
            : _o(No),
            Io(No, n);
        }
        var jo = null,
          zo = !1,
          $o = !1;
        function Vo(e) {
          null === jo ? (jo = [e]) : jo.push(e);
        }
        function Ko() {
          if (!$o && null !== jo) {
            $o = !0;
            var e = 0,
              t = bt;
            try {
              var n = jo;
              for (bt = 1; e < n.length; e++) {
                var r = n[e];
                do {
                  r = r(!0);
                } while (null !== r);
              }
              (jo = null), (zo = !1);
            } catch (o) {
              throw (null !== jo && (jo = jo.slice(e + 1)), We(Ze, Ko), o);
            } finally {
              (bt = t), ($o = !1);
            }
          }
          return null;
        }
        var qo = [],
          Bo = 0,
          Ho = null,
          Wo = 0,
          Go = [],
          Qo = 0,
          Yo = null,
          Jo = 1,
          Xo = "";
        function Zo(e, t) {
          (qo[Bo++] = Wo), (qo[Bo++] = Ho), (Ho = e), (Wo = t);
        }
        function ei(e, t, n) {
          (Go[Qo++] = Jo), (Go[Qo++] = Xo), (Go[Qo++] = Yo), (Yo = e);
          var r = Jo;
          e = Xo;
          var o = 32 - at(r) - 1;
          (r &= ~(1 << o)), (n += 1);
          var i = 32 - at(t) + o;
          if (30 < i) {
            var a = o - (o % 5);
            (i = (r & ((1 << a) - 1)).toString(32)),
              (r >>= a),
              (o -= a),
              (Jo = (1 << (32 - at(t) + o)) | (n << o) | r),
              (Xo = i + e);
          } else (Jo = (1 << i) | (n << o) | r), (Xo = e);
        }
        function ti(e) {
          null !== e.return && (Zo(e, 1), ei(e, 1, 0));
        }
        function ni(e) {
          for (; e === Ho; )
            (Ho = qo[--Bo]), (qo[Bo] = null), (Wo = qo[--Bo]), (qo[Bo] = null);
          for (; e === Yo; )
            (Yo = Go[--Qo]),
              (Go[Qo] = null),
              (Xo = Go[--Qo]),
              (Go[Qo] = null),
              (Jo = Go[--Qo]),
              (Go[Qo] = null);
        }
        var ri = null,
          oi = null,
          ii = !1,
          ai = null;
        function si(e, t) {
          var n = Ou(5, null, null, 0);
          (n.elementType = "DELETED"),
            (n.stateNode = t),
            (n.return = e),
            null === (t = e.deletions)
              ? ((e.deletions = [n]), (e.flags |= 16))
              : t.push(n);
        }
        function li(e, t) {
          switch (e.tag) {
            case 5:
              var n = e.type;
              return (
                null !==
                  (t =
                    1 !== t.nodeType ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                      ? null
                      : t) &&
                ((e.stateNode = t), (ri = e), (oi = uo(t.firstChild)), !0)
              );
            case 6:
              return (
                null !==
                  (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (ri = e), (oi = null), !0)
              );
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((n = null !== Yo ? { id: Jo, overflow: Xo } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = Ou(18, null, null, 0)).stateNode = t),
                (n.return = e),
                (e.child = n),
                (ri = e),
                (oi = null),
                !0)
              );
            default:
              return !1;
          }
        }
        function ui(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
        }
        function ci(e) {
          if (ii) {
            var t = oi;
            if (t) {
              var n = t;
              if (!li(e, t)) {
                if (ui(e)) throw Error(i(418));
                t = uo(n.nextSibling);
                var r = ri;
                t && li(e, t)
                  ? si(r, n)
                  : ((e.flags = (-4097 & e.flags) | 2), (ii = !1), (ri = e));
              }
            } else {
              if (ui(e)) throw Error(i(418));
              (e.flags = (-4097 & e.flags) | 2), (ii = !1), (ri = e);
            }
          }
        }
        function di(e) {
          for (
            e = e.return;
            null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

          )
            e = e.return;
          ri = e;
        }
        function fi(e) {
          if (e !== ri) return !1;
          if (!ii) return di(e), (ii = !0), !1;
          var t;
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t =
                "head" !== (t = e.type) &&
                "body" !== t &&
                !no(e.type, e.memoizedProps)),
            t && (t = oi))
          ) {
            if (ui(e)) throw (pi(), Error(i(418)));
            for (; t; ) si(e, t), (t = uo(t.nextSibling));
          }
          if ((di(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(i(317));
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var n = e.data;
                  if ("/$" === n) {
                    if (0 === t) {
                      oi = uo(e.nextSibling);
                      break e;
                    }
                    t--;
                  } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
                }
                e = e.nextSibling;
              }
              oi = null;
            }
          } else oi = ri ? uo(e.stateNode.nextSibling) : null;
          return !0;
        }
        function pi() {
          for (var e = oi; e; ) e = uo(e.nextSibling);
        }
        function hi() {
          (oi = ri = null), (ii = !1);
        }
        function mi(e) {
          null === ai ? (ai = [e]) : ai.push(e);
        }
        var vi = w.ReactCurrentBatchConfig;
        function yi(e, t, n) {
          if (
            null !== (e = n.ref) &&
            "function" !== typeof e &&
            "object" !== typeof e
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(i(309));
                var r = n.stateNode;
              }
              if (!r) throw Error(i(147, e));
              var o = r,
                a = "" + e;
              return null !== t &&
                null !== t.ref &&
                "function" === typeof t.ref &&
                t.ref._stringRef === a
                ? t.ref
                : ((t = function (e) {
                    var t = o.refs;
                    null === e ? delete t[a] : (t[a] = e);
                  }),
                  (t._stringRef = a),
                  t);
            }
            if ("string" !== typeof e) throw Error(i(284));
            if (!n._owner) throw Error(i(290, e));
          }
          return e;
        }
        function gi(e, t) {
          throw (
            ((e = Object.prototype.toString.call(t)),
            Error(
              i(
                31,
                "[object Object]" === e
                  ? "object with keys {" + Object.keys(t).join(", ") + "}"
                  : e
              )
            ))
          );
        }
        function bi(e) {
          return (0, e._init)(e._payload);
        }
        function wi(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions;
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
            }
          }
          function n(n, r) {
            if (!e) return null;
            for (; null !== r; ) t(n, r), (r = r.sibling);
            return null;
          }
          function r(e, t) {
            for (e = new Map(); null !== t; )
              null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                (t = t.sibling);
            return e;
          }
          function o(e, t) {
            return ((e = Pu(e, t)).index = 0), (e.sibling = null), e;
          }
          function a(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n)
            );
          }
          function s(t) {
            return e && null === t.alternate && (t.flags |= 2), t;
          }
          function l(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Fu(n, e.mode, r)).return = e), t)
              : (((t = o(t, n)).return = e), t);
          }
          function u(e, t, n, r) {
            var i = n.type;
            return i === E
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                (t.elementType === i ||
                  ("object" === typeof i &&
                    null !== i &&
                    i.$$typeof === D &&
                    bi(i) === t.type))
              ? (((r = o(t, n.props)).ref = yi(e, t, n)), (r.return = e), r)
              : (((r = Ru(n.type, n.key, n.props, null, e.mode, r)).ref = yi(
                  e,
                  t,
                  n
                )),
                (r.return = e),
                r);
          }
          function c(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = Uu(n, e.mode, r)).return = e), t)
              : (((t = o(t, n.children || [])).return = e), t);
          }
          function d(e, t, n, r, i) {
            return null === t || 7 !== t.tag
              ? (((t = Lu(n, e.mode, r, i)).return = e), t)
              : (((t = o(t, n)).return = e), t);
          }
          function f(e, t, n) {
            if (("string" === typeof t && "" !== t) || "number" === typeof t)
              return ((t = Fu("" + t, e.mode, n)).return = e), t;
            if ("object" === typeof t && null !== t) {
              switch (t.$$typeof) {
                case S:
                  return (
                    ((n = Ru(t.type, t.key, t.props, null, e.mode, n)).ref = yi(
                      e,
                      null,
                      t
                    )),
                    (n.return = e),
                    n
                  );
                case k:
                  return ((t = Uu(t, e.mode, n)).return = e), t;
                case D:
                  return f(e, (0, t._init)(t._payload), n);
              }
              if (te(t) || L(t))
                return ((t = Lu(t, e.mode, n, null)).return = e), t;
              gi(e, t);
            }
            return null;
          }
          function p(e, t, n, r) {
            var o = null !== t ? t.key : null;
            if (("string" === typeof n && "" !== n) || "number" === typeof n)
              return null !== o ? null : l(e, t, "" + n, r);
            if ("object" === typeof n && null !== n) {
              switch (n.$$typeof) {
                case S:
                  return n.key === o ? u(e, t, n, r) : null;
                case k:
                  return n.key === o ? c(e, t, n, r) : null;
                case D:
                  return p(e, t, (o = n._init)(n._payload), r);
              }
              if (te(n) || L(n)) return null !== o ? null : d(e, t, n, r, null);
              gi(e, n);
            }
            return null;
          }
          function h(e, t, n, r, o) {
            if (("string" === typeof r && "" !== r) || "number" === typeof r)
              return l(t, (e = e.get(n) || null), "" + r, o);
            if ("object" === typeof r && null !== r) {
              switch (r.$$typeof) {
                case S:
                  return u(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    o
                  );
                case k:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    o
                  );
                case D:
                  return h(e, t, n, (0, r._init)(r._payload), o);
              }
              if (te(r) || L(r))
                return d(t, (e = e.get(n) || null), r, o, null);
              gi(t, r);
            }
            return null;
          }
          function m(o, i, s, l) {
            for (
              var u = null, c = null, d = i, m = (i = 0), v = null;
              null !== d && m < s.length;
              m++
            ) {
              d.index > m ? ((v = d), (d = null)) : (v = d.sibling);
              var y = p(o, d, s[m], l);
              if (null === y) {
                null === d && (d = v);
                break;
              }
              e && d && null === y.alternate && t(o, d),
                (i = a(y, i, m)),
                null === c ? (u = y) : (c.sibling = y),
                (c = y),
                (d = v);
            }
            if (m === s.length) return n(o, d), ii && Zo(o, m), u;
            if (null === d) {
              for (; m < s.length; m++)
                null !== (d = f(o, s[m], l)) &&
                  ((i = a(d, i, m)),
                  null === c ? (u = d) : (c.sibling = d),
                  (c = d));
              return ii && Zo(o, m), u;
            }
            for (d = r(o, d); m < s.length; m++)
              null !== (v = h(d, o, m, s[m], l)) &&
                (e &&
                  null !== v.alternate &&
                  d.delete(null === v.key ? m : v.key),
                (i = a(v, i, m)),
                null === c ? (u = v) : (c.sibling = v),
                (c = v));
            return (
              e &&
                d.forEach(function (e) {
                  return t(o, e);
                }),
              ii && Zo(o, m),
              u
            );
          }
          function v(o, s, l, u) {
            var c = L(l);
            if ("function" !== typeof c) throw Error(i(150));
            if (null == (l = c.call(l))) throw Error(i(151));
            for (
              var d = (c = null), m = s, v = (s = 0), y = null, g = l.next();
              null !== m && !g.done;
              v++, g = l.next()
            ) {
              m.index > v ? ((y = m), (m = null)) : (y = m.sibling);
              var b = p(o, m, g.value, u);
              if (null === b) {
                null === m && (m = y);
                break;
              }
              e && m && null === b.alternate && t(o, m),
                (s = a(b, s, v)),
                null === d ? (c = b) : (d.sibling = b),
                (d = b),
                (m = y);
            }
            if (g.done) return n(o, m), ii && Zo(o, v), c;
            if (null === m) {
              for (; !g.done; v++, g = l.next())
                null !== (g = f(o, g.value, u)) &&
                  ((s = a(g, s, v)),
                  null === d ? (c = g) : (d.sibling = g),
                  (d = g));
              return ii && Zo(o, v), c;
            }
            for (m = r(o, m); !g.done; v++, g = l.next())
              null !== (g = h(m, o, v, g.value, u)) &&
                (e &&
                  null !== g.alternate &&
                  m.delete(null === g.key ? v : g.key),
                (s = a(g, s, v)),
                null === d ? (c = g) : (d.sibling = g),
                (d = g));
            return (
              e &&
                m.forEach(function (e) {
                  return t(o, e);
                }),
              ii && Zo(o, v),
              c
            );
          }
          return function e(r, i, a, l) {
            if (
              ("object" === typeof a &&
                null !== a &&
                a.type === E &&
                null === a.key &&
                (a = a.props.children),
              "object" === typeof a && null !== a)
            ) {
              switch (a.$$typeof) {
                case S:
                  e: {
                    for (var u = a.key, c = i; null !== c; ) {
                      if (c.key === u) {
                        if ((u = a.type) === E) {
                          if (7 === c.tag) {
                            n(r, c.sibling),
                              ((i = o(c, a.props.children)).return = r),
                              (r = i);
                            break e;
                          }
                        } else if (
                          c.elementType === u ||
                          ("object" === typeof u &&
                            null !== u &&
                            u.$$typeof === D &&
                            bi(u) === c.type)
                        ) {
                          n(r, c.sibling),
                            ((i = o(c, a.props)).ref = yi(r, c, a)),
                            (i.return = r),
                            (r = i);
                          break e;
                        }
                        n(r, c);
                        break;
                      }
                      t(r, c), (c = c.sibling);
                    }
                    a.type === E
                      ? (((i = Lu(a.props.children, r.mode, l, a.key)).return =
                          r),
                        (r = i))
                      : (((l = Ru(
                          a.type,
                          a.key,
                          a.props,
                          null,
                          r.mode,
                          l
                        )).ref = yi(r, i, a)),
                        (l.return = r),
                        (r = l));
                  }
                  return s(r);
                case k:
                  e: {
                    for (c = a.key; null !== i; ) {
                      if (i.key === c) {
                        if (
                          4 === i.tag &&
                          i.stateNode.containerInfo === a.containerInfo &&
                          i.stateNode.implementation === a.implementation
                        ) {
                          n(r, i.sibling),
                            ((i = o(i, a.children || [])).return = r),
                            (r = i);
                          break e;
                        }
                        n(r, i);
                        break;
                      }
                      t(r, i), (i = i.sibling);
                    }
                    ((i = Uu(a, r.mode, l)).return = r), (r = i);
                  }
                  return s(r);
                case D:
                  return e(r, i, (c = a._init)(a._payload), l);
              }
              if (te(a)) return m(r, i, a, l);
              if (L(a)) return v(r, i, a, l);
              gi(r, a);
            }
            return ("string" === typeof a && "" !== a) || "number" === typeof a
              ? ((a = "" + a),
                null !== i && 6 === i.tag
                  ? (n(r, i.sibling), ((i = o(i, a)).return = r), (r = i))
                  : (n(r, i), ((i = Fu(a, r.mode, l)).return = r), (r = i)),
                s(r))
              : n(r, i);
          };
        }
        var Si = wi(!0),
          ki = wi(!1),
          Ei = Ao(null),
          Ti = null,
          Ai = null,
          _i = null;
        function Ii() {
          _i = Ai = Ti = null;
        }
        function Ci(e) {
          var t = Ei.current;
          _o(Ei), (e._currentValue = t);
        }
        function xi(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break;
            e = e.return;
          }
        }
        function Ni(e, t) {
          (Ti = e),
            (_i = Ai = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (bs = !0), (e.firstContext = null));
        }
        function Oi(e) {
          var t = e._currentValue;
          if (_i !== e)
            if (
              ((e = { context: e, memoizedValue: t, next: null }), null === Ai)
            ) {
              if (null === Ti) throw Error(i(308));
              (Ai = e), (Ti.dependencies = { lanes: 0, firstContext: e });
            } else Ai = Ai.next = e;
          return t;
        }
        var Di = null;
        function Pi(e) {
          null === Di ? (Di = [e]) : Di.push(e);
        }
        function Ri(e, t, n, r) {
          var o = t.interleaved;
          return (
            null === o
              ? ((n.next = n), Pi(t))
              : ((n.next = o.next), (o.next = n)),
            (t.interleaved = n),
            Li(e, r)
          );
        }
        function Li(e, t) {
          e.lanes |= t;
          var n = e.alternate;
          for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
            (e.childLanes |= t),
              null !== (n = e.alternate) && (n.childLanes |= t),
              (n = e),
              (e = e.return);
          return 3 === n.tag ? n.stateNode : null;
        }
        var Mi = !1;
        function Fi(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          };
        }
        function Ui(e, t) {
          (e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              });
        }
        function ji(e, t) {
          return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          };
        }
        function zi(e, t, n) {
          var r = e.updateQueue;
          if (null === r) return null;
          if (((r = r.shared), 0 !== (2 & Cl))) {
            var o = r.pending;
            return (
              null === o ? (t.next = t) : ((t.next = o.next), (o.next = t)),
              (r.pending = t),
              Li(e, n)
            );
          }
          return (
            null === (o = r.interleaved)
              ? ((t.next = t), Pi(r))
              : ((t.next = o.next), (o.next = t)),
            (r.interleaved = t),
            Li(e, n)
          );
        }
        function $i(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194240 & n))
          ) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), gt(e, n);
          }
        }
        function Vi(e, t) {
          var n = e.updateQueue,
            r = e.alternate;
          if (null !== r && n === (r = r.updateQueue)) {
            var o = null,
              i = null;
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var a = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                };
                null === i ? (o = i = a) : (i = i.next = a), (n = n.next);
              } while (null !== n);
              null === i ? (o = i = t) : (i = i.next = t);
            } else o = i = t;
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: o,
                lastBaseUpdate: i,
                shared: r.shared,
                effects: r.effects,
              }),
              void (e.updateQueue = n)
            );
          }
          null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t);
        }
        function Ki(e, t, n, r) {
          var o = e.updateQueue;
          Mi = !1;
          var i = o.firstBaseUpdate,
            a = o.lastBaseUpdate,
            s = o.shared.pending;
          if (null !== s) {
            o.shared.pending = null;
            var l = s,
              u = l.next;
            (l.next = null), null === a ? (i = u) : (a.next = u), (a = l);
            var c = e.alternate;
            null !== c &&
              (s = (c = c.updateQueue).lastBaseUpdate) !== a &&
              (null === s ? (c.firstBaseUpdate = u) : (s.next = u),
              (c.lastBaseUpdate = l));
          }
          if (null !== i) {
            var d = o.baseState;
            for (a = 0, c = u = l = null, s = i; ; ) {
              var f = s.lane,
                p = s.eventTime;
              if ((r & f) === f) {
                null !== c &&
                  (c = c.next =
                    {
                      eventTime: p,
                      lane: 0,
                      tag: s.tag,
                      payload: s.payload,
                      callback: s.callback,
                      next: null,
                    });
                e: {
                  var h = e,
                    m = s;
                  switch (((f = t), (p = n), m.tag)) {
                    case 1:
                      if ("function" === typeof (h = m.payload)) {
                        d = h.call(p, d, f);
                        break e;
                      }
                      d = h;
                      break e;
                    case 3:
                      h.flags = (-65537 & h.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (f =
                            "function" === typeof (h = m.payload)
                              ? h.call(p, d, f)
                              : h) ||
                        void 0 === f
                      )
                        break e;
                      d = F({}, d, f);
                      break e;
                    case 2:
                      Mi = !0;
                  }
                }
                null !== s.callback &&
                  0 !== s.lane &&
                  ((e.flags |= 64),
                  null === (f = o.effects) ? (o.effects = [s]) : f.push(s));
              } else
                (p = {
                  eventTime: p,
                  lane: f,
                  tag: s.tag,
                  payload: s.payload,
                  callback: s.callback,
                  next: null,
                }),
                  null === c ? ((u = c = p), (l = d)) : (c = c.next = p),
                  (a |= f);
              if (null === (s = s.next)) {
                if (null === (s = o.shared.pending)) break;
                (s = (f = s).next),
                  (f.next = null),
                  (o.lastBaseUpdate = f),
                  (o.shared.pending = null);
              }
            }
            if (
              (null === c && (l = d),
              (o.baseState = l),
              (o.firstBaseUpdate = u),
              (o.lastBaseUpdate = c),
              null !== (t = o.shared.interleaved))
            ) {
              o = t;
              do {
                (a |= o.lane), (o = o.next);
              } while (o !== t);
            } else null === i && (o.shared.lanes = 0);
            (Ml |= a), (e.lanes = a), (e.memoizedState = d);
          }
        }
        function qi(e, t, n) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var r = e[t],
                o = r.callback;
              if (null !== o) {
                if (((r.callback = null), (r = n), "function" !== typeof o))
                  throw Error(i(191, o));
                o.call(r);
              }
            }
        }
        var Bi = {},
          Hi = Ao(Bi),
          Wi = Ao(Bi),
          Gi = Ao(Bi);
        function Qi(e) {
          if (e === Bi) throw Error(i(174));
          return e;
        }
        function Yi(e, t) {
          switch ((Io(Gi, t), Io(Wi, e), Io(Hi, Bi), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : le(null, "");
              break;
            default:
              t = le(
                (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                (e = e.tagName)
              );
          }
          _o(Hi), Io(Hi, t);
        }
        function Ji() {
          _o(Hi), _o(Wi), _o(Gi);
        }
        function Xi(e) {
          Qi(Gi.current);
          var t = Qi(Hi.current),
            n = le(t, e.type);
          t !== n && (Io(Wi, e), Io(Hi, n));
        }
        function Zi(e) {
          Wi.current === e && (_o(Hi), _o(Wi));
        }
        var ea = Ao(0);
        function ta(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState;
              if (
                null !== n &&
                (null === (n = n.dehydrated) ||
                  "$?" === n.data ||
                  "$!" === n.data)
              )
                return t;
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t;
            } else if (null !== t.child) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
          return null;
        }
        var na = [];
        function ra() {
          for (var e = 0; e < na.length; e++)
            na[e]._workInProgressVersionPrimary = null;
          na.length = 0;
        }
        var oa = w.ReactCurrentDispatcher,
          ia = w.ReactCurrentBatchConfig,
          aa = 0,
          sa = null,
          la = null,
          ua = null,
          ca = !1,
          da = !1,
          fa = 0,
          pa = 0;
        function ha() {
          throw Error(i(321));
        }
        function ma(e, t) {
          if (null === t) return !1;
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!sr(e[n], t[n])) return !1;
          return !0;
        }
        function va(e, t, n, r, o, a) {
          if (
            ((aa = a),
            (sa = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (oa.current = null === e || null === e.memoizedState ? Za : es),
            (e = n(r, o)),
            da)
          ) {
            a = 0;
            do {
              if (((da = !1), (fa = 0), 25 <= a)) throw Error(i(301));
              (a += 1),
                (ua = la = null),
                (t.updateQueue = null),
                (oa.current = ts),
                (e = n(r, o));
            } while (da);
          }
          if (
            ((oa.current = Xa),
            (t = null !== la && null !== la.next),
            (aa = 0),
            (ua = la = sa = null),
            (ca = !1),
            t)
          )
            throw Error(i(300));
          return e;
        }
        function ya() {
          var e = 0 !== fa;
          return (fa = 0), e;
        }
        function ga() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            null === ua ? (sa.memoizedState = ua = e) : (ua = ua.next = e), ua
          );
        }
        function ba() {
          if (null === la) {
            var e = sa.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = la.next;
          var t = null === ua ? sa.memoizedState : ua.next;
          if (null !== t) (ua = t), (la = e);
          else {
            if (null === e) throw Error(i(310));
            (e = {
              memoizedState: (la = e).memoizedState,
              baseState: la.baseState,
              baseQueue: la.baseQueue,
              queue: la.queue,
              next: null,
            }),
              null === ua ? (sa.memoizedState = ua = e) : (ua = ua.next = e);
          }
          return ua;
        }
        function wa(e, t) {
          return "function" === typeof t ? t(e) : t;
        }
        function Sa(e) {
          var t = ba(),
            n = t.queue;
          if (null === n) throw Error(i(311));
          n.lastRenderedReducer = e;
          var r = la,
            o = r.baseQueue,
            a = n.pending;
          if (null !== a) {
            if (null !== o) {
              var s = o.next;
              (o.next = a.next), (a.next = s);
            }
            (r.baseQueue = o = a), (n.pending = null);
          }
          if (null !== o) {
            (a = o.next), (r = r.baseState);
            var l = (s = null),
              u = null,
              c = a;
            do {
              var d = c.lane;
              if ((aa & d) === d)
                null !== u &&
                  (u = u.next =
                    {
                      lane: 0,
                      action: c.action,
                      hasEagerState: c.hasEagerState,
                      eagerState: c.eagerState,
                      next: null,
                    }),
                  (r = c.hasEagerState ? c.eagerState : e(r, c.action));
              else {
                var f = {
                  lane: d,
                  action: c.action,
                  hasEagerState: c.hasEagerState,
                  eagerState: c.eagerState,
                  next: null,
                };
                null === u ? ((l = u = f), (s = r)) : (u = u.next = f),
                  (sa.lanes |= d),
                  (Ml |= d);
              }
              c = c.next;
            } while (null !== c && c !== a);
            null === u ? (s = r) : (u.next = l),
              sr(r, t.memoizedState) || (bs = !0),
              (t.memoizedState = r),
              (t.baseState = s),
              (t.baseQueue = u),
              (n.lastRenderedState = r);
          }
          if (null !== (e = n.interleaved)) {
            o = e;
            do {
              (a = o.lane), (sa.lanes |= a), (Ml |= a), (o = o.next);
            } while (o !== e);
          } else null === o && (n.lanes = 0);
          return [t.memoizedState, n.dispatch];
        }
        function ka(e) {
          var t = ba(),
            n = t.queue;
          if (null === n) throw Error(i(311));
          n.lastRenderedReducer = e;
          var r = n.dispatch,
            o = n.pending,
            a = t.memoizedState;
          if (null !== o) {
            n.pending = null;
            var s = (o = o.next);
            do {
              (a = e(a, s.action)), (s = s.next);
            } while (s !== o);
            sr(a, t.memoizedState) || (bs = !0),
              (t.memoizedState = a),
              null === t.baseQueue && (t.baseState = a),
              (n.lastRenderedState = a);
          }
          return [a, r];
        }
        function Ea() {}
        function Ta(e, t) {
          var n = sa,
            r = ba(),
            o = t(),
            a = !sr(r.memoizedState, o);
          if (
            (a && ((r.memoizedState = o), (bs = !0)),
            (r = r.queue),
            Ma(Ia.bind(null, n, r, e), [e]),
            r.getSnapshot !== t ||
              a ||
              (null !== ua && 1 & ua.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Oa(9, _a.bind(null, n, r, o, t), void 0, null),
              null === xl)
            )
              throw Error(i(349));
            0 !== (30 & aa) || Aa(n, t, o);
          }
          return o;
        }
        function Aa(e, t, n) {
          (e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = sa.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (sa.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
              ? (t.stores = [e])
              : n.push(e);
        }
        function _a(e, t, n, r) {
          (t.value = n), (t.getSnapshot = r), Ca(t) && xa(e);
        }
        function Ia(e, t, n) {
          return n(function () {
            Ca(t) && xa(e);
          });
        }
        function Ca(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !sr(e, n);
          } catch (r) {
            return !0;
          }
        }
        function xa(e) {
          var t = Li(e, 1);
          null !== t && nu(t, e, 1, -1);
        }
        function Na(e) {
          var t = ga();
          return (
            "function" === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: wa,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Ga.bind(null, sa, e)),
            [t.memoizedState, e]
          );
        }
        function Oa(e, t, n, r) {
          return (
            (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
            null === (t = sa.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (sa.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (n = t.lastEffect)
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
            e
          );
        }
        function Da() {
          return ba().memoizedState;
        }
        function Pa(e, t, n, r) {
          var o = ga();
          (sa.flags |= e),
            (o.memoizedState = Oa(1 | t, n, void 0, void 0 === r ? null : r));
        }
        function Ra(e, t, n, r) {
          var o = ba();
          r = void 0 === r ? null : r;
          var i = void 0;
          if (null !== la) {
            var a = la.memoizedState;
            if (((i = a.destroy), null !== r && ma(r, a.deps)))
              return void (o.memoizedState = Oa(t, n, i, r));
          }
          (sa.flags |= e), (o.memoizedState = Oa(1 | t, n, i, r));
        }
        function La(e, t) {
          return Pa(8390656, 8, e, t);
        }
        function Ma(e, t) {
          return Ra(2048, 8, e, t);
        }
        function Fa(e, t) {
          return Ra(4, 2, e, t);
        }
        function Ua(e, t) {
          return Ra(4, 4, e, t);
        }
        function ja(e, t) {
          return "function" === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null);
              })
            : null !== t && void 0 !== t
            ? ((e = e()),
              (t.current = e),
              function () {
                t.current = null;
              })
            : void 0;
        }
        function za(e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Ra(4, 4, ja.bind(null, t, e), n)
          );
        }
        function $a() {}
        function Va(e, t) {
          var n = ba();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ma(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e);
        }
        function Ka(e, t) {
          var n = ba();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ma(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e);
        }
        function qa(e, t, n) {
          return 0 === (21 & aa)
            ? (e.baseState && ((e.baseState = !1), (bs = !0)),
              (e.memoizedState = n))
            : (sr(n, t) ||
                ((n = mt()), (sa.lanes |= n), (Ml |= n), (e.baseState = !0)),
              t);
        }
        function Ba(e, t) {
          var n = bt;
          (bt = 0 !== n && 4 > n ? n : 4), e(!0);
          var r = ia.transition;
          ia.transition = {};
          try {
            e(!1), t();
          } finally {
            (bt = n), (ia.transition = r);
          }
        }
        function Ha() {
          return ba().memoizedState;
        }
        function Wa(e, t, n) {
          var r = tu(e);
          if (
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            Qa(e))
          )
            Ya(t, n);
          else if (null !== (n = Ri(e, t, n, r))) {
            nu(n, e, r, eu()), Ja(n, t, r);
          }
        }
        function Ga(e, t, n) {
          var r = tu(e),
            o = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            };
          if (Qa(e)) Ya(t, o);
          else {
            var i = e.alternate;
            if (
              0 === e.lanes &&
              (null === i || 0 === i.lanes) &&
              null !== (i = t.lastRenderedReducer)
            )
              try {
                var a = t.lastRenderedState,
                  s = i(a, n);
                if (((o.hasEagerState = !0), (o.eagerState = s), sr(s, a))) {
                  var l = t.interleaved;
                  return (
                    null === l
                      ? ((o.next = o), Pi(t))
                      : ((o.next = l.next), (l.next = o)),
                    void (t.interleaved = o)
                  );
                }
              } catch (u) {}
            null !== (n = Ri(e, t, o, r)) &&
              (nu(n, e, r, (o = eu())), Ja(n, t, r));
          }
        }
        function Qa(e) {
          var t = e.alternate;
          return e === sa || (null !== t && t === sa);
        }
        function Ya(e, t) {
          da = ca = !0;
          var n = e.pending;
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t);
        }
        function Ja(e, t, n) {
          if (0 !== (4194240 & n)) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), gt(e, n);
          }
        }
        var Xa = {
            readContext: Oi,
            useCallback: ha,
            useContext: ha,
            useEffect: ha,
            useImperativeHandle: ha,
            useInsertionEffect: ha,
            useLayoutEffect: ha,
            useMemo: ha,
            useReducer: ha,
            useRef: ha,
            useState: ha,
            useDebugValue: ha,
            useDeferredValue: ha,
            useTransition: ha,
            useMutableSource: ha,
            useSyncExternalStore: ha,
            useId: ha,
            unstable_isNewReconciler: !1,
          },
          Za = {
            readContext: Oi,
            useCallback: function (e, t) {
              return (ga().memoizedState = [e, void 0 === t ? null : t]), e;
            },
            useContext: Oi,
            useEffect: La,
            useImperativeHandle: function (e, t, n) {
              return (
                (n = null !== n && void 0 !== n ? n.concat([e]) : null),
                Pa(4194308, 4, ja.bind(null, t, e), n)
              );
            },
            useLayoutEffect: function (e, t) {
              return Pa(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              return Pa(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var n = ga();
              return (
                (t = void 0 === t ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
              );
            },
            useReducer: function (e, t, n) {
              var r = ga();
              return (
                (t = void 0 !== n ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Wa.bind(null, sa, e)),
                [r.memoizedState, e]
              );
            },
            useRef: function (e) {
              return (e = { current: e }), (ga().memoizedState = e);
            },
            useState: Na,
            useDebugValue: $a,
            useDeferredValue: function (e) {
              return (ga().memoizedState = e);
            },
            useTransition: function () {
              var e = Na(!1),
                t = e[0];
              return (
                (e = Ba.bind(null, e[1])), (ga().memoizedState = e), [t, e]
              );
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, n) {
              var r = sa,
                o = ga();
              if (ii) {
                if (void 0 === n) throw Error(i(407));
                n = n();
              } else {
                if (((n = t()), null === xl)) throw Error(i(349));
                0 !== (30 & aa) || Aa(r, t, n);
              }
              o.memoizedState = n;
              var a = { value: n, getSnapshot: t };
              return (
                (o.queue = a),
                La(Ia.bind(null, r, a, e), [e]),
                (r.flags |= 2048),
                Oa(9, _a.bind(null, r, a, n, t), void 0, null),
                n
              );
            },
            useId: function () {
              var e = ga(),
                t = xl.identifierPrefix;
              if (ii) {
                var n = Xo;
                (t =
                  ":" +
                  t +
                  "R" +
                  (n = (Jo & ~(1 << (32 - at(Jo) - 1))).toString(32) + n)),
                  0 < (n = fa++) && (t += "H" + n.toString(32)),
                  (t += ":");
              } else t = ":" + t + "r" + (n = pa++).toString(32) + ":";
              return (e.memoizedState = t);
            },
            unstable_isNewReconciler: !1,
          },
          es = {
            readContext: Oi,
            useCallback: Va,
            useContext: Oi,
            useEffect: Ma,
            useImperativeHandle: za,
            useInsertionEffect: Fa,
            useLayoutEffect: Ua,
            useMemo: Ka,
            useReducer: Sa,
            useRef: Da,
            useState: function () {
              return Sa(wa);
            },
            useDebugValue: $a,
            useDeferredValue: function (e) {
              return qa(ba(), la.memoizedState, e);
            },
            useTransition: function () {
              return [Sa(wa)[0], ba().memoizedState];
            },
            useMutableSource: Ea,
            useSyncExternalStore: Ta,
            useId: Ha,
            unstable_isNewReconciler: !1,
          },
          ts = {
            readContext: Oi,
            useCallback: Va,
            useContext: Oi,
            useEffect: Ma,
            useImperativeHandle: za,
            useInsertionEffect: Fa,
            useLayoutEffect: Ua,
            useMemo: Ka,
            useReducer: ka,
            useRef: Da,
            useState: function () {
              return ka(wa);
            },
            useDebugValue: $a,
            useDeferredValue: function (e) {
              var t = ba();
              return null === la
                ? (t.memoizedState = e)
                : qa(t, la.memoizedState, e);
            },
            useTransition: function () {
              return [ka(wa)[0], ba().memoizedState];
            },
            useMutableSource: Ea,
            useSyncExternalStore: Ta,
            useId: Ha,
            unstable_isNewReconciler: !1,
          };
        function ns(e, t) {
          if (e && e.defaultProps) {
            for (var n in ((t = F({}, t)), (e = e.defaultProps)))
              void 0 === t[n] && (t[n] = e[n]);
            return t;
          }
          return t;
        }
        function rs(e, t, n, r) {
          (n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : F({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n);
        }
        var os = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && Ve(e) === e;
          },
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals;
            var r = eu(),
              o = tu(e),
              i = ji(r, o);
            (i.payload = t),
              void 0 !== n && null !== n && (i.callback = n),
              null !== (t = zi(e, i, o)) && (nu(t, e, o, r), $i(t, e, o));
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals;
            var r = eu(),
              o = tu(e),
              i = ji(r, o);
            (i.tag = 1),
              (i.payload = t),
              void 0 !== n && null !== n && (i.callback = n),
              null !== (t = zi(e, i, o)) && (nu(t, e, o, r), $i(t, e, o));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var n = eu(),
              r = tu(e),
              o = ji(n, r);
            (o.tag = 2),
              void 0 !== t && null !== t && (o.callback = t),
              null !== (t = zi(e, o, r)) && (nu(t, e, r, n), $i(t, e, r));
          },
        };
        function is(e, t, n, r, o, i, a) {
          return "function" === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, i, a)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !lr(n, r) ||
                !lr(o, i);
        }
        function as(e, t, n) {
          var r = !1,
            o = Co,
            i = t.contextType;
          return (
            "object" === typeof i && null !== i
              ? (i = Oi(i))
              : ((o = Po(t) ? Oo : xo.current),
                (i = (r = null !== (r = t.contextTypes) && void 0 !== r)
                  ? Do(e, o)
                  : Co)),
            (t = new t(n, i)),
            (e.memoizedState =
              null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = os),
            (e.stateNode = t),
            (t._reactInternals = e),
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                o),
              (e.__reactInternalMemoizedMaskedChildContext = i)),
            t
          );
        }
        function ss(e, t, n, r) {
          (e = t.state),
            "function" === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            "function" === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && os.enqueueReplaceState(t, t.state, null);
        }
        function ls(e, t, n, r) {
          var o = e.stateNode;
          (o.props = n), (o.state = e.memoizedState), (o.refs = {}), Fi(e);
          var i = t.contextType;
          "object" === typeof i && null !== i
            ? (o.context = Oi(i))
            : ((i = Po(t) ? Oo : xo.current), (o.context = Do(e, i))),
            (o.state = e.memoizedState),
            "function" === typeof (i = t.getDerivedStateFromProps) &&
              (rs(e, t, i, n), (o.state = e.memoizedState)),
            "function" === typeof t.getDerivedStateFromProps ||
              "function" === typeof o.getSnapshotBeforeUpdate ||
              ("function" !== typeof o.UNSAFE_componentWillMount &&
                "function" !== typeof o.componentWillMount) ||
              ((t = o.state),
              "function" === typeof o.componentWillMount &&
                o.componentWillMount(),
              "function" === typeof o.UNSAFE_componentWillMount &&
                o.UNSAFE_componentWillMount(),
              t !== o.state && os.enqueueReplaceState(o, o.state, null),
              Ki(e, n, o, r),
              (o.state = e.memoizedState)),
            "function" === typeof o.componentDidMount && (e.flags |= 4194308);
        }
        function us(e, t) {
          try {
            var n = "",
              r = t;
            do {
              (n += $(r)), (r = r.return);
            } while (r);
            var o = n;
          } catch (i) {
            o = "\nError generating stack: " + i.message + "\n" + i.stack;
          }
          return { value: e, source: t, stack: o, digest: null };
        }
        function cs(e, t, n) {
          return {
            value: e,
            source: null,
            stack: null != n ? n : null,
            digest: null != t ? t : null,
          };
        }
        function ds(e, t) {
          try {
            console.error(t.value);
          } catch (n) {
            setTimeout(function () {
              throw n;
            });
          }
        }
        var fs = "function" === typeof WeakMap ? WeakMap : Map;
        function ps(e, t, n) {
          ((n = ji(-1, n)).tag = 3), (n.payload = { element: null });
          var r = t.value;
          return (
            (n.callback = function () {
              ql || ((ql = !0), (Bl = r)), ds(0, t);
            }),
            n
          );
        }
        function hs(e, t, n) {
          (n = ji(-1, n)).tag = 3;
          var r = e.type.getDerivedStateFromError;
          if ("function" === typeof r) {
            var o = t.value;
            (n.payload = function () {
              return r(o);
            }),
              (n.callback = function () {
                ds(0, t);
              });
          }
          var i = e.stateNode;
          return (
            null !== i &&
              "function" === typeof i.componentDidCatch &&
              (n.callback = function () {
                ds(0, t),
                  "function" !== typeof r &&
                    (null === Hl ? (Hl = new Set([this])) : Hl.add(this));
                var e = t.stack;
                this.componentDidCatch(t.value, {
                  componentStack: null !== e ? e : "",
                });
              }),
            n
          );
        }
        function ms(e, t, n) {
          var r = e.pingCache;
          if (null === r) {
            r = e.pingCache = new fs();
            var o = new Set();
            r.set(t, o);
          } else void 0 === (o = r.get(t)) && ((o = new Set()), r.set(t, o));
          o.has(n) || (o.add(n), (e = Au.bind(null, e, t, n)), t.then(e, e));
        }
        function vs(e) {
          do {
            var t;
            if (
              ((t = 13 === e.tag) &&
                (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e;
            e = e.return;
          } while (null !== e);
          return null;
        }
        function ys(e, t, n, r, o) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((t = ji(-1, 1)).tag = 2), zi(n, t, 1))),
                  (n.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = o), e);
        }
        var gs = w.ReactCurrentOwner,
          bs = !1;
        function ws(e, t, n, r) {
          t.child = null === e ? ki(t, null, n, r) : Si(t, e.child, n, r);
        }
        function Ss(e, t, n, r, o) {
          n = n.render;
          var i = t.ref;
          return (
            Ni(t, o),
            (r = va(e, t, n, r, i, o)),
            (n = ya()),
            null === e || bs
              ? (ii && n && ti(t), (t.flags |= 1), ws(e, t, r, o), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~o),
                qs(e, t, o))
          );
        }
        function ks(e, t, n, r, o) {
          if (null === e) {
            var i = n.type;
            return "function" !== typeof i ||
              Du(i) ||
              void 0 !== i.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((e = Ru(n.type, null, r, t, t.mode, o)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = i), Es(e, t, i, r, o));
          }
          if (((i = e.child), 0 === (e.lanes & o))) {
            var a = i.memoizedProps;
            if (
              (n = null !== (n = n.compare) ? n : lr)(a, r) &&
              e.ref === t.ref
            )
              return qs(e, t, o);
          }
          return (
            (t.flags |= 1),
            ((e = Pu(i, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          );
        }
        function Es(e, t, n, r, o) {
          if (null !== e) {
            var i = e.memoizedProps;
            if (lr(i, r) && e.ref === t.ref) {
              if (((bs = !1), (t.pendingProps = r = i), 0 === (e.lanes & o)))
                return (t.lanes = e.lanes), qs(e, t, o);
              0 !== (131072 & e.flags) && (bs = !0);
            }
          }
          return _s(e, t, n, r, o);
        }
        function Ts(e, t, n) {
          var r = t.pendingProps,
            o = r.children,
            i = null !== e ? e.memoizedState : null;
          if ("hidden" === r.mode)
            if (0 === (1 & t.mode))
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Io(Pl, Dl),
                (Dl |= n);
            else {
              if (0 === (1073741824 & n))
                return (
                  (e = null !== i ? i.baseLanes | n : n),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null,
                  }),
                  (t.updateQueue = null),
                  Io(Pl, Dl),
                  (Dl |= e),
                  null
                );
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== i ? i.baseLanes : n),
                Io(Pl, Dl),
                (Dl |= r);
            }
          else
            null !== i
              ? ((r = i.baseLanes | n), (t.memoizedState = null))
              : (r = n),
              Io(Pl, Dl),
              (Dl |= r);
          return ws(e, t, o, n), t.child;
        }
        function As(e, t) {
          var n = t.ref;
          ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
            ((t.flags |= 512), (t.flags |= 2097152));
        }
        function _s(e, t, n, r, o) {
          var i = Po(n) ? Oo : xo.current;
          return (
            (i = Do(t, i)),
            Ni(t, o),
            (n = va(e, t, n, r, i, o)),
            (r = ya()),
            null === e || bs
              ? (ii && r && ti(t), (t.flags |= 1), ws(e, t, n, o), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~o),
                qs(e, t, o))
          );
        }
        function Is(e, t, n, r, o) {
          if (Po(n)) {
            var i = !0;
            Fo(t);
          } else i = !1;
          if ((Ni(t, o), null === t.stateNode))
            Ks(e, t), as(t, n, r), ls(t, n, r, o), (r = !0);
          else if (null === e) {
            var a = t.stateNode,
              s = t.memoizedProps;
            a.props = s;
            var l = a.context,
              u = n.contextType;
            "object" === typeof u && null !== u
              ? (u = Oi(u))
              : (u = Do(t, (u = Po(n) ? Oo : xo.current)));
            var c = n.getDerivedStateFromProps,
              d =
                "function" === typeof c ||
                "function" === typeof a.getSnapshotBeforeUpdate;
            d ||
              ("function" !== typeof a.UNSAFE_componentWillReceiveProps &&
                "function" !== typeof a.componentWillReceiveProps) ||
              ((s !== r || l !== u) && ss(t, a, r, u)),
              (Mi = !1);
            var f = t.memoizedState;
            (a.state = f),
              Ki(t, r, a, o),
              (l = t.memoizedState),
              s !== r || f !== l || No.current || Mi
                ? ("function" === typeof c &&
                    (rs(t, n, c, r), (l = t.memoizedState)),
                  (s = Mi || is(t, n, s, r, f, l, u))
                    ? (d ||
                        ("function" !== typeof a.UNSAFE_componentWillMount &&
                          "function" !== typeof a.componentWillMount) ||
                        ("function" === typeof a.componentWillMount &&
                          a.componentWillMount(),
                        "function" === typeof a.UNSAFE_componentWillMount &&
                          a.UNSAFE_componentWillMount()),
                      "function" === typeof a.componentDidMount &&
                        (t.flags |= 4194308))
                    : ("function" === typeof a.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = l)),
                  (a.props = r),
                  (a.state = l),
                  (a.context = u),
                  (r = s))
                : ("function" === typeof a.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1));
          } else {
            (a = t.stateNode),
              Ui(e, t),
              (s = t.memoizedProps),
              (u = t.type === t.elementType ? s : ns(t.type, s)),
              (a.props = u),
              (d = t.pendingProps),
              (f = a.context),
              "object" === typeof (l = n.contextType) && null !== l
                ? (l = Oi(l))
                : (l = Do(t, (l = Po(n) ? Oo : xo.current)));
            var p = n.getDerivedStateFromProps;
            (c =
              "function" === typeof p ||
              "function" === typeof a.getSnapshotBeforeUpdate) ||
              ("function" !== typeof a.UNSAFE_componentWillReceiveProps &&
                "function" !== typeof a.componentWillReceiveProps) ||
              ((s !== d || f !== l) && ss(t, a, r, l)),
              (Mi = !1),
              (f = t.memoizedState),
              (a.state = f),
              Ki(t, r, a, o);
            var h = t.memoizedState;
            s !== d || f !== h || No.current || Mi
              ? ("function" === typeof p &&
                  (rs(t, n, p, r), (h = t.memoizedState)),
                (u = Mi || is(t, n, u, r, f, h, l) || !1)
                  ? (c ||
                      ("function" !== typeof a.UNSAFE_componentWillUpdate &&
                        "function" !== typeof a.componentWillUpdate) ||
                      ("function" === typeof a.componentWillUpdate &&
                        a.componentWillUpdate(r, h, l),
                      "function" === typeof a.UNSAFE_componentWillUpdate &&
                        a.UNSAFE_componentWillUpdate(r, h, l)),
                    "function" === typeof a.componentDidUpdate &&
                      (t.flags |= 4),
                    "function" === typeof a.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ("function" !== typeof a.componentDidUpdate ||
                      (s === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    "function" !== typeof a.getSnapshotBeforeUpdate ||
                      (s === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = h)),
                (a.props = r),
                (a.state = h),
                (a.context = l),
                (r = u))
              : ("function" !== typeof a.componentDidUpdate ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                "function" !== typeof a.getSnapshotBeforeUpdate ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1));
          }
          return Cs(e, t, n, r, i, o);
        }
        function Cs(e, t, n, r, o, i) {
          As(e, t);
          var a = 0 !== (128 & t.flags);
          if (!r && !a) return o && Uo(t, n, !1), qs(e, t, i);
          (r = t.stateNode), (gs.current = t);
          var s =
            a && "function" !== typeof n.getDerivedStateFromError
              ? null
              : r.render();
          return (
            (t.flags |= 1),
            null !== e && a
              ? ((t.child = Si(t, e.child, null, i)),
                (t.child = Si(t, null, s, i)))
              : ws(e, t, s, i),
            (t.memoizedState = r.state),
            o && Uo(t, n, !0),
            t.child
          );
        }
        function xs(e) {
          var t = e.stateNode;
          t.pendingContext
            ? Lo(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Lo(0, t.context, !1),
            Yi(e, t.containerInfo);
        }
        function Ns(e, t, n, r, o) {
          return hi(), mi(o), (t.flags |= 256), ws(e, t, n, r), t.child;
        }
        var Os,
          Ds,
          Ps,
          Rs,
          Ls = { dehydrated: null, treeContext: null, retryLane: 0 };
        function Ms(e) {
          return { baseLanes: e, cachePool: null, transitions: null };
        }
        function Fs(e, t, n) {
          var r,
            o = t.pendingProps,
            a = ea.current,
            s = !1,
            l = 0 !== (128 & t.flags);
          if (
            ((r = l) ||
              (r = (null === e || null !== e.memoizedState) && 0 !== (2 & a)),
            r
              ? ((s = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (a |= 1),
            Io(ea, 1 & a),
            null === e)
          )
            return (
              ci(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : "$!" === e.data
                    ? (t.lanes = 8)
                    : (t.lanes = 1073741824),
                  null)
                : ((l = o.children),
                  (e = o.fallback),
                  s
                    ? ((o = t.mode),
                      (s = t.child),
                      (l = { mode: "hidden", children: l }),
                      0 === (1 & o) && null !== s
                        ? ((s.childLanes = 0), (s.pendingProps = l))
                        : (s = Mu(l, o, 0, null)),
                      (e = Lu(e, o, n, null)),
                      (s.return = t),
                      (e.return = t),
                      (s.sibling = e),
                      (t.child = s),
                      (t.child.memoizedState = Ms(n)),
                      (t.memoizedState = Ls),
                      e)
                    : Us(t, l))
            );
          if (null !== (a = e.memoizedState) && null !== (r = a.dehydrated))
            return (function (e, t, n, r, o, a, s) {
              if (n)
                return 256 & t.flags
                  ? ((t.flags &= -257), js(e, t, s, (r = cs(Error(i(422))))))
                  : null !== t.memoizedState
                  ? ((t.child = e.child), (t.flags |= 128), null)
                  : ((a = r.fallback),
                    (o = t.mode),
                    (r = Mu(
                      { mode: "visible", children: r.children },
                      o,
                      0,
                      null
                    )),
                    ((a = Lu(a, o, s, null)).flags |= 2),
                    (r.return = t),
                    (a.return = t),
                    (r.sibling = a),
                    (t.child = r),
                    0 !== (1 & t.mode) && Si(t, e.child, null, s),
                    (t.child.memoizedState = Ms(s)),
                    (t.memoizedState = Ls),
                    a);
              if (0 === (1 & t.mode)) return js(e, t, s, null);
              if ("$!" === o.data) {
                if ((r = o.nextSibling && o.nextSibling.dataset))
                  var l = r.dgst;
                return (
                  (r = l), js(e, t, s, (r = cs((a = Error(i(419))), r, void 0)))
                );
              }
              if (((l = 0 !== (s & e.childLanes)), bs || l)) {
                if (null !== (r = xl)) {
                  switch (s & -s) {
                    case 4:
                      o = 2;
                      break;
                    case 16:
                      o = 8;
                      break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      o = 32;
                      break;
                    case 536870912:
                      o = 268435456;
                      break;
                    default:
                      o = 0;
                  }
                  0 !== (o = 0 !== (o & (r.suspendedLanes | s)) ? 0 : o) &&
                    o !== a.retryLane &&
                    ((a.retryLane = o), Li(e, o), nu(r, e, o, -1));
                }
                return mu(), js(e, t, s, (r = cs(Error(i(421)))));
              }
              return "$?" === o.data
                ? ((t.flags |= 128),
                  (t.child = e.child),
                  (t = Iu.bind(null, e)),
                  (o._reactRetry = t),
                  null)
                : ((e = a.treeContext),
                  (oi = uo(o.nextSibling)),
                  (ri = t),
                  (ii = !0),
                  (ai = null),
                  null !== e &&
                    ((Go[Qo++] = Jo),
                    (Go[Qo++] = Xo),
                    (Go[Qo++] = Yo),
                    (Jo = e.id),
                    (Xo = e.overflow),
                    (Yo = t)),
                  (t = Us(t, r.children)),
                  (t.flags |= 4096),
                  t);
            })(e, t, l, o, r, a, n);
          if (s) {
            (s = o.fallback), (l = t.mode), (r = (a = e.child).sibling);
            var u = { mode: "hidden", children: o.children };
            return (
              0 === (1 & l) && t.child !== a
                ? (((o = t.child).childLanes = 0),
                  (o.pendingProps = u),
                  (t.deletions = null))
                : ((o = Pu(a, u)).subtreeFlags = 14680064 & a.subtreeFlags),
              null !== r
                ? (s = Pu(r, s))
                : ((s = Lu(s, l, n, null)).flags |= 2),
              (s.return = t),
              (o.return = t),
              (o.sibling = s),
              (t.child = o),
              (o = s),
              (s = t.child),
              (l =
                null === (l = e.child.memoizedState)
                  ? Ms(n)
                  : {
                      baseLanes: l.baseLanes | n,
                      cachePool: null,
                      transitions: l.transitions,
                    }),
              (s.memoizedState = l),
              (s.childLanes = e.childLanes & ~n),
              (t.memoizedState = Ls),
              o
            );
          }
          return (
            (e = (s = e.child).sibling),
            (o = Pu(s, { mode: "visible", children: o.children })),
            0 === (1 & t.mode) && (o.lanes = n),
            (o.return = t),
            (o.sibling = null),
            null !== e &&
              (null === (n = t.deletions)
                ? ((t.deletions = [e]), (t.flags |= 16))
                : n.push(e)),
            (t.child = o),
            (t.memoizedState = null),
            o
          );
        }
        function Us(e, t) {
          return (
            ((t = Mu(
              { mode: "visible", children: t },
              e.mode,
              0,
              null
            )).return = e),
            (e.child = t)
          );
        }
        function js(e, t, n, r) {
          return (
            null !== r && mi(r),
            Si(t, e.child, null, n),
            ((e = Us(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function zs(e, t, n) {
          e.lanes |= t;
          var r = e.alternate;
          null !== r && (r.lanes |= t), xi(e.return, t, n);
        }
        function $s(e, t, n, r, o) {
          var i = e.memoizedState;
          null === i
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: o,
              })
            : ((i.isBackwards = t),
              (i.rendering = null),
              (i.renderingStartTime = 0),
              (i.last = r),
              (i.tail = n),
              (i.tailMode = o));
        }
        function Vs(e, t, n) {
          var r = t.pendingProps,
            o = r.revealOrder,
            i = r.tail;
          if ((ws(e, t, r.children, n), 0 !== (2 & (r = ea.current))))
            (r = (1 & r) | 2), (t.flags |= 128);
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && zs(e, n, t);
                else if (19 === e.tag) zs(e, n, t);
                else if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
                if (e === t) break e;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e;
                  e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
              }
            r &= 1;
          }
          if ((Io(ea, r), 0 === (1 & t.mode))) t.memoizedState = null;
          else
            switch (o) {
              case "forwards":
                for (n = t.child, o = null; null !== n; )
                  null !== (e = n.alternate) && null === ta(e) && (o = n),
                    (n = n.sibling);
                null === (n = o)
                  ? ((o = t.child), (t.child = null))
                  : ((o = n.sibling), (n.sibling = null)),
                  $s(t, !1, o, n, i);
                break;
              case "backwards":
                for (n = null, o = t.child, t.child = null; null !== o; ) {
                  if (null !== (e = o.alternate) && null === ta(e)) {
                    t.child = o;
                    break;
                  }
                  (e = o.sibling), (o.sibling = n), (n = o), (o = e);
                }
                $s(t, !0, n, null, i);
                break;
              case "together":
                $s(t, !1, null, null, void 0);
                break;
              default:
                t.memoizedState = null;
            }
          return t.child;
        }
        function Ks(e, t) {
          0 === (1 & t.mode) &&
            null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
        }
        function qs(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Ml |= t.lanes),
            0 === (n & t.childLanes))
          )
            return null;
          if (null !== e && t.child !== e.child) throw Error(i(153));
          if (null !== t.child) {
            for (
              n = Pu((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;

            )
              (e = e.sibling),
                ((n = n.sibling = Pu(e, e.pendingProps)).return = t);
            n.sibling = null;
          }
          return t.child;
        }
        function Bs(e, t) {
          if (!ii)
            switch (e.tailMode) {
              case "hidden":
                t = e.tail;
                for (var n = null; null !== t; )
                  null !== t.alternate && (n = t), (t = t.sibling);
                null === n ? (e.tail = null) : (n.sibling = null);
                break;
              case "collapsed":
                n = e.tail;
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling);
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function Hs(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0;
          if (t)
            for (var o = e.child; null !== o; )
              (n |= o.lanes | o.childLanes),
                (r |= 14680064 & o.subtreeFlags),
                (r |= 14680064 & o.flags),
                (o.return = e),
                (o = o.sibling);
          else
            for (o = e.child; null !== o; )
              (n |= o.lanes | o.childLanes),
                (r |= o.subtreeFlags),
                (r |= o.flags),
                (o.return = e),
                (o = o.sibling);
          return (e.subtreeFlags |= r), (e.childLanes = n), t;
        }
        function Ws(e, t, n) {
          var r = t.pendingProps;
          switch ((ni(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return Hs(t), null;
            case 1:
            case 17:
              return Po(t.type) && Ro(), Hs(t), null;
            case 3:
              return (
                (r = t.stateNode),
                Ji(),
                _o(No),
                _o(xo),
                ra(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (fi(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024),
                      null !== ai && (au(ai), (ai = null)))),
                Ds(e, t),
                Hs(t),
                null
              );
            case 5:
              Zi(t);
              var o = Qi(Gi.current);
              if (((n = t.type), null !== e && null != t.stateNode))
                Ps(e, t, n, r, o),
                  e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(i(166));
                  return Hs(t), null;
                }
                if (((e = Qi(Hi.current)), fi(t))) {
                  (r = t.stateNode), (n = t.type);
                  var a = t.memoizedProps;
                  switch (
                    ((r[po] = t), (r[ho] = a), (e = 0 !== (1 & t.mode)), n)
                  ) {
                    case "dialog":
                      jr("cancel", r), jr("close", r);
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      jr("load", r);
                      break;
                    case "video":
                    case "audio":
                      for (o = 0; o < Lr.length; o++) jr(Lr[o], r);
                      break;
                    case "source":
                      jr("error", r);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      jr("error", r), jr("load", r);
                      break;
                    case "details":
                      jr("toggle", r);
                      break;
                    case "input":
                      Y(r, a), jr("invalid", r);
                      break;
                    case "select":
                      (r._wrapperState = { wasMultiple: !!a.multiple }),
                        jr("invalid", r);
                      break;
                    case "textarea":
                      oe(r, a), jr("invalid", r);
                  }
                  for (var l in (ge(n, a), (o = null), a))
                    if (a.hasOwnProperty(l)) {
                      var u = a[l];
                      "children" === l
                        ? "string" === typeof u
                          ? r.textContent !== u &&
                            (!0 !== a.suppressHydrationWarning &&
                              Xr(r.textContent, u, e),
                            (o = ["children", u]))
                          : "number" === typeof u &&
                            r.textContent !== "" + u &&
                            (!0 !== a.suppressHydrationWarning &&
                              Xr(r.textContent, u, e),
                            (o = ["children", "" + u]))
                        : s.hasOwnProperty(l) &&
                          null != u &&
                          "onScroll" === l &&
                          jr("scroll", r);
                    }
                  switch (n) {
                    case "input":
                      H(r), Z(r, a, !0);
                      break;
                    case "textarea":
                      H(r), ae(r);
                      break;
                    case "select":
                    case "option":
                      break;
                    default:
                      "function" === typeof a.onClick && (r.onclick = Zr);
                  }
                  (r = o), (t.updateQueue = r), null !== r && (t.flags |= 4);
                } else {
                  (l = 9 === o.nodeType ? o : o.ownerDocument),
                    "http://www.w3.org/1999/xhtml" === e && (e = se(n)),
                    "http://www.w3.org/1999/xhtml" === e
                      ? "script" === n
                        ? (((e = l.createElement("div")).innerHTML =
                            "<script></script>"),
                          (e = e.removeChild(e.firstChild)))
                        : "string" === typeof r.is
                        ? (e = l.createElement(n, { is: r.is }))
                        : ((e = l.createElement(n)),
                          "select" === n &&
                            ((l = e),
                            r.multiple
                              ? (l.multiple = !0)
                              : r.size && (l.size = r.size)))
                      : (e = l.createElementNS(e, n)),
                    (e[po] = t),
                    (e[ho] = r),
                    Os(e, t, !1, !1),
                    (t.stateNode = e);
                  e: {
                    switch (((l = be(n, r)), n)) {
                      case "dialog":
                        jr("cancel", e), jr("close", e), (o = r);
                        break;
                      case "iframe":
                      case "object":
                      case "embed":
                        jr("load", e), (o = r);
                        break;
                      case "video":
                      case "audio":
                        for (o = 0; o < Lr.length; o++) jr(Lr[o], e);
                        o = r;
                        break;
                      case "source":
                        jr("error", e), (o = r);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        jr("error", e), jr("load", e), (o = r);
                        break;
                      case "details":
                        jr("toggle", e), (o = r);
                        break;
                      case "input":
                        Y(e, r), (o = Q(e, r)), jr("invalid", e);
                        break;
                      case "option":
                      default:
                        o = r;
                        break;
                      case "select":
                        (e._wrapperState = { wasMultiple: !!r.multiple }),
                          (o = F({}, r, { value: void 0 })),
                          jr("invalid", e);
                        break;
                      case "textarea":
                        oe(e, r), (o = re(e, r)), jr("invalid", e);
                    }
                    for (a in (ge(n, o), (u = o)))
                      if (u.hasOwnProperty(a)) {
                        var c = u[a];
                        "style" === a
                          ? ve(e, c)
                          : "dangerouslySetInnerHTML" === a
                          ? null != (c = c ? c.__html : void 0) && de(e, c)
                          : "children" === a
                          ? "string" === typeof c
                            ? ("textarea" !== n || "" !== c) && fe(e, c)
                            : "number" === typeof c && fe(e, "" + c)
                          : "suppressContentEditableWarning" !== a &&
                            "suppressHydrationWarning" !== a &&
                            "autoFocus" !== a &&
                            (s.hasOwnProperty(a)
                              ? null != c && "onScroll" === a && jr("scroll", e)
                              : null != c && b(e, a, c, l));
                      }
                    switch (n) {
                      case "input":
                        H(e), Z(e, r, !1);
                        break;
                      case "textarea":
                        H(e), ae(e);
                        break;
                      case "option":
                        null != r.value &&
                          e.setAttribute("value", "" + q(r.value));
                        break;
                      case "select":
                        (e.multiple = !!r.multiple),
                          null != (a = r.value)
                            ? ne(e, !!r.multiple, a, !1)
                            : null != r.defaultValue &&
                              ne(e, !!r.multiple, r.defaultValue, !0);
                        break;
                      default:
                        "function" === typeof o.onClick && (e.onclick = Zr);
                    }
                    switch (n) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        r = !!r.autoFocus;
                        break e;
                      case "img":
                        r = !0;
                        break e;
                      default:
                        r = !1;
                    }
                  }
                  r && (t.flags |= 4);
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              }
              return Hs(t), null;
            case 6:
              if (e && null != t.stateNode) Rs(e, t, e.memoizedProps, r);
              else {
                if ("string" !== typeof r && null === t.stateNode)
                  throw Error(i(166));
                if (((n = Qi(Gi.current)), Qi(Hi.current), fi(t))) {
                  if (
                    ((r = t.stateNode),
                    (n = t.memoizedProps),
                    (r[po] = t),
                    (a = r.nodeValue !== n) && null !== (e = ri))
                  )
                    switch (e.tag) {
                      case 3:
                        Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                        break;
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                    }
                  a && (t.flags |= 4);
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                    r
                  ))[po] = t),
                    (t.stateNode = r);
              }
              return Hs(t), null;
            case 13:
              if (
                (_o(ea),
                (r = t.memoizedState),
                null === e ||
                  (null !== e.memoizedState &&
                    null !== e.memoizedState.dehydrated))
              ) {
                if (
                  ii &&
                  null !== oi &&
                  0 !== (1 & t.mode) &&
                  0 === (128 & t.flags)
                )
                  pi(), hi(), (t.flags |= 98560), (a = !1);
                else if (((a = fi(t)), null !== r && null !== r.dehydrated)) {
                  if (null === e) {
                    if (!a) throw Error(i(318));
                    if (
                      !(a =
                        null !== (a = t.memoizedState) ? a.dehydrated : null)
                    )
                      throw Error(i(317));
                    a[po] = t;
                  } else
                    hi(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4);
                  Hs(t), (a = !1);
                } else null !== ai && (au(ai), (ai = null)), (a = !0);
                if (!a) return 65536 & t.flags ? t : null;
              }
              return 0 !== (128 & t.flags)
                ? ((t.lanes = n), t)
                : ((r = null !== r) !==
                    (null !== e && null !== e.memoizedState) &&
                    r &&
                    ((t.child.flags |= 8192),
                    0 !== (1 & t.mode) &&
                      (null === e || 0 !== (1 & ea.current)
                        ? 0 === Rl && (Rl = 3)
                        : mu())),
                  null !== t.updateQueue && (t.flags |= 4),
                  Hs(t),
                  null);
            case 4:
              return (
                Ji(),
                Ds(e, t),
                null === e && Vr(t.stateNode.containerInfo),
                Hs(t),
                null
              );
            case 10:
              return Ci(t.type._context), Hs(t), null;
            case 19:
              if ((_o(ea), null === (a = t.memoizedState))) return Hs(t), null;
              if (((r = 0 !== (128 & t.flags)), null === (l = a.rendering)))
                if (r) Bs(a, !1);
                else {
                  if (0 !== Rl || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (l = ta(e))) {
                        for (
                          t.flags |= 128,
                            Bs(a, !1),
                            null !== (r = l.updateQueue) &&
                              ((t.updateQueue = r), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child;
                          null !== n;

                        )
                          (e = r),
                            ((a = n).flags &= 14680066),
                            null === (l = a.alternate)
                              ? ((a.childLanes = 0),
                                (a.lanes = e),
                                (a.child = null),
                                (a.subtreeFlags = 0),
                                (a.memoizedProps = null),
                                (a.memoizedState = null),
                                (a.updateQueue = null),
                                (a.dependencies = null),
                                (a.stateNode = null))
                              : ((a.childLanes = l.childLanes),
                                (a.lanes = l.lanes),
                                (a.child = l.child),
                                (a.subtreeFlags = 0),
                                (a.deletions = null),
                                (a.memoizedProps = l.memoizedProps),
                                (a.memoizedState = l.memoizedState),
                                (a.updateQueue = l.updateQueue),
                                (a.type = l.type),
                                (e = l.dependencies),
                                (a.dependencies =
                                  null === e
                                    ? null
                                    : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext,
                                      })),
                            (n = n.sibling);
                        return Io(ea, (1 & ea.current) | 2), t.child;
                      }
                      e = e.sibling;
                    }
                  null !== a.tail &&
                    Je() > Vl &&
                    ((t.flags |= 128),
                    (r = !0),
                    Bs(a, !1),
                    (t.lanes = 4194304));
                }
              else {
                if (!r)
                  if (null !== (e = ta(l))) {
                    if (
                      ((t.flags |= 128),
                      (r = !0),
                      null !== (n = e.updateQueue) &&
                        ((t.updateQueue = n), (t.flags |= 4)),
                      Bs(a, !0),
                      null === a.tail &&
                        "hidden" === a.tailMode &&
                        !l.alternate &&
                        !ii)
                    )
                      return Hs(t), null;
                  } else
                    2 * Je() - a.renderingStartTime > Vl &&
                      1073741824 !== n &&
                      ((t.flags |= 128),
                      (r = !0),
                      Bs(a, !1),
                      (t.lanes = 4194304));
                a.isBackwards
                  ? ((l.sibling = t.child), (t.child = l))
                  : (null !== (n = a.last) ? (n.sibling = l) : (t.child = l),
                    (a.last = l));
              }
              return null !== a.tail
                ? ((t = a.tail),
                  (a.rendering = t),
                  (a.tail = t.sibling),
                  (a.renderingStartTime = Je()),
                  (t.sibling = null),
                  (n = ea.current),
                  Io(ea, r ? (1 & n) | 2 : 1 & n),
                  t)
                : (Hs(t), null);
            case 22:
            case 23:
              return (
                du(),
                (r = null !== t.memoizedState),
                null !== e &&
                  (null !== e.memoizedState) !== r &&
                  (t.flags |= 8192),
                r && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & Dl) &&
                    (Hs(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : Hs(t),
                null
              );
            case 24:
            case 25:
              return null;
          }
          throw Error(i(156, t.tag));
        }
        function Gs(e, t) {
          switch ((ni(t), t.tag)) {
            case 1:
              return (
                Po(t.type) && Ro(),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 3:
              return (
                Ji(),
                _o(No),
                _o(xo),
                ra(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 5:
              return Zi(t), null;
            case 13:
              if (
                (_o(ea),
                null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(i(340));
                hi();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 19:
              return _o(ea), null;
            case 4:
              return Ji(), null;
            case 10:
              return Ci(t.type._context), null;
            case 22:
            case 23:
              return du(), null;
            default:
              return null;
          }
        }
        (Os = function (e, t) {
          for (var n = t.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
            else if (4 !== n.tag && null !== n.child) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break;
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === t) return;
              n = n.return;
            }
            (n.sibling.return = n.return), (n = n.sibling);
          }
        }),
          (Ds = function () {}),
          (Ps = function (e, t, n, r) {
            var o = e.memoizedProps;
            if (o !== r) {
              (e = t.stateNode), Qi(Hi.current);
              var i,
                a = null;
              switch (n) {
                case "input":
                  (o = Q(e, o)), (r = Q(e, r)), (a = []);
                  break;
                case "select":
                  (o = F({}, o, { value: void 0 })),
                    (r = F({}, r, { value: void 0 })),
                    (a = []);
                  break;
                case "textarea":
                  (o = re(e, o)), (r = re(e, r)), (a = []);
                  break;
                default:
                  "function" !== typeof o.onClick &&
                    "function" === typeof r.onClick &&
                    (e.onclick = Zr);
              }
              for (c in (ge(n, r), (n = null), o))
                if (!r.hasOwnProperty(c) && o.hasOwnProperty(c) && null != o[c])
                  if ("style" === c) {
                    var l = o[c];
                    for (i in l)
                      l.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
                  } else
                    "dangerouslySetInnerHTML" !== c &&
                      "children" !== c &&
                      "suppressContentEditableWarning" !== c &&
                      "suppressHydrationWarning" !== c &&
                      "autoFocus" !== c &&
                      (s.hasOwnProperty(c)
                        ? a || (a = [])
                        : (a = a || []).push(c, null));
              for (c in r) {
                var u = r[c];
                if (
                  ((l = null != o ? o[c] : void 0),
                  r.hasOwnProperty(c) && u !== l && (null != u || null != l))
                )
                  if ("style" === c)
                    if (l) {
                      for (i in l)
                        !l.hasOwnProperty(i) ||
                          (u && u.hasOwnProperty(i)) ||
                          (n || (n = {}), (n[i] = ""));
                      for (i in u)
                        u.hasOwnProperty(i) &&
                          l[i] !== u[i] &&
                          (n || (n = {}), (n[i] = u[i]));
                    } else n || (a || (a = []), a.push(c, n)), (n = u);
                  else
                    "dangerouslySetInnerHTML" === c
                      ? ((u = u ? u.__html : void 0),
                        (l = l ? l.__html : void 0),
                        null != u && l !== u && (a = a || []).push(c, u))
                      : "children" === c
                      ? ("string" !== typeof u && "number" !== typeof u) ||
                        (a = a || []).push(c, "" + u)
                      : "suppressContentEditableWarning" !== c &&
                        "suppressHydrationWarning" !== c &&
                        (s.hasOwnProperty(c)
                          ? (null != u && "onScroll" === c && jr("scroll", e),
                            a || l === u || (a = []))
                          : (a = a || []).push(c, u));
              }
              n && (a = a || []).push("style", n);
              var c = a;
              (t.updateQueue = c) && (t.flags |= 4);
            }
          }),
          (Rs = function (e, t, n, r) {
            n !== r && (t.flags |= 4);
          });
        var Qs = !1,
          Ys = !1,
          Js = "function" === typeof WeakSet ? WeakSet : Set,
          Xs = null;
        function Zs(e, t) {
          var n = e.ref;
          if (null !== n)
            if ("function" === typeof n)
              try {
                n(null);
              } catch (r) {
                Tu(e, t, r);
              }
            else n.current = null;
        }
        function el(e, t, n) {
          try {
            n();
          } catch (r) {
            Tu(e, t, r);
          }
        }
        var tl = !1;
        function nl(e, t, n) {
          var r = t.updateQueue;
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var o = (r = r.next);
            do {
              if ((o.tag & e) === e) {
                var i = o.destroy;
                (o.destroy = void 0), void 0 !== i && el(t, n, i);
              }
              o = o.next;
            } while (o !== r);
          }
        }
        function rl(e, t) {
          if (
            null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
          ) {
            var n = (t = t.next);
            do {
              if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
              }
              n = n.next;
            } while (n !== t);
          }
        }
        function ol(e) {
          var t = e.ref;
          if (null !== t) {
            var n = e.stateNode;
            e.tag, (e = n), "function" === typeof t ? t(e) : (t.current = e);
          }
        }
        function il(e) {
          var t = e.alternate;
          null !== t && ((e.alternate = null), il(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[po],
              delete t[ho],
              delete t[vo],
              delete t[yo],
              delete t[go]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null);
        }
        function al(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag;
        }
        function sl(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || al(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              (e.child.return = e), (e = e.child);
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function ll(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode),
              t
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(e, t)
                  : n.insertBefore(e, t)
                : (8 === n.nodeType
                    ? (t = n.parentNode).insertBefore(e, n)
                    : (t = n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = Zr));
          else if (4 !== r && null !== (e = e.child))
            for (ll(e, t, n), e = e.sibling; null !== e; )
              ll(e, t, n), (e = e.sibling);
        }
        function ul(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
          else if (4 !== r && null !== (e = e.child))
            for (ul(e, t, n), e = e.sibling; null !== e; )
              ul(e, t, n), (e = e.sibling);
        }
        var cl = null,
          dl = !1;
        function fl(e, t, n) {
          for (n = n.child; null !== n; ) pl(e, t, n), (n = n.sibling);
        }
        function pl(e, t, n) {
          if (it && "function" === typeof it.onCommitFiberUnmount)
            try {
              it.onCommitFiberUnmount(ot, n);
            } catch (s) {}
          switch (n.tag) {
            case 5:
              Ys || Zs(n, t);
            case 6:
              var r = cl,
                o = dl;
              (cl = null),
                fl(e, t, n),
                (dl = o),
                null !== (cl = r) &&
                  (dl
                    ? ((e = cl),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? e.parentNode.removeChild(n)
                        : e.removeChild(n))
                    : cl.removeChild(n.stateNode));
              break;
            case 18:
              null !== cl &&
                (dl
                  ? ((e = cl),
                    (n = n.stateNode),
                    8 === e.nodeType
                      ? lo(e.parentNode, n)
                      : 1 === e.nodeType && lo(e, n),
                    Vt(e))
                  : lo(cl, n.stateNode));
              break;
            case 4:
              (r = cl),
                (o = dl),
                (cl = n.stateNode.containerInfo),
                (dl = !0),
                fl(e, t, n),
                (cl = r),
                (dl = o);
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !Ys &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                o = r = r.next;
                do {
                  var i = o,
                    a = i.destroy;
                  (i = i.tag),
                    void 0 !== a &&
                      (0 !== (2 & i) || 0 !== (4 & i)) &&
                      el(n, t, a),
                    (o = o.next);
                } while (o !== r);
              }
              fl(e, t, n);
              break;
            case 1:
              if (
                !Ys &&
                (Zs(n, t),
                "function" === typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  (r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount();
                } catch (s) {
                  Tu(n, t, s);
                }
              fl(e, t, n);
              break;
            case 21:
              fl(e, t, n);
              break;
            case 22:
              1 & n.mode
                ? ((Ys = (r = Ys) || null !== n.memoizedState),
                  fl(e, t, n),
                  (Ys = r))
                : fl(e, t, n);
              break;
            default:
              fl(e, t, n);
          }
        }
        function hl(e) {
          var t = e.updateQueue;
          if (null !== t) {
            e.updateQueue = null;
            var n = e.stateNode;
            null === n && (n = e.stateNode = new Js()),
              t.forEach(function (t) {
                var r = Cu.bind(null, e, t);
                n.has(t) || (n.add(t), t.then(r, r));
              });
          }
        }
        function ml(e, t) {
          var n = t.deletions;
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var o = n[r];
              try {
                var a = e,
                  s = t,
                  l = s;
                e: for (; null !== l; ) {
                  switch (l.tag) {
                    case 5:
                      (cl = l.stateNode), (dl = !1);
                      break e;
                    case 3:
                    case 4:
                      (cl = l.stateNode.containerInfo), (dl = !0);
                      break e;
                  }
                  l = l.return;
                }
                if (null === cl) throw Error(i(160));
                pl(a, s, o), (cl = null), (dl = !1);
                var u = o.alternate;
                null !== u && (u.return = null), (o.return = null);
              } catch (c) {
                Tu(o, t, c);
              }
            }
          if (12854 & t.subtreeFlags)
            for (t = t.child; null !== t; ) vl(t, e), (t = t.sibling);
        }
        function vl(e, t) {
          var n = e.alternate,
            r = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((ml(t, e), yl(e), 4 & r)) {
                try {
                  nl(3, e, e.return), rl(3, e);
                } catch (v) {
                  Tu(e, e.return, v);
                }
                try {
                  nl(5, e, e.return);
                } catch (v) {
                  Tu(e, e.return, v);
                }
              }
              break;
            case 1:
              ml(t, e), yl(e), 512 & r && null !== n && Zs(n, n.return);
              break;
            case 5:
              if (
                (ml(t, e),
                yl(e),
                512 & r && null !== n && Zs(n, n.return),
                32 & e.flags)
              ) {
                var o = e.stateNode;
                try {
                  fe(o, "");
                } catch (v) {
                  Tu(e, e.return, v);
                }
              }
              if (4 & r && null != (o = e.stateNode)) {
                var a = e.memoizedProps,
                  s = null !== n ? n.memoizedProps : a,
                  l = e.type,
                  u = e.updateQueue;
                if (((e.updateQueue = null), null !== u))
                  try {
                    "input" === l &&
                      "radio" === a.type &&
                      null != a.name &&
                      J(o, a),
                      be(l, s);
                    var c = be(l, a);
                    for (s = 0; s < u.length; s += 2) {
                      var d = u[s],
                        f = u[s + 1];
                      "style" === d
                        ? ve(o, f)
                        : "dangerouslySetInnerHTML" === d
                        ? de(o, f)
                        : "children" === d
                        ? fe(o, f)
                        : b(o, d, f, c);
                    }
                    switch (l) {
                      case "input":
                        X(o, a);
                        break;
                      case "textarea":
                        ie(o, a);
                        break;
                      case "select":
                        var p = o._wrapperState.wasMultiple;
                        o._wrapperState.wasMultiple = !!a.multiple;
                        var h = a.value;
                        null != h
                          ? ne(o, !!a.multiple, h, !1)
                          : p !== !!a.multiple &&
                            (null != a.defaultValue
                              ? ne(o, !!a.multiple, a.defaultValue, !0)
                              : ne(o, !!a.multiple, a.multiple ? [] : "", !1));
                    }
                    o[ho] = a;
                  } catch (v) {
                    Tu(e, e.return, v);
                  }
              }
              break;
            case 6:
              if ((ml(t, e), yl(e), 4 & r)) {
                if (null === e.stateNode) throw Error(i(162));
                (o = e.stateNode), (a = e.memoizedProps);
                try {
                  o.nodeValue = a;
                } catch (v) {
                  Tu(e, e.return, v);
                }
              }
              break;
            case 3:
              if (
                (ml(t, e),
                yl(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  Vt(t.containerInfo);
                } catch (v) {
                  Tu(e, e.return, v);
                }
              break;
            case 4:
            default:
              ml(t, e), yl(e);
              break;
            case 13:
              ml(t, e),
                yl(e),
                8192 & (o = e.child).flags &&
                  ((a = null !== o.memoizedState),
                  (o.stateNode.isHidden = a),
                  !a ||
                    (null !== o.alternate &&
                      null !== o.alternate.memoizedState) ||
                    ($l = Je())),
                4 & r && hl(e);
              break;
            case 22:
              if (
                ((d = null !== n && null !== n.memoizedState),
                1 & e.mode
                  ? ((Ys = (c = Ys) || d), ml(t, e), (Ys = c))
                  : ml(t, e),
                yl(e),
                8192 & r)
              ) {
                if (
                  ((c = null !== e.memoizedState),
                  (e.stateNode.isHidden = c) && !d && 0 !== (1 & e.mode))
                )
                  for (Xs = e, d = e.child; null !== d; ) {
                    for (f = Xs = d; null !== Xs; ) {
                      switch (((h = (p = Xs).child), p.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          nl(4, p, p.return);
                          break;
                        case 1:
                          Zs(p, p.return);
                          var m = p.stateNode;
                          if ("function" === typeof m.componentWillUnmount) {
                            (r = p), (n = p.return);
                            try {
                              (t = r),
                                (m.props = t.memoizedProps),
                                (m.state = t.memoizedState),
                                m.componentWillUnmount();
                            } catch (v) {
                              Tu(r, n, v);
                            }
                          }
                          break;
                        case 5:
                          Zs(p, p.return);
                          break;
                        case 22:
                          if (null !== p.memoizedState) {
                            Sl(f);
                            continue;
                          }
                      }
                      null !== h ? ((h.return = p), (Xs = h)) : Sl(f);
                    }
                    d = d.sibling;
                  }
                e: for (d = null, f = e; ; ) {
                  if (5 === f.tag) {
                    if (null === d) {
                      d = f;
                      try {
                        (o = f.stateNode),
                          c
                            ? "function" === typeof (a = o.style).setProperty
                              ? a.setProperty("display", "none", "important")
                              : (a.display = "none")
                            : ((l = f.stateNode),
                              (s =
                                void 0 !== (u = f.memoizedProps.style) &&
                                null !== u &&
                                u.hasOwnProperty("display")
                                  ? u.display
                                  : null),
                              (l.style.display = me("display", s)));
                      } catch (v) {
                        Tu(e, e.return, v);
                      }
                    }
                  } else if (6 === f.tag) {
                    if (null === d)
                      try {
                        f.stateNode.nodeValue = c ? "" : f.memoizedProps;
                      } catch (v) {
                        Tu(e, e.return, v);
                      }
                  } else if (
                    ((22 !== f.tag && 23 !== f.tag) ||
                      null === f.memoizedState ||
                      f === e) &&
                    null !== f.child
                  ) {
                    (f.child.return = f), (f = f.child);
                    continue;
                  }
                  if (f === e) break e;
                  for (; null === f.sibling; ) {
                    if (null === f.return || f.return === e) break e;
                    d === f && (d = null), (f = f.return);
                  }
                  d === f && (d = null),
                    (f.sibling.return = f.return),
                    (f = f.sibling);
                }
              }
              break;
            case 19:
              ml(t, e), yl(e), 4 & r && hl(e);
            case 21:
          }
        }
        function yl(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              e: {
                for (var n = e.return; null !== n; ) {
                  if (al(n)) {
                    var r = n;
                    break e;
                  }
                  n = n.return;
                }
                throw Error(i(160));
              }
              switch (r.tag) {
                case 5:
                  var o = r.stateNode;
                  32 & r.flags && (fe(o, ""), (r.flags &= -33)),
                    ul(e, sl(e), o);
                  break;
                case 3:
                case 4:
                  var a = r.stateNode.containerInfo;
                  ll(e, sl(e), a);
                  break;
                default:
                  throw Error(i(161));
              }
            } catch (s) {
              Tu(e, e.return, s);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function gl(e, t, n) {
          (Xs = e), bl(e, t, n);
        }
        function bl(e, t, n) {
          for (var r = 0 !== (1 & e.mode); null !== Xs; ) {
            var o = Xs,
              i = o.child;
            if (22 === o.tag && r) {
              var a = null !== o.memoizedState || Qs;
              if (!a) {
                var s = o.alternate,
                  l = (null !== s && null !== s.memoizedState) || Ys;
                s = Qs;
                var u = Ys;
                if (((Qs = a), (Ys = l) && !u))
                  for (Xs = o; null !== Xs; )
                    (l = (a = Xs).child),
                      22 === a.tag && null !== a.memoizedState
                        ? kl(o)
                        : null !== l
                        ? ((l.return = a), (Xs = l))
                        : kl(o);
                for (; null !== i; ) (Xs = i), bl(i, t, n), (i = i.sibling);
                (Xs = o), (Qs = s), (Ys = u);
              }
              wl(e);
            } else
              0 !== (8772 & o.subtreeFlags) && null !== i
                ? ((i.return = o), (Xs = i))
                : wl(e);
          }
        }
        function wl(e) {
          for (; null !== Xs; ) {
            var t = Xs;
            if (0 !== (8772 & t.flags)) {
              var n = t.alternate;
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ys || rl(5, t);
                      break;
                    case 1:
                      var r = t.stateNode;
                      if (4 & t.flags && !Ys)
                        if (null === n) r.componentDidMount();
                        else {
                          var o =
                            t.elementType === t.type
                              ? n.memoizedProps
                              : ns(t.type, n.memoizedProps);
                          r.componentDidUpdate(
                            o,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate
                          );
                        }
                      var a = t.updateQueue;
                      null !== a && qi(t, a, r);
                      break;
                    case 3:
                      var s = t.updateQueue;
                      if (null !== s) {
                        if (((n = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              n = t.child.stateNode;
                          }
                        qi(t, s, n);
                      }
                      break;
                    case 5:
                      var l = t.stateNode;
                      if (null === n && 4 & t.flags) {
                        n = l;
                        var u = t.memoizedProps;
                        switch (t.type) {
                          case "button":
                          case "input":
                          case "select":
                          case "textarea":
                            u.autoFocus && n.focus();
                            break;
                          case "img":
                            u.src && (n.src = u.src);
                        }
                      }
                      break;
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break;
                    case 13:
                      if (null === t.memoizedState) {
                        var c = t.alternate;
                        if (null !== c) {
                          var d = c.memoizedState;
                          if (null !== d) {
                            var f = d.dehydrated;
                            null !== f && Vt(f);
                          }
                        }
                      }
                      break;
                    default:
                      throw Error(i(163));
                  }
                Ys || (512 & t.flags && ol(t));
              } catch (p) {
                Tu(t, t.return, p);
              }
            }
            if (t === e) {
              Xs = null;
              break;
            }
            if (null !== (n = t.sibling)) {
              (n.return = t.return), (Xs = n);
              break;
            }
            Xs = t.return;
          }
        }
        function Sl(e) {
          for (; null !== Xs; ) {
            var t = Xs;
            if (t === e) {
              Xs = null;
              break;
            }
            var n = t.sibling;
            if (null !== n) {
              (n.return = t.return), (Xs = n);
              break;
            }
            Xs = t.return;
          }
        }
        function kl(e) {
          for (; null !== Xs; ) {
            var t = Xs;
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var n = t.return;
                  try {
                    rl(4, t);
                  } catch (l) {
                    Tu(t, n, l);
                  }
                  break;
                case 1:
                  var r = t.stateNode;
                  if ("function" === typeof r.componentDidMount) {
                    var o = t.return;
                    try {
                      r.componentDidMount();
                    } catch (l) {
                      Tu(t, o, l);
                    }
                  }
                  var i = t.return;
                  try {
                    ol(t);
                  } catch (l) {
                    Tu(t, i, l);
                  }
                  break;
                case 5:
                  var a = t.return;
                  try {
                    ol(t);
                  } catch (l) {
                    Tu(t, a, l);
                  }
              }
            } catch (l) {
              Tu(t, t.return, l);
            }
            if (t === e) {
              Xs = null;
              break;
            }
            var s = t.sibling;
            if (null !== s) {
              (s.return = t.return), (Xs = s);
              break;
            }
            Xs = t.return;
          }
        }
        var El,
          Tl = Math.ceil,
          Al = w.ReactCurrentDispatcher,
          _l = w.ReactCurrentOwner,
          Il = w.ReactCurrentBatchConfig,
          Cl = 0,
          xl = null,
          Nl = null,
          Ol = 0,
          Dl = 0,
          Pl = Ao(0),
          Rl = 0,
          Ll = null,
          Ml = 0,
          Fl = 0,
          Ul = 0,
          jl = null,
          zl = null,
          $l = 0,
          Vl = 1 / 0,
          Kl = null,
          ql = !1,
          Bl = null,
          Hl = null,
          Wl = !1,
          Gl = null,
          Ql = 0,
          Yl = 0,
          Jl = null,
          Xl = -1,
          Zl = 0;
        function eu() {
          return 0 !== (6 & Cl) ? Je() : -1 !== Xl ? Xl : (Xl = Je());
        }
        function tu(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & Cl) && 0 !== Ol
            ? Ol & -Ol
            : null !== vi.transition
            ? (0 === Zl && (Zl = mt()), Zl)
            : 0 !== (e = bt)
            ? e
            : (e = void 0 === (e = window.event) ? 16 : Yt(e.type));
        }
        function nu(e, t, n, r) {
          if (50 < Yl) throw ((Yl = 0), (Jl = null), Error(i(185)));
          yt(e, n, r),
            (0 !== (2 & Cl) && e === xl) ||
              (e === xl && (0 === (2 & Cl) && (Fl |= n), 4 === Rl && su(e, Ol)),
              ru(e, r),
              1 === n &&
                0 === Cl &&
                0 === (1 & t.mode) &&
                ((Vl = Je() + 500), zo && Ko()));
        }
        function ru(e, t) {
          var n = e.callbackNode;
          !(function (e, t) {
            for (
              var n = e.suspendedLanes,
                r = e.pingedLanes,
                o = e.expirationTimes,
                i = e.pendingLanes;
              0 < i;

            ) {
              var a = 31 - at(i),
                s = 1 << a,
                l = o[a];
              -1 === l
                ? (0 !== (s & n) && 0 === (s & r)) || (o[a] = pt(s, t))
                : l <= t && (e.expiredLanes |= s),
                (i &= ~s);
            }
          })(e, t);
          var r = ft(e, e === xl ? Ol : 0);
          if (0 === r)
            null !== n && Ge(n),
              (e.callbackNode = null),
              (e.callbackPriority = 0);
          else if (((t = r & -r), e.callbackPriority !== t)) {
            if ((null != n && Ge(n), 1 === t))
              0 === e.tag
                ? (function (e) {
                    (zo = !0), Vo(e);
                  })(lu.bind(null, e))
                : Vo(lu.bind(null, e)),
                ao(function () {
                  0 === (6 & Cl) && Ko();
                }),
                (n = null);
            else {
              switch (wt(r)) {
                case 1:
                  n = Ze;
                  break;
                case 4:
                  n = et;
                  break;
                case 16:
                default:
                  n = tt;
                  break;
                case 536870912:
                  n = rt;
              }
              n = xu(n, ou.bind(null, e));
            }
            (e.callbackPriority = t), (e.callbackNode = n);
          }
        }
        function ou(e, t) {
          if (((Xl = -1), (Zl = 0), 0 !== (6 & Cl))) throw Error(i(327));
          var n = e.callbackNode;
          if (ku() && e.callbackNode !== n) return null;
          var r = ft(e, e === xl ? Ol : 0);
          if (0 === r) return null;
          if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = vu(e, r);
          else {
            t = r;
            var o = Cl;
            Cl |= 2;
            var a = hu();
            for (
              (xl === e && Ol === t) ||
              ((Kl = null), (Vl = Je() + 500), fu(e, t));
              ;

            )
              try {
                gu();
                break;
              } catch (l) {
                pu(e, l);
              }
            Ii(),
              (Al.current = a),
              (Cl = o),
              null !== Nl ? (t = 0) : ((xl = null), (Ol = 0), (t = Rl));
          }
          if (0 !== t) {
            if (
              (2 === t && 0 !== (o = ht(e)) && ((r = o), (t = iu(e, o))),
              1 === t)
            )
              throw ((n = Ll), fu(e, 0), su(e, r), ru(e, Je()), n);
            if (6 === t) su(e, r);
            else {
              if (
                ((o = e.current.alternate),
                0 === (30 & r) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var n = t.updateQueue;
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var o = n[r],
                              i = o.getSnapshot;
                            o = o.value;
                            try {
                              if (!sr(i(), o)) return !1;
                            } catch (s) {
                              return !1;
                            }
                          }
                      }
                      if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                        (n.return = t), (t = n);
                      else {
                        if (t === e) break;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0;
                          t = t.return;
                        }
                        (t.sibling.return = t.return), (t = t.sibling);
                      }
                    }
                    return !0;
                  })(o) &&
                  (2 === (t = vu(e, r)) &&
                    0 !== (a = ht(e)) &&
                    ((r = a), (t = iu(e, a))),
                  1 === t))
              )
                throw ((n = Ll), fu(e, 0), su(e, r), ru(e, Je()), n);
              switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                  throw Error(i(345));
                case 2:
                case 5:
                  Su(e, zl, Kl);
                  break;
                case 3:
                  if (
                    (su(e, r),
                    (130023424 & r) === r && 10 < (t = $l + 500 - Je()))
                  ) {
                    if (0 !== ft(e, 0)) break;
                    if (((o = e.suspendedLanes) & r) !== r) {
                      eu(), (e.pingedLanes |= e.suspendedLanes & o);
                      break;
                    }
                    e.timeoutHandle = ro(Su.bind(null, e, zl, Kl), t);
                    break;
                  }
                  Su(e, zl, Kl);
                  break;
                case 4:
                  if ((su(e, r), (4194240 & r) === r)) break;
                  for (t = e.eventTimes, o = -1; 0 < r; ) {
                    var s = 31 - at(r);
                    (a = 1 << s), (s = t[s]) > o && (o = s), (r &= ~a);
                  }
                  if (
                    ((r = o),
                    10 <
                      (r =
                        (120 > (r = Je() - r)
                          ? 120
                          : 480 > r
                          ? 480
                          : 1080 > r
                          ? 1080
                          : 1920 > r
                          ? 1920
                          : 3e3 > r
                          ? 3e3
                          : 4320 > r
                          ? 4320
                          : 1960 * Tl(r / 1960)) - r))
                  ) {
                    e.timeoutHandle = ro(Su.bind(null, e, zl, Kl), r);
                    break;
                  }
                  Su(e, zl, Kl);
                  break;
                default:
                  throw Error(i(329));
              }
            }
          }
          return ru(e, Je()), e.callbackNode === n ? ou.bind(null, e) : null;
        }
        function iu(e, t) {
          var n = jl;
          return (
            e.current.memoizedState.isDehydrated && (fu(e, t).flags |= 256),
            2 !== (e = vu(e, t)) && ((t = zl), (zl = n), null !== t && au(t)),
            e
          );
        }
        function au(e) {
          null === zl ? (zl = e) : zl.push.apply(zl, e);
        }
        function su(e, t) {
          for (
            t &= ~Ul,
              t &= ~Fl,
              e.suspendedLanes |= t,
              e.pingedLanes &= ~t,
              e = e.expirationTimes;
            0 < t;

          ) {
            var n = 31 - at(t),
              r = 1 << n;
            (e[n] = -1), (t &= ~r);
          }
        }
        function lu(e) {
          if (0 !== (6 & Cl)) throw Error(i(327));
          ku();
          var t = ft(e, 0);
          if (0 === (1 & t)) return ru(e, Je()), null;
          var n = vu(e, t);
          if (0 !== e.tag && 2 === n) {
            var r = ht(e);
            0 !== r && ((t = r), (n = iu(e, r)));
          }
          if (1 === n) throw ((n = Ll), fu(e, 0), su(e, t), ru(e, Je()), n);
          if (6 === n) throw Error(i(345));
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            Su(e, zl, Kl),
            ru(e, Je()),
            null
          );
        }
        function uu(e, t) {
          var n = Cl;
          Cl |= 1;
          try {
            return e(t);
          } finally {
            0 === (Cl = n) && ((Vl = Je() + 500), zo && Ko());
          }
        }
        function cu(e) {
          null !== Gl && 0 === Gl.tag && 0 === (6 & Cl) && ku();
          var t = Cl;
          Cl |= 1;
          var n = Il.transition,
            r = bt;
          try {
            if (((Il.transition = null), (bt = 1), e)) return e();
          } finally {
            (bt = r), (Il.transition = n), 0 === (6 & (Cl = t)) && Ko();
          }
        }
        function du() {
          (Dl = Pl.current), _o(Pl);
        }
        function fu(e, t) {
          (e.finishedWork = null), (e.finishedLanes = 0);
          var n = e.timeoutHandle;
          if ((-1 !== n && ((e.timeoutHandle = -1), oo(n)), null !== Nl))
            for (n = Nl.return; null !== n; ) {
              var r = n;
              switch ((ni(r), r.tag)) {
                case 1:
                  null !== (r = r.type.childContextTypes) &&
                    void 0 !== r &&
                    Ro();
                  break;
                case 3:
                  Ji(), _o(No), _o(xo), ra();
                  break;
                case 5:
                  Zi(r);
                  break;
                case 4:
                  Ji();
                  break;
                case 13:
                case 19:
                  _o(ea);
                  break;
                case 10:
                  Ci(r.type._context);
                  break;
                case 22:
                case 23:
                  du();
              }
              n = n.return;
            }
          if (
            ((xl = e),
            (Nl = e = Pu(e.current, null)),
            (Ol = Dl = t),
            (Rl = 0),
            (Ll = null),
            (Ul = Fl = Ml = 0),
            (zl = jl = null),
            null !== Di)
          ) {
            for (t = 0; t < Di.length; t++)
              if (null !== (r = (n = Di[t]).interleaved)) {
                n.interleaved = null;
                var o = r.next,
                  i = n.pending;
                if (null !== i) {
                  var a = i.next;
                  (i.next = o), (r.next = a);
                }
                n.pending = r;
              }
            Di = null;
          }
          return e;
        }
        function pu(e, t) {
          for (;;) {
            var n = Nl;
            try {
              if ((Ii(), (oa.current = Xa), ca)) {
                for (var r = sa.memoizedState; null !== r; ) {
                  var o = r.queue;
                  null !== o && (o.pending = null), (r = r.next);
                }
                ca = !1;
              }
              if (
                ((aa = 0),
                (ua = la = sa = null),
                (da = !1),
                (fa = 0),
                (_l.current = null),
                null === n || null === n.return)
              ) {
                (Rl = 1), (Ll = t), (Nl = null);
                break;
              }
              e: {
                var a = e,
                  s = n.return,
                  l = n,
                  u = t;
                if (
                  ((t = Ol),
                  (l.flags |= 32768),
                  null !== u &&
                    "object" === typeof u &&
                    "function" === typeof u.then)
                ) {
                  var c = u,
                    d = l,
                    f = d.tag;
                  if (0 === (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                    var p = d.alternate;
                    p
                      ? ((d.updateQueue = p.updateQueue),
                        (d.memoizedState = p.memoizedState),
                        (d.lanes = p.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null));
                  }
                  var h = vs(s);
                  if (null !== h) {
                    (h.flags &= -257),
                      ys(h, s, l, 0, t),
                      1 & h.mode && ms(a, c, t),
                      (u = c);
                    var m = (t = h).updateQueue;
                    if (null === m) {
                      var v = new Set();
                      v.add(u), (t.updateQueue = v);
                    } else m.add(u);
                    break e;
                  }
                  if (0 === (1 & t)) {
                    ms(a, c, t), mu();
                    break e;
                  }
                  u = Error(i(426));
                } else if (ii && 1 & l.mode) {
                  var y = vs(s);
                  if (null !== y) {
                    0 === (65536 & y.flags) && (y.flags |= 256),
                      ys(y, s, l, 0, t),
                      mi(us(u, l));
                    break e;
                  }
                }
                (a = u = us(u, l)),
                  4 !== Rl && (Rl = 2),
                  null === jl ? (jl = [a]) : jl.push(a),
                  (a = s);
                do {
                  switch (a.tag) {
                    case 3:
                      (a.flags |= 65536),
                        (t &= -t),
                        (a.lanes |= t),
                        Vi(a, ps(0, u, t));
                      break e;
                    case 1:
                      l = u;
                      var g = a.type,
                        b = a.stateNode;
                      if (
                        0 === (128 & a.flags) &&
                        ("function" === typeof g.getDerivedStateFromError ||
                          (null !== b &&
                            "function" === typeof b.componentDidCatch &&
                            (null === Hl || !Hl.has(b))))
                      ) {
                        (a.flags |= 65536),
                          (t &= -t),
                          (a.lanes |= t),
                          Vi(a, hs(a, l, t));
                        break e;
                      }
                  }
                  a = a.return;
                } while (null !== a);
              }
              wu(n);
            } catch (w) {
              (t = w), Nl === n && null !== n && (Nl = n = n.return);
              continue;
            }
            break;
          }
        }
        function hu() {
          var e = Al.current;
          return (Al.current = Xa), null === e ? Xa : e;
        }
        function mu() {
          (0 !== Rl && 3 !== Rl && 2 !== Rl) || (Rl = 4),
            null === xl ||
              (0 === (268435455 & Ml) && 0 === (268435455 & Fl)) ||
              su(xl, Ol);
        }
        function vu(e, t) {
          var n = Cl;
          Cl |= 2;
          var r = hu();
          for ((xl === e && Ol === t) || ((Kl = null), fu(e, t)); ; )
            try {
              yu();
              break;
            } catch (o) {
              pu(e, o);
            }
          if ((Ii(), (Cl = n), (Al.current = r), null !== Nl))
            throw Error(i(261));
          return (xl = null), (Ol = 0), Rl;
        }
        function yu() {
          for (; null !== Nl; ) bu(Nl);
        }
        function gu() {
          for (; null !== Nl && !Qe(); ) bu(Nl);
        }
        function bu(e) {
          var t = El(e.alternate, e, Dl);
          (e.memoizedProps = e.pendingProps),
            null === t ? wu(e) : (Nl = t),
            (_l.current = null);
        }
        function wu(e) {
          var t = e;
          do {
            var n = t.alternate;
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (n = Ws(n, t, Dl))) return void (Nl = n);
            } else {
              if (null !== (n = Gs(n, t)))
                return (n.flags &= 32767), void (Nl = n);
              if (null === e) return (Rl = 6), void (Nl = null);
              (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            }
            if (null !== (t = t.sibling)) return void (Nl = t);
            Nl = t = e;
          } while (null !== t);
          0 === Rl && (Rl = 5);
        }
        function Su(e, t, n) {
          var r = bt,
            o = Il.transition;
          try {
            (Il.transition = null),
              (bt = 1),
              (function (e, t, n, r) {
                do {
                  ku();
                } while (null !== Gl);
                if (0 !== (6 & Cl)) throw Error(i(327));
                n = e.finishedWork;
                var o = e.finishedLanes;
                if (null === n) return null;
                if (
                  ((e.finishedWork = null),
                  (e.finishedLanes = 0),
                  n === e.current)
                )
                  throw Error(i(177));
                (e.callbackNode = null), (e.callbackPriority = 0);
                var a = n.lanes | n.childLanes;
                if (
                  ((function (e, t) {
                    var n = e.pendingLanes & ~t;
                    (e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements);
                    var r = e.eventTimes;
                    for (e = e.expirationTimes; 0 < n; ) {
                      var o = 31 - at(n),
                        i = 1 << o;
                      (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
                    }
                  })(e, a),
                  e === xl && ((Nl = xl = null), (Ol = 0)),
                  (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                    Wl ||
                    ((Wl = !0),
                    xu(tt, function () {
                      return ku(), null;
                    })),
                  (a = 0 !== (15990 & n.flags)),
                  0 !== (15990 & n.subtreeFlags) || a)
                ) {
                  (a = Il.transition), (Il.transition = null);
                  var s = bt;
                  bt = 1;
                  var l = Cl;
                  (Cl |= 4),
                    (_l.current = null),
                    (function (e, t) {
                      if (((eo = qt), pr((e = fr())))) {
                        if ("selectionStart" in e)
                          var n = {
                            start: e.selectionStart,
                            end: e.selectionEnd,
                          };
                        else
                          e: {
                            var r =
                              (n =
                                ((n = e.ownerDocument) && n.defaultView) ||
                                window).getSelection && n.getSelection();
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode;
                              var o = r.anchorOffset,
                                a = r.focusNode;
                              r = r.focusOffset;
                              try {
                                n.nodeType, a.nodeType;
                              } catch (S) {
                                n = null;
                                break e;
                              }
                              var s = 0,
                                l = -1,
                                u = -1,
                                c = 0,
                                d = 0,
                                f = e,
                                p = null;
                              t: for (;;) {
                                for (
                                  var h;
                                  f !== n ||
                                    (0 !== o && 3 !== f.nodeType) ||
                                    (l = s + o),
                                    f !== a ||
                                      (0 !== r && 3 !== f.nodeType) ||
                                      (u = s + r),
                                    3 === f.nodeType &&
                                      (s += f.nodeValue.length),
                                    null !== (h = f.firstChild);

                                )
                                  (p = f), (f = h);
                                for (;;) {
                                  if (f === e) break t;
                                  if (
                                    (p === n && ++c === o && (l = s),
                                    p === a && ++d === r && (u = s),
                                    null !== (h = f.nextSibling))
                                  )
                                    break;
                                  p = (f = p).parentNode;
                                }
                                f = h;
                              }
                              n =
                                -1 === l || -1 === u
                                  ? null
                                  : { start: l, end: u };
                            } else n = null;
                          }
                        n = n || { start: 0, end: 0 };
                      } else n = null;
                      for (
                        to = { focusedElem: e, selectionRange: n },
                          qt = !1,
                          Xs = t;
                        null !== Xs;

                      )
                        if (
                          ((e = (t = Xs).child),
                          0 !== (1028 & t.subtreeFlags) && null !== e)
                        )
                          (e.return = t), (Xs = e);
                        else
                          for (; null !== Xs; ) {
                            t = Xs;
                            try {
                              var m = t.alternate;
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break;
                                  case 1:
                                    if (null !== m) {
                                      var v = m.memoizedProps,
                                        y = m.memoizedState,
                                        g = t.stateNode,
                                        b = g.getSnapshotBeforeUpdate(
                                          t.elementType === t.type
                                            ? v
                                            : ns(t.type, v),
                                          y
                                        );
                                      g.__reactInternalSnapshotBeforeUpdate = b;
                                    }
                                    break;
                                  case 3:
                                    var w = t.stateNode.containerInfo;
                                    1 === w.nodeType
                                      ? (w.textContent = "")
                                      : 9 === w.nodeType &&
                                        w.documentElement &&
                                        w.removeChild(w.documentElement);
                                    break;
                                  default:
                                    throw Error(i(163));
                                }
                            } catch (S) {
                              Tu(t, t.return, S);
                            }
                            if (null !== (e = t.sibling)) {
                              (e.return = t.return), (Xs = e);
                              break;
                            }
                            Xs = t.return;
                          }
                      (m = tl), (tl = !1);
                    })(e, n),
                    vl(n, e),
                    hr(to),
                    (qt = !!eo),
                    (to = eo = null),
                    (e.current = n),
                    gl(n, e, o),
                    Ye(),
                    (Cl = l),
                    (bt = s),
                    (Il.transition = a);
                } else e.current = n;
                if (
                  (Wl && ((Wl = !1), (Gl = e), (Ql = o)),
                  (a = e.pendingLanes),
                  0 === a && (Hl = null),
                  (function (e) {
                    if (it && "function" === typeof it.onCommitFiberRoot)
                      try {
                        it.onCommitFiberRoot(
                          ot,
                          e,
                          void 0,
                          128 === (128 & e.current.flags)
                        );
                      } catch (t) {}
                  })(n.stateNode),
                  ru(e, Je()),
                  null !== t)
                )
                  for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                    (o = t[n]),
                      r(o.value, { componentStack: o.stack, digest: o.digest });
                if (ql) throw ((ql = !1), (e = Bl), (Bl = null), e);
                0 !== (1 & Ql) && 0 !== e.tag && ku(),
                  (a = e.pendingLanes),
                  0 !== (1 & a)
                    ? e === Jl
                      ? Yl++
                      : ((Yl = 0), (Jl = e))
                    : (Yl = 0),
                  Ko();
              })(e, t, n, r);
          } finally {
            (Il.transition = o), (bt = r);
          }
          return null;
        }
        function ku() {
          if (null !== Gl) {
            var e = wt(Ql),
              t = Il.transition,
              n = bt;
            try {
              if (((Il.transition = null), (bt = 16 > e ? 16 : e), null === Gl))
                var r = !1;
              else {
                if (((e = Gl), (Gl = null), (Ql = 0), 0 !== (6 & Cl)))
                  throw Error(i(331));
                var o = Cl;
                for (Cl |= 4, Xs = e.current; null !== Xs; ) {
                  var a = Xs,
                    s = a.child;
                  if (0 !== (16 & Xs.flags)) {
                    var l = a.deletions;
                    if (null !== l) {
                      for (var u = 0; u < l.length; u++) {
                        var c = l[u];
                        for (Xs = c; null !== Xs; ) {
                          var d = Xs;
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              nl(8, d, a);
                          }
                          var f = d.child;
                          if (null !== f) (f.return = d), (Xs = f);
                          else
                            for (; null !== Xs; ) {
                              var p = (d = Xs).sibling,
                                h = d.return;
                              if ((il(d), d === c)) {
                                Xs = null;
                                break;
                              }
                              if (null !== p) {
                                (p.return = h), (Xs = p);
                                break;
                              }
                              Xs = h;
                            }
                        }
                      }
                      var m = a.alternate;
                      if (null !== m) {
                        var v = m.child;
                        if (null !== v) {
                          m.child = null;
                          do {
                            var y = v.sibling;
                            (v.sibling = null), (v = y);
                          } while (null !== v);
                        }
                      }
                      Xs = a;
                    }
                  }
                  if (0 !== (2064 & a.subtreeFlags) && null !== s)
                    (s.return = a), (Xs = s);
                  else
                    e: for (; null !== Xs; ) {
                      if (0 !== (2048 & (a = Xs).flags))
                        switch (a.tag) {
                          case 0:
                          case 11:
                          case 15:
                            nl(9, a, a.return);
                        }
                      var g = a.sibling;
                      if (null !== g) {
                        (g.return = a.return), (Xs = g);
                        break e;
                      }
                      Xs = a.return;
                    }
                }
                var b = e.current;
                for (Xs = b; null !== Xs; ) {
                  var w = (s = Xs).child;
                  if (0 !== (2064 & s.subtreeFlags) && null !== w)
                    (w.return = s), (Xs = w);
                  else
                    e: for (s = b; null !== Xs; ) {
                      if (0 !== (2048 & (l = Xs).flags))
                        try {
                          switch (l.tag) {
                            case 0:
                            case 11:
                            case 15:
                              rl(9, l);
                          }
                        } catch (k) {
                          Tu(l, l.return, k);
                        }
                      if (l === s) {
                        Xs = null;
                        break e;
                      }
                      var S = l.sibling;
                      if (null !== S) {
                        (S.return = l.return), (Xs = S);
                        break e;
                      }
                      Xs = l.return;
                    }
                }
                if (
                  ((Cl = o),
                  Ko(),
                  it && "function" === typeof it.onPostCommitFiberRoot)
                )
                  try {
                    it.onPostCommitFiberRoot(ot, e);
                  } catch (k) {}
                r = !0;
              }
              return r;
            } finally {
              (bt = n), (Il.transition = t);
            }
          }
          return !1;
        }
        function Eu(e, t, n) {
          (e = zi(e, (t = ps(0, (t = us(n, t)), 1)), 1)),
            (t = eu()),
            null !== e && (yt(e, 1, t), ru(e, t));
        }
        function Tu(e, t, n) {
          if (3 === e.tag) Eu(e, e, n);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                Eu(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if (
                  "function" === typeof t.type.getDerivedStateFromError ||
                  ("function" === typeof r.componentDidCatch &&
                    (null === Hl || !Hl.has(r)))
                ) {
                  (t = zi(t, (e = hs(t, (e = us(n, e)), 1)), 1)),
                    (e = eu()),
                    null !== t && (yt(t, 1, e), ru(t, e));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Au(e, t, n) {
          var r = e.pingCache;
          null !== r && r.delete(t),
            (t = eu()),
            (e.pingedLanes |= e.suspendedLanes & n),
            xl === e &&
              (Ol & n) === n &&
              (4 === Rl ||
              (3 === Rl && (130023424 & Ol) === Ol && 500 > Je() - $l)
                ? fu(e, 0)
                : (Ul |= n)),
            ru(e, t);
        }
        function _u(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = ct), 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
          var n = eu();
          null !== (e = Li(e, t)) && (yt(e, t, n), ru(e, n));
        }
        function Iu(e) {
          var t = e.memoizedState,
            n = 0;
          null !== t && (n = t.retryLane), _u(e, n);
        }
        function Cu(e, t) {
          var n = 0;
          switch (e.tag) {
            case 13:
              var r = e.stateNode,
                o = e.memoizedState;
              null !== o && (n = o.retryLane);
              break;
            case 19:
              r = e.stateNode;
              break;
            default:
              throw Error(i(314));
          }
          null !== r && r.delete(t), _u(e, n);
        }
        function xu(e, t) {
          return We(e, t);
        }
        function Nu(e, t, n, r) {
          (this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null);
        }
        function Ou(e, t, n, r) {
          return new Nu(e, t, n, r);
        }
        function Du(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function Pu(e, t) {
          var n = e.alternate;
          return (
            null === n
              ? (((n = Ou(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            n
          );
        }
        function Ru(e, t, n, r, o, a) {
          var s = 2;
          if (((r = e), "function" === typeof e)) Du(e) && (s = 1);
          else if ("string" === typeof e) s = 5;
          else
            e: switch (e) {
              case E:
                return Lu(n.children, o, a, t);
              case T:
                (s = 8), (o |= 8);
                break;
              case A:
                return (
                  ((e = Ou(12, n, t, 2 | o)).elementType = A), (e.lanes = a), e
                );
              case x:
                return (
                  ((e = Ou(13, n, t, o)).elementType = x), (e.lanes = a), e
                );
              case N:
                return (
                  ((e = Ou(19, n, t, o)).elementType = N), (e.lanes = a), e
                );
              case P:
                return Mu(n, o, a, t);
              default:
                if ("object" === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case _:
                      s = 10;
                      break e;
                    case I:
                      s = 9;
                      break e;
                    case C:
                      s = 11;
                      break e;
                    case O:
                      s = 14;
                      break e;
                    case D:
                      (s = 16), (r = null);
                      break e;
                  }
                throw Error(i(130, null == e ? e : typeof e, ""));
            }
          return (
            ((t = Ou(s, n, t, o)).elementType = e),
            (t.type = r),
            (t.lanes = a),
            t
          );
        }
        function Lu(e, t, n, r) {
          return ((e = Ou(7, e, r, t)).lanes = n), e;
        }
        function Mu(e, t, n, r) {
          return (
            ((e = Ou(22, e, r, t)).elementType = P),
            (e.lanes = n),
            (e.stateNode = { isHidden: !1 }),
            e
          );
        }
        function Fu(e, t, n) {
          return ((e = Ou(6, e, null, t)).lanes = n), e;
        }
        function Uu(e, t, n) {
          return (
            ((t = Ou(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        function ju(e, t, n, r, o) {
          (this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = vt(0)),
            (this.expirationTimes = vt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = vt(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = o),
            (this.mutableSourceEagerHydrationData = null);
        }
        function zu(e, t, n, r, o, i, a, s, l) {
          return (
            (e = new ju(e, t, n, s, l)),
            1 === t ? ((t = 1), !0 === i && (t |= 8)) : (t = 0),
            (i = Ou(3, null, null, t)),
            (e.current = i),
            (i.stateNode = e),
            (i.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Fi(i),
            e
          );
        }
        function $u(e) {
          if (!e) return Co;
          e: {
            if (Ve((e = e._reactInternals)) !== e || 1 !== e.tag)
              throw Error(i(170));
            var t = e;
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context;
                  break e;
                case 1:
                  if (Po(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e;
                  }
              }
              t = t.return;
            } while (null !== t);
            throw Error(i(171));
          }
          if (1 === e.tag) {
            var n = e.type;
            if (Po(n)) return Mo(e, n, t);
          }
          return t;
        }
        function Vu(e, t, n, r, o, i, a, s, l) {
          return (
            ((e = zu(n, r, !0, e, 0, i, 0, s, l)).context = $u(null)),
            (n = e.current),
            ((i = ji((r = eu()), (o = tu(n)))).callback =
              void 0 !== t && null !== t ? t : null),
            zi(n, i, o),
            (e.current.lanes = o),
            yt(e, o, r),
            ru(e, r),
            e
          );
        }
        function Ku(e, t, n, r) {
          var o = t.current,
            i = eu(),
            a = tu(o);
          return (
            (n = $u(n)),
            null === t.context ? (t.context = n) : (t.pendingContext = n),
            ((t = ji(i, a)).payload = { element: e }),
            null !== (r = void 0 === r ? null : r) && (t.callback = r),
            null !== (e = zi(o, t, a)) && (nu(e, o, a, i), $i(e, o, a)),
            a
          );
        }
        function qu(e) {
          return (e = e.current).child
            ? (e.child.tag, e.child.stateNode)
            : null;
        }
        function Bu(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane;
            e.retryLane = 0 !== n && n < t ? n : t;
          }
        }
        function Hu(e, t) {
          Bu(e, t), (e = e.alternate) && Bu(e, t);
        }
        El = function (e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || No.current) bs = !0;
            else {
              if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                return (
                  (bs = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        xs(t), hi();
                        break;
                      case 5:
                        Xi(t);
                        break;
                      case 1:
                        Po(t.type) && Fo(t);
                        break;
                      case 4:
                        Yi(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        var r = t.type._context,
                          o = t.memoizedProps.value;
                        Io(Ei, r._currentValue), (r._currentValue = o);
                        break;
                      case 13:
                        if (null !== (r = t.memoizedState))
                          return null !== r.dehydrated
                            ? (Io(ea, 1 & ea.current), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                            ? Fs(e, t, n)
                            : (Io(ea, 1 & ea.current),
                              null !== (e = qs(e, t, n)) ? e.sibling : null);
                        Io(ea, 1 & ea.current);
                        break;
                      case 19:
                        if (
                          ((r = 0 !== (n & t.childLanes)),
                          0 !== (128 & e.flags))
                        ) {
                          if (r) return Vs(e, t, n);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (o = t.memoizedState) &&
                            ((o.rendering = null),
                            (o.tail = null),
                            (o.lastEffect = null)),
                          Io(ea, ea.current),
                          r)
                        )
                          break;
                        return null;
                      case 22:
                      case 23:
                        return (t.lanes = 0), Ts(e, t, n);
                    }
                    return qs(e, t, n);
                  })(e, t, n)
                );
              bs = 0 !== (131072 & e.flags);
            }
          else (bs = !1), ii && 0 !== (1048576 & t.flags) && ei(t, Wo, t.index);
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var r = t.type;
              Ks(e, t), (e = t.pendingProps);
              var o = Do(t, xo.current);
              Ni(t, n), (o = va(null, t, r, e, o, n));
              var a = ya();
              return (
                (t.flags |= 1),
                "object" === typeof o &&
                null !== o &&
                "function" === typeof o.render &&
                void 0 === o.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    Po(r) ? ((a = !0), Fo(t)) : (a = !1),
                    (t.memoizedState =
                      null !== o.state && void 0 !== o.state ? o.state : null),
                    Fi(t),
                    (o.updater = os),
                    (t.stateNode = o),
                    (o._reactInternals = t),
                    ls(t, r, e, n),
                    (t = Cs(null, t, r, !0, a, n)))
                  : ((t.tag = 0),
                    ii && a && ti(t),
                    ws(null, t, o, n),
                    (t = t.child)),
                t
              );
            case 16:
              r = t.elementType;
              e: {
                switch (
                  (Ks(e, t),
                  (e = t.pendingProps),
                  (r = (o = r._init)(r._payload)),
                  (t.type = r),
                  (o = t.tag =
                    (function (e) {
                      if ("function" === typeof e) return Du(e) ? 1 : 0;
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === C) return 11;
                        if (e === O) return 14;
                      }
                      return 2;
                    })(r)),
                  (e = ns(r, e)),
                  o)
                ) {
                  case 0:
                    t = _s(null, t, r, e, n);
                    break e;
                  case 1:
                    t = Is(null, t, r, e, n);
                    break e;
                  case 11:
                    t = Ss(null, t, r, e, n);
                    break e;
                  case 14:
                    t = ks(null, t, r, ns(r.type, e), n);
                    break e;
                }
                throw Error(i(306, r, ""));
              }
              return t;
            case 0:
              return (
                (r = t.type),
                (o = t.pendingProps),
                _s(e, t, r, (o = t.elementType === r ? o : ns(r, o)), n)
              );
            case 1:
              return (
                (r = t.type),
                (o = t.pendingProps),
                Is(e, t, r, (o = t.elementType === r ? o : ns(r, o)), n)
              );
            case 3:
              e: {
                if ((xs(t), null === e)) throw Error(i(387));
                (r = t.pendingProps),
                  (o = (a = t.memoizedState).element),
                  Ui(e, t),
                  Ki(t, r, null, n);
                var s = t.memoizedState;
                if (((r = s.element), a.isDehydrated)) {
                  if (
                    ((a = {
                      element: r,
                      isDehydrated: !1,
                      cache: s.cache,
                      pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                      transitions: s.transitions,
                    }),
                    (t.updateQueue.baseState = a),
                    (t.memoizedState = a),
                    256 & t.flags)
                  ) {
                    t = Ns(e, t, r, n, (o = us(Error(i(423)), t)));
                    break e;
                  }
                  if (r !== o) {
                    t = Ns(e, t, r, n, (o = us(Error(i(424)), t)));
                    break e;
                  }
                  for (
                    oi = uo(t.stateNode.containerInfo.firstChild),
                      ri = t,
                      ii = !0,
                      ai = null,
                      n = ki(t, null, r, n),
                      t.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
                } else {
                  if ((hi(), r === o)) {
                    t = qs(e, t, n);
                    break e;
                  }
                  ws(e, t, r, n);
                }
                t = t.child;
              }
              return t;
            case 5:
              return (
                Xi(t),
                null === e && ci(t),
                (r = t.type),
                (o = t.pendingProps),
                (a = null !== e ? e.memoizedProps : null),
                (s = o.children),
                no(r, o)
                  ? (s = null)
                  : null !== a && no(r, a) && (t.flags |= 32),
                As(e, t),
                ws(e, t, s, n),
                t.child
              );
            case 6:
              return null === e && ci(t), null;
            case 13:
              return Fs(e, t, n);
            case 4:
              return (
                Yi(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = Si(t, null, r, n)) : ws(e, t, r, n),
                t.child
              );
            case 11:
              return (
                (r = t.type),
                (o = t.pendingProps),
                Ss(e, t, r, (o = t.elementType === r ? o : ns(r, o)), n)
              );
            case 7:
              return ws(e, t, t.pendingProps, n), t.child;
            case 8:
            case 12:
              return ws(e, t, t.pendingProps.children, n), t.child;
            case 10:
              e: {
                if (
                  ((r = t.type._context),
                  (o = t.pendingProps),
                  (a = t.memoizedProps),
                  (s = o.value),
                  Io(Ei, r._currentValue),
                  (r._currentValue = s),
                  null !== a)
                )
                  if (sr(a.value, s)) {
                    if (a.children === o.children && !No.current) {
                      t = qs(e, t, n);
                      break e;
                    }
                  } else
                    for (
                      null !== (a = t.child) && (a.return = t);
                      null !== a;

                    ) {
                      var l = a.dependencies;
                      if (null !== l) {
                        s = a.child;
                        for (var u = l.firstContext; null !== u; ) {
                          if (u.context === r) {
                            if (1 === a.tag) {
                              (u = ji(-1, n & -n)).tag = 2;
                              var c = a.updateQueue;
                              if (null !== c) {
                                var d = (c = c.shared).pending;
                                null === d
                                  ? (u.next = u)
                                  : ((u.next = d.next), (d.next = u)),
                                  (c.pending = u);
                              }
                            }
                            (a.lanes |= n),
                              null !== (u = a.alternate) && (u.lanes |= n),
                              xi(a.return, n, t),
                              (l.lanes |= n);
                            break;
                          }
                          u = u.next;
                        }
                      } else if (10 === a.tag)
                        s = a.type === t.type ? null : a.child;
                      else if (18 === a.tag) {
                        if (null === (s = a.return)) throw Error(i(341));
                        (s.lanes |= n),
                          null !== (l = s.alternate) && (l.lanes |= n),
                          xi(s, n, t),
                          (s = a.sibling);
                      } else s = a.child;
                      if (null !== s) s.return = a;
                      else
                        for (s = a; null !== s; ) {
                          if (s === t) {
                            s = null;
                            break;
                          }
                          if (null !== (a = s.sibling)) {
                            (a.return = s.return), (s = a);
                            break;
                          }
                          s = s.return;
                        }
                      a = s;
                    }
                ws(e, t, o.children, n), (t = t.child);
              }
              return t;
            case 9:
              return (
                (o = t.type),
                (r = t.pendingProps.children),
                Ni(t, n),
                (r = r((o = Oi(o)))),
                (t.flags |= 1),
                ws(e, t, r, n),
                t.child
              );
            case 14:
              return (
                (o = ns((r = t.type), t.pendingProps)),
                ks(e, t, r, (o = ns(r.type, o)), n)
              );
            case 15:
              return Es(e, t, t.type, t.pendingProps, n);
            case 17:
              return (
                (r = t.type),
                (o = t.pendingProps),
                (o = t.elementType === r ? o : ns(r, o)),
                Ks(e, t),
                (t.tag = 1),
                Po(r) ? ((e = !0), Fo(t)) : (e = !1),
                Ni(t, n),
                as(t, r, o),
                ls(t, r, o, n),
                Cs(null, t, r, !0, e, n)
              );
            case 19:
              return Vs(e, t, n);
            case 22:
              return Ts(e, t, n);
          }
          throw Error(i(156, t.tag));
        };
        var Wu =
          "function" === typeof reportError
            ? reportError
            : function (e) {
                console.error(e);
              };
        function Gu(e) {
          this._internalRoot = e;
        }
        function Qu(e) {
          this._internalRoot = e;
        }
        function Yu(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          );
        }
        function Ju(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType ||
                " react-mount-point-unstable " !== e.nodeValue))
          );
        }
        function Xu() {}
        function Zu(e, t, n, r, o) {
          var i = n._reactRootContainer;
          if (i) {
            var a = i;
            if ("function" === typeof o) {
              var s = o;
              o = function () {
                var e = qu(a);
                s.call(e);
              };
            }
            Ku(t, a, e, o);
          } else
            a = (function (e, t, n, r, o) {
              if (o) {
                if ("function" === typeof r) {
                  var i = r;
                  r = function () {
                    var e = qu(a);
                    i.call(e);
                  };
                }
                var a = Vu(t, r, e, 0, null, !1, 0, "", Xu);
                return (
                  (e._reactRootContainer = a),
                  (e[mo] = a.current),
                  Vr(8 === e.nodeType ? e.parentNode : e),
                  cu(),
                  a
                );
              }
              for (; (o = e.lastChild); ) e.removeChild(o);
              if ("function" === typeof r) {
                var s = r;
                r = function () {
                  var e = qu(l);
                  s.call(e);
                };
              }
              var l = zu(e, 0, !1, null, 0, !1, 0, "", Xu);
              return (
                (e._reactRootContainer = l),
                (e[mo] = l.current),
                Vr(8 === e.nodeType ? e.parentNode : e),
                cu(function () {
                  Ku(t, l, n, r);
                }),
                l
              );
            })(n, t, e, o, r);
          return qu(a);
        }
        (Qu.prototype.render = Gu.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(i(409));
            Ku(e, t, null, null);
          }),
          (Qu.prototype.unmount = Gu.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                cu(function () {
                  Ku(null, e, null, null);
                }),
                  (t[mo] = null);
              }
            }),
          (Qu.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = Tt();
              e = { blockedOn: null, target: e, priority: t };
              for (
                var n = 0;
                n < Pt.length && 0 !== t && t < Pt[n].priority;
                n++
              );
              Pt.splice(n, 0, e), 0 === n && Ft(e);
            }
          }),
          (St = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                  var n = dt(t.pendingLanes);
                  0 !== n &&
                    (gt(t, 1 | n),
                    ru(t, Je()),
                    0 === (6 & Cl) && ((Vl = Je() + 500), Ko()));
                }
                break;
              case 13:
                cu(function () {
                  var t = Li(e, 1);
                  if (null !== t) {
                    var n = eu();
                    nu(t, e, 1, n);
                  }
                }),
                  Hu(e, 1);
            }
          }),
          (kt = function (e) {
            if (13 === e.tag) {
              var t = Li(e, 134217728);
              if (null !== t) nu(t, e, 134217728, eu());
              Hu(e, 134217728);
            }
          }),
          (Et = function (e) {
            if (13 === e.tag) {
              var t = tu(e),
                n = Li(e, t);
              if (null !== n) nu(n, e, t, eu());
              Hu(e, t);
            }
          }),
          (Tt = function () {
            return bt;
          }),
          (At = function (e, t) {
            var n = bt;
            try {
              return (bt = e), t();
            } finally {
              bt = n;
            }
          }),
          (ke = function (e, t, n) {
            switch (t) {
              case "input":
                if ((X(e, n), (t = n.name), "radio" === n.type && null != t)) {
                  for (n = e; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                      var o = ko(r);
                      if (!o) throw Error(i(90));
                      W(r), X(r, o);
                    }
                  }
                }
                break;
              case "textarea":
                ie(e, n);
                break;
              case "select":
                null != (t = n.value) && ne(e, !!n.multiple, t, !1);
            }
          }),
          (Ce = uu),
          (xe = cu);
        var ec = {
            usingClientEntryPoint: !1,
            Events: [wo, So, ko, _e, Ie, uu],
          },
          tc = {
            findFiberByHostInstance: bo,
            bundleType: 0,
            version: "18.3.1",
            rendererPackageName: "react-dom",
          },
          nc = {
            bundleType: tc.bundleType,
            version: tc.version,
            rendererPackageName: tc.rendererPackageName,
            rendererConfig: tc.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: w.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = Be(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance:
              tc.findFiberByHostInstance ||
              function () {
                return null;
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
          };
        if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!rc.isDisabled && rc.supportsFiber)
            try {
              (ot = rc.inject(nc)), (it = rc);
            } catch (ce) {}
        }
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ec),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if (!Yu(t)) throw Error(i(200));
            return (function (e, t, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null;
              return {
                $$typeof: k,
                key: null == r ? null : "" + r,
                children: e,
                containerInfo: t,
                implementation: n,
              };
            })(e, t, null, n);
          }),
          (t.createRoot = function (e, t) {
            if (!Yu(e)) throw Error(i(299));
            var n = !1,
              r = "",
              o = Wu;
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (n = !0),
                void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (o = t.onRecoverableError)),
              (t = zu(e, 1, !1, null, 0, n, 0, r, o)),
              (e[mo] = t.current),
              Vr(8 === e.nodeType ? e.parentNode : e),
              new Gu(t)
            );
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternals;
            if (void 0 === t) {
              if ("function" === typeof e.render) throw Error(i(188));
              throw ((e = Object.keys(e).join(",")), Error(i(268, e)));
            }
            return (e = null === (e = Be(t)) ? null : e.stateNode);
          }),
          (t.flushSync = function (e) {
            return cu(e);
          }),
          (t.hydrate = function (e, t, n) {
            if (!Ju(t)) throw Error(i(200));
            return Zu(null, e, t, !0, n);
          }),
          (t.hydrateRoot = function (e, t, n) {
            if (!Yu(e)) throw Error(i(405));
            var r = (null != n && n.hydratedSources) || null,
              o = !1,
              a = "",
              s = Wu;
            if (
              (null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (o = !0),
                void 0 !== n.identifierPrefix && (a = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (s = n.onRecoverableError)),
              (t = Vu(t, null, e, 1, null != n ? n : null, o, 0, a, s)),
              (e[mo] = t.current),
              Vr(e),
              r)
            )
              for (e = 0; e < r.length; e++)
                (o = (o = (n = r[e])._getVersion)(n._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [n, o])
                    : t.mutableSourceEagerHydrationData.push(n, o);
            return new Qu(t);
          }),
          (t.render = function (e, t, n) {
            if (!Ju(t)) throw Error(i(200));
            return Zu(null, e, t, !1, n);
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Ju(e)) throw Error(i(40));
            return (
              !!e._reactRootContainer &&
              (cu(function () {
                Zu(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[mo] = null);
                });
              }),
              !0)
            );
          }),
          (t.unstable_batchedUpdates = uu),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
            if (!Ju(n)) throw Error(i(200));
            if (null == e || void 0 === e._reactInternals) throw Error(i(38));
            return Zu(e, t, n, !1, r);
          }),
          (t.version = "18.3.1-next-f1338f8080-20240426");
      },
      84391: (e, t, n) => {
        "use strict";
        var r = n(97950);
        (t.H = r.createRoot), r.hydrateRoot;
      },
      97950: (e, t, n) => {
        "use strict";
        !(function e() {
          if (
            "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(82730));
      },
      34612: (e, t) => {
        "use strict";
        function n(e, t) {
          var n = e.length;
          e.push(t);
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              o = e[r];
            if (!(0 < i(o, t))) break e;
            (e[r] = t), (e[n] = o), (n = r);
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0];
        }
        function o(e) {
          if (0 === e.length) return null;
          var t = e[0],
            n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, o = e.length, a = o >>> 1; r < a; ) {
              var s = 2 * (r + 1) - 1,
                l = e[s],
                u = s + 1,
                c = e[u];
              if (0 > i(l, n))
                u < o && 0 > i(c, l)
                  ? ((e[r] = c), (e[u] = n), (r = u))
                  : ((e[r] = l), (e[s] = n), (r = s));
              else {
                if (!(u < o && 0 > i(c, n))) break e;
                (e[r] = c), (e[u] = n), (r = u);
              }
            }
          }
          return t;
        }
        function i(e, t) {
          var n = e.sortIndex - t.sortIndex;
          return 0 !== n ? n : e.id - t.id;
        }
        if (
          "object" === typeof performance &&
          "function" === typeof performance.now
        ) {
          var a = performance;
          t.unstable_now = function () {
            return a.now();
          };
        } else {
          var s = Date,
            l = s.now();
          t.unstable_now = function () {
            return s.now() - l;
          };
        }
        var u = [],
          c = [],
          d = 1,
          f = null,
          p = 3,
          h = !1,
          m = !1,
          v = !1,
          y = "function" === typeof setTimeout ? setTimeout : null,
          g = "function" === typeof clearTimeout ? clearTimeout : null,
          b = "undefined" !== typeof setImmediate ? setImmediate : null;
        function w(e) {
          for (var t = r(c); null !== t; ) {
            if (null === t.callback) o(c);
            else {
              if (!(t.startTime <= e)) break;
              o(c), (t.sortIndex = t.expirationTime), n(u, t);
            }
            t = r(c);
          }
        }
        function S(e) {
          if (((v = !1), w(e), !m))
            if (null !== r(u)) (m = !0), P(k);
            else {
              var t = r(c);
              null !== t && R(S, t.startTime - e);
            }
        }
        function k(e, n) {
          (m = !1), v && ((v = !1), g(_), (_ = -1)), (h = !0);
          var i = p;
          try {
            for (
              w(n), f = r(u);
              null !== f && (!(f.expirationTime > n) || (e && !x()));

            ) {
              var a = f.callback;
              if ("function" === typeof a) {
                (f.callback = null), (p = f.priorityLevel);
                var s = a(f.expirationTime <= n);
                (n = t.unstable_now()),
                  "function" === typeof s
                    ? (f.callback = s)
                    : f === r(u) && o(u),
                  w(n);
              } else o(u);
              f = r(u);
            }
            if (null !== f) var l = !0;
            else {
              var d = r(c);
              null !== d && R(S, d.startTime - n), (l = !1);
            }
            return l;
          } finally {
            (f = null), (p = i), (h = !1);
          }
        }
        "undefined" !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        var E,
          T = !1,
          A = null,
          _ = -1,
          I = 5,
          C = -1;
        function x() {
          return !(t.unstable_now() - C < I);
        }
        function N() {
          if (null !== A) {
            var e = t.unstable_now();
            C = e;
            var n = !0;
            try {
              n = A(!0, e);
            } finally {
              n ? E() : ((T = !1), (A = null));
            }
          } else T = !1;
        }
        if ("function" === typeof b)
          E = function () {
            b(N);
          };
        else if ("undefined" !== typeof MessageChannel) {
          var O = new MessageChannel(),
            D = O.port2;
          (O.port1.onmessage = N),
            (E = function () {
              D.postMessage(null);
            });
        } else
          E = function () {
            y(N, 0);
          };
        function P(e) {
          (A = e), T || ((T = !0), E());
        }
        function R(e, n) {
          _ = y(function () {
            e(t.unstable_now());
          }, n);
        }
        (t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            m || h || ((m = !0), P(k));
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (I = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return p;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return r(u);
          }),
          (t.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = p;
            }
            var n = p;
            p = t;
            try {
              return e();
            } finally {
              p = n;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = p;
            p = e;
            try {
              return t();
            } finally {
              p = n;
            }
          }),
          (t.unstable_scheduleCallback = function (e, o, i) {
            var a = t.unstable_now();
            switch (
              ("object" === typeof i && null !== i
                ? (i = "number" === typeof (i = i.delay) && 0 < i ? a + i : a)
                : (i = a),
              e)
            ) {
              case 1:
                var s = -1;
                break;
              case 2:
                s = 250;
                break;
              case 5:
                s = 1073741823;
                break;
              case 4:
                s = 1e4;
                break;
              default:
                s = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: o,
                priorityLevel: e,
                startTime: i,
                expirationTime: (s = i + s),
                sortIndex: -1,
              }),
              i > a
                ? ((e.sortIndex = i),
                  n(c, e),
                  null === r(u) &&
                    e === r(c) &&
                    (v ? (g(_), (_ = -1)) : (v = !0), R(S, i - a)))
                : ((e.sortIndex = s), n(u, e), m || h || ((m = !0), P(k))),
              e
            );
          }),
          (t.unstable_shouldYield = x),
          (t.unstable_wrapCallback = function (e) {
            var t = p;
            return function () {
              var n = p;
              p = t;
              try {
                return e.apply(this, arguments);
              } finally {
                p = n;
              }
            };
          });
      },
      77067: (e, t, n) => {
        "use strict";
        e.exports = n(34612);
      },
      67844: (e) => {
        var t = "undefined" !== typeof Element,
          n = "function" === typeof Map,
          r = "function" === typeof Set,
          o = "function" === typeof ArrayBuffer && !!ArrayBuffer.isView;
        function i(e, a) {
          if (e === a) return !0;
          if (e && a && "object" == typeof e && "object" == typeof a) {
            if (e.constructor !== a.constructor) return !1;
            var s, l, u, c;
            if (Array.isArray(e)) {
              if ((s = e.length) != a.length) return !1;
              for (l = s; 0 !== l--; ) if (!i(e[l], a[l])) return !1;
              return !0;
            }
            if (n && e instanceof Map && a instanceof Map) {
              if (e.size !== a.size) return !1;
              for (c = e.entries(); !(l = c.next()).done; )
                if (!a.has(l.value[0])) return !1;
              for (c = e.entries(); !(l = c.next()).done; )
                if (!i(l.value[1], a.get(l.value[0]))) return !1;
              return !0;
            }
            if (r && e instanceof Set && a instanceof Set) {
              if (e.size !== a.size) return !1;
              for (c = e.entries(); !(l = c.next()).done; )
                if (!a.has(l.value[0])) return !1;
              return !0;
            }
            if (o && ArrayBuffer.isView(e) && ArrayBuffer.isView(a)) {
              if ((s = e.length) != a.length) return !1;
              for (l = s; 0 !== l--; ) if (e[l] !== a[l]) return !1;
              return !0;
            }
            if (e.constructor === RegExp)
              return e.source === a.source && e.flags === a.flags;
            if (
              e.valueOf !== Object.prototype.valueOf &&
              "function" === typeof e.valueOf &&
              "function" === typeof a.valueOf
            )
              return e.valueOf() === a.valueOf();
            if (
              e.toString !== Object.prototype.toString &&
              "function" === typeof e.toString &&
              "function" === typeof a.toString
            )
              return e.toString() === a.toString();
            if ((s = (u = Object.keys(e)).length) !== Object.keys(a).length)
              return !1;
            for (l = s; 0 !== l--; )
              if (!Object.prototype.hasOwnProperty.call(a, u[l])) return !1;
            if (t && e instanceof Element) return !1;
            for (l = s; 0 !== l--; )
              if (
                (("_owner" !== u[l] && "__v" !== u[l] && "__o" !== u[l]) ||
                  !e.$$typeof) &&
                !i(e[u[l]], a[u[l]])
              )
                return !1;
            return !0;
          }
          return e !== e && a !== a;
        }
        e.exports = function (e, t) {
          try {
            return i(e, t);
          } catch (n) {
            if ((n.message || "").match(/stack|recursion/i))
              return (
                console.warn("react-fast-compare cannot handle circular refs"),
                !1
              );
            throw n;
          }
        };
      },
      51153: (e, t, n) => {
        "use strict";
        var r = n(65043),
          o = Symbol.for("react.element"),
          i = Symbol.for("react.fragment"),
          a = Object.prototype.hasOwnProperty,
          s =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          l = { key: !0, ref: !0, __self: !0, __source: !0 };
        function u(e, t, n) {
          var r,
            i = {},
            u = null,
            c = null;
          for (r in (void 0 !== n && (u = "" + n),
          void 0 !== t.key && (u = "" + t.key),
          void 0 !== t.ref && (c = t.ref),
          t))
            a.call(t, r) && !l.hasOwnProperty(r) && (i[r] = t[r]);
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === i[r] && (i[r] = t[r]);
          return {
            $$typeof: o,
            type: e,
            key: u,
            ref: c,
            props: i,
            _owner: s.current,
          };
        }
        (t.Fragment = i), (t.jsx = u), (t.jsxs = u);
      },
      14202: (e, t) => {
        "use strict";
        var n = Symbol.for("react.element"),
          r = Symbol.for("react.portal"),
          o = Symbol.for("react.fragment"),
          i = Symbol.for("react.strict_mode"),
          a = Symbol.for("react.profiler"),
          s = Symbol.for("react.provider"),
          l = Symbol.for("react.context"),
          u = Symbol.for("react.forward_ref"),
          c = Symbol.for("react.suspense"),
          d = Symbol.for("react.memo"),
          f = Symbol.for("react.lazy"),
          p = Symbol.iterator;
        var h = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          m = Object.assign,
          v = {};
        function y(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = v),
            (this.updater = n || h);
        }
        function g() {}
        function b(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = v),
            (this.updater = n || h);
        }
        (y.prototype.isReactComponent = {}),
          (y.prototype.setState = function (e, t) {
            if ("object" !== typeof e && "function" !== typeof e && null != e)
              throw Error(
                "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
              );
            this.updater.enqueueSetState(this, e, t, "setState");
          }),
          (y.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
          }),
          (g.prototype = y.prototype);
        var w = (b.prototype = new g());
        (w.constructor = b), m(w, y.prototype), (w.isPureReactComponent = !0);
        var S = Array.isArray,
          k = Object.prototype.hasOwnProperty,
          E = { current: null },
          T = { key: !0, ref: !0, __self: !0, __source: !0 };
        function A(e, t, r) {
          var o,
            i = {},
            a = null,
            s = null;
          if (null != t)
            for (o in (void 0 !== t.ref && (s = t.ref),
            void 0 !== t.key && (a = "" + t.key),
            t))
              k.call(t, o) && !T.hasOwnProperty(o) && (i[o] = t[o]);
          var l = arguments.length - 2;
          if (1 === l) i.children = r;
          else if (1 < l) {
            for (var u = Array(l), c = 0; c < l; c++) u[c] = arguments[c + 2];
            i.children = u;
          }
          if (e && e.defaultProps)
            for (o in (l = e.defaultProps)) void 0 === i[o] && (i[o] = l[o]);
          return {
            $$typeof: n,
            type: e,
            key: a,
            ref: s,
            props: i,
            _owner: E.current,
          };
        }
        function _(e) {
          return "object" === typeof e && null !== e && e.$$typeof === n;
        }
        var I = /\/+/g;
        function C(e, t) {
          return "object" === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { "=": "=0", ":": "=2" };
                return (
                  "$" +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })("" + e.key)
            : t.toString(36);
        }
        function x(e, t, o, i, a) {
          var s = typeof e;
          ("undefined" !== s && "boolean" !== s) || (e = null);
          var l = !1;
          if (null === e) l = !0;
          else
            switch (s) {
              case "string":
              case "number":
                l = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case n:
                  case r:
                    l = !0;
                }
            }
          if (l)
            return (
              (a = a((l = e))),
              (e = "" === i ? "." + C(l, 0) : i),
              S(a)
                ? ((o = ""),
                  null != e && (o = e.replace(I, "$&/") + "/"),
                  x(a, t, o, "", function (e) {
                    return e;
                  }))
                : null != a &&
                  (_(a) &&
                    (a = (function (e, t) {
                      return {
                        $$typeof: n,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      a,
                      o +
                        (!a.key || (l && l.key === a.key)
                          ? ""
                          : ("" + a.key).replace(I, "$&/") + "/") +
                        e
                    )),
                  t.push(a)),
              1
            );
          if (((l = 0), (i = "" === i ? "." : i + ":"), S(e)))
            for (var u = 0; u < e.length; u++) {
              var c = i + C((s = e[u]), u);
              l += x(s, t, o, c, a);
            }
          else if (
            ((c = (function (e) {
              return null === e || "object" !== typeof e
                ? null
                : "function" === typeof (e = (p && e[p]) || e["@@iterator"])
                ? e
                : null;
            })(e)),
            "function" === typeof c)
          )
            for (e = c.call(e), u = 0; !(s = e.next()).done; )
              l += x((s = s.value), t, o, (c = i + C(s, u++)), a);
          else if ("object" === s)
            throw (
              ((t = String(e)),
              Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === t
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t) +
                  "). If you meant to render a collection of children, use an array instead."
              ))
            );
          return l;
        }
        function N(e, t, n) {
          if (null == e) return e;
          var r = [],
            o = 0;
          return (
            x(e, r, "", "", function (e) {
              return t.call(n, e, o++);
            }),
            r
          );
        }
        function O(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var D = { current: null },
          P = { transition: null },
          R = {
            ReactCurrentDispatcher: D,
            ReactCurrentBatchConfig: P,
            ReactCurrentOwner: E,
          };
        function L() {
          throw Error(
            "act(...) is not supported in production builds of React."
          );
        }
        (t.Children = {
          map: N,
          forEach: function (e, t, n) {
            N(
              e,
              function () {
                t.apply(this, arguments);
              },
              n
            );
          },
          count: function (e) {
            var t = 0;
            return (
              N(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              N(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!_(e))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return e;
          },
        }),
          (t.Component = y),
          (t.Fragment = o),
          (t.Profiler = a),
          (t.PureComponent = b),
          (t.StrictMode = i),
          (t.Suspense = c),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = R),
          (t.act = L),
          (t.cloneElement = function (e, t, r) {
            if (null === e || void 0 === e)
              throw Error(
                "React.cloneElement(...): The argument must be a React element, but you passed " +
                  e +
                  "."
              );
            var o = m({}, e.props),
              i = e.key,
              a = e.ref,
              s = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((a = t.ref), (s = E.current)),
                void 0 !== t.key && (i = "" + t.key),
                e.type && e.type.defaultProps)
              )
                var l = e.type.defaultProps;
              for (u in t)
                k.call(t, u) &&
                  !T.hasOwnProperty(u) &&
                  (o[u] = void 0 === t[u] && void 0 !== l ? l[u] : t[u]);
            }
            var u = arguments.length - 2;
            if (1 === u) o.children = r;
            else if (1 < u) {
              l = Array(u);
              for (var c = 0; c < u; c++) l[c] = arguments[c + 2];
              o.children = l;
            }
            return {
              $$typeof: n,
              type: e.type,
              key: i,
              ref: a,
              props: o,
              _owner: s,
            };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: l,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: s, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = A),
          (t.createFactory = function (e) {
            var t = A.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: u, render: e };
          }),
          (t.isValidElement = _),
          (t.lazy = function (e) {
            return {
              $$typeof: f,
              _payload: { _status: -1, _result: e },
              _init: O,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = P.transition;
            P.transition = {};
            try {
              e();
            } finally {
              P.transition = t;
            }
          }),
          (t.unstable_act = L),
          (t.useCallback = function (e, t) {
            return D.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return D.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return D.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return D.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return D.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return D.current.useImperativeHandle(e, t, n);
          }),
          (t.useInsertionEffect = function (e, t) {
            return D.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return D.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return D.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, n) {
            return D.current.useReducer(e, t, n);
          }),
          (t.useRef = function (e) {
            return D.current.useRef(e);
          }),
          (t.useState = function (e) {
            return D.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return D.current.useSyncExternalStore(e, t, n);
          }),
          (t.useTransition = function () {
            return D.current.useTransition();
          }),
          (t.version = "18.3.1");
      },
      65043: (e, t, n) => {
        "use strict";
        e.exports = n(14202);
      },
      70579: (e, t, n) => {
        "use strict";
        e.exports = n(51153);
      },
      17324: (e) => {
        e.exports = function (e, t, n, r) {
          var o = n ? n.call(r, e, t) : void 0;
          if (void 0 !== o) return !!o;
          if (e === t) return !0;
          if ("object" !== typeof e || !e || "object" !== typeof t || !t)
            return !1;
          var i = Object.keys(e),
            a = Object.keys(t);
          if (i.length !== a.length) return !1;
          for (
            var s = Object.prototype.hasOwnProperty.bind(t), l = 0;
            l < i.length;
            l++
          ) {
            var u = i[l];
            if (!s(u)) return !1;
            var c = e[u],
              d = t[u];
            if (
              !1 === (o = n ? n.call(r, c, d, u) : void 0) ||
              (void 0 === o && c !== d)
            )
              return !1;
          }
          return !0;
        };
      },
      59555: () => {},
      64467: (e, t, n) => {
        "use strict";
        n.d(t, { A: () => o });
        var r = n(20816);
        function o(e, t, n) {
          return (
            (t = (0, r.A)(t)) in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
      },
      89379: (e, t, n) => {
        "use strict";
        n.d(t, { A: () => i });
        var r = n(64467);
        function o(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function i(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? o(Object(n), !0).forEach(function (t) {
                  (0, r.A)(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : o(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
      },
      53986: (e, t, n) => {
        "use strict";
        function r(e, t) {
          if (null == e) return {};
          var n,
            r,
            o = (function (e, t) {
              if (null == e) return {};
              var n = {};
              for (var r in e)
                if ({}.hasOwnProperty.call(e, r)) {
                  if (t.includes(r)) continue;
                  n[r] = e[r];
                }
              return n;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++)
              (n = i[r]),
                t.includes(n) ||
                  ({}.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
          }
          return o;
        }
        n.d(t, { A: () => r });
      },
      20816: (e, t, n) => {
        "use strict";
        n.d(t, { A: () => o });
        var r = n(82284);
        function o(e) {
          var t = (function (e, t) {
            if ("object" != (0, r.A)(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
              var o = n.call(e, t || "default");
              if ("object" != (0, r.A)(o)) return o;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return ("string" === t ? String : Number)(e);
          })(e, "string");
          return "symbol" == (0, r.A)(t) ? t : t + "";
        }
      },
      82284: (e, t, n) => {
        "use strict";
        function r(e) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            r(e)
          );
        }
        n.d(t, { A: () => r });
      },
      68382: (e, t, n) => {
        "use strict";
        n.d(t, { D: () => Yo });
        var r = n(89379),
          o = n(98173);
        Symbol();
        function i(e) {
          return "function" === typeof e;
        }
        function a(e) {
          return function (t) {
            if (
              (function (e) {
                return i(null === e || void 0 === e ? void 0 : e.lift);
              })(t)
            )
              return t.lift(function (t) {
                try {
                  return e(t, this);
                } catch (n) {
                  this.error(n);
                }
              });
            throw new TypeError("Unable to lift unknown Observable type");
          };
        }
        var s = n(6326);
        var l = (function (e) {
          var t = e(function (e) {
            Error.call(e), (e.stack = new Error().stack);
          });
          return (
            (t.prototype = Object.create(Error.prototype)),
            (t.prototype.constructor = t),
            t
          );
        })(function (e) {
          return function (t) {
            e(this),
              (this.message = t
                ? t.length +
                  " errors occurred during unsubscription:\n" +
                  t
                    .map(function (e, t) {
                      return t + 1 + ") " + e.toString();
                    })
                    .join("\n  ")
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          };
        });
        function u(e, t) {
          if (e) {
            var n = e.indexOf(t);
            0 <= n && e.splice(n, 1);
          }
        }
        var c = (function () {
          function e(e) {
            (this.initialTeardown = e),
              (this.closed = !1),
              (this._parentage = null),
              (this._finalizers = null);
          }
          return (
            (e.prototype.unsubscribe = function () {
              var e, t, n, r, o;
              if (!this.closed) {
                this.closed = !0;
                var a = this._parentage;
                if (a)
                  if (((this._parentage = null), Array.isArray(a)))
                    try {
                      for (
                        var u = (0, s.Ju)(a), c = u.next();
                        !c.done;
                        c = u.next()
                      ) {
                        c.value.remove(this);
                      }
                    } catch (y) {
                      e = { error: y };
                    } finally {
                      try {
                        c && !c.done && (t = u.return) && t.call(u);
                      } finally {
                        if (e) throw e.error;
                      }
                    }
                  else a.remove(this);
                var d = this.initialTeardown;
                if (i(d))
                  try {
                    d();
                  } catch (g) {
                    o = g instanceof l ? g.errors : [g];
                  }
                var p = this._finalizers;
                if (p) {
                  this._finalizers = null;
                  try {
                    for (
                      var h = (0, s.Ju)(p), m = h.next();
                      !m.done;
                      m = h.next()
                    ) {
                      var v = m.value;
                      try {
                        f(v);
                      } catch (b) {
                        (o = null !== o && void 0 !== o ? o : []),
                          b instanceof l
                            ? (o = (0, s.fX)(
                                (0, s.fX)([], (0, s.zs)(o)),
                                (0, s.zs)(b.errors)
                              ))
                            : o.push(b);
                      }
                    }
                  } catch (w) {
                    n = { error: w };
                  } finally {
                    try {
                      m && !m.done && (r = h.return) && r.call(h);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
                }
                if (o) throw new l(o);
              }
            }),
            (e.prototype.add = function (t) {
              var n;
              if (t && t !== this)
                if (this.closed) f(t);
                else {
                  if (t instanceof e) {
                    if (t.closed || t._hasParent(this)) return;
                    t._addParent(this);
                  }
                  (this._finalizers =
                    null !== (n = this._finalizers) && void 0 !== n
                      ? n
                      : []).push(t);
                }
            }),
            (e.prototype._hasParent = function (e) {
              var t = this._parentage;
              return t === e || (Array.isArray(t) && t.includes(e));
            }),
            (e.prototype._addParent = function (e) {
              var t = this._parentage;
              this._parentage = Array.isArray(t)
                ? (t.push(e), t)
                : t
                ? [t, e]
                : e;
            }),
            (e.prototype._removeParent = function (e) {
              var t = this._parentage;
              t === e ? (this._parentage = null) : Array.isArray(t) && u(t, e);
            }),
            (e.prototype.remove = function (t) {
              var n = this._finalizers;
              n && u(n, t), t instanceof e && t._removeParent(this);
            }),
            (e.EMPTY = (function () {
              var t = new e();
              return (t.closed = !0), t;
            })()),
            e
          );
        })();
        c.EMPTY;
        function d(e) {
          return (
            e instanceof c ||
            (e && "closed" in e && i(e.remove) && i(e.add) && i(e.unsubscribe))
          );
        }
        function f(e) {
          i(e) ? e() : e.unsubscribe();
        }
        var p = {
            onUnhandledError: null,
            onStoppedNotification: null,
            Promise: void 0,
            useDeprecatedSynchronousErrorHandling: !1,
            useDeprecatedNextContext: !1,
          },
          h = {
            setTimeout: function (e, t) {
              for (var n = [], r = 2; r < arguments.length; r++)
                n[r - 2] = arguments[r];
              var o = h.delegate;
              return (null === o || void 0 === o ? void 0 : o.setTimeout)
                ? o.setTimeout.apply(o, (0, s.fX)([e, t], (0, s.zs)(n)))
                : setTimeout.apply(void 0, (0, s.fX)([e, t], (0, s.zs)(n)));
            },
            clearTimeout: function (e) {
              var t = h.delegate;
              return (
                (null === t || void 0 === t ? void 0 : t.clearTimeout) ||
                clearTimeout
              )(e);
            },
            delegate: void 0,
          };
        function m(e) {
          h.setTimeout(function () {
            var t = p.onUnhandledError;
            if (!t) throw e;
            t(e);
          });
        }
        function v() {}
        var y = g("C", void 0, void 0);
        function g(e, t, n) {
          return { kind: e, value: t, error: n };
        }
        var b = null;
        var w = (function (e) {
            function t(t) {
              var n = e.call(this) || this;
              return (
                (n.isStopped = !1),
                t
                  ? ((n.destination = t), d(t) && t.add(n))
                  : (n.destination = I),
                n
              );
            }
            return (
              (0, s.C6)(t, e),
              (t.create = function (e, t, n) {
                return new T(e, t, n);
              }),
              (t.prototype.next = function (e) {
                this.isStopped
                  ? _(
                      (function (e) {
                        return g("N", e, void 0);
                      })(e),
                      this
                    )
                  : this._next(e);
              }),
              (t.prototype.error = function (e) {
                this.isStopped
                  ? _(g("E", void 0, e), this)
                  : ((this.isStopped = !0), this._error(e));
              }),
              (t.prototype.complete = function () {
                this.isStopped
                  ? _(y, this)
                  : ((this.isStopped = !0), this._complete());
              }),
              (t.prototype.unsubscribe = function () {
                this.closed ||
                  ((this.isStopped = !0),
                  e.prototype.unsubscribe.call(this),
                  (this.destination = null));
              }),
              (t.prototype._next = function (e) {
                this.destination.next(e);
              }),
              (t.prototype._error = function (e) {
                try {
                  this.destination.error(e);
                } finally {
                  this.unsubscribe();
                }
              }),
              (t.prototype._complete = function () {
                try {
                  this.destination.complete();
                } finally {
                  this.unsubscribe();
                }
              }),
              t
            );
          })(c),
          S = Function.prototype.bind;
        function k(e, t) {
          return S.call(e, t);
        }
        var E = (function () {
            function e(e) {
              this.partialObserver = e;
            }
            return (
              (e.prototype.next = function (e) {
                var t = this.partialObserver;
                if (t.next)
                  try {
                    t.next(e);
                  } catch (n) {
                    A(n);
                  }
              }),
              (e.prototype.error = function (e) {
                var t = this.partialObserver;
                if (t.error)
                  try {
                    t.error(e);
                  } catch (n) {
                    A(n);
                  }
                else A(e);
              }),
              (e.prototype.complete = function () {
                var e = this.partialObserver;
                if (e.complete)
                  try {
                    e.complete();
                  } catch (t) {
                    A(t);
                  }
              }),
              e
            );
          })(),
          T = (function (e) {
            function t(t, n, r) {
              var o,
                a,
                s = e.call(this) || this;
              i(t) || !t
                ? (o = {
                    next: null !== t && void 0 !== t ? t : void 0,
                    error: null !== n && void 0 !== n ? n : void 0,
                    complete: null !== r && void 0 !== r ? r : void 0,
                  })
                : s && p.useDeprecatedNextContext
                ? (((a = Object.create(t)).unsubscribe = function () {
                    return s.unsubscribe();
                  }),
                  (o = {
                    next: t.next && k(t.next, a),
                    error: t.error && k(t.error, a),
                    complete: t.complete && k(t.complete, a),
                  }))
                : (o = t);
              return (s.destination = new E(o)), s;
            }
            return (0, s.C6)(t, e), t;
          })(w);
        function A(e) {
          var t;
          p.useDeprecatedSynchronousErrorHandling
            ? ((t = e),
              p.useDeprecatedSynchronousErrorHandling &&
                b &&
                ((b.errorThrown = !0), (b.error = t)))
            : m(e);
        }
        function _(e, t) {
          var n = p.onStoppedNotification;
          n &&
            h.setTimeout(function () {
              return n(e, t);
            });
        }
        var I = {
          closed: !0,
          next: v,
          error: function (e) {
            throw e;
          },
          complete: v,
        };
        function C(e, t, n, r, o) {
          return new x(e, t, n, r, o);
        }
        var x = (function (e) {
          function t(t, n, r, o, i, a) {
            var s = e.call(this, t) || this;
            return (
              (s.onFinalize = i),
              (s.shouldUnsubscribe = a),
              (s._next = n
                ? function (e) {
                    try {
                      n(e);
                    } catch (r) {
                      t.error(r);
                    }
                  }
                : e.prototype._next),
              (s._error = o
                ? function (e) {
                    try {
                      o(e);
                    } catch (e) {
                      t.error(e);
                    } finally {
                      this.unsubscribe();
                    }
                  }
                : e.prototype._error),
              (s._complete = r
                ? function () {
                    try {
                      r();
                    } catch (e) {
                      t.error(e);
                    } finally {
                      this.unsubscribe();
                    }
                  }
                : e.prototype._complete),
              s
            );
          }
          return (
            (0, s.C6)(t, e),
            (t.prototype.unsubscribe = function () {
              var t;
              if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var n = this.closed;
                e.prototype.unsubscribe.call(this),
                  !n &&
                    (null === (t = this.onFinalize) ||
                      void 0 === t ||
                      t.call(this));
              }
            }),
            t
          );
        })(w);
        function N(e, t) {
          return a(function (n, r) {
            var o = 0;
            n.subscribe(
              C(r, function (n) {
                r.next(e.call(t, n, o++));
              })
            );
          });
        }
        function O(e) {
          const t = new Set();
          for (const n of e.attributes || [])
            if (D(n))
              for (const e of n.properties.rules)
                "owner" === e.allow
                  ? t.add(e.ownerField || "owner")
                  : "groups" === e.allow &&
                    void 0 !== e.groupsField &&
                    t.add(e.groupsField);
          return Array.from(t);
        }
        function D(e) {
          var t, n;
          if (
            "auth" === (null === e || void 0 === e ? void 0 : e.type) &&
            "object" ===
              typeof (null === e || void 0 === e ? void 0 : e.properties) &&
            Array.isArray(
              null === e ||
                void 0 === e ||
                null === (t = e.properties) ||
                void 0 === t
                ? void 0
                : t.rules
            )
          )
            return (
              null === e ||
              void 0 === e ||
              null === (n = e.properties) ||
              void 0 === n
                ? void 0
                : n.rules
            ).every((e) => !!e.allow);
          return !1;
        }
        function P(e) {
          return "".concat(e[0].toUpperCase()).concat(e.slice(1));
        }
        function R(e) {
          let t, n;
          const r = new Promise((e, r) => {
            (t = e), (n = r);
          });
          return (
            e(r)
              .then((e) => {
                t(e);
              })
              .catch((e) => {
                n(e);
              }),
            r
          );
        }
        const L = new WeakMap();
        function M(e, t) {
          return (
            L.set(t, e),
            e.finally(() => {
              L.delete(t);
            })
          );
        }
        const F = {
            HAS_ONE: "HAS_ONE",
            HAS_MANY: "HAS_MANY",
            BELONGS_TO: "BELONGS_TO",
          },
          U = {
            ID: "ID",
            String: "String",
            AWSDate: "String",
            AWSTime: "String",
            AWSDateTime: "String",
            AWSTimestamp: "Int",
            AWSEmail: "String",
            AWSPhone: "String",
            AWSURL: "String",
            AWSIPAddress: "String",
            AWSJSON: "String",
            Boolean: "Boolean",
            Int: "Int",
            Float: "Float",
          },
          j = (e) =>
            1 === e.length
              ? e[0]
              : e.reduce((e, t, n) => (0 === n ? t : e + P(t)), ""),
          z = (e, t, n) => {
            if (!n) return null;
            const r = {};
            for (const [i, a] of Object.entries(n)) {
              var o;
              const n = t
                  ? null === (o = e.models[t]) || void 0 === o
                    ? void 0
                    : o.fields[i]
                  : void 0,
                s = { fieldDef: n, value: a };
              $(s)
                ? (r[i] = s.value.items.map((t) =>
                    z(e, s.fieldDef.type.model, t)
                  ))
                : V(n)
                ? (r[i] = z(e, n.type.model, a))
                : (r[i] = a);
            }
            return r;
          };
        function $(e) {
          var t, n;
          return (
            "object" ===
              typeof (null === (t = e.fieldDef) || void 0 === t
                ? void 0
                : t.type) &&
            "model" in e.fieldDef.type &&
            "string" === typeof e.fieldDef.type.model &&
            e.fieldDef.isArray &&
            Array.isArray(
              null === (n = e.value) || void 0 === n ? void 0 : n.items
            )
          );
        }
        function V(e) {
          return (
            "object" ===
              typeof (null === e || void 0 === e ? void 0 : e.type) &&
            "model" in e.type &&
            "string" === typeof e.type.model
          );
        }
        function K(e, t, n, o, i, a) {
          let s =
            arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
          const l = o.models[t],
            u = l.fields,
            c = Object.entries(u)
              .filter((e) => {
                var t;
                let [n, r] = e;
                return (
                  void 0 !==
                  (null === r ||
                  void 0 === r ||
                  null === (t = r.type) ||
                  void 0 === t
                    ? void 0
                    : t.model)
                );
              })
              .map((e) => {
                let [t] = e;
                return t;
              });
          return n.map((t) => {
            if (null === t || void 0 === t) return t;
            const n = {};
            for (const v of c) {
              var d;
              const c = u[v],
                y = (null === c || void 0 === c ? void 0 : c.type).model,
                g = o.models[y],
                b = g.primaryKeyInfo.primaryKeyFieldName,
                w = g.primaryKeyInfo.sortKeyFieldNames,
                S =
                  null === (d = c.association) || void 0 === d
                    ? void 0
                    : d.connectionType;
              let k = [];
              c.association &&
                "associatedWith" in c.association &&
                (k = c.association.associatedWith);
              const E = [];
              switch (
                (c.association &&
                  "targetNames" in c.association &&
                  E.push(...c.association.targetNames),
                S)
              ) {
                case F.BELONGS_TO: {
                  var f;
                  const o = w.reduce((e, n) => (t[n] && (e[n] = t[n]), e), {});
                  if (
                    void 0 ===
                    (null === (f = e.models[y]) || void 0 === f
                      ? void 0
                      : f.get)
                  )
                    break;
                  n[v] = s
                    ? (n, s) =>
                        t[E[0]]
                          ? e.models[y].get(n, (0, r.A)({ [b]: t[E[0]] }, o), {
                              authMode:
                                (null === s || void 0 === s
                                  ? void 0
                                  : s.authMode) || i,
                              authToken:
                                (null === s || void 0 === s
                                  ? void 0
                                  : s.authToken) || a,
                            })
                          : { data: null }
                    : (n) =>
                        t[E[0]]
                          ? e.models[y].get((0, r.A)({ [b]: t[E[0]] }, o), {
                              authMode:
                                (null === n || void 0 === n
                                  ? void 0
                                  : n.authMode) || i,
                              authToken:
                                (null === n || void 0 === n
                                  ? void 0
                                  : n.authToken) || a,
                            })
                          : { data: null };
                  break;
                }
                case F.HAS_ONE:
                case F.HAS_MANY: {
                  var p;
                  const r =
                      S === F.HAS_ONE
                        ? (e) => ({
                            data:
                              (null === e || void 0 === e
                                ? void 0
                                : e.data.shift()) || null,
                            errors: e.errors,
                            extensions: e.extensions,
                          })
                        : (e) => e,
                    o = l.primaryKeyInfo.primaryKeyFieldName,
                    u = l.primaryKeyInfo.sortKeyFieldNames,
                    c = g.fields[k[0]];
                  if (c.type.model) {
                    var h;
                    let l = [];
                    var m;
                    if (c.association && "targetNames" in c.association)
                      l =
                        null === (m = c.association) || void 0 === m
                          ? void 0
                          : m.targetNames;
                    const d = l.map((e, n) =>
                      0 === n
                        ? { [e]: { eq: t[o] } }
                        : { [e]: { eq: t[u[n - 1]] } }
                    );
                    if (
                      void 0 ===
                      (null === (h = e.models[y]) || void 0 === h
                        ? void 0
                        : h.list)
                    )
                      break;
                    n[v] = s
                      ? (n, s) =>
                          t[o]
                            ? R(async (t) => {
                                const o = M(
                                  e.models[y].list(n, {
                                    filter: { and: d },
                                    limit:
                                      null === s || void 0 === s
                                        ? void 0
                                        : s.limit,
                                    nextToken:
                                      null === s || void 0 === s
                                        ? void 0
                                        : s.nextToken,
                                    authMode:
                                      (null === s || void 0 === s
                                        ? void 0
                                        : s.authMode) || i,
                                    authToken:
                                      (null === s || void 0 === s
                                        ? void 0
                                        : s.authToken) || a,
                                  }),
                                  t
                                );
                                return r(await o);
                              })
                            : []
                      : (n) =>
                          t[o]
                            ? R(async (t) => {
                                const o = M(
                                  e.models[y].list({
                                    filter: { and: d },
                                    limit:
                                      null === n || void 0 === n
                                        ? void 0
                                        : n.limit,
                                    nextToken:
                                      null === n || void 0 === n
                                        ? void 0
                                        : n.nextToken,
                                    authMode:
                                      (null === n || void 0 === n
                                        ? void 0
                                        : n.authMode) || i,
                                    authToken:
                                      (null === n || void 0 === n
                                        ? void 0
                                        : n.authToken) || a,
                                  }),
                                  t
                                );
                                return r(await o);
                              })
                            : [];
                    break;
                  }
                  const d = k.map((e, n) =>
                    0 === n
                      ? { [e]: { eq: t[o] } }
                      : { [e]: { eq: t[u[n - 1]] } }
                  );
                  if (
                    void 0 ===
                    (null === (p = e.models[y]) || void 0 === p
                      ? void 0
                      : p.list)
                  )
                    break;
                  n[v] = s
                    ? (n, s) =>
                        t[o]
                          ? R(async (t) => {
                              const o = M(
                                e.models[y].list(n, {
                                  filter: { and: d },
                                  limit:
                                    null === s || void 0 === s
                                      ? void 0
                                      : s.limit,
                                  nextToken:
                                    null === s || void 0 === s
                                      ? void 0
                                      : s.nextToken,
                                  authMode:
                                    (null === s || void 0 === s
                                      ? void 0
                                      : s.authMode) || i,
                                  authToken:
                                    (null === s || void 0 === s
                                      ? void 0
                                      : s.authToken) || a,
                                }),
                                t
                              );
                              return r(await o);
                            })
                          : []
                    : (n) =>
                        t[o]
                          ? R(async (t) => {
                              const o = M(
                                e.models[y].list({
                                  filter: { and: d },
                                  limit:
                                    null === n || void 0 === n
                                      ? void 0
                                      : n.limit,
                                  nextToken:
                                    null === n || void 0 === n
                                      ? void 0
                                      : n.nextToken,
                                  authMode:
                                    (null === n || void 0 === n
                                      ? void 0
                                      : n.authMode) || i,
                                  authToken:
                                    (null === n || void 0 === n
                                      ? void 0
                                      : n.authToken) || a,
                                }),
                                t
                              );
                              return r(await o);
                            })
                          : [];
                  break;
                }
              }
            }
            return (0, r.A)((0, r.A)({}, t), n);
          });
        }
        const q = {
            CREATE: { operationPrefix: "create", usePlural: !1 },
            GET: { operationPrefix: "get", usePlural: !1 },
            UPDATE: { operationPrefix: "update", usePlural: !1 },
            DELETE: { operationPrefix: "delete", usePlural: !1 },
            LIST: { operationPrefix: "list", usePlural: !0 },
            INDEX_QUERY: { operationPrefix: "", usePlural: !1 },
            ONCREATE: { operationPrefix: "onCreate", usePlural: !1 },
            ONUPDATE: { operationPrefix: "onUpdate", usePlural: !1 },
            ONDELETE: { operationPrefix: "onDelete", usePlural: !1 },
            OBSERVEQUERY: { operationPrefix: "observeQuery", usePlural: !1 },
          },
          B = "*",
          H = (e, t) => {
            const { fields: n } = e,
              r = Object.values(n)
                .map((e) => {
                  let { type: n, name: r } = e;
                  return "string" === typeof n.enum
                    ? [r, G]
                    : "string" === typeof n.nonModel
                    ? [r, H(t.nonModels[n.nonModel], t)]
                    : "string" === typeof n
                    ? [r, G]
                    : void 0;
                })
                .filter((e) => void 0 !== e);
            return Object.fromEntries(r);
          },
          W = (e, t) => {
            const { fields: n } = e,
              r = Object.values(n)
                .map((e) => {
                  let { type: n, name: r } = e;
                  return "string" === typeof n.enum || "string" === typeof n
                    ? [r, G]
                    : "string" === typeof n.nonModel
                    ? [r, H(t.nonModels[n.nonModel], t)]
                    : void 0;
                })
                .filter((e) => void 0 !== e),
              o = O(e).map((e) => [e, G]);
            return Object.fromEntries(r.concat(o));
          };
        const G = "";
        function Q(e, t, n) {
          const r = (t, n) => {
            var o, i, a;
            const [s, ...l] = t.split("."),
              u = l[0],
              c =
                null !== (o = e.models[n]) && void 0 !== o ? o : e.nonModels[n],
              d = null === c || void 0 === c ? void 0 : c.fields,
              f =
                null === d ||
                void 0 === d ||
                null === (i = d[s]) ||
                void 0 === i ||
                null === (i = i.type) ||
                void 0 === i
                  ? void 0
                  : i.model,
              p = e.models[f],
              h =
                null === d ||
                void 0 === d ||
                null === (a = d[s]) ||
                void 0 === a ||
                null === (a = a.type) ||
                void 0 === a
                  ? void 0
                  : a.nonModel,
              m = e.nonModels[h],
              v = p ? "model" : m ? "nonModel" : "field";
            if ("nonModel" === v) {
              let t = {};
              if (!u)
                throw Error(
                  ""
                    .concat(
                      s,
                      " must declare a wildcard (*) or a field of custom type "
                    )
                    .concat(h)
                );
              return (
                (t = u === B ? { [s]: H(m, e) } : { [s]: r(l.join("."), h) }), t
              );
            }
            if ("model" === v) {
              var y;
              let t = {};
              if (!u)
                throw Error(
                  ""
                    .concat(
                      s,
                      " must declare a wildcard (*) or a field of model "
                    )
                    .concat(f)
                );
              if (u === B) {
                const n = e.models[f];
                t = { [s]: W(n, e) };
              } else t = { [s]: r(l.join("."), f) };
              return (
                null !== (y = d[s]) &&
                  void 0 !== y &&
                  y.isArray &&
                  (t = { [s]: { items: t[s] } }),
                t
              );
            }
            {
              var g;
              const t = null === d || void 0 === d ? void 0 : d[s],
                r = e.nonModels[n],
                o =
                  null === r ||
                  void 0 === r ||
                  null === (g = r.fields) ||
                  void 0 === g
                    ? void 0
                    : g[s];
              if (r) {
                if (!o)
                  throw Error(
                    "".concat(s, " is not a field of custom type ").concat(n)
                  );
              } else {
                const e = O(c).includes(s);
                if (!t && !e)
                  throw Error(
                    "".concat(s, " is not a field of model ").concat(n)
                  );
              }
              return { [s]: G };
            }
          };
          return n.reduce((e, n) => J(r(n, t), e), {});
        }
        function Y(e) {
          const t = [];
          return (
            Object.entries(e).forEach((e) => {
              let [n, r] = e;
              r === G
                ? t.push(n)
                : "object" === typeof r &&
                  null !== r &&
                  (null !== r && void 0 !== r && r.items
                    ? t.push(n, "{", "items", "{", Y(r.items), "}", "}")
                    : t.push(n, "{", Y(r), "}"));
            }),
            t.join(" ")
          );
        }
        function J(e, t) {
          for (const r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              (Object.prototype.hasOwnProperty.call(t, r) &&
              (n = t[r]) &&
              "object" === typeof n
                ? J(e[r], t[r])
                : (t[r] = e[r]));
          var n;
          return t;
        }
        function X(e, t, n) {
          const r = e.models[t],
            o = Q(
              e,
              t,
              null !== n && void 0 !== n
                ? n
                : (function (e) {
                    const { fields: t } = e,
                      n = Object.values(t)
                        .map((e) => {
                          let { type: t, name: n } = e;
                          if ("string" === typeof t) return n;
                          if ("object" === typeof t) {
                            if (
                              "string" ===
                              typeof (null === t || void 0 === t
                                ? void 0
                                : t.enum)
                            )
                              return n;
                            if (
                              "string" ===
                              typeof (null === t || void 0 === t
                                ? void 0
                                : t.nonModel)
                            )
                              return "".concat(n, ".").concat(B);
                          }
                        })
                        .filter(Boolean),
                      r = O(e);
                    return Array.from(new Set(n.concat(r)));
                  })(r)
            );
          return Y(o);
        }
        function Z(e, t, n, o, i) {
          var a, s, l, u, c, d, f, p, h, m, v, y, g;
          const {
              name: b,
              pluralName: w,
              fields: S,
              primaryKeyInfo: {
                isCustomPrimaryKey: k,
                primaryKeyFieldName: E,
                sortKeyFieldNames: T,
              },
              attributes: A,
            } = t,
            _ = b.charAt(0).toUpperCase() + b.slice(1),
            I = w.charAt(0).toUpperCase() + w.slice(1),
            { operationPrefix: C, usePlural: x } = q[n],
            { selectionSet: N } = o || {};
          let O, D, R, L, M;
          if (C) O = "".concat(C).concat(x ? I : _);
          else {
            if (!i)
              throw new Error(
                "Error generating GraphQL Document - invalid operation name"
              );
            {
              const { queryField: e, pk: t, sk: n = [] } = i;
              O = e;
              let o = {};
              if (1 === n.length) {
                const [e] = n,
                  t = "string" === typeof S[e].type ? S[e].type : "String",
                  r = U[t];
                o = { [e]: "Model".concat(r, "KeyConditionInput") };
              } else if (n.length > 1) {
                var F;
                const t = j(n),
                  r =
                    null === A ||
                    void 0 === A ||
                    null ===
                      (F = A.find((t) => {
                        var n;
                        return (
                          (null === t ||
                          void 0 === t ||
                          null === (n = t.properties) ||
                          void 0 === n
                            ? void 0
                            : n.queryField) === e
                        );
                      })) ||
                    void 0 === F ||
                    null === (F = F.properties) ||
                    void 0 === F
                      ? void 0
                      : F.name;
                o = {
                  [t]: "Model"
                    .concat(P(b))
                    .concat(P(r), "CompositeKeyConditionInput"),
                };
              }
              D = (0, r.A)(
                {
                  [t]: "".concat(
                    Object.prototype.hasOwnProperty.call(S[t].type, "enum")
                      ? S[t].type.enum
                      : S[t].type,
                    "!"
                  ),
                },
                o
              );
            }
          }
          const z = X(e, b, N),
            $ = { [E]: "".concat(S[E].type, "!") },
            V = {},
            K = (e) => {
              if (0 === T.length) return {};
              if ("get" === e)
                return T.reduce((t, n) => {
                  const r = S[n].type;
                  return "get" === e && (t[n] = "".concat(r, "!")), t;
                }, {});
              if (1 === T.length) {
                const [e] = T,
                  t = "string" === typeof S[e].type ? S[e].type : "String",
                  n = U[t];
                return { [e]: "Model".concat(n, "KeyConditionInput") };
              }
              {
                const e = j(T);
                return {
                  [e]: "Model".concat(
                    P(b),
                    "PrimaryCompositeKeyConditionInput"
                  ),
                };
              }
            };
          switch (
            (k &&
              (Object.assign($, K("get")),
              Object.assign(
                V,
                {
                  [E]: "".concat(S[E].type),
                  sortDirection: "ModelSortDirection",
                },
                K("list")
              )),
            n)
          ) {
            case "CREATE":
            case "UPDATE":
            case "DELETE":
              (null !== (a = M) && void 0 !== a) ||
                (M = {
                  input: ""
                    .concat(C.charAt(0).toLocaleUpperCase() + C.slice(1))
                    .concat(_, "Input!"),
                }),
                (null !== (s = R) && void 0 !== s) || (R = "mutation");
            case "GET":
              (null !== (l = M) && void 0 !== l) || (M = $),
                (null !== (u = L) && void 0 !== u) || (L = z);
            case "LIST":
              (null !== (c = M) && void 0 !== c) ||
                (M = (0, r.A)(
                  (0, r.A)({}, V),
                  {},
                  {
                    filter: "Model".concat(_, "FilterInput"),
                    limit: "Int",
                    nextToken: "String",
                  }
                )),
                (null !== (d = R) && void 0 !== d) || (R = "query"),
                (null !== (f = L) && void 0 !== f) ||
                  (L = "items { ".concat(z, " } nextToken __typename"));
            case "INDEX_QUERY":
              (null !== (p = M) && void 0 !== p) ||
                (M = (0, r.A)(
                  (0, r.A)({}, D),
                  {},
                  {
                    filter: "Model".concat(_, "FilterInput"),
                    sortDirection: "ModelSortDirection",
                    limit: "Int",
                    nextToken: "String",
                  }
                )),
                (null !== (h = R) && void 0 !== h) || (R = "query"),
                (null !== (m = L) && void 0 !== m) ||
                  (L = "items { ".concat(z, " } nextToken __typename"));
            case "ONCREATE":
            case "ONUPDATE":
            case "ONDELETE":
              (null !== (v = M) && void 0 !== v) ||
                (M = { filter: "ModelSubscription".concat(_, "FilterInput") }),
                (null !== (y = R) && void 0 !== y) || (R = "subscription"),
                (null !== (g = L) && void 0 !== g) || (L = z);
              break;
            default:
              throw new Error(
                "Internal error: Attempted to generate graphql document for observeQuery. Please report this error."
              );
          }
          return ""
            .concat(R)
            .concat(
              M
                ? "(".concat(
                    Object.entries(M).map((e) => {
                      let [t, n] = e;
                      return "$".concat(t, ": ").concat(n);
                    }),
                    ")"
                  )
                : "",
              " { "
            )
            .concat(O)
            .concat(
              M
                ? "(".concat(
                    Object.keys(M).map((e) => "".concat(e, ": $").concat(e)),
                    ")"
                  )
                : "",
              " { "
            )
            .concat(L, " } }");
        }
        function ee(e, t, n, r, o) {
          const {
              fields: i,
              primaryKeyInfo: {
                isCustomPrimaryKey: a,
                primaryKeyFieldName: s,
                sortKeyFieldNames: l,
              },
            } = e,
            u = (null === l || void 0 === l ? void 0 : l.length) && j(l);
          let c = {};
          switch (t) {
            case "CREATE":
              c = { input: n ? te(n, e, r) : {} };
              break;
            case "UPDATE":
              c = {
                input: n
                  ? Object.fromEntries(
                      Object.entries(te(n, e, r)).filter((e) => {
                        let [t] = e;
                        const { isReadOnly: n } = i[t];
                        return !n;
                      })
                    )
                  : {},
              };
              break;
            case "GET":
            case "DELETE":
              n &&
                (c = a
                  ? [s, ...l].reduce((e, t) => ((e[t] = n[t]), e), {})
                  : { [s]: n[s] }),
                "DELETE" === t && (c = { input: c });
              break;
            case "LIST":
              null !== n && void 0 !== n && n.filter && (c.filter = n.filter),
                null !== n &&
                  void 0 !== n &&
                  n.sortDirection &&
                  (c.sortDirection = n.sortDirection),
                n && n[s] && (c[s] = n[s]),
                u && n && n[u] && (c[u] = n[u]),
                null !== n &&
                  void 0 !== n &&
                  n.nextToken &&
                  (c.nextToken = n.nextToken),
                null !== n && void 0 !== n && n.limit && (c.limit = n.limit);
              break;
            case "INDEX_QUERY": {
              const { pk: e, sk: t = [] } = o,
                r = (null === t || void 0 === t ? void 0 : t.length) && j(t);
              (c[e] = n[e]),
                r && n && n[r] && (c[r] = n[r]),
                null !== n && void 0 !== n && n.filter && (c.filter = n.filter),
                null !== n &&
                  void 0 !== n &&
                  n.sortDirection &&
                  (c.sortDirection = n.sortDirection),
                null !== n &&
                  void 0 !== n &&
                  n.nextToken &&
                  (c.nextToken = n.nextToken),
                null !== n && void 0 !== n && n.limit && (c.limit = n.limit);
              break;
            }
            case "ONCREATE":
            case "ONUPDATE":
            case "ONDELETE":
              null !== n &&
                void 0 !== n &&
                n.filter &&
                (c = { filter: n.filter });
              break;
            case "OBSERVEQUERY":
              throw new Error(
                "Internal error: Attempted to build variables for observeQuery. Please report this error."
              );
            default:
              throw new Error("Unhandled operation case: ".concat(t));
          }
          return c;
        }
        function te(e, t, n) {
          const { fields: r } = t,
            o = {};
          return (
            Object.entries(e).forEach((e) => {
              var t;
              let [i, a] = e;
              const s = null === (t = r[i]) || void 0 === t ? void 0 : t.type,
                l = null === s || void 0 === s ? void 0 : s.model;
              if (l) {
                var u;
                const e =
                    null === (u = r[i]) || void 0 === u
                      ? void 0
                      : u.association,
                  t = n.models[l].primaryKeyInfo;
                if (
                  (null === e || void 0 === e ? void 0 : e.connectionType) ===
                  F.HAS_ONE
                ) {
                  const t = e;
                  t.targetNames.forEach((e, n) => {
                    const r = t.associatedWith[n];
                    o[e] = a[r];
                  });
                }
                if (
                  (null === e || void 0 === e ? void 0 : e.connectionType) ===
                  F.BELONGS_TO
                ) {
                  e.targetNames.forEach((e, n) => {
                    if (0 === n) {
                      const n = t.primaryKeyFieldName;
                      o[e] = a[n];
                    } else {
                      const r = t.sortKeyFieldNames[n - 1];
                      o[e] = a[r];
                    }
                  });
                }
              } else o[i] = a;
            }),
            o
          );
        }
        function ne(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          const r = t(e);
          return {
            authMode: n.authMode || r.authMode,
            authToken: n.authToken || r.authToken,
          };
        }
        function re(e, t, n) {
          let r = t(e).headers || {};
          return n && (r = n), r;
        }
        function oe(e) {
          if (null !== e && void 0 !== e && e.errors)
            return (0, r.A)((0, r.A)({}, e), {}, { data: [] });
          throw e;
        }
        function ie(e) {
          if (e.errors) return (0, r.A)((0, r.A)({}, e), {}, { data: null });
          throw e;
        }
        const ae = Symbol("INTERNAL_USER_AGENT_OVERRIDE");
        var se;
        !(function (e) {
          (e.CreateConversation = "1"),
            (e.GetConversation = "2"),
            (e.ListConversations = "3"),
            (e.DeleteConversation = "4"),
            (e.SendMessage = "5"),
            (e.ListMessages = "6"),
            (e.OnStreamEvent = "7"),
            (e.Generation = "8"),
            (e.UpdateConversation = "9");
        })(se || (se = {}));
        const le = (e) => ({ category: "ai", action: e });
        function ue(e) {
          return e ? { [ae]: e } : void 0;
        }
        const ce = (e) => {
          var t;
          return (
            "symbol" ===
            typeof (null === e ||
            void 0 === e ||
            null === (t = e.token) ||
            void 0 === t
              ? void 0
              : t.value)
          );
        };
        function de(e, t, n, o, i, a, s) {
          const l = void 0 !== o.arguments;
          return function () {
            var u;
            const c =
              (u = arguments.length - 1) < 0 || arguments.length <= u
                ? void 0
                : arguments[u];
            let d, f;
            if (i) {
              if (!ce(arguments.length <= 0 ? void 0 : arguments[0]))
                throw new Error(
                  "Invalid first argument passed to ".concat(
                    o.name,
                    ". Expected contextSpec"
                  )
                );
              d = arguments.length <= 0 ? void 0 : arguments[0];
            }
            return (
              l &&
                (f = i
                  ? arguments.length <= 1
                    ? void 0
                    : arguments[1]
                  : arguments.length <= 0
                  ? void 0
                  : arguments[0]),
              "subscription" === n
                ? (function (e, t, n, o, i, a, s) {
                    const l = "subscription",
                      { name: u } = n,
                      c = ne(e, o, a),
                      d = re(
                        e,
                        o,
                        null === a || void 0 === a ? void 0 : a.headers
                      ),
                      f = he(n),
                      p = me(n),
                      h = ve(t, n),
                      m = fe(n.type, "model") ? n.type.model : void 0,
                      v = "\n    "
                        .concat(l.toLocaleLowerCase())
                        .concat(f, " {\n      ")
                        .concat(u)
                        .concat(p, " ")
                        .concat(h, "\n    }\n  "),
                      y = ye(n, i),
                      g = ue(s),
                      b = e.graphql(
                        (0, r.A)(
                          (0, r.A)({}, c),
                          {},
                          { query: v, variables: y },
                          g
                        ),
                        d
                      );
                    return b.pipe(
                      N((n) => {
                        const [r] = Object.keys(n.data),
                          o = n.data[r],
                          [i] = m
                            ? K(e, m, [o], t, c.authMode, c.authToken)
                            : [o];
                        return i;
                      })
                    );
                  })(e, t, o, a, f, c, s)
                : (function (e, t, n, o, i, a, s, l, u) {
                    return R(async (c) => {
                      const { name: d } = o,
                        f = ne(e, i, s),
                        p = re(
                          e,
                          i,
                          null === s || void 0 === s ? void 0 : s.headers
                        ),
                        h = he(o),
                        m = me(o),
                        v = ve(t, o),
                        y = fe(o.type, "model") ? o.type.model : void 0,
                        g = "\n    "
                          .concat(n.toLocaleLowerCase())
                          .concat(h, " {\n      ")
                          .concat(d)
                          .concat(m, " ")
                          .concat(v, "\n    }\n  "),
                        b = ye(o, a),
                        w = ue(u);
                      try {
                        const n = M(
                            l
                              ? e.graphql(
                                  l,
                                  (0, r.A)(
                                    (0, r.A)({}, f),
                                    {},
                                    { query: g, variables: b }
                                  ),
                                  p
                                )
                              : e.graphql(
                                  (0, r.A)(
                                    (0, r.A)({}, f),
                                    {},
                                    { query: g, variables: b },
                                    w
                                  ),
                                  p
                                ),
                            c
                          ),
                          { data: o, extensions: i } = await n;
                        if (o) {
                          const [n] = Object.keys(o),
                            r = Array.isArray(o[n]),
                            a = r ? o[n].filter((e) => e) : o[n],
                            s = y
                              ? K(
                                  e,
                                  y,
                                  r ? a : [a],
                                  t,
                                  f.authMode,
                                  f.authToken,
                                  !!l
                                )
                              : a;
                          return {
                            data: !r && Array.isArray(s) ? s.shift() : s,
                            extensions: i,
                          };
                        }
                        return { data: null, extensions: i };
                      } catch (S) {
                        const { data: n, errors: r } = S;
                        if (n && 0 !== Object.keys(n).length && r) {
                          const [o] = Object.keys(n),
                            i = Array.isArray(n[o]),
                            a = i ? n[o].filter((e) => e) : n[o];
                          if (a) {
                            const n = y
                              ? K(
                                  e,
                                  y,
                                  i ? a : [a],
                                  t,
                                  f.authMode,
                                  f.authToken,
                                  !!l
                                )
                              : a;
                            return {
                              data: !i && Array.isArray(n) ? n.shift() : n,
                              errors: r,
                            };
                          }
                          return ie(S);
                        }
                        return ie(S);
                      }
                    });
                  })(e, t, n, o, a, f, c, d, s)
            );
          };
        }
        function fe(e, t) {
          return "string" === typeof e[t];
        }
        function pe(e) {
          let { type: t, isRequired: n } = e;
          const r = n ? "!" : "";
          return (function (e) {
            return e instanceof Object && "enum" in e;
          })(t)
            ? "".concat(t.enum).concat(r)
            : (function (e) {
                return e instanceof Object && "input" in e;
              })(t)
            ? "".concat(t.input).concat(r)
            : "".concat(t).concat(r);
        }
        function he(e) {
          if (void 0 === e.arguments) return "";
          const t = Object.entries(e.arguments)
            .map((e) => {
              let [t, n] = e;
              const r = pe(n),
                o = n.isArray
                  ? "[".concat(r, "]").concat(n.isArrayNullable ? "" : "!")
                  : r;
              return "$".concat(t, ": ").concat(o);
            })
            .join(", ");
          return t.length > 0 ? "(".concat(t, ")") : "";
        }
        function me(e) {
          if (void 0 === e.arguments) return "";
          const t = Object.keys(e.arguments)
            .map((e) => "".concat(e, ": $").concat(e))
            .join(", ");
          return t.length > 0 ? "(".concat(t, ")") : "";
        }
        function ve(e, t) {
          if (fe(t, "type") || fe(t.type, "enum")) return "";
          if (fe(t.type, "nonModel")) {
            const n = e.nonModels[t.type.nonModel];
            return "{".concat(Y(H(n, e)), "}");
          }
          return fe(t.type, "model") ? "{".concat(X(e, t.type.model), "}") : "";
        }
        function ye(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          const n = {};
          if (void 0 === e.arguments) return n;
          for (const r of Object.values(e.arguments))
            if ("undefined" !== typeof t[r.name]) n[r.name] = t[r.name];
            else if (r.isRequired)
              throw new Error(
                "".concat(e.name, " requires arguments '").concat(r.name, "'")
              );
          return n;
        }
        const ge = {
          queries: "query",
          mutations: "mutation",
          subscriptions: "subscription",
        };
        function be(e, t, n, r) {
          if (!t) return {};
          const o = t.modelIntrospection;
          if (!o) return {};
          const i = o[n];
          if (!i) return {};
          const a = {},
            s = null === r(e).amplify;
          for (const l of Object.values(i))
            a[l.name] = de(e, o, ge[n], l, s, r);
          return a;
        }
        function we(e, t, n, r, o) {
          let i = arguments.length > 6 ? arguments[6] : void 0;
          return arguments.length > 5 && void 0 !== arguments[5] && arguments[5]
            ? (a, s, l) => Se(e, t, n, s, l, r, o, a, i)
            : (a, s) => Se(e, t, n, a, s, r, o, void 0, i);
        }
        function Se(e, t, n, o, i, a, s, l, u) {
          return R(async (c) => {
            const { name: d } = n,
              f = Z(t, n, a, i),
              p = ee(n, a, o, t),
              h = ne(e, s, i),
              m = re(e, s, null === i || void 0 === i ? void 0 : i.headers),
              v = ue(u);
            try {
              const n = M(
                  l
                    ? e.graphql(
                        l,
                        (0, r.A)(
                          (0, r.A)({}, h),
                          {},
                          { query: f, variables: p }
                        ),
                        m
                      )
                    : e.graphql(
                        (0, r.A)(
                          (0, r.A)({}, h),
                          {},
                          { query: f, variables: p },
                          v
                        ),
                        m
                      ),
                  c
                ),
                { data: o, extensions: a } = await n;
              if (o) {
                const [n] = Object.keys(o),
                  r = z(t, d, o[n]);
                if (null === r) return { data: null, extensions: a };
                if (null !== i && void 0 !== i && i.selectionSet)
                  return { data: r, extensions: a };
                {
                  const [n] = K(e, d, [r], t, h.authMode, h.authToken, !!l);
                  return { data: n, extensions: a };
                }
              }
              return { data: null, extensions: a };
            } catch (y) {
              const { data: n, errors: r } = y;
              if (n && 0 !== Object.keys(n).length && r) {
                const [o] = Object.keys(n),
                  a = z(t, d, n[o]);
                if (a) {
                  if (null !== i && void 0 !== i && i.selectionSet)
                    return { data: a, errors: r };
                  {
                    const [n] = K(e, d, [a], t, h.authMode, h.authToken, !!l);
                    return { data: n, errors: r };
                  }
                }
                return ie(y);
              }
              return ie(y);
            }
          });
        }
        function ke(e, t, n, r) {
          let o = arguments.length > 5 ? arguments[5] : void 0;
          return arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
            ? (i, a) => Ee(e, t, n, r, a, i, o)
            : (i) => Ee(e, t, n, r, i, void 0, o);
        }
        function Ee(e, t, n, o, i, a, s) {
          return R(async (l) => {
            const { name: u } = n,
              c = Z(t, n, "LIST", i),
              d = ee(n, "LIST", i, t),
              f = ne(e, o, i),
              p = re(e, o, null === i || void 0 === i ? void 0 : i.headers),
              h = ue(s);
            try {
              const n = M(
                  a
                    ? e.graphql(
                        a,
                        (0, r.A)(
                          (0, r.A)({}, f),
                          {},
                          { query: c, variables: d }
                        ),
                        p
                      )
                    : e.graphql(
                        (0, r.A)(
                          (0, r.A)({}, f),
                          {},
                          { query: c, variables: d },
                          h
                        ),
                        p
                      ),
                  l
                ),
                { data: o, extensions: s } = await n;
              if (void 0 !== o) {
                const [n] = Object.keys(o);
                if (o[n].items) {
                  const r = o[n].items.map((e) => z(t, u, e));
                  if (null !== i && void 0 !== i && i.selectionSet)
                    return {
                      data: r,
                      nextToken: o[n].nextToken,
                      extensions: s,
                    };
                  return {
                    data: K(e, u, r, t, f.authMode, f.authToken, !!a),
                    nextToken: o[n].nextToken,
                    extensions: s,
                  };
                }
                return { data: o[n], nextToken: o[n].nextToken, extensions: s };
              }
            } catch (b) {
              const { data: n, errors: r } = b;
              if (
                void 0 !== n &&
                null !== n &&
                0 !== Object.keys(n).length &&
                r
              ) {
                var m;
                const [o] = Object.keys(n);
                if (null !== (m = n[o]) && void 0 !== m && m.items) {
                  var v;
                  const s = n[o].items.map((e) => z(t, u, e));
                  if (s) {
                    var y;
                    if (null !== i && void 0 !== i && i.selectionSet)
                      return {
                        data: s,
                        nextToken:
                          null === (y = n[o]) || void 0 === y
                            ? void 0
                            : y.nextToken,
                        errors: r,
                      };
                    var g;
                    return {
                      data: K(e, u, s, t, f.authMode, f.authToken, !!a),
                      nextToken:
                        null === (g = n[o]) || void 0 === g
                          ? void 0
                          : g.nextToken,
                      errors: r,
                    };
                  }
                  return {
                    data: n[o],
                    nextToken:
                      null === (v = n[o]) || void 0 === v
                        ? void 0
                        : v.nextToken,
                    errors: r,
                  };
                }
                return oe(b);
              }
              return oe(b);
            }
          });
        }
        const Te = {},
          Ae = new Array(64);
        for (
          let Jo = 0, Xo = "A".charCodeAt(0), Zo = "Z".charCodeAt(0);
          Jo + Xo <= Zo;
          Jo++
        ) {
          const e = String.fromCharCode(Jo + Xo);
          (Te[e] = Jo), (Ae[Jo] = e);
        }
        for (
          let Jo = 0, Xo = "a".charCodeAt(0), Zo = "z".charCodeAt(0);
          Jo + Xo <= Zo;
          Jo++
        ) {
          const e = String.fromCharCode(Jo + Xo),
            t = Jo + 26;
          (Te[e] = t), (Ae[t] = e);
        }
        for (let Jo = 0; Jo < 10; Jo++) {
          Te[Jo.toString(10)] = Jo + 52;
          const e = Jo.toString(10),
            t = Jo + 52;
          (Te[e] = t), (Ae[t] = e);
        }
        (Te["+"] = 62), (Ae[62] = "+"), (Te["/"] = 63), (Ae[63] = "/");
        const _e = (e) => {
          let t = (e.length / 4) * 3;
          "==" === e.slice(-2) ? (t -= 2) : "=" === e.slice(-1) && t--;
          const n = new ArrayBuffer(t),
            r = new DataView(n);
          for (let o = 0; o < e.length; o += 4) {
            let t = 0,
              n = 0;
            for (let r = o, s = o + 3; r <= s; r++)
              if ("=" !== e[r]) {
                if (!(e[r] in Te))
                  throw new TypeError(
                    "Invalid character ".concat(e[r], " in base64 string.")
                  );
                (t |= Te[e[r]] << (6 * (s - r))), (n += 6);
              } else t >>= 6;
            const i = (o / 4) * 3;
            t >>= n % 8;
            const a = Math.floor(n / 8);
            for (let e = 0; e < a; e++) {
              const n = 8 * (a - e - 1);
              r.setUint8(i + e, (t & (255 << n)) >> n);
            }
          }
          return new Uint8Array(n);
        };
        function Ie(e) {
          let t;
          t =
            "string" === typeof e ? ((e) => new TextEncoder().encode(e))(e) : e;
          const n = "object" === typeof t && "number" === typeof t.length,
            r =
              "object" === typeof t &&
              "number" === typeof t.byteOffset &&
              "number" === typeof t.byteLength;
          if (!n && !r)
            throw new Error(
              "@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array."
            );
          let o = "";
          for (let i = 0; i < t.length; i += 3) {
            let e = 0,
              n = 0;
            for (let o = i, a = Math.min(i + 3, t.length); o < a; o++)
              (e |= t[o] << (8 * (a - o - 1))), (n += 8);
            const r = Math.ceil(n / 6);
            e <<= 6 * r - n;
            for (let t = 1; t <= r; t++) {
              const n = 6 * (r - t);
              o += Ae[(e & (63 << n)) >> n];
            }
            o += "==".slice(0, 4 - r);
          }
          return o;
        }
        const Ce = (e) =>
            e.map((e) =>
              e.image ? xe(e) : e.toolUse ? Ne(e) : e.toolResult ? Oe(e) : De(e)
            ),
          xe = (e) => {
            let { image: t } = e;
            return {
              image: (0, r.A)(
                (0, r.A)({}, t),
                {},
                {
                  source: (0, r.A)(
                    (0, r.A)({}, t.source),
                    {},
                    { bytes: _e(t.source.bytes) }
                  ),
                }
              ),
            };
          },
          Ne = (e) => {
            let { toolUse: t } = e;
            return {
              toolUse: (0, r.A)(
                (0, r.A)({}, t),
                {},
                { input: JSON.parse(t.input) }
              ),
            };
          },
          Oe = (e) => {
            let { toolResult: t } = e;
            return {
              toolResult: {
                toolUseId: t.toolUseId,
                content: t.content.map((e) =>
                  e.image
                    ? xe(e)
                    : e.json
                    ? ((e) => {
                        let { json: t } = e;
                        return { json: JSON.parse(t) };
                      })(e)
                    : De(e)
                ),
              },
            };
          },
          De = (e) =>
            Object.fromEntries(
              Object.entries(e).filter((e) => {
                let [t, n] = e;
                return null !== n;
              })
            ),
          Pe = (e) => {
            let {
              content: t,
              createdAt: n,
              id: r,
              conversationId: o,
              role: i,
            } = e;
            return {
              content: Ce(null !== t && void 0 !== t ? t : []),
              conversationId: o,
              createdAt: n,
              id: r,
              role: i,
            };
          },
          Re = (e, t, n, o, i) => async (a) => {
            const s = ke(e, t, o, i, !1, le(se.ListMessages)),
              {
                data: l,
                nextToken: u,
                errors: c,
              } = await s(
                (0, r.A)(
                  (0, r.A)({}, a),
                  {},
                  { filter: { conversationId: { eq: n } } }
                )
              );
            return { data: l.map((e) => Pe(e)), nextToken: u, errors: c };
          },
          Le = (e) => {
            if (e) {
              return (0, r.A)(
                (0, r.A)({}, e),
                {},
                { input: JSON.parse(e.input) }
              );
            }
          },
          Me = (e) =>
            Object.fromEntries(
              Object.entries(e).filter((e) => {
                let [t, n] = e;
                return null !== n;
              })
            ),
          Fe = (e, t, n, r, o) => (i) => {
            const { conversations: a } = t;
            if (!a) return {};
            const s = a[r].message.subscribe;
            return de(
              e,
              t,
              "subscription",
              s,
              !1,
              o,
              le(se.OnStreamEvent)
            )({ conversationId: n }).subscribe((e) => {
              const { next: t, error: n } = ((e) => {
                let {
                  id: t,
                  conversationId: n,
                  associatedUserMessageId: r,
                  contentBlockIndex: o,
                  contentBlockDoneAtIndex: i,
                  contentBlockDeltaIndex: a,
                  contentBlockText: s,
                  contentBlockToolUse: l,
                  stopReason: u,
                  errors: c,
                } = e;
                if (c)
                  return {
                    error: {
                      id: t,
                      conversationId: n,
                      associatedUserMessageId: r,
                      errors: c,
                    },
                  };
                return {
                  next: Me({
                    id: t,
                    conversationId: n,
                    associatedUserMessageId: r,
                    contentBlockIndex: o,
                    contentBlockDoneAtIndex: i,
                    contentBlockDeltaIndex: a,
                    text: s,
                    toolUse: Le(l),
                    stopReason: u,
                  }),
                };
              })(e);
              n && i.error(n), t && i.next(t);
            });
          },
          Ue = (e) => JSON.stringify(e),
          je = (e) =>
            e.map((e) => (e.image ? $e(e) : e.toolResult ? Ve(e) : e)),
          ze = (e) => {
            let { tools: t } = e;
            return {
              tools: Object.entries(t).map((e) => {
                let [t, n] = e;
                return {
                  toolSpec: {
                    name: t,
                    description: n.description,
                    inputSchema: { json: JSON.stringify(n.inputSchema.json) },
                  },
                };
              }),
            };
          },
          $e = (e) => {
            let { image: t } = e;
            return {
              image: (0, r.A)(
                (0, r.A)({}, t),
                {},
                {
                  source: (0, r.A)(
                    (0, r.A)({}, t.source),
                    {},
                    { bytes: Ie(t.source.bytes) }
                  ),
                }
              ),
            };
          },
          Ve = (e) => {
            let { toolResult: t } = e;
            return {
              toolResult: (0, r.A)(
                (0, r.A)({}, t),
                {},
                {
                  content: t.content.map((e) =>
                    e.image
                      ? $e(e)
                      : e.json
                      ? ((e) => {
                          let { json: t } = e;
                          return { json: JSON.stringify(t) };
                        })(e)
                      : e
                  ),
                }
              ),
            };
          },
          Ke = (e, t, n, o, i) => async (a) => {
            const { conversations: s } = t;
            if (!s) return {};
            const l = "string" === typeof a ? { content: [{ text: a }] } : a,
              { content: u, aiContext: c, toolConfiguration: d } = l,
              f = s[o].message.send,
              p = de(e, t, "mutation", f, !1, i, le(se.SendMessage)),
              { data: h, errors: m } = await p(
                (0, r.A)(
                  (0, r.A)(
                    { conversationId: n, content: je(u) },
                    c && { aiContext: Ue(c) }
                  ),
                  d && { toolConfiguration: ze(d) }
                )
              );
            return { data: h ? Pe(h) : h, errors: m };
          },
          qe = (e, t, n, r, o, i, a, s, l, u) => {
            if (!n)
              throw new Error(
                "An error occurred converting a ".concat(
                  i,
                  " conversation: Missing ID"
                )
              );
            return {
              id: n,
              createdAt: r,
              updatedAt: o,
              metadata: l,
              name: u,
              onStreamEvent: Fe(e, t, n, i, s),
              sendMessage: Ke(e, t, n, i, s),
              listMessages: Re(e, t, n, a, s),
            };
          },
          Be = (e, t, n, r, o, i) => async (a) => {
            const { name: s, metadata: l } =
                null !== a && void 0 !== a ? a : {},
              u = JSON.stringify(l),
              c = we(e, t, r, "CREATE", i, !1, le(se.CreateConversation)),
              { data: d, errors: f } = await c({ name: s, metadata: u });
            return {
              data: qe(
                e,
                t,
                null === d || void 0 === d ? void 0 : d.id,
                null === d || void 0 === d ? void 0 : d.createdAt,
                null === d || void 0 === d ? void 0 : d.updatedAt,
                n,
                o,
                i,
                null === d || void 0 === d ? void 0 : d.metadata,
                null === d || void 0 === d ? void 0 : d.name
              ),
              errors: f,
            };
          },
          He = (e, t, n, r, o, i) => async (a) => {
            let { id: s } = a;
            const l = we(e, t, r, "GET", i, !1, le(se.GetConversation)),
              { data: u, errors: c } = await l({ id: s });
            return {
              data: u
                ? qe(
                    e,
                    t,
                    u.id,
                    u.createdAt,
                    u.updatedAt,
                    n,
                    o,
                    i,
                    null === u || void 0 === u ? void 0 : u.metadata,
                    null === u || void 0 === u ? void 0 : u.name
                  )
                : u,
              errors: c,
            };
          },
          We = (e, t, n, r, o, i) => async (a) => {
            const s = ke(e, t, r, i, !1, le(se.ListConversations)),
              { data: l, nextToken: u, errors: c } = await s(a);
            return {
              data: l.map((r) =>
                qe(
                  e,
                  t,
                  r.id,
                  r.createdAt,
                  r.updatedAt,
                  n,
                  o,
                  i,
                  null === r || void 0 === r ? void 0 : r.metadata,
                  null === r || void 0 === r ? void 0 : r.name
                )
              ),
              nextToken: u,
              errors: c,
            };
          },
          Ge = (e, t, n, r, o, i) => async (a) => {
            let { id: s } = a;
            const l = we(e, t, r, "DELETE", i, !1, le(se.DeleteConversation)),
              { data: u, errors: c } = await l({ id: s });
            return {
              data: u
                ? qe(
                    e,
                    t,
                    null === u || void 0 === u ? void 0 : u.id,
                    null === u || void 0 === u ? void 0 : u.createdAt,
                    null === u || void 0 === u ? void 0 : u.updatedAt,
                    n,
                    o,
                    i,
                    null === u || void 0 === u ? void 0 : u.metadata,
                    null === u || void 0 === u ? void 0 : u.name
                  )
                : u,
              errors: c,
            };
          },
          Qe = (e, t, n, r, o, i) => async (a) => {
            let { id: s, metadata: l, name: u } = a;
            const c = JSON.stringify(l),
              d = we(e, t, r, "UPDATE", i, !1, le(se.UpdateConversation)),
              { data: f, errors: p } = await d({ id: s, metadata: c, name: u });
            return {
              data: f
                ? qe(
                    e,
                    t,
                    null === f || void 0 === f ? void 0 : f.id,
                    null === f || void 0 === f ? void 0 : f.createdAt,
                    null === f || void 0 === f ? void 0 : f.updatedAt,
                    n,
                    o,
                    i,
                    null === f || void 0 === f ? void 0 : f.metadata,
                    null === f || void 0 === f ? void 0 : f.name
                  )
                : f,
              errors: p,
            };
          };
        const Ye = (e) => {
          const t = e.modelIntrospection;
          if (!t) return {};
          const n = {};
          for (const [r, o] of Object.entries(t.enums))
            n[o.name] = { values: () => o.values };
          return n;
        };
        function Je(e, t, n, o, i) {
          return arguments.length > 5 && void 0 !== arguments[5] && arguments[5]
            ? (a, s, l) => Xe(e, t, n, o, i, (0, r.A)((0, r.A)({}, s), l), a)
            : (a, s) => Xe(e, t, n, o, i, (0, r.A)((0, r.A)({}, a), s));
        }
        function Xe(e, t, n, o, i, a, s) {
          return R(async (l) => {
            const { name: u } = n,
              c = Z(t, n, "INDEX_QUERY", a, o),
              d = ee(n, "INDEX_QUERY", a, t, o),
              f = ne(e, i, a),
              p = (n) => K(e, u, n, t, f.authMode, f.authToken, !!s);
            try {
              const n = re(
                  e,
                  i,
                  null === a || void 0 === a ? void 0 : a.headers
                ),
                o = [
                  (0, r.A)((0, r.A)({}, f), {}, { query: c, variables: d }),
                  n,
                ];
              void 0 !== s && o.unshift(s);
              const h = M(e.graphql(...o), l),
                m = await h;
              if (void 0 !== m.data)
                return (function (e, t, n, r, o) {
                  const { data: i, extensions: a } = n,
                    [s] = Object.keys(i);
                  if (i[s].items) {
                    const n = i[s].items.map((n) => z(e, t, n));
                    return {
                      data: r ? n : o(n),
                      nextToken: i[s].nextToken,
                      extensions: a,
                    };
                  }
                  return {
                    data: i[s],
                    nextToken: i[s].nextToken,
                    extensions: a,
                  };
                })(
                  t,
                  u,
                  m,
                  null === a || void 0 === a ? void 0 : a.selectionSet,
                  p
                );
            } catch (g) {
              const { data: e, errors: n } = g;
              if (
                void 0 !== e &&
                null !== e &&
                0 !== Object.keys(e).length &&
                n
              ) {
                var h, m;
                const [n] = Object.keys(e);
                if (null !== (h = e[n]) && void 0 !== h && h.items) {
                  var v;
                  const r =
                    null === (v = e[n]) || void 0 === v
                      ? void 0
                      : v.items.map((e) => z(t, u, e));
                  var y;
                  if (r)
                    return {
                      data:
                        null !== a && void 0 !== a && a.selectionSet ? r : p(r),
                      nextToken:
                        null === (y = e[n]) || void 0 === y
                          ? void 0
                          : y.nextToken,
                    };
                }
                return {
                  data: e[n],
                  nextToken:
                    null === (m = e[n]) || void 0 === m ? void 0 : m.nextToken,
                };
              }
              return oe(g);
            }
          });
        }
        function Ze(e, t, n, o, i) {
          const { name: a } = n;
          return (s) => {
            const l = Z(t, n, o, s),
              u = ee(n, o, s, t),
              c = ne(e, i, s),
              d = re(e, i, null === s || void 0 === s ? void 0 : s.headers);
            return e
              .graphql(
                (0, r.A)((0, r.A)({}, c), {}, { query: l, variables: u }),
                d
              )
              .pipe(
                N((n) => {
                  const [r] = Object.keys(n.data),
                    o = n.data[r],
                    i = z(t, a, o);
                  if (null === i) return null;
                  if (null !== s && void 0 !== s && s.selectionSet) return i;
                  {
                    const [n] = K(e, a, [i], t, c.authMode, c.authToken);
                    return n;
                  }
                })
              );
          };
        }
        var et =
          ("function" === typeof Symbol && Symbol.observable) || "@@observable";
        function tt(e) {
          return e;
        }
        function nt(e) {
          return 0 === e.length
            ? tt
            : 1 === e.length
            ? e[0]
            : function (t) {
                return e.reduce(function (e, t) {
                  return t(e);
                }, t);
              };
        }
        var rt = (function () {
          function e(e) {
            e && (this._subscribe = e);
          }
          return (
            (e.prototype.lift = function (t) {
              var n = new e();
              return (n.source = this), (n.operator = t), n;
            }),
            (e.prototype.subscribe = function (e, t, n) {
              var r,
                o = this,
                a =
                  ((r = e) && r instanceof w) ||
                  ((function (e) {
                    return e && i(e.next) && i(e.error) && i(e.complete);
                  })(r) &&
                    d(r))
                    ? e
                    : new T(e, t, n);
              return (
                (function (e) {
                  if (p.useDeprecatedSynchronousErrorHandling) {
                    var t = !b;
                    if ((t && (b = { errorThrown: !1, error: null }), e(), t)) {
                      var n = b,
                        r = n.errorThrown,
                        o = n.error;
                      if (((b = null), r)) throw o;
                    }
                  } else e();
                })(function () {
                  var e = o,
                    t = e.operator,
                    n = e.source;
                  a.add(
                    t ? t.call(a, n) : n ? o._subscribe(a) : o._trySubscribe(a)
                  );
                }),
                a
              );
            }),
            (e.prototype._trySubscribe = function (e) {
              try {
                return this._subscribe(e);
              } catch (t) {
                e.error(t);
              }
            }),
            (e.prototype.forEach = function (e, t) {
              var n = this;
              return new (t = ot(t))(function (t, r) {
                var o = new T({
                  next: function (t) {
                    try {
                      e(t);
                    } catch (n) {
                      r(n), o.unsubscribe();
                    }
                  },
                  error: r,
                  complete: t,
                });
                n.subscribe(o);
              });
            }),
            (e.prototype._subscribe = function (e) {
              var t;
              return null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(e);
            }),
            (e.prototype[et] = function () {
              return this;
            }),
            (e.prototype.pipe = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              return nt(e)(this);
            }),
            (e.prototype.toPromise = function (e) {
              var t = this;
              return new (e = ot(e))(function (e, n) {
                var r;
                t.subscribe(
                  function (e) {
                    return (r = e);
                  },
                  function (e) {
                    return n(e);
                  },
                  function () {
                    return e(r);
                  }
                );
              });
            }),
            (e.create = function (t) {
              return new e(t);
            }),
            e
          );
        })();
        function ot(e) {
          var t;
          return null !== (t = null !== e && void 0 !== e ? e : p.Promise) &&
            void 0 !== t
            ? t
            : Promise;
        }
        function it(e, t, n) {
          const r = Object.fromEntries(n.map((t) => [t, e[t]]));
          for (let o = 0; o < t.length; o++)
            if (Object.keys(r).every((e) => r[e] === t[o][e])) return o;
          return -1;
        }
        function at(e, t) {
          const { name: n } = t;
          return (o) =>
            new rt((i) => {
              const a = [],
                s = [];
              let l = function () {
                return s.push(...arguments);
              };
              const u = e[n].onCreate(o).subscribe({
                  next(e) {
                    l({ item: e, type: "create" });
                  },
                  error(e) {
                    i.error({ type: "onCreate", error: e });
                  },
                }),
                c = e[n].onUpdate(o).subscribe({
                  next(e) {
                    l({ item: e, type: "update" });
                  },
                  error(e) {
                    i.error({ type: "onUpdate", error: e });
                  },
                }),
                d = e[n].onDelete(o).subscribe({
                  next(e) {
                    l({ item: e, type: "delete" });
                  },
                  error(e) {
                    i.error({ type: "onDelete", error: e });
                  },
                });
              function f(e) {
                for (const t of e) {
                  const e = it(t.item, a, p);
                  switch (t.type) {
                    case "create":
                      e < 0 && a.push(t.item);
                      break;
                    case "update":
                      e >= 0 && (a[e] = t.item);
                      break;
                    case "delete":
                      e >= 0 && a.splice(e, 1);
                      break;
                    default:
                      console.error("Unrecognized message in observeQuery.", t);
                  }
                }
                i.next({ items: a, isSynced: !0 });
              }
              const p = (function (e) {
                const { primaryKeyFieldName: t, sortKeyFieldNames: n } =
                  e.primaryKeyInfo;
                return [t, ...n];
              })(t);
              return (
                (async () => {
                  let t = !0,
                    u = null;
                  for (; !i.closed && (t || u); ) {
                    t = !1;
                    const {
                      data: l,
                      errors: c,
                      nextToken: d,
                    } = await e[n].list(
                      (0, r.A)((0, r.A)({}, o), {}, { nextToken: u })
                    );
                    (u = d), a.push(...l);
                    const f = 0 === s.length && (null === u || void 0 === u);
                    if ((i.next({ items: a, isSynced: f }), Array.isArray(c)))
                      for (const e of c) i.error(e);
                  }
                  s.length > 0 && f(s),
                    (l = function () {
                      for (
                        var e = arguments.length, t = new Array(e), n = 0;
                        n < e;
                        n++
                      )
                        t[n] = arguments[n];
                      return f(t), a.length;
                    });
                })(),
                () => {
                  u.unsubscribe(), c.unsubscribe(), d.unsubscribe();
                }
              );
            });
        }
        const st = (e) => {
            var t, n, r;
            return (
              "key" === e.type &&
              (null === (t = e.properties) || void 0 === t ? void 0 : t.name) &&
              (null === (n = e.properties) || void 0 === n
                ? void 0
                : n.queryField) &&
              (null === (r = e.properties) || void 0 === r
                ? void 0
                : r.fields.length) > 0
            );
          },
          lt = (e) => {
            var t;
            return (
              (null === (t = e.attributes) || void 0 === t
                ? void 0
                : t.filter(st).map((e) => {
                    const t = e.properties.queryField,
                      [n, ...r] = e.properties.fields;
                    return { queryField: t, pk: n, sk: r };
                  })) || []
            );
          },
          ut = (e, t) => {
            var n;
            const r =
                null === (n = e.models[t].attributes) || void 0 === n
                  ? void 0
                  : n.find((e) => "model" === e.type),
              o = {
                queries: ["list", "get", "observeQuery"],
                mutations: ["create", "update", "delete"],
                subscriptions: ["onCreate", "onUpdate", "onDelete"],
              },
              i = [];
            if (!r) return q;
            if (r.properties)
              for (const [s, l] of Object.entries(r.properties))
                s in o &&
                  (null === l
                    ? i.push(...o[s])
                    : l instanceof Object && i.push(...Object.keys(l)));
            i.includes("list") && i.push("observeQuery");
            const a = i.map((e) => e.toUpperCase());
            return Object.fromEntries(
              Object.entries(q).filter((e) => {
                let [t] = e;
                return !a.includes(t);
              })
            );
          };
        function ct(e, t, n) {
          return (
            (function (e) {
              const t = e.cancel.bind(e);
              e.cancel = function (e, n) {
                const r = new Set();
                let o = e;
                for (; o && L.has(o); ) {
                  if (r.has(o))
                    throw new Error(
                      "A cycle was detected in the modeled graphql cancellation chain. This is a bug. Please report it!"
                    );
                  r.add(o), (o = L.get(o));
                }
                return t(o, n);
              };
            })(e),
            (e.models = (function (e, t, n) {
              const r = {},
                o = t.modelIntrospection;
              if (!o) return {};
              const i = ["ONCREATE", "ONUPDATE", "ONDELETE"];
              for (const a of Object.values(o.models)) {
                const { name: t } = a;
                r[t] = {};
                const s = ut(o, t);
                Object.entries(s).forEach((s) => {
                  let [l, { operationPrefix: u }] = s;
                  const c = l;
                  "LIST" === c
                    ? (r[t][u] = ke(e, o, a, n))
                    : i.includes(c)
                    ? (r[t][u] = Ze(e, o, a, c, n))
                    : (r[t][u] =
                        "OBSERVEQUERY" === c ? at(r, a) : we(e, o, a, c, n));
                });
                const l = lt(a);
                for (const i of l) r[t][i.queryField] = Je(e, o, a, i, n);
              }
              return r;
            })(e, t, n)),
            (e.enums = Ye(t)),
            (e.queries = (function (e, t, n) {
              return be(e, t, "queries", n);
            })(e, t, n)),
            (e.mutations = (function (e, t, n) {
              return be(e, t, "mutations", n);
            })(e, t, n)),
            (e.subscriptions = (function (e, t, n) {
              return be(e, t, "subscriptions", n);
            })(e, t, n)),
            (e.conversations = (function (e, t, n) {
              const o =
                null === t || void 0 === t ? void 0 : t.modelIntrospection;
              if (null === o || void 0 === o || !o.conversations) return {};
              const i = {};
              for (const {
                name: a,
                conversation: s,
                message: l,
                models: u,
                nonModels: c,
                enums: d,
              } of Object.values(o.conversations)) {
                const t = u[s.modelName],
                  f = u[l.modelName];
                if (!t || !f) return {};
                const p = (0, r.A)(
                  (0, r.A)({}, o),
                  {},
                  {
                    models: (0, r.A)((0, r.A)({}, o.models), u),
                    nonModels: (0, r.A)((0, r.A)({}, o.nonModels), c),
                    enums: (0, r.A)((0, r.A)({}, o.enums), d),
                  }
                );
                i[a] = {
                  update: Qe(e, p, a, t, f, n),
                  create: Be(e, p, a, t, f, n),
                  get: He(e, p, a, t, f, n),
                  delete: Ge(e, p, a, t, f, n),
                  list: We(e, p, a, t, f, n),
                };
              }
              return i;
            })(e, t, n)),
            (e.generations = (function (e, t, n) {
              const r =
                null === t || void 0 === t ? void 0 : t.modelIntrospection;
              if (null === r || void 0 === r || !r.generations) return {};
              const o = {};
              for (const i of Object.values(r.generations))
                o[i.name] = de(e, r, "query", i, !1, n, le(se.Generation));
              return o;
            })(e, t, n)),
            e
          );
        }
        var dt;
        !(function (e) {
          (e.NO_API_KEY = "No api-key configured"),
            (e.NO_CURRENT_USER = "No current user"),
            (e.NO_CREDENTIALS = "No credentials"),
            (e.NO_FEDERATED_JWT = "No federated jwt"),
            (e.NO_AUTH_TOKEN = "No auth token specified");
        })(dt || (dt = {}));
        const ft = Symbol("amplify"),
          pt = Symbol("authMode"),
          ht = Symbol("authToken"),
          mt = Symbol("headers");
        function vt(e) {
          const t = e;
          return {
            amplify: t[ft],
            authMode: t[pt],
            authToken: t[ht],
            headers: t[mt],
          };
        }
        function yt(e) {
          return void 0 !== e;
        }
        var gt = n(53986),
          bt = n(20816),
          wt = n(32600);
        function St(e) {
          return (
            (St =
              "function" === typeof Symbol &&
              "symbol" === typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" === typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            St(e)
          );
        }
        "function" === typeof Symbol &&
          null != Symbol.iterator &&
          Symbol.iterator,
          "function" === typeof Symbol &&
            null != Symbol.asyncIterator &&
            Symbol.asyncIterator;
        var kt =
          "function" === typeof Symbol && null != Symbol.toStringTag
            ? Symbol.toStringTag
            : "@@toStringTag";
        function Et(e, t) {
          for (
            var n, r = /\r\n|[\n\r]/g, o = 1, i = t + 1;
            (n = r.exec(e.body)) && n.index < t;

          )
            (o += 1), (i = t + 1 - (n.index + n[0].length));
          return { line: o, column: i };
        }
        function Tt(e) {
          return At(e.source, Et(e.source, e.start));
        }
        function At(e, t) {
          var n = e.locationOffset.column - 1,
            r = It(n) + e.body,
            o = t.line - 1,
            i = e.locationOffset.line - 1,
            a = t.line + i,
            s = 1 === t.line ? n : 0,
            l = t.column + s,
            u = "".concat(e.name, ":").concat(a, ":").concat(l, "\n"),
            c = r.split(/\r\n|[\n\r]/g),
            d = c[o];
          if (d.length > 120) {
            for (
              var f = Math.floor(l / 80), p = l % 80, h = [], m = 0;
              m < d.length;
              m += 80
            )
              h.push(d.slice(m, m + 80));
            return (
              u +
              _t(
                [["".concat(a), h[0]]].concat(
                  h.slice(1, f + 1).map(function (e) {
                    return ["", e];
                  }),
                  [
                    [" ", It(p - 1) + "^"],
                    ["", h[f + 1]],
                  ]
                )
              )
            );
          }
          return (
            u +
            _t([
              ["".concat(a - 1), c[o - 1]],
              ["".concat(a), d],
              ["", It(l - 1) + "^"],
              ["".concat(a + 1), c[o + 1]],
            ])
          );
        }
        function _t(e) {
          var t = e.filter(function (e) {
              e[0];
              return void 0 !== e[1];
            }),
            n = Math.max.apply(
              Math,
              t.map(function (e) {
                return e[0].length;
              })
            );
          return t
            .map(function (e) {
              var t,
                r = e[0],
                o = e[1];
              return It(n - (t = r).length) + t + (o ? " | " + o : " |");
            })
            .join("\n");
        }
        function It(e) {
          return Array(e + 1).join(" ");
        }
        function Ct(e) {
          return (
            (Ct =
              "function" === typeof Symbol &&
              "symbol" === typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" === typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Ct(e)
          );
        }
        function xt(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function Nt(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        function Ot(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        function Dt(e, t) {
          return !t || ("object" !== Ct(t) && "function" !== typeof t)
            ? Pt(e)
            : t;
        }
        function Pt(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function Rt(e) {
          var t = "function" === typeof Map ? new Map() : void 0;
          return (
            (Rt = function (e) {
              if (
                null === e ||
                ((n = e),
                -1 === Function.toString.call(n).indexOf("[native code]"))
              )
                return e;
              var n;
              if ("function" !== typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if ("undefined" !== typeof t) {
                if (t.has(e)) return t.get(e);
                t.set(e, r);
              }
              function r() {
                return Lt(e, arguments, Ut(this).constructor);
              }
              return (
                (r.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                Ft(r, e)
              );
            }),
            Rt(e)
          );
        }
        function Lt(e, t, n) {
          return (
            (Lt = Mt()
              ? Reflect.construct
              : function (e, t, n) {
                  var r = [null];
                  r.push.apply(r, t);
                  var o = new (Function.bind.apply(e, r))();
                  return n && Ft(o, n.prototype), o;
                }),
            Lt.apply(null, arguments)
          );
        }
        function Mt() {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        }
        function Ft(e, t) {
          return (
            (Ft =
              Object.setPrototypeOf ||
              function (e, t) {
                return (e.__proto__ = t), e;
              }),
            Ft(e, t)
          );
        }
        function Ut(e) {
          return (
            (Ut = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            Ut(e)
          );
        }
        var jt = (function (e) {
          !(function (e, t) {
            if ("function" !== typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && Ft(e, t);
          })(i, e);
          var t,
            n,
            r,
            o = (function (e) {
              var t = Mt();
              return function () {
                var n,
                  r = Ut(e);
                if (t) {
                  var o = Ut(this).constructor;
                  n = Reflect.construct(r, arguments, o);
                } else n = r.apply(this, arguments);
                return Dt(this, n);
              };
            })(i);
          function i(e, t, n, r, a, s, l) {
            var u, c, d, f;
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, i),
              ((f = o.call(this, e)).name = "GraphQLError"),
              (f.originalError = null !== s && void 0 !== s ? s : void 0),
              (f.nodes = zt(Array.isArray(t) ? t : t ? [t] : void 0));
            for (
              var p = [],
                h = 0,
                m = null !== (v = f.nodes) && void 0 !== v ? v : [];
              h < m.length;
              h++
            ) {
              var v,
                y = m[h].loc;
              null != y && p.push(y);
            }
            (p = zt(p)),
              (f.source =
                null !== n && void 0 !== n
                  ? n
                  : null === (u = p) || void 0 === u
                  ? void 0
                  : u[0].source),
              (f.positions =
                null !== r && void 0 !== r
                  ? r
                  : null === (c = p) || void 0 === c
                  ? void 0
                  : c.map(function (e) {
                      return e.start;
                    })),
              (f.locations =
                r && n
                  ? r.map(function (e) {
                      return Et(n, e);
                    })
                  : null === (d = p) || void 0 === d
                  ? void 0
                  : d.map(function (e) {
                      return Et(e.source, e.start);
                    })),
              (f.path = null !== a && void 0 !== a ? a : void 0);
            var g,
              b = null === s || void 0 === s ? void 0 : s.extensions;
            return (
              null == l && "object" == St((g = b)) && null !== g
                ? (f.extensions = (function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? xt(Object(n), !0).forEach(function (t) {
                            Nt(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                            e,
                            Object.getOwnPropertyDescriptors(n)
                          )
                        : xt(Object(n)).forEach(function (t) {
                            Object.defineProperty(
                              e,
                              t,
                              Object.getOwnPropertyDescriptor(n, t)
                            );
                          });
                    }
                    return e;
                  })({}, b))
                : (f.extensions = null !== l && void 0 !== l ? l : {}),
              Object.defineProperties(Pt(f), {
                message: { enumerable: !0 },
                locations: { enumerable: null != f.locations },
                path: { enumerable: null != f.path },
                extensions: {
                  enumerable:
                    null != f.extensions &&
                    Object.keys(f.extensions).length > 0,
                },
                name: { enumerable: !1 },
                nodes: { enumerable: !1 },
                source: { enumerable: !1 },
                positions: { enumerable: !1 },
                originalError: { enumerable: !1 },
              }),
              null !== s && void 0 !== s && s.stack
                ? (Object.defineProperty(Pt(f), "stack", {
                    value: s.stack,
                    writable: !0,
                    configurable: !0,
                  }),
                  Dt(f))
                : (Error.captureStackTrace
                    ? Error.captureStackTrace(Pt(f), i)
                    : Object.defineProperty(Pt(f), "stack", {
                        value: Error().stack,
                        writable: !0,
                        configurable: !0,
                      }),
                  f)
            );
          }
          return (
            (t = i),
            (n = [
              {
                key: "toString",
                value: function () {
                  return (function (e) {
                    var t = e.message;
                    if (e.nodes)
                      for (var n = 0, r = e.nodes; n < r.length; n++) {
                        var o = r[n];
                        o.loc && (t += "\n\n" + Tt(o.loc));
                      }
                    else if (e.source && e.locations)
                      for (var i = 0, a = e.locations; i < a.length; i++) {
                        var s = a[i];
                        t += "\n\n" + At(e.source, s);
                      }
                    return t;
                  })(this);
                },
              },
              {
                key: kt,
                get: function () {
                  return "Object";
                },
              },
            ]) && Ot(t.prototype, n),
            r && Ot(t, r),
            i
          );
        })(Rt(Error));
        function zt(e) {
          return void 0 === e || 0 === e.length ? void 0 : e;
        }
        function $t(e, t, n) {
          return new jt("Syntax Error: ".concat(n), void 0, e, [t]);
        }
        var Vt = Object.freeze({
          NAME: "Name",
          DOCUMENT: "Document",
          OPERATION_DEFINITION: "OperationDefinition",
          VARIABLE_DEFINITION: "VariableDefinition",
          SELECTION_SET: "SelectionSet",
          FIELD: "Field",
          ARGUMENT: "Argument",
          FRAGMENT_SPREAD: "FragmentSpread",
          INLINE_FRAGMENT: "InlineFragment",
          FRAGMENT_DEFINITION: "FragmentDefinition",
          VARIABLE: "Variable",
          INT: "IntValue",
          FLOAT: "FloatValue",
          STRING: "StringValue",
          BOOLEAN: "BooleanValue",
          NULL: "NullValue",
          ENUM: "EnumValue",
          LIST: "ListValue",
          OBJECT: "ObjectValue",
          OBJECT_FIELD: "ObjectField",
          DIRECTIVE: "Directive",
          NAMED_TYPE: "NamedType",
          LIST_TYPE: "ListType",
          NON_NULL_TYPE: "NonNullType",
          SCHEMA_DEFINITION: "SchemaDefinition",
          OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
          SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
          OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
          FIELD_DEFINITION: "FieldDefinition",
          INPUT_VALUE_DEFINITION: "InputValueDefinition",
          INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
          UNION_TYPE_DEFINITION: "UnionTypeDefinition",
          ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
          ENUM_VALUE_DEFINITION: "EnumValueDefinition",
          INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
          DIRECTIVE_DEFINITION: "DirectiveDefinition",
          SCHEMA_EXTENSION: "SchemaExtension",
          SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
          OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
          INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
          UNION_TYPE_EXTENSION: "UnionTypeExtension",
          ENUM_TYPE_EXTENSION: "EnumTypeExtension",
          INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension",
        });
        const Kt =
          "function" === typeof Symbol && "function" === typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : void 0;
        function qt(e) {
          var t = e.prototype.toJSON;
          "function" === typeof t ||
            (function (e, t) {
              if (!Boolean(e))
                throw new Error(
                  null != t ? t : "Unexpected invariant triggered."
                );
            })(0),
            (e.prototype.inspect = t),
            Kt && (e.prototype[Kt] = t);
        }
        var Bt = (function () {
          function e(e, t, n) {
            (this.start = e.start),
              (this.end = t.end),
              (this.startToken = e),
              (this.endToken = t),
              (this.source = n);
          }
          return (
            (e.prototype.toJSON = function () {
              return { start: this.start, end: this.end };
            }),
            e
          );
        })();
        qt(Bt);
        var Ht = (function () {
          function e(e, t, n, r, o, i, a) {
            (this.kind = e),
              (this.start = t),
              (this.end = n),
              (this.line = r),
              (this.column = o),
              (this.value = a),
              (this.prev = i),
              (this.next = null);
          }
          return (
            (e.prototype.toJSON = function () {
              return {
                kind: this.kind,
                value: this.value,
                line: this.line,
                column: this.column,
              };
            }),
            e
          );
        })();
        function Wt(e) {
          return null != e && "string" === typeof e.kind;
        }
        qt(Ht);
        var Gt = Object.freeze({
          SOF: "<SOF>",
          EOF: "<EOF>",
          BANG: "!",
          DOLLAR: "$",
          AMP: "&",
          PAREN_L: "(",
          PAREN_R: ")",
          SPREAD: "...",
          COLON: ":",
          EQUALS: "=",
          AT: "@",
          BRACKET_L: "[",
          BRACKET_R: "]",
          BRACE_L: "{",
          PIPE: "|",
          BRACE_R: "}",
          NAME: "Name",
          INT: "Int",
          FLOAT: "Float",
          STRING: "String",
          BLOCK_STRING: "BlockString",
          COMMENT: "Comment",
        });
        function Qt(e) {
          return (
            (Qt =
              "function" === typeof Symbol &&
              "symbol" === typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" === typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            Qt(e)
          );
        }
        function Yt(e) {
          return Jt(e, []);
        }
        function Jt(e, t) {
          switch (Qt(e)) {
            case "string":
              return JSON.stringify(e);
            case "function":
              return e.name ? "[function ".concat(e.name, "]") : "[function]";
            case "object":
              return null === e
                ? "null"
                : (function (e, t) {
                    if (-1 !== t.indexOf(e)) return "[Circular]";
                    var n = [].concat(t, [e]),
                      r = (function (e) {
                        var t = e[String(Kt)];
                        if ("function" === typeof t) return t;
                        if ("function" === typeof e.inspect) return e.inspect;
                      })(e);
                    if (void 0 !== r) {
                      var o = r.call(e);
                      if (o !== e) return "string" === typeof o ? o : Jt(o, n);
                    } else if (Array.isArray(e))
                      return (function (e, t) {
                        if (0 === e.length) return "[]";
                        if (t.length > 2) return "[Array]";
                        for (
                          var n = Math.min(10, e.length),
                            r = e.length - n,
                            o = [],
                            i = 0;
                          i < n;
                          ++i
                        )
                          o.push(Jt(e[i], t));
                        1 === r
                          ? o.push("... 1 more item")
                          : r > 1 && o.push("... ".concat(r, " more items"));
                        return "[" + o.join(", ") + "]";
                      })(e, n);
                    return (function (e, t) {
                      var n = Object.keys(e);
                      if (0 === n.length) return "{}";
                      if (t.length > 2)
                        return (
                          "[" +
                          (function (e) {
                            var t = Object.prototype.toString
                              .call(e)
                              .replace(/^\[object /, "")
                              .replace(/]$/, "");
                            if (
                              "Object" === t &&
                              "function" === typeof e.constructor
                            ) {
                              var n = e.constructor.name;
                              if ("string" === typeof n && "" !== n) return n;
                            }
                            return t;
                          })(e) +
                          "]"
                        );
                      var r = n.map(function (n) {
                        return n + ": " + Jt(e[n], t);
                      });
                      return "{ " + r.join(", ") + " }";
                    })(e, n);
                  })(e, t);
            default:
              return String(e);
          }
        }
        function Xt(e, t) {
          if (!Boolean(e)) throw new Error(t);
        }
        const Zt = function (e, t) {
          return e instanceof t;
        };
        function en(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        var tn = (function () {
          function e(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "GraphQL request",
              n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : { line: 1, column: 1 };
            "string" === typeof e ||
              Xt(0, "Body must be a string. Received: ".concat(Yt(e), ".")),
              (this.body = e),
              (this.name = t),
              (this.locationOffset = n),
              this.locationOffset.line > 0 ||
                Xt(
                  0,
                  "line in locationOffset is 1-indexed and must be positive."
                ),
              this.locationOffset.column > 0 ||
                Xt(
                  0,
                  "column in locationOffset is 1-indexed and must be positive."
                );
          }
          var t, n, r;
          return (
            (t = e),
            (n = [
              {
                key: kt,
                get: function () {
                  return "Source";
                },
              },
            ]) && en(t.prototype, n),
            r && en(t, r),
            e
          );
        })();
        var nn = Object.freeze({
          QUERY: "QUERY",
          MUTATION: "MUTATION",
          SUBSCRIPTION: "SUBSCRIPTION",
          FIELD: "FIELD",
          FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
          FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
          INLINE_FRAGMENT: "INLINE_FRAGMENT",
          VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
          SCHEMA: "SCHEMA",
          SCALAR: "SCALAR",
          OBJECT: "OBJECT",
          FIELD_DEFINITION: "FIELD_DEFINITION",
          ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
          INTERFACE: "INTERFACE",
          UNION: "UNION",
          ENUM: "ENUM",
          ENUM_VALUE: "ENUM_VALUE",
          INPUT_OBJECT: "INPUT_OBJECT",
          INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION",
        });
        function rn(e) {
          var t = e.split(/\r\n|[\n\r]/g),
            n = (function (e) {
              for (
                var t, n = !0, r = !0, o = 0, i = null, a = 0;
                a < e.length;
                ++a
              )
                switch (e.charCodeAt(a)) {
                  case 13:
                    10 === e.charCodeAt(a + 1) && ++a;
                  case 10:
                    (n = !1), (r = !0), (o = 0);
                    break;
                  case 9:
                  case 32:
                    ++o;
                    break;
                  default:
                    r && !n && (null === i || o < i) && (i = o), (r = !1);
                }
              return null !== (t = i) && void 0 !== t ? t : 0;
            })(e);
          if (0 !== n) for (var r = 1; r < t.length; r++) t[r] = t[r].slice(n);
          for (var o = 0; o < t.length && on(t[o]); ) ++o;
          for (var i = t.length; i > o && on(t[i - 1]); ) --i;
          return t.slice(o, i).join("\n");
        }
        function on(e) {
          for (var t = 0; t < e.length; ++t)
            if (" " !== e[t] && "\t" !== e[t]) return !1;
          return !0;
        }
        var an = (function () {
          function e(e) {
            var t = new Ht(Gt.SOF, 0, 0, 0, 0, null);
            (this.source = e),
              (this.lastToken = t),
              (this.token = t),
              (this.line = 1),
              (this.lineStart = 0);
          }
          var t = e.prototype;
          return (
            (t.advance = function () {
              return (
                (this.lastToken = this.token), (this.token = this.lookahead())
              );
            }),
            (t.lookahead = function () {
              var e = this.token;
              if (e.kind !== Gt.EOF)
                do {
                  var t;
                  e =
                    null !== (t = e.next) && void 0 !== t
                      ? t
                      : (e.next = ln(this, e));
                } while (e.kind === Gt.COMMENT);
              return e;
            }),
            e
          );
        })();
        function sn(e) {
          return isNaN(e)
            ? Gt.EOF
            : e < 127
            ? JSON.stringify(String.fromCharCode(e))
            : '"\\u'.concat(
                ("00" + e.toString(16).toUpperCase()).slice(-4),
                '"'
              );
        }
        function ln(e, t) {
          for (var n = e.source, r = n.body, o = r.length, i = t.end; i < o; ) {
            var a = r.charCodeAt(i),
              s = e.line,
              l = 1 + i - e.lineStart;
            switch (a) {
              case 65279:
              case 9:
              case 32:
              case 44:
                ++i;
                continue;
              case 10:
                ++i, ++e.line, (e.lineStart = i);
                continue;
              case 13:
                10 === r.charCodeAt(i + 1) ? (i += 2) : ++i,
                  ++e.line,
                  (e.lineStart = i);
                continue;
              case 33:
                return new Ht(Gt.BANG, i, i + 1, s, l, t);
              case 35:
                return cn(n, i, s, l, t);
              case 36:
                return new Ht(Gt.DOLLAR, i, i + 1, s, l, t);
              case 38:
                return new Ht(Gt.AMP, i, i + 1, s, l, t);
              case 40:
                return new Ht(Gt.PAREN_L, i, i + 1, s, l, t);
              case 41:
                return new Ht(Gt.PAREN_R, i, i + 1, s, l, t);
              case 46:
                if (46 === r.charCodeAt(i + 1) && 46 === r.charCodeAt(i + 2))
                  return new Ht(Gt.SPREAD, i, i + 3, s, l, t);
                break;
              case 58:
                return new Ht(Gt.COLON, i, i + 1, s, l, t);
              case 61:
                return new Ht(Gt.EQUALS, i, i + 1, s, l, t);
              case 64:
                return new Ht(Gt.AT, i, i + 1, s, l, t);
              case 91:
                return new Ht(Gt.BRACKET_L, i, i + 1, s, l, t);
              case 93:
                return new Ht(Gt.BRACKET_R, i, i + 1, s, l, t);
              case 123:
                return new Ht(Gt.BRACE_L, i, i + 1, s, l, t);
              case 124:
                return new Ht(Gt.PIPE, i, i + 1, s, l, t);
              case 125:
                return new Ht(Gt.BRACE_R, i, i + 1, s, l, t);
              case 34:
                return 34 === r.charCodeAt(i + 1) && 34 === r.charCodeAt(i + 2)
                  ? hn(n, i, s, l, t, e)
                  : pn(n, i, s, l, t);
              case 45:
              case 48:
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                return dn(n, i, a, s, l, t);
              case 65:
              case 66:
              case 67:
              case 68:
              case 69:
              case 70:
              case 71:
              case 72:
              case 73:
              case 74:
              case 75:
              case 76:
              case 77:
              case 78:
              case 79:
              case 80:
              case 81:
              case 82:
              case 83:
              case 84:
              case 85:
              case 86:
              case 87:
              case 88:
              case 89:
              case 90:
              case 95:
              case 97:
              case 98:
              case 99:
              case 100:
              case 101:
              case 102:
              case 103:
              case 104:
              case 105:
              case 106:
              case 107:
              case 108:
              case 109:
              case 110:
              case 111:
              case 112:
              case 113:
              case 114:
              case 115:
              case 116:
              case 117:
              case 118:
              case 119:
              case 120:
              case 121:
              case 122:
                return vn(n, i, s, l, t);
            }
            throw $t(n, i, un(a));
          }
          var u = e.line,
            c = 1 + i - e.lineStart;
          return new Ht(Gt.EOF, o, o, u, c, t);
        }
        function un(e) {
          return e < 32 && 9 !== e && 10 !== e && 13 !== e
            ? "Cannot contain the invalid character ".concat(sn(e), ".")
            : 39 === e
            ? "Unexpected single quote character ('), did you mean to use a double quote (\")?"
            : "Cannot parse the unexpected character ".concat(sn(e), ".");
        }
        function cn(e, t, n, r, o) {
          var i,
            a = e.body,
            s = t;
          do {
            i = a.charCodeAt(++s);
          } while (!isNaN(i) && (i > 31 || 9 === i));
          return new Ht(Gt.COMMENT, t, s, n, r, o, a.slice(t + 1, s));
        }
        function dn(e, t, n, r, o, i) {
          var a = e.body,
            s = n,
            l = t,
            u = !1;
          if ((45 === s && (s = a.charCodeAt(++l)), 48 === s)) {
            if ((s = a.charCodeAt(++l)) >= 48 && s <= 57)
              throw $t(
                e,
                l,
                "Invalid number, unexpected digit after 0: ".concat(sn(s), ".")
              );
          } else (l = fn(e, l, s)), (s = a.charCodeAt(l));
          if (
            (46 === s &&
              ((u = !0),
              (s = a.charCodeAt(++l)),
              (l = fn(e, l, s)),
              (s = a.charCodeAt(l))),
            (69 !== s && 101 !== s) ||
              ((u = !0),
              (43 !== (s = a.charCodeAt(++l)) && 45 !== s) ||
                (s = a.charCodeAt(++l)),
              (l = fn(e, l, s)),
              (s = a.charCodeAt(l))),
            46 === s ||
              (function (e) {
                return (
                  95 === e || (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
                );
              })(s))
          )
            throw $t(
              e,
              l,
              "Invalid number, expected digit but got: ".concat(sn(s), ".")
            );
          return new Ht(u ? Gt.FLOAT : Gt.INT, t, l, r, o, i, a.slice(t, l));
        }
        function fn(e, t, n) {
          var r = e.body,
            o = t,
            i = n;
          if (i >= 48 && i <= 57) {
            do {
              i = r.charCodeAt(++o);
            } while (i >= 48 && i <= 57);
            return o;
          }
          throw $t(
            e,
            o,
            "Invalid number, expected digit but got: ".concat(sn(i), ".")
          );
        }
        function pn(e, t, n, r, o) {
          for (
            var i, a, s, l, u = e.body, c = t + 1, d = c, f = 0, p = "";
            c < u.length &&
            !isNaN((f = u.charCodeAt(c))) &&
            10 !== f &&
            13 !== f;

          ) {
            if (34 === f)
              return (
                (p += u.slice(d, c)), new Ht(Gt.STRING, t, c + 1, n, r, o, p)
              );
            if (f < 32 && 9 !== f)
              throw $t(
                e,
                c,
                "Invalid character within String: ".concat(sn(f), ".")
              );
            if ((++c, 92 === f)) {
              switch (((p += u.slice(d, c - 1)), (f = u.charCodeAt(c)))) {
                case 34:
                  p += '"';
                  break;
                case 47:
                  p += "/";
                  break;
                case 92:
                  p += "\\";
                  break;
                case 98:
                  p += "\b";
                  break;
                case 102:
                  p += "\f";
                  break;
                case 110:
                  p += "\n";
                  break;
                case 114:
                  p += "\r";
                  break;
                case 116:
                  p += "\t";
                  break;
                case 117:
                  var h =
                    ((i = u.charCodeAt(c + 1)),
                    (a = u.charCodeAt(c + 2)),
                    (s = u.charCodeAt(c + 3)),
                    (l = u.charCodeAt(c + 4)),
                    (mn(i) << 12) | (mn(a) << 8) | (mn(s) << 4) | mn(l));
                  if (h < 0) {
                    var m = u.slice(c + 1, c + 5);
                    throw $t(
                      e,
                      c,
                      "Invalid character escape sequence: \\u".concat(m, ".")
                    );
                  }
                  (p += String.fromCharCode(h)), (c += 4);
                  break;
                default:
                  throw $t(
                    e,
                    c,
                    "Invalid character escape sequence: \\".concat(
                      String.fromCharCode(f),
                      "."
                    )
                  );
              }
              d = ++c;
            }
          }
          throw $t(e, c, "Unterminated string.");
        }
        function hn(e, t, n, r, o, i) {
          for (
            var a = e.body, s = t + 3, l = s, u = 0, c = "";
            s < a.length && !isNaN((u = a.charCodeAt(s)));

          ) {
            if (
              34 === u &&
              34 === a.charCodeAt(s + 1) &&
              34 === a.charCodeAt(s + 2)
            )
              return (
                (c += a.slice(l, s)),
                new Ht(Gt.BLOCK_STRING, t, s + 3, n, r, o, rn(c))
              );
            if (u < 32 && 9 !== u && 10 !== u && 13 !== u)
              throw $t(
                e,
                s,
                "Invalid character within String: ".concat(sn(u), ".")
              );
            10 === u
              ? (++s, ++i.line, (i.lineStart = s))
              : 13 === u
              ? (10 === a.charCodeAt(s + 1) ? (s += 2) : ++s,
                ++i.line,
                (i.lineStart = s))
              : 92 === u &&
                34 === a.charCodeAt(s + 1) &&
                34 === a.charCodeAt(s + 2) &&
                34 === a.charCodeAt(s + 3)
              ? ((c += a.slice(l, s) + '"""'), (l = s += 4))
              : ++s;
          }
          throw $t(e, s, "Unterminated string.");
        }
        function mn(e) {
          return e >= 48 && e <= 57
            ? e - 48
            : e >= 65 && e <= 70
            ? e - 55
            : e >= 97 && e <= 102
            ? e - 87
            : -1;
        }
        function vn(e, t, n, r, o) {
          for (
            var i = e.body, a = i.length, s = t + 1, l = 0;
            s !== a &&
            !isNaN((l = i.charCodeAt(s))) &&
            (95 === l ||
              (l >= 48 && l <= 57) ||
              (l >= 65 && l <= 90) ||
              (l >= 97 && l <= 122));

          )
            ++s;
          return new Ht(Gt.NAME, t, s, n, r, o, i.slice(t, s));
        }
        function yn(e, t) {
          return new gn(e, t).parseDocument();
        }
        var gn = (function () {
          function e(e, t) {
            var n = (function (e) {
              return Zt(e, tn);
            })(e)
              ? e
              : new tn(e);
            (this._lexer = new an(n)), (this._options = t);
          }
          var t = e.prototype;
          return (
            (t.parseName = function () {
              var e = this.expectToken(Gt.NAME);
              return { kind: Vt.NAME, value: e.value, loc: this.loc(e) };
            }),
            (t.parseDocument = function () {
              var e = this._lexer.token;
              return {
                kind: Vt.DOCUMENT,
                definitions: this.many(Gt.SOF, this.parseDefinition, Gt.EOF),
                loc: this.loc(e),
              };
            }),
            (t.parseDefinition = function () {
              if (this.peek(Gt.NAME))
                switch (this._lexer.token.value) {
                  case "query":
                  case "mutation":
                  case "subscription":
                    return this.parseOperationDefinition();
                  case "fragment":
                    return this.parseFragmentDefinition();
                  case "schema":
                  case "scalar":
                  case "type":
                  case "interface":
                  case "union":
                  case "enum":
                  case "input":
                  case "directive":
                    return this.parseTypeSystemDefinition();
                  case "extend":
                    return this.parseTypeSystemExtension();
                }
              else {
                if (this.peek(Gt.BRACE_L))
                  return this.parseOperationDefinition();
                if (this.peekDescription())
                  return this.parseTypeSystemDefinition();
              }
              throw this.unexpected();
            }),
            (t.parseOperationDefinition = function () {
              var e = this._lexer.token;
              if (this.peek(Gt.BRACE_L))
                return {
                  kind: Vt.OPERATION_DEFINITION,
                  operation: "query",
                  name: void 0,
                  variableDefinitions: [],
                  directives: [],
                  selectionSet: this.parseSelectionSet(),
                  loc: this.loc(e),
                };
              var t,
                n = this.parseOperationType();
              return (
                this.peek(Gt.NAME) && (t = this.parseName()),
                {
                  kind: Vt.OPERATION_DEFINITION,
                  operation: n,
                  name: t,
                  variableDefinitions: this.parseVariableDefinitions(),
                  directives: this.parseDirectives(!1),
                  selectionSet: this.parseSelectionSet(),
                  loc: this.loc(e),
                }
              );
            }),
            (t.parseOperationType = function () {
              var e = this.expectToken(Gt.NAME);
              switch (e.value) {
                case "query":
                  return "query";
                case "mutation":
                  return "mutation";
                case "subscription":
                  return "subscription";
              }
              throw this.unexpected(e);
            }),
            (t.parseVariableDefinitions = function () {
              return this.optionalMany(
                Gt.PAREN_L,
                this.parseVariableDefinition,
                Gt.PAREN_R
              );
            }),
            (t.parseVariableDefinition = function () {
              var e = this._lexer.token;
              return {
                kind: Vt.VARIABLE_DEFINITION,
                variable: this.parseVariable(),
                type: (this.expectToken(Gt.COLON), this.parseTypeReference()),
                defaultValue: this.expectOptionalToken(Gt.EQUALS)
                  ? this.parseValueLiteral(!0)
                  : void 0,
                directives: this.parseDirectives(!0),
                loc: this.loc(e),
              };
            }),
            (t.parseVariable = function () {
              var e = this._lexer.token;
              return (
                this.expectToken(Gt.DOLLAR),
                { kind: Vt.VARIABLE, name: this.parseName(), loc: this.loc(e) }
              );
            }),
            (t.parseSelectionSet = function () {
              var e = this._lexer.token;
              return {
                kind: Vt.SELECTION_SET,
                selections: this.many(
                  Gt.BRACE_L,
                  this.parseSelection,
                  Gt.BRACE_R
                ),
                loc: this.loc(e),
              };
            }),
            (t.parseSelection = function () {
              return this.peek(Gt.SPREAD)
                ? this.parseFragment()
                : this.parseField();
            }),
            (t.parseField = function () {
              var e,
                t,
                n = this._lexer.token,
                r = this.parseName();
              return (
                this.expectOptionalToken(Gt.COLON)
                  ? ((e = r), (t = this.parseName()))
                  : (t = r),
                {
                  kind: Vt.FIELD,
                  alias: e,
                  name: t,
                  arguments: this.parseArguments(!1),
                  directives: this.parseDirectives(!1),
                  selectionSet: this.peek(Gt.BRACE_L)
                    ? this.parseSelectionSet()
                    : void 0,
                  loc: this.loc(n),
                }
              );
            }),
            (t.parseArguments = function (e) {
              var t = e ? this.parseConstArgument : this.parseArgument;
              return this.optionalMany(Gt.PAREN_L, t, Gt.PAREN_R);
            }),
            (t.parseArgument = function () {
              var e = this._lexer.token,
                t = this.parseName();
              return (
                this.expectToken(Gt.COLON),
                {
                  kind: Vt.ARGUMENT,
                  name: t,
                  value: this.parseValueLiteral(!1),
                  loc: this.loc(e),
                }
              );
            }),
            (t.parseConstArgument = function () {
              var e = this._lexer.token;
              return {
                kind: Vt.ARGUMENT,
                name: this.parseName(),
                value: (this.expectToken(Gt.COLON), this.parseValueLiteral(!0)),
                loc: this.loc(e),
              };
            }),
            (t.parseFragment = function () {
              var e = this._lexer.token;
              this.expectToken(Gt.SPREAD);
              var t = this.expectOptionalKeyword("on");
              return !t && this.peek(Gt.NAME)
                ? {
                    kind: Vt.FRAGMENT_SPREAD,
                    name: this.parseFragmentName(),
                    directives: this.parseDirectives(!1),
                    loc: this.loc(e),
                  }
                : {
                    kind: Vt.INLINE_FRAGMENT,
                    typeCondition: t ? this.parseNamedType() : void 0,
                    directives: this.parseDirectives(!1),
                    selectionSet: this.parseSelectionSet(),
                    loc: this.loc(e),
                  };
            }),
            (t.parseFragmentDefinition = function () {
              var e,
                t = this._lexer.token;
              return (
                this.expectKeyword("fragment"),
                !0 ===
                (null === (e = this._options) || void 0 === e
                  ? void 0
                  : e.experimentalFragmentVariables)
                  ? {
                      kind: Vt.FRAGMENT_DEFINITION,
                      name: this.parseFragmentName(),
                      variableDefinitions: this.parseVariableDefinitions(),
                      typeCondition:
                        (this.expectKeyword("on"), this.parseNamedType()),
                      directives: this.parseDirectives(!1),
                      selectionSet: this.parseSelectionSet(),
                      loc: this.loc(t),
                    }
                  : {
                      kind: Vt.FRAGMENT_DEFINITION,
                      name: this.parseFragmentName(),
                      typeCondition:
                        (this.expectKeyword("on"), this.parseNamedType()),
                      directives: this.parseDirectives(!1),
                      selectionSet: this.parseSelectionSet(),
                      loc: this.loc(t),
                    }
              );
            }),
            (t.parseFragmentName = function () {
              if ("on" === this._lexer.token.value) throw this.unexpected();
              return this.parseName();
            }),
            (t.parseValueLiteral = function (e) {
              var t = this._lexer.token;
              switch (t.kind) {
                case Gt.BRACKET_L:
                  return this.parseList(e);
                case Gt.BRACE_L:
                  return this.parseObject(e);
                case Gt.INT:
                  return (
                    this._lexer.advance(),
                    { kind: Vt.INT, value: t.value, loc: this.loc(t) }
                  );
                case Gt.FLOAT:
                  return (
                    this._lexer.advance(),
                    { kind: Vt.FLOAT, value: t.value, loc: this.loc(t) }
                  );
                case Gt.STRING:
                case Gt.BLOCK_STRING:
                  return this.parseStringLiteral();
                case Gt.NAME:
                  switch ((this._lexer.advance(), t.value)) {
                    case "true":
                      return { kind: Vt.BOOLEAN, value: !0, loc: this.loc(t) };
                    case "false":
                      return { kind: Vt.BOOLEAN, value: !1, loc: this.loc(t) };
                    case "null":
                      return { kind: Vt.NULL, loc: this.loc(t) };
                    default:
                      return {
                        kind: Vt.ENUM,
                        value: t.value,
                        loc: this.loc(t),
                      };
                  }
                case Gt.DOLLAR:
                  if (!e) return this.parseVariable();
              }
              throw this.unexpected();
            }),
            (t.parseStringLiteral = function () {
              var e = this._lexer.token;
              return (
                this._lexer.advance(),
                {
                  kind: Vt.STRING,
                  value: e.value,
                  block: e.kind === Gt.BLOCK_STRING,
                  loc: this.loc(e),
                }
              );
            }),
            (t.parseList = function (e) {
              var t = this,
                n = this._lexer.token;
              return {
                kind: Vt.LIST,
                values: this.any(
                  Gt.BRACKET_L,
                  function () {
                    return t.parseValueLiteral(e);
                  },
                  Gt.BRACKET_R
                ),
                loc: this.loc(n),
              };
            }),
            (t.parseObject = function (e) {
              var t = this,
                n = this._lexer.token;
              return {
                kind: Vt.OBJECT,
                fields: this.any(
                  Gt.BRACE_L,
                  function () {
                    return t.parseObjectField(e);
                  },
                  Gt.BRACE_R
                ),
                loc: this.loc(n),
              };
            }),
            (t.parseObjectField = function (e) {
              var t = this._lexer.token,
                n = this.parseName();
              return (
                this.expectToken(Gt.COLON),
                {
                  kind: Vt.OBJECT_FIELD,
                  name: n,
                  value: this.parseValueLiteral(e),
                  loc: this.loc(t),
                }
              );
            }),
            (t.parseDirectives = function (e) {
              for (var t = []; this.peek(Gt.AT); )
                t.push(this.parseDirective(e));
              return t;
            }),
            (t.parseDirective = function (e) {
              var t = this._lexer.token;
              return (
                this.expectToken(Gt.AT),
                {
                  kind: Vt.DIRECTIVE,
                  name: this.parseName(),
                  arguments: this.parseArguments(e),
                  loc: this.loc(t),
                }
              );
            }),
            (t.parseTypeReference = function () {
              var e,
                t = this._lexer.token;
              return (
                this.expectOptionalToken(Gt.BRACKET_L)
                  ? ((e = this.parseTypeReference()),
                    this.expectToken(Gt.BRACKET_R),
                    (e = { kind: Vt.LIST_TYPE, type: e, loc: this.loc(t) }))
                  : (e = this.parseNamedType()),
                this.expectOptionalToken(Gt.BANG)
                  ? { kind: Vt.NON_NULL_TYPE, type: e, loc: this.loc(t) }
                  : e
              );
            }),
            (t.parseNamedType = function () {
              var e = this._lexer.token;
              return {
                kind: Vt.NAMED_TYPE,
                name: this.parseName(),
                loc: this.loc(e),
              };
            }),
            (t.parseTypeSystemDefinition = function () {
              var e = this.peekDescription()
                ? this._lexer.lookahead()
                : this._lexer.token;
              if (e.kind === Gt.NAME)
                switch (e.value) {
                  case "schema":
                    return this.parseSchemaDefinition();
                  case "scalar":
                    return this.parseScalarTypeDefinition();
                  case "type":
                    return this.parseObjectTypeDefinition();
                  case "interface":
                    return this.parseInterfaceTypeDefinition();
                  case "union":
                    return this.parseUnionTypeDefinition();
                  case "enum":
                    return this.parseEnumTypeDefinition();
                  case "input":
                    return this.parseInputObjectTypeDefinition();
                  case "directive":
                    return this.parseDirectiveDefinition();
                }
              throw this.unexpected(e);
            }),
            (t.peekDescription = function () {
              return this.peek(Gt.STRING) || this.peek(Gt.BLOCK_STRING);
            }),
            (t.parseDescription = function () {
              if (this.peekDescription()) return this.parseStringLiteral();
            }),
            (t.parseSchemaDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("schema");
              var n = this.parseDirectives(!0),
                r = this.many(
                  Gt.BRACE_L,
                  this.parseOperationTypeDefinition,
                  Gt.BRACE_R
                );
              return {
                kind: Vt.SCHEMA_DEFINITION,
                description: t,
                directives: n,
                operationTypes: r,
                loc: this.loc(e),
              };
            }),
            (t.parseOperationTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseOperationType();
              this.expectToken(Gt.COLON);
              var n = this.parseNamedType();
              return {
                kind: Vt.OPERATION_TYPE_DEFINITION,
                operation: t,
                type: n,
                loc: this.loc(e),
              };
            }),
            (t.parseScalarTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("scalar");
              var n = this.parseName(),
                r = this.parseDirectives(!0);
              return {
                kind: Vt.SCALAR_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: r,
                loc: this.loc(e),
              };
            }),
            (t.parseObjectTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("type");
              var n = this.parseName(),
                r = this.parseImplementsInterfaces(),
                o = this.parseDirectives(!0),
                i = this.parseFieldsDefinition();
              return {
                kind: Vt.OBJECT_TYPE_DEFINITION,
                description: t,
                name: n,
                interfaces: r,
                directives: o,
                fields: i,
                loc: this.loc(e),
              };
            }),
            (t.parseImplementsInterfaces = function () {
              var e;
              if (!this.expectOptionalKeyword("implements")) return [];
              if (
                !0 ===
                (null === (e = this._options) || void 0 === e
                  ? void 0
                  : e.allowLegacySDLImplementsInterfaces)
              ) {
                var t = [];
                this.expectOptionalToken(Gt.AMP);
                do {
                  t.push(this.parseNamedType());
                } while (
                  this.expectOptionalToken(Gt.AMP) ||
                  this.peek(Gt.NAME)
                );
                return t;
              }
              return this.delimitedMany(Gt.AMP, this.parseNamedType);
            }),
            (t.parseFieldsDefinition = function () {
              var e;
              return !0 ===
                (null === (e = this._options) || void 0 === e
                  ? void 0
                  : e.allowLegacySDLEmptyFields) &&
                this.peek(Gt.BRACE_L) &&
                this._lexer.lookahead().kind === Gt.BRACE_R
                ? (this._lexer.advance(), this._lexer.advance(), [])
                : this.optionalMany(
                    Gt.BRACE_L,
                    this.parseFieldDefinition,
                    Gt.BRACE_R
                  );
            }),
            (t.parseFieldDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription(),
                n = this.parseName(),
                r = this.parseArgumentDefs();
              this.expectToken(Gt.COLON);
              var o = this.parseTypeReference(),
                i = this.parseDirectives(!0);
              return {
                kind: Vt.FIELD_DEFINITION,
                description: t,
                name: n,
                arguments: r,
                type: o,
                directives: i,
                loc: this.loc(e),
              };
            }),
            (t.parseArgumentDefs = function () {
              return this.optionalMany(
                Gt.PAREN_L,
                this.parseInputValueDef,
                Gt.PAREN_R
              );
            }),
            (t.parseInputValueDef = function () {
              var e = this._lexer.token,
                t = this.parseDescription(),
                n = this.parseName();
              this.expectToken(Gt.COLON);
              var r,
                o = this.parseTypeReference();
              this.expectOptionalToken(Gt.EQUALS) &&
                (r = this.parseValueLiteral(!0));
              var i = this.parseDirectives(!0);
              return {
                kind: Vt.INPUT_VALUE_DEFINITION,
                description: t,
                name: n,
                type: o,
                defaultValue: r,
                directives: i,
                loc: this.loc(e),
              };
            }),
            (t.parseInterfaceTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("interface");
              var n = this.parseName(),
                r = this.parseImplementsInterfaces(),
                o = this.parseDirectives(!0),
                i = this.parseFieldsDefinition();
              return {
                kind: Vt.INTERFACE_TYPE_DEFINITION,
                description: t,
                name: n,
                interfaces: r,
                directives: o,
                fields: i,
                loc: this.loc(e),
              };
            }),
            (t.parseUnionTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("union");
              var n = this.parseName(),
                r = this.parseDirectives(!0),
                o = this.parseUnionMemberTypes();
              return {
                kind: Vt.UNION_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: r,
                types: o,
                loc: this.loc(e),
              };
            }),
            (t.parseUnionMemberTypes = function () {
              return this.expectOptionalToken(Gt.EQUALS)
                ? this.delimitedMany(Gt.PIPE, this.parseNamedType)
                : [];
            }),
            (t.parseEnumTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("enum");
              var n = this.parseName(),
                r = this.parseDirectives(!0),
                o = this.parseEnumValuesDefinition();
              return {
                kind: Vt.ENUM_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: r,
                values: o,
                loc: this.loc(e),
              };
            }),
            (t.parseEnumValuesDefinition = function () {
              return this.optionalMany(
                Gt.BRACE_L,
                this.parseEnumValueDefinition,
                Gt.BRACE_R
              );
            }),
            (t.parseEnumValueDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription(),
                n = this.parseName(),
                r = this.parseDirectives(!0);
              return {
                kind: Vt.ENUM_VALUE_DEFINITION,
                description: t,
                name: n,
                directives: r,
                loc: this.loc(e),
              };
            }),
            (t.parseInputObjectTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("input");
              var n = this.parseName(),
                r = this.parseDirectives(!0),
                o = this.parseInputFieldsDefinition();
              return {
                kind: Vt.INPUT_OBJECT_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: r,
                fields: o,
                loc: this.loc(e),
              };
            }),
            (t.parseInputFieldsDefinition = function () {
              return this.optionalMany(
                Gt.BRACE_L,
                this.parseInputValueDef,
                Gt.BRACE_R
              );
            }),
            (t.parseTypeSystemExtension = function () {
              var e = this._lexer.lookahead();
              if (e.kind === Gt.NAME)
                switch (e.value) {
                  case "schema":
                    return this.parseSchemaExtension();
                  case "scalar":
                    return this.parseScalarTypeExtension();
                  case "type":
                    return this.parseObjectTypeExtension();
                  case "interface":
                    return this.parseInterfaceTypeExtension();
                  case "union":
                    return this.parseUnionTypeExtension();
                  case "enum":
                    return this.parseEnumTypeExtension();
                  case "input":
                    return this.parseInputObjectTypeExtension();
                }
              throw this.unexpected(e);
            }),
            (t.parseSchemaExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("schema");
              var t = this.parseDirectives(!0),
                n = this.optionalMany(
                  Gt.BRACE_L,
                  this.parseOperationTypeDefinition,
                  Gt.BRACE_R
                );
              if (0 === t.length && 0 === n.length) throw this.unexpected();
              return {
                kind: Vt.SCHEMA_EXTENSION,
                directives: t,
                operationTypes: n,
                loc: this.loc(e),
              };
            }),
            (t.parseScalarTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("scalar");
              var t = this.parseName(),
                n = this.parseDirectives(!0);
              if (0 === n.length) throw this.unexpected();
              return {
                kind: Vt.SCALAR_TYPE_EXTENSION,
                name: t,
                directives: n,
                loc: this.loc(e),
              };
            }),
            (t.parseObjectTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("type");
              var t = this.parseName(),
                n = this.parseImplementsInterfaces(),
                r = this.parseDirectives(!0),
                o = this.parseFieldsDefinition();
              if (0 === n.length && 0 === r.length && 0 === o.length)
                throw this.unexpected();
              return {
                kind: Vt.OBJECT_TYPE_EXTENSION,
                name: t,
                interfaces: n,
                directives: r,
                fields: o,
                loc: this.loc(e),
              };
            }),
            (t.parseInterfaceTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("interface");
              var t = this.parseName(),
                n = this.parseImplementsInterfaces(),
                r = this.parseDirectives(!0),
                o = this.parseFieldsDefinition();
              if (0 === n.length && 0 === r.length && 0 === o.length)
                throw this.unexpected();
              return {
                kind: Vt.INTERFACE_TYPE_EXTENSION,
                name: t,
                interfaces: n,
                directives: r,
                fields: o,
                loc: this.loc(e),
              };
            }),
            (t.parseUnionTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("union");
              var t = this.parseName(),
                n = this.parseDirectives(!0),
                r = this.parseUnionMemberTypes();
              if (0 === n.length && 0 === r.length) throw this.unexpected();
              return {
                kind: Vt.UNION_TYPE_EXTENSION,
                name: t,
                directives: n,
                types: r,
                loc: this.loc(e),
              };
            }),
            (t.parseEnumTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("enum");
              var t = this.parseName(),
                n = this.parseDirectives(!0),
                r = this.parseEnumValuesDefinition();
              if (0 === n.length && 0 === r.length) throw this.unexpected();
              return {
                kind: Vt.ENUM_TYPE_EXTENSION,
                name: t,
                directives: n,
                values: r,
                loc: this.loc(e),
              };
            }),
            (t.parseInputObjectTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("input");
              var t = this.parseName(),
                n = this.parseDirectives(!0),
                r = this.parseInputFieldsDefinition();
              if (0 === n.length && 0 === r.length) throw this.unexpected();
              return {
                kind: Vt.INPUT_OBJECT_TYPE_EXTENSION,
                name: t,
                directives: n,
                fields: r,
                loc: this.loc(e),
              };
            }),
            (t.parseDirectiveDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("directive"), this.expectToken(Gt.AT);
              var n = this.parseName(),
                r = this.parseArgumentDefs(),
                o = this.expectOptionalKeyword("repeatable");
              this.expectKeyword("on");
              var i = this.parseDirectiveLocations();
              return {
                kind: Vt.DIRECTIVE_DEFINITION,
                description: t,
                name: n,
                arguments: r,
                repeatable: o,
                locations: i,
                loc: this.loc(e),
              };
            }),
            (t.parseDirectiveLocations = function () {
              return this.delimitedMany(Gt.PIPE, this.parseDirectiveLocation);
            }),
            (t.parseDirectiveLocation = function () {
              var e = this._lexer.token,
                t = this.parseName();
              if (void 0 !== nn[t.value]) return t;
              throw this.unexpected(e);
            }),
            (t.loc = function (e) {
              var t;
              if (
                !0 !==
                (null === (t = this._options) || void 0 === t
                  ? void 0
                  : t.noLocation)
              )
                return new Bt(e, this._lexer.lastToken, this._lexer.source);
            }),
            (t.peek = function (e) {
              return this._lexer.token.kind === e;
            }),
            (t.expectToken = function (e) {
              var t = this._lexer.token;
              if (t.kind === e) return this._lexer.advance(), t;
              throw $t(
                this._lexer.source,
                t.start,
                "Expected ".concat(wn(e), ", found ").concat(bn(t), ".")
              );
            }),
            (t.expectOptionalToken = function (e) {
              var t = this._lexer.token;
              if (t.kind === e) return this._lexer.advance(), t;
            }),
            (t.expectKeyword = function (e) {
              var t = this._lexer.token;
              if (t.kind !== Gt.NAME || t.value !== e)
                throw $t(
                  this._lexer.source,
                  t.start,
                  'Expected "'.concat(e, '", found ').concat(bn(t), ".")
                );
              this._lexer.advance();
            }),
            (t.expectOptionalKeyword = function (e) {
              var t = this._lexer.token;
              return (
                t.kind === Gt.NAME &&
                t.value === e &&
                (this._lexer.advance(), !0)
              );
            }),
            (t.unexpected = function (e) {
              var t = null !== e && void 0 !== e ? e : this._lexer.token;
              return $t(
                this._lexer.source,
                t.start,
                "Unexpected ".concat(bn(t), ".")
              );
            }),
            (t.any = function (e, t, n) {
              this.expectToken(e);
              for (var r = []; !this.expectOptionalToken(n); )
                r.push(t.call(this));
              return r;
            }),
            (t.optionalMany = function (e, t, n) {
              if (this.expectOptionalToken(e)) {
                var r = [];
                do {
                  r.push(t.call(this));
                } while (!this.expectOptionalToken(n));
                return r;
              }
              return [];
            }),
            (t.many = function (e, t, n) {
              this.expectToken(e);
              var r = [];
              do {
                r.push(t.call(this));
              } while (!this.expectOptionalToken(n));
              return r;
            }),
            (t.delimitedMany = function (e, t) {
              this.expectOptionalToken(e);
              var n = [];
              do {
                n.push(t.call(this));
              } while (this.expectOptionalToken(e));
              return n;
            }),
            e
          );
        })();
        function bn(e) {
          var t = e.value;
          return wn(e.kind) + (null != t ? ' "'.concat(t, '"') : "");
        }
        function wn(e) {
          return (function (e) {
            return (
              e === Gt.BANG ||
              e === Gt.DOLLAR ||
              e === Gt.AMP ||
              e === Gt.PAREN_L ||
              e === Gt.PAREN_R ||
              e === Gt.SPREAD ||
              e === Gt.COLON ||
              e === Gt.EQUALS ||
              e === Gt.AT ||
              e === Gt.BRACKET_L ||
              e === Gt.BRACKET_R ||
              e === Gt.BRACE_L ||
              e === Gt.PIPE ||
              e === Gt.BRACE_R
            );
          })(e)
            ? '"'.concat(e, '"')
            : e;
        }
        var Sn = {
            Name: [],
            Document: ["definitions"],
            OperationDefinition: [
              "name",
              "variableDefinitions",
              "directives",
              "selectionSet",
            ],
            VariableDefinition: [
              "variable",
              "type",
              "defaultValue",
              "directives",
            ],
            Variable: ["name"],
            SelectionSet: ["selections"],
            Field: ["alias", "name", "arguments", "directives", "selectionSet"],
            Argument: ["name", "value"],
            FragmentSpread: ["name", "directives"],
            InlineFragment: ["typeCondition", "directives", "selectionSet"],
            FragmentDefinition: [
              "name",
              "variableDefinitions",
              "typeCondition",
              "directives",
              "selectionSet",
            ],
            IntValue: [],
            FloatValue: [],
            StringValue: [],
            BooleanValue: [],
            NullValue: [],
            EnumValue: [],
            ListValue: ["values"],
            ObjectValue: ["fields"],
            ObjectField: ["name", "value"],
            Directive: ["name", "arguments"],
            NamedType: ["name"],
            ListType: ["type"],
            NonNullType: ["type"],
            SchemaDefinition: ["description", "directives", "operationTypes"],
            OperationTypeDefinition: ["type"],
            ScalarTypeDefinition: ["description", "name", "directives"],
            ObjectTypeDefinition: [
              "description",
              "name",
              "interfaces",
              "directives",
              "fields",
            ],
            FieldDefinition: [
              "description",
              "name",
              "arguments",
              "type",
              "directives",
            ],
            InputValueDefinition: [
              "description",
              "name",
              "type",
              "defaultValue",
              "directives",
            ],
            InterfaceTypeDefinition: [
              "description",
              "name",
              "interfaces",
              "directives",
              "fields",
            ],
            UnionTypeDefinition: ["description", "name", "directives", "types"],
            EnumTypeDefinition: ["description", "name", "directives", "values"],
            EnumValueDefinition: ["description", "name", "directives"],
            InputObjectTypeDefinition: [
              "description",
              "name",
              "directives",
              "fields",
            ],
            DirectiveDefinition: [
              "description",
              "name",
              "arguments",
              "locations",
            ],
            SchemaExtension: ["directives", "operationTypes"],
            ScalarTypeExtension: ["name", "directives"],
            ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
            InterfaceTypeExtension: [
              "name",
              "interfaces",
              "directives",
              "fields",
            ],
            UnionTypeExtension: ["name", "directives", "types"],
            EnumTypeExtension: ["name", "directives", "values"],
            InputObjectTypeExtension: ["name", "directives", "fields"],
          },
          kn = Object.freeze({});
        function En(e, t, n) {
          var r = e[t];
          if (r) {
            if (!n && "function" === typeof r) return r;
            var o = n ? r.leave : r.enter;
            if ("function" === typeof o) return o;
          } else {
            var i = n ? e.leave : e.enter;
            if (i) {
              if ("function" === typeof i) return i;
              var a = i[t];
              if ("function" === typeof a) return a;
            }
          }
        }
        function Tn(e) {
          return (function (e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : Sn,
              r = void 0,
              o = Array.isArray(e),
              i = [e],
              a = -1,
              s = [],
              l = void 0,
              u = void 0,
              c = void 0,
              d = [],
              f = [],
              p = e;
            do {
              var h = ++a === i.length,
                m = h && 0 !== s.length;
              if (h) {
                if (
                  ((u = 0 === f.length ? void 0 : d[d.length - 1]),
                  (l = c),
                  (c = f.pop()),
                  m)
                ) {
                  if (o) l = l.slice();
                  else {
                    for (
                      var v = {}, y = 0, g = Object.keys(l);
                      y < g.length;
                      y++
                    ) {
                      var b = g[y];
                      v[b] = l[b];
                    }
                    l = v;
                  }
                  for (var w = 0, S = 0; S < s.length; S++) {
                    var k = s[S][0],
                      E = s[S][1];
                    o && (k -= w),
                      o && null === E ? (l.splice(k, 1), w++) : (l[k] = E);
                  }
                }
                (a = r.index),
                  (i = r.keys),
                  (s = r.edits),
                  (o = r.inArray),
                  (r = r.prev);
              } else {
                if (
                  ((u = c ? (o ? a : i[a]) : void 0),
                  null === (l = c ? c[u] : p) || void 0 === l)
                )
                  continue;
                c && d.push(u);
              }
              var T,
                A = void 0;
              if (!Array.isArray(l)) {
                if (!Wt(l))
                  throw new Error("Invalid AST Node: ".concat(Yt(l), "."));
                var _ = En(t, l.kind, h);
                if (_) {
                  if ((A = _.call(t, l, u, c, d, f)) === kn) break;
                  if (!1 === A) {
                    if (!h) {
                      d.pop();
                      continue;
                    }
                  } else if (void 0 !== A && (s.push([u, A]), !h)) {
                    if (!Wt(A)) {
                      d.pop();
                      continue;
                    }
                    l = A;
                  }
                }
              }
              void 0 === A && m && s.push([u, l]),
                h
                  ? d.pop()
                  : ((r = { inArray: o, index: a, keys: i, edits: s, prev: r }),
                    (i = (o = Array.isArray(l))
                      ? l
                      : null !== (T = n[l.kind]) && void 0 !== T
                      ? T
                      : []),
                    (a = -1),
                    (s = []),
                    c && f.push(c),
                    (c = l));
            } while (void 0 !== r);
            return 0 !== s.length && (p = s[s.length - 1][1]), p;
          })(e, { leave: An });
        }
        var An = {
          Name: function (e) {
            return e.value;
          },
          Variable: function (e) {
            return "$" + e.name;
          },
          Document: function (e) {
            return In(e.definitions, "\n\n") + "\n";
          },
          OperationDefinition: function (e) {
            var t = e.operation,
              n = e.name,
              r = xn("(", In(e.variableDefinitions, ", "), ")"),
              o = In(e.directives, " "),
              i = e.selectionSet;
            return n || o || r || "query" !== t
              ? In([t, In([n, r]), o, i], " ")
              : i;
          },
          VariableDefinition: function (e) {
            var t = e.variable,
              n = e.type,
              r = e.defaultValue,
              o = e.directives;
            return t + ": " + n + xn(" = ", r) + xn(" ", In(o, " "));
          },
          SelectionSet: function (e) {
            return Cn(e.selections);
          },
          Field: function (e) {
            var t = e.alias,
              n = e.name,
              r = e.arguments,
              o = e.directives,
              i = e.selectionSet,
              a = xn("", t, ": ") + n,
              s = a + xn("(", In(r, ", "), ")");
            return (
              s.length > 80 && (s = a + xn("(\n", Nn(In(r, "\n")), "\n)")),
              In([s, In(o, " "), i], " ")
            );
          },
          Argument: function (e) {
            return e.name + ": " + e.value;
          },
          FragmentSpread: function (e) {
            return "..." + e.name + xn(" ", In(e.directives, " "));
          },
          InlineFragment: function (e) {
            var t = e.typeCondition,
              n = e.directives,
              r = e.selectionSet;
            return In(["...", xn("on ", t), In(n, " "), r], " ");
          },
          FragmentDefinition: function (e) {
            var t = e.name,
              n = e.typeCondition,
              r = e.variableDefinitions,
              o = e.directives,
              i = e.selectionSet;
            return (
              "fragment ".concat(t).concat(xn("(", In(r, ", "), ")"), " ") +
              "on ".concat(n, " ").concat(xn("", In(o, " "), " ")) +
              i
            );
          },
          IntValue: function (e) {
            return e.value;
          },
          FloatValue: function (e) {
            return e.value;
          },
          StringValue: function (e, t) {
            var n = e.value;
            return e.block
              ? (function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : "",
                    n =
                      arguments.length > 2 &&
                      void 0 !== arguments[2] &&
                      arguments[2],
                    r = -1 === e.indexOf("\n"),
                    o = " " === e[0] || "\t" === e[0],
                    i = '"' === e[e.length - 1],
                    a = "\\" === e[e.length - 1],
                    s = !r || i || a || n,
                    l = "";
                  return (
                    !s || (r && o) || (l += "\n" + t),
                    (l += t ? e.replace(/\n/g, "\n" + t) : e),
                    s && (l += "\n"),
                    '"""' + l.replace(/"""/g, '\\"""') + '"""'
                  );
                })(n, "description" === t ? "" : "  ")
              : JSON.stringify(n);
          },
          BooleanValue: function (e) {
            return e.value ? "true" : "false";
          },
          NullValue: function () {
            return "null";
          },
          EnumValue: function (e) {
            return e.value;
          },
          ListValue: function (e) {
            return "[" + In(e.values, ", ") + "]";
          },
          ObjectValue: function (e) {
            return "{" + In(e.fields, ", ") + "}";
          },
          ObjectField: function (e) {
            return e.name + ": " + e.value;
          },
          Directive: function (e) {
            return "@" + e.name + xn("(", In(e.arguments, ", "), ")");
          },
          NamedType: function (e) {
            return e.name;
          },
          ListType: function (e) {
            return "[" + e.type + "]";
          },
          NonNullType: function (e) {
            return e.type + "!";
          },
          SchemaDefinition: _n(function (e) {
            var t = e.directives,
              n = e.operationTypes;
            return In(["schema", In(t, " "), Cn(n)], " ");
          }),
          OperationTypeDefinition: function (e) {
            return e.operation + ": " + e.type;
          },
          ScalarTypeDefinition: _n(function (e) {
            return In(["scalar", e.name, In(e.directives, " ")], " ");
          }),
          ObjectTypeDefinition: _n(function (e) {
            var t = e.name,
              n = e.interfaces,
              r = e.directives,
              o = e.fields;
            return In(
              ["type", t, xn("implements ", In(n, " & ")), In(r, " "), Cn(o)],
              " "
            );
          }),
          FieldDefinition: _n(function (e) {
            var t = e.name,
              n = e.arguments,
              r = e.type,
              o = e.directives;
            return (
              t +
              (Dn(n)
                ? xn("(\n", Nn(In(n, "\n")), "\n)")
                : xn("(", In(n, ", "), ")")) +
              ": " +
              r +
              xn(" ", In(o, " "))
            );
          }),
          InputValueDefinition: _n(function (e) {
            var t = e.name,
              n = e.type,
              r = e.defaultValue,
              o = e.directives;
            return In([t + ": " + n, xn("= ", r), In(o, " ")], " ");
          }),
          InterfaceTypeDefinition: _n(function (e) {
            var t = e.name,
              n = e.interfaces,
              r = e.directives,
              o = e.fields;
            return In(
              [
                "interface",
                t,
                xn("implements ", In(n, " & ")),
                In(r, " "),
                Cn(o),
              ],
              " "
            );
          }),
          UnionTypeDefinition: _n(function (e) {
            var t = e.name,
              n = e.directives,
              r = e.types;
            return In(
              [
                "union",
                t,
                In(n, " "),
                r && 0 !== r.length ? "= " + In(r, " | ") : "",
              ],
              " "
            );
          }),
          EnumTypeDefinition: _n(function (e) {
            var t = e.name,
              n = e.directives,
              r = e.values;
            return In(["enum", t, In(n, " "), Cn(r)], " ");
          }),
          EnumValueDefinition: _n(function (e) {
            return In([e.name, In(e.directives, " ")], " ");
          }),
          InputObjectTypeDefinition: _n(function (e) {
            var t = e.name,
              n = e.directives,
              r = e.fields;
            return In(["input", t, In(n, " "), Cn(r)], " ");
          }),
          DirectiveDefinition: _n(function (e) {
            var t = e.name,
              n = e.arguments,
              r = e.repeatable,
              o = e.locations;
            return (
              "directive @" +
              t +
              (Dn(n)
                ? xn("(\n", Nn(In(n, "\n")), "\n)")
                : xn("(", In(n, ", "), ")")) +
              (r ? " repeatable" : "") +
              " on " +
              In(o, " | ")
            );
          }),
          SchemaExtension: function (e) {
            var t = e.directives,
              n = e.operationTypes;
            return In(["extend schema", In(t, " "), Cn(n)], " ");
          },
          ScalarTypeExtension: function (e) {
            return In(["extend scalar", e.name, In(e.directives, " ")], " ");
          },
          ObjectTypeExtension: function (e) {
            var t = e.name,
              n = e.interfaces,
              r = e.directives,
              o = e.fields;
            return In(
              [
                "extend type",
                t,
                xn("implements ", In(n, " & ")),
                In(r, " "),
                Cn(o),
              ],
              " "
            );
          },
          InterfaceTypeExtension: function (e) {
            var t = e.name,
              n = e.interfaces,
              r = e.directives,
              o = e.fields;
            return In(
              [
                "extend interface",
                t,
                xn("implements ", In(n, " & ")),
                In(r, " "),
                Cn(o),
              ],
              " "
            );
          },
          UnionTypeExtension: function (e) {
            var t = e.name,
              n = e.directives,
              r = e.types;
            return In(
              [
                "extend union",
                t,
                In(n, " "),
                r && 0 !== r.length ? "= " + In(r, " | ") : "",
              ],
              " "
            );
          },
          EnumTypeExtension: function (e) {
            var t = e.name,
              n = e.directives,
              r = e.values;
            return In(["extend enum", t, In(n, " "), Cn(r)], " ");
          },
          InputObjectTypeExtension: function (e) {
            var t = e.name,
              n = e.directives,
              r = e.fields;
            return In(["extend input", t, In(n, " "), Cn(r)], " ");
          },
        };
        function _n(e) {
          return function (t) {
            return In([t.description, e(t)], "\n");
          };
        }
        function In(e) {
          var t,
            n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "";
          return null !==
            (t =
              null === e || void 0 === e
                ? void 0
                : e
                    .filter(function (e) {
                      return e;
                    })
                    .join(n)) && void 0 !== t
            ? t
            : "";
        }
        function Cn(e) {
          return xn("{\n", Nn(In(e, "\n")), "\n}");
        }
        function xn(e, t) {
          return null != t && "" !== t
            ? e +
                t +
                (arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : "")
            : "";
        }
        function Nn(e) {
          return xn("  ", e.replace(/\n/g, "\n  "));
        }
        function On(e) {
          return -1 !== e.indexOf("\n");
        }
        function Dn(e) {
          return null != e && e.some(On);
        }
        var Pn = function (e) {
          return e && "number" === typeof e.length && "function" !== typeof e;
        };
        function Rn(e) {
          return i(null === e || void 0 === e ? void 0 : e.then);
        }
        function Ln(e) {
          return i(e[et]);
        }
        function Mn(e) {
          return (
            Symbol.asyncIterator &&
            i(null === e || void 0 === e ? void 0 : e[Symbol.asyncIterator])
          );
        }
        function Fn(e) {
          return new TypeError(
            "You provided " +
              (null !== e && "object" === typeof e
                ? "an invalid object"
                : "'" + e + "'") +
              " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
          );
        }
        var Un =
          "function" === typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : "@@iterator";
        function jn(e) {
          return i(null === e || void 0 === e ? void 0 : e[Un]);
        }
        function zn(e) {
          return (0, s.AQ)(this, arguments, function () {
            var t, n, r;
            return (0, s.YH)(this, function (o) {
              switch (o.label) {
                case 0:
                  (t = e.getReader()), (o.label = 1);
                case 1:
                  o.trys.push([1, , 9, 10]), (o.label = 2);
                case 2:
                  return [4, (0, s.N3)(t.read())];
                case 3:
                  return (
                    (n = o.sent()),
                    (r = n.value),
                    n.done ? [4, (0, s.N3)(void 0)] : [3, 5]
                  );
                case 4:
                  return [2, o.sent()];
                case 5:
                  return [4, (0, s.N3)(r)];
                case 6:
                  return [4, o.sent()];
                case 7:
                  return o.sent(), [3, 2];
                case 8:
                  return [3, 10];
                case 9:
                  return t.releaseLock(), [7];
                case 10:
                  return [2];
              }
            });
          });
        }
        function $n(e) {
          return i(null === e || void 0 === e ? void 0 : e.getReader);
        }
        function Vn(e) {
          if (e instanceof rt) return e;
          if (null != e) {
            if (Ln(e))
              return (
                (o = e),
                new rt(function (e) {
                  var t = o[et]();
                  if (i(t.subscribe)) return t.subscribe(e);
                  throw new TypeError(
                    "Provided object does not correctly implement Symbol.observable"
                  );
                })
              );
            if (Pn(e))
              return (
                (r = e),
                new rt(function (e) {
                  for (var t = 0; t < r.length && !e.closed; t++) e.next(r[t]);
                  e.complete();
                })
              );
            if (Rn(e))
              return (
                (n = e),
                new rt(function (e) {
                  n.then(
                    function (t) {
                      e.closed || (e.next(t), e.complete());
                    },
                    function (t) {
                      return e.error(t);
                    }
                  ).then(null, m);
                })
              );
            if (Mn(e)) return Kn(e);
            if (jn(e))
              return (
                (t = e),
                new rt(function (e) {
                  var n, r;
                  try {
                    for (
                      var o = (0, s.Ju)(t), i = o.next();
                      !i.done;
                      i = o.next()
                    ) {
                      var a = i.value;
                      if ((e.next(a), e.closed)) return;
                    }
                  } catch (l) {
                    n = { error: l };
                  } finally {
                    try {
                      i && !i.done && (r = o.return) && r.call(o);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
                  e.complete();
                })
              );
            if ($n(e)) return Kn(zn(e));
          }
          var t, n, r, o;
          throw Fn(e);
        }
        function Kn(e) {
          return new rt(function (t) {
            (function (e, t) {
              var n, r, o, i;
              return (0, s.sH)(this, void 0, void 0, function () {
                var a, l;
                return (0, s.YH)(this, function (u) {
                  switch (u.label) {
                    case 0:
                      u.trys.push([0, 5, 6, 11]),
                        (n = (0, s.xN)(e)),
                        (u.label = 1);
                    case 1:
                      return [4, n.next()];
                    case 2:
                      if ((r = u.sent()).done) return [3, 4];
                      if (((a = r.value), t.next(a), t.closed)) return [2];
                      u.label = 3;
                    case 3:
                      return [3, 1];
                    case 4:
                      return [3, 11];
                    case 5:
                      return (l = u.sent()), (o = { error: l }), [3, 11];
                    case 6:
                      return (
                        u.trys.push([6, , 9, 10]),
                        r && !r.done && (i = n.return) ? [4, i.call(n)] : [3, 8]
                      );
                    case 7:
                      u.sent(), (u.label = 8);
                    case 8:
                      return [3, 10];
                    case 9:
                      if (o) throw o.error;
                      return [7];
                    case 10:
                      return [7];
                    case 11:
                      return t.complete(), [2];
                  }
                });
              });
            })(e, t).catch(function (e) {
              return t.error(e);
            });
          });
        }
        function qn(e) {
          return a(function (t, n) {
            var r,
              o = null,
              i = !1;
            (o = t.subscribe(
              C(n, void 0, void 0, function (a) {
                (r = Vn(e(a, qn(e)(t)))),
                  o ? (o.unsubscribe(), (o = null), r.subscribe(n)) : (i = !0);
              })
            )),
              i && (o.unsubscribe(), (o = null), r.subscribe(n));
          });
        }
        var Bn = n(80727),
          Hn = n(14486),
          Wn = n(71439);
        class Gn extends Wn.x {
          get response() {
            return this._response ? Qn(this._response) : void 0;
          }
          constructor(e) {
            super(e),
              (this.constructor = Gn),
              Object.setPrototypeOf(this, Gn.prototype),
              e.response && (this._response = e.response);
          }
        }
        const Qn = (e) =>
          (0, r.A)((0, r.A)({}, e), {}, { headers: (0, r.A)({}, e.headers) });
        class Yn extends Gn {
          constructor(e) {
            super(e),
              (this.constructor = Yn),
              Object.setPrototypeOf(this, Yn.prototype);
          }
        }
        class Jn extends Yn {
          constructor() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            super(
              (0, r.A)(
                {
                  name: "CanceledError",
                  message: "Request is canceled by user",
                },
                e
              )
            ),
              (this.constructor = Jn),
              Object.setPrototypeOf(this, Jn.prototype);
          }
        }
        const Xn = (e) => !!e && e instanceof Jn;
        var Zn;
        !(function (e) {
          e.InvalidApiName = "InvalidApiName";
        })(Zn || (Zn = {}));
        Zn.InvalidApiName;
        var er = n(1068);
        const tr = async (e) => {
            if (!e) return;
            const t = await (0, er.F)(nr(e));
            if (t) {
              var n;
              const r = await (null === (n = e.body) || void 0 === n
                ? void 0
                : n.text());
              return rr(t, {
                statusCode: e.statusCode,
                headers: e.headers,
                body: r,
              });
            }
          },
          nr = (e) => {
            let t;
            const n = new Proxy(e.body, {
              get: (e, n, r) =>
                "json" === n
                  ? async () => {
                      t || (t = e.text());
                      try {
                        return JSON.parse(await t);
                      } catch (n) {
                        return {};
                      }
                    }
                  : "text" === n
                  ? async () => (t || (t = e.text()), t)
                  : Reflect.get(e, n, r),
            });
            return new Proxy(e, {
              get: (e, t, r) => ("body" === t ? n : Reflect.get(e, t, r)),
            });
          },
          rr = (e, t) => {
            const n = new Yn({
              name: null === e || void 0 === e ? void 0 : e.name,
              message: e.message,
              underlyingError: e,
              response: t,
            });
            return Object.assign(n, { $metadata: e.$metadata });
          };
        var or = n(44619);
        const ir = new or.C("RestApis");
        var ar = n(35122),
          sr = n(41297),
          lr = n(17662),
          ur = n(55122),
          cr = n(48012),
          dr = n(45909),
          fr = n(95634);
        const pr = (0, dr.q)(fr.Q, [cr.L, lr.b, ur.I]);
        var hr = n(53060);
        const mr = "execute-api",
          vr = "us-east-1",
          yr = /^.+\.([a-z0-9-]+)\.([a-z0-9-]+)\.amazonaws\.com/,
          gr = async (e, t, n, o) => {
            const {
                url: i,
                method: a,
                headers: s,
                body: l,
                withCredentials: u,
                abortSignal: c,
              } = t,
              d = l
                ? l instanceof FormData
                  ? l
                  : JSON.stringify(null !== l && void 0 !== l ? l : "")
                : void 0,
              f = ((e, t) => {
                const n = {};
                for (const r in e) n[r.toLowerCase()] = e[r];
                return (
                  t &&
                    ((n["content-type"] = "application/json; charset=UTF-8"),
                    t instanceof FormData && delete n["content-type"]),
                  n
                );
              })(s, l),
              p = { url: i, headers: f, method: a, body: d },
              h = {
                retryDecider: (0, ar.D)(tr),
                computeDelay: sr.y,
                withCrossDomainCredentials: u,
                abortSignal: c,
              },
              m = n(p, o);
            let v;
            const y = await br(e);
            if (m && y) {
              var g, b;
              const e = ((e, t) => {
                  var n, r, o;
                  const { service: i = mr, region: a = vr } =
                      null !==
                        (n =
                          null === t ||
                          void 0 === t ||
                          null === (r = t.amplify.getConfig()) ||
                          void 0 === r ||
                          null === (r = r.API) ||
                          void 0 === r ||
                          null === (r = r.REST) ||
                          void 0 === r
                            ? void 0
                            : r[
                                null === t || void 0 === t ? void 0 : t.apiName
                              ]) && void 0 !== n
                        ? n
                        : {},
                    { hostname: s } = e,
                    [, l, u] =
                      null !== (o = yr.exec(s)) && void 0 !== o ? o : [];
                  return l === mr
                    ? { service: l, region: null !== u && void 0 !== u ? u : a }
                    : "appsync-api" === l
                    ? {
                        service: "appsync",
                        region: null !== u && void 0 !== u ? u : a,
                      }
                    : { service: i, region: a };
                })(i),
                t =
                  null !==
                    (g = null === o || void 0 === o ? void 0 : o.service) &&
                  void 0 !== g
                    ? g
                    : e.service,
                n =
                  null !==
                    (b = null === o || void 0 === o ? void 0 : o.region) &&
                  void 0 !== b
                    ? b
                    : e.region;
              v = await pr(
                p,
                (0, r.A)(
                  (0, r.A)({}, h),
                  {},
                  { credentials: y, region: n, service: t }
                )
              );
            } else v = await (0, hr.F)(p, (0, r.A)({}, h));
            return {
              statusCode: v.statusCode,
              headers: v.headers,
              body: v.body,
            };
          },
          br = async (e) => {
            try {
              const { credentials: t } = await e.Auth.fetchAuthSession();
              if (t) return t;
            } catch (t) {
              ir.debug(
                "No credentials available, the request will be unsigned."
              );
            }
            return null;
          },
          wr = (e, t) => {
            let { headers: n } = e;
            return !n.authorization && !n["x-api-key"] && !!t;
          },
          Sr = new WeakMap(),
          kr = (e, t) => {
            let { url: n, options: o, abortController: i } = t;
            const a = null !== i && void 0 !== i ? i : new AbortController(),
              s = (function (e, t) {
                const n = (e) => !!t,
                  o = new AbortController(),
                  i = o.signal,
                  a = null === t || void 0 === t ? void 0 : t.signal;
                let s;
                const l = async () => {
                  try {
                    const t = await (n() ? e() : e(i));
                    if (t.statusCode >= 300) throw await tr(t);
                    return t;
                  } catch (o) {
                    var t;
                    const e = null !== a && void 0 !== a ? a : i,
                      n = null !== (t = s) && void 0 !== t ? t : e.reason;
                    if (
                      "AbortError" === o.name ||
                      !0 === (null === e || void 0 === e ? void 0 : e.aborted)
                    ) {
                      const e = new Jn(
                        (0, r.A)(
                          (0, r.A)({}, n && { message: n }),
                          {},
                          {
                            underlyingError: o,
                            recoverySuggestion:
                              "The API request was explicitly canceled. If this is not intended, validate if you called the `cancel()` function on the API request erroneously.",
                          }
                        )
                      );
                      throw (ir.debug(o), e);
                    }
                    throw (ir.debug(o), o);
                  }
                };
                if (n()) return l();
                {
                  const e = (e) => {
                    !0 !== i.aborted &&
                      (o.abort(e), e && i.reason !== e && (s = e));
                  };
                  return { response: l(), cancel: e };
                }
              })(
                async () =>
                  gr(
                    e,
                    (0, r.A)(
                      (0, r.A)({ url: n, method: "POST" }, o),
                      {},
                      { abortSignal: a.signal }
                    ),
                    wr,
                    null === o || void 0 === o ? void 0 : o.signingServiceInfo
                  ),
                a
              ),
              l = s.finally(() => {
                Sr.delete(l);
              });
            return l;
          },
          Er = (e, t) => {
            const n = Sr.get(e);
            return (
              !!n &&
              (n.abort(t),
              t && n.signal.reason !== t && (n.signal.reason = t),
              !0)
            );
          },
          Tr = (e, t) => {
            Sr.set(e, t);
          };
        var Ar = n(2206);
        const _r = [400, 401, 403],
          Ir = ["BadRequestException", "UnauthorizedException"];
        var Cr, xr, Nr;
        !(function (e) {
          (e.GQL_CONNECTION_INIT = "connection_init"),
            (e.GQL_CONNECTION_ERROR = "connection_error"),
            (e.GQL_CONNECTION_ACK = "connection_ack"),
            (e.GQL_START = "start"),
            (e.GQL_START_ACK = "start_ack"),
            (e.DATA = "data"),
            (e.GQL_CONNECTION_KEEP_ALIVE = "ka"),
            (e.GQL_STOP = "stop"),
            (e.GQL_COMPLETE = "complete"),
            (e.GQL_ERROR = "error"),
            (e.EVENT_SUBSCRIBE = "subscribe"),
            (e.EVENT_PUBLISH = "publish"),
            (e.EVENT_SUBSCRIBE_ACK = "subscribe_success"),
            (e.EVENT_PUBLISH_ACK = "publish_success"),
            (e.EVENT_STOP = "unsubscribe"),
            (e.EVENT_COMPLETE = "unsubscribe_success");
        })(Cr || (Cr = {})),
          (function (e) {
            (e[(e.PENDING = 0)] = "PENDING"),
              (e[(e.CONNECTED = 1)] = "CONNECTED"),
              (e[(e.FAILED = 2)] = "FAILED");
          })(xr || (xr = {})),
          (function (e) {
            (e[(e.CLOSED = 0)] = "CLOSED"),
              (e[(e.READY = 1)] = "READY"),
              (e[(e.CONNECTING = 2)] = "CONNECTING");
          })(Nr || (Nr = {}));
        const Or = {
            accept: "application/json, text/javascript",
            "content-encoding": "amz-1.0",
            "content-type": "application/json; charset=UTF-8",
          },
          Dr = 3e5;
        class Pr extends Error {
          constructor() {
            super(...arguments), (this.nonRetryable = !0);
          }
        }
        const Rr = {
          randomUUID:
            "undefined" !== typeof crypto &&
            crypto.randomUUID &&
            crypto.randomUUID.bind(crypto),
        };
        let Lr;
        const Mr = new Uint8Array(16);
        function Fr() {
          if (
            !Lr &&
            ((Lr =
              "undefined" !== typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)),
            !Lr)
          )
            throw new Error(
              "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
            );
          return Lr(Mr);
        }
        const Ur = [];
        for (let Jo = 0; Jo < 256; ++Jo)
          Ur.push((Jo + 256).toString(16).slice(1));
        function jr(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          return (
            Ur[e[t + 0]] +
            Ur[e[t + 1]] +
            Ur[e[t + 2]] +
            Ur[e[t + 3]] +
            "-" +
            Ur[e[t + 4]] +
            Ur[e[t + 5]] +
            "-" +
            Ur[e[t + 6]] +
            Ur[e[t + 7]] +
            "-" +
            Ur[e[t + 8]] +
            Ur[e[t + 9]] +
            "-" +
            Ur[e[t + 10]] +
            Ur[e[t + 11]] +
            Ur[e[t + 12]] +
            Ur[e[t + 13]] +
            Ur[e[t + 14]] +
            Ur[e[t + 15]]
          );
        }
        const zr = function (e, t, n) {
            if (Rr.randomUUID && !t && !e) return Rr.randomUUID();
            const r = (e = e || {}).random || (e.rng || Fr)();
            if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
              n = n || 0;
              for (let e = 0; e < 16; ++e) t[n + e] = r[e];
              return t;
            }
            return jr(r);
          },
          $r = (e) => e && e.nonRetryable;
        var Vr = n(10676),
          Kr = n(35567),
          qr = n(10679);
        const Br = new or.C("retryUtil");
        const Hr = function (e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : Kr.M,
            r = arguments.length > 3 ? arguments[3] : void 0;
          return (async function (e, t, n, r) {
            if ("function" !== typeof e)
              throw Error("functionToRetry must be a function");
            return new Promise(async (o, i) => {
              let a,
                s,
                l = 0,
                u = !1,
                c = () => {};
              for (
                r &&
                r.then(() => {
                  (u = !0), clearTimeout(a), c();
                });
                !u;

              ) {
                l++,
                  Br.debug(
                    ""
                      .concat(e.name, " attempt #")
                      .concat(l, " with this vars: ")
                      .concat(JSON.stringify(t))
                  );
                try {
                  return void o(await e(...t));
                } catch (d) {
                  if (((s = d), Br.debug("error on ".concat(e.name), d), $r(d)))
                    return (
                      Br.debug("".concat(e.name, " non retryable error"), d),
                      void i(d)
                    );
                  const r = n(l, t, d);
                  if (
                    (Br.debug(
                      "".concat(e.name, " retrying in ").concat(r, " ms")
                    ),
                    !1 === r || u)
                  )
                    return void i(d);
                  await new Promise((e) => {
                    (c = e), (a = setTimeout(c, r));
                  });
                }
              }
              i(s);
            });
          })(e, t, (0, qr.y)(n), r);
        };
        var Wr, Gr;
        function Qr(e, t, n, r, o) {
          void 0 === r && (r = 0), void 0 === o && (o = !1);
          var i = t.schedule(function () {
            n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
          }, r);
          if ((e.add(i), !o)) return i;
        }
        function Yr(e, t) {
          return (
            void 0 === t && (t = 0),
            a(function (n, r) {
              n.subscribe(
                C(
                  r,
                  function (n) {
                    return Qr(
                      r,
                      e,
                      function () {
                        return r.next(n);
                      },
                      t
                    );
                  },
                  function () {
                    return Qr(
                      r,
                      e,
                      function () {
                        return r.complete();
                      },
                      t
                    );
                  },
                  function (n) {
                    return Qr(
                      r,
                      e,
                      function () {
                        return r.error(n);
                      },
                      t
                    );
                  }
                )
              );
            })
          );
        }
        function Jr(e, t) {
          return (
            void 0 === t && (t = 0),
            a(function (n, r) {
              r.add(
                e.schedule(function () {
                  return n.subscribe(r);
                }, t)
              );
            })
          );
        }
        function Xr(e, t) {
          if (!e) throw new Error("Iterable cannot be null");
          return new rt(function (n) {
            Qr(n, t, function () {
              var r = e[Symbol.asyncIterator]();
              Qr(
                n,
                t,
                function () {
                  r.next().then(function (e) {
                    e.done ? n.complete() : n.next(e.value);
                  });
                },
                0,
                !0
              );
            });
          });
        }
        function Zr(e, t) {
          if (null != e) {
            if (Ln(e))
              return (function (e, t) {
                return Vn(e).pipe(Jr(t), Yr(t));
              })(e, t);
            if (Pn(e))
              return (function (e, t) {
                return new rt(function (n) {
                  var r = 0;
                  return t.schedule(function () {
                    r === e.length
                      ? n.complete()
                      : (n.next(e[r++]), n.closed || this.schedule());
                  });
                });
              })(e, t);
            if (Rn(e))
              return (function (e, t) {
                return Vn(e).pipe(Jr(t), Yr(t));
              })(e, t);
            if (Mn(e)) return Xr(e, t);
            if (jn(e))
              return (function (e, t) {
                return new rt(function (n) {
                  var r;
                  return (
                    Qr(n, t, function () {
                      (r = e[Un]()),
                        Qr(
                          n,
                          t,
                          function () {
                            var e, t, o;
                            try {
                              (t = (e = r.next()).value), (o = e.done);
                            } catch (i) {
                              return void n.error(i);
                            }
                            o ? n.complete() : n.next(t);
                          },
                          0,
                          !0
                        );
                    }),
                    function () {
                      return (
                        i(null === r || void 0 === r ? void 0 : r.return) &&
                        r.return()
                      );
                    }
                  );
                });
              })(e, t);
            if ($n(e))
              return (function (e, t) {
                return Xr(zn(e), t);
              })(e, t);
          }
          throw Fn(e);
        }
        !(function (e) {
          (e.CONNECTION_CLOSED = "Connection closed"),
            (e.CONNECTION_FAILED = "Connection failed"),
            (e.REALTIME_SUBSCRIPTION_INIT_ERROR =
              "AppSync Realtime subscription init error"),
            (e.SUBSCRIPTION_ACK = "Subscription ack"),
            (e.TIMEOUT_DISCONNECT = "Timeout disconnect");
        })(Wr || (Wr = {})),
          (function (e) {
            (e.Connected = "Connected"),
              (e.ConnectedPendingNetwork = "ConnectedPendingNetwork"),
              (e.ConnectionDisrupted = "ConnectionDisrupted"),
              (e.ConnectionDisruptedPendingNetwork =
                "ConnectionDisruptedPendingNetwork"),
              (e.Connecting = "Connecting"),
              (e.ConnectedPendingDisconnect = "ConnectedPendingDisconnect"),
              (e.Disconnected = "Disconnected"),
              (e.ConnectedPendingKeepAlive = "ConnectedPendingKeepAlive");
          })(Gr || (Gr = {}));
        class eo {
          networkMonitor(e) {
            const t = (() => {
              if ("undefined" === typeof self) return !1;
              const e = self;
              return (
                "undefined" !== typeof e.WorkerGlobalScope &&
                self instanceof e.WorkerGlobalScope
              );
            })()
              ? self
              : "undefined" !== typeof window && window;
            return t
              ? new rt((e) => {
                  e.next({ online: t.navigator.onLine });
                  const n = () => {
                      e.next({ online: !0 });
                    },
                    r = () => {
                      e.next({ online: !1 });
                    };
                  return (
                    t.addEventListener("online", n),
                    t.addEventListener("offline", r),
                    eo._observers.push(e),
                    () => {
                      t.removeEventListener("online", n),
                        t.removeEventListener("offline", r),
                        (eo._observers = eo._observers.filter((t) => t !== e));
                    }
                  );
                })
              : ((n = [{ online: !0 }]), r ? Zr(n, r) : Vn(n));
            var n, r;
          }
          static _observerOverride(e) {
            for (const t of this._observers)
              t.closed
                ? (this._observers = this._observers.filter((e) => e !== t))
                : (null === t || void 0 === t ? void 0 : t.next) && t.next(e);
          }
        }
        eo._observers = [];
        const to = () => new eo().networkMonitor(),
          no = {
            KEEP_ALIVE_MISSED: { keepAliveState: "unhealthy" },
            KEEP_ALIVE: { keepAliveState: "healthy" },
            CONNECTION_ESTABLISHED: { connectionState: "connected" },
            CONNECTION_FAILED: {
              intendedConnectionState: "disconnected",
              connectionState: "disconnected",
            },
            CLOSING_CONNECTION: { intendedConnectionState: "disconnected" },
            OPENING_CONNECTION: {
              intendedConnectionState: "connected",
              connectionState: "connecting",
            },
            CLOSED: { connectionState: "disconnected" },
            ONLINE: { networkState: "connected" },
            OFFLINE: { networkState: "disconnected" },
          };
        class ro {
          constructor() {
            (this._networkMonitoringSubscription = void 0),
              (this._linkedConnectionState = {
                networkState: "connected",
                connectionState: "disconnected",
                intendedConnectionState: "disconnected",
                keepAliveState: "healthy",
              }),
              (this._initialNetworkStateSubscription = to().subscribe((e) => {
                var t;
                let { online: n } = e;
                this.record(n ? no.ONLINE : no.OFFLINE),
                  null === (t = this._initialNetworkStateSubscription) ||
                    void 0 === t ||
                    t.unsubscribe();
              })),
              (this._linkedConnectionStateObservable = new rt((e) => {
                e.next(this._linkedConnectionState),
                  (this._linkedConnectionStateObserver = e);
              }));
          }
          enableNetworkMonitoring() {
            var e;
            null === (e = this._initialNetworkStateSubscription) ||
              void 0 === e ||
              e.unsubscribe(),
              void 0 === this._networkMonitoringSubscription &&
                (this._networkMonitoringSubscription = to().subscribe((e) => {
                  let { online: t } = e;
                  this.record(t ? no.ONLINE : no.OFFLINE);
                }));
          }
          disableNetworkMonitoring() {
            var e;
            null === (e = this._networkMonitoringSubscription) ||
              void 0 === e ||
              e.unsubscribe(),
              (this._networkMonitoringSubscription = void 0);
          }
          get connectionStateObservable() {
            let e;
            return this._linkedConnectionStateObservable
              .pipe(N((e) => this.connectionStatesTranslator(e)))
              .pipe(
                ((t = (t) => {
                  const n = t !== e;
                  return (e = t), n;
                }),
                a(function (e, r) {
                  var o = 0;
                  e.subscribe(
                    C(r, function (e) {
                      return t.call(n, e, o++) && r.next(e);
                    })
                  );
                }))
              );
            var t, n;
          }
          record(e) {
            var t;
            "connected" === e.intendedConnectionState
              ? this.enableNetworkMonitoring()
              : "disconnected" === e.intendedConnectionState &&
                this.disableNetworkMonitoring();
            const n = (0, r.A)((0, r.A)({}, this._linkedConnectionState), e);
            (this._linkedConnectionState = (0, r.A)({}, n)),
              null === (t = this._linkedConnectionStateObserver) ||
                void 0 === t ||
                t.next(this._linkedConnectionState);
          }
          connectionStatesTranslator(e) {
            let {
              connectionState: t,
              networkState: n,
              intendedConnectionState: r,
              keepAliveState: o,
            } = e;
            return "connected" === t && "disconnected" === n
              ? Gr.ConnectedPendingNetwork
              : "connected" === t && "disconnected" === r
              ? Gr.ConnectedPendingDisconnect
              : "disconnected" === t &&
                "connected" === r &&
                "disconnected" === n
              ? Gr.ConnectionDisruptedPendingNetwork
              : "disconnected" === t && "connected" === r
              ? Gr.ConnectionDisrupted
              : "connected" === t && "unhealthy" === o
              ? Gr.ConnectedPendingKeepAlive
              : "connecting" === t
              ? Gr.Connecting
              : "disconnected" === t
              ? Gr.Disconnected
              : Gr.Connected;
          }
        }
        var oo;
        !(function (e) {
          (e.START_RECONNECT = "START_RECONNECT"),
            (e.HALT_RECONNECT = "HALT_RECONNECT");
        })(oo || (oo = {}));
        class io {
          constructor() {
            this.reconnectObservers = [];
          }
          addObserver(e) {
            this.reconnectObservers.push(e);
          }
          record(e) {
            e === oo.START_RECONNECT &&
              void 0 === this.reconnectSetTimeoutId &&
              void 0 === this.reconnectIntervalId &&
              (this.reconnectSetTimeoutId = setTimeout(() => {
                this._triggerReconnect(),
                  (this.reconnectIntervalId = setInterval(() => {
                    this._triggerReconnect();
                  }, 6e4));
              }, 5e3)),
              e === oo.HALT_RECONNECT &&
                (this.reconnectIntervalId &&
                  (clearInterval(this.reconnectIntervalId),
                  (this.reconnectIntervalId = void 0)),
                this.reconnectSetTimeoutId &&
                  (clearTimeout(this.reconnectSetTimeoutId),
                  (this.reconnectSetTimeoutId = void 0)));
          }
          close() {
            this.reconnectObservers.forEach((e) => {
              var t;
              null === (t = e.complete) || void 0 === t || t.call(e);
            });
          }
          _triggerReconnect() {
            this.reconnectObservers.forEach((e) => {
              var t;
              null === (t = e.next) || void 0 === t || t.call(e);
            });
          }
        }
        const ao = ["Authorization"],
          so = "wss://",
          lo =
            /^https:\/\/\w{26}\.appsync-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/graphql$/i,
          uo =
            /^https:\/\/\w{26}\.\w+-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/event$/i,
          co = "/realtime",
          fo = (e) => {
            let t = null !== e && void 0 !== e ? e : "";
            return (
              (t =
                null !== t.match(uo)
                  ? t
                      .concat(co)
                      .replace("ddpg-api", "grt-gamma")
                      .replace("appsync-api", "appsync-realtime-api")
                  : ((e) => null === e.match(lo))(t)
                  ? t.concat(co)
                  : t
                      .replace("appsync-api", "appsync-realtime-api")
                      .replace("gogi-beta", "grt-beta")
                      .replace("ddpg-api", "grt-gamma")),
              (t = t.replace("https://", so).replace("http://", so)),
              new Bn.o(t)
            );
          },
          po = (e) => {
            const t = ((e) => {
                if (!e) return {};
                if ("Authorization" in e) {
                  const { Authorization: t } = e;
                  return (0, gt.A)(e, ao);
                }
                return e;
              })(e),
              n = new Bn.g();
            return (
              Object.entries(t).forEach((e) => {
                let [t, r] = e;
                n.append(t, r);
              }),
              n
            );
          },
          ho = async (e) => {
            const {
              appSyncGraphqlEndpoint: t,
              query: n,
              libraryConfigHeaders: o = () => ({}),
              additionalHeaders: i = {},
              authToken: a,
            } = e;
            let s = {};
            const l = await o();
            if ("function" === typeof i) {
              const e = { url: t || "", queryString: n || "" };
              s = await i(e);
            } else s = i;
            return (
              a && (s = (0, r.A)((0, r.A)({}, s), {}, { Authorization: a })),
              { additionalCustomHeaders: s, libraryConfigHeaders: l }
            );
          };
        var mo = n(97648),
          vo = n(51163);
        const yo = new or.C("AWSAppSyncRealTimeProvider Auth"),
          go = async (e) => {
            var t;
            let { host: n } = e;
            const r = await (0, mo.$)();
            return {
              Authorization:
                null === r ||
                void 0 === r ||
                null === (t = r.tokens) ||
                void 0 === t ||
                null === (t = t.accessToken) ||
                void 0 === t
                  ? void 0
                  : t.toString(),
              host: n,
            };
          },
          bo = async (e) => {
            let { apiKey: t, host: n } = e;
            return {
              host: n,
              "x-amz-date": new Date()
                .toISOString()
                .replace(/[:-]|\.\d{3}/g, ""),
              "x-api-key": t,
            };
          },
          wo = async (e) => {
            let {
              payload: t,
              canonicalUri: n,
              appSyncGraphqlEndpoint: o,
              region: i,
            } = e;
            const a = { region: i, service: "appsync" },
              s = (await (0, mo.$)()).credentials,
              l = {
                url: "".concat(o).concat(n),
                data: t,
                method: "POST",
                headers: (0, r.A)({}, Or),
              };
            return (0, vo.z)(
              {
                headers: l.headers,
                method: l.method,
                url: new Bn.o(l.url),
                body: l.data,
              },
              {
                credentials: s,
                signingRegion: a.region,
                signingService: a.service,
              }
            ).headers;
          },
          So = async (e) => {
            let { host: t, additionalCustomHeaders: n } = e;
            if (null === n || void 0 === n || !n.Authorization)
              throw new Error("No auth token specified");
            return { Authorization: n.Authorization, host: t };
          },
          ko = async (e) => {
            let {
              apiKey: t,
              authenticationType: n,
              canonicalUri: r,
              appSyncGraphqlEndpoint: o,
              region: i,
              additionalCustomHeaders: a,
              payload: s,
            } = e;
            const l = {
              apiKey: bo,
              iam: wo,
              oidc: go,
              userPool: go,
              lambda: So,
              none: So,
            };
            if (n && l[n]) {
              const e = l[n],
                u = o ? new Bn.o(o).host : void 0,
                c = "apiKey" === n ? t : void 0;
              yo.debug("Authenticating with ".concat(JSON.stringify(n)));
              return await e({
                payload: s,
                canonicalUri: r,
                appSyncGraphqlEndpoint: o,
                apiKey: c,
                region: i,
                host: u,
                additionalCustomHeaders: a,
              });
            }
            yo.debug("Authentication type ".concat(n, " not supported"));
          },
          Eo = (e) => {
            o.YZ.dispatch("api", e, "PubSub", o.U9);
          };
        class To {
          constructor(e) {
            (this.subscriptionObserverMap = new Map()),
              (this.socketStatus = Nr.CLOSED),
              (this.keepAliveTimeout = Dr),
              (this.promiseArray = []),
              (this.connectionStateMonitor = new ro()),
              (this.reconnectionMonitor = new io()),
              (this._establishConnection = async (e, t) => {
                this.logger.debug(
                  "Establishing WebSocket connection to ".concat(e)
                );
                try {
                  await this._openConnection(e, t),
                    await this._initiateHandshake();
                } catch (n) {
                  const { errorType: e, errorCode: t } = n;
                  throw _r.includes(t) || Ir.includes(e)
                    ? new Pr(e)
                    : e
                    ? new Error(e)
                    : n;
                }
              }),
              (this.logger = new or.C(e.providerName)),
              (this.wsProtocolName = e.wsProtocolName),
              (this.wsConnectUri = e.connectUri),
              (this.connectionStateMonitorSubscription =
                this._startConnectionStateMonitoring());
          }
          close() {
            return (
              (this.socketStatus = Nr.CLOSED),
              this.connectionStateMonitor.record(no.CONNECTION_FAILED),
              this.connectionStateMonitorSubscription.unsubscribe(),
              this.reconnectionMonitor.close(),
              new Promise((e, t) => {
                this.awsRealTimeSocket
                  ? ((this.awsRealTimeSocket.onclose = (t) => {
                      (this.subscriptionObserverMap = new Map()),
                        (this.awsRealTimeSocket = void 0),
                        e();
                    }),
                    (this.awsRealTimeSocket.onerror = (e) => {
                      t(e);
                    }),
                    this.awsRealTimeSocket.close())
                  : e();
              })
            );
          }
          subscribe(e, t) {
            return new rt((n) => {
              if (null === e || void 0 === e || !e.appSyncGraphqlEndpoint)
                return (
                  n.error({
                    errors: [
                      (0, r.A)(
                        {},
                        new jt(
                          "Subscribe only available for AWS AppSync endpoint"
                        )
                      ),
                    ],
                  }),
                  void n.complete()
                );
              let o = !1;
              const i = zr(),
                a = () => {
                  o ||
                    ((o = !0),
                    this._startSubscriptionWithAWSAppSyncRealTime({
                      options: e,
                      observer: n,
                      subscriptionId: i,
                      customUserAgentDetails: t,
                    })
                      .catch((e) => {
                        this.logger.debug(
                          ""
                            .concat(Wr.REALTIME_SUBSCRIPTION_INIT_ERROR, ": ")
                            .concat(e)
                        ),
                          this.connectionStateMonitor.record(no.CLOSED);
                      })
                      .finally(() => {
                        o = !1;
                      }));
                },
                s = new rt((e) => {
                  this.reconnectionMonitor.addObserver(e);
                }).subscribe(() => {
                  a();
                });
              return (
                a(),
                async () => {
                  await this._cleanupSubscription(i, s);
                }
              );
            });
          }
          async connect(e) {
            this.socketStatus !== Nr.READY && (await this._connectWebSocket(e));
          }
          async publish(e, t) {
            if (this.socketStatus !== Nr.READY)
              throw new Error("Subscription has not been initialized");
            return this._publishMessage(e, t);
          }
          async _connectWebSocket(e) {
            const {
                apiKey: t,
                appSyncGraphqlEndpoint: n,
                authenticationType: r,
                region: o,
              } = e,
              { additionalCustomHeaders: i } = await ho(e);
            this.connectionStateMonitor.record(no.OPENING_CONNECTION),
              await this._initializeWebSocketConnection({
                apiKey: t,
                appSyncGraphqlEndpoint: n,
                authenticationType: r,
                region: o,
                additionalCustomHeaders: i,
              });
          }
          async _publishMessage(e, t) {
            const n = zr(),
              { additionalCustomHeaders: r, libraryConfigHeaders: o } =
                await ho(e),
              i = await this._prepareSubscriptionPayload({
                options: e,
                subscriptionId: n,
                customUserAgentDetails: t,
                additionalCustomHeaders: r,
                libraryConfigHeaders: o,
                publish: !0,
              });
            return new Promise((e, t) => {
              if (this.awsRealTimeSocket) {
                const r = (t) => {
                  const o = JSON.parse(t.data);
                  o.id === n &&
                    "publish_success" === o.type &&
                    (this.awsRealTimeSocket &&
                      this.awsRealTimeSocket.removeEventListener("message", r),
                    e()),
                    o.erroredEvents && o.erroredEvents.length;
                };
                this.awsRealTimeSocket.addEventListener("message", r),
                  this.awsRealTimeSocket.addEventListener("close", () => {
                    t(new Error("WebSocket is closed"));
                  }),
                  this.awsRealTimeSocket.send(i);
              }
            });
          }
          async _cleanupSubscription(e, t) {
            null === t || void 0 === t || t.unsubscribe();
            try {
              await this._waitForSubscriptionToBeConnected(e);
              const { subscriptionState: t } =
                this.subscriptionObserverMap.get(e) || {};
              if (!t) return;
              if (t !== xr.CONNECTED)
                throw new Error("Subscription never connected");
              this._sendUnsubscriptionMessage(e);
            } catch (n) {
              this.logger.debug("Error while unsubscribing ".concat(n));
            } finally {
              this._removeSubscriptionObserver(e);
            }
          }
          _startConnectionStateMonitoring() {
            return this.connectionStateMonitor.connectionStateObservable.subscribe(
              (e) => {
                Eo({
                  event: "ConnectionStateChange",
                  data: { provider: this, connectionState: e },
                  message: "Connection state is ".concat(e),
                }),
                  (this.connectionState = e),
                  e === Gr.ConnectionDisrupted &&
                    this.reconnectionMonitor.record(oo.START_RECONNECT),
                  [
                    Gr.Connected,
                    Gr.ConnectedPendingDisconnect,
                    Gr.ConnectedPendingKeepAlive,
                    Gr.ConnectedPendingNetwork,
                    Gr.ConnectionDisruptedPendingNetwork,
                    Gr.Disconnected,
                  ].includes(e) &&
                    this.reconnectionMonitor.record(oo.HALT_RECONNECT);
              }
            );
          }
          async _startSubscriptionWithAWSAppSyncRealTime(e) {
            var t;
            let {
              options: n,
              observer: r,
              subscriptionId: o,
              customUserAgentDetails: i,
            } = e;
            const { query: a, variables: s } = n,
              { additionalCustomHeaders: l, libraryConfigHeaders: u } =
                await ho(n);
            this.subscriptionObserverMap.set(o, {
              observer: r,
              query: null !== a && void 0 !== a ? a : "",
              variables: null !== s && void 0 !== s ? s : {},
              subscriptionState: xr.PENDING,
              startAckTimeoutId: void 0,
            });
            const c = await this._prepareSubscriptionPayload({
              options: n,
              subscriptionId: o,
              customUserAgentDetails: i,
              additionalCustomHeaders: l,
              libraryConfigHeaders: u,
            });
            try {
              await this._connectWebSocket(n);
            } catch (p) {
              return void this._logStartSubscriptionError(o, r, p);
            }
            const {
              subscriptionFailedCallback: d,
              subscriptionReadyCallback: f,
            } =
              null !== (t = this.subscriptionObserverMap.get(o)) && void 0 !== t
                ? t
                : {};
            this.subscriptionObserverMap.set(o, {
              observer: r,
              subscriptionState: xr.PENDING,
              query: null !== a && void 0 !== a ? a : "",
              variables: null !== s && void 0 !== s ? s : {},
              subscriptionReadyCallback: f,
              subscriptionFailedCallback: d,
              startAckTimeoutId: setTimeout(() => {
                this._timeoutStartSubscriptionAck(o);
              }, 15e3),
            }),
              this.awsRealTimeSocket && this.awsRealTimeSocket.send(c);
          }
          _logStartSubscriptionError(e, t, n) {
            var o;
            this.logger.debug({ err: n });
            const i = String(null !== (o = n.message) && void 0 !== o ? o : "");
            if (
              (this.connectionStateMonitor.record(no.CLOSED),
              this.connectionState !== Gr.ConnectionDisruptedPendingNetwork)
            ) {
              $r(n)
                ? t.error({
                    errors: [
                      (0, r.A)(
                        {},
                        new jt("".concat(Wr.CONNECTION_FAILED, ": ").concat(i))
                      ),
                    ],
                  })
                : this.logger.debug(
                    "".concat(Wr.CONNECTION_FAILED, ": ").concat(i)
                  );
              const { subscriptionFailedCallback: o } =
                this.subscriptionObserverMap.get(e) || {};
              "function" === typeof o && o();
            }
          }
          async _waitForSubscriptionToBeConnected(e) {
            const t = this.subscriptionObserverMap.get(e);
            if (t) {
              const { subscriptionState: n } = t;
              if (n === xr.PENDING)
                return new Promise((n, r) => {
                  const {
                    observer: o,
                    subscriptionState: i,
                    variables: a,
                    query: s,
                  } = t;
                  this.subscriptionObserverMap.set(e, {
                    observer: o,
                    subscriptionState: i,
                    variables: a,
                    query: s,
                    subscriptionReadyCallback: n,
                    subscriptionFailedCallback: r,
                  });
                });
            }
          }
          _sendUnsubscriptionMessage(e) {
            try {
              if (
                this.awsRealTimeSocket &&
                this.awsRealTimeSocket.readyState === WebSocket.OPEN &&
                this.socketStatus === Nr.READY
              ) {
                const t = this._unsubscribeMessage(e),
                  n = JSON.stringify(t);
                this.awsRealTimeSocket.send(n);
              }
            } catch (t) {
              this.logger.debug({ err: t });
            }
          }
          _removeSubscriptionObserver(e) {
            this.subscriptionObserverMap.delete(e),
              setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
          }
          _closeSocketIfRequired() {
            if (!(this.subscriptionObserverMap.size > 0))
              if (this.awsRealTimeSocket)
                if (
                  (this.connectionStateMonitor.record(no.CLOSING_CONNECTION),
                  this.awsRealTimeSocket.bufferedAmount > 0)
                )
                  setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
                else {
                  this.logger.debug("closing WebSocket..."),
                    this.keepAliveTimeoutId &&
                      clearTimeout(this.keepAliveTimeoutId),
                    this.keepAliveAlertTimeoutId &&
                      clearTimeout(this.keepAliveAlertTimeoutId);
                  const e = this.awsRealTimeSocket;
                  (e.onclose = null),
                    (e.onerror = null),
                    e.close(1e3),
                    (this.awsRealTimeSocket = void 0),
                    (this.socketStatus = Nr.CLOSED),
                    this.connectionStateMonitor.record(no.CLOSED);
                }
              else this.socketStatus = Nr.CLOSED;
          }
          _handleIncomingSubscriptionMessage(e) {
            if ("string" !== typeof e.data) return;
            const [t, n] = this._handleSubscriptionData(e);
            if (t) return;
            const { type: o, id: i, payload: a } = n,
              {
                observer: s = null,
                query: l = "",
                variables: u = {},
                startAckTimeoutId: c,
                subscriptionReadyCallback: d,
                subscriptionFailedCallback: f,
              } = this.subscriptionObserverMap.get(i) || {};
            if (o === Cr.GQL_START_ACK || o === Cr.EVENT_SUBSCRIBE_ACK) {
              this.logger.debug(
                "subscription ready for ".concat(
                  JSON.stringify({ query: l, variables: u })
                )
              ),
                "function" === typeof d && d(),
                c && clearTimeout(c),
                Eo({
                  event: Wr.SUBSCRIPTION_ACK,
                  data: { query: l, variables: u },
                  message: "Connection established for subscription",
                });
              const e = xr.CONNECTED;
              return (
                s &&
                  this.subscriptionObserverMap.set(i, {
                    observer: s,
                    query: l,
                    variables: u,
                    startAckTimeoutId: void 0,
                    subscriptionState: e,
                    subscriptionReadyCallback: d,
                    subscriptionFailedCallback: f,
                  }),
                void this.connectionStateMonitor.record(
                  no.CONNECTION_ESTABLISHED
                )
              );
            }
            if (o === Cr.GQL_CONNECTION_KEEP_ALIVE)
              return (
                this.keepAliveTimeoutId &&
                  clearTimeout(this.keepAliveTimeoutId),
                this.keepAliveAlertTimeoutId &&
                  clearTimeout(this.keepAliveAlertTimeoutId),
                (this.keepAliveTimeoutId = setTimeout(() => {
                  this._errorDisconnect(Wr.TIMEOUT_DISCONNECT);
                }, this.keepAliveTimeout)),
                (this.keepAliveAlertTimeoutId = setTimeout(() => {
                  this.connectionStateMonitor.record(no.KEEP_ALIVE_MISSED);
                }, 65e3)),
                void this.connectionStateMonitor.record(no.KEEP_ALIVE)
              );
            if (o === Cr.GQL_ERROR) {
              const e = xr.FAILED;
              s &&
                (this.subscriptionObserverMap.set(i, {
                  observer: s,
                  query: l,
                  variables: u,
                  startAckTimeoutId: c,
                  subscriptionReadyCallback: d,
                  subscriptionFailedCallback: f,
                  subscriptionState: e,
                }),
                this.logger.debug(
                  ""
                    .concat(Wr.CONNECTION_FAILED, ": ")
                    .concat(JSON.stringify(null !== a && void 0 !== a ? a : n))
                ),
                s.error({
                  errors: [
                    (0, r.A)(
                      {},
                      new jt(
                        ""
                          .concat(Wr.CONNECTION_FAILED, ": ")
                          .concat(
                            JSON.stringify(null !== a && void 0 !== a ? a : n)
                          )
                      )
                    ),
                  ],
                }),
                c && clearTimeout(c),
                "function" === typeof f && f());
            }
          }
          _errorDisconnect(e) {
            this.logger.debug("Disconnect error: ".concat(e)),
              this.awsRealTimeSocket &&
                (this.connectionStateMonitor.record(no.CLOSED),
                this.awsRealTimeSocket.close()),
              (this.socketStatus = Nr.CLOSED);
          }
          _timeoutStartSubscriptionAck(e) {
            const t = this.subscriptionObserverMap.get(e);
            if (t) {
              const { observer: n, query: r, variables: o } = t;
              if (!n) return;
              this.subscriptionObserverMap.set(e, {
                observer: n,
                query: r,
                variables: o,
                subscriptionState: xr.FAILED,
              }),
                this.connectionStateMonitor.record(no.CLOSED),
                this.logger.debug(
                  "timeoutStartSubscription",
                  JSON.stringify({ query: r, variables: o })
                );
            }
          }
          _initializeWebSocketConnection(e) {
            let {
              appSyncGraphqlEndpoint: t,
              authenticationType: n,
              apiKey: r,
              region: o,
              additionalCustomHeaders: i,
            } = e;
            if (this.socketStatus !== Nr.READY)
              return new Promise(async (e, a) => {
                if (
                  (this.promiseArray.push({ res: e, rej: a }),
                  this.socketStatus === Nr.CLOSED)
                )
                  try {
                    this.socketStatus = Nr.CONNECTING;
                    const e = "{}",
                      a = await ko({
                        authenticationType: n,
                        payload: e,
                        canonicalUri: this.wsConnectUri,
                        apiKey: r,
                        appSyncGraphqlEndpoint: t,
                        region: o,
                        additionalCustomHeaders: i,
                      }),
                      s = a ? JSON.stringify(a) : "",
                      l = Vr.Y.convert(s, { urlSafe: !0, skipPadding: !0 }),
                      u = "header-".concat(l),
                      c = po(i),
                      d = ((e, t) => {
                        const n = fo(e),
                          r = new Bn.g(n.search);
                        for (const [o, i] of t.entries()) r.append(o, i);
                        return (n.search = r.toString()), n.toString();
                      })(t, c);
                    await this._establishRetryableConnection(d, u),
                      this.promiseArray.forEach((e) => {
                        let { res: t } = e;
                        this.logger.debug("Notifying connection successful"),
                          t();
                      }),
                      (this.socketStatus = Nr.READY),
                      (this.promiseArray = []);
                  } catch (s) {
                    this.logger.debug("Connection exited with", s),
                      this.promiseArray.forEach((e) => {
                        let { rej: t } = e;
                        t(s);
                      }),
                      (this.promiseArray = []),
                      this.awsRealTimeSocket &&
                        this.awsRealTimeSocket.readyState === WebSocket.OPEN &&
                        this.awsRealTimeSocket.close(3001),
                      (this.awsRealTimeSocket = void 0),
                      (this.socketStatus = Nr.CLOSED);
                  }
              });
          }
          async _establishRetryableConnection(e, t) {
            this.logger.debug("Establishing retryable connection"),
              await Hr(this._establishConnection.bind(this), [e, t], 5e3);
          }
          async _openConnection(e, t) {
            return new Promise((n, r) => {
              const o = this._getNewWebSocket(e, [this.wsProtocolName, t]);
              (o.onerror = () => {
                this.logger.debug("WebSocket connection error");
              }),
                (o.onclose = () => {
                  r(new Error("Connection handshake error"));
                }),
                (o.onopen = () => {
                  (this.awsRealTimeSocket = o), n();
                });
            });
          }
          _getNewWebSocket(e, t) {
            return new WebSocket(e, t);
          }
          async _initiateHandshake() {
            return new Promise((e, t) => {
              if (!this.awsRealTimeSocket)
                return void t(new Error("awsRealTimeSocket undefined"));
              let n = !1;
              (this.awsRealTimeSocket.onerror = (e) => {
                this.logger.debug("WebSocket error ".concat(JSON.stringify(e)));
              }),
                (this.awsRealTimeSocket.onclose = (e) => {
                  this.logger.debug("WebSocket closed ".concat(e.reason)),
                    t(new Error(JSON.stringify(e)));
                }),
                (this.awsRealTimeSocket.onmessage = (r) => {
                  if ("string" !== typeof r.data) return;
                  this.logger.debug(
                    "subscription message from AWS AppSyncRealTime: ".concat(
                      r.data,
                      " "
                    )
                  );
                  const o = JSON.parse(r.data),
                    { type: i } = o,
                    a = this._extractConnectionTimeout(o);
                  if (i === Cr.GQL_CONNECTION_ACK)
                    return (
                      (n = !0),
                      this._registerWebsocketHandlers(a),
                      void e("Connected to AWS AppSyncRealTime")
                    );
                  if (i === Cr.GQL_CONNECTION_ERROR) {
                    const { errorType: e, errorCode: n } =
                      this._extractErrorCodeAndType(o);
                    t({ errorType: e, errorCode: n });
                  }
                });
              const r = { type: Cr.GQL_CONNECTION_INIT };
              this.awsRealTimeSocket.send(JSON.stringify(r));
              const o = (e) => {
                e ||
                  (this.connectionStateMonitor.record(no.CONNECTION_FAILED),
                  t(
                    new Error(
                      "Connection timeout: ack from AWSAppSyncRealTime was not received after ".concat(
                        15e3,
                        " ms"
                      )
                    )
                  ));
              };
              setTimeout(() => {
                o(n);
              }, 15e3);
            });
          }
          _registerWebsocketHandlers(e) {
            this.awsRealTimeSocket &&
              ((this.keepAliveTimeout = e),
              (this.awsRealTimeSocket.onmessage =
                this._handleIncomingSubscriptionMessage.bind(this)),
              (this.awsRealTimeSocket.onerror = (e) => {
                this.logger.debug(e),
                  this._errorDisconnect(Wr.CONNECTION_CLOSED);
              }),
              (this.awsRealTimeSocket.onclose = (e) => {
                this.logger.debug("WebSocket closed ".concat(e.reason)),
                  this._errorDisconnect(Wr.CONNECTION_CLOSED);
              }));
          }
        }
        const Ao = "AWSAppSyncRealTimeProvider";
        class _o extends To {
          constructor() {
            super({
              providerName: Ao,
              wsProtocolName: "graphql-ws",
              connectUri: "/connect",
            });
          }
          getProviderName() {
            return Ao;
          }
          subscribe(e, t) {
            return super.subscribe(e, t);
          }
          async _prepareSubscriptionPayload(e) {
            let {
              options: t,
              subscriptionId: n,
              customUserAgentDetails: o,
              additionalCustomHeaders: i,
              libraryConfigHeaders: a,
            } = e;
            const {
                appSyncGraphqlEndpoint: s,
                authenticationType: l,
                query: u,
                variables: c,
                apiKey: d,
                region: f,
              } = t,
              p = { query: u, variables: c },
              h = JSON.stringify(p),
              m = (0, r.A)(
                (0, r.A)(
                  (0, r.A)(
                    (0, r.A)(
                      {},
                      await ko({
                        apiKey: d,
                        appSyncGraphqlEndpoint: s,
                        authenticationType: l,
                        payload: h,
                        canonicalUri: "",
                        region: f,
                        additionalCustomHeaders: i,
                      })
                    ),
                    a
                  ),
                  i
                ),
                {},
                { [Ar.YJ]: (0, Hn.fE)(o) }
              ),
              v = {
                id: n,
                payload: {
                  data: h,
                  extensions: { authorization: (0, r.A)({}, m) },
                },
                type: Cr.GQL_START,
              };
            return JSON.stringify(v);
          }
          _handleSubscriptionData(e) {
            this.logger.debug(
              "subscription message from AWS AppSync RealTime: ".concat(e.data)
            );
            const {
                id: t = "",
                payload: n,
                type: r,
              } = JSON.parse(String(e.data)),
              {
                observer: o = null,
                query: i = "",
                variables: a = {},
              } = this.subscriptionObserverMap.get(t) || {};
            return (
              this.logger.debug({ id: t, observer: o, query: i, variables: a }),
              r === Cr.DATA && n && n.data
                ? (o
                    ? o.next(n)
                    : this.logger.debug(
                        "observer not found for id: ".concat(t)
                      ),
                  [!0, { id: t, type: r, payload: n }])
                : [!1, { id: t, type: r, payload: n }]
            );
          }
          _unsubscribeMessage(e) {
            return { id: e, type: Cr.GQL_STOP };
          }
          _extractConnectionTimeout(e) {
            const { payload: { connectionTimeoutMs: t = Dr } = {} } = e;
            return t;
          }
          _extractErrorCodeAndType(e) {
            const {
              payload: {
                errors: [{ errorType: t = "", errorCode: n = 0 } = {}] = [],
              } = {},
            } = e;
            return { errorCode: n, errorType: t };
          }
        }
        class Io extends Wn.x {
          constructor(e) {
            super(e),
              (this.constructor = Io),
              Object.setPrototypeOf(this, Io.prototype);
          }
        }
        var Co;
        !(function (e) {
          (e.NoAuthSession = "NoAuthSession"),
            (e.NoRegion = "NoRegion"),
            (e.NoCustomEndpoint = "NoCustomEndpoint");
        })(Co || (Co = {}));
        const xo = {
          [Co.NoAuthSession]: { message: "Auth session should not be empty." },
          [Co.NoRegion]: { message: "Missing region." },
          [Co.NoCustomEndpoint]: {
            message:
              "Custom endpoint region is present without custom endpoint.",
          },
        };
        const No = new or.C("GraphQLAPI resolveConfig"),
          Oo = (e) => {
            var t, n, r;
            const o = e.getConfig();
            (null !== (t = o.API) && void 0 !== t && t.GraphQL) ||
              No.warn(
                "The API configuration is missing. This is likely due to Amplify.configure() not being called prior to generateClient()."
              );
            const {
              apiKey: i,
              customEndpoint: a,
              customEndpointRegion: s,
              defaultAuthMode: l,
              endpoint: u,
              region: c,
            } = null !==
              (n = null === (r = o.API) || void 0 === r ? void 0 : r.GraphQL) &&
            void 0 !== n
              ? n
              : {};
            return (
              (function (e, t) {
                const { message: n, recoverySuggestion: r } = xo[t];
                if (!e)
                  throw new Io({ name: t, message: n, recoverySuggestion: r });
              })(!(!a && s), Co.NoCustomEndpoint),
              {
                apiKey: i,
                customEndpoint: a,
                customEndpointRegion: s,
                defaultAuthMode: l,
                endpoint: u,
                region: c,
              }
            );
          },
          Do = (e) => {
            var t, n;
            return {
              headers:
                null === (t = e.libraryOptions) ||
                void 0 === t ||
                null === (t = t.API) ||
                void 0 === t ||
                null === (t = t.GraphQL) ||
                void 0 === t
                  ? void 0
                  : t.headers,
              withCredentials:
                null === (n = e.libraryOptions) ||
                void 0 === n ||
                null === (n = n.API) ||
                void 0 === n ||
                null === (n = n.GraphQL) ||
                void 0 === n
                  ? void 0
                  : n.withCredentials,
            };
          };
        function Po(e) {
          return (
            e.errors &&
              Array.isArray(e.errors) &&
              e.errors.forEach((e) => {
                (function (e) {
                  var t, n, r;
                  if (
                    null !== e &&
                    void 0 !== e &&
                    null !== (t = e.originalError) &&
                    void 0 !== t &&
                    null !== (t = t.name) &&
                    void 0 !== t &&
                    t.startsWith("UnauthorizedException")
                  )
                    return !0;
                  if (
                    null !== (n = e.message) &&
                    void 0 !== n &&
                    n.startsWith("Connection failed:") &&
                    null !== (r = e.message) &&
                    void 0 !== r &&
                    r.includes("Permission denied")
                  )
                    return !0;
                  return !1;
                })(e) &&
                  ((e.message = "Unauthorized"),
                  (e.recoverySuggestion =
                    "If you're calling an Amplify-generated API, make sure to set the \"authMode\" in generateClient({ authMode: '...' }) to the backend authorization rule's auth provider ('apiKey', 'userPool', 'iam', 'oidc', 'lambda')"));
              }),
            e
          );
        }
        const Ro = {
            name: "NoApiKey",
            message: dt.NO_API_KEY,
            recoverySuggestion:
              'The API request was made with `authMode: "apiKey"` but no API Key was passed into `Amplify.configure()`. Review if your API key is passed into the `Amplify.configure()` function.',
          },
          Lo = {
            name: "NoCredentials",
            message: dt.NO_CREDENTIALS,
            recoverySuggestion:
              'The API request was made with `authMode: "iam"` but no authentication credentials are available.\n\nIf you intended to make a request using an authenticated role, review if your user is signed in before making the request.\n\nIf you intend to make a request using an unauthenticated role or also known as "guest access", verify if "Auth.Cognito.allowGuestAccess" is set to "true" in the `Amplify.configure()` function.',
          },
          Mo = {
            name: "NoValidAuthTokens",
            message: dt.NO_FEDERATED_JWT,
            recoverySuggestion:
              "If you intended to make an authenticated API request, review if the current user is signed in.",
          },
          Fo = {
            name: "NoSignedUser",
            message: dt.NO_CURRENT_USER,
            recoverySuggestion:
              "Review the underlying exception field for more details. If you intended to make an authenticated API request, review if the current user is signed in.",
          },
          Uo = {
            name: "NoAuthorizationHeader",
            message: dt.NO_AUTH_TOKEN,
            recoverySuggestion:
              'The API request was made with `authMode: "lambda"` but no `authToken` is set. Review if a valid authToken is passed into the request options or in the `Amplify.configure()` function.',
          },
          jo = {
            name: "NoEndpoint",
            message: "No GraphQL endpoint configured in `Amplify.configure()`.",
            recoverySuggestion:
              "Review if the GraphQL API endpoint is set in the `Amplify.configure()` function.",
          },
          zo = (e) => ({
            data: {},
            errors: [new jt(e.message, null, null, null, null, e)],
          });
        const $o = "x-amz-user-agent";
        class Vo {
          constructor() {
            (this.appSyncRealTime = new _o()),
              (this._api = {
                post: kr,
                cancelREST: Er,
                isCancelErrorREST: Xn,
                updateRequestToBeCancellable: Tr,
              });
          }
          getModuleName() {
            return "InternalGraphQLAPI";
          }
          getGraphqlOperationType(e) {
            const t = yn(e).definitions,
              [{ operation: n }] = t;
            return n;
          }
          graphql(e, t, n, r) {
            let { query: o, variables: i = {}, authMode: a, authToken: s } = t;
            const l = yn("string" === typeof o ? o : Tn(o)),
              [u = {}] = l.definitions.filter(
                (e) => "OperationDefinition" === e.kind
              ),
              { operation: c } = u,
              d = n || {};
            switch (c) {
              case "query":
              case "mutation": {
                const t = new AbortController();
                let n;
                if (((e) => "function" !== typeof e)(e))
                  n = this._graphql(
                    e,
                    { query: l, variables: i, authMode: a },
                    d,
                    t,
                    r,
                    s
                  );
                else {
                  n = e(
                    async (e) =>
                      await this._graphql(
                        e,
                        { query: l, variables: i, authMode: a },
                        d,
                        t,
                        r,
                        s
                      )
                  );
                }
                return this._api.updateRequestToBeCancellable(n, t), n;
              }
              case "subscription":
                return this._graphqlSubscribe(
                  e,
                  { query: l, variables: i, authMode: a },
                  d,
                  r,
                  s
                );
              default:
                throw new Error("invalid operation type: ".concat(c));
            }
          }
          async _graphql(e, t) {
            let { query: n, variables: o, authMode: i } = t,
              a =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              s = arguments.length > 3 ? arguments[3] : void 0,
              l = arguments.length > 4 ? arguments[4] : void 0,
              u = arguments.length > 5 ? arguments[5] : void 0;
            const {
                apiKey: c,
                region: d,
                endpoint: f,
                customEndpoint: p,
                customEndpointRegion: h,
                defaultAuthMode: m,
              } = Oo(e),
              v = i || m || "iam",
              y = "identityPool" === v ? "iam" : v,
              { headers: g, withCredentials: b } = Do(e);
            let w;
            if ("function" === typeof a) {
              const e = {
                method: "POST",
                url: new Bn.o(p || f || "").toString(),
                queryString: Tn(n),
              };
              w = await a(e);
            } else w = a;
            u && (w = (0, r.A)((0, r.A)({}, w), {}, { Authorization: u }));
            const S = await (async function (e, t, n) {
                let o =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : {},
                  i = {};
                switch (t) {
                  case "apiKey":
                    if (!n) throw new Io(Ro);
                    i = { "X-Api-Key": n };
                    break;
                  case "iam":
                    if (
                      void 0 === (await e.Auth.fetchAuthSession()).credentials
                    )
                      throw new Io(Lo);
                    break;
                  case "oidc":
                  case "userPool": {
                    let t;
                    try {
                      var a;
                      t =
                        null ===
                          (a = (await e.Auth.fetchAuthSession()).tokens) ||
                        void 0 === a
                          ? void 0
                          : a.accessToken.toString();
                    } catch (s) {
                      throw new Io(
                        (0, r.A)((0, r.A)({}, Fo), {}, { underlyingError: s })
                      );
                    }
                    if (!t) throw new Io(Mo);
                    i = { Authorization: t };
                    break;
                  }
                  case "lambda":
                    if ("object" === typeof o && !o.Authorization)
                      throw new Io(Uo);
                    i = { Authorization: o.Authorization };
                }
                return i;
              })(e, y, c, w),
              k = (0, r.A)(
                (0, r.A)(
                  (0, r.A)(
                    (0, r.A)((0, r.A)({}, !p && S), (p && (h ? S : {})) || {}),
                    g && (await g({ query: Tn(n), variables: o }))
                  ),
                  w
                ),
                !p && { [$o]: (0, Hn.fE)(l) }
              ),
              E = { query: Tn(n), variables: o || null };
            let T;
            T =
              (p && !h) ||
              ("oidc" !== y &&
                "userPool" !== y &&
                "iam" !== y &&
                "lambda" !== y)
                ? void 0
                : { service: h ? "execute-api" : "appsync", region: h || d };
            const A = p || f;
            if (!A) throw zo(new Io(jo));
            let _;
            try {
              const { body: t } = await this._api.post(e, {
                url: new Bn.o(A),
                options: {
                  headers: k,
                  body: E,
                  signingServiceInfo: T,
                  withCredentials: b,
                },
                abortController: s,
              });
              _ = await t.json();
            } catch (I) {
              if (this.isCancelError(I)) throw I;
              _ = zo(I);
            }
            if (
              (function (e) {
                if (!e) return !1;
                const t = e;
                return Array.isArray(t.errors) && t.errors.length > 0;
              })(_)
            )
              throw Po(_);
            return _;
          }
          isCancelError(e) {
            return this._api.isCancelErrorREST(e);
          }
          cancel(e, t) {
            return this._api.cancelREST(e, t);
          }
          _graphqlSubscribe(e, t) {
            let { query: n, variables: r, authMode: o } = t,
              i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              a = arguments.length > 3 ? arguments[3] : void 0,
              s = arguments.length > 4 ? arguments[4] : void 0;
            const l = Oo(e),
              u =
                o ||
                (null === l || void 0 === l ? void 0 : l.defaultAuthMode) ||
                "iam",
              c = "identityPool" === u ? "iam" : u,
              { headers: d } = Do(e);
            return this.appSyncRealTime
              .subscribe(
                {
                  query: Tn(n),
                  variables: r,
                  appSyncGraphqlEndpoint:
                    null === l || void 0 === l ? void 0 : l.endpoint,
                  region: null === l || void 0 === l ? void 0 : l.region,
                  authenticationType: c,
                  apiKey: null === l || void 0 === l ? void 0 : l.apiKey,
                  additionalHeaders: i,
                  authToken: s,
                  libraryConfigHeaders: d,
                },
                a
              )
              .pipe(
                qn((e) => {
                  if (e.errors) throw Po(e);
                  throw e;
                })
              );
          }
        }
        new Vo();
        const Ko = new (class extends Vo {
          getModuleName() {
            return "GraphQLAPI";
          }
          graphql(e, t, n) {
            const o = { category: wt.b7.API, action: wt.Fu.GraphQl };
            if (
              (function (e) {
                return ae in e;
              })(t)
            ) {
              const { [ae]: i } = t,
                a = (0, gt.A)(t, [ae].map(bt.A));
              return super.graphql(e, a, n, (0, r.A)((0, r.A)({}, o), i));
            }
            return super.graphql(e, t, n, (0, r.A)({}, o));
          }
          isCancelError(e) {
            return super.isCancelError(e);
          }
          cancel(e, t) {
            return super.cancel(e, t);
          }
        })();
        function qo(e, t) {
          const n = vt(this);
          (e.authMode = e.authMode || n.authMode),
            (e.authToken = e.authToken || n.authToken);
          const r = t || n.headers;
          return Ko.graphql(n.amplify, e, r);
        }
        function Bo(e, t) {
          return Ko.cancel(e, t);
        }
        function Ho(e) {
          return Ko.isCancelError(e);
        }
        const Wo = (e) => {
            o.YZ.listen("core", (t) => {
              var n;
              if ("configure" !== t.payload.event) return;
              const r =
                null === (n = t.payload.data.API) || void 0 === n
                  ? void 0
                  : n.GraphQL;
              yt(r) && ct(e, r, vt);
            });
          },
          Go = new Proxy(
            {},
            {
              get() {
                throw new Error(
                  "Client could not be generated. This is likely due to `Amplify.configure()` not being called prior to `generateClient()` or because the configuration passed to `Amplify.configure()` is missing GraphQL provider configuration."
                );
              },
            }
          );
        var Qo = n(30348);
        function Yo() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return (function (e) {
            var t;
            const n = {
                [ft]: e.amplify,
                [pt]: e.authMode,
                [ht]: e.authToken,
                [mt]: e.headers,
                graphql: qo,
                cancel: Bo,
                isCancelError: Ho,
                models: Go,
                enums: Go,
                queries: Go,
                mutations: Go,
                subscriptions: Go,
              },
              r =
                null === (t = e.amplify.getConfig().API) || void 0 === t
                  ? void 0
                  : t.GraphQL;
            return yt(r) ? ct(n, r, vt) : Wo(n), n;
          })((0, r.A)((0, r.A)({}, e), {}, { amplify: Qo.H }));
        }
      },
      82096: (e, t, n) => {
        "use strict";
        n.d(t, { l: () => o });
        var r = n(71439);
        class o extends r.x {
          constructor(e) {
            super(e),
              (this.constructor = o),
              Object.setPrototypeOf(this, o.prototype);
          }
        }
      },
      37387: (e, t, n) => {
        "use strict";
        n.d(t, {
          $6: () => c,
          A0: () => s,
          Cs: () => f,
          RW: () => l,
          jK: () => u,
          kM: () => a,
          mh: () => d,
          yA: () => p,
          z0: () => i,
          zz: () => o,
        });
        var r = n(82096);
        const o = "UserUnAuthenticatedException",
          i = "UserAlreadyAuthenticatedException",
          a = "DeviceMetadataNotFoundException",
          s = "AutoSignInException",
          l = new r.l({
            name: "InvalidRedirectException",
            message:
              "signInRedirect or signOutRedirect had an invalid format or was not found.",
            recoverySuggestion:
              "Please make sure the signIn/Out redirect in your oauth config is valid.",
          }),
          u =
            (new r.l({
              name: "InvalidAppSchemeException",
              message:
                "A valid non-http app scheme was not found in the config.",
              recoverySuggestion:
                "Please make sure a valid custom app scheme is present in the config.",
            }),
            new r.l({
              name: "InvalidPreferredRedirectUrlException",
              message:
                "The given preferredRedirectUrl does not match any items in the redirectSignOutUrls array from the config.",
              recoverySuggestion:
                "Please make sure a matching preferredRedirectUrl is provided.",
            })),
          c = new r.l({
            name: "InvalidOriginException",
            message:
              "redirect is coming from a different origin. The oauth flow needs to be initiated from the same origin",
            recoverySuggestion:
              "Please call signInWithRedirect from the same origin.",
          }),
          d = "OAuthSignOutException",
          f = "TokenRefreshException",
          p = "UnexpectedSignInInterruptionException";
      },
      59109: (e, t, n) => {
        "use strict";
        n.d(t, { e: () => i });
        var r = n(34464),
          o = n(82096);
        function i(e) {
          if (!e || "Error" === e.name || e instanceof TypeError)
            throw new o.l({
              name: r.m.Unknown,
              message: "An unknown error has occurred.",
              underlyingError: e,
            });
        }
      },
      59169: (e, t, n) => {
        "use strict";
        n.d(t, { M: () => r });
        const r = "cognito-idp";
      },
      57675: (e, t, n) => {
        "use strict";
        n.d(t, { C: () => s });
        var r = n(35122),
          o = n(1068),
          i = n(41297),
          a = n(14486);
        const s = {
          service: n(59169).M,
          retryDecider: (0, r.D)(o.F),
          computeDelay: i.y,
          userAgentValue: (0, a.fE)(),
          cache: "no-store",
        };
      },
      27266: (e, t, n) => {
        "use strict";
        n.d(t, { R: () => u });
        var r = n(89379),
          o = n(67161),
          i = n(95215),
          a = n(82190),
          s = n(68016),
          l = n(57675);
        const u = (e) =>
          (0, o.A)(
            s.e,
            (0, i._)("InitiateAuth"),
            (0, a.T)(),
            (0, r.A)((0, r.A)({}, l.C), e)
          );
      },
      68016: (e, t, n) => {
        "use strict";
        n.d(t, { e: () => i });
        var r = n(45909),
          o = n(53060);
        const i = (0, r.q)(o.F, [
          () => (e, t) =>
            async function (t) {
              return (t.headers["cache-control"] = "no-store"), e(t);
            },
        ]);
      },
      82190: (e, t, n) => {
        "use strict";
        n.d(t, { T: () => a });
        var r = n(1068),
          o = n(59109),
          i = n(82096);
        const a = () => async (e) => {
          if (e.statusCode >= 300) {
            const t = await (0, r.F)(e);
            throw ((0, o.e)(t), new i.l({ name: t.name, message: t.message }));
          }
          return (0, r.Y)(e);
        };
      },
      95215: (e, t, n) => {
        "use strict";
        n.d(t, { _: () => r });
        const r = (e) => (t, n) => {
            const r = o(e),
              a = JSON.stringify(t);
            return i(n, r, a);
          },
          o = (e) => ({
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": "AWSCognitoIdentityProviderService.".concat(e),
          }),
          i = (e, t, n) => {
            let { url: r } = e;
            return { headers: t, url: r, body: n, method: "POST" };
          };
      },
      9715: (e, t, n) => {
        "use strict";
        n.d(t, { C: () => i, J: () => o });
        var r = n(82096);
        function o(e) {
          const t = null === e || void 0 === e ? void 0 : e.split("_")[0];
          if (!e || e.indexOf("_") < 0 || !t || "string" !== typeof t)
            throw new r.l({
              name: "InvalidUserPoolId",
              message: "Invalid user pool id provided.",
            });
          return t;
        }
        function i(e) {
          if (!e || !e.includes(":"))
            throw new r.l({
              name: "InvalidIdentityPoolIdException",
              message: "Invalid identity pool id provided.",
              recoverySuggestion:
                "Make sure a valid identityPoolId is given in the config.",
            });
          return e.split(":")[0];
        }
      },
      46016: (e, t, n) => {
        "use strict";
        n.d(t, { o: () => a });
        var r = n(80727),
          o = n(83249),
          i = n(59169);
        const a = (e) => {
          let { endpointOverride: t } = e;
          return (e) =>
            t
              ? { url: new r.o(t) }
              : ((e) => {
                  let { region: t } = e;
                  return {
                    url: new r.o(
                      "https://"
                        .concat(i.M, ".")
                        .concat(t, ".")
                        .concat((0, o.R)(t))
                    ),
                  };
                })(e);
        };
      },
      1220: (e, t, n) => {
        "use strict";
        n.d(t, { Uv: () => d, Qm: () => p });
        var r = n(89379),
          o = n(32770),
          i = n(82096);
        const a = {
          accessToken: "accessToken",
          idToken: "idToken",
          oidcProvider: "oidcProvider",
          clockDrift: "clockDrift",
          refreshToken: "refreshToken",
          deviceKey: "deviceKey",
          randomPasswordKey: "randomPasswordKey",
          deviceGroupKey: "deviceGroupKey",
          signInDetails: "signInDetails",
          oauthMetadata: "oauthMetadata",
        };
        var s,
          l = n(8895);
        !(function (e) {
          e.InvalidAuthTokens = "InvalidAuthTokens";
        })(s || (s = {}));
        const u = {
            [s.InvalidAuthTokens]: {
              message: "Invalid tokens.",
              recoverySuggestion: "Make sure the tokens are valid.",
            },
          },
          c = (0, l.p)(u);
        class d {
          constructor() {
            this.name = "CognitoIdentityServiceProvider";
          }
          getKeyValueStorage() {
            if (!this.keyValueStorage)
              throw new i.l({
                name: "KeyValueStorageNotFoundException",
                message: "KeyValueStorage was not found in TokenStore",
              });
            return this.keyValueStorage;
          }
          setKeyValueStorage(e) {
            this.keyValueStorage = e;
          }
          setAuthConfig(e) {
            this.authConfig = e;
          }
          async loadTokens() {
            try {
              var e, t, n;
              const r = await this.getAuthKeys(),
                a = await this.getKeyValueStorage().getItem(r.accessToken);
              if (!a)
                throw new i.l({
                  name: "NoSessionFoundException",
                  message:
                    "Auth session was not found. Make sure to call signIn.",
                });
              const s = (0, o.Cq)(a),
                l = await this.getKeyValueStorage().getItem(r.idToken),
                u = l ? (0, o.Cq)(l) : void 0,
                c =
                  null !==
                    (e = await this.getKeyValueStorage().getItem(
                      r.refreshToken
                    )) && void 0 !== e
                    ? e
                    : void 0,
                d =
                  null !==
                    (t = await this.getKeyValueStorage().getItem(
                      r.clockDrift
                    )) && void 0 !== t
                    ? t
                    : "0",
                f = Number.parseInt(d),
                p = await this.getKeyValueStorage().getItem(r.signInDetails),
                h = {
                  accessToken: s,
                  idToken: u,
                  refreshToken: c,
                  deviceMetadata:
                    null !== (n = await this.getDeviceMetadata()) &&
                    void 0 !== n
                      ? n
                      : void 0,
                  clockDrift: f,
                  username: await this.getLastAuthUser(),
                };
              return p && (h.signInDetails = JSON.parse(p)), h;
            } catch (r) {
              return null;
            }
          }
          async storeTokens(e) {
            c(void 0 !== e, s.InvalidAuthTokens), await this.clearTokens();
            const t = e.username;
            await this.getKeyValueStorage().setItem(
              this.getLastAuthUserKey(),
              t
            );
            const n = await this.getAuthKeys();
            await this.getKeyValueStorage().setItem(
              n.accessToken,
              e.accessToken.toString()
            ),
              e.idToken &&
                (await this.getKeyValueStorage().setItem(
                  n.idToken,
                  e.idToken.toString()
                )),
              e.refreshToken &&
                (await this.getKeyValueStorage().setItem(
                  n.refreshToken,
                  e.refreshToken
                )),
              e.deviceMetadata &&
                (e.deviceMetadata.deviceKey &&
                  (await this.getKeyValueStorage().setItem(
                    n.deviceKey,
                    e.deviceMetadata.deviceKey
                  )),
                e.deviceMetadata.deviceGroupKey &&
                  (await this.getKeyValueStorage().setItem(
                    n.deviceGroupKey,
                    e.deviceMetadata.deviceGroupKey
                  )),
                await this.getKeyValueStorage().setItem(
                  n.randomPasswordKey,
                  e.deviceMetadata.randomPassword
                )),
              e.signInDetails &&
                (await this.getKeyValueStorage().setItem(
                  n.signInDetails,
                  JSON.stringify(e.signInDetails)
                )),
              await this.getKeyValueStorage().setItem(
                n.clockDrift,
                "".concat(e.clockDrift)
              );
          }
          async clearTokens() {
            const e = await this.getAuthKeys();
            await Promise.all([
              this.getKeyValueStorage().removeItem(e.accessToken),
              this.getKeyValueStorage().removeItem(e.idToken),
              this.getKeyValueStorage().removeItem(e.clockDrift),
              this.getKeyValueStorage().removeItem(e.refreshToken),
              this.getKeyValueStorage().removeItem(e.signInDetails),
              this.getKeyValueStorage().removeItem(this.getLastAuthUserKey()),
              this.getKeyValueStorage().removeItem(e.oauthMetadata),
            ]);
          }
          async getDeviceMetadata(e) {
            const t = await this.getAuthKeys(e),
              n = await this.getKeyValueStorage().getItem(t.deviceKey),
              r = await this.getKeyValueStorage().getItem(t.deviceGroupKey),
              o = await this.getKeyValueStorage().getItem(t.randomPasswordKey);
            return o && r && n
              ? { deviceKey: n, deviceGroupKey: r, randomPassword: o }
              : null;
          }
          async clearDeviceMetadata(e) {
            const t = await this.getAuthKeys(e);
            await Promise.all([
              this.getKeyValueStorage().removeItem(t.deviceKey),
              this.getKeyValueStorage().removeItem(t.deviceGroupKey),
              this.getKeyValueStorage().removeItem(t.randomPasswordKey),
            ]);
          }
          async getAuthKeys(e) {
            var t;
            (0, o.$y)(
              null === (t = this.authConfig) || void 0 === t
                ? void 0
                : t.Cognito
            );
            const n =
              null !== e && void 0 !== e ? e : await this.getLastAuthUser();
            return f(
              this.name,
              "".concat(this.authConfig.Cognito.userPoolClientId, ".").concat(n)
            );
          }
          getLastAuthUserKey() {
            var e;
            (0, o.$y)(
              null === (e = this.authConfig) || void 0 === e
                ? void 0
                : e.Cognito
            );
            const t = this.authConfig.Cognito.userPoolClientId;
            return "".concat(this.name, ".").concat(t, ".LastAuthUser");
          }
          async getLastAuthUser() {
            var e;
            return null !==
              (e = await this.getKeyValueStorage().getItem(
                this.getLastAuthUserKey()
              )) && void 0 !== e
              ? e
              : "username";
          }
          async setOAuthMetadata(e) {
            const { oauthMetadata: t } = await this.getAuthKeys();
            await this.getKeyValueStorage().setItem(t, JSON.stringify(e));
          }
          async getOAuthMetadata() {
            const { oauthMetadata: e } = await this.getAuthKeys(),
              t = await this.getKeyValueStorage().getItem(e);
            return t && JSON.parse(t);
          }
        }
        const f = (e, t) => p(a)("".concat(e), t);
        function p(e) {
          const t = Object.values((0, r.A)({}, e));
          return (e, n) =>
            t.reduce(
              (t, o) =>
                (0, r.A)(
                  (0, r.A)({}, t),
                  {},
                  { [o]: "".concat(e, ".").concat(n, ".").concat(o) }
                ),
              {}
            );
        }
      },
      87546: (e, t, n) => {
        "use strict";
        n.d(t, { Q: () => k, o: () => E });
        var r = n(96360),
          o = n(32770);
        var i = n(9715),
          a = n(82242),
          s = n(82096),
          l = n(27266),
          u = n(46016),
          c = n(10003);
        const d = async (e) => {
            var t, n;
            let { tokens: r, authConfig: d, username: f } = e;
            (0, o.$y)(null === d || void 0 === d ? void 0 : d.Cognito);
            const {
                userPoolId: p,
                userPoolClientId: h,
                userPoolEndpoint: m,
              } = d.Cognito,
              v = (0, i.J)(p);
            (0, a.X4)(r);
            const y = r.refreshToken,
              g = { REFRESH_TOKEN: y };
            null !== (t = r.deviceMetadata) &&
              void 0 !== t &&
              t.deviceKey &&
              (g.DEVICE_KEY = r.deviceMetadata.deviceKey);
            const b = (0, c.d)({
                username: f,
                userPoolId: p,
                userPoolClientId: h,
              }),
              w = (0, l.R)({
                endpointResolver: (0, u.o)({ endpointOverride: m }),
              }),
              { AuthenticationResult: S } = await w(
                { region: v },
                {
                  ClientId: h,
                  AuthFlow: "REFRESH_TOKEN_AUTH",
                  AuthParameters: g,
                  UserContextData: b,
                }
              ),
              k = (0, o.Cq)(
                null !==
                  (n = null === S || void 0 === S ? void 0 : S.AccessToken) &&
                  void 0 !== n
                  ? n
                  : ""
              ),
              E =
                null !== S && void 0 !== S && S.IdToken
                  ? (0, o.Cq)(S.IdToken)
                  : void 0,
              { iat: T } = k.payload;
            if (!T)
              throw new s.l({
                name: "iatNotFoundException",
                message: "iat not found in access token",
              });
            return {
              accessToken: k,
              idToken: E,
              clockDrift: 1e3 * T - new Date().getTime(),
              refreshToken: y,
              username: f,
            };
          },
          f = ((e) => {
            let t;
            return async function () {
              for (
                var n = arguments.length, r = new Array(n), o = 0;
                o < n;
                o++
              )
                r[o] = arguments[o];
              return (
                t ||
                ((t = new Promise((n, o) => {
                  e(...r)
                    .then((e) => {
                      n(e);
                    })
                    .catch((e) => {
                      o(e);
                    })
                    .finally(() => {
                      t = void 0;
                    });
                })),
                t)
              );
            };
          })(d);
        var p = n(1220),
          h = n(98173),
          m = n(54163),
          v = n(45022),
          y = n(34464),
          g = n(59109);
        const b = new (n(89876).S)(r.ZL),
          w = [];
        class S {
          constructor() {
            this.waitForInflightOAuth = (0, m.B)()
              ? async () => {
                  if (await b.loadOAuthInFlight())
                    return (
                      this.inflightPromise ||
                        (this.inflightPromise = new Promise((e, t) => {
                          var n;
                          (n = e), w.push(n);
                        })),
                      this.inflightPromise
                    );
                }
              : async () => {};
          }
          setAuthConfig(e) {
            b.setAuthConfig(e.Cognito), (this.authConfig = e);
          }
          setTokenRefresher(e) {
            this.tokenRefresher = e;
          }
          setAuthTokenStore(e) {
            this.tokenStore = e;
          }
          getTokenStore() {
            if (!this.tokenStore)
              throw new s.l({
                name: "EmptyTokenStoreException",
                message: "TokenStore not set",
              });
            return this.tokenStore;
          }
          getTokenRefresher() {
            if (!this.tokenRefresher)
              throw new s.l({
                name: "EmptyTokenRefresherException",
                message: "TokenRefresher not set",
              });
            return this.tokenRefresher;
          }
          async getTokens(e) {
            var t, n, r, i, a, s, l, u, c, d;
            let f;
            try {
              var p;
              (0, o.$y)(
                null === (p = this.authConfig) || void 0 === p
                  ? void 0
                  : p.Cognito
              );
            } catch (g) {
              return null;
            }
            await this.waitForInflightOAuth(),
              (this.inflightPromise = void 0),
              (f = await this.getTokenStore().loadTokens());
            const h = await this.getTokenStore().getLastAuthUser();
            if (null === f) return null;
            const m =
                !(null === (t = f) || void 0 === t || !t.idToken) &&
                (0, v.H)({
                  expiresAt:
                    1e3 *
                    (null !==
                      (n =
                        null === (r = f.idToken) ||
                        void 0 === r ||
                        null === (r = r.payload) ||
                        void 0 === r
                          ? void 0
                          : r.exp) && void 0 !== n
                      ? n
                      : 0),
                  clockDrift:
                    null !== (i = f.clockDrift) && void 0 !== i ? i : 0,
                }),
              y = (0, v.H)({
                expiresAt:
                  1e3 *
                  (null !==
                    (a =
                      null === (s = f.accessToken) ||
                      void 0 === s ||
                      null === (s = s.payload) ||
                      void 0 === s
                        ? void 0
                        : s.exp) && void 0 !== a
                    ? a
                    : 0),
                clockDrift: null !== (l = f.clockDrift) && void 0 !== l ? l : 0,
              });
            return ((null !== e && void 0 !== e && e.forceRefresh) || m || y) &&
              ((f = await this.refreshTokens({ tokens: f, username: h })),
              null === f)
              ? null
              : {
                  accessToken:
                    null === (u = f) || void 0 === u ? void 0 : u.accessToken,
                  idToken:
                    null === (c = f) || void 0 === c ? void 0 : c.idToken,
                  signInDetails:
                    null === (d = f) || void 0 === d ? void 0 : d.signInDetails,
                };
          }
          async refreshTokens(e) {
            let { tokens: t, username: n } = e;
            try {
              const { signInDetails: e } = t,
                r = await this.getTokenRefresher()({
                  tokens: t,
                  authConfig: this.authConfig,
                  username: n,
                });
              return (
                (r.signInDetails = e),
                await this.setTokens({ tokens: r }),
                h.YZ.dispatch("auth", { event: "tokenRefresh" }, "Auth", h.U9),
                r
              );
            } catch (r) {
              return this.handleErrors(r);
            }
          }
          handleErrors(e) {
            if (
              ((0, g.e)(e),
              e.name !== y.m.NetworkError && this.clearTokens(),
              h.YZ.dispatch(
                "auth",
                { event: "tokenRefresh_failure", data: { error: e } },
                "Auth",
                h.U9
              ),
              e.name.startsWith("NotAuthorizedException"))
            )
              return null;
            throw e;
          }
          async setTokens(e) {
            let { tokens: t } = e;
            return this.getTokenStore().storeTokens(t);
          }
          async clearTokens() {
            return this.getTokenStore().clearTokens();
          }
          getDeviceMetadata(e) {
            return this.getTokenStore().getDeviceMetadata(e);
          }
          clearDeviceMetadata(e) {
            return this.getTokenStore().clearDeviceMetadata(e);
          }
          setOAuthMetadata(e) {
            return this.getTokenStore().setOAuthMetadata(e);
          }
          getOAuthMetadata() {
            return this.getTokenStore().getOAuthMetadata();
          }
        }
        const k = new (class {
            constructor() {
              (this.authTokenStore = new p.Uv()),
                this.authTokenStore.setKeyValueStorage(r.ZL),
                (this.tokenOrchestrator = new S()),
                this.tokenOrchestrator.setAuthTokenStore(this.authTokenStore),
                this.tokenOrchestrator.setTokenRefresher(f);
            }
            getTokens() {
              let { forceRefresh: e } =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { forceRefresh: !1 };
              return this.tokenOrchestrator.getTokens({ forceRefresh: e });
            }
            setKeyValueStorage(e) {
              this.authTokenStore.setKeyValueStorage(e);
            }
            setAuthConfig(e) {
              this.authTokenStore.setAuthConfig(e),
                this.tokenOrchestrator.setAuthConfig(e);
            }
          })(),
          { tokenOrchestrator: E } = k;
      },
      89876: (e, t, n) => {
        "use strict";
        n.d(t, { S: () => l });
        var r = n(32770),
          o = n(1220),
          i = n(82242);
        const a = "amplify-signin-with-hostedUI",
          s = "CognitoIdentityServiceProvider";
        class l {
          constructor(e) {
            this.keyValueStorage = e;
          }
          async clearOAuthInflightData() {
            (0, r.$y)(this.cognitoConfig);
            const e = u(s, this.cognitoConfig.userPoolClientId);
            await Promise.all([
              this.keyValueStorage.removeItem(e.inflightOAuth),
              this.keyValueStorage.removeItem(e.oauthPKCE),
              this.keyValueStorage.removeItem(e.oauthState),
            ]);
          }
          async clearOAuthData() {
            (0, r.$y)(this.cognitoConfig);
            const e = u(s, this.cognitoConfig.userPoolClientId);
            return (
              await this.clearOAuthInflightData(),
              await this.keyValueStorage.removeItem(a),
              this.keyValueStorage.removeItem(e.oauthSignIn)
            );
          }
          loadOAuthState() {
            (0, r.$y)(this.cognitoConfig);
            const e = u(s, this.cognitoConfig.userPoolClientId);
            return this.keyValueStorage.getItem(e.oauthState);
          }
          storeOAuthState(e) {
            (0, r.$y)(this.cognitoConfig);
            const t = u(s, this.cognitoConfig.userPoolClientId);
            return this.keyValueStorage.setItem(t.oauthState, e);
          }
          loadPKCE() {
            (0, r.$y)(this.cognitoConfig);
            const e = u(s, this.cognitoConfig.userPoolClientId);
            return this.keyValueStorage.getItem(e.oauthPKCE);
          }
          storePKCE(e) {
            (0, r.$y)(this.cognitoConfig);
            const t = u(s, this.cognitoConfig.userPoolClientId);
            return this.keyValueStorage.setItem(t.oauthPKCE, e);
          }
          setAuthConfig(e) {
            this.cognitoConfig = e;
          }
          async loadOAuthInFlight() {
            (0, r.$y)(this.cognitoConfig);
            const e = u(s, this.cognitoConfig.userPoolClientId);
            return (
              "true" === (await this.keyValueStorage.getItem(e.inflightOAuth))
            );
          }
          async storeOAuthInFlight(e) {
            (0, r.$y)(this.cognitoConfig);
            const t = u(s, this.cognitoConfig.userPoolClientId);
            await this.keyValueStorage.setItem(t.inflightOAuth, "".concat(e));
          }
          async loadOAuthSignIn() {
            var e, t;
            (0, r.$y)(this.cognitoConfig);
            const n = u(s, this.cognitoConfig.userPoolClientId),
              o = await this.keyValueStorage.getItem(a),
              [i, l] =
                null !==
                  (e =
                    null ===
                      (t = await this.keyValueStorage.getItem(n.oauthSignIn)) ||
                    void 0 === t
                      ? void 0
                      : t.split(",")) && void 0 !== e
                  ? e
                  : [];
            return {
              isOAuthSignIn: "true" === i || "true" === o,
              preferPrivateSession: "true" === l,
            };
          }
          async storeOAuthSignIn(e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            (0, r.$y)(this.cognitoConfig);
            const n = u(s, this.cognitoConfig.userPoolClientId);
            await this.keyValueStorage.setItem(
              n.oauthSignIn,
              "".concat(e, ",").concat(t)
            );
          }
        }
        const u = (e, t) => (0, o.Qm)(i.f3)(e, t);
      },
      82242: (e, t, n) => {
        "use strict";
        n.d(t, {
          H0: () => i,
          OW: () => a,
          O_: () => c,
          X4: () => u,
          f3: () => d,
        });
        var r = n(82096),
          o = n(37387);
        function i(e) {
          if (!e || !e.accessToken)
            throw new r.l({
              name: o.zz,
              message: "User needs to be authenticated to call this API.",
              recoverySuggestion: "Sign in before calling this API again.",
            });
        }
        function a(e) {
          if (!e || !e.idToken)
            throw new r.l({
              name: o.zz,
              message: "User needs to be authenticated to call this API.",
              recoverySuggestion: "Sign in before calling this API again.",
            });
        }
        const s = new r.l({
            name: o.Cs,
            message:
              "Token refresh is not supported when authenticated with the 'implicit grant' (token) oauth flow. \n\tPlease change your oauth configuration to use 'code grant' flow.",
            recoverySuggestion:
              "Please logout and change your Amplify configuration to use \"code grant\" flow. \n\tE.g { responseType: 'code' }",
          }),
          l = new r.l({
            name: o.zz,
            message: "User needs to be authenticated to call this API.",
            recoverySuggestion: "Sign in before calling this API again.",
          });
        function u(e) {
          if (
            (function (e) {
              return f(e) && !(null !== e && void 0 !== e && e.refreshToken);
            })(e)
          )
            throw s;
          if (
            !(function (e) {
              return (
                f(e) && (null === e || void 0 === e ? void 0 : e.refreshToken)
              );
            })(e)
          )
            throw l;
        }
        function c(e) {
          if (!e || !e.deviceKey || !e.deviceGroupKey || !e.randomPassword)
            throw new r.l({
              name: o.kM,
              message:
                "Either deviceKey, deviceGroupKey or secretPassword were not found during the sign-in process.",
              recoverySuggestion:
                "Make sure to not clear storage after calling the signIn API.",
            });
        }
        const d = {
          inflightOAuth: "inflightOAuth",
          oauthSignIn: "oauthSignIn",
          oauthPKCE: "oauthPKCE",
          oauthState: "oauthState",
        };
        function f(e) {
          return (
            (null === e || void 0 === e ? void 0 : e.accessToken) ||
            (null === e || void 0 === e ? void 0 : e.idToken)
          );
        }
      },
      10003: (e, t, n) => {
        "use strict";
        function r(e) {
          let { username: t, userPoolId: n, userPoolClientId: r } = e;
          if ("undefined" === typeof window) return;
          const o = window.AmazonCognitoAdvancedSecurityData;
          if ("undefined" === typeof o) return;
          const i = o.getData(t, n, r);
          if (i) {
            return { EncodedData: i };
          }
          return {};
        }
        n.d(t, { d: () => r });
      },
      98173: (e, t, n) => {
        "use strict";
        n.d(t, { U9: () => s, YZ: () => c, f3: () => d });
        var r = n(89379),
          o = n(44619),
          i = n(2206),
          a = n(71439);
        const s =
            "undefined" !== typeof Symbol
              ? Symbol("amplify_default")
              : "@@amplify_default",
          l = new o.C("Hub");
        class u {
          constructor(e) {
            (this.listeners = new Map()),
              (this.protectedChannels = [
                "core",
                "auth",
                "api",
                "analytics",
                "interactions",
                "pubsub",
                "storage",
                "ui",
                "xr",
              ]),
              (this.name = e);
          }
          _remove(e, t) {
            const n = this.listeners.get(e);
            n
              ? this.listeners.set(e, [
                  ...n.filter((e) => {
                    let { callback: n } = e;
                    return n !== t;
                  }),
                ])
              : l.warn("No listeners for ".concat(e));
          }
          dispatch(e, t, n, o) {
            if (
              "string" === typeof e &&
              this.protectedChannels.indexOf(e) > -1
            ) {
              o === s ||
                l.warn(
                  "WARNING: ".concat(
                    e,
                    " is protected and dispatching on it can have unintended consequences"
                  )
                );
            }
            const i = {
              channel: e,
              payload: (0, r.A)({}, t),
              source: n,
              patternInfo: [],
            };
            try {
              this._toListeners(i);
            } catch (a) {
              l.error(a);
            }
          }
          listen(e, t) {
            let n,
              r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : "noname";
            if ("function" !== typeof t)
              throw new a.x({
                name: i.d1,
                message: "No callback supplied to Hub",
              });
            n = t;
            let o = this.listeners.get(e);
            return (
              o || ((o = []), this.listeners.set(e, o)),
              o.push({ name: r, callback: n }),
              () => {
                this._remove(e, n);
              }
            );
          }
          _toListeners(e) {
            const { channel: t, payload: n } = e,
              r = this.listeners.get(t);
            r &&
              r.forEach((r) => {
                l.debug("Dispatching to ".concat(t, " with "), n);
                try {
                  r.callback(e);
                } catch (o) {
                  l.error(o);
                }
              });
          }
        }
        const c = new u("__default__"),
          d = new u("internal-hub");
      },
      44619: (e, t, n) => {
        "use strict";
        n.d(t, { C: () => a });
        var r,
          o = n(2206);
        !(function (e) {
          (e.DEBUG = "DEBUG"),
            (e.ERROR = "ERROR"),
            (e.INFO = "INFO"),
            (e.WARN = "WARN"),
            (e.VERBOSE = "VERBOSE"),
            (e.NONE = "NONE");
        })(r || (r = {}));
        const i = { VERBOSE: 1, DEBUG: 2, INFO: 3, WARN: 4, ERROR: 5, NONE: 6 };
        class a {
          constructor(e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : r.WARN;
            (this.name = e), (this.level = t), (this._pluggables = []);
          }
          _padding(e) {
            return e < 10 ? "0" + e : "" + e;
          }
          _ts() {
            const e = new Date();
            return (
              [
                this._padding(e.getMinutes()),
                this._padding(e.getSeconds()),
              ].join(":") +
              "." +
              e.getMilliseconds()
            );
          }
          configure(e) {
            return e ? ((this._config = e), this._config) : this._config;
          }
          _log(e) {
            let t = this.level;
            a.LOG_LEVEL && (t = a.LOG_LEVEL),
              "undefined" !== typeof window &&
                window.LOG_LEVEL &&
                (t = window.LOG_LEVEL);
            if (!(i[e] >= i[t])) return;
            let n = console.log.bind(console);
            e === r.ERROR && console.error && (n = console.error.bind(console)),
              e === r.WARN && console.warn && (n = console.warn.bind(console)),
              a.BIND_ALL_LOG_LEVELS &&
                (e === r.INFO &&
                  console.info &&
                  (n = console.info.bind(console)),
                e === r.DEBUG &&
                  console.debug &&
                  (n = console.debug.bind(console)));
            const o = "["
              .concat(e, "] ")
              .concat(this._ts(), " ")
              .concat(this.name);
            let s = "";
            for (
              var l = arguments.length, u = new Array(l > 1 ? l - 1 : 0), c = 1;
              c < l;
              c++
            )
              u[c - 1] = arguments[c];
            if (1 === u.length && "string" === typeof u[0])
              (s = "".concat(o, " - ").concat(u[0])), n(s);
            else if (1 === u.length)
              (s = "".concat(o, " ").concat(u[0])), n(o, u[0]);
            else if ("string" === typeof u[0]) {
              let e = u.slice(1);
              1 === e.length && (e = e[0]),
                (s = "".concat(o, " - ").concat(u[0], " ").concat(e)),
                n("".concat(o, " - ").concat(u[0]), e);
            } else (s = "".concat(o, " ").concat(u)), n(o, u);
            for (const r of this._pluggables) {
              const e = { message: s, timestamp: Date.now() };
              r.pushLogs([e]);
            }
          }
          log() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            this._log(r.INFO, ...t);
          }
          info() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            this._log(r.INFO, ...t);
          }
          warn() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            this._log(r.WARN, ...t);
          }
          error() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            this._log(r.ERROR, ...t);
          }
          debug() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            this._log(r.DEBUG, ...t);
          }
          verbose() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
              t[n] = arguments[n];
            this._log(r.VERBOSE, ...t);
          }
          addPluggable(e) {
            e &&
              e.getCategoryName() === o.OU &&
              (this._pluggables.push(e), e.configure(this._config));
          }
          listPluggables() {
            return this._pluggables;
          }
        }
        (a.LOG_LEVEL = null), (a.BIND_ALL_LOG_LEVELS = !1);
      },
      46130: (e, t, n) => {
        "use strict";
        n.d(t, { yl: () => p, e9: () => h });
        var r = n(32600);
        const o = () => "undefined" !== typeof global,
          i = () => "undefined" !== typeof window,
          a = () => "undefined" !== typeof document,
          s = () => "undefined" !== typeof process,
          l = (e, t) => !!Object.keys(e).find((e) => e.startsWith(t));
        const u = [
          {
            platform: r.dT.Expo,
            detectionMethod: function () {
              return o() && "undefined" !== typeof global.expo;
            },
          },
          {
            platform: r.dT.ReactNative,
            detectionMethod: function () {
              return (
                "undefined" !== typeof navigator &&
                "undefined" !== typeof navigator.product &&
                "ReactNative" === navigator.product
              );
            },
          },
          {
            platform: r.dT.NextJs,
            detectionMethod: function () {
              return i() && window.next && "object" === typeof window.next;
            },
          },
          {
            platform: r.dT.Nuxt,
            detectionMethod: function () {
              return (
                i() && (void 0 !== window.__NUXT__ || void 0 !== window.$nuxt)
              );
            },
          },
          {
            platform: r.dT.Angular,
            detectionMethod: function () {
              const e = Boolean(a() && document.querySelector("[ng-version]")),
                t = Boolean(i() && "undefined" !== typeof window.ng);
              return e || t;
            },
          },
          {
            platform: r.dT.React,
            detectionMethod: function () {
              const e = (e) =>
                e.startsWith("_react") || e.startsWith("__react");
              return (
                a() &&
                Array.from(document.querySelectorAll("[id]")).some((t) =>
                  Object.keys(t).find(e)
                )
              );
            },
          },
          {
            platform: r.dT.VueJs,
            detectionMethod: function () {
              return i() && l(window, "__VUE");
            },
          },
          {
            platform: r.dT.Svelte,
            detectionMethod: function () {
              return i() && l(window, "__SVELTE");
            },
          },
          {
            platform: r.dT.WebUnknown,
            detectionMethod: function () {
              return i();
            },
          },
          {
            platform: r.dT.NextJsSSR,
            detectionMethod: function () {
              return o() && (l(global, "__next") || l(global, "__NEXT"));
            },
          },
          {
            platform: r.dT.NuxtSSR,
            detectionMethod: function () {
              return o() && "undefined" !== typeof global.__NUXT_PATHS__;
            },
          },
          {
            platform: r.dT.ReactSSR,
            detectionMethod: function () {
              return (
                s() &&
                !!Object.keys({
                  NODE_ENV: "production",
                  PUBLIC_URL: "",
                  WDS_SOCKET_HOST: void 0,
                  WDS_SOCKET_PATH: void 0,
                  WDS_SOCKET_PORT: void 0,
                  FAST_REFRESH: !0,
                }).find((e) => e.includes("react"))
              );
            },
          },
          {
            platform: r.dT.VueJsSSR,
            detectionMethod: function () {
              return o() && l(global, "__VUE");
            },
          },
          {
            platform: r.dT.AngularSSR,
            detectionMethod: function () {
              var e;
              return (
                (s() &&
                  (null ===
                    (e = {
                      NODE_ENV: "production",
                      PUBLIC_URL: "",
                      WDS_SOCKET_HOST: void 0,
                      WDS_SOCKET_PATH: void 0,
                      WDS_SOCKET_PORT: void 0,
                      FAST_REFRESH: !0,
                    }.npm_lifecycle_script) || void 0 === e
                    ? void 0
                    : e.startsWith("ng "))) ||
                !1
              );
            },
          },
          {
            platform: r.dT.SvelteSSR,
            detectionMethod: function () {
              return (
                s() &&
                !!Object.keys({
                  NODE_ENV: "production",
                  PUBLIC_URL: "",
                  WDS_SOCKET_HOST: void 0,
                  WDS_SOCKET_PATH: void 0,
                  WDS_SOCKET_PORT: void 0,
                  FAST_REFRESH: !0,
                }).find((e) => e.includes("svelte"))
              );
            },
          },
        ];
        let c;
        const d = [];
        let f = !1;
        const p = () => {
            if (!c) {
              if (
                ((c = (function () {
                  var e;
                  return (
                    (null === (e = u.find((e) => e.detectionMethod())) ||
                    void 0 === e
                      ? void 0
                      : e.platform) || r.dT.ServerSideUnknown
                  );
                })()),
                f)
              )
                for (; d.length; ) {
                  var e;
                  null === (e = d.pop()) || void 0 === e || e();
                }
              else
                d.forEach((e) => {
                  e();
                });
              m(r.dT.ServerSideUnknown, 10), m(r.dT.WebUnknown, 10);
            }
            return c;
          },
          h = (e) => {
            f || d.push(e);
          };
        function m(e, t) {
          c !== e ||
            f ||
            setTimeout(() => {
              (c = void 0), (f = !0), setTimeout(p, 1e3);
            }, t);
        }
      },
      14486: (e, t, n) => {
        "use strict";
        n.d(t, { fE: () => c });
        var r = n(32600);
        const o = "6.10.2";
        var i = n(46130);
        const a = {},
          s = "aws-amplify",
          l = (e) => e.replace(/\+.*/, "");
        new (class {
          constructor() {
            this.userAgent = "".concat(s, "/").concat(l(o));
          }
          get framework() {
            return (0, i.yl)();
          }
          get isReactNative() {
            return (
              this.framework === r.dT.ReactNative ||
              this.framework === r.dT.Expo
            );
          }
          observeFrameworkChanges(e) {
            (0, i.e9)(e);
          }
        })();
        const u = function () {
            let { category: e, action: t } =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            const n = [[s, l(o)]];
            if (
              (e && n.push([e, t]), n.push(["framework", (0, i.yl)()]), e && t)
            ) {
              const r = ((e, t) => {
                var n;
                return null === (n = a[e]) ||
                  void 0 === n ||
                  null === (n = n[t]) ||
                  void 0 === n
                  ? void 0
                  : n.additionalDetails;
              })(e, t);
              r &&
                r.forEach((e) => {
                  n.push(e);
                });
            }
            return n;
          },
          c = (e) =>
            u(e)
              .map((e) => {
                let [t, n] = e;
                return t && n ? "".concat(t, "/").concat(n) : t;
              })
              .join(" ");
      },
      32600: (e, t, n) => {
        "use strict";
        var r, o, i, a, s, l, u, c, d, f, p, h, m, v;
        n.d(t, {
          BM: () => l,
          Fu: () => s,
          b7: () => o,
          dT: () => r,
          sZ: () => v,
        }),
          (function (e) {
            (e.WebUnknown = "0"),
              (e.React = "1"),
              (e.NextJs = "2"),
              (e.Angular = "3"),
              (e.VueJs = "4"),
              (e.Nuxt = "5"),
              (e.Svelte = "6"),
              (e.ServerSideUnknown = "100"),
              (e.ReactSSR = "101"),
              (e.NextJsSSR = "102"),
              (e.AngularSSR = "103"),
              (e.VueJsSSR = "104"),
              (e.NuxtSSR = "105"),
              (e.SvelteSSR = "106"),
              (e.ReactNative = "201"),
              (e.Expo = "202");
          })(r || (r = {})),
          (function (e) {
            (e.AI = "ai"),
              (e.API = "api"),
              (e.Auth = "auth"),
              (e.Analytics = "analytics"),
              (e.DataStore = "datastore"),
              (e.Geo = "geo"),
              (e.InAppMessaging = "inappmessaging"),
              (e.Interactions = "interactions"),
              (e.Predictions = "predictions"),
              (e.PubSub = "pubsub"),
              (e.PushNotification = "pushnotification"),
              (e.Storage = "storage");
          })(o || (o = {})),
          (function (e) {
            (e.CreateConversation = "1"),
              (e.GetConversation = "2"),
              (e.ListConversations = "3"),
              (e.DeleteConversation = "4"),
              (e.SendMessage = "5"),
              (e.ListMessages = "6"),
              (e.OnMessage = "7"),
              (e.Generation = "8"),
              (e.UpdateConversation = "9");
          })(i || (i = {})),
          (function (e) {
            (e.Record = "1"), (e.IdentifyUser = "2");
          })(a || (a = {})),
          (function (e) {
            (e.GraphQl = "1"),
              (e.Get = "2"),
              (e.Post = "3"),
              (e.Put = "4"),
              (e.Patch = "5"),
              (e.Del = "6"),
              (e.Head = "7");
          })(s || (s = {})),
          (function (e) {
            (e.SignUp = "1"),
              (e.ConfirmSignUp = "2"),
              (e.ResendSignUpCode = "3"),
              (e.SignIn = "4"),
              (e.FetchMFAPreference = "6"),
              (e.UpdateMFAPreference = "7"),
              (e.SetUpTOTP = "10"),
              (e.VerifyTOTPSetup = "11"),
              (e.ConfirmSignIn = "12"),
              (e.DeleteUserAttributes = "15"),
              (e.DeleteUser = "16"),
              (e.UpdateUserAttributes = "17"),
              (e.FetchUserAttributes = "18"),
              (e.ConfirmUserAttribute = "22"),
              (e.SignOut = "26"),
              (e.UpdatePassword = "27"),
              (e.ResetPassword = "28"),
              (e.ConfirmResetPassword = "29"),
              (e.FederatedSignIn = "30"),
              (e.RememberDevice = "32"),
              (e.ForgetDevice = "33"),
              (e.FetchDevices = "34"),
              (e.SendUserAttributeVerificationCode = "35"),
              (e.SignInWithRedirect = "36"),
              (e.StartWebAuthnRegistration = "37"),
              (e.CompleteWebAuthnRegistration = "38"),
              (e.ListWebAuthnCredentials = "39"),
              (e.DeleteWebAuthnCredential = "40");
          })(l || (l = {})),
          (function (e) {
            (e.Subscribe = "1"), (e.GraphQl = "2");
          })(u || (u = {})),
          (function (e) {
            (e.SearchByText = "0"),
              (e.SearchByCoordinates = "1"),
              (e.SearchForSuggestions = "2"),
              (e.SearchByPlaceId = "3"),
              (e.SaveGeofences = "4"),
              (e.GetGeofence = "5"),
              (e.ListGeofences = "6"),
              (e.DeleteGeofences = "7");
          })(c || (c = {})),
          (function (e) {
            (e.SyncMessages = "1"),
              (e.IdentifyUser = "2"),
              (e.NotifyMessageInteraction = "3");
          })(d || (d = {})),
          (function (e) {
            e.None = "0";
          })(f || (f = {})),
          (function (e) {
            (e.Convert = "1"), (e.Identify = "2"), (e.Interpret = "3");
          })(p || (p = {})),
          (function (e) {
            e.Subscribe = "1";
          })(h || (h = {})),
          (function (e) {
            (e.InitializePushNotifications = "1"), (e.IdentifyUser = "2");
          })(m || (m = {})),
          (function (e) {
            (e.UploadData = "1"),
              (e.DownloadData = "2"),
              (e.List = "3"),
              (e.Copy = "4"),
              (e.Remove = "5"),
              (e.GetProperties = "6"),
              (e.GetUrl = "7"),
              (e.GetDataAccess = "8"),
              (e.ListCallerAccessGrants = "9");
          })(v || (v = {}));
      },
      83249: (e, t, n) => {
        "use strict";
        n.d(t, { R: () => i });
        const r = {
            id: "aws",
            outputs: { dnsSuffix: "amazonaws.com" },
            regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
            regions: ["aws-global"],
          },
          o = {
            partitions: [
              r,
              {
                id: "aws-cn",
                outputs: { dnsSuffix: "amazonaws.com.cn" },
                regionRegex: "^cn\\-\\w+\\-\\d+$",
                regions: ["aws-cn-global"],
              },
            ],
          },
          i = (e) => {
            const { partitions: t } = o;
            for (const { regions: n, outputs: r, regionRegex: o } of t) {
              const t = new RegExp(o);
              if (n.includes(e) || t.test(e)) return r.dnsSuffix;
            }
            return r.outputs.dnsSuffix;
          };
      },
      95634: (e, t, n) => {
        "use strict";
        n.d(t, { Q: () => l });
        var r = n(89379),
          o = n(71439),
          i = n(34464),
          a = n(75640);
        const s = (e) => !["HEAD", "GET", "DELETE"].includes(e.toUpperCase()),
          l = async (e, t) => {
            var n, l;
            let u,
              { url: c, method: d, headers: f, body: p } = e,
              { abortSignal: h, cache: m, withCrossDomainCredentials: v } = t;
            try {
              u = await fetch(c, {
                method: d,
                headers: f,
                body: s(d) ? p : void 0,
                signal: h,
                cache: m,
                credentials: v ? "include" : "same-origin",
              });
            } catch (w) {
              if (w instanceof TypeError)
                throw new o.x({
                  name: i.m.NetworkError,
                  message: "A network error has occurred.",
                  underlyingError: w,
                });
              throw w;
            }
            const y = {};
            null === (n = u.headers) ||
              void 0 === n ||
              n.forEach((e, t) => {
                y[t.toLowerCase()] = e;
              });
            const g = { statusCode: u.status, headers: y, body: null },
              b = Object.assign(
                null !== (l = u.body) && void 0 !== l ? l : {},
                {
                  text: (0, a.n)(() => u.text()),
                  blob: (0, a.n)(() => u.blob()),
                  json: (0, a.n)(() => u.json()),
                }
              );
            return (0, r.A)((0, r.A)({}, g), {}, { body: b });
          };
      },
      53060: (e, t, n) => {
        "use strict";
        n.d(t, { F: () => s });
        var r = n(17662),
          o = n(48012),
          i = n(45909),
          a = n(95634);
        const s = (0, i.q)(a.Q, [o.L, r.b]);
      },
      67161: (e, t, n) => {
        "use strict";
        n.d(t, { A: () => o });
        var r = n(89379);
        const o = (e, t, n, o) => async (i, a) => {
          const s = (0, r.A)((0, r.A)({}, o), i),
            l = await s.endpointResolver(s, a),
            u = await t(a, l),
            c = await e(u, (0, r.A)({}, s));
          return n(c);
        };
      },
      45909: (e, t, n) => {
        "use strict";
        n.d(t, { q: () => r });
        const r = (e, t) => (n, r) => {
          const o = {};
          let i = (t) => e(t, r);
          for (let e = t.length - 1; e >= 0; e--) {
            i = (0, t[e])(r)(i, o);
          }
          return i(n);
        };
      },
      35122: (e, t, n) => {
        "use strict";
        n.d(t, { D: () => i });
        var r = n(34464);
        const o = [
            "AuthFailure",
            "InvalidSignatureException",
            "RequestExpired",
            "RequestInTheFuture",
            "RequestTimeTooSkewed",
            "SignatureDoesNotMatch",
            "BadRequestException",
          ],
          i = (e) => async (t, n) => {
            var r;
            const i =
                null !== (r = null !== n && void 0 !== n ? n : await e(t)) &&
                void 0 !== r
                  ? r
                  : void 0,
              a =
                (null === i || void 0 === i ? void 0 : i.code) ||
                (null === i || void 0 === i ? void 0 : i.name),
              s = null === t || void 0 === t ? void 0 : t.statusCode;
            return {
              retryable:
                u(n) || l(s, a) || ((e) => !!e && o.includes(e))(a) || c(s, a),
            };
          },
          a = [
            "BandwidthLimitExceeded",
            "EC2ThrottledException",
            "LimitExceededException",
            "PriorRequestNotComplete",
            "ProvisionedThroughputExceededException",
            "RequestLimitExceeded",
            "RequestThrottled",
            "RequestThrottledException",
            "SlowDown",
            "ThrottledException",
            "Throttling",
            "ThrottlingException",
            "TooManyRequestsException",
          ],
          s = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"],
          l = (e, t) => 429 === e || (!!t && a.includes(t)),
          u = (e) =>
            [r.m.NetworkError, "ERR_NETWORK"].includes(
              null === e || void 0 === e ? void 0 : e.name
            ),
          c = (e, t) =>
            (!!e && [500, 502, 503, 504].includes(e)) || (!!t && s.includes(t));
      },
      41297: (e, t, n) => {
        "use strict";
        n.d(t, { y: () => i });
        var r = n(10679);
        const o = 3e5,
          i = (e) => {
            const t = (0, r.y)(o)(e);
            return !1 === t ? o : t;
          };
      },
      17662: (e, t, n) => {
        "use strict";
        n.d(t, { b: () => i });
        var r = n(89379);
        const o = 3,
          i = (e) => {
            let {
              maxAttempts: t = o,
              retryDecider: n,
              computeDelay: r,
              abortSignal: i,
            } = e;
            if (t < 1) throw new Error("maxAttempts must be greater than 0");
            return (e, o) =>
              async function (l) {
                var u;
                let c,
                  d,
                  f = null !== (u = o.attemptsCount) && void 0 !== u ? u : 0;
                const p = () => {
                  if (d) return s(d, f), d;
                  throw (s(c, f), c);
                };
                for (; (null === i || void 0 === i || !i.aborted) && f < t; ) {
                  var h, m;
                  try {
                    (d = await e(l)), (c = void 0);
                  } catch (v) {
                    (c = v), (d = void 0);
                  }
                  (f =
                    (null !== (h = o.attemptsCount) && void 0 !== h ? h : 0) > f
                      ? null !== (m = o.attemptsCount) && void 0 !== m
                        ? m
                        : 0
                      : f + 1),
                    (o.attemptsCount = f);
                  const { isCredentialsExpiredError: s, retryable: u } =
                    await n(d, c, o);
                  if (!u) return p();
                  if (
                    ((o.isCredentialsExpired = !!s),
                    (null === i || void 0 === i || !i.aborted) && f < t)
                  ) {
                    const e = r(f);
                    await a(e, i);
                  }
                }
                if (null !== i && void 0 !== i && i.aborted)
                  throw new Error("Request aborted.");
                return p();
              };
          },
          a = (e, t) => {
            if (null !== t && void 0 !== t && t.aborted)
              return Promise.resolve();
            let n, r;
            const o = new Promise((t) => {
              (r = t), (n = setTimeout(t, e));
            });
            return (
              null === t ||
                void 0 === t ||
                t.addEventListener("abort", function e(o) {
                  clearTimeout(n),
                    null === t ||
                      void 0 === t ||
                      t.removeEventListener("abort", e),
                    r();
                }),
              o
            );
          },
          s = (e, t) => {
            var n;
            "[object Object]" === Object.prototype.toString.call(e) &&
              (e.$metadata = (0, r.A)(
                (0, r.A)(
                  {},
                  null !== (n = e.$metadata) && void 0 !== n ? n : {}
                ),
                {},
                { attempts: t }
              ));
          };
      },
      55122: (e, t, n) => {
        "use strict";
        n.d(t, { I: () => a });
        var r = n(51163);
        n(83157), n(21547);
        const o = (e) => new Date(Date.now() + e),
          i = (e, t) =>
            ((e, t) => Math.abs(o(t).getTime() - e) >= 3e5)(e, t)
              ? e - Date.now()
              : t,
          a = (e) => {
            let t,
              {
                credentials: n,
                region: a,
                service: l,
                uriEscapePath: u = !0,
              } = e;
            return (e, c) =>
              async function (d) {
                var f;
                t = null !== (f = t) && void 0 !== f ? f : 0;
                const p = {
                    credentials:
                      "function" === typeof n
                        ? await n({
                            forceRefresh: !(
                              null === c ||
                              void 0 === c ||
                              !c.isCredentialsExpired
                            ),
                          })
                        : n,
                    signingDate: o(t),
                    signingRegion: a,
                    signingService: l,
                    uriEscapePath: u,
                  },
                  h = await (0, r.z)(d, p),
                  m = await e(h),
                  v = s(m);
                return v && (t = i(Date.parse(v), t)), m;
              };
          },
          s = function () {
            var e, t;
            let { headers: n } =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return null !==
              (e =
                null !== (t = null === n || void 0 === n ? void 0 : n.date) &&
                void 0 !== t
                  ? t
                  : null === n || void 0 === n
                  ? void 0
                  : n.Date) && void 0 !== e
              ? e
              : null === n || void 0 === n
              ? void 0
              : n["x-amz-date"];
          };
      },
      17294: (e, t, n) => {
        "use strict";
        n.d(t, {
          EK: () => m,
          FY: () => l,
          H1: () => c,
          MS: () => a,
          VQ: () => h,
          XI: () => r,
          Zs: () => o,
          cR: () => s,
          fM: () => y,
          nt: () => v,
          ot: () => f,
          r2: () => u,
          tI: () => i,
          wE: () => p,
          z8: () => g,
          zX: () => d,
        });
        const r = "X-Amz-Algorithm",
          o = "X-Amz-Date",
          i = "X-Amz-Credential",
          a = "X-Amz-Expires",
          s = "X-Amz-Signature",
          l = "X-Amz-SignedHeaders",
          u = "X-Amz-Security-Token",
          c = "authorization",
          d = "host",
          f = o.toLowerCase(),
          p = u.toLowerCase(),
          h = "aws4_request",
          m = "AWS4-HMAC-SHA256",
          v = "AWS4",
          y =
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          g = "UNSIGNED-PAYLOAD";
      },
      51163: (e, t, n) => {
        "use strict";
        n.d(t, { z: () => l });
        var r = n(89379),
          o = n(37823),
          i = n(14358),
          a = n(17294),
          s = n(26630);
        const l = (e, t) => {
          const n = (0, i.y)(t),
            {
              accessKeyId: l,
              credentialScope: u,
              longDate: c,
              sessionToken: d,
            } = n,
            f = (0, r.A)({}, e.headers);
          (f[a.zX] = e.url.host), (f[a.ot] = c), d && (f[a.wE] = d);
          const p = (0, r.A)((0, r.A)({}, e), {}, { headers: f }),
            h = (0, s.d)(p, n),
            m = "Credential=".concat(l, "/").concat(u),
            v = "SignedHeaders=".concat((0, o.Z)(f)),
            y = "Signature=".concat(h);
          return (
            (f[a.H1] = ""
              .concat(a.EK, " ")
              .concat(m, ", ")
              .concat(v, ", ")
              .concat(y)),
            p
          );
        };
      },
      44340: (e, t, n) => {
        "use strict";
        n.d(t, { I: () => i, h: () => a });
        var r = n(83157),
          o = n(21547);
        const i = (e, t) => {
            const n = new r.I(null !== e && void 0 !== e ? e : void 0);
            n.update(t);
            return n.digestSync();
          },
          a = (e, t) => {
            const n = i(e, t);
            return (0, o.n)(n);
          };
      },
      89578: (e, t, n) => {
        "use strict";
        n.d(t, { M: () => i });
        var r = n(17294),
          o = n(44340);
        const i = (e) => {
            if (null == e) return r.fM;
            if (a(e)) {
              return (0, o.h)(null, e);
            }
            return r.z8;
          },
          a = (e) => "string" === typeof e || ArrayBuffer.isView(e) || s(e),
          s = (e) =>
            ("function" === typeof ArrayBuffer && e instanceof ArrayBuffer) ||
            "[object ArrayBuffer]" === Object.prototype.toString.call(e);
      },
      26630: (e, t, n) => {
        "use strict";
        n.d(t, { d: () => d });
        var r = n(44340);
        const o = (e) =>
            Object.entries(e)
              .map((e) => {
                var t;
                let [n, r] = e;
                return {
                  key: n.toLowerCase(),
                  value:
                    null !==
                      (t =
                        null === r || void 0 === r
                          ? void 0
                          : r.trim().replace(/\s+/g, " ")) && void 0 !== t
                      ? t
                      : "",
                };
              })
              .sort((e, t) => (e.key < t.key ? -1 : 1))
              .map((e) => "".concat(e.key, ":").concat(e.value, "\n"))
              .join(""),
          i = (e) => encodeURIComponent(e).replace(/[!'()*]/g, a),
          a = (e) => "%".concat(e.charCodeAt(0).toString(16).toUpperCase()),
          s = function (e) {
            return e
              ? !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1]
                ? encodeURIComponent(e).replace(/%2F/g, "/")
                : e
              : "/";
          };
        var l = n(89578),
          u = n(37823);
        var c = n(17294);
        const d = (e, t) => {
          let {
            credentialScope: n,
            longDate: a,
            secretAccessKey: d,
            shortDate: f,
            signingRegion: p,
            signingService: h,
            uriEscapePath: m,
          } = t;
          const v = (function (e) {
              let { body: t, headers: n, method: r, url: a } = e,
                c =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1];
              return [
                r,
                s(a.pathname, c),
                ((d = a.searchParams),
                Array.from(d)
                  .sort((e, t) => {
                    let [n, r] = e,
                      [o, i] = t;
                    return n === o ? (r < i ? -1 : 1) : n < o ? -1 : 1;
                  })
                  .map((e) => {
                    let [t, n] = e;
                    return "".concat(i(t), "=").concat(i(n));
                  })
                  .join("&")),
                o(n),
                (0, u.Z)(n),
                (0, l.M)(t),
              ].join("\n");
              var d;
            })(e, m),
            y = ((e, t, n) => [c.EK, e, t, n].join("\n"))(
              a,
              n,
              (0, r.h)(null, v)
            ),
            g = (0, r.h)(
              ((e, t, n, o) => {
                const i = "".concat(c.nt).concat(e),
                  a = (0, r.I)(i, t),
                  s = (0, r.I)(a, n),
                  l = (0, r.I)(s, o);
                return (0, r.I)(l, c.VQ);
              })(d, f, p, h),
              y
            );
          return g;
        };
      },
      37823: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => r });
        const r = (e) =>
          Object.keys(e)
            .map((e) => e.toLowerCase())
            .sort()
            .join(";");
      },
      14358: (e, t, n) => {
        "use strict";
        n.d(t, { y: () => o });
        var r = n(17294);
        const o = (e) => {
          let {
            credentials: t,
            signingDate: n = new Date(),
            signingRegion: o,
            signingService: i,
            uriEscapePath: a = !0,
          } = e;
          const { accessKeyId: s, secretAccessKey: l, sessionToken: u } = t,
            { longDate: c, shortDate: d } = ((e) => {
              const t = e.toISOString().replace(/[:-]|\.\d{3}/g, "");
              return { longDate: t, shortDate: t.slice(0, 8) };
            })(n);
          var f, p;
          return {
            accessKeyId: s,
            credentialScope:
              ((f = o),
              (p = i),
              "".concat(d, "/").concat(f, "/").concat(p, "/").concat(r.VQ)),
            longDate: c,
            secretAccessKey: l,
            sessionToken: u,
            shortDate: d,
            signingRegion: o,
            signingService: i,
            uriEscapePath: a,
          };
        };
      },
      48012: (e, t, n) => {
        "use strict";
        n.d(t, { L: () => r });
        const r = (e) => {
          let {
            userAgentHeader: t = "x-amz-user-agent",
            userAgentValue: n = "",
          } = e;
          return (e) =>
            async function (r) {
              if (0 === n.trim().length) {
                return await e(r);
              }
              {
                const o = t.toLowerCase();
                r.headers[o] = r.headers[o]
                  ? "".concat(r.headers[o], " ").concat(n)
                  : n;
                return await e(r);
              }
            };
        };
      },
      1068: (e, t, n) => {
        "use strict";
        n.d(t, { F: () => o, Y: () => i });
        var r = n(3827);
        const o = async (e) => {
            var t, n, o, a, s;
            if (!e || e.statusCode < 300) return;
            const l = await i(e),
              u = ((e) => {
                const [t] = e.toString().split(/[,:]+/);
                return t.includes("#") ? t.split("#")[1] : t;
              })(
                null !==
                  (t =
                    null !==
                      (n =
                        null !== (o = e.headers["x-amzn-errortype"]) &&
                        void 0 !== o
                          ? o
                          : l.code) && void 0 !== n
                      ? n
                      : l.__type) && void 0 !== t
                  ? t
                  : "UnknownError"
              ),
              c =
                null !==
                  (a =
                    null !== (s = l.message) && void 0 !== s ? s : l.Message) &&
                void 0 !== a
                  ? a
                  : "Unknown error",
              d = new Error(c);
            return Object.assign(d, { name: u, $metadata: (0, r.j)(e) });
          },
          i = async (e) => {
            if (!e.body) throw new Error("Missing response payload");
            const t = await e.body.json();
            return Object.assign(t, { $metadata: (0, r.j)(e) });
          };
      },
      3827: (e, t, n) => {
        "use strict";
        n.d(t, { j: () => o });
        var r = n(89379);
        const o = (e) => {
            var t, n;
            const { headers: o, statusCode: a } = e;
            return (0, r.A)(
              (0, r.A)({}, i(e) ? e.$metadata : {}),
              {},
              {
                httpStatusCode: a,
                requestId:
                  null !==
                    (t =
                      null !== (n = o["x-amzn-requestid"]) && void 0 !== n
                        ? n
                        : o["x-amzn-request-id"]) && void 0 !== t
                    ? t
                    : o["x-amz-request-id"],
                extendedRequestId: o["x-amz-id-2"],
                cfId: o["x-amz-cf-id"],
              }
            );
          },
          i = (e) =>
            "object" ===
            typeof (null === e || void 0 === e ? void 0 : e.$metadata);
      },
      75640: (e, t, n) => {
        "use strict";
        n.d(t, { n: () => r });
        const r = (e) => {
          let t;
          return () => (t || (t = e()), t);
        };
      },
      2206: (e, t, n) => {
        "use strict";
        n.d(t, { OU: () => r, YJ: () => o, d1: () => i });
        const r = "Logging",
          o = "x-amz-user-agent",
          i = "NoHubcallbackProvidedException";
      },
      71439: (e, t, n) => {
        "use strict";
        n.d(t, { x: () => r });
        class r extends Error {
          constructor(e) {
            let {
              message: t,
              name: n,
              recoverySuggestion: o,
              underlyingError: i,
            } = e;
            super(t),
              (this.name = n),
              (this.underlyingError = i),
              (this.recoverySuggestion = o),
              (this.constructor = r),
              Object.setPrototypeOf(this, r.prototype);
          }
        }
      },
      8895: (e, t, n) => {
        "use strict";
        n.d(t, { p: () => o });
        var r = n(71439);
        const o = function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : r.x;
          return (n, r, o) => {
            const { message: i, recoverySuggestion: a } = e[r];
            if (!n)
              throw new t({
                name: r,
                message: o ? "".concat(i, " ").concat(o) : i,
                recoverySuggestion: a,
              });
          };
        };
      },
      30348: (e, t, n) => {
        "use strict";
        n.d(t, { H: () => l });
        var r = n(98173);
        const o = (e) => {
            const t = Reflect.ownKeys(e);
            for (const n of t) {
              const t = e[n];
              ((t && "object" === typeof t) || "function" === typeof t) && o(t);
            }
            return Object.freeze(e);
          },
          i = Symbol("oauth-listener");
        var a = n(91095),
          s = n(45022);
        n(83157), n(21547);
        const l = new (class {
          constructor() {
            (this.oAuthListener = void 0),
              (this.resourcesConfig = {}),
              (this.libraryOptions = {}),
              (this.Auth = new s.J());
          }
          configure(e, t) {
            const n = (0, a.M)(e);
            (this.resourcesConfig = n),
              t && (this.libraryOptions = t),
              (this.resourcesConfig = o(this.resourcesConfig)),
              this.Auth.configure(
                this.resourcesConfig.Auth,
                this.libraryOptions.Auth
              ),
              r.YZ.dispatch(
                "core",
                { event: "configure", data: this.resourcesConfig },
                "Configure",
                r.U9
              ),
              this.notifyOAuthListener();
          }
          getConfig() {
            return this.resourcesConfig;
          }
          [i](e) {
            var t, n;
            null !== (t = this.resourcesConfig.Auth) &&
            void 0 !== t &&
            null !== (t = t.Cognito.loginWith) &&
            void 0 !== t &&
            t.oauth
              ? e(
                  null === (n = this.resourcesConfig.Auth) || void 0 === n
                    ? void 0
                    : n.Cognito
                )
              : (this.oAuthListener = e);
          }
          notifyOAuthListener() {
            var e, t;
            null !== (e = this.resourcesConfig.Auth) &&
              void 0 !== e &&
              null !== (e = e.Cognito.loginWith) &&
              void 0 !== e &&
              e.oauth &&
              this.oAuthListener &&
              (this.oAuthListener(
                null === (t = this.resourcesConfig.Auth) || void 0 === t
                  ? void 0
                  : t.Cognito
              ),
              (this.oAuthListener = void 0));
          }
        })();
      },
      45022: (e, t, n) => {
        "use strict";
        function r(e) {
          let { expiresAt: t, clockDrift: n } = e;
          return Date.now() + n > t;
        }
        n.d(t, { H: () => r, J: () => o });
        class o {
          configure(e, t) {
            (this.authConfig = e), (this.authOptions = t);
          }
          async fetchAuthSession() {
            var e, t;
            let n,
              r,
              o =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
            const i = await this.getTokens(o);
            var a, s, l;
            i
              ? ((r =
                  null === (a = i.accessToken) ||
                  void 0 === a ||
                  null === (a = a.payload) ||
                  void 0 === a
                    ? void 0
                    : a.sub),
                (n = await (null === (s = this.authOptions) ||
                void 0 === s ||
                null === (s = s.credentialsProvider) ||
                void 0 === s
                  ? void 0
                  : s.getCredentialsAndIdentityId({
                      authConfig: this.authConfig,
                      tokens: i,
                      authenticated: !0,
                      forceRefresh: o.forceRefresh,
                    }))))
              : (n = await (null === (l = this.authOptions) ||
                void 0 === l ||
                null === (l = l.credentialsProvider) ||
                void 0 === l
                  ? void 0
                  : l.getCredentialsAndIdentityId({
                      authConfig: this.authConfig,
                      authenticated: !1,
                      forceRefresh: o.forceRefresh,
                    })));
            return {
              tokens: i,
              credentials:
                null === (e = n) || void 0 === e ? void 0 : e.credentials,
              identityId:
                null === (t = n) || void 0 === t ? void 0 : t.identityId,
              userSub: r,
            };
          }
          async clearCredentials() {
            var e;
            await (null === (e = this.authOptions) ||
            void 0 === e ||
            null === (e = e.credentialsProvider) ||
            void 0 === e
              ? void 0
              : e.clearCredentialsAndIdentityId());
          }
          async getTokens(e) {
            var t, n;
            return null !==
              (t = await (null === (n = this.authOptions) ||
              void 0 === n ||
              null === (n = n.tokenProvider) ||
              void 0 === n
                ? void 0
                : n.getTokens(e))) && void 0 !== t
              ? t
              : void 0;
          }
        }
      },
      32770: (e, t, n) => {
        "use strict";
        n.d(t, { Eh: () => c, G6: () => u, $y: () => l, Cq: () => d });
        var r,
          o = n(10846),
          i = n(8895);
        !(function (e) {
          (e.AuthTokenConfigException = "AuthTokenConfigException"),
            (e.AuthUserPoolAndIdentityPoolException =
              "AuthUserPoolAndIdentityPoolException"),
            (e.AuthUserPoolException = "AuthUserPoolException"),
            (e.InvalidIdentityPoolIdException =
              "InvalidIdentityPoolIdException"),
            (e.OAuthNotConfigureException = "OAuthNotConfigureException");
        })(r || (r = {}));
        const a = {
            [r.AuthTokenConfigException]: {
              message: "Auth Token Provider not configured.",
              recoverySuggestion:
                "Make sure to call Amplify.configure in your app.",
            },
            [r.AuthUserPoolAndIdentityPoolException]: {
              message: "Auth UserPool or IdentityPool not configured.",
              recoverySuggestion:
                "Make sure to call Amplify.configure in your app with UserPoolId and IdentityPoolId.",
            },
            [r.AuthUserPoolException]: {
              message: "Auth UserPool not configured.",
              recoverySuggestion:
                "Make sure to call Amplify.configure in your app with userPoolId and userPoolClientId.",
            },
            [r.InvalidIdentityPoolIdException]: {
              message: "Invalid identity pool id provided.",
              recoverySuggestion:
                "Make sure a valid identityPoolId is given in the config.",
            },
            [r.OAuthNotConfigureException]: {
              message: "oauth param not configured.",
              recoverySuggestion:
                "Make sure to call Amplify.configure with oauth parameter in your app.",
            },
          },
          s = (0, i.p)(a);
        function l(e) {
          let t = !0;
          (t = !!e && !!e.userPoolId && !!e.userPoolClientId),
            s(t, r.AuthUserPoolException);
        }
        function u(e) {
          var t, n, o, i;
          const a =
            !(
              null === e ||
              void 0 === e ||
              null === (t = e.loginWith) ||
              void 0 === t ||
              null === (t = t.oauth) ||
              void 0 === t ||
              !t.domain
            ) &&
            !(
              null === e ||
              void 0 === e ||
              null === (n = e.loginWith) ||
              void 0 === n ||
              null === (n = n.oauth) ||
              void 0 === n ||
              !n.redirectSignOut
            ) &&
            !(
              null === e ||
              void 0 === e ||
              null === (o = e.loginWith) ||
              void 0 === o ||
              null === (o = o.oauth) ||
              void 0 === o ||
              !o.redirectSignIn
            ) &&
            !(
              null === e ||
              void 0 === e ||
              null === (i = e.loginWith) ||
              void 0 === i ||
              null === (i = i.oauth) ||
              void 0 === i ||
              !i.responseType
            );
          s(a, r.OAuthNotConfigureException);
        }
        function c(e) {
          const t = !(null === e || void 0 === e || !e.identityPoolId);
          s(t, r.InvalidIdentityPoolIdException);
        }
        function d(e) {
          const t = e.split(".");
          if (3 !== t.length) throw new Error("Invalid token");
          try {
            const n = t[1].replace(/-/g, "+").replace(/_/g, "/"),
              r = decodeURIComponent(
                o.m
                  .convert(n)
                  .split("")
                  .map((e) =>
                    "%".concat(
                      "00".concat(e.charCodeAt(0).toString(16)).slice(-2)
                    )
                  )
                  .join("")
              );
            return { toString: () => e, payload: JSON.parse(r) };
          } catch (n) {
            throw new Error("Invalid token payload");
          }
        }
      },
      97648: (e, t, n) => {
        "use strict";
        n.d(t, { $: () => o });
        var r = n(30348);
        const o = (e) => ((e, t) => e.Auth.fetchAuthSession(t))(r.H, e);
      },
      96360: (e, t, n) => {
        "use strict";
        n.d(t, { ZL: () => c });
        var r = n(34464),
          o = n(71439);
        class i extends o.x {
          constructor() {
            super({
              name: r.m.PlatformNotSupported,
              message: "Function not supported on current platform",
            });
          }
        }
        class a {
          constructor(e) {
            this.storage = e;
          }
          async setItem(e, t) {
            if (!this.storage) throw new i();
            this.storage.setItem(e, t);
          }
          async getItem(e) {
            if (!this.storage) throw new i();
            return this.storage.getItem(e);
          }
          async removeItem(e) {
            if (!this.storage) throw new i();
            this.storage.removeItem(e);
          }
          async clear() {
            if (!this.storage) throw new i();
            this.storage.clear();
          }
        }
        var s = n(44619);
        class l {
          constructor() {
            this.storage = new Map();
          }
          get length() {
            return this.storage.size;
          }
          key(e) {
            return e > this.length - 1
              ? null
              : Array.from(this.storage.keys())[e];
          }
          setItem(e, t) {
            this.storage.set(e, t);
          }
          getItem(e) {
            var t;
            return null !== (t = this.storage.get(e)) && void 0 !== t
              ? t
              : null;
          }
          removeItem(e) {
            this.storage.delete(e);
          }
          clear() {
            this.storage.clear();
          }
        }
        const u = new s.C("CoreStorageUtils");
        const c = new (class extends a {
          constructor() {
            super(
              (() => {
                try {
                  if ("undefined" !== typeof window && window.localStorage)
                    return window.localStorage;
                } catch (e) {
                  u.info(
                    "localStorage not found. InMemoryStorage is used as a fallback."
                  );
                }
                return new l();
              })()
            );
          }
        })();
        new (class extends a {
          constructor() {
            super(
              (() => {
                try {
                  if ("undefined" !== typeof window && window.sessionStorage)
                    return (
                      window.sessionStorage.getItem("test"),
                      window.sessionStorage
                    );
                  throw new Error("sessionStorage is not defined");
                } catch (e) {
                  return (
                    u.info(
                      "sessionStorage not found. InMemoryStorage is used as a fallback."
                    ),
                    new l()
                  );
                }
              })()
            );
          }
        })(),
          new a(new l());
      },
      34464: (e, t, n) => {
        "use strict";
        var r;
        n.d(t, { m: () => r }),
          (function (e) {
            (e.NoEndpointId = "NoEndpointId"),
              (e.PlatformNotSupported = "PlatformNotSupported"),
              (e.Unknown = "Unknown"),
              (e.NetworkError = "NetworkError");
          })(r || (r = {}));
      },
      80727: (e, t, n) => {
        "use strict";
        n.d(t, { g: () => o, o: () => r });
        const r = URL,
          o = URLSearchParams;
      },
      10846: (e, t, n) => {
        "use strict";
        n.d(t, { m: () => o });
        var r = n(7886);
        const o = {
          convert(e, t) {
            let n = e;
            return (
              null !== t &&
                void 0 !== t &&
                t.urlSafe &&
                (n = n.replace(/-/g, "+").replace(/_/g, "/")),
              (0, r.nW)()(n)
            );
          },
        };
      },
      10676: (e, t, n) => {
        "use strict";
        n.d(t, { Y: () => o });
        var r = n(7886);
        const o = {
          convert(e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : { urlSafe: !1, skipPadding: !1 };
            const n =
              "string" === typeof e
                ? e
                : (function (e) {
                    return Array.from(e, (e) => String.fromCodePoint(e)).join(
                      ""
                    );
                  })(e);
            let o = (0, r.xA)()(n);
            return (
              t.urlSafe && (o = o.replace(/\+/g, "-").replace(/\//g, "_")),
              t.skipPadding && (o = o.replace(/=/g, "")),
              o
            );
          },
        };
      },
      7886: (e, t, n) => {
        "use strict";
        n.d(t, { MY: () => o, nW: () => a, xA: () => i });
        var r = n(71439);
        const o = () => {
            if ("object" === typeof window && "object" === typeof window.crypto)
              return window.crypto;
            if ("object" === typeof crypto) return crypto;
            throw new r.x({
              name: "MissingPolyfill",
              message:
                "Cannot resolve the `crypto` function from the environment.",
            });
          },
          i = () => {
            if (
              "undefined" !== typeof window &&
              "function" === typeof window.btoa
            )
              return window.btoa;
            if ("function" === typeof btoa) return btoa;
            throw new r.x({
              name: "Base64EncoderError",
              message:
                "Cannot resolve the `btoa` function from the environment.",
            });
          },
          a = () => {
            if (
              "undefined" !== typeof window &&
              "function" === typeof window.atob
            )
              return window.atob;
            if ("function" === typeof atob) return atob;
            throw new r.x({
              name: "Base64EncoderError",
              message:
                "Cannot resolve the `atob` function from the environment.",
            });
          };
      },
      54163: (e, t, n) => {
        "use strict";
        n.d(t, { B: () => r });
        const r = () =>
          "undefined" !== typeof window &&
          "undefined" !== typeof window.document;
      },
      91095: (e, t, n) => {
        "use strict";
        n.d(t, { M: () => g });
        var r = n(89379),
          o = n(44619),
          i = n(71439);
        const a = new o.C("parseAWSExports"),
          s = {
            API_KEY: "apiKey",
            AWS_IAM: "iam",
            AMAZON_COGNITO_USER_POOLS: "userPool",
            OPENID_CONNECT: "oidc",
            NONE: "none",
            AWS_LAMBDA: "lambda",
            LAMBDA: "lambda",
          },
          l = (e) => {
            var t;
            return null !==
              (t = null === e || void 0 === e ? void 0 : e.split(",")) &&
              void 0 !== t
              ? t
              : [];
          },
          u = (e) => {
            let {
              domain: t,
              scope: n,
              redirectSignIn: r,
              redirectSignOut: o,
              responseType: i,
            } = e;
            return {
              domain: t,
              scopes: n,
              redirectSignIn: l(r),
              redirectSignOut: l(o),
              responseType: i,
            };
          },
          c = (e) =>
            e.map((e) => {
              const t = e.toLowerCase();
              return t.charAt(0).toUpperCase() + t.slice(1);
            });
        function d(e) {
          const t = {};
          if (
            (e.storage &&
              (t.Storage = (function (e) {
                if (!e) return;
                const { bucket_name: t, aws_region: n, buckets: r } = e;
                return { S3: { bucket: t, region: n, buckets: r && y(r) } };
              })(e.storage)),
            e.auth &&
              (t.Auth = (function (e) {
                if (!e) return;
                const {
                    user_pool_id: t,
                    user_pool_client_id: n,
                    identity_pool_id: o,
                    password_policy: i,
                    mfa_configuration: a,
                    mfa_methods: s,
                    unauthenticated_identities_enabled: l,
                    oauth: u,
                    username_attributes: c,
                    standard_required_attributes: d,
                    groups: f,
                  } = e,
                  p = {
                    Cognito: { userPoolId: t, userPoolClientId: n, groups: f },
                  };
                var h;
                return (
                  o &&
                    (p.Cognito = (0, r.A)(
                      (0, r.A)({}, p.Cognito),
                      {},
                      { identityPoolId: o }
                    )),
                  i &&
                    (p.Cognito.passwordFormat = {
                      requireLowercase: i.require_lowercase,
                      requireNumbers: i.require_numbers,
                      requireUppercase: i.require_uppercase,
                      requireSpecialCharacters: i.require_symbols,
                      minLength:
                        null !== (h = i.min_length) && void 0 !== h ? h : 6,
                    }),
                  a &&
                    (p.Cognito.mfa = {
                      status: v(a),
                      smsEnabled:
                        null === s || void 0 === s ? void 0 : s.includes("SMS"),
                      totpEnabled:
                        null === s || void 0 === s
                          ? void 0
                          : s.includes("TOTP"),
                    }),
                  l && (p.Cognito.allowGuestAccess = l),
                  u &&
                    (p.Cognito.loginWith = {
                      oauth: {
                        domain: u.domain,
                        redirectSignIn: u.redirect_sign_in_uri,
                        redirectSignOut: u.redirect_sign_out_uri,
                        responseType:
                          "token" === u.response_type ? "token" : "code",
                        scopes: u.scopes,
                        providers: m(u.identity_providers),
                      },
                    }),
                  c &&
                    (p.Cognito.loginWith = (0, r.A)(
                      (0, r.A)({}, p.Cognito.loginWith),
                      {},
                      {
                        email: c.includes("email"),
                        phone: c.includes("phone_number"),
                        username: c.includes("username"),
                      }
                    )),
                  d &&
                    (p.Cognito.userAttributes = d.reduce(
                      (e, t) =>
                        (0, r.A)(
                          (0, r.A)({}, e),
                          {},
                          { [t]: { required: !0 } }
                        ),
                      {}
                    )),
                  p
                );
              })(e.auth)),
            e.analytics &&
              (t.Analytics = (function (e) {
                if (null === e || void 0 === e || !e.amazon_pinpoint) return;
                const { amazon_pinpoint: t } = e;
                return { Pinpoint: { appId: t.app_id, region: t.aws_region } };
              })(e.analytics)),
            e.geo &&
              (t.Geo = (function (e) {
                if (!e) return;
                const {
                  aws_region: t,
                  geofence_collections: n,
                  maps: r,
                  search_indices: o,
                } = e;
                return {
                  LocationService: {
                    region: t,
                    searchIndices: o,
                    geofenceCollections: n,
                    maps: r,
                  },
                };
              })(e.geo)),
            e.data &&
              (t.API = (function (e) {
                if (!e) return;
                const {
                  aws_region: t,
                  default_authorization_type: n,
                  url: r,
                  api_key: o,
                  model_introspection: i,
                } = e;
                return {
                  GraphQL: {
                    endpoint: r,
                    defaultAuthMode: p(n),
                    region: t,
                    apiKey: o,
                    modelIntrospection: i,
                  },
                };
              })(e.data)),
            e.custom)
          ) {
            const n = (function (e) {
              if (null === e || void 0 === e || !e.events) return;
              const {
                url: t,
                aws_region: n,
                api_key: r,
                default_authorization_type: o,
              } = e.events;
              return {
                Events: {
                  endpoint: t,
                  defaultAuthMode: p(o),
                  region: n,
                  apiKey: r,
                },
              };
            })(e.custom);
            n && "Events" in n && (t.API = (0, r.A)((0, r.A)({}, t.API), n));
          }
          return (
            e.notifications &&
              (t.Notifications = (function (e) {
                if (!e) return;
                const {
                    aws_region: t,
                    channels: n,
                    amazon_pinpoint_app_id: r,
                  } = e,
                  o = n.includes("IN_APP_MESSAGING"),
                  i = n.includes("APNS") || n.includes("FCM");
                if (!o && !i) return;
                const a = {};
                return (
                  o &&
                    (a.InAppMessaging = { Pinpoint: { appId: r, region: t } }),
                  i &&
                    (a.PushNotification = {
                      Pinpoint: { appId: r, region: t },
                    }),
                  a
                );
              })(e.notifications)),
            t
          );
        }
        const f = {
          AMAZON_COGNITO_USER_POOLS: "userPool",
          API_KEY: "apiKey",
          AWS_IAM: "iam",
          AWS_LAMBDA: "lambda",
          OPENID_CONNECT: "oidc",
        };
        function p(e) {
          return f[e];
        }
        const h = {
          GOOGLE: "Google",
          LOGIN_WITH_AMAZON: "Amazon",
          FACEBOOK: "Facebook",
          SIGN_IN_WITH_APPLE: "Apple",
        };
        function m() {
          return (
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
          ).reduce((e, t) => (void 0 !== h[t] && e.push(h[t]), e), []);
        }
        function v(e) {
          return "OPTIONAL" === e
            ? "optional"
            : "REQUIRED" === e
            ? "on"
            : "off";
        }
        function y(e) {
          const t = {};
          return (
            e.forEach((e) => {
              let { name: n, bucket_name: r, aws_region: o, paths: i } = e;
              if (n in t)
                throw new Error(
                  "Duplicate friendly name found: ".concat(
                    n,
                    ". Name must be unique."
                  )
                );
              t[n] = { bucketName: r, region: o, paths: i };
            }),
            t
          );
        }
        const g = (e) =>
          Object.keys(e).some((e) => e.startsWith("aws_"))
            ? (function () {
                var e, t, n, o, l, d, f, p, h, m, v, y;
                let g =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                if (
                  !Object.prototype.hasOwnProperty.call(g, "aws_project_region")
                )
                  throw new i.x({
                    name: "InvalidParameterException",
                    message: "Invalid config parameter.",
                    recoverySuggestion:
                      "Ensure passing the config object imported from  `amplifyconfiguration.json`.",
                  });
                const {
                    aws_appsync_apiKey: b,
                    aws_appsync_authenticationType: w,
                    aws_appsync_graphqlEndpoint: S,
                    aws_appsync_region: k,
                    aws_bots_config: E,
                    aws_cognito_identity_pool_id: T,
                    aws_cognito_sign_up_verification_method: A,
                    aws_cognito_mfa_configuration: _,
                    aws_cognito_mfa_types: I,
                    aws_cognito_password_protection_settings: C,
                    aws_cognito_verification_mechanisms: x,
                    aws_cognito_signup_attributes: N,
                    aws_cognito_social_providers: O,
                    aws_cognito_username_attributes: D,
                    aws_mandatory_sign_in: P,
                    aws_mobile_analytics_app_id: R,
                    aws_mobile_analytics_app_region: L,
                    aws_user_files_s3_bucket: M,
                    aws_user_files_s3_bucket_region: F,
                    aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing:
                      U,
                    aws_user_pools_id: j,
                    aws_user_pools_web_client_id: z,
                    geo: $,
                    oauth: V,
                    predictions: K,
                    aws_cloud_logic_custom: q,
                    Notifications: B,
                    modelIntrospection: H,
                  } = g,
                  W = {};
                R && (W.Analytics = { Pinpoint: { appId: R, region: L } });
                const { InAppMessaging: G, Push: Q } =
                  null !== B && void 0 !== B ? B : {};
                if (
                  (null !== G && void 0 !== G && G.AWSPinpoint) ||
                  (null !== Q && void 0 !== Q && Q.AWSPinpoint)
                ) {
                  if (null !== G && void 0 !== G && G.AWSPinpoint) {
                    const { appId: e, region: t } = G.AWSPinpoint;
                    W.Notifications = {
                      InAppMessaging: { Pinpoint: { appId: e, region: t } },
                    };
                  }
                  if (null !== Q && void 0 !== Q && Q.AWSPinpoint) {
                    const { appId: e, region: t } = Q.AWSPinpoint;
                    W.Notifications = (0, r.A)(
                      (0, r.A)({}, W.Notifications),
                      {},
                      {
                        PushNotification: { Pinpoint: { appId: e, region: t } },
                      }
                    );
                  }
                }
                if (
                  (Array.isArray(E) &&
                    (W.Interactions = {
                      LexV1: Object.fromEntries(E.map((e) => [e.name, e])),
                    }),
                  S)
                ) {
                  const e = s[w];
                  e ||
                    a.debug(
                      "Invalid authentication type ".concat(
                        w,
                        ". Falling back to IAM."
                      )
                    ),
                    (W.API = {
                      GraphQL: {
                        endpoint: S,
                        apiKey: b,
                        region: k,
                        defaultAuthMode: null !== e && void 0 !== e ? e : "iam",
                      },
                    }),
                    H && (W.API.GraphQL.modelIntrospection = H);
                }
                const Y = _
                    ? {
                        status: _ && _.toLowerCase(),
                        totpEnabled:
                          null !==
                            (e =
                              null === I || void 0 === I
                                ? void 0
                                : I.includes("TOTP")) &&
                          void 0 !== e &&
                          e,
                        smsEnabled:
                          null !==
                            (t =
                              null === I || void 0 === I
                                ? void 0
                                : I.includes("SMS")) &&
                          void 0 !== t &&
                          t,
                      }
                    : void 0,
                  J = C
                    ? {
                        minLength: C.passwordPolicyMinLength,
                        requireLowercase:
                          null !==
                            (n =
                              null === (o = C.passwordPolicyCharacters) ||
                              void 0 === o
                                ? void 0
                                : o.includes("REQUIRES_LOWERCASE")) &&
                          void 0 !== n &&
                          n,
                        requireUppercase:
                          null !==
                            (l =
                              null === (d = C.passwordPolicyCharacters) ||
                              void 0 === d
                                ? void 0
                                : d.includes("REQUIRES_UPPERCASE")) &&
                          void 0 !== l &&
                          l,
                        requireNumbers:
                          null !==
                            (f =
                              null === (p = C.passwordPolicyCharacters) ||
                              void 0 === p
                                ? void 0
                                : p.includes("REQUIRES_NUMBERS")) &&
                          void 0 !== f &&
                          f,
                        requireSpecialCharacters:
                          null !==
                            (h =
                              null === (m = C.passwordPolicyCharacters) ||
                              void 0 === m
                                ? void 0
                                : m.includes("REQUIRES_SYMBOLS")) &&
                          void 0 !== h &&
                          h,
                      }
                    : void 0,
                  X = Array.from(
                    new Set([
                      ...(null !== x && void 0 !== x ? x : []),
                      ...(null !== N && void 0 !== N ? N : []),
                    ])
                  ).reduce(
                    (e, t) =>
                      (0, r.A)(
                        (0, r.A)({}, e),
                        {},
                        { [t.toLowerCase()]: { required: !0 } }
                      ),
                    {}
                  ),
                  Z =
                    null !==
                      (v =
                        null === D || void 0 === D
                          ? void 0
                          : D.includes("EMAIL")) &&
                    void 0 !== v &&
                    v,
                  ee =
                    null !==
                      (y =
                        null === D || void 0 === D
                          ? void 0
                          : D.includes("PHONE_NUMBER")) &&
                    void 0 !== y &&
                    y;
                (T || j) &&
                  (W.Auth = {
                    Cognito: {
                      identityPoolId: T,
                      allowGuestAccess: "enable" !== P,
                      signUpVerificationMethod: A,
                      userAttributes: X,
                      userPoolClientId: z,
                      userPoolId: j,
                      mfa: Y,
                      passwordFormat: J,
                      loginWith: { username: !(Z || ee), email: Z, phone: ee },
                    },
                  });
                const te = !!V && Object.keys(V).length > 0,
                  ne = !!O && O.length > 0;
                if (
                  (W.Auth &&
                    te &&
                    (W.Auth.Cognito.loginWith = (0, r.A)(
                      (0, r.A)({}, W.Auth.Cognito.loginWith),
                      {},
                      {
                        oauth: (0, r.A)(
                          (0, r.A)({}, u(V)),
                          ne && { providers: c(O) }
                        ),
                      }
                    )),
                  M &&
                    (W.Storage = {
                      S3: {
                        bucket: M,
                        region: F,
                        dangerouslyConnectToHttpEndpointForTesting: U,
                      },
                    }),
                  $)
                ) {
                  const { amazon_location_service: e } = $;
                  W.Geo = {
                    LocationService: {
                      maps: e.maps,
                      geofenceCollections: e.geofenceCollections,
                      searchIndices: e.search_indices,
                      region: e.region,
                    },
                  };
                }
                if (
                  (q &&
                    (W.API = (0, r.A)(
                      (0, r.A)({}, W.API),
                      {},
                      {
                        REST: q.reduce((e, t) => {
                          const {
                            name: n,
                            endpoint: o,
                            region: i,
                            service: a,
                          } = t;
                          return (0, r.A)(
                            (0, r.A)({}, e),
                            {},
                            {
                              [n]: (0, r.A)(
                                (0, r.A)(
                                  { endpoint: o },
                                  a ? { service: a } : void 0
                                ),
                                i ? { region: i } : void 0
                              ),
                            }
                          );
                        }, {}),
                      }
                    )),
                  K)
                ) {
                  var re, oe;
                  const { VoiceId: e } =
                    null !==
                      (re =
                        null === K ||
                        void 0 === K ||
                        null === (oe = K.convert) ||
                        void 0 === oe ||
                        null === (oe = oe.speechGenerator) ||
                        void 0 === oe
                          ? void 0
                          : oe.defaults) && void 0 !== re
                      ? re
                      : {};
                  W.Predictions = e
                    ? (0, r.A)(
                        (0, r.A)({}, K),
                        {},
                        {
                          convert: (0, r.A)(
                            (0, r.A)({}, K.convert),
                            {},
                            {
                              speechGenerator: (0, r.A)(
                                (0, r.A)({}, K.convert.speechGenerator),
                                {},
                                { defaults: { voiceId: e } }
                              ),
                            }
                          ),
                        }
                      )
                    : K;
                }
                return W;
              })(e)
            : (function (e) {
                const { version: t } = e;
                return !!t && t.startsWith("1");
              })(e)
            ? d(e)
            : e;
      },
      35567: (e, t, n) => {
        "use strict";
        n.d(t, { M: () => r });
        const r = 3e5;
      },
      10679: (e, t, n) => {
        "use strict";
        n.d(t, { y: () => o });
        var r = n(35567);
        function o() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : r.M;
          return (t) => {
            const n = 2 ** t * 100 + 100 * Math.random();
            return !(n > e) && n;
          };
        }
      },
      52134: (e, t, n) => {
        "use strict";
        n.d(t, {
          BV: () => Ce,
          C5: () => Te,
          KC: () => ue,
          Kd: () => lt,
          N_: () => ct,
          Zp: () => se,
          k2: () => dt,
          qh: () => _e,
          sv: () => Ae,
          zy: () => oe,
        });
        var r = n(53986),
          o = n(89379),
          i = n(65043);
        n(83175);
        const a = ["page"],
          s = ["page", "matches"],
          l = [
            "onClick",
            "discover",
            "prefetch",
            "relative",
            "reloadDocument",
            "replace",
            "state",
            "target",
            "to",
            "preventScrollReset",
            "viewTransition",
          ],
          u = [
            "aria-current",
            "caseSensitive",
            "className",
            "end",
            "style",
            "to",
            "viewTransition",
            "children",
          ],
          c = [
            "discover",
            "fetcherKey",
            "navigate",
            "reloadDocument",
            "replace",
            "state",
            "method",
            "action",
            "onSubmit",
            "relative",
            "preventScrollReset",
            "viewTransition",
          ];
        var d = "popstate";
        function f() {
          return b(
            function (e, t) {
              let { pathname: n, search: r, hash: o } = e.location;
              return v(
                "",
                { pathname: n, search: r, hash: o },
                (t.state && t.state.usr) || null,
                (t.state && t.state.key) || "default"
              );
            },
            function (e, t) {
              return "string" === typeof t ? t : y(t);
            },
            null,
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          );
        }
        function p(e, t) {
          if (!1 === e || null === e || "undefined" === typeof e)
            throw new Error(t);
        }
        function h(e, t) {
          if (!e) {
            "undefined" !== typeof console && console.warn(t);
            try {
              throw new Error(t);
            } catch (n) {}
          }
        }
        function m(e, t) {
          return { usr: e.state, key: e.key, idx: t };
        }
        function v(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null,
            r = arguments.length > 3 ? arguments[3] : void 0;
          return (0, o.A)(
            (0, o.A)(
              {
                pathname: "string" === typeof e ? e : e.pathname,
                search: "",
                hash: "",
              },
              "string" === typeof t ? g(t) : t
            ),
            {},
            {
              state: n,
              key:
                (t && t.key) ||
                r ||
                Math.random().toString(36).substring(2, 10),
            }
          );
        }
        function y(e) {
          let { pathname: t = "/", search: n = "", hash: r = "" } = e;
          return (
            n && "?" !== n && (t += "?" === n.charAt(0) ? n : "?" + n),
            r && "#" !== r && (t += "#" === r.charAt(0) ? r : "#" + r),
            t
          );
        }
        function g(e) {
          let t = {};
          if (e) {
            let n = e.indexOf("#");
            n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
            let r = e.indexOf("?");
            r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
              e && (t.pathname = e);
          }
          return t;
        }
        function b(e, t, n) {
          let r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {},
            { window: i = document.defaultView, v5Compat: a = !1 } = r,
            s = i.history,
            l = "POP",
            u = null,
            c = f();
          function f() {
            return (s.state || { idx: null }).idx;
          }
          function h() {
            l = "POP";
            let e = f(),
              t = null == e ? null : e - c;
            (c = e), u && u({ action: l, location: b.location, delta: t });
          }
          function g(e) {
            let t =
                "null" !== i.location.origin
                  ? i.location.origin
                  : i.location.href,
              n = "string" === typeof e ? e : y(e);
            return (
              (n = n.replace(/ $/, "%20")),
              p(
                t,
                "No window.location.(origin|href) available to create URL for href: ".concat(
                  n
                )
              ),
              new URL(n, t)
            );
          }
          null == c &&
            ((c = 0),
            s.replaceState(
              (0, o.A)((0, o.A)({}, s.state), {}, { idx: c }),
              ""
            ));
          let b = {
            get action() {
              return l;
            },
            get location() {
              return e(i, s);
            },
            listen(e) {
              if (u)
                throw new Error("A history only accepts one active listener");
              return (
                i.addEventListener(d, h),
                (u = e),
                () => {
                  i.removeEventListener(d, h), (u = null);
                }
              );
            },
            createHref: (e) => t(i, e),
            createURL: g,
            encodeLocation(e) {
              let t = g(e);
              return { pathname: t.pathname, search: t.search, hash: t.hash };
            },
            push: function (e, t) {
              l = "PUSH";
              let r = v(b.location, e, t);
              n && n(r, e), (c = f() + 1);
              let o = m(r, c),
                d = b.createHref(r);
              try {
                s.pushState(o, "", d);
              } catch (p) {
                if (p instanceof DOMException && "DataCloneError" === p.name)
                  throw p;
                i.location.assign(d);
              }
              a && u && u({ action: l, location: b.location, delta: 1 });
            },
            replace: function (e, t) {
              l = "REPLACE";
              let r = v(b.location, e, t);
              n && n(r, e), (c = f());
              let o = m(r, c),
                i = b.createHref(r);
              s.replaceState(o, "", i),
                a && u && u({ action: l, location: b.location, delta: 0 });
            },
            go: (e) => s.go(e),
          };
          return b;
        }
        function w(e, t) {
          return S(
            e,
            t,
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : "/",
            !1
          );
        }
        function S(e, t, n, r) {
          let o = L(("string" === typeof t ? g(t) : t).pathname || "/", n);
          if (null == o) return null;
          let i = k(e);
          !(function (e) {
            e.sort((e, t) =>
              e.score !== t.score
                ? t.score - e.score
                : (function (e, t) {
                    let n =
                      e.length === t.length &&
                      e.slice(0, -1).every((e, n) => e === t[n]);
                    return n ? e[e.length - 1] - t[t.length - 1] : 0;
                  })(
                    e.routesMeta.map((e) => e.childrenIndex),
                    t.routesMeta.map((e) => e.childrenIndex)
                  )
            );
          })(i);
          let a = null;
          for (let s = 0; null == a && s < i.length; ++s) {
            let e = R(o);
            a = D(i[s], e, r);
          }
          return a;
        }
        function k(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : [],
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : [],
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "",
            o = (e, o, i) => {
              let a = {
                relativePath: void 0 === i ? e.path || "" : i,
                caseSensitive: !0 === e.caseSensitive,
                childrenIndex: o,
                route: e,
              };
              a.relativePath.startsWith("/") &&
                (p(
                  a.relativePath.startsWith(r),
                  'Absolute route path "'
                    .concat(a.relativePath, '" nested under path "')
                    .concat(
                      r,
                      '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'
                    )
                ),
                (a.relativePath = a.relativePath.slice(r.length)));
              let s = z([r, a.relativePath]),
                l = n.concat(a);
              e.children &&
                e.children.length > 0 &&
                (p(
                  !0 !== e.index,
                  'Index routes must not have child routes. Please remove all child routes from route path "'.concat(
                    s,
                    '".'
                  )
                ),
                k(e.children, t, l, s)),
                (null != e.path || e.index) &&
                  t.push({ path: s, score: O(s, e.index), routesMeta: l });
            };
          return (
            e.forEach((e, t) => {
              var n;
              if (
                "" !== e.path &&
                null !== (n = e.path) &&
                void 0 !== n &&
                n.includes("?")
              )
                for (let r of E(e.path)) o(e, t, r);
              else o(e, t);
            }),
            t
          );
        }
        function E(e) {
          let t = e.split("/");
          if (0 === t.length) return [];
          let [n, ...r] = t,
            o = n.endsWith("?"),
            i = n.replace(/\?$/, "");
          if (0 === r.length) return o ? [i, ""] : [i];
          let a = E(r.join("/")),
            s = [];
          return (
            s.push(...a.map((e) => ("" === e ? i : [i, e].join("/")))),
            o && s.push(...a),
            s.map((t) => (e.startsWith("/") && "" === t ? "/" : t))
          );
        }
        var T = /^:[\w-]+$/,
          A = 3,
          _ = 2,
          I = 1,
          C = 10,
          x = -2,
          N = (e) => "*" === e;
        function O(e, t) {
          let n = e.split("/"),
            r = n.length;
          return (
            n.some(N) && (r += x),
            t && (r += _),
            n
              .filter((e) => !N(e))
              .reduce((e, t) => e + (T.test(t) ? A : "" === t ? I : C), r)
          );
        }
        function D(e, t) {
          let n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            { routesMeta: r } = e,
            o = {},
            i = "/",
            a = [];
          for (let s = 0; s < r.length; ++s) {
            let e = r[s],
              l = s === r.length - 1,
              u = "/" === i ? t : t.slice(i.length) || "/",
              c = P(
                {
                  path: e.relativePath,
                  caseSensitive: e.caseSensitive,
                  end: l,
                },
                u
              ),
              d = e.route;
            if (
              (!c &&
                l &&
                n &&
                !r[r.length - 1].route.index &&
                (c = P(
                  {
                    path: e.relativePath,
                    caseSensitive: e.caseSensitive,
                    end: !1,
                  },
                  u
                )),
              !c)
            )
              return null;
            Object.assign(o, c.params),
              a.push({
                params: o,
                pathname: z([i, c.pathname]),
                pathnameBase: $(z([i, c.pathnameBase])),
                route: d,
              }),
              "/" !== c.pathnameBase && (i = z([i, c.pathnameBase]));
          }
          return a;
        }
        function P(e, t) {
          "string" === typeof e &&
            (e = { path: e, caseSensitive: !1, end: !0 });
          let [n, r] = (function (e) {
              let t =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
                n =
                  !(arguments.length > 2 && void 0 !== arguments[2]) ||
                  arguments[2];
              h(
                "*" === e || !e.endsWith("*") || e.endsWith("/*"),
                'Route path "'
                  .concat(e, '" will be treated as if it were "')
                  .concat(
                    e.replace(/\*$/, "/*"),
                    '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "'
                  )
                  .concat(e.replace(/\*$/, "/*"), '".')
              );
              let r = [],
                o =
                  "^" +
                  e
                    .replace(/\/*\*?$/, "")
                    .replace(/^\/*/, "/")
                    .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
                    .replace(
                      /\/:([\w-]+)(\?)?/g,
                      (e, t, n) => (
                        r.push({ paramName: t, isOptional: null != n }),
                        n ? "/?([^\\/]+)?" : "/([^\\/]+)"
                      )
                    );
              e.endsWith("*")
                ? (r.push({ paramName: "*" }),
                  (o +=
                    "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
                : n
                ? (o += "\\/*$")
                : "" !== e && "/" !== e && (o += "(?:(?=\\/|$))");
              let i = new RegExp(o, t ? void 0 : "i");
              return [i, r];
            })(e.path, e.caseSensitive, e.end),
            o = t.match(n);
          if (!o) return null;
          let i = o[0],
            a = i.replace(/(.)\/+$/, "$1"),
            s = o.slice(1);
          return {
            params: r.reduce((e, t, n) => {
              let { paramName: r, isOptional: o } = t;
              if ("*" === r) {
                let e = s[n] || "";
                a = i.slice(0, i.length - e.length).replace(/(.)\/+$/, "$1");
              }
              const l = s[n];
              return (
                (e[r] = o && !l ? void 0 : (l || "").replace(/%2F/g, "/")), e
              );
            }, {}),
            pathname: i,
            pathnameBase: a,
            pattern: e,
          };
        }
        function R(e) {
          try {
            return e
              .split("/")
              .map((e) => decodeURIComponent(e).replace(/\//g, "%2F"))
              .join("/");
          } catch (t) {
            return (
              h(
                !1,
                'The URL path "'
                  .concat(
                    e,
                    '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding ('
                  )
                  .concat(t, ").")
              ),
              e
            );
          }
        }
        function L(e, t) {
          if ("/" === t) return e;
          if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
          let n = t.endsWith("/") ? t.length - 1 : t.length,
            r = e.charAt(n);
          return r && "/" !== r ? null : e.slice(n) || "/";
        }
        function M(e, t, n, r) {
          return "Cannot include a '"
            .concat(e, "' character in a manually specified `to.")
            .concat(t, "` field [")
            .concat(JSON.stringify(r), "].  Please separate it out to the `to.")
            .concat(
              n,
              '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
            );
        }
        function F(e) {
          return e.filter(
            (e, t) => 0 === t || (e.route.path && e.route.path.length > 0)
          );
        }
        function U(e) {
          let t = F(e);
          return t.map((e, n) =>
            n === t.length - 1 ? e.pathname : e.pathnameBase
          );
        }
        function j(e, t, n) {
          let r,
            i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          "string" === typeof e
            ? (r = g(e))
            : ((r = (0, o.A)({}, e)),
              p(
                !r.pathname || !r.pathname.includes("?"),
                M("?", "pathname", "search", r)
              ),
              p(
                !r.pathname || !r.pathname.includes("#"),
                M("#", "pathname", "hash", r)
              ),
              p(
                !r.search || !r.search.includes("#"),
                M("#", "search", "hash", r)
              ));
          let a,
            s = "" === e || "" === r.pathname,
            l = s ? "/" : r.pathname;
          if (null == l) a = n;
          else {
            let e = t.length - 1;
            if (!i && l.startsWith("..")) {
              let t = l.split("/");
              for (; ".." === t[0]; ) t.shift(), (e -= 1);
              r.pathname = t.join("/");
            }
            a = e >= 0 ? t[e] : "/";
          }
          let u = (function (e) {
              let t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "/",
                {
                  pathname: n,
                  search: r = "",
                  hash: o = "",
                } = "string" === typeof e ? g(e) : e,
                i = n
                  ? n.startsWith("/")
                    ? n
                    : (function (e, t) {
                        let n = t.replace(/\/+$/, "").split("/");
                        return (
                          e.split("/").forEach((e) => {
                            ".." === e
                              ? n.length > 1 && n.pop()
                              : "." !== e && n.push(e);
                          }),
                          n.length > 1 ? n.join("/") : "/"
                        );
                      })(n, t)
                  : t;
              return { pathname: i, search: V(r), hash: K(o) };
            })(r, a),
            c = l && "/" !== l && l.endsWith("/"),
            d = (s || "." === l) && n.endsWith("/");
          return (
            u.pathname.endsWith("/") || (!c && !d) || (u.pathname += "/"), u
          );
        }
        var z = (e) => e.join("/").replace(/\/\/+/g, "/"),
          $ = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
          V = (e) => (e && "?" !== e ? (e.startsWith("?") ? e : "?" + e) : ""),
          K = (e) => (e && "#" !== e ? (e.startsWith("#") ? e : "#" + e) : "");
        function q(e) {
          return (
            null != e &&
            "number" === typeof e.status &&
            "string" === typeof e.statusText &&
            "boolean" === typeof e.internal &&
            "data" in e
          );
        }
        var B = ["POST", "PUT", "PATCH", "DELETE"],
          H = (new Set(B), ["GET", ...B]);
        new Set(H), Symbol("ResetLoaderData");
        var W = i.createContext(null);
        W.displayName = "DataRouter";
        var G = i.createContext(null);
        G.displayName = "DataRouterState";
        var Q = i.createContext({ isTransitioning: !1 });
        Q.displayName = "ViewTransition";
        var Y = i.createContext(new Map());
        Y.displayName = "Fetchers";
        var J = i.createContext(null);
        J.displayName = "Await";
        var X = i.createContext(null);
        X.displayName = "Navigation";
        var Z = i.createContext(null);
        Z.displayName = "Location";
        var ee = i.createContext({
          outlet: null,
          matches: [],
          isDataRoute: !1,
        });
        ee.displayName = "Route";
        var te = i.createContext(null);
        te.displayName = "RouteError";
        var ne = !0;
        function re() {
          return null != i.useContext(Z);
        }
        function oe() {
          return (
            p(
              re(),
              "useLocation() may be used only in the context of a <Router> component."
            ),
            i.useContext(Z).location
          );
        }
        var ie =
          "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
        function ae(e) {
          i.useContext(X).static || i.useLayoutEffect(e);
        }
        function se() {
          let { isDataRoute: e } = i.useContext(ee);
          return e
            ? (function () {
                let { router: e } = ge("useNavigate"),
                  t = we("useNavigate"),
                  n = i.useRef(!1);
                ae(() => {
                  n.current = !0;
                });
                let r = i.useCallback(
                  async function (r) {
                    let i =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                    h(n.current, ie),
                      n.current &&
                        ("number" === typeof r
                          ? e.navigate(r)
                          : await e.navigate(
                              r,
                              (0, o.A)({ fromRouteId: t }, i)
                            ));
                  },
                  [e, t]
                );
                return r;
              })()
            : (function () {
                p(
                  re(),
                  "useNavigate() may be used only in the context of a <Router> component."
                );
                let e = i.useContext(W),
                  { basename: t, navigator: n } = i.useContext(X),
                  { matches: r } = i.useContext(ee),
                  { pathname: o } = oe(),
                  a = JSON.stringify(U(r)),
                  s = i.useRef(!1);
                ae(() => {
                  s.current = !0;
                });
                let l = i.useCallback(
                  function (r) {
                    let i =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                    if ((h(s.current, ie), !s.current)) return;
                    if ("number" === typeof r) return void n.go(r);
                    let l = j(r, JSON.parse(a), o, "path" === i.relative);
                    null == e &&
                      "/" !== t &&
                      (l.pathname =
                        "/" === l.pathname ? t : z([t, l.pathname])),
                      (i.replace ? n.replace : n.push)(l, i.state, i);
                  },
                  [t, n, a, o, e]
                );
                return l;
              })();
        }
        var le = i.createContext(null);
        function ue() {
          return i.useContext(le);
        }
        function ce(e) {
          let { relative: t } =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            { matches: n } = i.useContext(ee),
            { pathname: r } = oe(),
            o = JSON.stringify(U(n));
          return i.useMemo(
            () => j(e, JSON.parse(o), r, "path" === t),
            [e, o, r, t]
          );
        }
        function de(e, t, n, r) {
          p(
            re(),
            "useRoutes() may be used only in the context of a <Router> component."
          );
          let { navigator: a } = i.useContext(X),
            { matches: s } = i.useContext(ee),
            l = s[s.length - 1],
            u = l ? l.params : {},
            c = l ? l.pathname : "/",
            d = l ? l.pathnameBase : "/",
            f = l && l.route;
          if (ne) {
            let e = (f && f.path) || "";
            Ee(
              c,
              !f || e.endsWith("*") || e.endsWith("*?"),
              'You rendered descendant <Routes> (or called `useRoutes()`) at "'
                .concat(c, '" (under <Route path="')
                .concat(
                  e,
                  '">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won\'t match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="'
                )
                .concat(e, '"> to <Route path="')
                .concat("/" === e ? "*" : "".concat(e, "/*"), '">.')
            );
          }
          let m,
            v = oe();
          if (t) {
            var y;
            let e = "string" === typeof t ? g(t) : t;
            p(
              "/" === d ||
                (null === (y = e.pathname) || void 0 === y
                  ? void 0
                  : y.startsWith(d)),
              'When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "'
                .concat(d, '" but pathname "')
                .concat(e.pathname, '" was given in the `location` prop.')
            ),
              (m = e);
          } else m = v;
          let b = m.pathname || "/",
            S = b;
          if ("/" !== d) {
            let e = d.replace(/^\//, "").split("/");
            S = "/" + b.replace(/^\//, "").split("/").slice(e.length).join("/");
          }
          let k = w(e, { pathname: S });
          ne &&
            (h(
              f || null != k,
              'No routes matched location "'
                .concat(m.pathname)
                .concat(m.search)
                .concat(m.hash, '" ')
            ),
            h(
              null == k ||
                void 0 !== k[k.length - 1].route.element ||
                void 0 !== k[k.length - 1].route.Component ||
                void 0 !== k[k.length - 1].route.lazy,
              'Matched leaf route at location "'
                .concat(m.pathname)
                .concat(m.search)
                .concat(
                  m.hash,
                  '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'
                )
            ));
          let E = ve(
            k &&
              k.map((e) =>
                Object.assign({}, e, {
                  params: Object.assign({}, u, e.params),
                  pathname: z([
                    d,
                    a.encodeLocation
                      ? a.encodeLocation(e.pathname).pathname
                      : e.pathname,
                  ]),
                  pathnameBase:
                    "/" === e.pathnameBase
                      ? d
                      : z([
                          d,
                          a.encodeLocation
                            ? a.encodeLocation(e.pathnameBase).pathname
                            : e.pathnameBase,
                        ]),
                })
              ),
            s,
            n,
            r
          );
          return t && E
            ? i.createElement(
                Z.Provider,
                {
                  value: {
                    location: (0, o.A)(
                      {
                        pathname: "/",
                        search: "",
                        hash: "",
                        state: null,
                        key: "default",
                      },
                      m
                    ),
                    navigationType: "POP",
                  },
                },
                E
              )
            : E;
        }
        function fe() {
          let e = Se(),
            t = q(e)
              ? "".concat(e.status, " ").concat(e.statusText)
              : e instanceof Error
              ? e.message
              : JSON.stringify(e),
            n = e instanceof Error ? e.stack : null,
            r = "rgba(200,200,200, 0.5)",
            o = { padding: "0.5rem", backgroundColor: r },
            a = { padding: "2px 4px", backgroundColor: r },
            s = null;
          return (
            ne &&
              (console.error(
                "Error handled by React Router default ErrorBoundary:",
                e
              ),
              (s = i.createElement(
                i.Fragment,
                null,
                i.createElement(
                  "p",
                  null,
                  "\ud83d\udcbf Hey developer \ud83d\udc4b"
                ),
                i.createElement(
                  "p",
                  null,
                  "You can provide a way better UX than this when your app throws errors by providing your own ",
                  i.createElement("code", { style: a }, "ErrorBoundary"),
                  " or",
                  " ",
                  i.createElement("code", { style: a }, "errorElement"),
                  " prop on your route."
                )
              ))),
            i.createElement(
              i.Fragment,
              null,
              i.createElement("h2", null, "Unexpected Application Error!"),
              i.createElement("h3", { style: { fontStyle: "italic" } }, t),
              n ? i.createElement("pre", { style: o }, n) : null,
              s
            )
          );
        }
        var pe = i.createElement(fe, null),
          he = class extends i.Component {
            constructor(e) {
              super(e),
                (this.state = {
                  location: e.location,
                  revalidation: e.revalidation,
                  error: e.error,
                });
            }
            static getDerivedStateFromError(e) {
              return { error: e };
            }
            static getDerivedStateFromProps(e, t) {
              return t.location !== e.location ||
                ("idle" !== t.revalidation && "idle" === e.revalidation)
                ? {
                    error: e.error,
                    location: e.location,
                    revalidation: e.revalidation,
                  }
                : {
                    error: void 0 !== e.error ? e.error : t.error,
                    location: t.location,
                    revalidation: e.revalidation || t.revalidation,
                  };
            }
            componentDidCatch(e, t) {
              console.error(
                "React Router caught the following error during render",
                e,
                t
              );
            }
            render() {
              return void 0 !== this.state.error
                ? i.createElement(
                    ee.Provider,
                    { value: this.props.routeContext },
                    i.createElement(te.Provider, {
                      value: this.state.error,
                      children: this.props.component,
                    })
                  )
                : this.props.children;
            }
          };
        function me(e) {
          let { routeContext: t, match: n, children: r } = e,
            o = i.useContext(W);
          return (
            o &&
              o.static &&
              o.staticContext &&
              (n.route.errorElement || n.route.ErrorBoundary) &&
              (o.staticContext._deepestRenderedBoundaryId = n.route.id),
            i.createElement(ee.Provider, { value: t }, r)
          );
        }
        function ve(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : [],
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
          if (null == e) {
            if (!n) return null;
            if (n.errors) e = n.matches;
            else {
              if (0 !== t.length || n.initialized || !(n.matches.length > 0))
                return null;
              e = n.matches;
            }
          }
          let r = e,
            o = null === n || void 0 === n ? void 0 : n.errors;
          if (null != o) {
            let e = r.findIndex(
              (e) =>
                e.route.id &&
                void 0 !== (null === o || void 0 === o ? void 0 : o[e.route.id])
            );
            p(
              e >= 0,
              "Could not find a matching route for errors on route IDs: ".concat(
                Object.keys(o).join(",")
              )
            ),
              (r = r.slice(0, Math.min(r.length, e + 1)));
          }
          let a = !1,
            s = -1;
          if (n)
            for (let i = 0; i < r.length; i++) {
              let e = r[i];
              if (
                ((e.route.HydrateFallback || e.route.hydrateFallbackElement) &&
                  (s = i),
                e.route.id)
              ) {
                let { loaderData: t, errors: o } = n,
                  i =
                    e.route.loader &&
                    !t.hasOwnProperty(e.route.id) &&
                    (!o || void 0 === o[e.route.id]);
                if (e.route.lazy || i) {
                  (a = !0), (r = s >= 0 ? r.slice(0, s + 1) : [r[0]]);
                  break;
                }
              }
            }
          return r.reduceRight((e, l, u) => {
            let c,
              d = !1,
              f = null,
              p = null;
            n &&
              ((c = o && l.route.id ? o[l.route.id] : void 0),
              (f = l.route.errorElement || pe),
              a &&
                (s < 0 && 0 === u
                  ? (Ee(
                      "route-fallback",
                      !1,
                      "No `HydrateFallback` element provided to render during initial hydration"
                    ),
                    (d = !0),
                    (p = null))
                  : s === u &&
                    ((d = !0), (p = l.route.hydrateFallbackElement || null))));
            let h = t.concat(r.slice(0, u + 1)),
              m = () => {
                let t;
                return (
                  (t = c
                    ? f
                    : d
                    ? p
                    : l.route.Component
                    ? i.createElement(l.route.Component, null)
                    : l.route.element
                    ? l.route.element
                    : e),
                  i.createElement(me, {
                    match: l,
                    routeContext: {
                      outlet: e,
                      matches: h,
                      isDataRoute: null != n,
                    },
                    children: t,
                  })
                );
              };
            return n &&
              (l.route.ErrorBoundary || l.route.errorElement || 0 === u)
              ? i.createElement(he, {
                  location: n.location,
                  revalidation: n.revalidation,
                  component: f,
                  error: c,
                  children: m(),
                  routeContext: { outlet: null, matches: h, isDataRoute: !0 },
                })
              : m();
          }, null);
        }
        function ye(e) {
          return "".concat(
            e,
            " must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router."
          );
        }
        function ge(e) {
          let t = i.useContext(W);
          return p(t, ye(e)), t;
        }
        function be(e) {
          let t = i.useContext(G);
          return p(t, ye(e)), t;
        }
        function we(e) {
          let t = (function (e) {
              let t = i.useContext(ee);
              return p(t, ye(e)), t;
            })(e),
            n = t.matches[t.matches.length - 1];
          return (
            p(
              n.route.id,
              "".concat(
                e,
                ' can only be used on routes that contain a unique "id"'
              )
            ),
            n.route.id
          );
        }
        function Se() {
          var e;
          let t = i.useContext(te),
            n = be("useRouteError"),
            r = we("useRouteError");
          return void 0 !== t
            ? t
            : null === (e = n.errors) || void 0 === e
            ? void 0
            : e[r];
        }
        var ke = {};
        function Ee(e, t, n) {
          t || ke[e] || ((ke[e] = !0), h(!1, n));
        }
        i.memo(function (e) {
          let { routes: t, future: n, state: r } = e;
          return de(t, void 0, r, n);
        });
        function Te(e) {
          let { to: t, replace: n, state: r, relative: o } = e;
          p(
            re(),
            "<Navigate> may be used only in the context of a <Router> component."
          );
          let { static: a } = i.useContext(X);
          h(
            !a,
            "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
          );
          let { matches: s } = i.useContext(ee),
            { pathname: l } = oe(),
            u = se(),
            c = j(t, U(s), l, "path" === o),
            d = JSON.stringify(c);
          return (
            i.useEffect(() => {
              u(JSON.parse(d), { replace: n, state: r, relative: o });
            }, [u, d, o, n, r]),
            null
          );
        }
        function Ae(e) {
          return (function (e) {
            let t = i.useContext(ee).outlet;
            return t ? i.createElement(le.Provider, { value: e }, t) : t;
          })(e.context);
        }
        function _e(e) {
          p(
            !1,
            "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
          );
        }
        function Ie(e) {
          let {
            basename: t = "/",
            children: n = null,
            location: r,
            navigationType: o = "POP",
            navigator: a,
            static: s = !1,
          } = e;
          p(
            !re(),
            "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
          );
          let l = t.replace(/^\/*/, "/"),
            u = i.useMemo(
              () => ({ basename: l, navigator: a, static: s, future: {} }),
              [l, a, s]
            );
          "string" === typeof r && (r = g(r));
          let {
              pathname: c = "/",
              search: d = "",
              hash: f = "",
              state: m = null,
              key: v = "default",
            } = r,
            y = i.useMemo(() => {
              let e = L(c, l);
              return null == e
                ? null
                : {
                    location: {
                      pathname: e,
                      search: d,
                      hash: f,
                      state: m,
                      key: v,
                    },
                    navigationType: o,
                  };
            }, [l, c, d, f, m, v, o]);
          return (
            h(
              null != y,
              '<Router basename="'
                .concat(l, '"> is not able to match the URL "')
                .concat(c)
                .concat(d)
                .concat(
                  f,
                  "\" because it does not start with the basename, so the <Router> won't render anything."
                )
            ),
            null == y
              ? null
              : i.createElement(
                  X.Provider,
                  { value: u },
                  i.createElement(Z.Provider, { children: n, value: y })
                )
          );
        }
        function Ce(e) {
          let { children: t, location: n } = e;
          return de(xe(t), n);
        }
        i.Component;
        function xe(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : [],
            n = [];
          return (
            i.Children.forEach(e, (e, r) => {
              if (!i.isValidElement(e)) return;
              let o = [...t, r];
              if (e.type === i.Fragment)
                return void n.push.apply(n, xe(e.props.children, o));
              p(
                e.type === _e,
                "[".concat(
                  "string" === typeof e.type ? e.type : e.type.name,
                  "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"
                )
              ),
                p(
                  !e.props.index || !e.props.children,
                  "An index route cannot have child routes."
                );
              let a = {
                id: e.props.id || o.join("-"),
                caseSensitive: e.props.caseSensitive,
                element: e.props.element,
                Component: e.props.Component,
                index: e.props.index,
                path: e.props.path,
                loader: e.props.loader,
                action: e.props.action,
                hydrateFallbackElement: e.props.hydrateFallbackElement,
                HydrateFallback: e.props.HydrateFallback,
                errorElement: e.props.errorElement,
                ErrorBoundary: e.props.ErrorBoundary,
                hasErrorBoundary:
                  !0 === e.props.hasErrorBoundary ||
                  null != e.props.ErrorBoundary ||
                  null != e.props.errorElement,
                shouldRevalidate: e.props.shouldRevalidate,
                handle: e.props.handle,
                lazy: e.props.lazy,
              };
              e.props.children && (a.children = xe(e.props.children, o)),
                n.push(a);
            }),
            n
          );
        }
        var Ne = "get",
          Oe = "application/x-www-form-urlencoded";
        function De(e) {
          return null != e && "string" === typeof e.tagName;
        }
        var Pe = null;
        var Re = new Set([
          "application/x-www-form-urlencoded",
          "multipart/form-data",
          "text/plain",
        ]);
        function Le(e) {
          return null == e || Re.has(e)
            ? e
            : (h(
                !1,
                '"'
                  .concat(
                    e,
                    '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` and will default to "'
                  )
                  .concat(Oe, '"')
              ),
              null);
        }
        function Me(e, t) {
          let n, r, o, i, a;
          if (De((s = e)) && "form" === s.tagName.toLowerCase()) {
            let a = e.getAttribute("action");
            (r = a ? L(a, t) : null),
              (n = e.getAttribute("method") || Ne),
              (o = Le(e.getAttribute("enctype")) || Oe),
              (i = new FormData(e));
          } else if (
            (function (e) {
              return De(e) && "button" === e.tagName.toLowerCase();
            })(e) ||
            ((function (e) {
              return De(e) && "input" === e.tagName.toLowerCase();
            })(e) &&
              ("submit" === e.type || "image" === e.type))
          ) {
            let a = e.form;
            if (null == a)
              throw new Error(
                'Cannot submit a <button> or <input type="submit"> without a <form>'
              );
            let s = e.getAttribute("formaction") || a.getAttribute("action");
            if (
              ((r = s ? L(s, t) : null),
              (n =
                e.getAttribute("formmethod") || a.getAttribute("method") || Ne),
              (o =
                Le(e.getAttribute("formenctype")) ||
                Le(a.getAttribute("enctype")) ||
                Oe),
              (i = new FormData(a, e)),
              !(function () {
                if (null === Pe)
                  try {
                    new FormData(document.createElement("form"), 0), (Pe = !1);
                  } catch (e) {
                    Pe = !0;
                  }
                return Pe;
              })())
            ) {
              let { name: t, type: n, value: r } = e;
              if ("image" === n) {
                let e = t ? "".concat(t, ".") : "";
                i.append("".concat(e, "x"), "0"),
                  i.append("".concat(e, "y"), "0");
              } else t && i.append(t, r);
            }
          } else {
            if (De(e))
              throw new Error(
                'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
              );
            (n = Ne), (r = null), (o = Oe), (a = e);
          }
          var s;
          return (
            i && "text/plain" === o && ((a = i), (i = void 0)),
            {
              action: r,
              method: n.toLowerCase(),
              encType: o,
              formData: i,
              body: a,
            }
          );
        }
        function Fe(e, t) {
          if (!1 === e || null === e || "undefined" === typeof e)
            throw new Error(t);
        }
        async function Ue(e, t) {
          if (e.id in t) return t[e.id];
          try {
            let n = await import(e.module);
            return (t[e.id] = n), n;
          } catch (n) {
            return (
              console.error(
                "Error loading route module `".concat(
                  e.module,
                  "`, reloading page..."
                )
              ),
              console.error(n),
              window.__reactRouterContext &&
                window.__reactRouterContext.isSpaMode,
              window.location.reload(),
              new Promise(() => {})
            );
          }
        }
        function je(e) {
          return null != e && "string" === typeof e.page;
        }
        function ze(e) {
          return (
            null != e &&
            (null == e.href
              ? "preload" === e.rel &&
                "string" === typeof e.imageSrcSet &&
                "string" === typeof e.imageSizes
              : "string" === typeof e.rel && "string" === typeof e.href)
          );
        }
        function $e(e, t, n, r, o, i) {
          let a = (e, t) => !n[t] || e.route.id !== n[t].route.id,
            s = (e, t) => {
              var r;
              return (
                n[t].pathname !== e.pathname ||
                ((null === (r = n[t].route.path) || void 0 === r
                  ? void 0
                  : r.endsWith("*")) &&
                  n[t].params["*"] !== e.params["*"])
              );
            };
          return "assets" === i
            ? t.filter((e, t) => a(e, t) || s(e, t))
            : "data" === i
            ? t.filter((t, i) => {
                let l = r.routes[t.route.id];
                if (!l || !l.hasLoader) return !1;
                if (a(t, i) || s(t, i)) return !0;
                if (t.route.shouldRevalidate) {
                  var u;
                  let r = t.route.shouldRevalidate({
                    currentUrl: new URL(
                      o.pathname + o.search + o.hash,
                      window.origin
                    ),
                    currentParams:
                      (null === (u = n[0]) || void 0 === u
                        ? void 0
                        : u.params) || {},
                    nextUrl: new URL(e, window.origin),
                    nextParams: t.params,
                    defaultShouldRevalidate: !0,
                  });
                  if ("boolean" === typeof r) return r;
                }
                return !0;
              })
            : [];
        }
        function Ve(e) {
          return [...new Set(e)];
        }
        function Ke(e, t) {
          let n = new Set(),
            r = new Set(t);
          return e.reduce((e, o) => {
            if (t && !je(o) && "script" === o.as && o.href && r.has(o.href))
              return e;
            let i = JSON.stringify(
              (function (e) {
                let t = {},
                  n = Object.keys(e).sort();
                for (let r of n) t[r] = e[r];
                return t;
              })(o)
            );
            return n.has(i) || (n.add(i), e.push({ key: i, link: o })), e;
          }, []);
        }
        function qe(e) {
          return { __html: e };
        }
        Symbol("SingleFetchRedirect");
        function Be(e) {
          let t =
            "string" === typeof e
              ? new URL(
                  e,
                  "undefined" === typeof window
                    ? "server://singlefetch/"
                    : window.location.origin
                )
              : e;
          return (
            "/" === t.pathname
              ? (t.pathname = "_root.data")
              : (t.pathname = "".concat(
                  t.pathname.replace(/\/$/, ""),
                  ".data"
                )),
            t
          );
        }
        i.Component;
        function He(e) {
          let { error: t, isOutsideRemixApp: n } = e;
          console.error(t);
          let r,
            o = i.createElement("script", {
              dangerouslySetInnerHTML: {
                __html:
                  '\n        console.log(\n          "\ud83d\udcbf Hey developer \ud83d\udc4b. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."\n        );\n      ',
              },
            });
          if (q(t))
            return i.createElement(
              We,
              { title: "Unhandled Thrown Response!" },
              i.createElement(
                "h1",
                { style: { fontSize: "24px" } },
                t.status,
                " ",
                t.statusText
              ),
              o
            );
          if (t instanceof Error) r = t;
          else {
            let e =
              null == t
                ? "Unknown Error"
                : "object" === typeof t && "toString" in t
                ? t.toString()
                : JSON.stringify(t);
            r = new Error(e);
          }
          return i.createElement(
            We,
            { title: "Application Error!", isOutsideRemixApp: n },
            i.createElement(
              "h1",
              { style: { fontSize: "24px" } },
              "Application Error"
            ),
            i.createElement(
              "pre",
              {
                style: {
                  padding: "2rem",
                  background: "hsla(10, 50%, 50%, 0.1)",
                  color: "red",
                  overflow: "auto",
                },
              },
              r.stack
            ),
            o
          );
        }
        function We(e) {
          var t;
          let {
              title: n,
              renderScripts: r,
              isOutsideRemixApp: o,
              children: a,
            } = e,
            { routeModules: s } = Xe();
          return null !== (t = s.root) && void 0 !== t && t.Layout && !o
            ? a
            : i.createElement(
                "html",
                { lang: "en" },
                i.createElement(
                  "head",
                  null,
                  i.createElement("meta", { charSet: "utf-8" }),
                  i.createElement("meta", {
                    name: "viewport",
                    content:
                      "width=device-width,initial-scale=1,viewport-fit=cover",
                  }),
                  i.createElement("title", null, n)
                ),
                i.createElement(
                  "body",
                  null,
                  i.createElement(
                    "main",
                    {
                      style: {
                        fontFamily: "system-ui, sans-serif",
                        padding: "2rem",
                      },
                    },
                    a,
                    r ? i.createElement(it, null) : null
                  )
                )
              );
        }
        function Ge(e) {
          return !e;
        }
        function Qe() {
          let e = i.useContext(W);
          return (
            Fe(
              e,
              "You must render this element inside a <DataRouterContext.Provider> element"
            ),
            e
          );
        }
        function Ye() {
          let e = i.useContext(G);
          return (
            Fe(
              e,
              "You must render this element inside a <DataRouterStateContext.Provider> element"
            ),
            e
          );
        }
        var Je = i.createContext(void 0);
        function Xe() {
          let e = i.useContext(Je);
          return (
            Fe(
              e,
              "You must render this element inside a <HydratedRouter> element"
            ),
            e
          );
        }
        function Ze(e, t) {
          return (n) => {
            e && e(n), n.defaultPrevented || t(n);
          };
        }
        function et(e, t, n) {
          if (n && !ot) return [e[0]];
          if (t) {
            let n = e.findIndex((e) => void 0 !== t[e.route.id]);
            return e.slice(0, n + 1);
          }
          return e;
        }
        function tt(e) {
          let { page: t } = e,
            n = (0, r.A)(e, a),
            { router: s } = Qe(),
            l = i.useMemo(
              () => w(s.routes, t, s.basename),
              [s.routes, t, s.basename]
            );
          return l
            ? i.createElement(rt, (0, o.A)({ page: t, matches: l }, n))
            : (console.warn(
                "Tried to prefetch ".concat(t, " but no routes matched.")
              ),
              null);
        }
        function nt(e) {
          let { manifest: t, routeModules: n } = Xe(),
            [r, a] = i.useState([]);
          return (
            i.useEffect(() => {
              let r = !1;
              return (
                (async function (e, t, n) {
                  return Ke(
                    (
                      await Promise.all(
                        e.map(async (e) => {
                          let r = t.routes[e.route.id];
                          if (r) {
                            let e = await Ue(r, n);
                            return e.links ? e.links() : [];
                          }
                          return [];
                        })
                      )
                    )
                      .flat(1)
                      .filter(ze)
                      .filter(
                        (e) => "stylesheet" === e.rel || "preload" === e.rel
                      )
                      .map((e) =>
                        "stylesheet" === e.rel
                          ? (0, o.A)(
                              (0, o.A)({}, e),
                              {},
                              { rel: "prefetch", as: "style" }
                            )
                          : (0, o.A)((0, o.A)({}, e), {}, { rel: "prefetch" })
                      )
                  );
                })(e, t, n).then((e) => {
                  r || a(e);
                }),
                () => {
                  r = !0;
                }
              );
            }, [e, t, n]),
            r
          );
        }
        function rt(e) {
          let { page: t, matches: n } = e,
            a = (0, r.A)(e, s),
            l = oe(),
            { manifest: u, routeModules: c } = Xe(),
            { loaderData: d, matches: f } = Ye(),
            p = i.useMemo(() => $e(t, n, f, u, l, "data"), [t, n, f, u, l]),
            h = i.useMemo(() => $e(t, n, f, u, l, "assets"), [t, n, f, u, l]),
            m = i.useMemo(() => {
              if (t === l.pathname + l.search + l.hash) return [];
              let e = new Set(),
                r = !1;
              if (
                (n.forEach((t) => {
                  var n;
                  let o = u.routes[t.route.id];
                  o &&
                    o.hasLoader &&
                    ((!p.some((e) => e.route.id === t.route.id) &&
                      t.route.id in d &&
                      null !== (n = c[t.route.id]) &&
                      void 0 !== n &&
                      n.shouldRevalidate) ||
                    o.hasClientLoader
                      ? (r = !0)
                      : e.add(t.route.id));
                }),
                0 === e.size)
              )
                return [];
              let o = Be(t);
              return (
                r &&
                  e.size > 0 &&
                  o.searchParams.set(
                    "_routes",
                    n
                      .filter((t) => e.has(t.route.id))
                      .map((e) => e.route.id)
                      .join(",")
                  ),
                [o.pathname + o.search]
              );
            }, [d, l, u, p, n, t, c]),
            v = i.useMemo(
              () =>
                (function (e, t) {
                  return Ve(
                    e
                      .map((e) => {
                        let n = t.routes[e.route.id];
                        if (!n) return [];
                        let r = [n.module];
                        return n.imports && (r = r.concat(n.imports)), r;
                      })
                      .flat(1)
                  );
                })(h, u),
              [h, u]
            ),
            y = nt(h);
          return i.createElement(
            i.Fragment,
            null,
            m.map((e) =>
              i.createElement(
                "link",
                (0, o.A)({ key: e, rel: "prefetch", as: "fetch", href: e }, a)
              )
            ),
            v.map((e) =>
              i.createElement(
                "link",
                (0, o.A)({ key: e, rel: "modulepreload", href: e }, a)
              )
            ),
            y.map((e) => {
              let { key: t, link: n } = e;
              return i.createElement("link", (0, o.A)({ key: t }, n));
            })
          );
        }
        Je.displayName = "FrameworkContext";
        var ot = !1;
        function it(e) {
          let {
              manifest: t,
              serverHandoffString: n,
              isSpaMode: r,
              renderMeta: a,
            } = Xe(),
            { router: s, static: l, staticContext: u } = Qe(),
            { matches: c } = Ye(),
            d = Ge(r);
          a && (a.didRenderScripts = !0);
          let f = et(c, null, r);
          i.useEffect(() => {
            ot = !0;
          }, []);
          let p = i.useMemo(() => {
              var r;
              let a = u
                  ? "window.__reactRouterContext = "
                      .concat(n, ";")
                      .concat(
                        "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
                      )
                  : " ",
                c = l
                  ? ""
                      .concat(
                        null !== (r = t.hmr) && void 0 !== r && r.runtime
                          ? "import ".concat(JSON.stringify(t.hmr.runtime), ";")
                          : ""
                      )
                      .concat(
                        d ? "" : "import ".concat(JSON.stringify(t.url)),
                        ";\n"
                      )
                      .concat(
                        f
                          .map((e, n) =>
                            "import * as route"
                              .concat(n, " from ")
                              .concat(
                                JSON.stringify(t.routes[e.route.id].module),
                                ";"
                              )
                          )
                          .join("\n"),
                        "\n  "
                      )
                      .concat(
                        d
                          ? "window.__reactRouterManifest = ".concat(
                              JSON.stringify(
                                (function (e, t) {
                                  let n = new Set(
                                      t.state.matches.map((e) => e.route.id)
                                    ),
                                    r = t.state.location.pathname
                                      .split("/")
                                      .filter(Boolean),
                                    i = ["/"];
                                  for (r.pop(); r.length > 0; )
                                    i.push("/".concat(r.join("/"))), r.pop();
                                  i.forEach((e) => {
                                    let r = w(t.routes, e, t.basename);
                                    r && r.forEach((e) => n.add(e.route.id));
                                  });
                                  let a = [...n].reduce(
                                    (t, n) =>
                                      Object.assign(t, { [n]: e.routes[n] }),
                                    {}
                                  );
                                  return (0, o.A)(
                                    (0, o.A)({}, e),
                                    {},
                                    { routes: a }
                                  );
                                })(t, s),
                                null,
                                2
                              ),
                              ";"
                            )
                          : "",
                        "\n  window.__reactRouterRouteModules = {"
                      )
                      .concat(
                        f
                          .map((e, t) =>
                            ""
                              .concat(JSON.stringify(e.route.id), ":route")
                              .concat(t)
                          )
                          .join(","),
                        "};\n\nimport("
                      )
                      .concat(JSON.stringify(t.entry.module), ");")
                  : " ";
              return i.createElement(
                i.Fragment,
                null,
                i.createElement(
                  "script",
                  (0, o.A)(
                    (0, o.A)({}, e),
                    {},
                    {
                      suppressHydrationWarning: !0,
                      dangerouslySetInnerHTML: qe(a),
                      type: void 0,
                    }
                  )
                ),
                i.createElement(
                  "script",
                  (0, o.A)(
                    (0, o.A)({}, e),
                    {},
                    {
                      suppressHydrationWarning: !0,
                      dangerouslySetInnerHTML: qe(c),
                      type: "module",
                      async: !0,
                    }
                  )
                )
              );
            }, []),
            h = f
              .map((e) => {
                let n = t.routes[e.route.id];
                return n ? (n.imports || []).concat([n.module]) : [];
              })
              .flat(1),
            m = ot ? [] : t.entry.imports.concat(h);
          return ot
            ? null
            : i.createElement(
                i.Fragment,
                null,
                d
                  ? null
                  : i.createElement("link", {
                      rel: "modulepreload",
                      href: t.url,
                      crossOrigin: e.crossOrigin,
                    }),
                i.createElement("link", {
                  rel: "modulepreload",
                  href: t.entry.module,
                  crossOrigin: e.crossOrigin,
                }),
                ((v = m), [...new Set(v)]).map((t) =>
                  i.createElement("link", {
                    key: t,
                    rel: "modulepreload",
                    href: t,
                    crossOrigin: e.crossOrigin,
                  })
                ),
                p
              );
          var v;
        }
        function at() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return (e) => {
            t.forEach((t) => {
              "function" === typeof t ? t(e) : null != t && (t.current = e);
            });
          };
        }
        var st =
          "undefined" !== typeof window &&
          "undefined" !== typeof window.document &&
          "undefined" !== typeof window.document.createElement;
        try {
          st && (window.__reactRouterVersion = "7.0.2");
        } catch (gt) {}
        function lt(e) {
          let { basename: t, children: n, window: r } = e,
            o = i.useRef();
          null == o.current && (o.current = f({ window: r, v5Compat: !0 }));
          let a = o.current,
            [s, l] = i.useState({ action: a.action, location: a.location }),
            u = i.useCallback(
              (e) => {
                i.startTransition(() => l(e));
              },
              [l]
            );
          return (
            i.useLayoutEffect(() => a.listen(u), [a, u]),
            i.createElement(Ie, {
              basename: t,
              children: n,
              location: s.location,
              navigationType: s.action,
              navigator: a,
            })
          );
        }
        var ut = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
          ct = i.forwardRef(function (e, t) {
            let n,
              {
                onClick: a,
                discover: s = "render",
                prefetch: u = "none",
                relative: c,
                reloadDocument: d,
                replace: f,
                state: m,
                target: v,
                to: g,
                preventScrollReset: b,
                viewTransition: w,
              } = e,
              S = (0, r.A)(e, l),
              { basename: k } = i.useContext(X),
              E = "string" === typeof g && ut.test(g),
              T = !1;
            if ("string" === typeof g && E && ((n = g), st))
              try {
                let e = new URL(window.location.href),
                  t = g.startsWith("//") ? new URL(e.protocol + g) : new URL(g),
                  n = L(t.pathname, k);
                t.origin === e.origin && null != n
                  ? (g = n + t.search + t.hash)
                  : (T = !0);
              } catch (gt) {
                h(
                  !1,
                  '<Link to="'.concat(
                    g,
                    '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.'
                  )
                );
              }
            let A = (function (e) {
                let { relative: t } =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                p(
                  re(),
                  "useHref() may be used only in the context of a <Router> component."
                );
                let { basename: n, navigator: r } = i.useContext(X),
                  { hash: o, pathname: a, search: s } = ce(e, { relative: t }),
                  l = a;
                return (
                  "/" !== n && (l = "/" === a ? n : z([n, a])),
                  r.createHref({ pathname: l, search: s, hash: o })
                );
              })(g, { relative: c }),
              [_, I, C] = (function (e, t) {
                let n = i.useContext(Je),
                  [r, o] = i.useState(!1),
                  [a, s] = i.useState(!1),
                  {
                    onFocus: l,
                    onBlur: u,
                    onMouseEnter: c,
                    onMouseLeave: d,
                    onTouchStart: f,
                  } = t,
                  p = i.useRef(null);
                i.useEffect(() => {
                  if (("render" === e && s(!0), "viewport" === e)) {
                    let e = new IntersectionObserver(
                      (e) => {
                        e.forEach((e) => {
                          s(e.isIntersecting);
                        });
                      },
                      { threshold: 0.5 }
                    );
                    return (
                      p.current && e.observe(p.current),
                      () => {
                        e.disconnect();
                      }
                    );
                  }
                }, [e]),
                  i.useEffect(() => {
                    if (r) {
                      let e = setTimeout(() => {
                        s(!0);
                      }, 100);
                      return () => {
                        clearTimeout(e);
                      };
                    }
                  }, [r]);
                let h = () => {
                    o(!0);
                  },
                  m = () => {
                    o(!1), s(!1);
                  };
                return n
                  ? "intent" !== e
                    ? [a, p, {}]
                    : [
                        a,
                        p,
                        {
                          onFocus: Ze(l, h),
                          onBlur: Ze(u, m),
                          onMouseEnter: Ze(c, h),
                          onMouseLeave: Ze(d, m),
                          onTouchStart: Ze(f, h),
                        },
                      ]
                  : [!1, p, {}];
              })(u, S),
              x = (function (e) {
                let {
                    target: t,
                    replace: n,
                    state: r,
                    preventScrollReset: o,
                    relative: a,
                    viewTransition: s,
                  } = arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                  l = se(),
                  u = oe(),
                  c = ce(e, { relative: a });
                return i.useCallback(
                  (i) => {
                    if (
                      (function (e, t) {
                        return (
                          0 === e.button &&
                          (!t || "_self" === t) &&
                          !(function (e) {
                            return !!(
                              e.metaKey ||
                              e.altKey ||
                              e.ctrlKey ||
                              e.shiftKey
                            );
                          })(e)
                        );
                      })(i, t)
                    ) {
                      i.preventDefault();
                      let t = void 0 !== n ? n : y(u) === y(c);
                      l(e, {
                        replace: t,
                        state: r,
                        preventScrollReset: o,
                        relative: a,
                        viewTransition: s,
                      });
                    }
                  },
                  [u, l, c, n, r, t, e, o, a, s]
                );
              })(g, {
                replace: f,
                state: m,
                target: v,
                preventScrollReset: b,
                relative: c,
                viewTransition: w,
              });
            let N = i.createElement(
              "a",
              (0, o.A)(
                (0, o.A)((0, o.A)({}, S), C),
                {},
                {
                  href: n || A,
                  onClick:
                    T || d
                      ? a
                      : function (e) {
                          a && a(e), e.defaultPrevented || x(e);
                        },
                  ref: at(t, I),
                  target: v,
                  "data-discover": E || "render" !== s ? void 0 : "true",
                }
              )
            );
            return _ && !E
              ? i.createElement(
                  i.Fragment,
                  null,
                  N,
                  i.createElement(tt, { page: A })
                )
              : N;
          });
        ct.displayName = "Link";
        var dt = i.forwardRef(function (e, t) {
          let {
              "aria-current": n = "page",
              caseSensitive: a = !1,
              className: s = "",
              end: l = !1,
              style: c,
              to: d,
              viewTransition: f,
              children: h,
            } = e,
            m = (0, r.A)(e, u),
            v = ce(d, { relative: m.relative }),
            y = oe(),
            g = i.useContext(G),
            { navigator: b, basename: w } = i.useContext(X),
            S =
              null != g &&
              (function (e) {
                let t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = i.useContext(Q);
                p(
                  null != n,
                  "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
                );
                let { basename: r } = ht("useViewTransitionState"),
                  o = ce(e, { relative: t.relative });
                if (!n.isTransitioning) return !1;
                let a =
                    L(n.currentLocation.pathname, r) ||
                    n.currentLocation.pathname,
                  s = L(n.nextLocation.pathname, r) || n.nextLocation.pathname;
                return null != P(o.pathname, s) || null != P(o.pathname, a);
              })(v) &&
              !0 === f,
            k = b.encodeLocation ? b.encodeLocation(v).pathname : v.pathname,
            E = y.pathname,
            T =
              g && g.navigation && g.navigation.location
                ? g.navigation.location.pathname
                : null;
          a ||
            ((E = E.toLowerCase()),
            (T = T ? T.toLowerCase() : null),
            (k = k.toLowerCase())),
            T && w && (T = L(T, w) || T);
          const A = "/" !== k && k.endsWith("/") ? k.length - 1 : k.length;
          let _,
            I = E === k || (!l && E.startsWith(k) && "/" === E.charAt(A)),
            C =
              null != T &&
              (T === k ||
                (!l && T.startsWith(k) && "/" === T.charAt(k.length))),
            x = { isActive: I, isPending: C, isTransitioning: S },
            N = I ? n : void 0;
          _ =
            "function" === typeof s
              ? s(x)
              : [
                  s,
                  I ? "active" : null,
                  C ? "pending" : null,
                  S ? "transitioning" : null,
                ]
                  .filter(Boolean)
                  .join(" ");
          let O = "function" === typeof c ? c(x) : c;
          return i.createElement(
            ct,
            (0, o.A)(
              (0, o.A)({}, m),
              {},
              {
                "aria-current": N,
                className: _,
                ref: t,
                style: O,
                to: d,
                viewTransition: f,
              }
            ),
            "function" === typeof h ? h(x) : h
          );
        });
        dt.displayName = "NavLink";
        var ft = i.forwardRef((e, t) => {
          let {
              discover: n = "render",
              fetcherKey: a,
              navigate: s,
              reloadDocument: l,
              replace: u,
              state: d,
              method: f = Ne,
              action: h,
              onSubmit: m,
              relative: v,
              preventScrollReset: g,
              viewTransition: b,
            } = e,
            w = (0, r.A)(e, c),
            S = yt(),
            k = (function (e) {
              let { relative: t } =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                { basename: n } = i.useContext(X),
                r = i.useContext(ee);
              p(r, "useFormAction must be used inside a RouteContext");
              let [a] = r.matches.slice(-1),
                s = (0, o.A)({}, ce(e || ".", { relative: t })),
                l = oe();
              if (null == e) {
                s.search = l.search;
                let e = new URLSearchParams(s.search),
                  t = e.getAll("index");
                if (t.some((e) => "" === e)) {
                  e.delete("index"),
                    t.filter((e) => e).forEach((t) => e.append("index", t));
                  let n = e.toString();
                  s.search = n ? "?".concat(n) : "";
                }
              }
              (e && "." !== e) ||
                !a.route.index ||
                (s.search = s.search
                  ? s.search.replace(/^\?/, "?index&")
                  : "?index");
              "/" !== n &&
                (s.pathname = "/" === s.pathname ? n : z([n, s.pathname]));
              return y(s);
            })(h, { relative: v }),
            E = "get" === f.toLowerCase() ? "get" : "post",
            T = "string" === typeof h && ut.test(h);
          return i.createElement(
            "form",
            (0, o.A)(
              (0, o.A)(
                {
                  ref: t,
                  method: E,
                  action: k,
                  onSubmit: l
                    ? m
                    : (e) => {
                        if ((m && m(e), e.defaultPrevented)) return;
                        e.preventDefault();
                        let t = e.nativeEvent.submitter,
                          n =
                            (null === t || void 0 === t
                              ? void 0
                              : t.getAttribute("formmethod")) || f;
                        S(t || e.currentTarget, {
                          fetcherKey: a,
                          method: n,
                          navigate: s,
                          replace: u,
                          state: d,
                          relative: v,
                          preventScrollReset: g,
                          viewTransition: b,
                        });
                      },
                },
                w
              ),
              {},
              { "data-discover": T || "render" !== n ? void 0 : "true" }
            )
          );
        });
        function pt(e) {
          return "".concat(
            e,
            " must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router."
          );
        }
        function ht(e) {
          let t = i.useContext(W);
          return p(t, pt(e)), t;
        }
        ft.displayName = "Form";
        var mt = 0,
          vt = () => "__".concat(String(++mt), "__");
        function yt() {
          let { router: e } = ht("useSubmit"),
            { basename: t } = i.useContext(X),
            n = we("useRouteId");
          return i.useCallback(
            async function (r) {
              let o =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                {
                  action: i,
                  method: a,
                  encType: s,
                  formData: l,
                  body: u,
                } = Me(r, t);
              if (!1 === o.navigate) {
                let t = o.fetcherKey || vt();
                await e.fetch(t, n, o.action || i, {
                  preventScrollReset: o.preventScrollReset,
                  formData: l,
                  body: u,
                  formMethod: o.method || a,
                  formEncType: o.encType || s,
                  flushSync: o.flushSync,
                });
              } else
                await e.navigate(o.action || i, {
                  preventScrollReset: o.preventScrollReset,
                  formData: l,
                  body: u,
                  formMethod: o.method || a,
                  formEncType: o.encType || s,
                  replace: o.replace,
                  state: o.state,
                  fromRouteId: n,
                  flushSync: o.flushSync,
                  viewTransition: o.viewTransition,
                });
            },
            [e, t, n]
          );
        }
        new TextEncoder();
      },
      6326: (e, t, n) => {
        "use strict";
        n.d(t, {
          AQ: () => d,
          C6: () => o,
          Ju: () => s,
          N3: () => c,
          YH: () => a,
          fX: () => u,
          sH: () => i,
          xN: () => f,
          zs: () => l,
        });
        var r = function (e, t) {
          return (
            (r =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            r(e, t)
          );
        };
        function o(e, t) {
          if ("function" !== typeof t && null !== t)
            throw new TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null"
            );
          function n() {
            this.constructor = e;
          }
          r(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        }
        function i(e, t, n, r) {
          return new (n || (n = Promise))(function (o, i) {
            function a(e) {
              try {
                l(r.next(e));
              } catch (t) {
                i(t);
              }
            }
            function s(e) {
              try {
                l(r.throw(e));
              } catch (t) {
                i(t);
              }
            }
            function l(e) {
              var t;
              e.done
                ? o(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, s);
            }
            l((r = r.apply(e, t || [])).next());
          });
        }
        function a(e, t) {
          var n,
            r,
            o,
            i = {
              label: 0,
              sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1];
              },
              trys: [],
              ops: [],
            },
            a = Object.create(
              ("function" === typeof Iterator ? Iterator : Object).prototype
            );
          return (
            (a.next = s(0)),
            (a.throw = s(1)),
            (a.return = s(2)),
            "function" === typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(s) {
            return function (l) {
              return (function (s) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a && ((a = 0), s[0] && (i = 0)), i; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (o =
                          2 & s[0]
                            ? r.return
                            : s[0]
                            ? r.throw || ((o = r.return) && o.call(r), 0)
                            : r.next) &&
                        !(o = o.call(r, s[1])).done)
                    )
                      return o;
                    switch (((r = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                      case 0:
                      case 1:
                        o = s;
                        break;
                      case 4:
                        return i.label++, { value: s[1], done: !1 };
                      case 5:
                        i.label++, (r = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = i.ops.pop()), i.trys.pop();
                        continue;
                      default:
                        if (
                          !(o = (o = i.trys).length > 0 && o[o.length - 1]) &&
                          (6 === s[0] || 2 === s[0])
                        ) {
                          i = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!o || (s[1] > o[0] && s[1] < o[3]))
                        ) {
                          i.label = s[1];
                          break;
                        }
                        if (6 === s[0] && i.label < o[1]) {
                          (i.label = o[1]), (o = s);
                          break;
                        }
                        if (o && i.label < o[2]) {
                          (i.label = o[2]), i.ops.push(s);
                          break;
                        }
                        o[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    s = t.call(e, i);
                  } catch (l) {
                    (s = [6, l]), (r = 0);
                  } finally {
                    n = o = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, l]);
            };
          }
        }
        Object.create;
        function s(e) {
          var t = "function" === typeof Symbol && Symbol.iterator,
            n = t && e[t],
            r = 0;
          if (n) return n.call(e);
          if (e && "number" === typeof e.length)
            return {
              next: function () {
                return (
                  e && r >= e.length && (e = void 0),
                  { value: e && e[r++], done: !e }
                );
              },
            };
          throw new TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        }
        function l(e, t) {
          var n = "function" === typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            o,
            i = n.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
              a.push(r.value);
          } catch (s) {
            o = { error: s };
          } finally {
            try {
              r && !r.done && (n = i.return) && n.call(i);
            } finally {
              if (o) throw o.error;
            }
          }
          return a;
        }
        function u(e, t, n) {
          if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
              (!r && o in t) ||
                (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
          return e.concat(r || Array.prototype.slice.call(t));
        }
        function c(e) {
          return this instanceof c ? ((this.v = e), this) : new c(e);
        }
        function d(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var r,
            o = n.apply(e, t || []),
            i = [];
          return (
            (r = Object.create(
              ("function" === typeof AsyncIterator ? AsyncIterator : Object)
                .prototype
            )),
            a("next"),
            a("throw"),
            a("return", function (e) {
              return function (t) {
                return Promise.resolve(t).then(e, u);
              };
            }),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r
          );
          function a(e, t) {
            o[e] &&
              ((r[e] = function (t) {
                return new Promise(function (n, r) {
                  i.push([e, t, n, r]) > 1 || s(e, t);
                });
              }),
              t && (r[e] = t(r[e])));
          }
          function s(e, t) {
            try {
              (n = o[e](t)).value instanceof c
                ? Promise.resolve(n.value.v).then(l, u)
                : d(i[0][2], n);
            } catch (r) {
              d(i[0][3], r);
            }
            var n;
          }
          function l(e) {
            s("next", e);
          }
          function u(e) {
            s("throw", e);
          }
          function d(e, t) {
            e(t), i.shift(), i.length && s(i[0][0], i[0][1]);
          }
        }
        function f(e) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var t,
            n = e[Symbol.asyncIterator];
          return n
            ? n.call(e)
            : ((e = s(e)),
              (t = {}),
              r("next"),
              r("throw"),
              r("return"),
              (t[Symbol.asyncIterator] = function () {
                return this;
              }),
              t);
          function r(n) {
            t[n] =
              e[n] &&
              function (t) {
                return new Promise(function (r, o) {
                  (function (e, t, n, r) {
                    Promise.resolve(r).then(function (t) {
                      e({ value: t, done: n });
                    }, t);
                  })(r, o, (t = e[n](t)).done, t.value);
                });
              };
          }
        }
        Object.create;
        "function" === typeof SuppressedError && SuppressedError;
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { id: r, loaded: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
  }
  (n.m = e),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (() => {
      var e,
        t = Object.getPrototypeOf
          ? (e) => Object.getPrototypeOf(e)
          : (e) => e.__proto__;
      n.t = function (r, o) {
        if ((1 & o && (r = this(r)), 8 & o)) return r;
        if ("object" === typeof r && r) {
          if (4 & o && r.__esModule) return r;
          if (16 & o && "function" === typeof r.then) return r;
        }
        var i = Object.create(null);
        n.r(i);
        var a = {};
        e = e || [null, t({}), t([]), t(t)];
        for (
          var s = 2 & o && r;
          "object" == typeof s && !~e.indexOf(s);
          s = t(s)
        )
          Object.getOwnPropertyNames(s).forEach((e) => (a[e] = () => r[e]));
        return (a.default = () => r), n.d(i, a), i;
      };
    })(),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.f = {}),
    (n.e = (e) =>
      Promise.all(Object.keys(n.f).reduce((t, r) => (n.f[r](e, t), t), []))),
    (n.u = (e) =>
      "static/js/" +
      e +
      "." +
      {
        213: "d8a33d4d",
        239: "695d0933",
        251: "fb112c33",
        305: "149d24db",
        318: "d2519ede",
        455: "fdcd6681",
        490: "2922ea29",
        528: "89472635",
        574: "c3a8ce22",
        608: "6147e0d0",
        742: "838407ce",
        979: "f71b2583",
      }[e] +
      ".chunk.js"),
    (n.miniCssF = (e) => "static/css/" + e + ".3bd4e806.chunk.css"),
    (n.g = (function () {
      if ("object" === typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" === typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = {},
        t = "checkingproject:";
      n.l = (r, o, i, a) => {
        if (e[r]) e[r].push(o);
        else {
          var s, l;
          if (void 0 !== i)
            for (
              var u = document.getElementsByTagName("script"), c = 0;
              c < u.length;
              c++
            ) {
              var d = u[c];
              if (
                d.getAttribute("src") == r ||
                d.getAttribute("data-webpack") == t + i
              ) {
                s = d;
                break;
              }
            }
          s ||
            ((l = !0),
            ((s = document.createElement("script")).charset = "utf-8"),
            (s.timeout = 120),
            n.nc && s.setAttribute("nonce", n.nc),
            s.setAttribute("data-webpack", t + i),
            (s.src = r)),
            (e[r] = [o]);
          var f = (t, n) => {
              (s.onerror = s.onload = null), clearTimeout(p);
              var o = e[r];
              if (
                (delete e[r],
                s.parentNode && s.parentNode.removeChild(s),
                o && o.forEach((e) => e(n)),
                t)
              )
                return t(n);
            },
            p = setTimeout(
              f.bind(null, void 0, { type: "timeout", target: s }),
              12e4
            );
          (s.onerror = f.bind(null, s.onerror)),
            (s.onload = f.bind(null, s.onload)),
            l && document.head.appendChild(s);
        }
      };
    })(),
    (n.r = (e) => {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (n.p = "/"),
    (() => {
      if ("undefined" !== typeof document) {
        var e = (e) =>
            new Promise((t, r) => {
              var o = n.miniCssF(e),
                i = n.p + o;
              if (
                ((e, t) => {
                  for (
                    var n = document.getElementsByTagName("link"), r = 0;
                    r < n.length;
                    r++
                  ) {
                    var o =
                      (a = n[r]).getAttribute("data-href") ||
                      a.getAttribute("href");
                    if ("stylesheet" === a.rel && (o === e || o === t))
                      return a;
                  }
                  var i = document.getElementsByTagName("style");
                  for (r = 0; r < i.length; r++) {
                    var a;
                    if (
                      (o = (a = i[r]).getAttribute("data-href")) === e ||
                      o === t
                    )
                      return a;
                  }
                })(o, i)
              )
                return t();
              ((e, t, r, o, i) => {
                var a = document.createElement("link");
                (a.rel = "stylesheet"),
                  (a.type = "text/css"),
                  n.nc && (a.nonce = n.nc),
                  (a.onerror = a.onload =
                    (n) => {
                      if (((a.onerror = a.onload = null), "load" === n.type))
                        o();
                      else {
                        var r = n && n.type,
                          s = (n && n.target && n.target.href) || t,
                          l = new Error(
                            "Loading CSS chunk " +
                              e +
                              " failed.\n(" +
                              r +
                              ": " +
                              s +
                              ")"
                          );
                        (l.name = "ChunkLoadError"),
                          (l.code = "CSS_CHUNK_LOAD_FAILED"),
                          (l.type = r),
                          (l.request = s),
                          a.parentNode && a.parentNode.removeChild(a),
                          i(l);
                      }
                    }),
                  (a.href = t),
                  r
                    ? r.parentNode.insertBefore(a, r.nextSibling)
                    : document.head.appendChild(a);
              })(e, i, null, t, r);
            }),
          t = { 792: 0 };
        n.f.miniCss = (n, r) => {
          t[n]
            ? r.push(t[n])
            : 0 !== t[n] &&
              { 979: 1 }[n] &&
              r.push(
                (t[n] = e(n).then(
                  () => {
                    t[n] = 0;
                  },
                  (e) => {
                    throw (delete t[n], e);
                  }
                ))
              );
        };
      }
    })(),
    (() => {
      n.b = document.baseURI || self.location.href;
      var e = { 792: 0 };
      n.f.j = (t, r) => {
        var o = n.o(e, t) ? e[t] : void 0;
        if (0 !== o)
          if (o) r.push(o[2]);
          else {
            var i = new Promise((n, r) => (o = e[t] = [n, r]));
            r.push((o[2] = i));
            var a = n.p + n.u(t),
              s = new Error();
            n.l(
              a,
              (r) => {
                if (n.o(e, t) && (0 !== (o = e[t]) && (e[t] = void 0), o)) {
                  var i = r && ("load" === r.type ? "missing" : r.type),
                    a = r && r.target && r.target.src;
                  (s.message =
                    "Loading chunk " + t + " failed.\n(" + i + ": " + a + ")"),
                    (s.name = "ChunkLoadError"),
                    (s.type = i),
                    (s.request = a),
                    o[1](s);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = (t, r) => {
          var o,
            i,
            a = r[0],
            s = r[1],
            l = r[2],
            u = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (o in s) n.o(s, o) && (n.m[o] = s[o]);
            if (l) l(n);
          }
          for (t && t(r); u < a.length; u++)
            (i = a[u]), n.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
        },
        r = (self.webpackChunkcheckingproject =
          self.webpackChunkcheckingproject || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })(),
    (() => {
      "use strict";
      var e = n(65043),
        t = n(84391),
        r = n(53986),
        o = n(64467),
        i = n(89379),
        a = n(67844),
        s = n.n(a),
        l = n(22740),
        u = n.n(l),
        c = n(17324),
        d = n.n(c);
      const f = ["children"],
        p = ["children"];
      var h,
        m,
        v = ((e) => (
          (e.BASE = "base"),
          (e.BODY = "body"),
          (e.HEAD = "head"),
          (e.HTML = "html"),
          (e.LINK = "link"),
          (e.META = "meta"),
          (e.NOSCRIPT = "noscript"),
          (e.SCRIPT = "script"),
          (e.STYLE = "style"),
          (e.TITLE = "title"),
          (e.FRAGMENT = "Symbol(react.fragment)"),
          e
        ))(v || {}),
        y = { rel: ["amphtml", "canonical", "alternate"] },
        g = { type: ["application/ld+json"] },
        b = {
          charset: "",
          name: ["generator", "robots", "description"],
          property: [
            "og:type",
            "og:title",
            "og:url",
            "og:image",
            "og:image:alt",
            "og:description",
            "twitter:url",
            "twitter:title",
            "twitter:description",
            "twitter:image",
            "twitter:image:alt",
            "twitter:card",
            "twitter:site",
          ],
        },
        w = Object.values(v),
        S = {
          accesskey: "accessKey",
          charset: "charSet",
          class: "className",
          contenteditable: "contentEditable",
          contextmenu: "contextMenu",
          "http-equiv": "httpEquiv",
          itemprop: "itemProp",
          tabindex: "tabIndex",
        },
        k = Object.entries(S).reduce((e, t) => {
          let [n, r] = t;
          return (e[r] = n), e;
        }, {}),
        E = "data-rh",
        T = "defaultTitle",
        A = "defer",
        _ = "encodeSpecialCharacters",
        I = "onChangeClientState",
        C = "titleTemplate",
        x = "prioritizeSeoTags",
        N = (e, t) => {
          for (let n = e.length - 1; n >= 0; n -= 1) {
            const r = e[n];
            if (Object.prototype.hasOwnProperty.call(r, t)) return r[t];
          }
          return null;
        },
        O = (e) => {
          let t = N(e, "title");
          const n = N(e, C);
          if ((Array.isArray(t) && (t = t.join("")), n && t))
            return n.replace(/%s/g, () => t);
          const r = N(e, T);
          return t || r || void 0;
        },
        D = (e) => N(e, I) || (() => {}),
        P = (e, t) =>
          t
            .filter((t) => "undefined" !== typeof t[e])
            .map((t) => t[e])
            .reduce((e, t) => (0, i.A)((0, i.A)({}, e), t), {}),
        R = (e, t) =>
          t
            .filter((e) => "undefined" !== typeof e.base)
            .map((e) => e.base)
            .reverse()
            .reduce((t, n) => {
              if (!t.length) {
                const r = Object.keys(n);
                for (let o = 0; o < r.length; o += 1) {
                  const i = r[o].toLowerCase();
                  if (-1 !== e.indexOf(i) && n[i]) return t.concat(n);
                }
              }
              return t;
            }, []),
        L = (e, t, n) => {
          const r = {};
          return n
            .filter((t) => {
              return (
                !!Array.isArray(t[e]) ||
                ("undefined" !== typeof t[e] &&
                  ((n = "Helmet: "
                    .concat(
                      e,
                      ' should be of type "Array". Instead found type "'
                    )
                    .concat(typeof t[e], '"')),
                  console &&
                    "function" === typeof console.warn &&
                    console.warn(n)),
                !1)
              );
              var n;
            })
            .map((t) => t[e])
            .reverse()
            .reduce((e, n) => {
              const o = {};
              n.filter((e) => {
                let n;
                const i = Object.keys(e);
                for (let r = 0; r < i.length; r += 1) {
                  const o = i[r],
                    a = o.toLowerCase();
                  -1 === t.indexOf(a) ||
                    ("rel" === n && "canonical" === e[n].toLowerCase()) ||
                    ("rel" === a && "stylesheet" === e[a].toLowerCase()) ||
                    (n = a),
                    -1 === t.indexOf(o) ||
                      ("innerHTML" !== o &&
                        "cssText" !== o &&
                        "itemprop" !== o) ||
                      (n = o);
                }
                if (!n || !e[n]) return !1;
                const a = e[n].toLowerCase();
                return (
                  r[n] || (r[n] = {}),
                  o[n] || (o[n] = {}),
                  !r[n][a] && ((o[n][a] = !0), !0)
                );
              })
                .reverse()
                .forEach((t) => e.push(t));
              const a = Object.keys(o);
              for (let t = 0; t < a.length; t += 1) {
                const e = a[t],
                  n = (0, i.A)((0, i.A)({}, r[e]), o[e]);
                r[e] = n;
              }
              return e;
            }, [])
            .reverse();
        },
        M = (e, t) => {
          if (Array.isArray(e) && e.length)
            for (let n = 0; n < e.length; n += 1) {
              if (e[n][t]) return !0;
            }
          return !1;
        },
        F = (e) => (Array.isArray(e) ? e.join("") : e),
        U = (e, t) =>
          Array.isArray(e)
            ? e.reduce(
                (e, n) => (
                  ((e, t) => {
                    const n = Object.keys(e);
                    for (let r = 0; r < n.length; r += 1)
                      if (t[n[r]] && t[n[r]].includes(e[n[r]])) return !0;
                    return !1;
                  })(n, t)
                    ? e.priority.push(n)
                    : e.default.push(n),
                  e
                ),
                { priority: [], default: [] }
              )
            : { default: e, priority: [] },
        j = (e, t) => (0, i.A)((0, i.A)({}, e), {}, { [t]: void 0 }),
        z = ["noscript", "script", "style"],
        $ = function (e) {
          return !1 ===
            (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1])
            ? String(e)
            : String(e)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#x27;");
        },
        V = (e) =>
          Object.keys(e).reduce((t, n) => {
            const r =
              "undefined" !== typeof e[n]
                ? "".concat(n, '="').concat(e[n], '"')
                : "".concat(n);
            return t ? "".concat(t, " ").concat(r) : r;
          }, ""),
        K = function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return Object.keys(e).reduce((t, n) => ((t[S[n] || n] = e[n]), t), t);
        },
        q = (t, n) =>
          n.map((n, r) => {
            const o = { key: r, [E]: !0 };
            return (
              Object.keys(n).forEach((e) => {
                const t = S[e] || e;
                if ("innerHTML" === t || "cssText" === t) {
                  const e = n.innerHTML || n.cssText;
                  o.dangerouslySetInnerHTML = { __html: e };
                } else o[t] = n[e];
              }),
              e.createElement(t, o)
            );
          }),
        B = function (t, n) {
          let r =
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
          switch (t) {
            case "title":
              return {
                toComponent: () =>
                  ((t, n, r) => {
                    const o = K(r, { key: n, [E]: !0 });
                    return [e.createElement("title", o, n)];
                  })(0, n.title, n.titleAttributes),
                toString: () =>
                  ((e, t, n, r) => {
                    const o = V(n),
                      i = F(t);
                    return o
                      ? "<"
                          .concat(e, " ")
                          .concat(E, '="true" ')
                          .concat(o, ">")
                          .concat($(i, r), "</")
                          .concat(e, ">")
                      : "<"
                          .concat(e, " ")
                          .concat(E, '="true">')
                          .concat($(i, r), "</")
                          .concat(e, ">");
                  })(t, n.title, n.titleAttributes, r),
              };
            case "bodyAttributes":
            case "htmlAttributes":
              return { toComponent: () => K(n), toString: () => V(n) };
            default:
              return {
                toComponent: () => q(t, n),
                toString: () =>
                  (function (e, t) {
                    let n =
                      !(arguments.length > 2 && void 0 !== arguments[2]) ||
                      arguments[2];
                    return t.reduce((t, r) => {
                      const o = r,
                        i = Object.keys(o)
                          .filter(
                            (e) => !("innerHTML" === e || "cssText" === e)
                          )
                          .reduce((e, t) => {
                            const r =
                              "undefined" === typeof o[t]
                                ? t
                                : "".concat(t, '="').concat($(o[t], n), '"');
                            return e ? "".concat(e, " ").concat(r) : r;
                          }, ""),
                        a = o.innerHTML || o.cssText || "",
                        s = -1 === z.indexOf(e);
                      return ""
                        .concat(t, "<")
                        .concat(e, " ")
                        .concat(E, '="true" ')
                        .concat(i)
                        .concat(s ? "/>" : ">".concat(a, "</").concat(e, ">"));
                    }, "");
                  })(t, n, r),
              };
          }
        },
        H = (e) => {
          const {
            baseTag: t,
            bodyAttributes: n,
            encode: r = !0,
            htmlAttributes: o,
            noscriptTags: i,
            styleTags: a,
            title: s = "",
            titleAttributes: l,
            prioritizeSeoTags: u,
          } = e;
          let { linkTags: c, metaTags: d, scriptTags: f } = e,
            p = { toComponent: () => {}, toString: () => "" };
          return (
            u &&
              ({
                priorityMethods: p,
                linkTags: c,
                metaTags: d,
                scriptTags: f,
              } = ((e) => {
                let { metaTags: t, linkTags: n, scriptTags: r, encode: o } = e;
                const i = U(t, b),
                  a = U(n, y),
                  s = U(r, g);
                return {
                  priorityMethods: {
                    toComponent: () => [
                      ...q("meta", i.priority),
                      ...q("link", a.priority),
                      ...q("script", s.priority),
                    ],
                    toString: () =>
                      ""
                        .concat(B("meta", i.priority, o), " ")
                        .concat(B("link", a.priority, o), " ")
                        .concat(B("script", s.priority, o)),
                  },
                  metaTags: i.default,
                  linkTags: a.default,
                  scriptTags: s.default,
                };
              })(e)),
            {
              priority: p,
              base: B("base", t, r),
              bodyAttributes: B("bodyAttributes", n, r),
              htmlAttributes: B("htmlAttributes", o, r),
              link: B("link", c, r),
              meta: B("meta", d, r),
              noscript: B("noscript", i, r),
              script: B("script", f, r),
              style: B("style", a, r),
              title: B("title", { title: s, titleAttributes: l }, r),
            }
          );
        },
        W = [],
        G = !(
          "undefined" === typeof window ||
          !window.document ||
          !window.document.createElement
        ),
        Q = class {
          constructor(e, t) {
            (0, o.A)(this, "instances", []),
              (0, o.A)(this, "canUseDOM", G),
              (0, o.A)(this, "context", void 0),
              (0, o.A)(this, "value", {
                setHelmet: (e) => {
                  this.context.helmet = e;
                },
                helmetInstances: {
                  get: () => (this.canUseDOM ? W : this.instances),
                  add: (e) => {
                    (this.canUseDOM ? W : this.instances).push(e);
                  },
                  remove: (e) => {
                    const t = (this.canUseDOM ? W : this.instances).indexOf(e);
                    (this.canUseDOM ? W : this.instances).splice(t, 1);
                  },
                },
              }),
              (this.context = e),
              (this.canUseDOM = t || !1),
              t ||
                (e.helmet = H({
                  baseTag: [],
                  bodyAttributes: {},
                  encodeSpecialCharacters: !0,
                  htmlAttributes: {},
                  linkTags: [],
                  metaTags: [],
                  noscriptTags: [],
                  scriptTags: [],
                  styleTags: [],
                  title: "",
                  titleAttributes: {},
                }));
          }
        },
        Y = e.createContext({}),
        J =
          ((h = class t extends e.Component {
            constructor(e) {
              super(e),
                (0, o.A)(this, "helmetData", void 0),
                (this.helmetData = new Q(
                  this.props.context || {},
                  t.canUseDOM
                ));
            }
            render() {
              return e.createElement(
                Y.Provider,
                { value: this.helmetData.value },
                this.props.children
              );
            }
          }),
          (0, o.A)(h, "canUseDOM", G),
          h),
        X = (e, t) => {
          const n = document.head || document.querySelector("head"),
            r = n.querySelectorAll("".concat(e, "[").concat(E, "]")),
            o = [].slice.call(r),
            i = [];
          let a;
          return (
            t &&
              t.length &&
              t.forEach((t) => {
                const n = document.createElement(e);
                for (const e in t)
                  if (Object.prototype.hasOwnProperty.call(t, e))
                    if ("innerHTML" === e) n.innerHTML = t.innerHTML;
                    else if ("cssText" === e)
                      n.styleSheet
                        ? (n.styleSheet.cssText = t.cssText)
                        : n.appendChild(document.createTextNode(t.cssText));
                    else {
                      const r = e,
                        o = "undefined" === typeof t[r] ? "" : t[r];
                      n.setAttribute(e, o);
                    }
                n.setAttribute(E, "true"),
                  o.some((e, t) => ((a = t), n.isEqualNode(e)))
                    ? o.splice(a, 1)
                    : i.push(n);
              }),
            o.forEach((e) => {
              var t;
              return null === (t = e.parentNode) || void 0 === t
                ? void 0
                : t.removeChild(e);
            }),
            i.forEach((e) => n.appendChild(e)),
            { oldTags: o, newTags: i }
          );
        },
        Z = (e, t) => {
          const n = document.getElementsByTagName(e)[0];
          if (!n) return;
          const r = n.getAttribute(E),
            o = r ? r.split(",") : [],
            i = [...o],
            a = Object.keys(t);
          for (const s of a) {
            const e = t[s] || "";
            n.getAttribute(s) !== e && n.setAttribute(s, e),
              -1 === o.indexOf(s) && o.push(s);
            const r = i.indexOf(s);
            -1 !== r && i.splice(r, 1);
          }
          for (let s = i.length - 1; s >= 0; s -= 1) n.removeAttribute(i[s]);
          o.length === i.length
            ? n.removeAttribute(E)
            : n.getAttribute(E) !== a.join(",") &&
              n.setAttribute(E, a.join(","));
        },
        ee = (e, t) => {
          const {
            baseTag: n,
            bodyAttributes: r,
            htmlAttributes: o,
            linkTags: i,
            metaTags: a,
            noscriptTags: s,
            onChangeClientState: l,
            scriptTags: u,
            styleTags: c,
            title: d,
            titleAttributes: f,
          } = e;
          Z("body", r),
            Z("html", o),
            ((e, t) => {
              "undefined" !== typeof e &&
                document.title !== e &&
                (document.title = F(e)),
                Z("title", t);
            })(d, f);
          const p = {
              baseTag: X("base", n),
              linkTags: X("link", i),
              metaTags: X("meta", a),
              noscriptTags: X("noscript", s),
              scriptTags: X("script", u),
              styleTags: X("style", c),
            },
            h = {},
            m = {};
          Object.keys(p).forEach((e) => {
            const { newTags: t, oldTags: n } = p[e];
            t.length && (h[e] = t), n.length && (m[e] = p[e].oldTags);
          }),
            t && t(),
            l(e, h, m);
        },
        te = null,
        ne = (e) => {
          te && cancelAnimationFrame(te),
            e.defer
              ? (te = requestAnimationFrame(() => {
                  ee(e, () => {
                    te = null;
                  });
                }))
              : (ee(e), (te = null));
        },
        re = class extends e.Component {
          constructor() {
            super(...arguments), (0, o.A)(this, "rendered", !1);
          }
          shouldComponentUpdate(e) {
            return !d()(e, this.props);
          }
          componentDidUpdate() {
            this.emitChange();
          }
          componentWillUnmount() {
            const { helmetInstances: e } = this.props.context;
            e.remove(this), this.emitChange();
          }
          emitChange() {
            const { helmetInstances: e, setHelmet: t } = this.props.context;
            let n = null;
            const r =
              ((o = e.get().map((e) => {
                const t = (0, i.A)({}, e.props);
                return delete t.context, t;
              })),
              {
                baseTag: R(["href"], o),
                bodyAttributes: P("bodyAttributes", o),
                defer: N(o, A),
                encode: N(o, _),
                htmlAttributes: P("htmlAttributes", o),
                linkTags: L("link", ["rel", "href"], o),
                metaTags: L(
                  "meta",
                  ["name", "charset", "http-equiv", "property", "itemprop"],
                  o
                ),
                noscriptTags: L("noscript", ["innerHTML"], o),
                onChangeClientState: D(o),
                scriptTags: L("script", ["src", "innerHTML"], o),
                styleTags: L("style", ["cssText"], o),
                title: O(o),
                titleAttributes: P("titleAttributes", o),
                prioritizeSeoTags: M(o, x),
              });
            var o;
            J.canUseDOM ? ne(r) : H && (n = H(r)), t(n);
          }
          init() {
            if (this.rendered) return;
            this.rendered = !0;
            const { helmetInstances: e } = this.props.context;
            e.add(this), this.emitChange();
          }
          render() {
            return this.init(), null;
          }
        },
        oe =
          ((m = class extends e.Component {
            shouldComponentUpdate(e) {
              return !s()(j(this.props, "helmetData"), j(e, "helmetData"));
            }
            mapNestedChildrenToProps(e, t) {
              if (!t) return null;
              switch (e.type) {
                case "script":
                case "noscript":
                  return { innerHTML: t };
                case "style":
                  return { cssText: t };
                default:
                  throw new Error(
                    "<".concat(
                      e.type,
                      " /> elements are self-closing and can not contain children. Refer to our API for more information."
                    )
                  );
              }
            }
            flattenArrayTypeChildren(e, t, n, r) {
              return (0, i.A)(
                (0, i.A)({}, t),
                {},
                {
                  [e.type]: [
                    ...(t[e.type] || []),
                    (0, i.A)(
                      (0, i.A)({}, n),
                      this.mapNestedChildrenToProps(e, r)
                    ),
                  ],
                }
              );
            }
            mapObjectTypeChildren(e, t, n, r) {
              switch (e.type) {
                case "title":
                  return (0, i.A)(
                    (0, i.A)({}, t),
                    {},
                    { [e.type]: r, titleAttributes: (0, i.A)({}, n) }
                  );
                case "body":
                  return (0, i.A)(
                    (0, i.A)({}, t),
                    {},
                    { bodyAttributes: (0, i.A)({}, n) }
                  );
                case "html":
                  return (0, i.A)(
                    (0, i.A)({}, t),
                    {},
                    { htmlAttributes: (0, i.A)({}, n) }
                  );
                default:
                  return (0, i.A)(
                    (0, i.A)({}, t),
                    {},
                    { [e.type]: (0, i.A)({}, n) }
                  );
              }
            }
            mapArrayTypeChildrenToProps(e, t) {
              let n = (0, i.A)({}, t);
              return (
                Object.keys(e).forEach((t) => {
                  n = (0, i.A)((0, i.A)({}, n), {}, { [t]: e[t] });
                }),
                n
              );
            }
            warnOnInvalidChildren(e, t) {
              return (
                u()(
                  w.some((t) => e.type === t),
                  "function" === typeof e.type
                    ? "You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information."
                    : "Only elements types "
                        .concat(
                          w.join(", "),
                          " are allowed. Helmet does not support rendering <"
                        )
                        .concat(
                          e.type,
                          "> elements. Refer to our API for more information."
                        )
                ),
                u()(
                  !t ||
                    "string" === typeof t ||
                    (Array.isArray(t) && !t.some((e) => "string" !== typeof e)),
                  "Helmet expects a string as a child of <"
                    .concat(
                      e.type,
                      ">. Did you forget to wrap your children in braces? ( <"
                    )
                    .concat(e.type, ">{``}</")
                    .concat(
                      e.type,
                      "> ) Refer to our API for more information."
                    )
                ),
                !0
              );
            }
            mapChildrenToProps(t, n) {
              let o = {};
              return (
                e.Children.forEach(t, (e) => {
                  if (!e || !e.props) return;
                  const t = e.props,
                    { children: i } = t,
                    a = (0, r.A)(t, f),
                    s = Object.keys(a).reduce(
                      (e, t) => ((e[k[t] || t] = a[t]), e),
                      {}
                    );
                  let { type: l } = e;
                  switch (
                    ("symbol" === typeof l
                      ? (l = l.toString())
                      : this.warnOnInvalidChildren(e, i),
                    l)
                  ) {
                    case "Symbol(react.fragment)":
                      n = this.mapChildrenToProps(i, n);
                      break;
                    case "link":
                    case "meta":
                    case "noscript":
                    case "script":
                    case "style":
                      o = this.flattenArrayTypeChildren(e, o, s, i);
                      break;
                    default:
                      n = this.mapObjectTypeChildren(e, n, s, i);
                  }
                }),
                this.mapArrayTypeChildrenToProps(o, n)
              );
            }
            render() {
              const t = this.props,
                { children: n } = t,
                o = (0, r.A)(t, p);
              let a = (0, i.A)({}, o),
                { helmetData: s } = o;
              if (
                (n && (a = this.mapChildrenToProps(n, a)),
                s && !(s instanceof Q))
              ) {
                (s = new Q(s.context, !0)), delete a.helmetData;
              }
              return s
                ? e.createElement(
                    re,
                    (0, i.A)((0, i.A)({}, a), {}, { context: s.value })
                  )
                : e.createElement(Y.Consumer, null, (t) =>
                    e.createElement(
                      re,
                      (0, i.A)((0, i.A)({}, a), {}, { context: t })
                    )
                  );
            }
          }),
          (0, o.A)(m, "defaultProps", {
            defer: !0,
            encodeSpecialCharacters: !0,
            prioritizeSeoTags: !1,
          }),
          m),
        ie = n(52134),
        ae = n(71444),
        se = n(70579);
      const le = (0, e.lazy)(() =>
          Promise.all([
            n.e(608),
            n.e(528),
            n.e(251),
            n.e(979),
            n.e(305),
            n.e(490),
          ]).then(n.bind(n, 15157))
        ),
        ue = (0, e.lazy)(() =>
          Promise.all([n.e(608), n.e(528), n.e(305), n.e(742)]).then(
            n.bind(n, 35419)
          )
        ),
        ce = (0, e.lazy)(() => n.e(318).then(n.bind(n, 59318))),
        de = (0, e.lazy)(() =>
          Promise.all([n.e(608), n.e(251), n.e(305), n.e(574)]).then(
            n.bind(n, 32574)
          )
        ),
        fe = () => {
          const t = (0, ie.zy)(),
            n = (0, ie.Zp)(),
            [r, o] = (0, e.useState)(""),
            [i, a] = (0, e.useState)("");
          return (
            (0, e.useEffect)(() => {
              (() => {
                const e = localStorage.getItem("userID"),
                  t = localStorage.getItem("userType");
                e && t ? (o(e), a(t)) : (o(""), a(""), n("/login"));
              })();
              const e = async (e) => {
                window.open("https://dev.dxtlxvdrz6jj5.amplifyapp.com");
              };
              return (
                window.addEventListener("beforeunload", e),
                () => {
                  window.removeEventListener("beforeunload", e);
                }
              );
            }, []),
            (0, se.jsxs)(J, {
              children: [
                (0, se.jsx)(oe, {
                  children: (0, se.jsx)("link", {
                    rel: "canonical",
                    href: window.location.href,
                  }),
                }),
                (0, se.jsxs)(e.Suspense, {
                  children: [
                    !["/login", "/changePassword"].includes(t.pathname) &&
                      r &&
                      i &&
                      (0, se.jsxs)(se.Fragment, {
                        children: [(0, se.jsx)(ue, {}), (0, se.jsx)(ce, {})],
                      }),
                    !["/changePassword"].includes(t.pathname) &&
                      !r &&
                      !i &&
                      (0, se.jsx)(de, {}),
                    r &&
                      i &&
                      (0, se.jsx)("div", {
                        className: "mt-28 ml-64",
                        children: (0, se.jsx)(ae.A, {
                          children: (0, se.jsx)(le, {}),
                        }),
                      }),
                  ],
                }),
              ],
            })
          );
        };
      n(59555);
      var pe = n(30348);
      function he(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) e[r] = n[r];
        }
        return e;
      }
      var me = (function e(t, n) {
        function r(e, r, o) {
          if ("undefined" !== typeof document) {
            "number" === typeof (o = he({}, n, o)).expires &&
              (o.expires = new Date(Date.now() + 864e5 * o.expires)),
              o.expires && (o.expires = o.expires.toUTCString()),
              (e = encodeURIComponent(e)
                .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                .replace(/[()]/g, escape));
            var i = "";
            for (var a in o)
              o[a] &&
                ((i += "; " + a),
                !0 !== o[a] && (i += "=" + o[a].split(";")[0]));
            return (document.cookie = e + "=" + t.write(r, e) + i);
          }
        }
        return Object.create(
          {
            set: r,
            get: function (e) {
              if ("undefined" !== typeof document && (!arguments.length || e)) {
                for (
                  var n = document.cookie ? document.cookie.split("; ") : [],
                    r = {},
                    o = 0;
                  o < n.length;
                  o++
                ) {
                  var i = n[o].split("="),
                    a = i.slice(1).join("=");
                  try {
                    var s = decodeURIComponent(i[0]);
                    if (((r[s] = t.read(a, s)), e === s)) break;
                  } catch (l) {}
                }
                return e ? r[e] : r;
              }
            },
            remove: function (e, t) {
              r(e, "", he({}, t, { expires: -1 }));
            },
            withAttributes: function (t) {
              return e(this.converter, he({}, this.attributes, t));
            },
            withConverter: function (t) {
              return e(he({}, this.converter, t), this.attributes);
            },
          },
          {
            attributes: { value: Object.freeze(n) },
            converter: { value: Object.freeze(t) },
          }
        );
      })(
        {
          read: function (e) {
            return (
              '"' === e[0] && (e = e.slice(1, -1)),
              e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
            );
          },
          write: function (e) {
            return encodeURIComponent(e).replace(
              /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
              decodeURIComponent
            );
          },
        },
        { path: "/" }
      );
      class ve {
        constructor() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          const { path: t, domain: n, expires: r, sameSite: o, secure: i } = e;
          if (
            ((this.domain = n),
            (this.path = t || "/"),
            (this.expires = Object.prototype.hasOwnProperty.call(e, "expires")
              ? r
              : 365),
            (this.secure =
              !Object.prototype.hasOwnProperty.call(e, "secure") || i),
            Object.prototype.hasOwnProperty.call(e, "sameSite"))
          ) {
            if (!o || !["strict", "lax", "none"].includes(o))
              throw new Error(
                'The sameSite value of cookieStorage must be "lax", "strict" or "none".'
              );
            if ("none" === o && !this.secure)
              throw new Error(
                "sameSite = None requires the Secure attribute in latest browser versions."
              );
            this.sameSite = o;
          }
        }
        async setItem(e, t) {
          me.set(e, t, this.getData());
        }
        async getItem(e) {
          const t = me.get(e);
          return null !== t && void 0 !== t ? t : null;
        }
        async removeItem(e) {
          me.remove(e, this.getData());
        }
        async clear() {
          const e = me.get(),
            t = Object.keys(e).map((e) => this.removeItem(e));
          await Promise.all(t);
        }
        getData() {
          return (0, i.A)(
            {
              path: this.path,
              expires: this.expires,
              domain: this.domain,
              secure: this.secure,
            },
            this.sameSite && { sameSite: this.sameSite }
          );
        }
      }
      var ye = n(96360),
        ge = n(91095),
        be = n(87546),
        we = n(44619),
        Se = n(32770),
        ke = n(1220);
      const Ee = { identityId: "identityId" },
        Te = new we.C("DefaultIdentityIdStore");
      const Ae = (e, t) => (0, ke.Qm)(Ee)("com.amplify.".concat(e), t);
      n(83157), n(21547);
      var _e = n(3827),
        Ie = n(1068),
        Ce = n(67161),
        xe = n(83249),
        Ne = n(53060),
        Oe = n(41297),
        De = n(35122),
        Pe = n(80727),
        Re = n(45909),
        Le = n(14486),
        Me = n(46130);
      const Fe = (0, Re.q)(Ne.F, [
          () => (e) =>
            async function (t) {
              return (t.headers["cache-control"] = "no-store"), e(t);
            },
        ]),
        Ue = {
          service: "cognito-identity",
          endpointResolver: (e) => {
            let { region: t } = e;
            return {
              url: new Pe.o(
                "https://cognito-identity.".concat(t, ".").concat((0, xe.R)(t))
              ),
            };
          },
          retryDecider: (0, De.D)(Ie.F),
          computeDelay: Oe.y,
          userAgentValue: (0, Le.fE)(),
          cache: "no-store",
        };
      (0, Me.e9)(() => {
        Ue.userAgentValue = (0, Le.fE)();
      });
      const je = (e) => ({
          "content-type": "application/x-amz-json-1.1",
          "x-amz-target": "AWSCognitoIdentityService.".concat(e),
        }),
        ze = (e, t, n) => {
          let { url: r } = e;
          return { headers: t, url: r, body: n, method: "POST" };
        },
        $e = function () {
          let {
            AccessKeyId: e,
            SecretKey: t,
            SessionToken: n,
            Expiration: r,
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {};
          return {
            AccessKeyId: e,
            SecretKey: t,
            SessionToken: n,
            Expiration: r && new Date(1e3 * r),
          };
        },
        Ve = (0, Ce.A)(
          Fe,
          (e, t) => {
            const n = je("GetCredentialsForIdentity"),
              r = JSON.stringify(e);
            return ze(t, n, r);
          },
          async (e) => {
            if (e.statusCode >= 300) {
              throw await (0, Ie.F)(e);
            }
            {
              const t = await (0, Ie.Y)(e);
              return {
                IdentityId: t.IdentityId,
                Credentials: $e(t.Credentials),
                $metadata: (0, _e.j)(e),
              };
            }
          },
          Ue
        );
      var Ke = n(82096),
        qe = n(9715),
        Be = n(82242);
      const He = (0, Ce.A)(
        Fe,
        (e, t) => {
          const n = je("GetId"),
            r = JSON.stringify(e);
          return ze(t, n, r);
        },
        async (e) => {
          if (e.statusCode >= 300) {
            throw await (0, Ie.F)(e);
          }
          return {
            IdentityId: (await (0, Ie.Y)(e)).IdentityId,
            $metadata: (0, _e.j)(e),
          };
        },
        Ue
      );
      function We(e) {
        const t = (0, Se.Cq)(e).payload.iss,
          n = {};
        if (!t)
          throw new Ke.l({
            name: "InvalidIdTokenException",
            message: "Invalid Idtoken.",
          });
        return (n[t.replace(/(^\w+:|^)\/\//, "")] = e), n;
      }
      const Ge = new we.C("CognitoIdentityIdProvider");
      async function Qe(e, t) {
        const n = null === t || void 0 === t ? void 0 : t.identityPoolId,
          r = (0, qe.C)(n),
          o = (await He({ region: r }, { IdentityPoolId: n, Logins: e }))
            .IdentityId;
        if (!o)
          throw new Ke.l({
            name: "GetIdResponseException",
            message: "Received undefined response from getId operation",
            recoverySuggestion:
              "Make sure to pass a valid identityPoolId in the configuration.",
          });
        return o;
      }
      const Ye = new we.C("CognitoCredentialsProvider"),
        Je = 3e6;
      const Xe = new (class {
          constructor(e) {
            (this._nextCredentialsRefresh = 0), (this._identityIdStore = e);
          }
          async clearCredentialsAndIdentityId() {
            Ye.debug("Clearing out credentials and identityId"),
              (this._credentialsAndIdentityId = void 0),
              await this._identityIdStore.clearIdentityId();
          }
          async clearCredentials() {
            Ye.debug("Clearing out in-memory credentials"),
              (this._credentialsAndIdentityId = void 0);
          }
          async getCredentialsAndIdentityId(e) {
            const t = e.authenticated,
              { tokens: n } = e,
              { authConfig: r } = e;
            try {
              (0, Se.Eh)(null === r || void 0 === r ? void 0 : r.Cognito);
            } catch (s) {
              return;
            }
            if (!t && !r.Cognito.allowGuestAccess) return;
            const { forceRefresh: o } = e,
              i = this.hasTokenChanged(n),
              a = await (async function (e) {
                let { tokens: t, authConfig: n, identityIdStore: r } = e;
                r.setAuthConfig({ Cognito: n });
                let o = await r.loadIdentityId();
                if (t) {
                  if (o && "primary" === o.type) return o.id;
                  {
                    const e = t.idToken ? We(t.idToken.toString()) : {},
                      r = await Qe(e, n);
                    o &&
                      o.id === r &&
                      Ge.debug(
                        "The guest identity ".concat(
                          o.id,
                          " has become the primary identity."
                        )
                      ),
                      (o = { id: r, type: "primary" });
                  }
                } else {
                  if (o && "guest" === o.type) return o.id;
                  o = { id: await Qe({}, n), type: "guest" };
                }
                return r.storeIdentityId(o), o.id;
              })({
                tokens: n,
                authConfig: r.Cognito,
                identityIdStore: this._identityIdStore,
              });
            return (
              (o || i) && this.clearCredentials(),
              t
                ? ((0, Be.OW)(n), this.credsForOIDCTokens(r.Cognito, n, a))
                : this.getGuestCredentials(a, r.Cognito)
            );
          }
          async getGuestCredentials(e, t) {
            if (
              this._credentialsAndIdentityId &&
              !this.isPastTTL() &&
              !1 === this._credentialsAndIdentityId.isAuthenticatedCreds
            )
              return (
                Ye.info(
                  "returning stored credentials as they neither past TTL nor expired."
                ),
                this._credentialsAndIdentityId
              );
            this.clearCredentials();
            const n = (0, qe.C)(t.identityPoolId),
              r = await Ve({ region: n }, { IdentityId: e });
            if (
              r.Credentials &&
              r.Credentials.AccessKeyId &&
              r.Credentials.SecretKey
            ) {
              this._nextCredentialsRefresh = new Date().getTime() + Je;
              const t = {
                  credentials: {
                    accessKeyId: r.Credentials.AccessKeyId,
                    secretAccessKey: r.Credentials.SecretKey,
                    sessionToken: r.Credentials.SessionToken,
                    expiration: r.Credentials.Expiration,
                  },
                  identityId: e,
                },
                n = r.IdentityId;
              return (
                n &&
                  ((t.identityId = n),
                  this._identityIdStore.storeIdentityId({
                    id: n,
                    type: "guest",
                  })),
                (this._credentialsAndIdentityId = (0, i.A)(
                  (0, i.A)({}, t),
                  {},
                  { isAuthenticatedCreds: !1 }
                )),
                t
              );
            }
            throw new Ke.l({
              name: "CredentialsNotFoundException",
              message:
                "Cognito did not respond with either Credentials, AccessKeyId or SecretKey.",
            });
          }
          async credsForOIDCTokens(e, t, n) {
            if (
              this._credentialsAndIdentityId &&
              !this.isPastTTL() &&
              !0 === this._credentialsAndIdentityId.isAuthenticatedCreds
            )
              return (
                Ye.debug(
                  "returning stored credentials as they neither past TTL nor expired."
                ),
                this._credentialsAndIdentityId
              );
            this.clearCredentials();
            const r = t.idToken ? We(t.idToken.toString()) : {},
              o = (0, qe.C)(e.identityPoolId),
              a = await Ve({ region: o }, { IdentityId: n, Logins: r });
            if (
              a.Credentials &&
              a.Credentials.AccessKeyId &&
              a.Credentials.SecretKey
            ) {
              var s;
              const e = {
                credentials: {
                  accessKeyId: a.Credentials.AccessKeyId,
                  secretAccessKey: a.Credentials.SecretKey,
                  sessionToken: a.Credentials.SessionToken,
                  expiration: a.Credentials.Expiration,
                },
                identityId: n,
              };
              (this._credentialsAndIdentityId = (0, i.A)(
                (0, i.A)({}, e),
                {},
                {
                  isAuthenticatedCreds: !0,
                  associatedIdToken:
                    null === (s = t.idToken) || void 0 === s
                      ? void 0
                      : s.toString(),
                }
              )),
                (this._nextCredentialsRefresh = new Date().getTime() + Je);
              const r = a.IdentityId;
              return (
                r &&
                  ((e.identityId = r),
                  this._identityIdStore.storeIdentityId({
                    id: r,
                    type: "primary",
                  })),
                e
              );
            }
            throw new Ke.l({
              name: "CredentialsException",
              message:
                "Cognito did not respond with either Credentials, AccessKeyId or SecretKey.",
            });
          }
          isPastTTL() {
            return (
              void 0 === this._nextCredentialsRefresh ||
              this._nextCredentialsRefresh <= Date.now()
            );
          }
          hasTokenChanged(e) {
            var t, n;
            return (
              !!e &&
              !(
                null === (t = this._credentialsAndIdentityId) ||
                void 0 === t ||
                !t.associatedIdToken
              ) &&
              (null === (n = e.idToken) || void 0 === n
                ? void 0
                : n.toString()) !==
                this._credentialsAndIdentityId.associatedIdToken
            );
          }
        })(
          new (class {
            setAuthConfig(e) {
              (0, Se.Eh)(e.Cognito),
                (this.authConfig = e),
                (this._authKeys = Ae("Cognito", e.Cognito.identityPoolId));
            }
            constructor(e) {
              (this._authKeys = {}),
                (this._hasGuestIdentityId = !1),
                (this.keyValueStorage = e);
            }
            async loadIdentityId() {
              var e;
              (0, Se.Eh)(
                null === (e = this.authConfig) || void 0 === e
                  ? void 0
                  : e.Cognito
              );
              try {
                if (this._primaryIdentityId)
                  return { id: this._primaryIdentityId, type: "primary" };
                {
                  const e = await this.keyValueStorage.getItem(
                    this._authKeys.identityId
                  );
                  return e
                    ? ((this._hasGuestIdentityId = !0),
                      { id: e, type: "guest" })
                    : null;
                }
              } catch (t) {
                return Te.log("Error getting stored IdentityId.", t), null;
              }
            }
            async storeIdentityId(e) {
              var t;
              (0, Se.Eh)(
                null === (t = this.authConfig) || void 0 === t
                  ? void 0
                  : t.Cognito
              ),
                "guest" === e.type
                  ? (this.keyValueStorage.setItem(
                      this._authKeys.identityId,
                      e.id
                    ),
                    (this._primaryIdentityId = void 0),
                    (this._hasGuestIdentityId = !0))
                  : ((this._primaryIdentityId = e.id),
                    this._hasGuestIdentityId &&
                      (this.keyValueStorage.removeItem(
                        this._authKeys.identityId
                      ),
                      (this._hasGuestIdentityId = !1)));
            }
            async clearIdentityId() {
              (this._primaryIdentityId = void 0),
                await this.keyValueStorage.removeItem(
                  this._authKeys.identityId
                );
            }
          })(ye.ZL)
        ),
        Ze = {
          aws_project_region: "ap-southeast-1",
          aws_appsync_graphqlEndpoint:
            "https://se7jlrezlbfqtbhgbur2ho7nve.appsync-api.ap-southeast-1.amazonaws.com/graphql",
          aws_appsync_region: "ap-southeast-1",
          aws_appsync_authenticationType: "API_KEY",
          aws_appsync_apiKey: "da2-sozeonqiyngqlfvqerog7rsnvm",
          aws_cognito_identity_pool_id:
            "ap-southeast-1:a7922744-4c59-4979-b386-13e05591c7cd",
          aws_cognito_region: "ap-southeast-1",
          aws_user_pools_id: "ap-southeast-1_G6lnUXy44",
          aws_user_pools_web_client_id: "73hgijbc7ar7kb2f06ooah6bbo",
          oauth: {},
          aws_cognito_username_attributes: [],
          aws_cognito_social_providers: [],
          aws_cognito_signup_attributes: ["EMAIL"],
          aws_cognito_mfa_configuration: "OFF",
          aws_cognito_mfa_types: ["SMS"],
          aws_cognito_password_protection_settings: {
            passwordPolicyMinLength: 8,
            passwordPolicyCharacters: [],
          },
          aws_cognito_verification_mechanisms: ["EMAIL"],
          aws_user_files_s3_bucket: "aweadininprod2024954b8-prod",
          aws_user_files_s3_bucket_region: "ap-southeast-1",
        };
      ({
        configure(e, t) {
          const n = (0, ge.M)(e);
          if (n.Auth) {
            if (null === t || void 0 === t || !t.Auth)
              return pe.H.libraryOptions.Auth
                ? t
                  ? (void 0 !== t.ssr &&
                      be.Q.setKeyValueStorage(
                        t.ssr ? new ve({ sameSite: "lax" }) : ye.ZL
                      ),
                    void pe.H.configure(
                      n,
                      (0, i.A)({ Auth: pe.H.libraryOptions.Auth }, t)
                    ))
                  : void pe.H.configure(n)
                : (be.Q.setAuthConfig(n.Auth),
                  be.Q.setKeyValueStorage(
                    null !== t && void 0 !== t && t.ssr
                      ? new ve({ sameSite: "lax" })
                      : ye.ZL
                  ),
                  void pe.H.configure(
                    n,
                    (0, i.A)(
                      (0, i.A)({}, t),
                      {},
                      { Auth: { tokenProvider: be.Q, credentialsProvider: Xe } }
                    )
                  ));
            pe.H.configure(n, t);
          } else pe.H.configure(n, t);
        },
        getConfig: () => pe.H.getConfig(),
      }).configure(Ze),
        window.console ||
          (window.console = {
            log: function () {},
            warn: function () {},
            error: function () {},
            time: function () {},
            timeEnd: function () {},
          }),
        (0, t.H)(document.getElementById("root")).render(
          (0, se.jsx)(e.StrictMode, {
            children: (0, se.jsx)(ie.Kd, { children: (0, se.jsx)(fe, {}) }),
          })
        );
    })();
})();
//# sourceMappingURL=main.1436c5a6.js.map