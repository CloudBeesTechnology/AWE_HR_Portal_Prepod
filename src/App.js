import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import DataStoredContext from "./utils/DataStoredContext";
import { TempIDProvider } from "./utils/TempIDContext";
import { signOut } from "@aws-amplify/auth";
import { NotifiCenterProvider } from "./hooks/useNotifiCenter";
import { Modal } from "./utils/Modal"

const NavigationLinks = lazy(() => import("./services/NavigationLinks"));
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Login = lazy(() => import("./pages/login/Login"));
const ForgotEmail = lazy(() => import("./pages/forgotPassword/ForgotEmail"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword/ForgotPassword"));

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
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // SESSION TIMEOUT DURATION (10 minutes)
  const SESSION_TIMEOUT = 1000 * 60 * 10;
  const WARNING_TIME = 1000 * 60;

  // UPDATE ACTIVITY TIMESTAMP
  const updateActivity = () => {
    if (loginId && userType) {
      localStorage.setItem("lastActivityTime", Date.now().toString());
      setShowTimeoutWarning(false);
    }
  }

  // CHECK IF SESSION HAS EXPIRED 
  const checkSession = () => {
    const lastActivity = localStorage.getItem("lastActivityTime");
    if (!lastActivity) return;

    const timeSinceLastActivity = Date.now() - Number(lastActivity);
    const timeRemaining = SESSION_TIMEOUT - timeSinceLastActivity;

    // Show warning when less than 1 minute remains
    if (timeRemaining <= WARNING_TIME && timeRemaining > 0) {
      setShowTimeoutWarning(true);
      setShowSessionExpired(false);
      setTimeLeft(Math.ceil(timeRemaining / 1000));
    }
    // Log out if session expired
    else if (timeSinceLastActivity > SESSION_TIMEOUT) {
      handleSignOut();
      setShowTimeoutWarning(false);
      setShowSessionExpired(true);
    }
    // Hide warning if there's more than 1 minute left
    else if (timeRemaining > WARNING_TIME) {
      setShowTimeoutWarning(false);
      setShowSessionExpired(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("UserID");
      localStorage.removeItem("userType");
      localStorage.removeItem("lastActivityTime");
      setLoginId("");
      setUserType("");
    } catch (error) {
      console.log("Error sigining out", error);
    }
  }

  const extendSession = () => {
    updateActivity();
    setShowTimeoutWarning(false);
  }

  const handleSessionExpiredClose = () => {
    setShowSessionExpired(false);
    navigate("/login");
  }

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedLoginId = localStorage.getItem("userID");
      const storedUserType = localStorage.getItem("userType");
      const getFEMail = localStorage.getItem("FEmail");
      const getFPswd = localStorage.getItem("FPSWD");

      if (storedLoginId && storedUserType) {
        setLoginId(storedLoginId);
        setUserType(storedUserType);
        updateActivity();
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

    //CHECK SESSION EVERY SECOND
    const interval = setInterval(checkSession, 1000);

    //ADD EVENT LISTENERS FOR USER ACTIVITY
    const activityEvents = ["click", "scroll", "keypress", "mousemove"];
    activityEvents.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      clearInterval(interval);
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [navigate, loginId, userType]);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
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
          {fPswd && <ForgotPassword />}
          {loginId && userType && (
            <div className="mt-28 ml-64">
              <DataStoredContext>
                <TempIDProvider>
                  <NavigationLinks />
                </TempIDProvider>
              </DataStoredContext>
            </div>
          )}

          {/* Session Timeout Warning Modal */}
          {showTimeoutWarning && (
            <Modal onClose={extendSession}>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Session Timeout Warning</h3>
                <p>Your session will expire in {timeLeft} seconds due to inactivity.</p>
                <p className="text-sm text-grey py-4">Please click anywhere or perform an action to keep your session active.</p>
              </div>
            </Modal>
          )}

          {/* Session Expired Modal */}
          {showSessionExpired && (
            <Modal onClose={handleSessionExpiredClose}>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Session Expired</h3>
                <p>Your session has expired. Please log in again to continue.</p>
                <button 
                  className="mt-4 bg-yellow py-2 px-4 rounded" 
                  onClick={handleSessionExpiredClose}
                >
                  OK
                </button>
              </div>
            </Modal>
          )}
        </Suspense>
      </NotifiCenterProvider>
    </HelmetProvider>
  );
};