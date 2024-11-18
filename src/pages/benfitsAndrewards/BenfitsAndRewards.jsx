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
    <section className="screen-size p-10 flex gap-16">
      <SelectTiles
        img={icon1}
        text1="Leave Benefits"
        fontSize="text_size_5 "
        borderColor="border-[#FBCBCB]"
        bgColor="white"
      />

      <SelectTiles
        img={icon2}
        text1="Paternity Benefits"
        fontSize="text_size_5 "
        borderColor="border-[#7DF2E7]"
        bgColor="white"
      />

      <SelectTiles
        img={icon3}
        text1="Employee Benefits"
        fontSize="text_size_5 "
        borderColor="border-[#C379FF]"
        bgColor="white"
      />
    </section>
  );
};
