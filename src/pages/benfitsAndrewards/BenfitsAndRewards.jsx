import React, { useState, useEffect } from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/benefit_and_rewards/employe.svg";
import icon2 from "../../assets/benefit_and_rewards/traning.svg";
import icon3 from "../../assets/benefit_and_rewards/Attendance.svg";
import icon4 from "../../assets/benefit_and_rewards/compensation.svg";
import icon5 from "../../assets/benefit_and_rewards/termination.svg";
import icon6 from "../../assets/benefit_and_rewards/consequence.svg";
import { getUrl } from "@aws-amplify/storage";
import { pdfjs } from "react-pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const BenfitsAndRewards = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfLinks, setPdfLinks] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const linkStorage = async () => {
      const pdfLinks = [
        "public/benefitsRewards/EmploymentPolicy.pdf",
        "public/benefitsRewards/TrainingDevelopment.pdf",
        "public/benefitsRewards/AttendanceWorkSchedule.pdf",
        "public/benefitsRewards/CompensationBenefit.pdf",
        "public/benefitsRewards/TerminationfromtheCompany.pdf",
        "public/benefitsRewards/ConsequenceManagement.pdf",
      ];
      const urls = [];
      for (const path of pdfLinks) {
        const result = await getUrl({ path });
        urls.push(result.url.toString());
      }
      setPdfLinks(urls);
    };
    linkStorage();
  }, []);

  const handleTileClick = (pdfLink) => {
    if (!pdfLink) {
      console.error("PDF link is not available.");
      return;
    }
    // console.log(pdfLink, "dfgh");

    setSelectedPdf(pdfLink);
    setIsPdfOpen(!isPdfOpen);
   
  };

  const tileData = [
    { img: icon1, text: "Employment Policy" },
    { img: icon2, text: "Training & Development" },
    { img: icon3, text: "Attendance & Work Schedule" },
    { img: icon4, text: "Compensation & Benefits" },
    { img: icon5, text: "Termination from the Company" },
    { img: icon6, text: "Consequence Management" },
  ];

  return (
    <section className="min-h-screen bg-[#F5F6F1] p-16">
      <div className="flex justify-start flex-wrap gap-x-20 text-black">
        {tileData.map((tile, index) => (
          <SelectTiles
            key={index}
            img={tile.img}
            text1={tile.text}
            fontSize="text_size_5"
            borderColor="border-[#0AA818]"
            bgColor="bg-white"
            onClick={() => handleTileClick(pdfLinks[index])}
          />
        ))}
        {/* handleTileClick(pdfLinks[index] */}
      </div>

      {isPdfOpen && (
        <section className="fixed top-0 left-0 w-full min-h-screen z-50 bg-grey flex justify-center">
          <div className="w-[80%] max-h-[90vh] py-3">
            <p className="text-xl text-dark_grey flex justify-end my-5 px-3" onClick={()=>{setIsPdfOpen(!isPdfOpen)}}>
              <span className="bg-medium_white px-3 py-1 rounded-lg font-medium cursor-pointer">
                Close
              </span>
            </p>
            <div className="invoice-content flex justify-center  w-full h-[calc(100vh-8rem)] overflow-y-auto">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={selectedPdf || ""} />
              </Worker>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

