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
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    const { userName } = data;
    console.log("Form data submitted:", data); // Log form data
    console.log("Username from form data:", userName); // Log the userName

    if (!userName) {
      setError("Username is required to reset password.");
      console.log("Error: Username is empty");
      return;
    }
    setIsLoading(true);
    try {
      // Log the userName before making the API call
      console.log("Attempting to call resetPassword with username:", userName);
      const output = await resetPassword({
        username: userName,
      });

      const { nextStep } = output;
      switch (nextStep.resetPasswordStep) {
        case "CONFIRM_RESET_PASSWORD_WITH_CODE":
          const codeDeliveryDetails = nextStep.codeDeliveryDetails;
          console.log(`
            Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}
          `);
          // Collect the confirmation code from the user and pass to confirmResetPassword.
          break;
        case "DONE":
          console.log("Successfully reset password.");
          break;
      }

      console.log("Password reset initiated successfully.");
      navigate("/forgotOtp"); // Navigate to OTP verification page
    } catch (err) {
      console.error("Error calling resetPassword:", err); // Log the error
      if (err.code === "UserNotFoundException") {
        setError("User not found. Please check your username/email.");
      } else if (err.code === "NotAuthorizedException") {
        setError("User is not authorized. Please try again later.");
      } else if (err.code === "LimitExceededException") {
        setError("Too many requests. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }finally {
      setIsLoading(false);
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
        <h1 className="text-dark_grey title">Welcome Back</h1>
          <p className="text-dark_grey text_size_8">
            Hello again! Dive into your tasks and let's make today productive.
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
                placeholder="Enter your User ID"
                {...register("userName")}
              />
            </div>
            <p className="text-red-500 text-sm my-3 ml-5">
              {errors.userName?.message}
            </p>
          </div>

          <div className="center">
<button
  type="submit"
  className="primary_btn text_size_4 mt-5"
  disabled={isLoading}
>
  {isLoading ? "Sending..." : "Next"}
</button>
</div> 
        </form>

        <hr className="border-[1.5px] text-[#B3B3B3]" />
                 <p className="text-grey center gap-2">Back to 
         <Link to="/login" className="center ">
            <span className="text-blue text_size_4" >
            Login
            </span>
          </Link>
         </p>
      </div>
    </section>
  );
};

export default ForgotEmail;