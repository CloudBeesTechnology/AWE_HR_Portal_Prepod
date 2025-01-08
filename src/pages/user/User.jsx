import { useContext, useEffect, useState } from "react";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { Pagination } from "../leaveManagement/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { UserVF } from "./UserVF";
import { DataSupply } from "../../utils/DataStoredContext";
import { UserDelete } from "../../services/deleteMethod/UserDelete";

export const User = () => {
  const { empPIData, userData, workInfoData } = useContext(DataSupply);
  const { SubmitDeletedUser } = UserDelete();

  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [sendData, setSendData] = useState([]);
  const [workValue, setWorkValue] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const navigate = useNavigate();
  // console.log(userData);

  // pagination process
  const [currentPage, setCurrentPage] = useState(1); // updated by hari
  const [rowsPerPage, setRowsPerPage] = useState(30); // updated by hari
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    // Determine the data to paginate (either search results or all employee details)
    const dataToPaginate =
      searchResults.length > 0 ? searchResults : allEmpDetails;

    // Sort data globally before slicing for pagination
    const sortedData = dataToPaginate.sort((a, b) => {
      const regex = /\d+$/;

      const numPartA = a.empID.match(regex)
        ? a.empID.match(regex)[0].padStart(5, "0")
        : "";
      const numPartB = b.empID.match(regex)
        ? b.empID.match(regex)[0].padStart(5, "0")
        : "";

      const prefixA = a.empID.replace(regex, "").toLowerCase();
      const prefixB = b.empID.replace(regex, "").toLowerCase();

      if (prefixA !== prefixB) {
        return prefixA.localeCompare(prefixB);
      }

      return numPartA.localeCompare(numPartB);
    });

    const paginatedData = sortedData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setFilteredData(paginatedData);
  }, [currentPage, rowsPerPage, allEmpDetails, searchResults]);

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : allEmpDetails.length) /
      rowsPerPage
  );

  const ViewFormShow = () => {
    setViewForm(!viewForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = userData
          .map((emp) => {
            const EmpDetails = empPIData.find(
              (user) => user.empID === emp.empID
            );
            const workInfoValue = workInfoData
              ? workInfoData.find((work) => work.empID === emp.empID)
              : {};
            if (!EmpDetails) return null;

            return {
              ...emp,
              ...EmpDetails,
              ...workInfoValue,
            };
          })
          .filter(Boolean)
          .filter((user) => user.status === "Active");
        // console.log(mergedData);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userData, empPIData]);

  const searchUserList = (searchResults) => {
    setSearchResults(searchResults);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleTransferData = async (data) => {
    const storedValue = {
      data: data,
      title: "Edit User",
    };
    const allValue = {
      storedValue: storedValue,
      userValue: userData,
      employeeValue: empPIData,
      workValue: workInfoData,
    };
    navigate("/addNewForm", { state: { editUserData: allValue } });
  };

  const handleAddUser = () => {
    const allValue = {
      userValue: userData,
      employeeValue: empPIData,
      workValue: workInfoData,
    };
    // console.log(allValue);

    navigate("/addNewForm", { state: { addUserData: allValue } });
  };
  const handleDelete = (data) => {
    const deleteUserData = userData.find((item) => item.empID === data.empID);
    // console.log(deleteUserData);
    SubmitDeletedUser({ deleteUserData });
  };
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <section
      className=" flex justify-center px-10 py-20 bg-[#F8F8F8] min-h-screen relative"
      onClick={() => {
        setFilteredEmployees([]);
      }}
    >
      <div className="bg-white flex flex-col gap-10 rounded-b-lg shadow-lg max-w-[99%] w-full">
        <article className="bg-[#E1E1E2] py-3 shadow-md rounded-t-lg text-center">
          <h1 className="text-dark_grey text-2xl font-semibold">User List</h1>
        </article>
        <section>
          <div className="flex items-center justify-between  px-14">
            <div
              className="bg-primary text-dark_grey text_size_3 rounded-md px-4 py-2"
              onClick={handleAddUser}
            >
              {" "}
              <span className="text-2xl">+</span> Add
            </div>
            <Searchbox
              allEmpDetails={allEmpDetails}
              searchUserList={searchUserList}
              searchIcon2={<IoSearch />}
              placeholder="Employee ID"
              border="rounded-lg"
              filteredEmployees={filteredEmployees}
              setFilteredEmployees={setFilteredEmployees}
            />
          </div>
        </section>
        <div className="flex flex-col flex-grow">
          <div className="leaveManagementTable h-[70vh] max-h-[calc(70vh-7rem)] w-full overflow-y-auto  px-5">
            {filteredData && filteredData.length > 0 ? (
              <table className="w-full mx-auto bg-white pt-10">
                <thead className="px-5 bg-[#939393] text-white sticky top-0 left-0">
                  <tr className="text_size_5  px-5">
                    <th className="px-5 text-start py-3">S.No</th>
                    <th className="px-5 text-start py-3">EMP ID</th>
                    <th className="px-5 text-start  py-3">Name</th>
                    <th className="px-5 text-start py-3">Type</th>
                    <th className="px-5 text-start py-3">Official Email Id</th>
                    <th className="px-5 text-start py-3">Password</th>
                    <th className="px-5 text-center py-3">ViewForm</th>
                    <th className="px-5 text-start py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((val, i) => {
                      const displayIndex = startIndex + i + 1;
                      return (
                        <tr key={i} className="shadow-lg ">
                          <td className="px-5 py-3 ">{displayIndex}</td>
                          <td className="px-5 py-3 ">{val.empID}</td>
                          <td className="px-5 py-3 break-words overflow-hidden ">
                            {val.name}
                          </td>
                          <td className="px-5 py-3 ">{val.selectType}</td>
                          <td className="px-5 py-3 break-words overflow-hidden ">
                            {val.officialEmail}
                          </td>
                          <td className="py-3 text-center break-words overflow-hidden">
                            <input
                              type="password"
                              className="outline-none w-full text-center  "
                              value={val.password}
                              readOnly
                            />
                          </td>
                          <td className=" py-3">
                            <span
                              className=" text-[blue] underline flex justify-center"
                              onClick={() => {
                                ViewFormShow();
                                setSendData(val);
                              }}
                            >
                              View
                            </span>
                          </td>
                          <td className="px-5 py-2">
                            <div className="flex gap-5">
                              <span
                                onClick={() => {
                                  handleTransferData(val);
                                }}
                              >
                                <RiEditLine />
                              </span>
                              <span
                                onClick={() => {
                                  handleDelete(val);
                                }}
                              >
                                <RiDeleteBin6Line />
                              </span>
                              {/* <div
                      className="h-3 w-3 bg-[#08A757] rounded-full "
                      onClick={() => {
                        popUping();
                        ListUserData();
                      }}
                    ></div> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-6 text-center text-dark_ash text_size_5"
                      >
                        No User List Available Here
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <p className="px-6 py-6 text-center text-dark_ash text_size_5">
                Loading Data...
              </p>
            )}
          </div>

          <div className="flex justify-center mt-auto">
            {filteredData && filteredData.length > 0 && (
              <div className="ml-[650px] flex justify-between px-10 py-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    if (newPage >= 1 && newPage <= totalPages) {
                      setCurrentPage(newPage);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {viewForm && <UserVF data={sendData} onclose={ViewFormShow} />}

      {/* {popUp && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">  list
          <StatusPopUp setPopUp={setPopUp} />
        </div>
      )} */}
    </section>
  );
};
