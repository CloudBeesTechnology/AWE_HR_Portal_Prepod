import React, { useEffect, useState, useContext } from 'react';
import { format } from "date-fns";
import { IoPersonCircleOutline } from "react-icons/io5";
import { DataSupply } from '../../utils/DataStoredContext';
import { VscClose } from 'react-icons/vsc';
import { getUrl } from "@aws-amplify/storage";

export const BirthdayReminder = () => {
  const { empPIData } = useContext(DataSupply);
  const [birthdays, setBirthdays] = useState([]);
  const [profileImages, setProfileImages] = useState({});
  const [showModal, setShowModal] = useState(false);

  const filterTodayBirthdays = (data) => {
    const today = format(new Date(), 'MM-dd');
    return data.filter((person) => {
      if (!person.dob) {
        return false;
      }
      
      const dob = new Date(person.dob);

      if (isNaN(dob)) {
        return false;
      }
      
      return format(dob, 'MM-dd') === today;
    });
  };

  useEffect(() => {
    if (empPIData) {
      const todaysBirthdays = filterTodayBirthdays(empPIData);
      setBirthdays(todaysBirthdays);
    }
  }, [empPIData]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      const newProfileImages = {};

      for (const person of birthdays) {
        if (person.profilePhoto) {
          try {
            const result = await getUrl({ path: person.profilePhoto });
            newProfileImages[person.name] = result.url;
          } catch (error) {
            console.error('Error fetching profile image:', error);
          }
        }
      }

      setProfileImages(newProfileImages);
    };

    fetchProfileImages();
  }, [birthdays]);

  return (
    <div className="max-w-md w-full shadow-md rounded-2xl bg-white h-[100%] overflow-hidden">
      <div className="bg-lite_grey p-4 rounded-t-2xl">
        <h2 className="text-lg font-semibold">Birthday Reminder</h2>
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium">Today's Birthday</h3>
        <div className="mt-4 grid grid-cols-2 gap-5">
          {birthdays.slice(0, 2).map((person, index) => (
            <div key={index} className="flex items-center space-x-3 bg-[#F5F7FB] p-2 rounded-md shadow-sm">
              <p className="w-10 h-10 text-[50px] rounded-full center">
                {profileImages[person.name] ? (
                  <img
                    src={profileImages[person.name]}
                    alt={person.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircleOutline />
                )}
              </p>
              <div >
                <p className="text-[10px] font-semibold">{person.name}</p>
                <p className="text-[10px] text-grey">{person.message || "Happy Birthday!"}</p>
                <p className="text-[10px] text-grey">{format(new Date(person.dob), 'MMMM dd')}</p>
              </div>
            </div>
          ))}
          {birthdays.length > 0 && (
            <button onClick={() => setShowModal(true)} className="text-[green] underline ">
              View More
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full h-[550px] overflow-y-auto scrollBar">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">All Birthdays Today</h2>
              <button onClick={() => setShowModal(false)} className="text-[24px] rounded">
                <VscClose />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {birthdays.map((person, index) => (
                <div key={index} className="flex justify-start flex-wrap items-center space-x-3 bg-[#F5F7FB] p-2 rounded-md shadow-sm mb-2 gap-5">
                  <p className="w-10 h-10 text-[50px] rounded-full center">
                    {profileImages[person.name] ? (
                      <img
                        src={profileImages[person.name]}
                        alt={person.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <IoPersonCircleOutline />
                    )}
                  </p>
                  <div className=' '>
                    <p className="text-[14px] font-semibold">{person.name}</p>
                    <p className="text-[10px] text-grey">{person.message || "Happy Birthday!"}</p>
                    <p className="text-[10px] text-grey">{format(new Date(person.dob), 'MMMM dd')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};