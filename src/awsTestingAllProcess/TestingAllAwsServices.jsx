import React, { useEffect, useState } from "react";
// import SampleTempID2UpdateForm from '../ui-components/SampleTempID2UpdateForm'

import { post } from "aws-amplify/api";
// import SampleTest1CreateForm from "../ui-components/SampleTest1CreateForm";

import {
  fetchByPath,
  getOverrideProps,
  validateField,
} from "../ui-components/utils";
import { generateClient } from "aws-amplify/api";
import { createSampleTest1, deleteSampleTest1, updateSampleTest1 } from "../graphql/mutations";
import axios from "axios";
import { getSampleTest1, listSampleTest1s } from "../graphql/queries";
import { uploadData, getProperties, list, getUrl } from "aws-amplify/storage";
import { Amplify } from "aws-amplify";
import { SearchDisplay } from "../utils/SearchDisplay";
// import AWS from ""

// import cryptoRandomString from "crypto-random-string";
import { signUp } from "@aws-amplify/auth";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import {
  CognitoAWSCredentialsAndIdentityIdProvider,
  confirmSignUp,
  getCurrentUser,
  sendUserAttributeVerificationCode,
  updateUserAttribute,
} from "@aws-amplify/auth/cognito";
import awsmobile from "../aws-exports";
import { getCredentialsForIdentity } from "@aws-amplify/core";


const client = generateClient();

