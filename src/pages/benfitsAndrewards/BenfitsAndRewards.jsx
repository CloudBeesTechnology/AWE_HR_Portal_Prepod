import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/benefit_and_rewards/icon1.svg";
import icon2 from "../../assets/benefit_and_rewards/icon2.svg";
import icon3 from "../../assets/benefit_and_rewards/icon3.svg";
import { useEffect } from "react";

export const BenfitsAndRewards = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <section className="bg-[#F5F6F1CC] w-full p-10 min-h-screen">
    <div className="grid grid-cols-3 gap-10">
      <SelectTiles
        img={icon1}
        text1="Employment Policy"
        fontSize="text_size_5 "
        borderColor="border-[#FBCBCB]"
        bgColor="bg-white"
      />
      <SelectTiles
        img={icon2}
        text1="Training & Development"
        fontSize="text_size_5 "
        borderColor="border-[#7DF2E7]"
        bgColor="bg-white"
      />
      <SelectTiles
        img={icon3}
        text1="Attendance & Work Schedule"
        fontSize="text_size_5 "
        borderColor="border-[#C379FF]"
        bgColor="bg-white"
      />
      <SelectTiles
        img={icon3}
        text1="Compensation & Benefits"
        fontSize="text_size_5 "
        borderColor="border-[#C379FF]"
        bgColor="bg-white"
      />
      <SelectTiles
        img={icon3}
        text1="Termination from the Company"
        fontSize="text_size_5 "
        borderColor="border-[#C379FF]"
        bgColor="bg-white"
      />
      <SelectTiles
        img={icon3}
        text1="Consequence Management"
        fontSize="text_size_5 "
        borderColor="border-[#C379FF]"
        bgColor="bg-white"
      />
    </div>
    </section>
  );
};
