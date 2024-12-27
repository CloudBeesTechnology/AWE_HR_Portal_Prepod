import { useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";

export const ViewOnshoreTSheet = ({ excelData }) => {
  const [data, setData] = useState(excelData);
  const [currentStatus, setCurrentStatus] = useState(false);
  const searchResult = (result) => {
    setData(result);
  };

  useEffect(() => {
    if (excelData) {
      const result = excelData.find((m) => { 
        const hasAllKeys = [
          "NAME",
          "BADGE#",
          "DEPT",
          "DATE",
          "IN", 
          "OUT",
        ].every((key) => key in m);

        return hasAllKeys; // Return true if all keys are present
      });
      console.log(result);
      if (!result) {
        console.log(false);

        setCurrentStatus(false);
      } else {
        console.log(true);
        setCurrentStatus(true);
      }
    }
  }, [excelData]);
  console.log(currentStatus);
  return (
    <div>
      <div>
        {currentStatus ? (
          <div>
            <div className="flex justify-end mr-7">
              <SearchBoxForTimeSheet
                excelData={excelData}
                searchResult={searchResult}
              />
            </div>
            <div className="mt-9 overflow-x-auto overflow-y-scroll max-h-[500px]">
              <table className="table-auto text-center w-full">
                <thead>
                  <tr className="bg-lite_grey h-10 text-dark_grey text_size_5">
                    <td className="px-4 flex-1">S No.</td>
                    <td className="px-4 flex-1 text-start">Employee Name</td>
                    <td className="px-4 flex-1">Badge</td>
                    <td className="px-4 flex-1 text-start">Department</td>
                    <td className="px-4 flex-1">Date</td>
                    <td className="px-4 flex-1">IN Time</td>
                    <td className="px-4 flex-1">OUT Time</td>
                  </tr>
                </thead>
                <tbody>
                  {excelData &&
                    excelData.map((m, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md border-b-2 border-[#CECECE]"
                        >
                          <td className="text-center px-4 flex-1">
                            {index + 1}
                          </td>
                          <td className="text-start px-4 flex-1">{m.NAME}</td>
                          <td className="text-center px-4 flex-1">
                            {m["BADGE#"]}
                          </td>
                          <td className="text-center px-4 flex-1 ">{m.DEPT}</td>
                          <td className="text-center px-4 flex-1">{m.DATE}</td>
                          <td className="text-center px-4 flex-1">{m.IN}</td>
                          <td className="text-center px-4 flex-1">{m.OUT}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className=" flex flex-col items-center gap-5 p-5 px-16  rounded shadow-lg">
              <p className="text-dark_grey text_size_5">Message :</p>
              <p className={`text-dark_grey text_size_5 `}>
                Your excel sheet is not expected format
              </p>
              <p className={`text-[#00DF0F] text_size_5`}>ERROR</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
