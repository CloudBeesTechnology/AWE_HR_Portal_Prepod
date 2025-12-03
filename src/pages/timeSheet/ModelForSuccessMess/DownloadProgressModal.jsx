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
          <div className="w-full bg-grey/80 rounded-full h-6 p-0.5 shadow-inner overflow-hidden">
            {/* <!-- Filled Progress --> */}
            <div
              className={`relative h-5 bg-gradient-to-r ${
                progress === 100
                  ? "from-primary/100 to-primary/100"
                  : "from-primary/100 to-primary/30 bg-white"
              }  rounded-full overflow-hidden transition-[width] duration-700 ease-in-out`}
              style={{ width: `${progress}%` }}
            >
              {/* <!-- Shimmer highlight inside filled part --> */}
              {progress < 100 ? (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent  from-primary/100 to-primary/10 to-transparent animate-[shimmer_1.8s_linear_infinite] rounded-full "></div>
              ) : (
                ""
              )}
            </div>
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
