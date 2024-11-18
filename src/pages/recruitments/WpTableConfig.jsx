export const WpTableConfig = {
    
   SAWP: [
       { label: 'Client Support Letter Requested Date', field: 'supportletterReqDate', type:'date'},
       { label: 'Client Support Letter Received Date', field: 'supportletterReceiveDate', type:'date'},
       { label: 'Upload Letter PDF', field: 'letterfile', type: 'file'},
   ],
      DOE: [
      { label: 'Date of Submission', field: 'doesubmitdate', type: 'date' },
      { label: 'Date of Approval', field: 'doeapprovedate', type: 'date' },
      { label: 'Valid Until', field: 'doeexpirydate', type: 'date' },
      { label: 'Reference No', field: 'referenceno', type: 'text' },
      { label: 'Upload DOE PDF', field: 'doefile', type: 'file' },
    ],
    NLMS: [
      { label: 'Date of Submission', field: 'nlmssubmitdate', type: 'date' },
      { label: 'Submission Reference No', field: 'submissionrefrenceno', type: 'text' },
      { label: 'Date of Approval', field: 'nlmsapprovedate', type: 'date' },
      { label: 'LD Reference No', field: 'ldreferenceno', type: 'text' },
      { label: 'Valid Until', field: 'nlmsexpirydate', type: 'date' },
      { label: 'Upload NLMS PDF', field: 'nlmsfile', type: 'file' },
    ],
    BankGuarantee: [
      { label: 'Date of Submission', field: 'bgsubmitdate', type: 'date' },
      { label: 'Date Received', field: 'bgreceivedate', type: 'date' },
      { label: 'Reference No', field: 'referenceno', type: 'text' },
      { label: 'BG Amount', field: 'bgamount', type: 'text' },
      { label: 'Valid Until', field: 'bgexpirydate', type: 'date' },
      { label: 'Upload BG PDF', field: 'bgfile', type: 'file' },
    ],
    JITPA: [
      { label: 'TBA Purchase Date', field: 'tbapurchasedate', type: 'date' },
      { label: 'JITPA Amount', field: 'jitpaamount', type: 'text' },
      { label: 'Valid Until', field: 'jitpaexpirydate', type: 'date' },
      { label: 'Labour Deposit Receipt No', field: 'receiptno', type: 'text' },
      { label: 'Deposit Amount', field: 'depositamount', type: 'text' },
      { label: 'Submit Date for Endorsement', field: 'submitdateendorsement', type: 'date' },
      { label: 'Upload JITPA PDF', field: 'jitpafile', type: 'file' },
    ],
    Immigration: [
      { label: 'Immigration Reference No', field: 'immbdno', type: 'text' },
      { label: 'Date of Submission', field: 'docsubmitdate', type: 'date' },
      { label: 'Date of Approval', field: 'visaapprovedate', type: 'date' },
      { label: 'Visa Reference No', field: 'visareferenceno', type: 'text' },
      { label: 'Upload Visa PDF', field: 'visaFile', type: 'file' },
    ],
    AirTicket: [
      { label: 'Date of Departure', field: 'departuredate', type: 'date' },
      { label: 'Date of Arrival', field: 'arrivaldate', type: 'date' },
      { label: 'Departure From', field: 'cityname', type: 'text' },
      { label: 'AirFare', field: 'airfare', type: 'text' },
      { label: 'Upload Ticket', field: 'airticketfile', type: 'file' },
    ],
    Mobilization: [
      { label: 'Agent Name', field:'agentname', type:'text'},
      { label: 'Date of Signing', field: 'mobSignDate', type: 'date' },
      { label: 'Upload Contract PDF', field: 'mobFile', type: 'file' },
    ]
  };
  