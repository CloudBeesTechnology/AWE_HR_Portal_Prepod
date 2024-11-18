
import iconList from '../../assets/recruitment/candidate/candylist.svg';
import iconAdd from '../../assets/recruitment/candidate/add-candidate.svg';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const Candidate = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#F5F6F1]">
      <div className="center gap-20 m-20 text-black">
        <div
          onClick={() => navigate('/recrutiles/listofcandi')} 
          className="border-1 shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] bg-white rounded-xl w-64 h-72 p-5 cursor-pointer hover:border-4 hover:border-[#0D4B8F]"
        >
          <div className="bg-[#CDE4FD] rounded-full my-10 w-24 h-24 flex justify-center items-center m-auto">
            <img
              className="w-13 h-16 object-cover"
              src={iconList}
              alt="Candidates List Icon"
            />
          </div>
          <h5 className="text-[18px] font-semibold text-center">Candidates List</h5>
        </div>

        <div
          onClick={() => navigate('/addCandidates')} 
          className="border-1 shadow-[0_1px_4px_1px_rgba(0,0,0,0.2)] bg-white rounded-xl w-64 h-72 p-5 cursor-pointer hover:border-4 hover:border-[#0D4B8F]"
        >
          <div className="bg-[#CDE4FD] rounded-full my-10 w-24 h-24 flex justify-center items-center m-auto">
            <img
              className="w-13 h-16 object-cover"
              src={iconAdd}
              alt="Add Candidate Icon"
            />
          </div>
          <h5 className="text-[18px] font-semibold text-center">Add Candidate</h5>
        </div>
      </div>
      <Outlet /> 
    </section>
  );
};
