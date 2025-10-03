import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export const DownloadProgressModal = ({
  isOpen,
  progress,
  message,
  setShowDownloadModal,
}) => {
  const nav = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          className="absolute top-3 right-3 text-dark_grey cursor-pointer"
          onClick={() => {
            setShowDownloadModal(false);
            nav("/timeSheet");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }}
        >
          {progress === 100 ? <IoIosCloseCircle size={24} /> : ""}
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center">
          {progress === 100 ? "Success! Your file is ready." : "Downloading..."}
        </h3>

        <div className="mb-4">
          <div className="w-full bg-medium_grey rounded-full h-6 flex items-center justify-start p-0.5">
            <div
              className="bg-primary h-5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text_size_5">
            <p className="text-dark_grey">{message}</p>
            <div className=" text-sm text-gray">{progress}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
