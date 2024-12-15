import { useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../../../utils/SearchBoxForTimeSheet";

export const ViewTSTBeforeSave = ({ excelData }) => {
  const [data, setData] = useState(excelData);
  const [currentStatus, setCurrentStatus] = useState(false);
  const searchResult = (result) => {
    setData(result);
  };

  useEffect(() => {
    if (excelData && excelData) {
      const result = excelData.find((m) => {
        const hasAllKeys = [
          "CONTRACT No:",
          "__EMPTY_2",
          "location",
          "date",
          "__EMPTY_40",
          "__EMPTY_41",
        ].every((key) => key in m);

        return hasAllKeys;
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
    <div className="border border-white">
      {currentStatus ? (
        <div>
          <div className="flex justify-end mr-7">
            <SearchBoxForTimeSheet
              excelData={excelData}
              searchResult={searchResult}
            />
          </div>
          <div className="mt-9 overflow-x-auto overflow-y-scroll max-h-[500px]">
            {/* w-[1190px] */}
            <table className="table-auto text-center w-full">
              <thead>
                {/* <tr className="bg-lite_grey h-10 text-dark_grey text_size_5 text-start">
                  <td className="px-5  text-center ">S No.</td>
                  <td className="px-7 ">Employee Name</td>
                  <td className="pr-14  text-center ">Sub ID</td>
                  <td className="px-7  ">Location</td>
                  <td className="px-7  text-center ">Date</td>
                  <td className="px-7 text-center ">Total NT</td>
                  <td className="pr-7 text-center ">Total OT</td>
                  
                </tr> */}
                <tr className="bg-lite_grey h-10 text-dark_grey text_size_5">
                  <td className="px-4 flex-1">S No.</td>
                  <td className="px-4 flex-1 text-start">Employee Name</td>
                  <td className="px-4 flex-1">Sub ID</td>
                  <td className="px-4 flex-1 text-start">Location</td>
                  <td className="px-4 flex-1">Date</td>
                  <td className="px-4 flex-1">Total NT</td>
                  <td className="px-4 flex-1">Total OT</td>
                </tr>
              </thead>
              <tbody>
                {excelData &&
                  excelData.map((m, index) => {
                    return (
                      // <tr
                      //   key={index}
                      //   className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start"
                      // >
                      //   <td className="px-5 text-center ">{index + 1}</td>
                      //   <td className="px-7">{m["CONTRACT No:"]}</td>
                      //   <td className="text-center pr-14 ">{m.__EMPTY_2}</td>
                      //   <td className="px-7">{m.location}</td>
                      //   <td className="text-center px-5 ">{m.date}</td>
                      //   <td className="text-center px-7 ">{m.__EMPTY_40}</td>
                      //   <td className="text-center pr-7 ">{m.__EMPTY_41}</td>
                      // </tr>
                      <tr
                        key={index}
                        className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start"
                      >
                        <td className="text-center px-4 flex-1">{index + 1}</td>
                        <td className="text-start px-4 flex-1">
                          {m["CONTRACT No:"]}
                        </td>
                        <td className="text-center px-4 flex-1">
                          {m.__EMPTY_2}
                        </td>
                        <td className="text-start px-4 flex-1">{m.location}</td>
                        <td className="text-center px-4 flex-1">{m.date}</td>
                        <td className="text-center px-4 flex-1">
                          {m.__EMPTY_40}
                        </td>
                        <td className="text-center px-4 flex-1">
                          {m.__EMPTY_41}
                        </td>
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
  );
};
