import { useEffect } from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/training/icon1.svg";
import icon2 from "../../assets/training/icon2.svg";
import icon3 from "../../assets/training/icon3.svg";
import icon4 from "../../assets/training/icon4.svg";

export const Training = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  return (
    <section className="min-h-screen p-10 bg-[#F5F6F1CC] flex gap-16">
      <SelectTiles
        img={icon1}
        text1="HR"
        fontSize="text_size_5 "
        borderColor="border-[#BF91FF]"
        bgColor="bg-white"
        link="/training/hr"
      />

      <SelectTiles
        img={icon2}
        text1="Training Requestor"
        fontSize="text_size_5 "
        borderColor="border-[#7DA2F2]"
        bgColor="bg-white"
        link="/trainingReq"
      />

      <SelectTiles
        img={icon3}
        text1="QA / QC"
        fontSize="text_size_5 "
        borderColor="border-[#BDF27D]"
        bgColor="bg-white"
        link="/trainingQA"
      />
      <SelectTiles
        img={icon4}
        text1="Training List"
        fontSize="text_size_5"
        borderColor="border-[#FF8BC7]"
        bgColor="bg-white"
        link="/allTraining"
      />
    </section>
  );
};
