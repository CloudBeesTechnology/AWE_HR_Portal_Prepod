import { useCallback } from "react";
import { createWPTracking } from "../../graphql/mutations";
import { generateClient } from "@aws-amplify/api";

export const useCreateWPTracking = () => {
  const client = generateClient();
  const createWPTrackingHandler = useCallback(async ({ reqValue }) => {
    if (!reqValue) {
      throw new Error("Missing required parameters");
    }

    const {
      tempID,
      sawpDate,
      sawpRecivedDate,
      sawpFile,
      doerefno,
      supportletterReqDate,
      lbrDepoNum,
      lbrEndroseDate,
      lbrDepoAmount,
      lbrFile,
      supportletterReceiveDate,
      letterfile,
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
      remarkNLMob
    } = reqValue;

    const totalData = {
      tempID,
      sawpDate,
      sawpRecivedDate,
      sawpFile,
      doerefno,
      supportletterReqDate,
      lbrDepoNum,
      lbrEndroseDate,
      lbrDepoAmount,
      lbrFile,
      supportletterReceiveDate,
      letterfile,
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
      remarkNLMob
    };

    try {
      const res = await Promise.all([
        client.graphql({
          query: createWPTracking,
          variables: { input: totalData },
        }),
      ]);
      console.log("Response", res);
    } catch (error) {
      console.error("Error executing GraphQL requests:", error);
      throw error; 
    }
  }, []);
  return { createWPTrackingHandler };
};
