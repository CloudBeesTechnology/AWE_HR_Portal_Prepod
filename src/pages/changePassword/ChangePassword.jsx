import { useEffect, useState } from "react";
import lock from "../../assets/changePassword/lock.svg";
import logo from "../../assets/logo/logo-with-name.svg";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
  updatePassword,
} from "@aws-amplify/auth";
import { ChangePasswordSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { generateClient } from "@aws-amplify/api";
import { listUsers } from "../../graphql/queries";
import { updateUser } from "../../graphql/mutations";

const client = generateClient();

export const ChangePassword = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(ChangePasswordSchema) });
  const [error, setError] = useState("");

  const Submit = handleSubmit(async (data) => {
    const { password: newPassword, currentPassword: oldPassword } = data;
    try {

      const currentUser = await getCurrentUser();
      const userID = localStorage.getItem("userID")?.toUpperCase();
      if (currentUser) {
        // Call updatePassword directly
        await updatePassword({
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
        const userData = await client.graphql({
          query: listUsers,
          variables: { filter: { empID: { eq: userID } } },
        });

        const id = userData?.data?.listUsers?.items[0].id;
        await client
          .graphql({
            query: updateUser,
            variables: {
              input: {
                id: id,
                password: newPassword,
              },
            },
          })
          .then(async(res) => {
            console.log(res);
            localStorage.removeItem("userID");
            localStorage.removeItem("userType");
            await signOut()
            window.location.href = "/login";
          });

        console.log("Password reset successfully");
      }
    } catch (error) {
      console.log(error);

      setError(error.message);
    }
  });
  return (
    // <Authenticator>

    <section className="screen-size mx-auto flex absolute top-0 left-0 min-h-screen ">
      <div className="flex-1 border-r-2 border-[#E9E9E9] center">
        <img
          className="w-full max-w-[450px]"
          src={lock}
          alt=" Rightside Image not found"
        />
      </div>
      <div className="flex-1 flex items-center gap-8 py-20 flex-col w-full">
        <div>
          {" "}
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt=" Logo not found"
          />
        </div>

        {error && <p className="text-red">{error}</p>}
        <section className=" space-y-5">
          <h4 className="title text-center">Change Password</h4>
          <div className="w-[400px] space-y-1">
            <label htmlFor="userID" className="text-dark_grey text_size_8">
              Login ID
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 px-3 w-full">
              <input
                className="outline-none py-2 w-full"
                type="text"
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
            <label
              htmlFor="currentPassword"
              className="text-dark_grey text_size_8"
            >
              Current Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                className="outline-none py-2 w-full"
                type={isVisible1 ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                {...register("currentPassword")}
              />
              {isVisible1 ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible1(!isVisible1)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible1(!isVisible1)}
                />
              )}
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.password?.message}
            </p>
          </div>
          <div className="w-[400px] space-y-1">
            <label htmlFor="password" className="text-dark_grey text_size_8">
              New Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                className="outline-none py-2 w-full"
                type={isVisible2 ? "text" : "password"}
                id="password"
                name="password"
                {...register("password")}
              />
              {isVisible2 ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible2(!isVisible2)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible2(!isVisible2)}
                />
              )}
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.password?.message}
            </p>
          </div>
          <div className="w-[400px] space-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-dark_grey text_size_8"
            >
              Confirm Password
            </label>
            <div className="shadow-md shadow-[#00000040] border border-[#D3D3D3] overflow-hidden rounded-lg py-1 pl-3 pr-4 w-full center">
              <input
                className="outline-none py-2 w-full"
                type={isVisible3 ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
              {isVisible3 ? (
                <IoEyeOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible3(!isVisible3)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-2xl text-[#837E7E]"
                  onClick={() => setIsVisible3(!isVisible3)}
                />
              )}
            </div>
            <p className="text-[red] text-sm my-2 ml-5">
              {errors.password?.message}
            </p>
          </div>
          <div className="center pb-5">
            <Link
              to="/dashboard"
              className="primary_btn text_size_4 my-5"
              onClick={Submit}
            >
              Update
            </Link>
          </div>
          <hr className="border-[1.5px] text-[#B3B3B3]" />
        </section>
      </div>
    </section>
    // </Authenticator>
  );
};
