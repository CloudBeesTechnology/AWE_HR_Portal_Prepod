
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

// User View Form stand for UserVF
export const UserVF = ({ data, onclose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <section className="fixed top-0 left-0 inset-0 bg-black bg-opacity-80 center w-full h-screen z-[60]">
      <div className="bg-white w-full max-w-xl max-h-[90vh]  rounded-lg relative overflow-y-auto">
        <div className="p-6">
          <div className="relative center mb-8">
            {" "}
            <h6 className="text-xl font-bold underline text-dark_grey">
              View Form
            </h6>
            <button
              className="absolute top-0 right-4 w-8 h-8 border rounded-full text-xl"
              onClick={onclose}
            >
              &times;
            </button>
          </div>
          {[
            { label: "UserID", value: data.empID },
            { label: "Name", value: data.name },
            { label: "Type", value: data.selectType },
            { label: "Official Email", value: data.officialEmail },
            {
              label: "Password",
              value: isPasswordVisible ? data.password : "••••••••",
              isPassword: true,
            },
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
              <strong className="w-full">{item.label}</strong>
              <span className="flex items-center gap-3 col-span-2">
            : &nbsp;{item.value}
            {item.isPassword && (
             <div className=" center"> <button
             type="button"
             className=" text-dark_grey underline text-xl"
             onClick={togglePasswordVisibility}
           >
             {isPasswordVisible ? <FaEye /> : <FaEyeSlash/>}
           </button></div>
            )}
          </span>            </div>
          ))}
          <div className="center mt-7">
            <button className="primary_btn text_size_4" onClick={onclose}>Okay</button>
          </div>
        </div>
      </div>
    </section>
  );
};
