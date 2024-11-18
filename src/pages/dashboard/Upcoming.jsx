import React from "react";

export const Upcoming = () => {
  return (
    <div>
      <div className="w-[400px] mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="rounded-t-lg flex bg-[#6B6B6B] justify-between p-2">
          <div className="text-white">
            <small>Upcoming Schedule</small>
          </div>
          <div className="border rounded-lg border-white bg-[#6B6B6B] px-2 py-1">
            <small className="text-white">Today, 13 Sep 2024</small>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Priority Section */}
          <h3 className="text-sm font-semibold text-gray">Priority</h3>
          <div className="bg-gray  bg-[#F5F7FB] p-4 mt-2 rounded-lg flex justify-between items-center">
            <div className="">
              <h4 className="text-md font-semibold text-gray">
                CBT meeting Midday
              </h4>
              <p className="text-sm text-gray">Today 11:00 AM</p>
            </div>
            <div className="text-gray">•••</div>
          </div>

          {/* Other Section */}
          <h3 className="text-sm font-semibold text-gray mt-4">Other</h3>
          <div className="bg-gray  bg-[#F5F7FB] p-4 mt-2 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-md font-semibold text-gray ">
                Upcoming Schedule
              </h2>
              <small className="text-sm text-gray">Tomorrow 2:00 PM</small>
            </div>
            <div className="text-gray">•••</div>
          </div>
        </div>
      </div>
    </div>
  );
};
