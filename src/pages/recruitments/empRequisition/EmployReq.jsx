import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Searchbox } from "../../../utils/Searchbox";
import { RequisitionReviewForm } from "../empRequisition/RequisitionReviewForm";
import { RemarksDialog } from "../empRequisition/RemarksDialog";
import { format } from "date-fns";
import { listEmpRequisitions } from "../../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { SearchListOfCandy } from "../Search/SearchListOfCandy";
const client = generateClient();

export const EmployReq = ({}) => {
  const [requisitionData, setRequisitionData] = useState([]);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRemarksRequest, setSelectedRemarksRequest] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [remarksSubmitted, setRemarksSubmitted] = useState({});

  const fetchRequisitionData = async () => {
    try {
      let allRequisitions = [];
      let nextToken = null;
  
      do {
        const response = await client.graphql({
          query: listEmpRequisitions,
          variables: {
            nextToken,
          },
        });
  
        const fetchedData = response?.data?.listEmpRequisitions?.items || [];
        allRequisitions = [...allRequisitions, ...fetchedData];
  
        nextToken = response?.data?.listEmpRequisitions?.nextToken;
      } while (nextToken);
  
      setRequisitionData(allRequisitions);
      setError(null);
    } catch (err) {
      console.error("Error fetching requisition data:", err);
      setError("Failed to fetch requisition data");
      setRequisitionData([]);
    }
  };
  
  useEffect(() => {
    fetchRequisitionData();
  }, []);
  

  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setIsReviewFormVisible(true);
  };

  const handleReviewFormClose = () => {
    setSelectedRequest(null);
    setIsReviewFormVisible(false);
  };

  const handleStatusChange = (updatedRequest) => {
    setRequisitionData((prevData) =>
      prevData.map((item) =>
        item.id === updatedRequest.id
          ? { ...item, status: updatedRequest.status }
          : item
      )
    );
  };

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-[#E8A317]";
  };

  const closeRemarksDialog = () => {
    setSelectedRemarksRequest(null);
  };

  const saveRemarks = async (requestId, remarks) => {
    setRequisitionData((prevData) =>
      prevData.map((item) =>
        item.id === requestId ? { ...item, remarkReq: remarks } : item
      )
    );

    // Update remarksSubmitted and persist to localStorage
    setRemarksSubmitted((prevState) => {
      const updatedState = { ...prevState, [requestId]: true };
      localStorage.setItem("remarksSubmitted", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  useEffect(() => {
    if (isReviewFormVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReviewFormVisible]);
  
 
  return (
    <section className="screen-size w-full mt-5 mb-1">
      <div className="mb-8 flex justify-between items-center">
        <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
          Employee Requisition Review
        </button>
        <SearchListOfCandy
          allEmpDetails={requisitionData}
          searchUserList={setFilteredData}
          searchIcon2={<IoSearch />}
          placeholder="Search by Position"
        />
      </div>

      {error && <div className="text-[red] text-center mb-4">{error}</div>}

      {requisitionData.length > 0 ? (
        <div className="h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-[#939393] text-white sticky top-0 rounded-lg">
              <tr>
                <th className="pl-4 py-4">Manager</th>
                {/* <th className="py-4">Department</th> */}
                <th className="py-4">Position</th>
                {/* <th className="py-4">Project</th> */}
                <th className="py-4">Quantity</th>
                <th className="py-4">Received Date</th>
                <th className="py-4">Form</th>
                <th className="py-4">Status</th>
                <th className="py-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {(filteredData.length > 0 ? filteredData : requisitionData)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <tr
                    key={item.id}
                    className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue"
                  >
                    <td className="py-4 pl-4 max-w-[200px] text-ellipsis overflow-hidden">
                      {item.reqName}
                    </td>
                    {/* <td className="py-4">{item.department}</td> */}
                    <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">
                      {item.position}
                    </td>
                    {/* <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">
                    {item.project}
                  </td> */}
                    <td className="py-4">{item.quantity}</td>
                    <td className="py-4">
                      {format(new Date(item.createdAt), "dd-MM-yyyy")}
                    </td>
                    <td className="py-4 px-2">
                      <a
                        href="#"
                        className="text-[blue] font-semibold border-b-2 cursor-pointer"
                        onClick={() => handleViewClick(item)}
                      >
                        View
                      </a>
                    </td>
                    <td
                      className={`py-4 font-semibold ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status ? item.status : "Pending"}
                    </td>
                    <td className="py-4 center gap-2">
                      <span className="max-w-[200px] text-ellipsis overflow-hidden">
                        {item.remarkReq}
                      </span>
                      <div className="w-6 h-6 flex justify-center items-center">
                        {localStorage.getItem("userType") === "Manager" &&
                          !item.remarkReq && (
                            <FaPencilAlt
                              className="text-[brown] cursor-pointer"
                              onClick={() => setSelectedRemarksRequest(item)}
                            />
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4">No Requisitions Found</p>
      )}

      <RequisitionReviewForm
        isVisible={isReviewFormVisible}
        onClose={handleReviewFormClose}
        selectedRequest={selectedRequest}
        onStatusChange={handleStatusChange}
      />

      <RemarksDialog
        isOpen={!!selectedRemarksRequest}
        onClose={closeRemarksDialog}
        requestId={selectedRemarksRequest?.id}
        initialRemarks={selectedRemarksRequest?.remarkReq || ""}
        onRemarkUpdated={saveRemarks}
      />
    </section>
  );
};
