import { useState } from "react";
import resetImage from "../../assets/login/resetImage.jpg";
import logo from "../../assets/logo/logo-with-name.svg";
import { newPasswordSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ForgotPassword = () => {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(newPasswordSchema) });
  const [error, setError] = useState("");

  const Submit = handleSubmit(async (data) => {
    console.log(data);
    navigate("/login");
  });

  return (
    <section className="screen-size mx-auto flex h-screen">
      <div className="flex-1 border-r-2 border-[#E9E9E9] center">
        <img
          className="w-full max-w-[450px]"
          src={resetImage}
          alt="Rightside Pic not found"
        />
      </div>
      <div className="flex-1 flex items-center gap-8 py-20 flex-col w-full px-3">
        <div>
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt="Logo not found"
          />
        </div>
        <article className="space-y-2 mt-10">
          <h1 className="text-dark_grey title">Reset Password</h1>
        </article>
        {error && <p className="text-red">{error}</p>}
        <section className="space-y-5">
          {/* New Password Field */}
          <div className="w-[400px] space-y-1">
            <label htmlFor="newPassword" className="text-dark_grey text_size_8">
              New Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                className="outline-none py-2 w-full"
                type={isNewPasswordVisible ? "text" : "password"}
                placeholder=""
                id="newPassword"
                name="newPassword"
                {...register("newPassword")}
              />
              {isNewPasswordVisible ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() =>
                    setIsNewPasswordVisible(!isNewPasswordVisible)
                  }
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() =>
                    setIsNewPasswordVisible(!isNewPasswordVisible)
                  }
                />
              )}
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.newPassword?.message}
            </p>
          </div>

          {/* Re-enter Password Field */}
          <div className="w-[400px] space-y-1">
            <label htmlFor="rePassword" className="text-dark_grey text_size_8">
              Re-enter Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                className="outline-none py-2 w-full"
                type={isRePasswordVisible ? "text" : "password"}
                placeholder=""
                id="rePassword"
                name="rePassword"
                {...register("rePassword")}
              />
              {isRePasswordVisible ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
                />
              )}
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.rePassword?.message}
            </p>
          </div>

          {/* Submit Button */}
          <div className="center">
            <button className="primary_btn text_size_4 my-5" onClick={Submit}>
              Submit
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ForgotPassword;
