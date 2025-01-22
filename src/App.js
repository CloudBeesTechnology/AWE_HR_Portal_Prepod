import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import DataStoredContext from "./utils/DataStoredContext";
import { TempIDProvider } from "./utils/TempIDContext";

// Lazy loading components
const NavigationLinks = lazy(() => import("./services/NavigationLinks"));
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Login = lazy(() => import("./pages/login/Login"));

const ForgotEmail = lazy(() => import("./pages/forgotPassword/ForgotEmail"));
const ForgotOtp = lazy(() => import("./pages/forgotPassword/ForgotOtp"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword/ForgotPassword"));

export const App = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/changePassword", "/forgotEmail", "/forgotOtp", "/forgotPassword"];
  const navigate = useNavigate();

  const hideLogin = ["/changePassword",];
  const [loginId, setLoginId] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedLoginId = localStorage.getItem("userID");
      const storedUserType = localStorage.getItem("userType");

      // If the user is logged in, redirect to the dashboard and set state accordingly
      if (storedLoginId && storedUserType) {
        setLoginId(storedLoginId);
        setUserType(storedUserType);
        if (location.pathname === "/login") {
          navigate("/dashboard"); // Redirect to dashboard after login
        }
      } else {
        setLoginId("");
        setUserType("");
          navigate("/login"); 
        
      }
    };

    checkLoginStatus();

    const handleTabClose = async (event) => {
      // await signOut();
      // localStorage.clear();
      // sessionStorage.clear();

      window.open("https://hr.adininworks.co");
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [location, navigate]);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Suspense>
        {/* Show Navbar and Sidebar if not on the login or forgot pages and user is logged in */}
        {!hideNavbar.includes(location.pathname) && loginId && userType && (
          <>
            <Navbar />
            <Sidebar />
          </>
        )}

        {!hideLogin.includes(location.pathname) && !loginId && !userType && (
          <>
            {/* {location.pathname === "/forgotEmail" && <ForgotEmail />}
            {location.pathname === "/forgotOtp" && <ForgotOtp />}
            {location.pathname === "/forgotPassword" && <ForgotPassword />}
            {location.pathname === "/login" && <Login />} */}
            <Login/>
          </>
        )}

        {/* Main App Content */}
        {loginId && userType && (
          <div className="mt-28 ml-64">
            <DataStoredContext>
              <TempIDProvider>
                <NavigationLinks />
              </TempIDProvider>
            </DataStoredContext>
          </div>
        )}
      </Suspense>
    </HelmetProvider>
  );
};

