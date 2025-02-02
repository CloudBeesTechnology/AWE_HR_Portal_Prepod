import React, { useEffect, useState } from "react";
import { EmpRequisitionForm } from "./EmpRequisitionForm";
import { format } from "date-fns";
import { RequisitionReviewForm } from "./RequisitionReviewForm";
import { listEmpRequisitions } from "../../graphql/queries";
import { generateClient } from "@aws-amplify/api";


const client = generateClient();

export const ApplyEmployReq = () => {
  const [requisitionData, setRequisitionData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);


    // Fetch requisition data
  const fetchRequisitionData = async () => {
    try {
      const response = await client.graphql({ query: listEmpRequisitions });
      const fetchedData = response?.data?.listEmpRequisitions?.items || [];
      setRequisitionData(fetchedData);
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

  // Handle "View" link click
  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setIsReviewFormVisible(true); 
  };

  // Close the review form
  const handleReviewFormClose = () => {
    setSelectedRequest(null); 
    setIsReviewFormVisible(false);
  };

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[green]"
      : status === "Pending"
      ? "text-dark_grey"
      : "text-[#E8A317]";
  };

  return (
    <section className="min-h-screen bg-[#F5F6F1]">
      <div className="screen-size">
        {/* Header Buttons */}
        <div className="flex justify-between my-8">
          <button className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
            My Requisition List
          </button>
          <button
            className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold"
            onClick={() => setIsFormVisible(true)}
          >
            Apply New Requisition
          </button>
        </div>

        {/* Error Display */}
        {error && <div className="text-[red]">{error}</div>}

        {/* Requisition Table */}
        {requisitionData.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead className="bg-[#939393] text-white rounded-lg">
                <tr>
                  <th className="pl-4 py-3">Requestor</th>
                  <th className="pl-4">Department</th>
                  <th className="py-4">Position</th>
                  <th className="py-4">Project</th>
                  <th className="py-4">Quantity</th>
                  <th className="py-4">Submitted Date</th>
                  <th className="py-4">Form</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center">
                {requisitionData.map((item) => (
                  <tr key={item.id} className="shadow-[0_3px_6px_1px_rgba(0,0,0,0.2)] hover:bg-medium_blue">
                    <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">{item.reqName}</td>
                    <td className="py-4">{item.department}</td>
                    <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">{item.position}</td>
                    <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">{item.project}</td>
                    <td className="py-4 ">{item.quantity}</td>
                    <td className="py-4 ">{format(new Date(item.createdAt), "dd-MM-yyyy")}</td>             

                    <td className="py-4">
                      <a
                        href="#"
                        className="text-[blue] font-semibold border-b-2 cursor-pointer"
                        onClick={() => handleViewClick(item)}
                      >
                        View
                      </a>
                    </td>
                    <td className={`py-4 font-semibold ${getStatusClass(item.status)}`}>
                     {item.status ? item.status : "Pending"}
                      </td>                    
                    <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">{item.remarkReq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No requisition data available.</p>
        )}

        {/* Requisition Form Modal */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-grey bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-xl">
              <EmpRequisitionForm onClose={() => setIsFormVisible(false)} />
            </div>
          </div>
        )}

        {/* Requisition Review Modal */}
        {isReviewFormVisible && selectedRequest && (
          <RequisitionReviewForm
            isVisible={isReviewFormVisible} 
            onClose={handleReviewFormClose} 
            isMdView={false} 
            selectedRequest={selectedRequest} 
          />
        )}
      </div>
    </section>
  );
};




