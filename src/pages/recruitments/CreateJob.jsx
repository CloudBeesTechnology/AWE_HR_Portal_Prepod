import { useForm } from "react-hook-form";
import { hiringJobSchema } from "../../services/Validation";
import { FormField } from "../../utils/FormField";
import { WorkDataPass } from "../employees/WorkDataPass";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { CreateJobFunc } from "../../services/createMethod/CreateJobFunc";
import { SpinLogo } from "../../utils/SpinLogo";

export const CreateJob = () => {
  const { SubmitJobData } = CreateJobFunc();

  const [notification, setNotification] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(hiringJobSchema),
  });

  const onSubmit = handleSubmit((data) => {
    try {
      SubmitJobData({ jobValue: data });
      setShowTitle("Posted Job successfully");
      setNotification(true);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <section className="bg-[#F5F6F1CC] mx-auto p-10">
      <div className="w-full flex items-center gap-5 mb-10">
        <Link to="/hiringJob" className="text-xl text-grey">
          <FaArrowLeft />
        </Link>
        <h6 className="text-center flex-1 mt-2 text_size_2 uppercase">
          Job Details
        </h6>
      </div>

      <div className="form-group flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-5 ">
          {WorkDataPass.hiringJob.map((field, index) => {
            return (
              <div key={index}>
                <FormField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  register={register}
                  errors={errors}
                />
              </div>
            );
          })}
        </div>

        <div className="md:col-span-2 form-group">
          <label className="mb-1 text_size_5">Job description</label>
          <textarea
            {...register("jobDesc")}
            className="resize-none w-full p-2 mt-1 border bg-lite_skyBlue border-lite_grey rounded-md outline-none"
            rows="1"
          ></textarea>
          {errors.jobDesc && (
            <p className="text-[red] text-[13px] mt-1">
              {errors.jobDesc.message}
            </p>
          )}
        </div>

        <div className="w-full center">
          <button className="primary_btn" onClick={onSubmit}>
            Post
          </button>
        </div>
      </div>
      {notification && (
        <SpinLogo
          text={showTitle}
          notification={notification}
          path="/hiringJob"
        />
      )}
    </section>
  );
};
