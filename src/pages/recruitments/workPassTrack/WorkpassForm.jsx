import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { SawpForm } from "./form/SawpForm";
import { DoeForm } from "./form/DoeForm";
import { NlmsForm } from "./form/NlmsForm";
import { BankForm } from "./form/BankForm";
import { JitpaForm } from "./form/JitpaForm";
import { LabourDepForm } from "./form/LabourDepForm";
import { ImmigrationForm } from "./form/ImmigrationForm";
import { AirTktForm } from "./form/AirTktForm";
import { NonLocalMobilizForm } from "./form/NonLocalMobilizForm";

export const WorkpassForm = ({ candidate, onClose, onSave }) => {
  const [show, setShow] = useState(0);

  const handleTabClick = (index) => {
    setShow(index);
  };

  return (
    <div className="fixed inset-0 bg-grey bg-opacity-80 z-50 center">
      <div className="bg-white p-10 rounded-lg w-full max-w-[700px] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 border rounded-full p-1"
        >
          <VscClose size={20} />
        </button>
        {/* <h2 className="mb-4 p-2 text-[14px] font-semibold shadow-md rounded-md bg-[#FBFCFF]">
          TEMP ID: {candidate?.tempID} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Name: {candidate?.name}
        </h2> */}
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
        </div>

        {/* Tab Container with Horizontal Scrolling */}
        <article className="flex gap-5 text-black mt-5 overflow-x-auto WPTable">
          {[
            "SAWP",
            "DOE",
            "NLMS",
            "Bank Guarantee",
            "JITPA",
            "Labour Deposit",
            "Immigration",
            "Air Ticket",
            "Non Local Mobilization",
          ].map((label, index) => (
            <h1
              key={index}
              className={`px-3 py-1 whitespace-nowrap ${
                show === index
                  ? "border-2 border-[#EEEBEB] bg-[#F9F9F9]"
                  : "bg-[#F9F9F9]"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {label}
            </h1>
          ))}
        </article>

        {/* Render the corresponding form based on `show` state */}
        {show === 0 && <SawpForm candidate={candidate} />}
        {show === 1 && <DoeForm candidate={candidate} />}
        {show === 2 && <NlmsForm candidate={candidate} />}
        {show === 3 && <BankForm candidate={candidate} />}
        {show === 4 && <JitpaForm candidate={candidate} />}
        {show === 5 && <LabourDepForm candidate={candidate} />}
        {show === 6 && <ImmigrationForm candidate={candidate} />}
        {show === 7 && <AirTktForm candidate={candidate} />}
        {show === 8 && <NonLocalMobilizForm candidate={candidate} />}
      </div>
    </div>
  );
};
