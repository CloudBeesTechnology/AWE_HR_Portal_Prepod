import { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
export const PopupForSave = ({
  fileNameForSuccessful,
  setCloseSavedModel,
  backToHome,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (fileNameForSuccessful && fileNameForSuccessful) {
      setIsModalOpen(true);
    }
  }, [fileNameForSuccessful]);

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="relative ">
            <IoCheckmarkCircleSharp className="absolute  left-60 -top-5 text-5xl text-[#2BEE48] z-50" />
            <div className="border w-[509px] h-[218px]  border-lite_grey rounded shadow-md  bg-white pt-8">
       
              <div>
                <div className=" flex flex-col items-center gap-5">
                  <p className="text-dark_grey text_size_5">
                    Saved Successfully
                  </p>
                  <p className={` text-dark_grey text-[16px] `}>
                    {fileNameForSuccessful}
                  </p>

                  <button
                    className=" p-2 rounded border-[#FEF116] bg-[#FEF116] text-dark_grey text_size_5 w-52"
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                      setCloseSavedModel(false);
                      backToHome(0);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