export const TestingAllAwsServices = () => {
  const [check, setCheck] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // password: "",
    gender: "",
    empID: "",
    tempID: "",
  });

  // const [newFormData, setNewFormData] = useState([
  //   {
  //     name: "Carol",
  //     // surname: "Williams",
  //     empID: "AWE001",
  //     email: "carol.williams@example.com",
  //     // password: "password3",
  //     // confirmPassword: "password3",
  //     // position: "HR Manager",
  //     // department: "Human Resources",
  //     // selectType: "Super Admin",
  //     // isActive: false,
  //     // permissions: {
  //     //   dashboard: false,
  //     //   recruitment: true,
  //     //   employee: true,
  //     //   leaveManagement: true,
  //     //   notificationCenter: false,
  //     //   benefitsRewards: true,
  //     //   training: true,
  //     //   timeSheet: false,
  //     //   report: true,
  //     // },
  //   },
  // ]);

  // const searchResult = (after_search) => {
  //   setFormData(after_search);
  //   setCheck(true);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const [autoPassword, setAutoPassword] = useState("");
  // useEffect(() => {
  //   const autoPasswords = cryptoRandomString({ length: 12, type: "base64" });
  //   setAutoPassword(autoPasswords);
  // }, []);
  // const getLatestTempID = async () => {
  //   try {
  //     const result = await client.graphql({
  //       query: listSampleTest1s,
  //       variables: {
  //         limit: 1,
  //         sortDirection: "DESC",
  //       },
  //     });

  //     const items = result?.data?.listSampleTest1s?.items;
  //     if (items && items.length > 0) {
  //       return items[0].tempID;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error fetching latest tempID:", error);
  //     return null;
  //   }
  // };
  // const generateNextTempID = (latestTempID) => {
  //   if (!latestTempID) {
  //     return "TEMP001"; // Start with TEMP001 if no entries exist
  //   }

  //   const numberPart = parseInt(latestTempID.replace("TEMP", ""), 10); // Extract the number part
  //   const nextNumber = numberPart + 1; // Increment the number
  //   const nextTempID = `TEMP${String(nextNumber).padStart(3, "0")}`; // Generate next ID with padding
  //   return nextTempID;
  // };

  const onSubmit = async () => {
    console.log(formData);

    // try {
    //   const response = await client.graphql({
    //     query: listSampleTest1s,
    //   });
    //   console.log(response.data.listSampleTest1s.items); // Logs all the records
    // } catch (error) {
    //   console.error('Error fetching all records:', error);
    // }
    // const latestTempID = await getLatestTempID();

    // // Generate the next tempID
    // const nextTempID = generateNextTempID(latestTempID);

    // Add the new tempID to formData
    const updatedFormData = {
      id: "f82afd8d-c58d-44d2-9661-808de41e4f81",
      // name: "Karthi",
      _version:2
    };
    await client
      .graphql({
        query: deleteSampleTest1,
        variables: {
          input: updatedFormData,
          // tempID: nextTempID,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadPDF = async (file) => {
    try {
      const result = await uploadData({
        path: `uploadTest/${file.name}`,
        data: file,
        // level: 'private',
        // contentType: file.type,
      }).result;

      const filePath = result.path;
      const encodedFilePath = encodeURIComponent(filePath);

      // Construct the full URL
      const fileUrl = `https://aweadininstorage20242a2fe-dev.s3.ap-southeast-1.amazonaws.com/${encodedFilePath}`;
      console.log("File uploaded successfully. File URL:", fileUrl);
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };

  const AutoPassword = async () => {
    // const autoGenerate = {
    //   name: formData.name,
    //   email: "karthikeyanviji3701@gmail.com",
    //   empID: "AWE002",
    //   // password: autoPassword,
    // };
    // console.log(autoGenerate);
    // const username = autoGenerate.empID;
    // const password = autoGenerate.password;
    // const email = autoGenerate.email;
    // console.log(email);
    // await client
    //   .graphql({
    //     query: createSampleTest1,
    //     variables: {
    //       input: autoGenerate,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res,"graphql");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // SignUp
    // const username="AWE001"
    // const password="Password@1"
    // const email="cloudbeestech@gmail.com"
    //     await signUp({
    //       username,
    //       password,
    //       options: {
    //         userAttributes: {
    //           email,
    //         },
    //       },
    //     })
    //       .then((res) => {
    //         console.log("sign up data", res);
    //       })
    //       .catch((err) => {
    //         console.log("sign up data error", err);
    //       });
    // user creating
    // const username = "AWE003";
    // const password = "Password@2";
    // const email = "arthiDeveloper398@gmail.com";
    // try {
    //   await signUp({
    //     username,
    //     password,
    //     // attributes: {
    //     //   email, // Add other attributes as needed
    //     // },
    //     options: {
    //       // UserAttributes: [
    //       //   { Name: "email", Value: email },
    //       //   { Name: "email_verified", Value: "true" },
    //       //   { Name: "phone_number_verified", Value: "true" },
    //       // ],
    //       userAttributes: {
    //         email,
    //         // email_verified:"true",
    //         // phone_number_verified:"true"
    //       },
    //     },
    // clientMetadata: {
    // Suppress the confirmation email
    // MessageAction: "SUPPRESS",
    // },
    // })
    // await updateUserAttribute({
    //   UserPoolId: awsmobile.aws_cognito_identity_pool_id,
    //   Username: username,
    //   UserAttributes: [
    //     {
    //       Name: "email_verified",
    //       Value: "true",
    //     },
    //   ],
    // })
    //     .then((res) => {
    //       console.log("sign up data", res);
    //     })
    //     .catch((err) => {
    //       console.log("sign up data error", err);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // Rest APi

  // const onSubmit = () => {
  //   const payload = {
  //     id:"igh345",
  //     tempID:"Tep009",
  //     empID:"Emp009",
  //     phoneNo:"1234569870",
  //     name: formData.name,
  //     email: formData.email,
  //     password: formData.password,
  //     gender: formData.gender,
  //   };

  //   axios
  //     .post(
  //       "https://7l9g6he2f0.execute-api.ap-southeast-1.amazonaws.com/dev/register",
  //       payload,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const handleSignUp = async () => {
    const username = "AWE001";
    const password = "Password@1";
    const email = "cloudbeestech@gmail.com";
    try {
      // Attempt to sign up the user
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true, // Attempt to auto-sign in the user after sign-up
        },
      })
        .then((res) => {
          console.log("sign up data", res);
        })
        .catch((err) => {
          console.log("sign up data error", err);
        });

      // if (isSignUpComplete) {
      //   console.log("Sign-up complete. UserId:", userId);

      //   // If autoSignIn worked, the user should already be authenticated, so let's check the session
      //   // await handlePostSignUpSession(); // Ensure session is valid
      //   // window.location.href = "/dashboard"; // Redirect to the dashboard after successful sign-up
      // }
      // //  else {
      // //   // If additional steps are required (e.g., email confirmation), handle those
      //   console.log("Additional steps required after sign-up:", nextStep);
      //   if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      //     // If confirmation via email or phone is required
      //     console.log("Please confirm your email or phone.");
      //     window.location.href = "/confirmEmail"; // Redirect to a confirmation page
      //   }
      // }
    } catch (error) {
      console.log("Error during sign-up:", error);

      // if (error.code === 'UserUnAuthenticatedException') {
      //   console.log("Session expired or user needs to be authenticated.");
      //   await refreshSession(); // Attempt to refresh the session
      // } else if (error.code === 'UsernameExistsException') {
      //   // Handle case where the username is already taken
      //   console.log("Username already exists. Please try a different username.");
      // } else if (error.code === 'InvalidPasswordException') {
      //   // Handle invalid password (e.g., doesn't meet password requirements)
      //   console.log("Invalid password. Please follow the password guidelines.");
      // } else {
      //   // Generic error handling
      //   console.log("An unknown error occurred:", error.message);
      // }
    }
  };

  // Utility function to handle session after sign-up
  // async function handlePostSignUpSession() {
  //   try {
  //     const user = await getCurrentUser(); // Check if the user is authenticated
  //     if (user) {
  //       console.log("User is authenticated. Session is active.");
  //       await currentSession(); // Ensure the session is refreshed and valid
  //     } else {
  //       console.log("No authenticated user found. Session may not be active.");
  //       await refreshSession(); // Attempt to refresh the session if needed
  //     }
  //   } catch (error) {
  //     console.log("Error verifying session after sign-up:", error);
  //     if (error.code === 'UserUnAuthenticatedException') {
  //       await refreshSession(); // If session is invalid, try to refresh it
  //     }
  //   }
  // }

  // // Utility function to refresh session (in case tokens expire)
  // async function refreshSession() {
  //   try {
  //     const user = await getCurrentUser(); // Get the current authenticated user
  //     if (user) {
  //       const session = await refreshSession(); // Refresh session token
  //       console.log("Session refreshed successfully:", session);
  //     } else {
  //       console.log("No authenticated user found. Cannot refresh session.");
  //     }
  //   } catch (error) {
  //     console.log("Error refreshing session:", error);
  //     if (error.code === 'UserUnAuthenticatedException') {
  //       console.log("User needs to sign in again.");
  //       // Redirect to sign-in page if the session cannot be refreshed
  //       window.location.href = "/signIn";
  //     }
  //   }
  // }

  return (
    <div className="flex gap-10 flex-col px-10 ">
      TestingAllAwsServices
      {/* <CandidateApplicationFormCreateForm/> */}
      {/* <SampleTest1CreateForm/> */}
      {/* <SearchDisplay newFormData={newFormData} searchResult={searchResult} /> */}
      <input
        className="border outline-none"
        name="name"
        value={formData.name}
        type="text"
        placeholder="name"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        className="border outline-none"
        name="email"
        value={formData.email || ""}
        type="text"
        placeholder="email"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input
        className="border outline-none"
        name="empID"
        value={formData.empID || ""}
        type="text"
        placeholder="empID"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {/* <input
        className="border outline-none"
        name="password"
        value={formData.password || ""}
        type="text"
        placeholder="password"
        onChange={(e) => {
          handleChange(e);
        }}
      /> */}
      <input
        className="border outline-none"
        name="gender"
        value={formData.gender || ""}
        type="text"
        placeholder="gender"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {/* <div className="border outline-none">
        <p>{autoPassword}</p>
      </div> */}
      <input
        type="file"
        accept="application"
        onChange={(e) => uploadPDF(e.target.files[0])}
      />
      <button
        onClick={async () => {
          // try {
          //   // const response = new CognitoAWSCredentialsAndIdentityIdProvider();
          //   const response = new CognitoAWSCredentialsAndIdentityIdProvider.
          //   getCredentialsForIdentity(

          //   )
          //   console.log("Response:", response); // Log the full response to check its structure

          //   const { credentials, identityId } = response; // Now destructure after confirming the response
          //   console.log("Credentials:", credentials);
          //   console.log("Identity ID:", identityId);
          // } catch (error) {
          //   console.error(
          //     "Error fetching credentials and identity ID:",
          //     error.message
          //   );
          // }

          onSubmit();
          // uploadPDF();
          // AutoPassword();
          // handleSignUp();
        }}
      >
        Submit
      </button>
      {/* <input type="text" placeholder="email" /> */}
    </div>
  );
};

