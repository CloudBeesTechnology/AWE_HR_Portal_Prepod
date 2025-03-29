import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import DataStoredContext from "./utils/DataStoredContext";
import { TempIDProvider } from "./utils/TempIDContext";
import { IdleTimerProvider } from 'react-idle-timer';
import { signOut } from "@aws-amplify/auth";
import { NotifiCenterProvider } from "./hooks/useNotifiCenter";

const NavigationLinks = lazy(() => import("./services/NavigationLinks"));
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Login = lazy(() => import("./pages/login/Login"));

const ForgotEmail = lazy(() => import("./pages/forgotPassword/ForgotEmail"));

const ForgotPassword = lazy(() =>
  import("./pages/forgotPassword/ForgotPassword")
);

export const App = () => {
  const location = useLocation();
  const hideNavbar = [
    "/login",
    "/changePassword",
    "/forgotEmail",
    "/forgotPassword",
  ];
  const navigate = useNavigate();

  const hideLogin = ["/changePassword", "/forgotEmail", "/forgotPassword"];
  const [loginId, setLoginId] = useState("");
  const [userType, setUserType] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fPswd, setFPswd] = useState("");


  const handleOnIdle = async (event) => {
    console.log('User is idle', event);
    try {
      await signOut();
      localStorage.removeItem("userID");
      localStorage.removeItem("userType");
      navigate("/login");
      
    } catch (error) {
      console.log("Error signing out", error);
    
    }
  };

  const handleOnActive = event => {
    // console.log('User is active', event);
  };


  useEffect(() => {
    const checkLoginStatus = () => {
      const storedLoginId = localStorage.getItem("userID");
      const storedUserType = localStorage.getItem("userType");
      const getFEMail = localStorage.getItem("FEmail");
      const getFPswd = localStorage.getItem("FPSWD");

      if (storedLoginId && storedUserType) {
        setLoginId(storedLoginId);
        setUserType(storedUserType);
      } else if (getFEMail) {
        setFEmail(getFEMail);
        navigate("/forgotEmail");
      } else if (getFPswd) {
        setFPswd(getFPswd);
        navigate("/forgotPassword");
      } else {
        setLoginId("");
        setUserType("");
        navigate("/login");
      }
    };
    checkLoginStatus();
  }, [navigate]);

  return (
    <IdleTimerProvider 
    timeout={1000 * 60 * 10} 
      onIdle={handleOnIdle}
      onActive={handleOnActive}
      onAction={handleOnActive}
    >
  
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {/* fallback={<div>Loading...</div>} */}
      <NotifiCenterProvider>

      <Suspense>
        {!hideNavbar.includes(location.pathname) && loginId && userType && (
          <>
            <Navbar />
            <Sidebar />
          </>
        )}

        {!hideLogin.includes(location.pathname) &&
          !loginId &&
          !userType &&
          !fEmail &&
          !fPswd && <Login />}
        {fEmail && <ForgotEmail />}
        {fPswd && <ForgotPassword/>}
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
      </NotifiCenterProvider>

    </HelmetProvider>
    </IdleTimerProvider>
  );
};
