import { useEffect } from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/training/icon1.svg";
import icon2 from "../../assets/training/icon2.svg";
import icon3 from "../../assets/training/icon3.svg";
import icon4 from "../../assets/training/icon4.svg";
import usePermission from "../../hooks/usePermissionDashInside";

export const Training = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const recruitmentPermissions = usePermission("userID", "Training");

  return (
    <section className="min-h-screen p-10 bg-[#F5F6F1CC] flex gap-16">

      {recruitmentPermissions.includes("HR") && (
        <SelectTiles
          img={icon1}
          text1="HR"
          fontSize="text_size_5 "
          borderColor="border-[#BF91FF]"
          bgColor="bg-white"
          link="/training/hr"
        />
      )}

      {recruitmentPermissions.includes("Training Requestor") && (
        <SelectTiles
          img={icon2}
          text1="Training Requestor"
          fontSize="text_size_5 "
          borderColor="border-[#7DA2F2]"
          bgColor="bg-white"
          link="/trainingReq"
        />
      )}
         
       <SelectTiles
          img={icon3}
          text1="BLNG"
          fontSize="text_size_5 "
          borderColor="border-[#F589C1]"
          bgColor="bg-white"
          link="/blngCertify"
        />
        {/* {recruitmentPermissions.includes("OME") && ( */}
        <SelectTiles
          img={icon3}
          text1="OME"
          fontSize="text_size_5 "
          borderColor="border-[#F589C1]"
          bgColor="bg-white"
          link="/omgCertify"
        />
      {/* )} */}
    </section>
  );
};
