import { useState } from "react";
import otpImage from "../../assets/login/otpImage.jpg";
import logo from "../../assets/logo/logo-with-name.svg";
import { EmailSchema } from "../../services/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { generateClient } from "@aws-amplify/api";


const ForgotOtp = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(EmailSchema) });
  const [error, setError] = useState("");
  const [otp, setOtp] = useState('');

  const SendOtp = async () => {
    try {
      // Simulate sending OTP to server for verification
      // const storedOtp = sessionStorage.getItem('EmailOtp');
      if (otp) {
        alert('OTP verified, registration complete');
        navigate('/forgotPassword');
      } else {
        setError('OTP is Expired or Invalid');
      }
    } catch (error) {
      setError('Error verifying OTP');
    }
  };
  // const Submit = handleSubmit(async (data) => {
  //  console.log(data);
  //  navigate("/forgotOtp");
  // });

  return (
    <section className="screen-size mx-auto flex h-screen">
      <div className="flex-1 border-r-2  border-[#E9E9E9] center ">
        <img
          className="w-full max-w-[500px]"
          src={otpImage}
          alt="Rightside Pic not found"
        />
      </div>
      <div className="flex-1 flex justify-center items-center gap-8 py-20 flex-col w-full px-3">
        <div>
          {" "}
          <img
            className="w-full max-w-[450px]"
            src={logo}
            alt="Logo not found"
          />
        </div>
        <article className="text-center space-y-2 mt-10">
          <h1 className="text-dark_grey title">Welcome Back</h1>
          <p className="text-dark_grey text_size_8">
            Hello again! Dive into your tasks and let's make today productive.
          </p>
        </article>
        {error && <p className="text-red">{error}</p>}
        <section  className="space-y-5">
        <div className="mb-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span>-</span>}
            inputStyle={{
              outline: 'none',
              width: '50px',
              height: '50px',
              margin: '0 5px',
              fontSize: '20px',
              borderRadius: '8px',
              border: '1px solid #ced4da',
            }}
            renderInput={(props) => <input {...props} />}
          /> 
        </div>
               
          {/* <div className="center ">
            <button className="primary_btn text_size_4 my-5" onClick={Submit}>
            Next
            </button>
          </div> */}
            <div className="center ">
            <button className="primary_btn text_size_4 my-5" onClick={SendOtp}>
            Next
            </button>
          </div>
      
        </section>
      </div>
    </section>
  );
};

export default ForgotOtp;
