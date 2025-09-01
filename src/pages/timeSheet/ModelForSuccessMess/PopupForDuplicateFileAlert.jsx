import { IoMdCloseCircleOutline } from "react-icons/io";

const PopupForDuplicateFileAlert = ({
  onClose,
  fileNameForSuccessful,
  title,
  message,
  buttonName,
  popupIdentification,
}) => {
  return (
    <div
      className={`${
        popupIdentification === "duplicateRecords" &&
        "fixed inset-0 bg-black/50 z-50"
      } flex items-center justify-center`}
    >
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg text-dark_grey grid grid-rows-[auto_1fr_auto]">
        {/* Title row */}
        <div className="grid grid-cols-[1fr_auto] justify-items-center items-center ">
          <h2 className="text_size_2 mx-10 mb-4 text-center ">{title}</h2>
          <i
            className="cursor-pointer mb-auto text-dark_grey text-2xl"
            onClick={() => {
              onClose?.();
            }}
          >
            <IoMdCloseCircleOutline />
          </i>
        </div>

        <p className="mb-1.5">
          <span className="text_size_5">File Name : </span>
          <span className="px-3 text_size_6">{fileNameForSuccessful}</span>
        </p>

        <p className="text_size_6 mb-2 text-justify">{message}</p>

        <div className={`flex justify-center text-dark_grey text_size_5 pt-1`}>
          <button
            className="px-6 py-2 bg-primary rounded"
            onClick={async () => {
              if (buttonName === "OK") {
                onClose?.();
              } else if (buttonName === "Save") {
                onClose?.();
              } else {
                onClose?.();
              }
            }}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForDuplicateFileAlert;
