import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegMinusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { FormField } from "../../utils/FormField";
import { AddInsuranceSchema } from "../../services/EmployeeValidation";
import { SpinLogo } from "../../utils/SpinLogo";
import { generateClient } from "@aws-amplify/api";
import { createInsuranceType } from "../../graphql/mutations";
import { listInsuranceTypes } from "../../graphql/queries";

export const Insurance = () => {
  const client = generateClient();
  const [notification, setNotification] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddInsuranceSchema),
    defaultValues: {
      insDetails: [{ company: "" }],
    },
  });

  const {
    fields: insuranceFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "insDetails",
  });

  const handleAddInsurance = () => {
    append({ company: "" });
  };

  const groupByTypeIns = (data) => {
    const grouped = {};
    data.forEach((item) => {
      if (grouped[item.typeIns]) {
        grouped[item.typeIns] = [
          ...new Set([...grouped[item.typeIns], ...item.insDetails]),
        ];
      } else {
        grouped[item.typeIns] = item.insDetails;
      }
    });
    return Object.entries(grouped).map(([typeIns, insDetails]) => ({
      typeIns,
      insDetails,
    }));
  };

  const onSubmit = async (data) => {
    try {
      const InsTypeData = {
        typeIns: data.typeIns,
        insDetails: data.insDetails.map((detail) => detail.company),
      };

      const response = await client.graphql({
        query: createInsuranceType,
        variables: { input: InsTypeData },
      });
      // console.log("Successfully submitted data:", response);
      setNotification(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        let allInsuranceTypes = [];
        let nextToken = null;

        do {
          const response = await client.graphql({
            query: listInsuranceTypes,
            variables: {
              nextToken: nextToken,
            },
          });

          const rawData = response?.data?.listInsuranceTypes?.items || [];

          allInsuranceTypes = [...allInsuranceTypes, ...rawData];

          nextToken = response?.data?.listInsuranceTypes?.nextToken;
        } while (nextToken);

        const groupedData = groupByTypeIns(allInsuranceTypes);

        setInsuranceData(groupedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchInsuranceData();
  }, []);

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto  pt-2 px-10 mt-10 bg-[#F5F6F1CC]"
      >
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-x-14">
            <FormField
              name="typeIns"
              type="text"
              placeholder="Enter Insurance Type"
              label="Insurance Type"
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex justify-end items-end">
            <button
              type="button"
              onClick={handleAddInsurance}
              className="mt-4 flex items-center text-medium_grey text-[25px]"
            >
              <CiSquarePlus /> <span className="text-[16px]"> Add Company</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-14">
            {insuranceFields.map((field, index) => (
              <div key={field.id} className="mb-2 relative">
                <FormField
                  name={`insDetails.${index}.company`}
                  type="text"
                  placeholder="Enter Insurance Company"
                  label="Insurance Company"
                  register={register}
                  errors={errors}
                />
                {insuranceFields.length > 1 &&
                  index !== 0 && ( // Add condition to exclude first element
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-10 -right-10 text-medium_grey text-[25px]"
                    >
                      <FaRegMinusSquare />
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <button type="submit" className="primary_btn">
            Save
          </button>
        </div>
      </form>

      {notification && (
        <SpinLogo
          text="Insurance Type Saved Successfully"
          notification={notification}
          path="/insuranceHr"
        />
      )}

      {loading && (
        <p className="text-center mt-10">Loading insurance data...</p>
      )}

      {error && <p className="text-center mt-10 text-red-600">{error}</p>}

      <div className="mt-20">
        <p className="text-xl font-bold mb-10 p-3 rounded-lg border-2 border-[#FEF116] bg-[#FFFEF4] w-[250px]">
          View Insurance Info
        </p>

        {insuranceData.length > 0 ? (
          <div className=" h-[400px] overflow-y-auto scrollBar">
            <table className="w-full text-center">
              <thead className=" bg-[#939393] text-white">
                <tr>
                  <th className="pl-4 py-4 rounded-tl-lg">Insurance Type</th>
                  <th className="pl-4 py-4 rounded-tr-lg">
                    Insurance Companies
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white cursor-pointer">
                {insuranceData.map((data, index) => (
                  <tr
                    key={index}
                    className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="pl-4 py-4">{data.typeIns}</td>
                    <td className="pl-4 py-4">
                      {data.insDetails.map((detail, detailIndex) => (
                        <div key={detailIndex}>{detail}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-10">
            No insurance information available.
          </p>
        )}
      </div>
    </section>
  );
};
