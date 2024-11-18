import { useEffect } from "react";
import { SelectTiles } from "../../utils/SelectTiles";
import icon1 from "../../assets/training/icon1.svg";
import icon2 from "../../assets/training/icon2.svg";
import icon3 from "../../assets/training/icon3.svg";

// import { IoSearch } from "react-icons/io5";
// import { SearchDisplay } from "../../utils/SearchDisplay";
// import { AddEmployee } from "./AddEmployee";
// import { TrainingType } from "./TrainingType";
// import { ListOfTainee } from "./ListOfTainee";

// import axios from "axios";
// import { Employees } from "./Employee";

// export const Training = () => {
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, []);
//   const [initialData, setInitialData] = useState(Employees);
//   const [listOfTrainee, setListOfTrainee] = useState([]);
//   const [addEmployeeAndTrainingType, setAddEmployeeAndTrainingType] =
//     useState(null);
//   const [employeeData, setEmployeeData] = useState({
//     id: "",
//     name: "",
//     Department: "",
//     courseCode: "",
//     courseName: "",
//     companyName: "",
//     conductedBy: "",
//     mrNumber: "",
//   });

//   const [count, setCount] = useState(2);

//   const searchResult = (afterSearch) => {
//     if (addEmployeeAndTrainingType) {
//       if (addEmployeeAndTrainingType.id === afterSearch.id) {
//         setEmployeeData(addEmployeeAndTrainingType);
//       } else if (afterSearch) {
//         setEmployeeData(afterSearch);
//       } else if (afterSearch === true) {
//         setEmployeeData();
//       }
//     } else if (afterSearch) {
//       setEmployeeData(afterSearch);
//     } else if (afterSearch === true) {
//       setEmployeeData();
//     }

//     // if (afterSearch) {
//     //   setEmployeeData(afterSearch);
//     // } else if (afterSearch === true) {
//     //   setEmployeeData();
//     // }
//   };

//   const showAddEmployee = () => {
//     setCount(0);
//   };
//   const showTrainingType = () => {
//     setCount(1);
//   };
//   const showListOfTrainee = () => {
//     setCount(2);
//   };

//   const finalData = (AllTrainee) => {
//     const updatedList = listOfTrainee.map((m) => {
//       if (m.employeeId === AllTrainee.employeeId) {
//         return AllTrainee;
//       } else {
//         return m;
//       }
//     });

//     const traineeExists = listOfTrainee.some(
//       (trainee) => trainee.employeeId === AllTrainee.employeeId
//     );

//     if (traineeExists) {
//       setListOfTrainee(updatedList);
//     } else {
//       setListOfTrainee([...listOfTrainee, AllTrainee]);
//     }
//   };

//   const addEmpAndTrainingType = (trainingData) => {
//     setAddEmployeeAndTrainingType(trainingData);
//   };
//   useEffect(() => {
//     // axios
//     //   .get("https://jsonplaceholder.typicode.com/posts/1/comments")
//     //   .then((res) => {
//     //     setInitialData(res.data);
//     //   })
//     //   .catch((err) => {
//     //     console.log("fetch data : " + err);
//     //   });
//   }, []);
//   return (
//     <div className="border min-h-screen border-[#F5F6F1] bg-[#F5F6F1] ">
//       <div className="screen-size my-20 bg-[#F5F6F1] ">
//         {/* Training */}
//         <p className="text-[20px] font-medium text-dark_grey pb-3">Training</p>
//         <div className=" flex justify-between items-center">
//           {/* Employee details / Training*/}
//           <div className="flex-1 cursor-pointer">
//             <div className="text_size_5 text-dark_grey">
//               {count === 2 ? (
//                 <span
//                   className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1  ${
//                     count === 2 ? "after:bg-primary" : ""
//                   }`}
//                   onClick={() => {
//                     setCount(2);
//                   }}
//                 >
//                   List of Trainee
//                 </span>
//               ) : (
//                 <div>
//                   <span
//                     className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1  ${
//                       count === 0 ? "after:bg-primary" : ""
//                     }`}
//                     onClick={() => {
//                       setCount(0);
//                     }}
//                   >
//                     Add Employee
//                   </span>{" "}
//                   &nbsp; /&nbsp;
//                   <span
//                     className={`relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1  ${
//                       count === 1 ? "after:bg-primary" : ""
//                     }`}
//                     onClick={() => {
//                       setCount(1);
//                     }}
//                   >
//                     {" "}
//                     Training
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className=" flex-1 flex justify-end ">
//             <SearchDisplay
//               newFormData={initialData}
//               searchResult={searchResult}
//               searchIcon2={<IoSearch />}
//               placeholder="Employee Id"
//             />
//           </div>
//         </div>
//         {/* Form */}
//         <div className="flex justify-center ">
//           {count === 0 && <AddEmployee data={employeeData} />}
//           {count === 1 && (
//             <TrainingType
//               employeeData={employeeData}
//               finalData={finalData}
//               showListOfTrainee={showListOfTrainee}
//               addEmpAndTrainingType={addEmpAndTrainingType}
//             />
//           )}
//           {count === 2 && (
//             <ListOfTainee
//               showAddEmployee={showAddEmployee}
//               showTrainingType={showTrainingType}
//               listOfTrainee={listOfTrainee}
//               searchResult={searchResult}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

export const Training = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <section className="min-h-screen p-10 bg-[#F5F6F1CC] flex gap-16">
      <SelectTiles
        img={icon1}
        text1="HR"
        fontSize="text_size_5 "
        borderColor="border-[#BF91FF]"
        bgColor="bg-white"
        link="/training/hr"
      />

      <SelectTiles
        img={icon2}
        text1="Training Requestor"
        fontSize="text_size_5 "
        borderColor="border-[#7DA2F2]"
        bgColor="bg-white"
        link="/trainingReq"
      />

      <SelectTiles
        img={icon3}
        text1="QA / QC"
        fontSize="text_size_5 "
        borderColor="border-[#BDF27D]"
        bgColor="bg-white"
        link="/trainingQA"
      />
    </section>
  );
};
