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

const client = generateClient();

export const AddNewForm = () => {
  // Track multiple selected items
  const [autoPassword, setAutoPassword] = useState("");
  const [isvisible, setIsVisible] = useState(false);
  const [dropDownVal, setDropDownVal] = useState([]);
  const [permissionData, setPermissionData] = useState(null);
  const location = useLocation();
  const data = location.state?.editUserData;
  const addData = location.state?.addUserData;
  const [allData, setAllData] = useState(null);
  const [notification, setNotification] = useState(false);

  const userDataDetails = data?.userValue || addData?.userValue;
  const workInfoDataDetails = data?.workValue || addData?.workValue;
  // console.log(userDataDetails );
  // console.log(addData?.employeeValue);
  // console.log(workInfoDataDetails);

  // console.log(data?.storedValue?.data);

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
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?|[];,./-=';
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += charset[array[i] % charset.length];
    }
    return randomString;
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

    setAllData(mergedData); // Ensure this is called with valid data
    setValue("password", autoPassword);
    setValue("selectType", data?.storedValue?.data?.selectType);
    setValue("contactNo", getLastValue(data?.storedValue?.data?.contactNo));
    setValue("department", getLastValue(data?.storedValue?.data?.department));
    setValue("position", getLastValue(data?.storedValue?.data?.position));
  }, [autoPassword, setValue, data, addData, workInfoDataDetails]); // Added addData here

  // console.log("add Data:", addData);

  const searchResult = (result) => {
    setValue("name", result.name);
    setValue("officialEmail", result.officialEmail);
    setValue("empID", result.empID);
    setValue("userID", result.empID);
    setValue("contactNo", getLastValue(result.contactNo));
    setValue("department", getLastValue(result.department));
    setValue("position", getLastValue(result.position));
  };

  const dropDownData = (value) => {
    setDropDownVal([value]);
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
    // console.log(data);

    try {
      const desideCreateOrUpdate = userDataDetails.some((m) => {
        return m.empID.includes(data.empID);
      });

      const userIDs = await userDataDetails
        .filter((m) => m.empID === data.empID)
        .map((m) => m);

      if (desideCreateOrUpdate) {
        const updateUserObject = {
          id: userIDs[0].id,
          // password: "AWE001",
          password: data.password,
          selectType: data.selectType,
          setPermissions: dropDownVal,
          status: "Active",
        };
        await client
          .graphql({
            query: updateUser,
            variables: {
              input: updateUserObject,
            },
          })
          .then((res) => {
            setNotification(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const createNewUser = {
          empID: data.empID,
          // password: "AWE001",
          password: data.password,
          selectType: data.selectType,
          setPermissions: dropDownVal,
          status: "Active",
        };
        await client
          .graphql({
            query: createUser,
            variables: {
              input: createNewUser,
            },
          })
          .then((res) => {
            // console.log(res);
            setNotification(true);
          })
          .catch((err) => {
            console.log(err);
          });

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
          .then((res) => {
            // console.log("sign up data", res);
            // reset()
          })
          .catch((err) => {
            console.log("sign up data error", err);
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
    <div className="flex items-center justify-center bg-[#F8F8F8] flex-col p-10">
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
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
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
        <SpinLogo
          text="Created a User Successfully"
          notification={notification}
          path="/user"
        />
      )}
    </div>
  );
};
