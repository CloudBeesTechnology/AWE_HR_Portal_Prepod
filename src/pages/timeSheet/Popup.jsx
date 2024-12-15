import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
export const Popup = ({
  fileName,
  ensureExcelFile,
  UploadFile,
  setEnsureExcelFile,
  setFileName,
  clearUseRefObject,

}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (fileName && fileName) {
      setIsModalOpen(true);
    }
  }, [fileName]);

  return (
    <div>
      {isModalOpen && (
        <section className=" inset-0 flex items-center justify-center z-50 ">
          {ensureExcelFile === false && (
            <div className=" flex flex-col relative items-center justify-center space-y-2 text-dark_grey text_size_5 max-w-sm  w-full bg-white shadow-md p-10 border border-lite_grey">
              <p
                className="absolute right-2 top-2"
                onClick={() => {
                  clearUseRefObject();
                
                  setEnsureExcelFile(true);
                  setFileName(null);
                }}
              >
                <MdCancel className="text-3xl text-grey cursor-pointer" />
              </p>
              <p>Filename</p>
              <p className="text-center">{fileName}</p>
              <p className="text-[red] text-center">
                {" "}
                Error: Please upload CSV or XLS file type only{" "}
              </p>
            </div>
           )} 
        </section>
     )} 
    </div>
 
 
  );
};
// "border w-72 m-5 border-white rounded shadow-md flex flex-col items-center gap-2 py-5"
