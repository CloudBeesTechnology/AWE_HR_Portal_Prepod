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
    <section>
      {isModalOpen && (
        <section className="fixed inset-0 flex items-center justify-center z-50">
          {/* <section className="rounded shadow-md bg-white center flex-col">
            <div className="flex justify-end w-[509px] ">
              <div
                className="p-2 cursor-pointer"
                onClick={() => {
                  // toggleModal();
                  clearUseRefObject();
                  setIsModalOpen(!isModalOpen);
                  setEnsureExcelFile(false);
                  setFileName("");
                }}
              >
                <p>
                  <MdCancel className="text-3xl text-grey" />
                </p>
              </div>
            </div>

         
            {/* {ensureExcelFile === true ? (
              <div className=" flex flex-col items-center gap-5  w-[509px] h-[218px]">
                <p className="text-dark_grey text_size_5">Filename</p>
                <p className={` text-dark_grey text-[16px] `}>{fileName}</p>

                <button
                  className=" p-2 rounded border-[#FEF116] bg-[#FEF116] text-dark_grey text_size_5 w-52"
                  onClick={() => {
                    UploadFile();
                    setIsModalOpen(!isModalOpen);
                    setEnsureExcelFile();
                    setFileName();
                  }}
                >
                  UPLOAD
                </button>
              </div>
            ) : (
              <div className=" flex flex-col items-center justify-center gap-5 text-dark_grey text_size_5 max-w-sm my-10 w-full">
                <p>Filename</p>
                <p>{fileName}</p>
                <p className="text-[red] text-center"> Error: Please upload CSV or XLS file type only </p>
            
              </div>
            )} */}

          {/*  */}
          {/* </div> */}
          {!ensureExcelFile && (
            <div className=" flex flex-col relative items-center justify-center space-y-2 text-dark_grey text_size_5 max-w-sm  w-full bg-white shadow-md p-10">
             
             
              <p
                className="absolute right-2 top-2"
                onClick={() => {
                  clearUseRefObject();

                  setEnsureExcelFile(true);
                  setFileName("");
                }}
              >
                <MdCancel className="text-3xl text-grey " />
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
    </section>
  );
};
// "border w-72 m-5 border-white rounded shadow-md flex flex-col items-center gap-2 py-5"
