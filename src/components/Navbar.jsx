import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../assets/logo/logo-with-name.svg";
import avatar from "../assets/navabar/avatar.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import { Profile } from "../pages/profile/Profile";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../graphql/queries";
import { getUrl } from "@aws-amplify/storage";
import { useNotifiCenter } from "../hooks/useNotifiCenter";

const client = generateClient();
const Navbar = () => {
  const { unreadCount } = useNotifiCenter();
  useEffect(() => {}, [unreadCount]);

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentTimeValue, setCurrentTimeValue] = useState("");
  const [currentDateValue, setCurrentDateValue] = useState("");
  const [getPPhotoString, setGetPPhotoString] = useState(null);
  const [callAfterUploaded, setCallAfterUploaded] = useState(false);
  const [loading, setLoading] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    profilePhoto: "",
    name: "",
    email: "",
    contactNo: "",
  });

  const [userID, setUserID] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserName(userType);
    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const currentDate = `${date}/${month}/${year}`;
      setCurrentDateValue(currentDate);
      let hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12;

      const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const paddedSeconds = seconds < 10 ? "0" + seconds : seconds;

      const formattedTime = `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
      const formattedDateTime = `${currentDate} ${formattedTime}`;
      setCurrentTimeValue(formattedDateTime);
    };

    const intervalId = setInterval(updateTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array, so it runs only once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
  }, []);

  const handleAfterUpload = async () => {
    setCallAfterUploaded(!callAfterUploaded);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let allEmployees = [];
        let nextToken = null;

        do {
          const response = await client.graphql({
            query: listEmpPersonalInfos,
            variables: {
              nextToken: nextToken,
            },
          });

          allEmployees = [
            ...allEmployees,
            ...response.data.listEmpPersonalInfos.items,
          ];

          nextToken = response.data.listEmpPersonalInfos.nextToken;
        } while (nextToken);

        const empPersonalInfos = allEmployees;

        if (empPersonalInfos.length === 0) {
          return;
        }

        // Find the employee matching the userID, ignoring case
        const userPersonalInfo = empPersonalInfos.find(
          (emp) =>
            emp.empID.toString().toLowerCase() ===
            userID.toString().toLowerCase()
        );

        if (userPersonalInfo) {
          let splitfunc = userPersonalInfo?.profilePhoto.split("/").pop();

          let profilePhotoString =
            splitfunc === "null"
              ? "User-avatar.svg.png"
              : userPersonalInfo?.profilePhoto;

          setGetPPhotoString(profilePhotoString);
          const linkToStorageFile = async (pathUrl) => {
            const result = await getUrl({
              path: pathUrl,
            });
            setLoading(false);
            return setPersonalInfo({
              name: userPersonalInfo?.name,
              profilePhoto: result?.url?.toString(),
              email: userPersonalInfo?.email,
              contactNo: userPersonalInfo?.contactNo || "",
            });
          };

          linkToStorageFile(profilePhotoString);
        } else {
          // console.log(`No matching employee found for userID: ${userID}`);
        }
      } catch (err) {
        // console.log("Error fetching employee personal infos:", err);
      }
    };
    if (userID) {
      fetchData();
    }
  }, [userID, callAfterUploaded]);

  return (
    <nav className="center bg-medium_white h-28 fixed top-0 w-full z-50 shadow-sm">
      <div className="screen-size flex justify-between items-center gap-10 py-7 px-3">
        <section className="flex-initial">
          <div className="max-w-[250px] w-full">
            <img className="w-full" src={logo} alt="not found" />
          </div>
        </section>
        {/* searchbox disable */}
        {/* <section className="flex-1 flex-grow-1 center">
          <div className="center w-[90%] gap-3 py-2 px-5 shadow-md shadow-[#00000033] rounded-full bg-white">
            <span>
              <IoSearchOutline className="text-ash text-2xl font-semibold" />
            </span>
            <input
              className="outline-none bg-[transparent] text-lg text-ash w-full"
              type="text"
              placeholder="Search"
            />
          </div>
        </section> */}
        <section className="flex-initial flex item-center gap-5 ">
          <div className=" my-auto">
            <p className="relative">
              <Link to="/notifications">
                {" "}
                <IoMdNotificationsOutline className="text-2xl" />
              </Link>

              {unreadCount > 0 && (
                <span className="absolute -top-[4px] right-[2px] rounded-full h-2 w-2 text-dark_grey bg-[#d04545] text-xs center">
                  {" "}
                </span>
              )}

              {/* // )} */}
            </p>
          </div>
          <div className="flex items-center gap-5 px-5">
            <div className="space-y-2 ">
              <p className="text-dark_grey text_size_5">
                {" "}
                Welcome {personalInfo.name}
              </p>
              <article className="flex gap-5 text_size_7 text-dark_grey">
                {/* <p>{currentDateValue}</p> */}

                <p>{currentTimeValue}</p>
              </article>
            </div>
            <div className="relative">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full relative center overflow-hidden shadow-md shadow-[#00000033]"
                  onClick={() => toggleDropdown()}
                >
                  <img
                    className="w-full object-center"
                    src={personalInfo?.profilePhoto || avatar}
                    alt="avatar not found"
                    onError={(e) => (e.target.src = avatar)}
                  />
                </div>
                <p
                  className="absolute -right-2 bottom-0 h-5 w-5 rounded-full bg-[#D9D9D9] center"
                  onClick={() => toggleDropdown()}
                >
                  <GoPencil className="text-xs text-dark_grey" />
                </p>
              </div>
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-12 -left-40 bg-white shadow-md  py-2 text-dark_grey text-[15px]  w-[250px]  flex flex-col"
                >
                  <Profile
                    setIsOpen={setIsOpen}
                    name={personalInfo?.name}
                    email={personalInfo?.email}
                    profilePhoto={personalInfo?.profilePhoto}
                    contactNo={personalInfo?.contactNo}
                    getPPhotoString={getPPhotoString}
                    setPersonalInfo={setPersonalInfo}
                    handleAfterUpload={handleAfterUpload}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </nav>
  );
};
export default Navbar;
