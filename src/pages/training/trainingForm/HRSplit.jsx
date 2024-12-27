import { useEffect } from "react";
import { SelectTiles } from "../../../utils/SelectTiles";
import icon2 from "../../../assets/training/icon1.svg";
import icon1 from "../../../assets/training/icon2.svg";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const HRSplit = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
  <section className="min-h-screen p-10 bg-[#F5F6F1CC] flex flex-col gap-16">
           
           <div className="w-full flex items-center justify-between gap-5">
        <Link to="/training" className="text-xl flex-1 text-grey">
          <FaArrowLeft />
        </Link>
         </div>

       <div className=" flex gap-16">
       <SelectTiles
          img={icon1}
          text1="Add Course"
          fontSize="text_size_5 "
          borderColor="border-[#7DA2F2]"
          bgColor="bg-white"
          link="/training/AcTc"
        />
       <SelectTiles
          img={icon1}
          text1="Training Certificate"
          fontSize="text_size_5 "
          borderColor="border-[#7DA2F2]"
          bgColor="bg-white"
          link="/training/trainingCertify"
        />

        <SelectTiles
          img={icon2}
          text1="Head Office"
          fontSize="text_size_5 "
          borderColor="border-[#B240FF]"
          bgColor="bg-white"
          link="/training/tcView"
        />
       </div>
    </section>
  
  );
};
