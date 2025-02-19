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
  // handleManagerReload,
  storeApproveRej,
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
      let finalEmailDetails = null;
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
                      finalEmailDetails = emailDetails;
                      const { subject, message, fromAddress, toAddress } =
                        emailDetails;
                      const result = await sendEmail(
                        subject,
                        message,
                        fromAddress,
                        toAddress
                      );

                      // setTimeout(() => {
                      //   handleAssignManager();
                      //   setNotification?.(false);
                      // }, 1500);

                      if (
                        result === "success" &&
                        successCount === data.length
                      ) {
                        await handleAssignManager();
                        setNotification?.(false);
                      }
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

          toggleSFAMessage(false);
        }
      }
      return finalEmailDetails;
    };

    return await sendTimeSheets(finalResult);
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
      let finalEmailDetails = null;

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

                  if (!successFlag) {
                    const responseData = response.data.updateTimeSheet;

                    successFlag = true;

                    toggleSFAMessage(true);
                  }
                }
              } catch (error) {
                setStoringMess(false);
                setNotification?.(false);
                toggleSFAMessage(false);
              }
            })
          );
        } catch (batchError) {}
      }

      const groupByStatus = async (data) => {
        return data.reduce((acc, item) => {
          const { status } = item;
          if (!acc[status]) {
            acc[status] = [];
          }
          acc[status].push(item);
          return acc;
        }, {});
      };

      const groupedResponse = await groupByStatus(allResponse);

      if (groupedResponse.Rejected?.length > 0) {
        const rejectedData = groupedResponse.Rejected[0];

        const result = await MergeTableForNotification(rejectedData);

        if (result) {
          const emailDetails = await Notification({
            getEmail: result,
            Position,
          });

          if (emailDetails) {
            storeApproveRej.push(emailDetails);

            const { subject, message, fromAddress, toAddress } = emailDetails;
            const result = await sendEmail(
              subject,
              message,
              fromAddress,
              toAddress
            );
            // setTimeout(() => {
            //   handleManagerReload?.();
            //   setNotification?.(false);
            // }, 2100);

            if (result === "success") {
              setTimeout(() => {
                // handleManagerReload?.();
                setNotification?.(false);
              }, 1000);
            }
          }
        }
      }

      if (groupedResponse.Approved?.length > 0) {
        const approvedData = groupedResponse.Approved[0];

        const result = await MergeTableForNotification(approvedData);
        if (result) {
          const emailDetails = await Notification({
            getEmail: result,
            Position,
          });

          if (emailDetails) {
            storeApproveRej.push(emailDetails);

            const { subject, message, fromAddress, toAddress } = emailDetails;
            const result = await sendEmail(
              subject,
              message,
              fromAddress,
              toAddress
            );
            console.log("result : ", result);

            if (result === "success") {
              setTimeout(() => {
                // handleManagerReload?.();
                setNotification?.(false);
              }, 1000);
            }
          }
        }
      }

      setAllApprovedData?.([]);
      setAllRejectedData?.([]);
      // handleManagerReload?.();
      return storeApproveRej;
    };

    return await updateTimeSheetFunction(finalResult);
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
      let finalEmailDetails = null;
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
                      finalEmailDetails = emailDetails;
                      const { subject, message, fromAddress, toAddress } =
                        emailDetails;
                      const result = await sendEmail(
                        subject,
                        message,
                        fromAddress,
                        toAddress
                      );
                      if (
                        result === "success" &&
                        successCount === data.length
                      ) {
                        await handleAssignManager();
                        setNotification?.(false);
                      }
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
          toggleSFAMessage(false);
        }
      }
      return finalEmailDetails;
    };

    return await UpdateRejectedTimeSheets(finalResult);
  }
};
