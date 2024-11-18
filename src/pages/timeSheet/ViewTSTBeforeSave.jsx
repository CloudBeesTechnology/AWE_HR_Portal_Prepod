import { useEffect, useState } from "react";
import { SearchBoxForTimeSheet } from "../../utils/SearchBoxForTimeSheet";

export const ViewTSTBeforeSave = ({ excelData, returnedTHeader }) => {
  console.log(returnedTHeader);
  const [data, setData] = useState(excelData);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchResult = (result) => {
    setData(result);
  };
  console.log(excelData);
  const cleanValue = (value) => {
    if (typeof value !== "string") {
      return value; // Return value if not a string (e.g., number, object)
    }
    return value.replace(/[^a-zA-Z0-9]/g, "");
    // Removes all non-alphanumeric characters
  };
  useEffect(() => {
    const checkKeys = async () => {
      const cleanData =
        returnedTHeader &&
        returnedTHeader.map((item) => {
          const cleanedItem = {};
          for (const key in item) {
            cleanedItem[key] = cleanValue(item[key]); // Clean the value, not the key
          }
          return cleanedItem;
        });
      console.log(cleanData);
      const requiredKeys = ["NAME", "No", "Company", "TOTALHOURS"];

      const result = await new Promise((resolve) => {
        // Check if all required keys are in the object
        const keyCheckResult =
          cleanData &&
          cleanData.every((m) => {
            return requiredKeys.every(
              (key) =>
                Object.values(m)
                  .map((value) =>
                    typeof value === "string" ? value.toUpperCase() : value
                  ) // Convert string values to uppercase
                  .includes(key.toUpperCase()) // Compare with key in uppercase
            );
          });
        resolve(keyCheckResult);
      });

      console.log("Result: ", result);
      setCurrentStatus(result); // Assuming setCurrentStatus is defined
      setLoading(false);
    };

    if (returnedTHeader && returnedTHeader.length > 0) {
      checkKeys();
    } else {
      setCurrentStatus(false);
      setLoading(false);
    }
  }, [returnedTHeader]);

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
                <tr className="bg-lite_grey h-10 text-dark_grey text_size_5">
                  <td className="px-4 flex-1">S No.</td>
                  <td className="px-4 flex-1 text-start">EMPLOYEE NAME</td>
                  <td className="px-4 flex-1">SUB ID</td>
                  <td className="px-4 flex-1 text-start">LOCATION</td>
                  <td className="px-4 flex-1">DATE</td>
                  <td className="px-4 flex-1">TOTAL NT</td>
                  <td className="px-4 flex-1">TOTAL OT</td>
                  <td className="px-4 flex-1">TOTAL NT/OT</td>
                </tr>
              </thead>
              <tbody>
                {excelData &&
                  excelData.map((m, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start"
                      >
                        <td className="text-center px-4 flex-1">{index + 1}</td>
                        <td className="text-start px-4 flex-1">{m.NAME}</td>
                        <td className="text-center px-4 flex-1">{m.NO}</td>
                        <td className="text-start px-4 flex-1">{m.LOCATION}</td>
                        <td className="text-center px-4 flex-1">{m.DATE}</td>
                        <td className="text-center px-4 flex-1">
                          {m.TOTALHOURS || 0}
                        </td>
                        <td className="text-center px-4 flex-1">
                          {m.TOTALHOURS2 || 0}
                        </td>
                        <td className="text-center px-4 flex-1">
                          {m.TOTALHOURS3 || 0}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center my-5">
            <button
              className="rounded px-3 py-2 bg-[#FEF116] text_size_5 text-dark_grey"
              onClick={() => {
                //   renameKeysFunctionAndSubmit();
              }}
            >
              Send for Approval
            </button>
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
