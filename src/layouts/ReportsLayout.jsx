import { ReportsProvider } from "../context/reports/ReportsContext";
import { Outlet } from "react-router-dom";

const ReportsLayout = () => {
  return (
    <ReportsProvider>
      <Outlet />
    </ReportsProvider>
  );
};

export default ReportsLayout;
 