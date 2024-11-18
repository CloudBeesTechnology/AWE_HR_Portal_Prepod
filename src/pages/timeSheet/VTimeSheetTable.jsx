
export const VTimeSheetTable = ({ afterSearch }) => {

  return (
    <section>
      <div className="flex justify-center mt-9 ">
        {/* w-[1190px] */}
        <table className="text-center w-full rounded-md overflow-hidden shadow-md">
        <thead>
            <tr className="bg-lite_grey h-10 text-dark_grey text_size_5 text-start">
              <td className="px-5 text-center">S No.</td>
              <td className="px-7">Employee Name</td>
              <td className="pr-14 text-center">Sub ID</td>
              <td className="px-7">Location</td>
              <td className="px-7 text-center">Date</td>
           
              <td className="px-7 text-center">Total NT</td>
              <td className="pr-7 text-center">Total OT</td>
            </tr>
          </thead>
          <tbody>
          {afterSearch &&
              afterSearch.map((m, index) => {
                return (
                  <tr
                    key={index}
                    className="text-dark_grey h-[53px] bg-white text-sm rounded-sm shadow-md text-start "
                  >
                    <td className="px-5 text-center">{m.employeeId}</td>
                    <td className="px-7">{m.employeeName}</td>
                    <td className="text-center pr-14">{m["Sub ID"]}</td>
                    <td className="px-7">{m.Loction}</td>
                    <td className="text-center px-5">{m["Start Date"]}</td>
                    
                    <td className="text-center px-7">{m["Total NT"]}</td>
                    <td className="text-center pr-7">{m["Total OT"]}</td>
                   
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
