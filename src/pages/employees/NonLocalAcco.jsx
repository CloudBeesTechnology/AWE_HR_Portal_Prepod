import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SearchDisplay } from '../../utils/SearchDisplay';
import { NonLocalAccovalidationSchema } from '../../services/EmployeeValidation';
import { DataSupply } from "../../utils/DataStoredContext";
import { NLACreate } from "../../services/createMethod/NLACreate";
import { SpinLogo } from "../../utils/SpinLogo";
import { NLAUpdate } from "../../services/updateMethod/NLAUpdate";
import { FormField } from "../../utils/FormField";

export const NonLocalAcco = () => {
  const { NLADatas, errorEmpID } = NLACreate();
  const { NLAUpdateFun } = NLAUpdate();
  const { empPIData,IDData, NLAData } = useContext(DataSupply);

  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [notification, setNotification] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showTitle, setShowTitle] = useState("");


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const IDDetails =NLAData?NLAData.find((user) => user.empID === emp.empID): {};
            const IDDatas =IDData?IDData.find((user) => user.empID === emp.empID): {};
            // if (!IDDetails ) return null;
            return { ...emp, ...IDDetails, ...IDDatas };
          })
          .filter(Boolean);
        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [empPIData, NLAData]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NonLocalAccovalidationSchema),
  });

  const searchResult = (result) => {
    console.log("Search Result:", result);  // Log the result to confirm the empID is included
    const keysToSet = ["empID", "empBadgeNo", "name", "accommodation", "accommodationAddress"];
    keysToSet.forEach((key) => setValue(key, result[key]));
  };

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);  // Check if empID is part of the data

    if (!data.empID) {
      console.error("empID is missing");
      return;
    }

    try {
      const checkingPITable = empPIData.find(
        (match) => match.empID === data.empID
      );
      const checkingIDTable = NLAData.find(
        (match) => match.empID === data.empID
      );

      if (checkingIDTable && checkingPITable) {
        const NLAValue = {
          ...data,
          PITableID: checkingPITable.id,
          IDTable: checkingIDTable.id,
        };
        console.log("Updating data with empID:", data.empID);  // Log before calling the update function
        await NLAUpdateFun({ NLAValue });
        setShowTitle("Details updated successfully");
        setNotification(true);
      } else {
        const NLACreValue = {
          ...data,
        };
        console.log("Creating new data for empID:", data.empID);  // Log before calling the create function
        await NLADatas({ NLACreValue });
        setShowTitle("Details saved successfully");
        setNotification(true);
      }
  
    } catch (error) {
      console.log(error);
      console.error("Error submitting data to AWS:", JSON.stringify(error, null, 2));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  p-10"  onClick={() => {
      setFilteredEmployees([]);
    }}>
      <div className="w-full flex items-center justify-between gap-5">
        <Link to="/employee" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
        <p className="flex-1 text-center mt-2 text_size_2 uppercase">
          Non-Local Accommodation in Brunei
        </p>
        <div className="flex-1">
          <SearchDisplay
            searchResult={searchResult}
            newFormData={allEmpDetails}
            searchIcon2={<IoSearch />}
            placeholder="Employee Id"
            rounded="rounded-lg"
            filteredEmployees={filteredEmployees}
            setFilteredEmployees={setFilteredEmployees}
          />
        </div>
      </div>
      <form
        className="h-screen   w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-end items-center py-7 mt-2">
          <div className="max-w-sm">
            <FormField
              label="Employee ID"
              register={register}
              name="empID"
              type="text"
              value={watch("empID") || ""}
              placeholder="Enter Employee ID"
              errors={errors}
            />
            {errorEmpID && (
              <p className="text-[red] text-[13px] text-center">{errorEmpID}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-20">
          <FormField
            label="Badge Number"
            register={register}
            name="empBadgeNo"
            type="text"
            value={watch("empBadgeNo") || ""}
            errors={errors}
          />
          <FormField
            label="Name"
            register={register}
            name="name"
            type="text"
            errors={errors}
          />
          <div>
            <label className="block text_size_5">Accommodation</label>
            <select
              className="input-field select-custom"
              {...register("accommodation")}
            >
              <option value=""></option>
              <option value="Company Premises">Company Premises</option>
              <option value="Own Premises">Own Premises</option>
            </select>
            {errors.accommodation && (
              <p className="text-[red] text-[12px] mt-1">
                {errors.accommodation.message}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <label className="block text_size_5">Accommodation Address</label>
            <input
              type="text"
              className="input-field"
              {...register("accommodationAddress")}
            />
            {errors.accommodationAddress && (
              <p className="text-[red] text-[12px] mt-1">
                {errors.accommodationAddress.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center my-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>
        
        {notification && (
          <SpinLogo
            text={showTitle}
            notification={notification}
            path="/employee"
          />
        )}
      </form>
    </div>
  );
};