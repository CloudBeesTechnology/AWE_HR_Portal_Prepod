import { generateClient } from "@aws-amplify/api";
import React from "react";
import { updateKeyValueStore } from "../../graphql/mutations";

const client = generateClient();
export const AddDropDown = () => {
  const WorkPermitDD = [
    "Foreign Worker License (LPA)",
    "Foreign Worker License (SAWP)",
    "Foreign Worker License Additional (LPA)",
    "Foreign Worker License Additional (SAWP)",
    "Foreign Worker License Renewal (LPA)",
    "Foreign Worker License Renewal (SAWP)",
    "Foreign Worker License Change Salary/Job Title (LPA)",
    "Foreign Worker License Cancellation (LPA)",
    "Foreign Worker License Cancellation (SAWP)",
    "Foreign Worker License Cancellation SAWP To LPA",
    "Foreign Worker License Transfer Of Contract (LPA)",
  ];
  const updating = async () => {
    
    await client.graphql({
      query: updateKeyValueStore,
      variables: {
        input: {
          id: "df1a97dd-732a-4afc-9578-8c7c99676f1e",
          permitWorkDD: WorkPermitDD,
        },
      },
    }).then(()=>{
      // console.log("drfghnjkm");
      
    }).catch((err)=>{
      // console.log(err,"89562");
      
    })
  };

  return <div onClick={updating}>click Here</div>;
};
