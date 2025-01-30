import { useState } from "react";
import emailImage from "../../assets/login/emailImage.jpg";
import logo from "../../assets/logo/logo-with-name.svg";
import { EmailSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "@aws-amplify/auth";

const ForgotEmail = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(EmailSchema) });

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    const { userName } = data;

    if (!userName) {
      setError("Username is required to reset password.");
      return;
    }
    try {
      await resetPassword({ username: userName });
      alert("An OTP has been sent to your registered email/phone.");
      localStorage.setItem("username", userName);
      localStorage.setItem("FPSWD", "FPswd");
      localStorage.removeItem("FEmail");
      window.location.href = "/forgotPassword";
    } catch (err) {
      if (err.code === "UserNotFoundException") {
        setError("User not found. Please check your username/email.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  });

  return (
    <section className="screen-size mx-auto flex h-screen">
      <div className="flex-1 border-r-2 border-[#E9E9E9] center">
        <img
          className="w-full max-w-[500px]"
          src={emailImage}
          alt="Rightside Pic not found"
        />
      </div>
      <div className="flex-1 justify-center flex items-center gap-8 py-20 flex-col w-full px-3">
        <div>
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt="Logo not found"
          />
        </div>
        <article className="space-y-2 mt-10 text-center">
          <h1 className="text-dark_grey title">Forgot Your Password?</h1>
          <p className="text-dark_grey text_size_8">
            Enter your user id below to receive a password reset link.
          </p>
        </article>

        {error && <p className="text-red-500">{error}</p>}

        <form className="space-y-5 w-[400px]" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label htmlFor="userName" className="text-dark_grey text_size_8">
              User ID
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 px-3 w-full">
              <input
                className="outline-none py-2 w-full"
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your user id"
                {...register("userName")}
              />
            </div>
            <p className="text-[red] text-xs my-3">
              {errors.userName?.message}
            </p>
          </div>
          <div className="center">
            <button type="submit" className="primary_btn text_size_4 mt-5">
              Next
            </button>
          </div>
        </form>

        <hr className="border-[1.5px] text-[#B3B3B3] w-[60%]" />
        <div
          className="center"
          onClick={() => {
            localStorage.removeItem("FEmail");
            window.location.href = "/login";
          }}
        >
          <button className="">
            Back to {""}
            <span className="text-[#159AB1]">login</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForgotEmail;
