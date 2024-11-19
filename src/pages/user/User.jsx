import { useContext, useEffect, useState } from "react";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { Pagination } from "../leaveManagement/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { UserVF } from "./UserVF";
import { DataSupply } from "../../utils/DataStoredContext";

export const User = () => {
  const { empPIData, userData, workInfoData } = useContext(DataSupply);
  const [userDetails, setUserDetails] = useState([]);
  const [allEmpDetails, setAllEmpDetails] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [sendData, setSendData] = useState([]);
  const [workValue, setWorkValue] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  // pagination process
  const [currentPage, setCurrentPage] = useState(1); // updated by hari
  const [rowsPerPage, setRowsPerPage] = useState(5); // updated by hari

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    // Sort userData globally before slicing for pagination
    const sortedData = allEmpDetails.sort((a, b) => {
      const regex = /\d+$/;

      // Extract numeric part and pad it
      const numPartA = a.empID.match(regex)
        ? a.empID.match(regex)[0].padStart(5, "0")
        : "";
      const numPartB = b.empID.match(regex)
        ? b.empID.match(regex)[0].padStart(5, "0")
        : "";

      // Extract prefix part and convert to lower case for case-insensitive comparison
      const prefixA = a.empID.replace(regex, "").toLowerCase();
      const prefixB = b.empID.replace(regex, "").toLowerCase();

      // Compare the prefixes first
      if (prefixA !== prefixB) {
        return prefixA.localeCompare(prefixB);
      }

      // If prefixes are the same, compare the numeric parts
      return numPartA.localeCompare(numPartB);
    });
    // console.log(sortedData, "sorted");

    const paginatedData = sortedData.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setFilteredData(paginatedData);
  }, [currentPage, rowsPerPage, userDetails]);

  const totalPages = Math.ceil(userDetails.length / rowsPerPage);

  const ViewFormShow = () => {
    setViewForm(!viewForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = empPIData
          .map((emp) => {
            const userDetails = userData
              ? userData.find((user) => user.empID === emp.empID)
              : {};
            const workInfoValue = workInfoData
              ? workInfoData.find((work) => work.empID === emp.empID)
              : {};
            // console.log(workInfoData);

        
            return {
              ...emp,
              ...userDetails,
              ...workInfoValue,
            };
          })
          .filter(Boolean);
        // console.log(mergedData);

        setUserDetails(mergedData);
        setAllEmpDetails(mergedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [userData, empPIData,workInfoData]);

  const searchUserList = async (userData) => {
    try {
      const result = await userData;
      setUserDetails(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
// console.log(userData);

  const handleAddUser = () => {
    const allValue = {
      userValue: userData,
      employeeValue: empPIData,
      workValue: workInfoData,
    };
    // console.log(allValue);

    navigate("/addNewForm", { state: { addUserData: allValue } });
  };

  return (
    <section className=" flex justify-center px-10 py-20 bg-[#F8F8F8] h-screen relative">
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
            />
          </div>
        </section>
        <div className="flex flex-col flex-grow">
          <div className="px-1 ">
            <table className="w-full mx-auto bg-white pt-10">
              <thead>
                <tr className="text_size_5 text-dark_grey ">
                  <th className="px-6 text-start py-3">EMP ID</th>
                  {/* <th className="px-6 text-start  py-3">User ID</th> */}
                  <th className="px-6 text-start  py-3">Name</th>
                  <th className="px-6 text-start py-3">Type</th>
                  <th className="px-6 text-start py-3">Email Id</th>
                  <th className="px-6 text-start py-3">Password</th>
                  <th className="px-6 text-start py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((val, i) => {
                    return (
                      <tr
                        key={i}
                        onClick={() => {
                          ViewFormShow();
                          setSendData(val);
                        }}
                      >
                        <td className="px-6 py-2">{val.empID}</td>
                        {/* <td className="px-6 py-2">{val.empID}</td> */}
                        <td className="px-6 py-2">{val.name}</td>
                        <td className="px-6 py-2">{val.selectType}</td>
                        <td className="px-6 py-2">{val.email}</td>
                        <td className="px-6 w-[200px] py-2 text-center">
                          <input
                            type="password"
                            className="outline-none w-full"
                            value={val.password}
                            readOnly
                          />
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex gap-5">
                            <span
                              onClick={() => {
                                handleTransferData(val);
                              }}
                            >
                              <RiEditLine />
                            </span>
                            <span>
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
          </div>

          <div className="flex justify-end mt-auto py-8 px-10">
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
