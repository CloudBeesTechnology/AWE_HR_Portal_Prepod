import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../../src/assets/Employee/icon1.svg";
import image2 from "../../assets/Employee/icon2.svg";
import image3 from "../../assets/Employee/icon3.svg";
import image4 from "../../assets/Employee/icon4.svg";
import image5 from "../../assets/Employee/icon5.svg";
import image6 from "../../assets/Employee/icon6.svg";
import image7 from "../../assets/Employee/icon7.svg";
import usePermission from "../../hooks/usePermissionDashInside";

// Colored skeleton loader component
const ColoredSkeletonCard = ({ borderColor }) => (
  <div className="flex flex-col justify-center items-center p-2 max-w-xs w-full bg-white rounded-lg shadow-lg transition-shadow duration-200 animate-pulse">
    <div
      className={`w-full h-full flex flex-col justify-center items-center border-l-4 ${borderColor} opacity-50`}
    >
      <div className="w-[100px] h-[100px] p-3 bg-grey rounded-full mb-2"></div>
      <div className={`h-4 bg-grey rounded w-3/4`}></div>
    </div>
  </div>
);

export const Employee = () => {
  const employeePermissions = usePermission("userID", "Employee");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const cards = [
    {
      id: 1,
      to: "/allempDetails",
      img: image1,
      alt: "All Employee",
      title: "All Employee",
      borderColor: "border-[#AF0A12]",
    },
    {
      id: 2,
      to: "/employeeInfo",
      img: image2,
      alt: "Employee Info",
      title: "Employee Info",
      borderColor: "border-[#0AAF19]",
    },
    {
      id: 3,
      to: "/workInfo",
      img: image3,
      alt: "Work Info",
      title: "Work Info",
      borderColor: "border-[#F9A938]",
    },
    {
      id: 4,
      to: "/sawp",
      img: image4,
      alt: "Work Pass",
      title: "Work Pass",
      borderColor: "border-[#0072FE]",
    },
    {
      id: 5,
      to: "/labourImmigration",
      img: image5,
      alt: "Medical & Dependent Info",
      title: "Medical & Dependent Info",
      borderColor: "border-[#AF0A12]",
    },
    {
      id: 6,
      to: "/insuranceAdd",
      img: image6,
      alt: "Insurance",
      title: "Insurance",
      borderColor: "border-[#0072FE]",
    },
    {
      id: 7,
      to: "/nonLocalAcco",
      img: image7,
      alt: "Non-Local",
      title: "Non-Local Accommodation in Brunei",
      borderColor: "border-[#F9A938]",
    },

    // You can add more cards if needed
  ];

  const filteredCards = cards.filter((card) =>
    employeePermissions.includes(card.title)
  );
  // console.log(filteredCards);

  return (
    <section className=" bg-[#F5F6F1CC] w-full p-10 min-h-screen">
      <div className="flex w-full flex-wrap justify-between gap-y-10 gap-x-2 mb-40">
        {filteredCards && filteredCards.length === 0
          ? // Show colored skeleton loaders based on filteredCards length
            // Since we don't know which cards will be filtered, show all possible skeletons
            cards.map((card) => (
              <ColoredSkeletonCard
                key={`skeleton-${card.id}`}
                borderColor={card.borderColor}
              />
            ))
          : // Show actual cards when loaded
            filteredCards.map((card) => (
              <Link
                key={card.id}
                to={card.to}
                className="flex flex-col justify-center items-center p-2 max-w-xs w-full bg-white rounded-lg shadow-lg transition-shadow duration-200 hover:shadow-xl"
              >
                <div
                  className={`w-full h-full flex flex-col justify-center items-center border-l-4 ${card.borderColor}`}
                >
                  <img
                    className="w-[100px] h-[100px] p-3"
                    src={card.img}
                    alt={card.alt}
                  />
                  <h2 className="text-[14px] font-semibold text-center">
                    {card.title}
                  </h2>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
};
