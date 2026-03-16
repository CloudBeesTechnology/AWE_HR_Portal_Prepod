import { RecruitmentsProvider } from "../context/recruitments/RecruitmentsContext";
import { Outlet } from "react-router-dom";

const RecruitmentsLayout = () => {
  return (
    <RecruitmentsProvider>
      <Outlet />
    </RecruitmentsProvider>
  );
};

export default RecruitmentsLayout;
