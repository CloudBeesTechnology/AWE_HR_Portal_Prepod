import React, { useState } from 'react';
import { TiTick } from 'react-icons/ti';

const Performance = ({ title, name, register }) => {
  const [selectedPerformance, setSelectedPerformance] = useState('');

  const handleRadioChange = (event) => {
    setSelectedPerformance(event.target.value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-2">
        <label className="flex items-center relative">
          <input
            type="radio"
            name={name}
            {...register(name)}
            value="exceeding"
            checked={selectedPerformance === 'exceeding'}
            onChange={handleRadioChange}
            className="mr-2 appearance-none w-5 h-5 border rounded-sm"
          />
          Exceeding expectations
          {selectedPerformance === 'exceeding' && (
            <TiTick className="text-[#4ad84a] text-[28px] absolute -bottom-0.5 -left-0.5" />
          )}
        </label>

        <label className="flex items-center relative mt-2">
          <input
            type="radio"
            name={name}
            {...register(name)}
            value="meeting"
            checked={selectedPerformance === 'meeting'}
            onChange={handleRadioChange}
            className="mr-2 appearance-none w-5 h-5 border rounded-sm"
          />
          Meeting expectations
          {selectedPerformance === 'meeting' && (
            <TiTick className="text-[#4ad84a] text-[28px] absolute -bottom-0.5 -left-0.5" />
          )}
        </label>

        <label className="flex items-center relative mt-2">
          <input
            type="radio"
            name={name}
            {...register(name)}
            value="notMeeting"
            checked={selectedPerformance === 'notMeeting'}
            onChange={handleRadioChange}
            className="mr-2 appearance-none w-5 h-5 border rounded-sm"
          />
          Not meeting expectations (provide details)
          {selectedPerformance === 'notMeeting' && (
            <TiTick className="text-[#4ad84a] text-[28px] absolute -bottom-0.5 -left-0.5" />
          )}
        </label>
      </div>
    </div>
  );
};

export default Performance;

// import React from 'react'

// const Performance = ({ title, name }) => {
//     return (
//       <div className="mb-6">
//         <h3 className="font-semibold">{title}</h3>
//         <div className="mt-2">
//           <label className="">
//             <input type="radio" name={name} className="mr-2" />
//             Exceeding expectations
//           </label>
//           <label className="block">
//             <input type="radio" name={name} className="mr-2" />
//             Meeting expectations
//           </label>
//           <label className="block">
//             <input type="radio" name={name} className="mr-2" />
//             Not meeting expectations (provide details)
//           </label>
//         </div>
//         <p className="border w-full mt-5 text-grey"></p>
//         <p className="border w-full mt-5 text-grey"></p>
//       </div>
//     );
//   };

// export default Performance
