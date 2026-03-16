export const publicHolidayList = async () => {
  try {
    const response = await fetch(
      "https://commonfiles.s3.ap-southeast-1.amazonaws.com/Leave+Details/CompanyHolidays.json"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return {
      publicHoliday: data,
    };
  } catch (error) {
    console.error("Error fetching public holiday data:", error);
    return {
      publicHoliday: [],
    };
  }
};

// export const publicHoliday = {
//   CompanyHolidays2025: [
//     {
//       name: "NEW YEAR'S DAY",
//       date: "Wednesday, 1st January 2025",
//     },
//     {
//       name: "ISRA' MI'RAJ",
//       date: "Monday, 27th January 2025",
//     },
//     {
//       name: "CHINESE NEW YEAR",
//       date: "Wednesday, 29th January 2025",
//     },
//     {
//       name: "41st NATIONAL DAY NEGARA BRUNEI DARUSSALAM",
//       date: "Monday, 24th February 2025",
//       note: "(in lieu of Sunday, 23rd February 2025)",
//     },
//     {
//       name: "1st DAY OF RAMADHAN",
//       date: "Monday, 3rd March 2025",
//       note: "(in lieu of Sunday, 2nd March 2025)",
//     },
//     {
//       name: "ANNIVERSARY OF THE REVELATION OF THE QURAN",
//       date: "Tuesday, 18th March 2025",
//     },
//     {
//       name: "HARI RAYA AIDIL FITRI",
//       dates: [
//         "Monday, 31st March 2025",
//         "Tuesday, 1st April 2025",
//         "Wednesday, 2nd April 2025",
//       ],
//     },
//     {
//       name: "HARI RAYA AIDIL ADHA",
//       date: "Saturday, 7th June 2025",
//     },
//     {
//       name: "FIRST DAY OF HIJRAH 1447",
//       date: "Friday, 27th June 2025",
//     },
//     {
//       name: "HIS MAJESTY THE SULTAN'S 79th BIRTHDAY",
//       date: "Tuesday, 15th July 2025",
//     },
//     {
//       name: "MAULUD-PROPHET MUHAMMAD'S BIRTHDAY",
//       date: "Friday, 5th September 2025",
//     },
//     {
//       name: "CHRISTMAS DAY",
//       date: "Thursday, 25th December 2025",
//     },
//   ],
//   notes: "*Dates subject to alteration",
// };
