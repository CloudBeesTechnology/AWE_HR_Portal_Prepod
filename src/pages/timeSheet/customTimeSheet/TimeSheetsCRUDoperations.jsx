import { generateClient } from "@aws-amplify/api";
import { createTimeSheet, updateTimeSheet } from "../../../graphql/mutations";
import { MergeTableForNotification } from "./MergeTableForNotification";
import { Notification } from "./Notification";
import { sendEmail } from "../../../services/EmailServices";

const client = generateClient();
export const TimeSheetsCRUDoperations = async ({
  finalResult,
  toggleSFAMessage,
  setStoringMess,
  setData,
  Position,
  action,
  setShowTitle,
  setNotification,
  setAllApprovedData,
  setAllRejectedData,
}) => {
  if (action === "create") {
    const chunkArray = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };

    const sendTimeSheets = async (data) => {
      let successCount = 0;
      let successFlag = false;
      const chunks = chunkArray(data, 1000);

      for (const chunk of chunks) {
        try {
          await Promise.all(
            chunk.map(async (item) => {
              const response = await client.graphql({
                query: createTimeSheet,
                variables: {
                  input: item,
                },
              });

              if (response?.data?.createTimeSheet) {
                // console.log(
                //   "TimeSheet created successfully:",
                //   response.data.createTimeSheet
                // );
                successCount++;

                if (!successFlag) {
                  successFlag = true; // Set the flag immediately to prevent multiple executions

                  const responseData = response.data.createTimeSheet;

                  const result = await MergeTableForNotification(responseData);

                  if (result) {
                    const emailDetails = await Notification({
                      getEmail: result,
                      Position,
                    });
                    // console.log(result);
                    if (emailDetails) {
                      const { subject, message, fromAddress, toAddress } =
                        emailDetails;
                      await sendEmail(subject, message, fromAddress, toAddress);
                      toggleSFAMessage(true, responseData); // Show success message once
                      setStoringMess(true);
                    } else {
                      // console.error("Notification returned undefined!");
                    }
                  } else {
                    console.error(
                      "MergeTableForNotification returned undefined!"
                    );
                  }

                  setData(null);
                }

                if (successCount === data.length) {
                  setStoringMess(false);

                  setData(null);
                }
              }
            })
          );
        } catch (error) {
          // console.error("Error creating TimeSheet:", error);
          toggleSFAMessage(false); // Show error message if batch fails
        }
      }
      // console.log(`Total successful responses: ${successCount}`);
      // console.log("All data saved");
    };

    sendTimeSheets(finalResult);
  } else if (action === "update") {
    const chunkArray = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };

    const updateTimeSheetFunction = async (timeSheetData) => {
      let successFlag = false;
      let successCount = 0; // To track successful updates

      const chunks = chunkArray(timeSheetData, 1000); // Adjust the chunk size as needed

      for (const chunk of chunks) {
        try {
          await Promise.all(
            chunk.map(async (timeSheet) => {
              try {
                const response = await client.graphql({
                  query: updateTimeSheet,
                  variables: {
                    input: timeSheet,
                  },
                });

                if (response?.data?.updateTimeSheet) {
                  // console.log(
                  //   "TimeSheet Updated successfully:",
                  //   response.data.updateTimeSheet
                  // );
                  successCount++; // Increment successful count

                  if (!successFlag) {
                    const responseData = response.data.updateTimeSheet;
                    // console.log(responseData);

                    successFlag = true; // Set the flag to avoid multiple notifications
                    // setStoringMess(true);

                    toggleSFAMessage(true, responseData); // Show success message once

                    const result = await MergeTableForNotification(
                      responseData
                    );

                    if (result) {
                      const emailDetails = await Notification({
                        getEmail: result,
                        Position,
                      });

                      if (emailDetails) {
                        const { subject, message, fromAddress, toAddress } =
                          emailDetails;
                        await sendEmail(
                          subject,
                          message,
                          fromAddress,
                          toAddress
                        );

                        setShowTitle?.("Data has been submitted successfully");
                        setNotification?.(true);
                        setAllApprovedData?.([]);
                        setAllRejectedData?.([]);
                      } else {
                        // console.error("Notification returned undefined!");
                      }
                    } else {
                      // console.error(
                      //   "MergeTableForNotification returned undefined!"
                      // );
                    }
                  }
                }
              } catch (error) {
                // console.error(
                //   `Error updating TimeSheet with ID ${timeSheet.id}:`,
                //   error
                // );
              }
            })
          );

          // console.log("Batch update completed.");
        } catch (batchError) {
          // console.error("Error in batch update:", batchError);
        }
      }

      // console.log(`Total successful updates: ${successCount}`);
    };

    updateTimeSheetFunction(finalResult);
  } else if (action === "ResubmitRejectedItems") {
    const chunkArray = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };

    const UpdateRejectedTimeSheets = async (data) => {
      let successCount = 0;
      let successFlag = false;
      const chunks = chunkArray(data, 1000);

      for (const chunk of chunks) {
        try {
          await Promise.all(
            chunk.map(async (item) => {
              const response = await client.graphql({
                query: updateTimeSheet,
                variables: {
                  input: item,
                },
              });

              if (response?.data?.updateTimeSheet) {
                // console.log(
                //   "TimeSheet created successfully:",
                //   response.data.updateTimeSheet
                // );
                successCount++;

                if (!successFlag) {
                  successFlag = true; // Set the flag immediately to prevent multiple executions

                  const responseData = response.data.updateTimeSheet;

                  const result = await MergeTableForNotification(responseData);
                  if (result) {
                    let correctionMade = true;
                    const emailDetails = await Notification({
                      getEmail: result,
                      Position,
                      correctionMade,
                    });

                    if (emailDetails) {
                      const { subject, message, fromAddress, toAddress } =
                        emailDetails;
                      await sendEmail(subject, message, fromAddress, toAddress);

                      toggleSFAMessage(true, responseData); // Show success message once
                      setStoringMess(true);
                    } else {
                      // console.error("Notification returned undefined!");
                    }
                  } else {
                    // console.error(
                    //   "MergeTableForNotification returned undefined!"
                    // );
                  }

                  setData(null);
                }

                if (successCount === data.length) {
                  setStoringMess(false);

                  setData(null);
                }
              }
            })
          );
        } catch (error) {
          // console.error("Error creating TimeSheet:", error);
          toggleSFAMessage(false); // Show error message if batch fails
        }
      }
      // console.log(`Total successful responses: ${successCount}`);
      // console.log("All data saved");
    };

    UpdateRejectedTimeSheets(finalResult);
  }
};
