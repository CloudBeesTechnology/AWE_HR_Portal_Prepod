import { useEffect } from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/training/icon1.svg";
import icon2 from "../../assets/training/icon2.svg";
import icon3 from "../../assets/training/icon3.svg";
import icon4 from "../../assets/training/icon4.svg";
import usePermission from "../../hooks/usePermissionDashInside";
import { useTrainingData } from "../../context/training/TrainingContext";

// Colored skeleton loader component for training tiles
// ... existing code ...
const ColoredSkeletonCard = () => (
  <div
    className={`shadow-lg border border-medium_grey text-secondary bg-white my-5 h-36 max-w-48 w-full rounded-xl flex flex-col items-center justify-center text-center gap-3 p-5 animate-pulse`}
  >
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-[70px] h-[70px] p-3 bg-medium_grey rounded-full mb-2"></div>
      <div className="h-4 bg-grey rounded-lg w-3/4"></div>
    </div>
  </div>
);
// ... existing code ...

export const Training = () => {
  const { loading } = useTrainingData();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const trainingPermissions = usePermission("userID", "Training");

  // Define all possible training tiles
  const trainingTiles = [
    {
      id: "hr",
      permission: "HR",
      img: icon1,
      text1: "HR",
      fontSize: "text_size_5 ",
      borderColor: "border-[#BF91FF]",
      bgColor: "bg-white",
      link: "/training/hr",
    },
    {
      id: "requestor",
      permission: "Training Requestor",
      img: icon2,
      text1: "Training Requestor",
      fontSize: "text_size_5 ",
      borderColor: "border-[#7DA2F2]",
      bgColor: "bg-white",
      link: "/trainingReq",
    },
    {
      id: "blng",
      permission: "BLNG",
      img: icon3,
      text1: "BLNG",
      fontSize: "text_size_5 ",
      borderColor: "border-[#F589C1]",
      bgColor: "bg-white",
      link: "/blngCertify",
    },
    {
      id: "ome",
      permission: "OME",
      img: icon4,
      text1: "OME",
      fontSize: "text_size_5 ",
      borderColor: "border-[#F589C1]",
      bgColor: "bg-white",
      link: "/omgCertify",
    },
  ];

  // Filter tiles based on permissions
  const filteredTiles = trainingTiles.filter((tile) =>
    trainingPermissions.includes(tile.permission)
  );

  return (
    <section className="min-h-screen p-10 bg-[#F5F6F1CC] flex gap-16 flex-wrap">
      {filteredTiles.length === 0 || loading
        ? // Show skeleton loaders when no tiles are filtered (data still loading or no permissions)
          trainingTiles.map((tile) => (
            <ColoredSkeletonCard key={`skeleton-${tile.id}`} />
          ))
        : // Show actual tiles when data is loaded
          filteredTiles.map((tile) => (
            <SelectTiles
              key={tile.id}
              img={tile.img}
              text1={tile.text1}
              fontSize={tile.fontSize}
              borderColor={tile.borderColor}
              bgColor={tile.bgColor}
              link={tile.link}
            />
          ))}
    </section>
  );
};
