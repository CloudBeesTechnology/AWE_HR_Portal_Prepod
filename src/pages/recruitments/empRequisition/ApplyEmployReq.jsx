import React, { useEffect, useState } from "react";
import { EmpRequisitionForm } from "./EmpRequisitionForm";
import { format } from "date-fns";
import { RequisitionReviewForm } from "./RequisitionReviewForm";
import { listEmpRequisitions } from "../../../graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { Pagination } from "../../leaveManagement/Pagination";

const client = generateClient();
export const ApplyEmployReq = () => {
  const [requisitionData, setRequisitionData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userID, setUserID] = useState("");
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
  }, []);

  const fetchRequisitionData = async () => {
    try {
      const userID = localStorage.getItem("userID");
      if (!userID) {
        throw new Error("User ID is not available in localStorage");
      }

      let allRequisitions = [];
      let nextToken = null;
      let hasMoreData = true;

      do {
        const response = await client.graphql({
          query: listEmpRequisitions,
          variables: {
            filter: {
              requestorID: { eq: userID },
            },
            nextToken,
          },
        });

        const fetchedData = response?.data?.listEmpRequisitions?.items || [];
        allRequisitions = [...allRequisitions, ...fetchedData];

        nextToken = response?.data?.listEmpRequisitions?.nextToken;
        hasMoreData = !!nextToken;
      } while (hasMoreData);

      setRequisitionData(allRequisitions);
      setError(null);
    } catch (err) {
      // console.error("Error fetching requisition data:", err);
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
    setIsReviewFormVisible(false);
  };

  const getStatusClass = (status) => {
    return status === "Rejected"
      ? "text-[red]"
      : status === "Approved"
      ? "text-[#339933]"
      : status === "Pending"
      ? "text-[#E8A317]"
      : "text-[#E8A317]";
  };

  // Handle body overflow for modals
  useEffect(() => {
    if (isFormVisible || isReviewFormVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormVisible, isReviewFormVisible]);

  const totalPages = Math.ceil(requisitionData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = page * rowsPerPage;
  const paginatedData = requisitionData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <section className="bg-[#F5F6F1]">
        <div className="screen-size">
          <div className="flex justify-between my-8">
            <p className="bg-[#faf362] py-2 px-3 rounded-lg text-[18px] font-semibold">
              My Requisition List
            </p>
            {userType === "Manager" && (
              <button
                className="hover:bg-[#f4bf71] border-2 border-[#f4bf71] py-2 px-3 rounded-lg text-[18px] font-semibold"
                onClick={() => setIsFormVisible(true)}
              >
                Apply New Requisition
              </button>
            )}
          </div>

          {error && <div className="text-[red]">{error}</div>}

          {paginatedData.length > 0 ? (
            <div className="recruitmentTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto rounded-lg">
              <table className="w-full">
                <thead className="bg-[#939393] text-white sticky top-0 rounded-lg">
                  <tr>
                    {/* <th className="pl-4 py-3">Requestor</th> */}
                    {/* <th className="pl-4">Department</th> */}
                    <th className="py-4">S.No</th>
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
                  {paginatedData
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-center border-b-2 bg-white border-[#C7BCBC] text-[15px] text-[#303030] hover:bg-medium_blue"
                      >
                        {/* <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">{item.reqName}</td> */}
                        {/* <td className="py-4">{item.department}</td> */}
                        <td className="py-4">{startIndex + index + 1}</td>
                        <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">
                          {item.position}
                        </td>
                        <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">
                          {item.project}
                        </td>
                        <td className="py-4 ">{item.quantity}</td>
                        <td className="py-4 ">
                          {format(new Date(item.createdAt), "dd-MM-yyyy")}
                        </td>

                        <td className="py-4">
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
                        <td className="py-4 max-w-[200px] text-ellipsis overflow-hidden">
                          {item.remarkReq}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">No Requisitions Found</p>
          )}

          {/* Requisition Form Modal */}
          {isFormVisible && (
            <div className="fixed inset-0 bg-grey bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-xl">
                <EmpRequisitionForm
                  userID={userID}
                  onClose={() => setIsFormVisible(false)}
                />
              </div>
            </div>
          )}

          {/* Requisition Review Modal */}
          {isReviewFormVisible && selectedRequest && (
            <RequisitionReviewForm
              isVisible={isReviewFormVisible}
              onClose={handleReviewFormClose}
              selectedRequest={selectedRequest}
            />
          )}
        </div>
      </section>
      {paginatedData.length > 0 && (
        <div className="ml-20 flex justify-center py-10">
          <div className="w-[60%] flex justify-start mt-10 px-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
