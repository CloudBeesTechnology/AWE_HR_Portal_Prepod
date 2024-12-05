export const TabConfig = {
    Interview: [
        { label: 'Date', field: 'date', type: 'date' },
        { label: 'Time', field: 'time', type: 'time' },
        { label: 'Venue', field: 'venue', type: 'text' },
        { label: 'Interview Type', field: 'interviewType', type: 'text' },
        { label: 'Interviewer', field: 'interviewer', type: 'text' },
        { label: 'Message', field: 'message', type: 'text' },
      ],
      Candidate: [
        { label: 'Selected Position', field: 'position', type: 'text' },
        { label: 'Selected Department', field: 'department', type: 'text' },
      ],
      LOI: [
        { label: 'Date of Issue', field: 'loiIssueDate', type: 'date' },
        { label: 'Date of Acceptance', field: 'loiAcceptDate', type: 'date' },
        { label: 'Date of Decline', field: 'loiDeclineDate', type: 'date'},
        { label: 'Decline Reason', field: 'declineReason', type: 'text'},
        { label: 'Upload LOI PDF', field: 'loiFile', type: 'file' },
      ],
      CVEV: [
        { label: 'Date of Approval', field: 'cvecApproveDate', type: 'date' },
        { label: 'Upload CVEC PDF', field: 'cvecFile', type: 'file' },
      ],
      PAAF: [
        { label: 'Date of Approval', field: 'paafApproveDate', type: 'date' },
        { label: 'Upload PAAF PDF', field: 'paafFile', type: 'file' },
      ],
      Mobilization: [
        { label: 'Date of Signing', field: 'mobSignDate', type: 'date' },
        { label: 'Upload Contract PDF', field: 'mobFile', type: 'file' },
      ]

    };