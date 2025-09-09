import { useRef } from "react";
import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

export const ImageViewerModal = ({
  lastUploadUrl,
  closeModal,
}) => {
  const imgRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => imgRef.current,
    pageStyle: `
      @page {
        size: auto;
        margin: 0mm;
      }
      body { 
        margin: 0;
        padding: 0;
      }
    `,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b border-lite_grey">
          <h3 className="text-lg font-semibold">Image Viewer</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Image Viewer */}
        <div ref={imgRef} className="flex-grow overflow-y-auto p-4">
          <img
            src={lastUploadUrl}
            alt="Document Preview"
            className="w-full h-auto rounded"
          />
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-center p-4 border-t border-lite_grey">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-primary rounded flex items-center gap-2">
              <FaDownload />
              <a href={lastUploadUrl} download>
                Download
              </a>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-primary rounded flex items-center gap-2"
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};