import { IoSearchOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../assets/logo/logo-with-name.svg";
import { MdOutlineMail } from "react-icons/md";
import avatar from "../assets/navabar/avatar.jpeg";
import { Link } from "react-router-dom";
import { signOut } from "@aws-amplify/auth";
import { useEffect, useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import { Profile } from "../pages/profile/Profile";
import { generateClient } from "@aws-amplify/api";
import { listEmpPersonalInfos } from "../graphql/queries";
import { getUrl } from "@aws-amplify/storage";

const client = generateClient();
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");

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

  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const currentDate = `${date}/${month}/${year}`;
  // console.log(currentDate);
  let hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Pad minutes and seconds with leading zeroes if needed
  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const paddedSeconds = seconds < 10 ? "0" + seconds : seconds;

  // Format the time
  const currentTime = `${hours}:${paddedMinutes}:${paddedSeconds} ${ampm}`;
  // console.log(currentTime);
  setInterval(() => {
    currentTime;
  }, 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empPersonalInfosData = await client.graphql({
          query: listEmpPersonalInfos,
        });

        const empPersonalInfos =
          empPersonalInfosData?.data?.listEmpPersonalInfos?.items || [];

        // Check if any data is fetched
        if (empPersonalInfos.length === 0) {
          // console.log("No employee data found.");
          return;
        }

        // Find the employee matching the userID, ignoring case
        const userPersonalInfo = empPersonalInfos.find(
          (emp) => emp.empID.toLowerCase() === userID.toLowerCase()
        );

        if (userPersonalInfo) {
          const profilePhotoString = userPersonalInfo?.profilePhoto;
          let fixedProfilePhotoString = profilePhotoString.replace(/=/g, ":");
          fixedProfilePhotoString = fixedProfilePhotoString.replace(
            /(\w+)(?=:)/g,
            '"$1"'
          ); // Wrap keys in double quotes
          fixedProfilePhotoString = fixedProfilePhotoString.replace(
            /(?<=:)([^,}\]]+)(?=[,\}\]])/g,
            '"$1"'
          ); // Wrap string values in double quotes
          if (!fixedProfilePhotoString.startsWith("[")) {
            fixedProfilePhotoString = `[${fixedProfilePhotoString}]`;
          }

          let profilePhotoArray = [];
          try {
            profilePhotoArray = JSON.parse(fixedProfilePhotoString); 
          } catch (error) {
            // console.error("Failed to parse JSON:", error);
          }

          // Step 5: Access the last upload value (if available)
          const lastUpload =
            profilePhotoArray?.[profilePhotoArray.length - 1]?.upload;
  
          const linkToStorageFile = async (pathUrl) => {
            const result = await getUrl({
              path: pathUrl,
            });
            return setPersonalInfo({
              profilePhoto: result.url.toString(), // Set the profile photo
              name: userPersonalInfo.name, // Use the name
              email: userPersonalInfo.email,
              contactNo: userPersonalInfo.contactNo || "",
            });
          };
          linkToStorageFile(lastUpload);
        } else {
          console.log(`No matching employee found for userID: ${userID}`);
        }
      } catch (err) {
        console.log("Error fetching employee personal infos:", err);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

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
          <div className="my-auto px-2">
            <span>
              <MdOutlineMail className="text-2xl" />
            </span>
          </div>
          <div className=" my-auto">
            <p className="relative">
              <Link to="/notifications">
                {" "}
                <IoMdNotificationsOutline className="text-2xl" />
              </Link>
              <span className="absolute -top-3 -right-3 rounded-full h-5 w-5 text-dark_grey bg-primary text-xs center">
                1{" "}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-5 px-5">
            <div className="space-y-2 ">
              <p className="text-dark_grey text_size_5">
                {" "}
                Welcome {personalInfo.name}
              </p>
              <article className="flex gap-5 text_size_7 text-dark_grey">
                <p>{currentDate}</p>

                <p>{currentTime}</p>
              </article>
            </div>
            <div className="relative">
              <div className="relative">
                <div
                  className="max-w-10 h-10 w-full rounded-full relative overflow-hidden shadow-md shadow-[#00000033]"
                  onClick={() => toggleDropdown()}
                >
                  <img
                    className="w-full object-cover"
                    src={personalInfo.profilePhoto || avatar}
                    alt="avatar not found"
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
                    name={personalInfo.name}
                    email={personalInfo.email}
                    profilePhoto={personalInfo.profilePhoto}
                    contactNo={personalInfo.contactNo}
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
