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
  handleAssignManager,
  selectedRows,
  handleManagerReload,
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
      setStoringMess(true);
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
                successCount++;

                if (!successFlag) {
                  successFlag = true;

                  const responseData = response.data.createTimeSheet;
                }
                if (successCount === data.length) {
                  setStoringMess(false);
                  toggleSFAMessage(true);
                  setData(null);
                }
              }
            })
          );
        } catch (error) {
          setStoringMess(false);

          toggleSFAMessage(false);
        }
      }
    };

    sendTimeSheets(finalResult);
  } else if (action === "updateStoredData") {
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
      setNotification?.(true);
      setShowTitle?.("Data has been submitted successfully");
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
                successCount++;

                if (!successFlag) {
                  successFlag = true;

                  const responseData = response.data.updateTimeSheet;
                  
                  const result = await MergeTableForNotification(responseData);

                  if (result) {
                    const emailDetails = await Notification({
                      getEmail: result,
                      Position,
                    });

                    if (emailDetails) {
                      const { subject, message, fromAddress, toAddress } =
                        emailDetails;
                      await sendEmail(subject, message, fromAddress, toAddress);
                      setTimeout(() => {
                        handleAssignManager();
                        setNotification?.(false);
                      }, 1500);
                     
                    } else {
                    }
                  } else {
                  }
                }
              }
            })
          );
        } catch (error) {
          setStoringMess(false);
          // console.error("Error creating TimeSheet:", error);
          toggleSFAMessage(false);
        }
      }
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
      let successCount = 0;
      let allResponse = [];
      setNotification?.(true);
      setShowTitle?.("Data has been submitted successfully");
      const chunks = chunkArray(timeSheetData, 1000);

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
                  successCount++;
                  const resData = response.data.updateTimeSheet;
                  allResponse.push(resData);
                  // console.log("allResponse : ", allResponse);
                  if (!successFlag) {
                    const responseData = response.data.updateTimeSheet;

                    successFlag = true;

                    toggleSFAMessage(true); // Show success message once
                  }
                }
              } catch (error) {
                setStoringMess(false);
                setNotification?.(false);
                toggleSFAMessage(false);
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

      // Function to group by status
      const groupByStatus = (data) => {
        return data.reduce((acc, item) => {
          const { status } = item;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(item);
          return acc;
        }, {});
      };

      const groupedResponse = groupByStatus(allResponse);
      // console.log("Grouped Response:", groupedResponse);

      // Handle Rejected
      if (groupedResponse.Rejected?.length > 0) {
        const rejectedData = groupedResponse.Rejected[0]; // Get first rejected record
        // console.log("Rejected Notification Data:", rejectedData);

        MergeTableForNotification(rejectedData).then(async (result) => {
          if (result) {
            const emailDetails = await Notification({
              getEmail: result,
              Position,
            });

            if (emailDetails) {
              const { subject, message, fromAddress, toAddress } = emailDetails;
              await sendEmail(subject, message, fromAddress, toAddress);
              setTimeout(() => {
             
                handleManagerReload?.();
                setNotification?.(false);
              }, 1500);
            }
          }
        });
      }

      // Handle Approved
      if (groupedResponse.Approved?.length > 0) {
        const approvedData = groupedResponse.Approved[0]; // Get first approved record
        // console.log("Approved Notification Data:", approvedData);

        MergeTableForNotification(approvedData).then(async (result) => {
          if (result) {
            const emailDetails = await Notification({
              getEmail: result,
              Position,
            });

            if (emailDetails) {
              const { subject, message, fromAddress, toAddress } = emailDetails;
              await sendEmail(subject, message, fromAddress, toAddress);

              setTimeout(() => {
                
                handleManagerReload?.();
                setNotification?.(false);
              }, 1500);
            }
          }
        });
      }

      setAllApprovedData?.([]);
      setAllRejectedData?.([]);
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
      setNotification?.(true);
      setShowTitle?.("Data has been submitted successfully");

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
                successCount++;

                if (!successFlag) {
                  successFlag = true;
                  toggleSFAMessage(true);
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
                      setTimeout(() => {
                        handleAssignManager();
                        setNotification?.(false);
                      }, 1500);
                    } else {
                    }
                  } else {
                  }
                }
              }
            })
          );
        } catch (error) {
          setNotification?.(false);
          setStoringMess(false);
          // console.error("Error creating TimeSheet:", error);
          toggleSFAMessage(false);
        }
      }
    };

    UpdateRejectedTimeSheets(finalResult);
  }
};
