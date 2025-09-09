import { useRef } from "react";
import { FaTimes, FaDownload, FaPrint } from "react-icons/fa";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useReactToPrint } from "react-to-print";

export const PdfViewerModal = ({
  lastUploadUrl,
  closeModal,
}) => {
  const pdfRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    pageStyle: `
      @page {
        size: auto;
        margin: 0mm;
      }
      body { 
        margin: 0;
        padding: 0;
      }
      .pdf-page {
        page-break-after: always;
      }
    `,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b border-lite_grey">
          <h3 className="text-lg font-semibold">PDF Viewer</h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div ref={pdfRef} className="flex-grow overflow-y-auto pdf-page">
          {lastUploadUrl ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={lastUploadUrl}
                renderError={(error) => (
                  <div className="p-4 text-red-500">
                    Failed to load PDF: {error.message}
                    <div className="text-sm mt-2">URL: {lastUploadUrl}</div>
                  </div>
                )}
              />
            </Worker>
          ) : (
            <div className="p-4 text-center">No PDF file available</div>
          )}
        </div>

        {/* Pagination Controls */}
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