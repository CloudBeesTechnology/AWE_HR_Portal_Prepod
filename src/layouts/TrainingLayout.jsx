import { TrainingProvider } from "../context/training/TrainingContext";
import { Outlet } from "react-router-dom";

const TrainingLayout = () => {
  return (
    <TrainingProvider>
      <Outlet />
    </TrainingProvider>
  );
};

export default TrainingLayout;
