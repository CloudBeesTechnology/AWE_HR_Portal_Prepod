const PopupForDuplicateFileAlert = ({ onClose, fileNameForSuccessful }) => {
  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg text-dark_grey">
        <h2 className="text_size_2 mb-4 text-center ">
          Duplicate Detection
        </h2>
        <p className="mb-1">
          <span className="text_size_5">File Name : </span>
          <span className="px-3 text_size_6">{fileNameForSuccessful}</span>
        </p>
        {/* This Excel sheet has already been uploaded by the Time Keeper. Would
        you like to replace it or keep the existing one? */}
        <p className="text_size_6 mb-2">
          This Excel sheet has already been uploaded by the Time Keeper.
        </p>
        <div className="flex justify-end text-dark_grey text_size_5">
          <button
            className="px-4 py-2 bg-primary rounded "
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForDuplicateFileAlert;
