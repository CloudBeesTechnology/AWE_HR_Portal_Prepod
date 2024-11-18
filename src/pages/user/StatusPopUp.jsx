import { IoCheckmarkCircle } from "react-icons/io5";

export const StatusPopUp = ({setPopUp}) => {
  return (
    <section className="bg-white text_size_5 center flex-col text-dark_grey p-10 gap-5 rounded-lg shadow-[0_1px_6px_1px_rgba(0,0,0,0.2)]">
        <p className="text-[#08A757] text-3xl"><IoCheckmarkCircle /></p>
        <h6>Email Verified successfully</h6>
        <button className="primary_btn" onClick={()=>{
            setPopUp(false)
        }}>Submit</button>
       </section>
  )
}
