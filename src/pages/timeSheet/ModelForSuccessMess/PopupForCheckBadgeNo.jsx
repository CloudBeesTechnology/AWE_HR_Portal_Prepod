const PopupForCheckBadgeNo = ({ handleDecision, alertMessage }) => {
  return (
    <div className="p-6">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ease-in-out">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 transform opacity-100 scale-95 animate-fade-in">
          <h2 className="text_size_2  mb-4 text-center">
            Alert!
          </h2>
          <p className="text-dark_grey mb-6 text_size_7 leading-relaxed text-center">
            {alertMessage}
          </p>
          <div className="flex justify-center items-center border-lite_grey">
            <button
              onClick={() => handleDecision("Denied")}
              className="px-5 py-1 text_size_5 text-dark_grey border-lite_grey border bg-primary rounded"
            >
              OK
            </button>
            {/* <button
              onClick={() => handleDecision("Allowed")}
              className="px-5 py-2 w-full rounded-br-2xl  text-dark_grey text_size_7  "
            >
              Yes, Continue
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupForCheckBadgeNo;
