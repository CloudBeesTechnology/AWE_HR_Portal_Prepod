import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { SearchDisplay } from "../../utils/SearchDisplay";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../../services/Validation";
import { SPDropDown } from "./SPDropDown";
import { createUser, updateUser } from "../../graphql/mutations";
import { IoEyeOffOutline, IoEye } from "react-icons/io5";
import { generateClient } from "@aws-amplify/api";
import { signUp } from "@aws-amplify/auth";
import { SpinLogo } from "../../utils/SpinLogo";
import { Alert } from "@aws-amplify/ui-react";
import { sendEmail } from "../../services/EmailServices";

const client = generateClient();

export const AddNewForm = () => {
  // Track multiple selected items
  const [autoPassword, setAutoPassword] = useState("");
  const [isvisible, setIsVisible] = useState(false);
  const [dropDownVal, setDropDownVal] = useState([]);
  const [permissionData, setPermissionData] = useState(null);
  const [deletePermissionData, setDeletePermissionData] = useState(null);
  const location = useLocation();
  const data = location.state?.editUserData;
  const addData = location.state?.addUserData;
  const [allData, setAllData] = useState(null);
  const [notification, setNotification] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");
  const userDataDetails = data?.userValue || addData?.userValue;
  const workInfoDataDetails = data?.workValue || addData?.workValue;
  const [disableEmpID, setDisableEmpID] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      password: autoPassword,
    },
  });

  const generateRandomString = (length) => {
    const array = new Uint8Array(length); // Create an array of the desired length
    window.crypto.getRandomValues(array); // Fill the array with random values

    // Convert the random bytes into a readable string
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$()_{}";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += charset[array[i] % charset.length];
    }
    return randomString;
  };

  const parsePermissions = (permissionsArray) => {
    return permissionsArray.map((permissionStr) => {
      if (!permissionStr || permissionStr === "{}") return {};

      try {
        let formattedStr = permissionStr
          .replace(/(\w+)=/g, '"$1":') // Convert key=value to "key":value
          .replace(/\[([^\]]+)\]/g, (_, match) => {
            return `[${match
              .split(", ")
              .map((item) => `"${item}"`)
              .join(", ")}]`; // Ensure array values are properly quoted
          })
          .replace(/"{/g, "{") // Remove accidental double quotes at object start
          .replace(/}"/g, "}"); // Remove accidental double quotes at object end

        // Debugging

        return JSON.parse(formattedStr); // Convert corrected string to object
      } catch (error) {
        console.error(
          "Parsing error:",
          error,
          "Original String:",
          permissionStr
        );
        return {};
      }
    });
  };

  useEffect(() => {
    const generateAndHashPassword = async () => {
      const autoPasswords = generateRandomString(12);
      setAutoPassword(autoPasswords);
    };

    generateAndHashPassword();

    const convertJson = convertToJSON(
      data?.storedValue?.data?.setPermissions[0]
    );

    setPermissionData(convertJson);

    const [parsedPermissions] = parsePermissions([
      data?.storedValue?.data?.setPermissions[1],
    ]);
    setDeletePermissionData(parsedPermissions);
  }, []);
  const getLastValue = (value) =>
    Array.isArray(value) ? value[value.length - 1] : value;

  useEffect(() => {
    const mergedData = addData?.employeeValue
      .map((candidate) => {
        const workDetails = workInfoDataDetails.find(
          (item) => item.empID === candidate.empID
        );
        // const empDocsDetails = addData?.employeeDocsValue.find(
        //   (item) => item.empID === candidate.empID
        // );

        return {
          ...candidate,
          ...workDetails,
          // ...empDocsDetails,
        };
      })
      .filter((item) => item !== null);

    // console.log("Merged Data:", mergedData);
    setAllData(mergedData); // Ensure this is called with valid data
    setValue("password", autoPassword);
    setValue("selectType", data?.storedValue?.data?.selectType);
    setValue("contactNo", getLastValue(data?.storedValue?.data?.contactNo));
    setValue("department", getLastValue(data?.storedValue?.data?.department));
    setValue("position", getLastValue(data?.storedValue?.data?.position));
  }, [autoPassword, setValue, data, addData, workInfoDataDetails]); // Added addData here

  // console.log("add Data:", addData);

  const searchResult = (result) => {
    if (result.empID) {
      setDisableEmpID(true);
    }
    setValue("name", result.name);
    setValue("officialEmail", result.officialEmail);
    setValue("empID", result.empID);
    setValue("userID", result.empID);
    setValue("contactNo", getLastValue(result.contactNo));
    setValue("department", getLastValue(result.department));
    setValue("position", getLastValue(result.position));
  };

  const dropDownData = (viewAccess, deleteAccess) => {
    let finalData = [viewAccess, { deleteAccess: deleteAccess }];

    setDropDownVal(finalData);
  };

  function convertToJSON(inputString) {
    if (!inputString) {
      // console.error("Input string is null or undefined.");
      return null;
    }
    let formattedString = inputString?.replace(/=/g, ":");

    formattedString = formattedString?.replace(/([a-zA-Z]+):/g, '"$1":');

    formattedString = formattedString?.replace(
      /\[([^\]]+)\]/g,
      function (match, p1) {
        let elements = p1.split(",").map((item) => `"${item.trim()}"`);
        return `[${elements.join(", ")}]`;
      }
    );

    formattedString = `{${formattedString?.slice(1, -1)}}`;

    try {
      return JSON.parse(formattedString);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return null;
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    //     console.log(data, "Data  checking");
    // console.log(dropDownVal,"setpermission");
    const today = new Date().toISOString().split("T")[0];
    const userIDFind = localStorage.getItem("userID");
    try {
      const desideCreateOrUpdate = userDataDetails.some((m) => {
        return m.empID === data.empID;
      });
      // console.log(desideCreateOrUpdate);

      const userIDs = await userDataDetails
        .filter((m) => m.empID === data.empID)
        .map((m) => m);
      const previousUpdatesUser = userIDs[0]?.updatedBy
        ? JSON.parse(userIDs[0]?.updatedBy)
        : [];

      const updatedByUser = [
        ...previousUpdatesUser,
        { userID: userIDFind, date: today },
      ];

      const orderedUpdatedByUser = updatedByUser.map((entry) => ({
        userID: entry.userID,
        date: entry.date,
      }));
      if (desideCreateOrUpdate) {
        const updateUserObject = {
          id: userIDs[0].id,
          password: data.password,
          selectType: data.selectType,
          setPermissions: dropDownVal,
          updatedBy: JSON.stringify(orderedUpdatedByUser),
          // status: "Active",
        };
        // console.log("updateUserObject : ", updateUserObject);
        await client
          .graphql({
            query: updateUser,
            variables: {
              input: updateUserObject,
            },
          })
          .then((res) => {
            // console.log(res);
            setShowTitle("User updated Successfully");
            setNotification(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const nameperson =
          data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

        const username = data.empID;
        const password = data.password;
        const email = data.officialEmail;
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
          .then(async (res) => {
            const createNewUser = {
              empID: data.empID,
              password: data.password,
              selectType: data.selectType,
              setPermissions: dropDownVal,
              status: "Active",
              createdBy: JSON.stringify([{ userID: userIDFind, date: today }]),
            };
            await client
              .graphql({
                query: createUser,
                variables: {
                  input: createNewUser,
                },
              })
              .then(async (res) => {
                await sendEmail(
                  `Verify Your Email to Activate Your Account`,
                  `
                  <html>
                    <body>
                      <p>Dear ${nameperson},</p>
                      <p>Please verify your email to activate your account before attempting to log in or change your password. <br/>
                      You must complete the email verification process using the verification email sent to you earlier. <br/>
                      Once verified, you can log in using the credentials provided below:
                      </p>
                      <p><strong>Username:</strong> ${username} <br /><strong>Temporary Password:</strong> ${password}</p>
                    
                      <p>Visit <a href="http://employee.adininworks.co"> http://employee.adininworks.co </a> to log in. <br />Please note that changing your password is mandatory for account security. <br />Update your password immediately after logging in for the first time.</p>
                      <p><strong>Important:</strong> Ensure you verify your email first to avoid any issues during login or password changes.</p>
                    
                      <p>Best regards,</p>
                      <p>AWE Team</p>
                    </body>
                  </html>
                `,
                  "hr_no-reply@adininworks.com",
                  email
                );
                setShowTitle("Created a User Successfully");
                setNotification(true);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            alert(err);
          });
      }
      reset();
      setDropDownVal([]);
      setPermissionData({});
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div
      className="flex items-center justify-center bg-[#F8F8F8] flex-col p-10"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/user" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <h2 className="flex-1 text-center mt-2 text_size_2 uppercase">
          {data?.storedValue?.title || "Add New User"}
        </h2>
        <div className="flex-1">
          {data?.storedValue?.title !== "Edit User" && (
            <SearchDisplay
              searchResult={searchResult}
              newFormData={allData}
              searchIcon2={<IoSearch />}
              placeholder="Employee Id"
              rounded="rounded-lg"
              filteredEmployees={filteredEmployees}
              setFilteredEmployees={setFilteredEmployees}
            />
          )}
        </div>
      </div>
      <form className="bg-white py-10 my-16 px-14 w-full" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div>
              <label className="text_size_5">Name</label>
              <input
                type="text"
                className="input-field"
                value={data?.storedValue?.data?.name || watch("name") || ""}
                {...register("name")}
              />
            </div>
            <p className="text-[red] text-[12px] mt-1">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <div>
              <label className="text_size_5">Employee Id</label>
              <input
                type="text"
                className="input-field"
                value={data?.storedValue?.data?.empID || watch("empID") || ""}
                {...register("empID")}
              />
            </div>
            <p className="text-[red] text-[12px] mt-1">
              {errors.empID?.message}
            </p>
          </div>

          <div>
            <div>
              <label className="text_size_5">Phone Number</label>
              <input
                type="text"
                className="input-field"
                value={
                  watch("contactNo") ||
                  data?.storedValue?.data?.contactNoValue ||
                  ""
                }
                {...register("contactNo")}
              />
            </div>
            <p className="text-[red] text-[12px] mt-1">
              {errors.contactNo?.message}
            </p>
          </div>

          <div>
            <div>
              <label className="text_size_5">Official Email Id</label>
              <input
                type="officialEmail"
                className="input-field"
                value={
                  data?.storedValue?.data?.officialEmail ||
                  watch("officialEmail") ||
                  ""
                }
                {...register("officialEmail")}
              />
            </div>
            <p className="text-[red] text-[12px] mt-1">
              {errors.officialEmail?.message}
            </p>
          </div>

          <div>
            <div>
              <label className="text_size_5">User ID</label>
              <input
                type="text"
                className="input-field"
                value={data?.storedValue?.data?.empID || watch("userID") || ""}
                // onChange={handleUserIDChange}
                {...register("userID")}
              />
            </div>
            <p className="text-[red] text-[12px] mt-1">
              {errors.userID?.message}
            </p>
          </div>

          <div>
            <label className="text_size_5">Temporary Password</label>
            <div className="input-field flex items-center gap-2">
              <input
                type={isvisible ? "text" : "password"}
                className="outline-none w-full bg-[transparent]"
                value={data?.storedValue?.data?.password || autoPassword}
                {...register("password")}
                readOnly
              />
              {isvisible ? (
                <div
                  className="text-2xl text-dark_grey"
                  onClick={() => {
                    setIsVisible(!isvisible);
                  }}
                >
                  <IoEye />
                </div>
              ) : (
                <div
                  className="text-2xl text-dark_grey"
                  onClick={() => {
                    setIsVisible(!isvisible);
                  }}
                >
                  <IoEyeOffOutline />
                </div>
              )}
            </div>

            <p className="text-[red] text-[12px] mt-1">
              {errors.password?.message}
            </p>
          </div>
          <div>
            <div>
              <label className="text_size_5">Position</label>
              <input
                type="text"
                className="input-field"
                value={
                  watch("position") ||
                  data?.storedValue?.data?.positionValue ||
                  data?.employeeValue?.data?.position ||
                  ""
                }
                {...register("position")}
              />
            </div>
            <p className="text-[red] text-[12px] mt-1">
              {errors.position?.message}
            </p>
          </div>

          <div>
            <div>
              <label className="text_size_5">Department</label>
              <input
                type="text"
                className="input-field"
                value={
                  watch("department") ||
                  data?.storedValue?.data?.departmentValue ||
                  ""
                }
                {...register("department")}
              />
            </div>

            <p className="text-[red] text-[12px] mt-1">
              {errors.department?.message}
            </p>
          </div>

          <div>
            <label className="text_size_5">Select Type</label>
            <select className="input-field" {...register("selectType")}>
              <option
                value={
                  data?.storedValue?.data?.selectType ||
                  watch("selectType") ||
                  ""
                }
              >
                {data?.storedValue?.data?.selectType || "Select access"}
              </option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="GM">GM</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Training Requestor">Training Requestor</option>
              <option value="TimeKeeper">TimeKeeper</option>
              <option value="QA \ QC">QA \ QC</option>
              <option value="User">User</option>
              <option value="Employee">Employee</option>
            </select>

            <p className="text-[red] text-[12px] mt-1">
              {errors.selectType?.message}
            </p>
          </div>
          <div>
            <label className="text_size_5">Set Permission</label>
            <div className="p-2 my-2 border border-[#dedbdb] rounded-md">
              <SPDropDown
                dropDownData={dropDownData}
                permissionData={permissionData}
                deletePermissionData={deletePermissionData}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 w-full center">
          <button
            type="submit"
            className="p-3 text-white rounded-md primary_btn"
          >
            Submit
          </button>
        </div>
      </form>

      {notification && (
        <SpinLogo text={showTitle} notification={notification} path="/user" />
      )}
    </div>
  );
};
