import React from 'react'
import { useLeaveManage } from '../../hooks/useLeaveManage';

 const MyComponent = () => {

     const {mergedData}=useLeaveManage();
    const handleClick = () => {
        // You can define your mergedData here or receive it as a prop
        
        console.log('Merged Data:', mergedData);
    };
    
    return (
        <div>
            <h2>Checking Data</h2>
            <button onClick={handleClick}>Check Data</button>
        </div>
    )
}

export default MyComponent