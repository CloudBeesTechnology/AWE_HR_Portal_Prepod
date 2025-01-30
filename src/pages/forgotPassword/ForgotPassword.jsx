import { useState, useEffect } from "react";
import resetImage from "../../assets/login/resetImage.jpg";
import logo from "../../assets/logo/logo-with-name.svg";
import { newPasswordSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";

const ForgotPassword = () => {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState(null);

  // Correctly passing resolver with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const [error, setError] = useState("");
  const username = localStorage.getItem("username");
  // console.log(username);

  useEffect(() => {
    if (otpTimer > 0) {
      const timerInterval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else {
      setIsResendDisabled(false);
      setIsOtpExpired(true);
    }
  }, [otpTimer]);

  const handleResendOtp = async (otp) => {
    try {
      await resetPassword({ username: username });
      alert("OTP has been resent to your email.");
      setOtpTimer(60);
      setIsResendDisabled(true);
      setIsOtpExpired(false);
    } catch (err) {
      // console.log(username);

      setError(err.message || err);
    }
  };

  const handleOtpSubmit = async (data) => {
    const { otp, newPassword } = data;

    try {
      await confirmResetPassword({
        username,
        confirmationCode: otp,
        newPassword,
      });
      localStorage.removeItem("username");
      localStorage.removeItem("FPSWD");
      alert("Password reset successful. Please log in.");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || err);
    }
  };

  // console.log("USERNAME",username);

  return (
    <section className="screen-size mx-auto flex h-full">
      <div className="flex-1 border-r-2 border-[#E9E9E9] center">
        <img
          className="w-full max-w-[450px]"
          src={resetImage}
          alt="Rightside Pic not found"
        />
      </div>
      <div className="flex-1 flex items-center gap-8 py-14 flex-col w-full px-3">
        <div>
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt="Logo not found"
          />
        </div>
        <article className="space-y-2 mt-5">
          <h1 className="text-dark_grey title">Reset Password</h1>
        </article>
        {error && <p className="text-red">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit(handleOtpSubmit)}>
          {/* OTP Field */}
          {/* OTP Field */}
          <div className="w-[400px] space-y-1">
            <label htmlFor="otp" className="text-dark_grey text_size_8">
              Enter OTP
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                type="number"
                className="outline-none py-2 w-full"
                placeholder="Enter OTP"
                value={otp} // Use otp state here
                {...register("otp")}
                // disabled={isOtpExpired}
                onChange={(e) => setOtp(e.target.value)} // Update otp state on change
              />
            </div>
            {isOtpExpired && !otp && (
              <p className="text-red text-xs">
                OTP has been expired, Please resend OTP.
              </p>
            )}
            <p className="text-[red] text-xs">{errors.otp?.message}</p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-blue text-sm font font-semibold"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
            </button>
          </div>

          {/* New Password Field */}
          <div className="w-[400px] space-y-1">
            <label htmlFor="newPassword" className="text-dark_grey text_size_8">
              New Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                className="outline-none py-2 w-full"
                placeholder="Enter new password"
                {...register("newPassword")}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {isNewPasswordVisible ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                />
              )}
            </div>
            <p className="text-[red] text-xs my-2">
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
                type={isRePasswordVisible ? "text" : "password"}
                className="outline-none py-2 w-full"
                placeholder="Re-enter your password"
                id="rePassword"
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
            <p className="text-[red] text-xs my-2">
              {errors.rePassword?.message}
            </p>
          </div>

          {/* Submit Button */}
          <div className="center">
            <button type="submit" className="primary_btn text_size_4 my-3">
              Submit
            </button>
          </div>
          <hr className="border-[1.5px] text-[#B3B3B3] w-[100%]" />
          <div
            className="center"
            onClick={() => {
              localStorage.removeItem("FPSWD");
              window.location.href = "/login";
            }}
          >
            <button className="">
              Back to {""}
              <span className="text-blue">Login</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
