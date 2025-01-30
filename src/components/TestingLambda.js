import React, { useContext } from 'react'
import { DataSupply } from '../utils/DataStoredContext'

export const TestingLambda = () => {
    const {PPValidsData}=useContext(DataSupply)
    const today = new Date();

    // Calculate the start and end of the next month
    const startOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    ); // First day of next month
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      0
    ); // Last day of next month
const ExpiryValuePass=()=>{
    if (!PPValidsData || !Array.isArray(PPValidsData)) {
        console.error("PPValidsData is invalid or undefined");
        return;
      }
    
    const passExpiryData = PPValidsData.filter((val) => {
        const empPassList = val?.empPassExp || [];
    
        const datePass = empPassList[empPassList.length - 1]; // Safely access the last element
        if (!datePass) return false;
    
        const expiry = new Date(datePass);
        // console.log(expiry);
        // Check if the expiry date falls within the next month
        return expiry >= startOfNextMonth && expiry <= endOfNextMonth;
      });
console.log(passExpiryData.length);

    return  passExpiryData.map((isExpiring, index) => {
        // if(!isExpiring) return;
        // console.log(isExpiring);
        const empID = isExpiring.empID || "Unknown ID";
        const lastPassDate =
        isExpiring.empPassExp[isExpiring?.empPassExp.length - 1] ||
          "Unknown Date";
        console.log(index,empID, lastPassDate,);
        
      });
}
  return (
    <div className='center flex-col gap-20'>TestingLambda
        <button onClick={ExpiryValuePass}>CLick here</button>
    </div>
  )
}