// import { signUp } from 'aws-amplify/auth';

// async function handleSignUp({ username, password, email, phone_number }) {
//   try {
//     const { isSignUpComplete, userId, nextStep } = await signUp({
//       username,
//       password,
//       options: {
//         userAttributes: {
//           email,
//           phone_number // E.164 number convention
//         },
//         // optional
//         autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
//       }
//     });

//     console.log(userId);
//   } catch (error) {
//     console.log('error signing up:', error);
//   }
// }

// import * as XLSX from "xlsx";

// export const TestingAllAwsServices = () => {
//   const [excelData, setExcelData] = useState(null);
//   // useEffect(() => {
//   //   const fetchExcelFile = async () => {
//   //     try {
//   //       // Fetch the Excel file from the URL
//   //       const response = await axios.get(
//   //         "https://awe-adinin-files-storage-1982502de-dev.s3.ap-southeast-1.amazonaws.com/AWE_Employee_Migration/Personal+Data+-+ACTIVE+SAMPLE+-+Sheet1.csv",
//   //         {
//   //           responseType: "arraybuffer", // Important to fetch as arraybuffer
//   //         }
//   //       );
//   //       // Convert the response to an array buffer
//   //       const data = new Uint8Array(response.data);

//   //       // Parse the file using XLSX
//   //       const workbook = XLSX.read(data, { type: "array" });
//   //       const firstSheetName = workbook.SheetNames[0];
//   //       const firstSheet = workbook.Sheets[firstSheetName];

