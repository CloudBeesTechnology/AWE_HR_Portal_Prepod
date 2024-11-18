import { useEffect, useState } from "react";
import rightImage from "../../assets/login/laptop.svg";
import logo from "../../assets/logo/logo-with-name.svg";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LoginSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { autoSignIn } from "aws-amplify/auth";
import {
  confirmSignIn,
  getCurrentUser,
  signIn,
  updatePassword,
} from "@aws-amplify/auth";
import { Link } from "react-router-dom";
import { generateClient } from "@aws-amplify/api";
import { listUsers } from "../../graphql/queries";

const client = generateClient();

 const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const [error, setError] = useState("");

  const Submit = handleSubmit(async (data) => {
  
    try {
      const username = data.userID;
      const password = data.password;
      const { isSignedIn, userId, nextStep } = await signIn({
        username,
        password,
      });
      const currentUser = await getCurrentUser();
      if (isSignedIn || currentUser) {
        const userToStore = currentUser ? currentUser.username : username;
        localStorage.setItem("userID", userToStore);
        // console.log(userToStore);

        try {
          const resultUser = await client.graphql({
            query: listUsers,
          })

          const userType = resultUser?.data?.listUsers?.items.find(
            (val) => val.empID === userToStore.toUpperCase()
          )?.selectType;
          localStorage.setItem("userType", userType);

          window.location.href = "/dashboard";
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Handle error (e.g., show an error message)
        }

        // window.location.href = "/dashboard";
      }
      // else {
      //   if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD") {
      //     console.log("Redirecting to change password page...");
      //     window.location.href = "/changePassword";
      //   } else if (
      //     nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
      //   ) {
      //     console.log("Custom challenge required, handling...");
      //   } else {
      //     console.log("Unknown next step:", nextStep);
      //   }
      // }
    } catch (error) {
      setError(error.message);
    }
  });

  return (
    // <Authenticator>

    <section className="screen-size mx-auto flex h-screen">
      <div className="flex-1 border-r-2  border-[#E9E9E9] center">
        <img
          className="w-full max-w-[450px]"
          src={rightImage}
          alt=" Rightside Image not found"
        />
      </div>
      <div className="flex-1 flex items-center gap-8 py-20 flex-col w-full px-3">
        <div>
          {" "}
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt=" Logo not found"
          />
        </div>
        <article className="text-center space-y-2">
          <h1 className="text-dark_grey title">Welcome Back</h1>
          <p className="text-dark_grey text_size_8">
            Hello again! Dive into your tasks and let's make today productive.
          </p>
        </article>
        {error && <p className="text-red">{error}</p>}
        <section className=" space-y-5">
          <div className="w-[400px] space-y-1">
            <label htmlFor="userID" className="text-dark_grey text_size_8">
              Login ID
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 px-3 w-full">
              <input
                className="outline-none py-2 w-full"
                type="text"
                placeholder=""
                id="userID"
                name="userID"
                {...register("userID")}
              />
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.userID?.message}
            </p>
          </div>
          <div className="w-[400px] space-y-1">
            <label htmlFor="password" className="text-dark_grey text_size_8">
              Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                className="outline-none py-2 w-full"
                type={isVisible ? "text" : "password"}
                placeholder=""
                id="password"
                name="password"
                {...register("password")}
              />
              {isVisible ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible(!isVisible)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible(!isVisible)}
                />
              )}
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.password?.message}
            </p>
            {/* <div className="flex justify-end my-3">
              <p className="text-[#7A7A7A] text_size_7">Forgot password?</p>
            </div> */}
          </div>
          <div className="center ">
            <button className="primary_btn text_size_4 my-5" onClick={Submit}>
              Login
            </button>
          </div>
          {/* <hr className="border-[1.5px] text-[#B3B3B3]" />
          <div className="center">
            <Link
              to="/changePassword"
              className="text-[#7A7A7A] text_size_6 text-center my-5"
            >
              Change Password
            </Link>
          </div> */}
        </section>
      </div>
    </section>
    // </Authenticator>
  );
};

export default Login