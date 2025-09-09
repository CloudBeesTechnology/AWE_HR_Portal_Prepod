import React, { useState, useEffect, useRef } from "react";
import { VscClose } from "react-icons/vsc";
import { InterviewForm } from "../ScheduledForm/InterViewForm";
import { CandidateForm } from "../ScheduledForm/CandidateForm";
import { LOIForm } from "../ScheduledForm/LOIForm";
import { CVEVForm } from "../ScheduledForm/CVEVForm";
import { PAAFForm } from "../ScheduledForm/PAAFForm";
import { MobilizationForm } from "../ScheduledForm/MobilizationForm";
import { useDeleteAccess } from "../../../hooks/useDeleteAccess";
// getLocalMobilization

export const StatusForm = ({ candidate, onClose, onSave }) => {
  const { formattedPermissions } = useDeleteAccess();
  // const [activeTab, setActiveTab] = useState('Interview');
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
         <div className="p-2 border border-BColor bg-[#FBFCFF]">
          <div className="flex justify-between gap-4 text-[13px] font-semibold">
            <div className="text-center ">
              <div className="underline">TEMP ID</div>
              <div className="mt-1 font-normal">
                {candidate?.tempID || "N/A"}
              </div>
            </div>

            <div className="">
              <div className="underline">Name</div>
              <div className="mt-1 font-normal">{candidate?.name || "N/A"}</div>
            </div>

            <div className="">
              <div className="underline">Contract Type</div>
              <div className="mt-1 font-normal">
                {candidate?.contractType || "N/A"}
              </div>
            </div>

            <div className="">
              <div className="underline">Employee Type</div>
              <div className="mt-1 font-normal">
                {candidate?.empType || "N/A"}
              </div>
            </div>
          </div>
          {/* <div className="flex gap-4 text-[13px] font-semibold">
            <div>
              <span className="font-semibold">TEMP ID:</span>{" "}
              {candidate?.tempID}
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
          </div> */}
        </div>

        <article className="flex-1 flex gap-5 text-black WPTable my-5">
          <h1
            className={`  px-3 py-1 rounded whitespace-nowrap  ${
              show === 0
                ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                : "bg-[#F9F9F9]"
            }`}
            onClick={() => setShow(0)}
          >
            Interview
          </h1>
          <h2
            className={`  px-3 py-1 rounded whitespace-nowrap  ${
              show === 1
                ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                : "bg-[#F9F9F9]"
            }`}
            onClick={() => setShow(1)}
          >
            Candidate
          </h2>
          <h3
            className={`  px-3 py-1 rounded whitespace-nowrap  ${
              show === 2
                ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                : "bg-[#F9F9F9]"
            }`}
            onClick={() => setShow(2)}
          >
            LOI
          </h3>

          {candidate?.empType === "Offshore" && (
            <h4
              className={` px-3 py-1 rounded whitespace-nowrap  ${
                show === 3
                  ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                  : "bg-[#F9F9F9]"
              }`}
              onClick={() => setShow(3)}
            >
              CVEV
            </h4>
          )}

          {candidate?.empType === "Onshore" && (
            <h5
              className={`  px-3 py-1 rounded whitespace-nowrap  ${
                show === 4
                  ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                  : "bg-[#F9F9F9]"
              }`}
              onClick={() => setShow(4)}
            >
              PAAF
            </h5>
          )}

          {candidate?.contractType === "Local" && (
            <h6
              className={`px-3 py-1 rounded whitespace-nowrap  ${
                show === 5
                  ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                  : "bg-[#F9F9F9]"
              }`}
              onClick={() => setShow(5)}
            >
              Mobilization
            </h6>
          )}
        </article>
        {show === 0 && <InterviewForm candidate={candidate} />}
        {show === 1 && <CandidateForm candidate={candidate} />}
        {show === 2 && (
          <LOIForm
            candidate={candidate}
            formattedPermissions={formattedPermissions}
          />
        )}
        {show === 3 && (
          <CVEVForm
            candidate={candidate}
            formattedPermissions={formattedPermissions}
          />
        )}
        {show === 4 && (
          <PAAFForm
            candidate={candidate}
            formattedPermissions={formattedPermissions}
          />
        )}
        {candidate?.contractType === "Local" && show === 5 && (
          <MobilizationForm
            candidate={candidate}
            formattedPermissions={formattedPermissions}
          />
        )}
      </div>
    </div>
  );
};
