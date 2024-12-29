import { useState, useCallback } from "react";
import { generateClient } from "@aws-amplify/api";
import { updateWPTracking } from "../../graphql/mutations"; // Adjust the import path

export const useUpdateWPTracking = () => {
  const client = generateClient();

  const wpTrackingDetails = useCallback(async ({ WPTrackingValue }) => {
    if (!WPTrackingValue) {
      throw new Error("Missing required parameters or WPTrackingValue");
    }

    try {
      const {
        id,
        tempID,
        supportletterReqDate,
        supportletterReceiveDate,
        letterfile,
        doesubmitdate,
        doerefno,
        doeapprovedate,
        doeexpirydate,
        doefile,
        nlmssubmitdate,
        submissionrefrenceno,
        nlmsapprovedate,
        ldreferenceno,
        nlmsexpirydate,
        nlmsfile,
        bgsubmitdate,
        bgreceivedate,
        referenceno,
        bgamount,
        bgexpirydate,
        bgfile,
        tbapurchasedate,
        jitpaamount,
        jitpaexpirydate,
        receiptno,
        depositamount,
        submitdateendorsement,
        jitpafile,
        immbdno,
        docsubmitdate,
        visaapprovedate,
        visareferenceno,
        visaFile,
        departuredate,
        arrivaldate,
        cityname,
        airfare,
        airticketfile,
        agentname,
        mobSignDate,
        mobFile,
        lbrDepoNum,
        lbrEndroseDate,
        lbrDepoAmount,
        lbrFile,
      } = WPTrackingValue;

      const updatedData = {
        id,
        tempID,
        supportletterReqDate,
        supportletterReceiveDate,
        letterfile,
        doerefno,
        doesubmitdate,
        doeapprovedate,
        doeexpirydate,
        doefile,
        nlmssubmitdate,
        submissionrefrenceno,
        nlmsapprovedate,
        ldreferenceno,
        nlmsexpirydate,
        nlmsfile,
        bgsubmitdate,
        bgreceivedate,
        referenceno,
        bgamount,
        bgexpirydate,
        bgfile,
        tbapurchasedate,
        jitpaamount,
        jitpaexpirydate,
        receiptno,
        depositamount,
        submitdateendorsement,
        jitpafile,
        immbdno,
        docsubmitdate,
        visaapprovedate,
        visareferenceno,
        visaFile,
        departuredate,
        arrivaldate,
        cityname,
        airfare,
        airticketfile,
        agentname,
        mobSignDate,
        mobFile,
        lbrDepoNum,
        lbrEndroseDate,
        lbrDepoAmount,
        lbrFile,
      };

      const response = await client.graphql({
        query: updateWPTracking,
        variables: { input: updatedData, limit:20000, },
      });

      // Log the response to confirm the update
      console.log("WPTracking data successfully updated:", response);
    } catch (err) {
      console.error("Error updating WPTracking data:", err);
    } finally {
    }
  }, []);

  return { wpTrackingDetails };
};