//   //       // Convert sheet data to JSON format
//   //       const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

//   //       const transformedData = sheetData.slice(1).map((row) => {
//   //         let result = {};
//   //         sheetData[0].forEach((key, index) => {
//   //           result[key] = row[index];
//   //         });
//   //         return result;
//   //       });
//   //       // transformedData.forEach((data) => {
//   //       //   // console.log(data);
//   //       //   setExcelData(prevData => ({...prevData, ...data}));
//   //       //   // Logs each object separately
//   //       // });
//   //       let combinedData = {};
//   //       transformedData.forEach((obj, index) => {
//   //         combinedData= obj;
//   //       });
//   //       console.log(combinedData);
//   //       setExcelData(combinedData);

//   //       // console.log("Transformed Data:", transformedData);
//   //     } catch (error) {
//   //       console.error("Error fetching Excel file:", error);
//   //     }
//   //   };

//   //   fetchExcelFile();
//   // }, []);

//   // console.log(excelData);

//   const excelMirgation = async () => {
//     //     await client.graphql({
//     //       query: createPersonalDatACTIVESAMPLE,
//     //       variables: {
//     //         input:excelData
//     //       },
//     //     }).then((res)=>{
//     //       console.log(res);
//     //     }).catch((err)=>{
//     // console.log(err);
//     //     })
//   };
//   excelMirgation();
//   return (
//     <div>
//       <h3>Excel Data</h3>
//       {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}
//       {/* {excelData.length > 0 ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading data...</p>
//       )} */}
//     </div>
//   );
// };
