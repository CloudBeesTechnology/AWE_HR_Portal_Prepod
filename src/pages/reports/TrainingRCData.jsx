import React, { useEffect, useState } from "react";
import { FilterTable } from "./FilterTable";
import { useLocation } from "react-router-dom";

export const TrainingRCData = () => {
  const location = useLocation();
  const { allData, title } = location.state || {};
  const [tableBody, setTableBody] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tableHead, setTableHead] = useState([
    "Emp ID",
    "Badge No",
    "Name",
    "MR No",
    "PO No",
    "CODE",
    "COURSE / PROGRAMME",
    "CONDUCTED BY",
    "Course Fee",
    "Department",
    "Other Department",
    "Position",
    "Other Position",
    "START DATE",
    "END DATE",
    "CERT. EXP",
    "EXPIRED/VALID",
    "Mandatory/ Supplementary",
    "E-CERT RECEIVED",
    "ORIGINAL CERT RECEIVED",
    "REMARKS",
  ]);

  const formatDate = (date) => {
    if (!date) return "-";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "-";
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const checkExpiryStatus = (certifiExpiry) => {
    if (!certifiExpiry) return "EXPIRED";
    const expiryDate = new Date(certifiExpiry);
    const today = new Date();
    return expiryDate < today ? "EXPIRED" : "VALID";
  };

  const normalizeTraineeTrackData = (data) => {
    try {
      let raw;

      // CASE 1: data is an array like ['[{MRNo:...}]'] or ['[{"MRNo":"..."}]']
      if (Array.isArray(data)) {
        raw = data[0];
      } else {
        raw = data;
      }

      // Remove outer quotes if it's a stringified string (e.g. "\"[{...}]\"")
      if (typeof raw === "string" && raw.startsWith('"') && raw.endsWith('"')) {
        raw = JSON.parse(raw); // unescape once
      }

      // Now, handle unquoted keys: MRNo: -> "MRNo":
      const fixedJSON = raw.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');

      const parsed = JSON.parse(fixedJSON);

      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Error normalizing traineeTrackData:",data);
      return [];
    }
  };

  const resignationMergedData = (data) => {
    return data
      .filter((item) => {
        if (Array.isArray(item?.workStatus) && item?.workStatus.length > 0) {
          const lastWorkStatus = item?.workStatus[item?.workStatus.length - 1];

          if (
            lastWorkStatus.toUpperCase() === "TERMINATION" ||
            lastWorkStatus.toUpperCase() === "RESIGNATION"
          ) {
            return false;
          }
        }
        return true;
        // const certifiExpiryDates = item?.certifiExpiry || [];
        // const lastDate = certifiExpiryDates[certifiExpiryDates?.length - 1];
        // if (!lastDate) return false;

        // const certifiExpiry = new Date(lastDate);
        // return certifiExpiry;
      })
      .flatMap((item) => {
        const trainingTrack = normalizeTraineeTrackData(
          item.traineeTrack || "[]"
        );
        const trainingProofs = normalizeTraineeTrackData(
          item.trainingProof || "[]"
        );
        // console.log(trainingTrack);

        return trainingTrack.map((track) => {
          // Match proof using MRNo or courseCode
          const proof =
          trainingProofs.find(
            (p) =>
              p.empID === track.empID &&
              p.MRNo === track.MRNo &&
              p.traineeSD === track.traineeSD &&
              p.traineeED === track.traineeED
          ) || {};
          // console.log(proof, "proof");

          return {
            empID: item.empID || "-",
            empBadgeNo: item.empBadgeNo || "-",
            name: item.name || "-",
            mrNo: track.MRNo || "-",
            poNo: proof.poNo || "-",
            code: track.courseCode || "-",
            courseProgramme: track.courseName || "-",
            conductedBy: track.company || "-",
            courseFee: track.traineeCourseFee || "-",
            department: Array.isArray(item.department)
              ? item.department[item.department.length - 1]
              : "-",
            otherDepartment: Array.isArray(item.otherDepartment)
              ? item.otherDepartment[item.otherDepartment.length - 1]
              : "-",
            position: Array.isArray(item.position)
              ? item.position[item.position.length - 1]
              : "-",
            otherPosition: Array.isArray(item.otherPosition)
              ? item.otherPosition[item.otherPosition.length - 1]
              : "-",
            startDate: formatDate(track.traineeSD) || "-",
            endDate: formatDate(track.traineeED) || "-",
            certExp: formatDate(proof.certifiExpiry) || "-",
            expiredValid: checkExpiryStatus(proof.certifiExpiry),
            mandatorySupplementary: track.traineeStatus || "-",
            eCertReceived: formatDate(proof.eCertifiDate) || "-",
            originalCertReceived: formatDate(proof.orgiCertifiDate) || "-",
            remarks: proof.tcRemarks || "-",
          };
        });
      });
    // .filter(
    //   (item) =>
    //     item.rawCertifiExpiry instanceof Date && !isNaN(item.rawCertifiExpiry)
    // )
    // .sort((a, b) => a.rawCertifiExpiry - b.rawCertifiExpiry)
    // .map(({ rawCertifiExpiry, ...rest }) => rest);
  };
  // console.log(tableBody);

  useEffect(() => {
    setTableBody(resignationMergedData(allData));
  }, [allData]);

  const handleDate = (e, type) => {
    const value = e.target.value;

    if (type === "startDate") setStartDate(value);
    if (type === "endDate") setEndDate(value);

    const start =
      type === "startDate"
        ? new Date(value)
        : startDate
        ? new Date(startDate)
        : null;
    const end =
      type === "endDate" ? new Date(value) : endDate ? new Date(endDate) : null;

    const filtered = allData
      .filter((data) => {
        if (!Array.isArray(data.workStatus) || data.workStatus.length === 0)
          return false;

        const lastWorkStatus = data.workStatus[data.workStatus.length - 1];
        return !["TERMINATION", "RESIGNATION"].includes(
          lastWorkStatus?.toUpperCase()
        );
      })
      .flatMap((item) => {
        const trainingTrack = normalizeTraineeTrackData(
          item.traineeTrack || "[]"
        );

        return trainingTrack
          .filter((track) => {
            const sd = new Date(track.traineeSD);
            const ed = new Date(track.traineeED);

            if (!sd || !ed || isNaN(sd) || isNaN(ed)) return false;

            if (start && end) return sd >= start && ed <= end;
            if (start) return sd >= start;
            if (end) return ed <= end;

            return true;
          })
          .map((track) => ({
            empID: item.empID || "-",
            empBadgeNo: item.empBadgeNo || "-",
            name: item.name || "-",
            MRNo: item.MRNo || "-",
            poNo: item.poNo || "-",
            courseCode: item.courseCode || "-",
            courseName: item.courseName || "-",
            company: item.company || "-",
            traineeCourseFee: item.traineeCourseFee || "-",
            department: Array.isArray(item.department)
              ? item.department[item.department.length - 1]
              : "-",
            otherDepartment: Array.isArray(item.otherDepartment)
              ? item.otherDepartment[item.otherDepartment.length - 1]
              : "-",
            position: Array.isArray(item.position)
              ? item.position[item.position.length - 1]
              : "-",
            otherPosition: Array.isArray(item.otherPosition)
              ? item.otherPosition[item.otherPosition.length - 1]
              : "-",
            traineeSD: formatDate(track.traineeSD),
            traineeED: formatDate(track.traineeED),
            certifiExpiry: Array.isArray(item.certifiExpiry)
              ? formatDate(item.certifiExpiry[item.certifiExpiry.length - 1])
              : "-",
            expAndValid: checkExpiryStatus(item.certifiExpiry),
            traineeStatus: item.traineeStatus || "-",
            eCertifiDate: Array.isArray(item.eCertifiDate)
              ? formatDate(item.eCertifiDate[item.eCertifiDate.length - 1])
              : "-",
            orgiCertifiDate: Array.isArray(item.orgiCertifiDate)
              ? formatDate(
                  item.orgiCertifiDate[item.orgiCertifiDate.length - 1]
                )
              : "-",
            remark: item.remark || "-",
            rawCertifiExpiry: new Date(item.certifiExpiry),
          }));
      });

    setFilteredData(filtered);
  };

  return (
    <div>
      <FilterTable
        tableBody={filteredData.length ? filteredData : tableBody}
        // tableBody={tableBody}
        startDate={startDate}
        endDate={endDate}
        tableHead={tableHead}
        title={title}
        handleDate={handleDate}
      />
    </div>
  );
};
