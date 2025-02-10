import React, { useState, useEffect, useRef } from "react";
import { VscClose } from "react-icons/vsc";
import { InterviewForm } from "../ScheduledForm/InterViewForm";
import { CandidateForm } from "../ScheduledForm/CandidateForm";
import { LOIForm } from "../ScheduledForm/LOIForm";
import { CVEVForm } from "../ScheduledForm/CVEVForm";
import { PAAFForm } from "../ScheduledForm/PAAFForm";
import { MobilizationForm } from "../ScheduledForm/MobilizationForm";
// getLocalMobilization

export const StatusForm = ({ candidate, onClose, onSave }) => {
  // const [activeTab, setActiveTab] = useState('Interview'); // Default active tab is 'Interview'
  const [show, setShow] = useState(0);
  return (
    <div className="fixed inset-0 bg-grey bg-opacity-80 z-50 center">
      <div className="bg-white p-10 rounded-lg w-full max-w-[700px] overflow-hidden relative">
        <button
          onClick={onClose}
          className=" absolute top-2 right-2 border rounded-full p-1"
        >
          <VscClose size={20} />
        </button>
        <div className="p-4 rounded-md bg-[#f7f183ea]">
          <div className="grid grid-cols-1 sm:grid-cols-4 text-xs font-semibold">
            <div>
              <span className="font-semibold">TempID:</span> {candidate?.tempID}
            </div>
            <div>
              <span className="font-semibold">Name:</span> {candidate?.name}
            </div>
            <div>
              <span className="font-semibold">Contract Type:</span>{" "}
              {candidate?.contractType}
            </div>
            <div>
              <span className="font-semibold">Employee Type:</span>{" "}
              {candidate?.empType}
            </div>
          </div>
        </div>

        <article className="flex-1 flex gap-5 text-black mt-5">
          <h1
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 0
                ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(0)}
          >
            Interview
          </h1>
          <h2
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 1
                ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(1)}
          >
            Candidate
          </h2>
          <h3
            className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
              show === 2
                ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                : "bg-[#DDDDDD]"
            }`}
            onClick={() => setShow(2)}
          >
            LOI
          </h3>

          {candidate?.empType === "Offshore" && (
            <h4
              className={` px-3 py-1 rounded-lg whitespace-nowrap  ${
                show === 3
                  ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                  : "bg-[#DDDDDD]"
              }`}
              onClick={() => setShow(3)}
            >
              CVEV
            </h4>
          )}

          {candidate?.empType === "Onshore" && (
            <h5
              className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
                show === 4
                  ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                  : "bg-[#DDDDDD]"
              }`}
              onClick={() => setShow(4)}
            >
              PAAF
            </h5>
          )}

          {candidate?.contractType === "Local" && (
            <h6
              className={`  px-3 py-1 rounded-lg whitespace-nowrap  ${
                show === 5
                  ? "border-2 border-[#FEF116] bg-[#FFFEF4]"
                  : "bg-[#DDDDDD]"
              }`}
              onClick={() => setShow(5)}
            >
              Mobilization
            </h6>
          )}
        </article>
        {show === 0 && <InterviewForm candidate={candidate} />}
        {show === 1 && <CandidateForm candidate={candidate} />}
        {show === 2 && <LOIForm candidate={candidate} />}
        {show === 3 && <CVEVForm candidate={candidate} />}
        {show === 4 && <PAAFForm candidate={candidate} />}
        {candidate?.contractType === "Local" && show === 5 && (
          <MobilizationForm candidate={candidate} />
        )}
      </div>
    </div>
  );
};
