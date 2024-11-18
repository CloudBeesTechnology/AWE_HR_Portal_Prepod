import { useEffect } from "react";
import { RecruDash } from "./RecruDash";

export const Recruitments = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <RecruDash />
    </div>
  );
};
