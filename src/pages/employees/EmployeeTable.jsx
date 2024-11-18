import { useEffect } from "react";
import { Searchbox } from "../../utils/Searchbox";
import { IoSearch } from "react-icons/io5";

export const EmployeeTable = () => {
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  })
  const employees = [
    {
      id: 1,
      name: "Leesa",
      position: "Procurement Coordinator",
      gender: "Female",
      experience: "2 yrs",
      email: "abc12@g***.com",
      contact: "7564555",
      nationality: "Bruneian",
    },
    {
      id: 2,
      name: "Ajay Kumar",
      position: "Material Manager",
      gender: "Male",
      experience: "4 yrs",
      email: "xyz34@g***.com",
      contact: "8629544440",
      nationality: "Indian",
    },
    {
      id: 3,
      name: "Azim bin jeffri",
      position: "Field Engineer",
      gender: "Male",
      experience: "1 yr",
      email: "abc12@g***.com",
      contact: "8895820",
      nationality: "Brunei PR",
    },
  ];

  return (
    <div className=" px-10 flex flex-col">
      <div className="text-left flex justify-between">
        <div className=" flex-1 flex items-center">

        <span className="border-grey border text-black font-bold text-[16px] px-4 py-2 rounded-lg ">
          All Employee
        </span>
        </div>
        <div className="flex-1 flex justify-end">
          <Searchbox 
              // value={searchTerm}
            // searchHandler={(term) => setSearchTerm(term)}
            searchIcon1={<IoSearch />}
            placeholder="Employee Id, Position"
            border="rounded-full"
            shadow="shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]"/>
        </div>
      </div>
      <div className="bg-white  w-full rounded-lg shadow-lg mt-10">
        <table className="w-full table-auto">
          <thead className="bg-grey text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Email Id</th>
              <th className="p-3 text-left">Contact Number</th>
              <th className="p-3 text-left">Nationality</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="bg-white odd:bg-gray-100">
                <td className="p-3">{employee.name}</td>
                <td className="p-3">{employee.position}</td>
                <td className="p-3">{employee.gender}</td>
                <td className="p-3">{employee.experience}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3">{employee.contact}</td>
                <td className="p-3">{employee.nationality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
