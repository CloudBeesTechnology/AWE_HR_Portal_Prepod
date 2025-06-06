import React from "react";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useTempID } from "../../utils/TempIDContext";

export const ConfirmationForm = ({
  register,
  formData,
  handleInputChange,
  userType,
  gmPosition,
  workInfoData,
  employeeData,
  HRMPosition
}) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [hasSupervisor, setHasSupervisor] = React.useState(true);
  const { setSupervisorCheck } = useTempID();

  useEffect(() => {
    if (formData && formData.probData) {
      const recommendation = formData.probData.recommendation || "";
      setSelectedValue(recommendation);
    }
  }, [formData]);

  useEffect(() => {
    if (!workInfoData.length || !employeeData?.empID) {
      return;
    }

    const workInfo = workInfoData.find(
      (data) => data.empID === employeeData.empID
    );

    if (workInfo) {
      const supervisorExists = (() => {
        if (!workInfo.supervisor) return false;
        if (workInfo.supervisor === "null") return false;

        if (Array.isArray(workInfo.supervisor)) {
          if (workInfo.supervisor.length === 0) return false;

          if (workInfo.supervisor[workInfo.supervisor.length - 1] === "N/A") {
            return false;
          }
          return !!workInfo.supervisor[0] && workInfo.supervisor[0] !== "null";
        }
        return (
          typeof workInfo.supervisor === "string" &&
          workInfo.supervisor.trim() !== "" &&
          workInfo.supervisor !== "null" &&
          workInfo.supervisor !== "N/A"
        );
      })();

      setHasSupervisor(supervisorExists);
      setSupervisorCheck(supervisorExists);
    }
  }, [workInfoData, employeeData?.empID]);

  // console.log(hasSupervisor);

  const handleChange = (event) => {
    event.persist();

    console.log(event.target.value);

    if (!event.target) {
      console.error("Event target is undefined");
      return;
    }

    setSelectedValue(event.target.value);
    handleInputChange(event.target.name, event.target.value);
  };

  return (
    <div className="w-full mx-auto mt-5">
      {/* Additional Information Section */}
      <div className="mb-8">
        <p className="mb-4">
          Please indicate any additional information or unusual circumstances
          considered relevant to the staff performance or assessment. Please
          specify accordingly.
        </p>
        <textarea
          {...register("additionalInfo")}
          name="additionalInfo"
          value={formData?.probData?.additionalInfo || ""}
          onChange={handleInputChange}
          className="w-full h-32 border p-2 rounded resize-none outline-none"
          placeholder="Enter additional information here"
        />
      </div>

      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="font-bold bg-black text-white p-2">RECOMMENDATION</h2>
        <div className="space-y-4 mt-4">
          {/* Confirmed Option */}
          <label className="flex items-center relative">
            <input
              type="radio"
              {...register("recommendation")}
              name="recommendation"
              value="confirmed"
              checked={selectedValue === "confirmed"}
              onChange={handleInputChange}
              className="mr-2 w-6 h-6 border-2 bg-white appearance-none rounded-none"
            />
            <span className="radio-label flex items-center">
              {selectedValue === "confirmed" && (
                <TiTick className="text-[#4ad84a] text-[28px] absolute bottom-0 -left-0.5" />
              )}
              The appointment to be confirmed
            </span>
          </label>

          {/* Extended Option */}
          <label className="flex items-center relative">
            <input
              type="radio"
              {...register("recommendation")}
              name="recommendation"
              value="extended"
              checked={selectedValue === "extended"}
              onChange={handleInputChange}
              className="mr-2 w-6 h-6 border-2 bg-white appearance-none rounded-none"
            />
            <span className="radio-label flex items-center">
              {selectedValue === "extended" && (
                <TiTick className="text-[#4ad84a] text-[28px] absolute bottom-0 -left-0.5" />
              )}
              The appointment to be extended for a further probationary period
              of
              <input
                type="text"
                name="extendProbED"
                {...register("extendProbED")}
                value={formData?.probData?.extendProbED || ""}
                onChange={handleInputChange}
                className="w-12 border-b outline-none text-center ml-2"
                placeholder="0"
              />{" "}
              months
            </span>
          </label>

          {/* Terminated Option */}
          <label className="flex items-center relative">
            <input
              type="radio"
              {...register("recommendation")}
              name="recommendation"
              value="terminated"
              checked={selectedValue === "terminated"}
              onChange={handleInputChange}
              className="mr-2 w-6 h-6 border-2 bg-white appearance-none rounded-none"
            />
            <span className="radio-label flex items-center">
              {selectedValue === "terminated" && (
                <TiTick className="text-[#4ad84a] text-[28px] absolute bottom-0 -left-0.5" />
              )}
              The appointment to be terminated
            </span>
          </label>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-8">
        <p>
          Comments that you would like to include into the probation/employment
          confirmation letter:
        </p>
        <p className="italic">
          (It is <strong>compulsory</strong> for you to fill in your comment for
          the <strong>staff level</strong> considering his/her attitude,
          approach, and ability in performing the duties or responsibilities
          assigned.)
        </p>
        <textarea
          {...register("extensionPeriod")}
          name="extensionPeriod"
          value={formData?.probData?.extensionPeriod || ""}
          onChange={handleInputChange}
          className="w-full h-32 border p-2 rounded resize-none outline-none"
          // placeholder="Enter additional information here"
        />
      </div>

      {/* Signature Section */}
      <div className="mt-20 space-y-16">
        {/* Supervisor Section */}
        {hasSupervisor && (
          <div className="flex justify-between items-center space-x-8">
            <div className="flex justify-center items-center w-[380px]">
              <label className="text-sm font-medium">
                Name of Supervisor :
              </label>
              <input
                type="text"
                name="supervisorName"
                {...register("supervisorName")}
                value={formData.probData.supervisorName || ""}
                onChange={handleInputChange}
                disabled={userType !== "Supervisor"}
                className="border-b outline-none px-1 w-full"
              />
            </div>

            <div className="flex items-center space-x-10 border-b">
              <div className="flex items-center space-x-2 ">
                <input
                  type="radio"
                  name="supervisorApproved"
                  value="Approved"
                  {...register("supervisorApproved")}
                  checked={formData.probData.supervisorApproved === "Approved"}
                  onChange={handleInputChange}
                  id="saApproved"
                  disabled={userType !== "Supervisor"}
                  className="h-4 w-4 form-checkbox"
                />
                <label htmlFor="saApproved" className="text-sm py-2">
                  Approved
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="supervisorApproved"
                  value="Rejected"
                  {...register("supervisorApproved")}
                  checked={formData.probData.supervisorApproved === "Rejected"}
                  onChange={handleInputChange}
                  id="saReject"
                  disabled={userType !== "Supervisor"}
                  className="h-4 w-4 form-checkbox"
                />
                <label htmlFor="saReject" className="text-sm py-2">
                  Rejected
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-b">
              <input
                type="date"
                name="supervisorDate"
                {...register("supervisorDate")}
                value={formData.probData.supervisorDate || ""}
                onChange={handleInputChange}
                disabled={userType !== "Supervisor"}
                className="outline-none"
              />
            </div>
          </div>
        )}

        {/* Manager Section */}
        <div className="flex justify-between items-center space-x-8">
          <div className="flex justify-center items-center w-[380px]">
            <label className="text-sm font-medium">Name of Manager :</label>
            <input
              type="text"
              name="managerName"
              {...register("managerName")}
              value={formData.probData.managerName || ""}
              onChange={handleInputChange}
              disabled={
                (userType !== "Manager" && gmPosition === "GENERAL MANAGER") ||
                HRMPosition === "HR MANAGER"
              }
              className="border-b outline-none px-1 w-full"
            />
          </div>
          <div className="flex items-center space-x-10 border-b">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="Approved"
                name="managerApproved"
                {...register("managerApproved")}
                checked={formData.probData.managerApproved === "Approved"}
                onChange={handleInputChange}
                id="managerApproved"
                disabled={
                  (userType !== "Manager" &&
                    gmPosition === "GENERAL MANAGER") ||
                  HRMPosition === "HR MANAGER"
                }
                className="h-4 w-4 form-checkbox"
              />
              <label htmlFor="managerApproved" className="text-sm py-2">
                Approved
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="Rejected"
                name="managerApproved"
                {...register("managerApproved")}
                checked={formData.probData.managerApproved === "Rejected"}
                onChange={handleInputChange}
                id="managerReject"
                disabled={
                  (userType !== "Manager" &&
                    gmPosition === "GENERAL MANAGER") ||
                  HRMPosition === "HR MANAGER"
                }
                className="h-4 w-4 form-checkbox"
              />
              <label htmlFor="managerReject" className="text-sm py-2">
                Rejected
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-2 border-b">
            <input
              type="date"
              name="managerDate"
              {...register("managerDate")}
              value={formData.probData.managerDate || ""}
              onChange={handleInputChange}
              disabled={
                (userType !== "Manager" && gmPosition === "GENERAL MANAGER") ||
                HRMPosition === "HR MANAGER"
              }
              className="outline-none"
            />
          </div>
        </div>

        {/* GM Section */}
        <div className="flex justify-between items-center">
          <div className="w-[380px]">
            <label className="text-sm font-medium">Concurred By GM :</label>

            <input
              type="text"
              name="gmName"
              {...register("gmName")}
              value={formData.probData.gmName || ""}
              onChange={handleInputChange}
              disabled={gmPosition !== "GENERAL MANAGER"}
              className="border-b outline-none px-1 w-[250px]"
            />
            <p className="text-[12px]">(For Staff Category Only)</p>
          </div>
          <div className="flex items-center space-x-10 border-b">
            <div className="flex items-center space-x-2 ">
              <input
                type="radio"
                value="Approved"
                name="gmApproved"
                {...register("gmApproved")}
                checked={formData.probData.gmApproved === "Approved"}
                onChange={handleInputChange}
                id="gmApproved"
                disabled={gmPosition !== "GENERAL MANAGER"}
                className="h-4 w-4 form-checkbox"
              />
              <label htmlFor="gmApproved" className="text-sm py-2">
                Approved
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="Rejected"
                name="gmApproved"
                {...register("gmApproved")}
                checked={formData.probData.gmApproved === "Rejected"}
                onChange={handleInputChange}
                id="gmReject"
                disabled={gmPosition !== "GENERAL MANAGER"}
                className="h-4 w-4 form-checkbox"
              />
              <label htmlFor="gmReject" className="text-sm py-2">
                Rejected
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-2 border-b ">
            <input
              type="date"
              name="gmDate"
              {...register("gmDate")}
              value={formData.probData.gmDate || ""}
              onChange={handleInputChange}
              disabled={gmPosition !== "GENERAL MANAGER"}
              className="outline-none"
            />
          </div>
        </div>
      </div>

      {/* HR Section */}
      <div className="border pt-4 mt-5">
        <h3 className="font-bold underline p-2">Human Resources Department</h3>
        <div>
          <p className="font-semibold border-b p-2">Received & Action By :</p>
        </div>
        <div className="flex justify-evenly items-center border-b py-5">
          <div className="flex justify-center items-center">
            <label className="text-sm font-medium">Name :</label>
            <input
              type="text"
              name="hrName"
              {...register("hrName")}
              value={formData.probData.hrName || ""}
              onChange={handleInputChange}
              disabled={HRMPosition !== "HR MANAGER"}
              className="border-b outline-none px-1"
            />
          </div>
          <div className="flex items-center space-x-2 border-b">
            <input
              type="date"
              name="hrDate"
              {...register("hrDate")}
              value={formData.probData.hrDate || ""}
              onChange={handleInputChange}
              disabled={HRMPosition !== "HR MANAGER"}
              className="outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
