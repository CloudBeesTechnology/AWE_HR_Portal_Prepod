import { useState } from "react";
import emailImage from "../../assets/login/emailImage.jpg";
import logo from "../../assets/logo/logo-with-name.svg";
import { EmailSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const ForgotEmail = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(EmailSchema) });
  const [error, setError] = useState("");

  const Submit = handleSubmit(async (data) => {
  //  console.log(data);
   navigate("/forgotOtp");
  });


  return (
    <section className="screen-size mx-auto flex h-screen">
      <div className="flex-1 border-r-2  border-[#E9E9E9] center ">
        <img
          className="w-full max-w-[500px]"
          src={emailImage}
          alt="Rightside Pic not found"
        />
      </div>
      <div className="flex-1 justify-center flex items-center gap-8 py-20 flex-col w-full px-3">
        <div>
          {" "}
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt="Logo not found"
          />
        </div>
        <article className=" space-y-2 mt-10">
          <h1 className="text-dark_grey title">Welcome Back</h1>
          <p className="text-dark_grey text_size_8">
            Hello again! Dive into your tasks and let's make today productive.
          </p>
        </article>
        {error && <p className="text-red">{error}</p>}
        <section  className=" space-y-5">
          <div className="w-[400px] space-y-1">
            <label htmlFor="userName" className="text-dark_grey text_size_8">
            User Name
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 px-3 w-full">
              <input
                className="outline-none py-2 w-full"
                type="text"
                id="userName"
                name="userName"
                {...register("userName")}
              />
            </div>
            <p className="text-[red] text-sm my-3 ml-5">
              {errors.name?.message}
            </p>
          </div>
               
          <div className="center ">
            <button className="primary_btn text_size_4 mt-5" onClick={Submit}>
            Next
            </button>
          </div>
          <hr className="border-[1.5px] text-[#B3B3B3]" />

          <Link to="/login" className="center ">
            <button className="text-blue text_size_4" >
            Cancel
            </button>
          </Link>
         
        </section>
      </div>
    </section>
  );
};

export default ForgotEmail;
