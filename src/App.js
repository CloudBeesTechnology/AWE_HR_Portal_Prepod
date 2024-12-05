import { Helmet, HelmetProvider } from "react-helmet-async";

import { useLocation, useNavigate } from "react-router-dom";

import { lazy, Suspense, useEffect, useState } from "react";
import DataStoredContext from "./utils/DataStoredContext";

// import { API } from 'aws-amplify';
const NavigationLinks = lazy(() => import("./services/NavigationLinks"));
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Login = lazy(() => import("./pages/login/Login"));

export const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/changePassword"];
  const navigate = useNavigate();

  const hideLogin = ["/changePassword"];
  const [loginId, setLoginId] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedLoginId = localStorage.getItem("userID");
      const storedUserType = localStorage.getItem("userType");
      if (storedLoginId && storedUserType) {
        setLoginId(storedLoginId);
        setUserType(storedUserType);
      } else {
        setLoginId("");
        setUserType("");
        navigate("/login");
      }
    };

    // Call the function to check login status on component mount
    checkLoginStatus();

    // const storedLoginId = localStorage.getItem("userID");
    // const storedUserType = localStorage.getItem("userType");
    // if (storedLoginId && storedUserType) {
    //   setLoginId(storedLoginId);
    //   setUserType(storedUserType);
    // }else {
    //   // Redirect to login if no login data
    //   navigate("/login");
    // }
    const handleTabClose = async (event) => {
      // await signOut();
      // localStorage.clear();
      // sessionStorage.clear()

      window.open("https://dev.dxtlxvdrz6jj5.amplifyapp.com");
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {/* fallback={<div>Loading...</div>} */}
      <Suspense>
        {!hideNavbar.includes(location.pathname) && loginId && userType && (
          <>
            <Navbar />
            <Sidebar />
          </>
        )}

        {!hideLogin.includes(location.pathname) && !loginId && !userType && (
          <Login />
        )}

        {loginId && userType && (
          <div className="mt-28 ml-64">
            <DataStoredContext>
              <NavigationLinks />
            </DataStoredContext>
          </div>
        )}
      </Suspense>
    </HelmetProvider>
  );
};
