import { Link } from "react-router-dom";

export const SelectTiles = ({
  img,
  text1,
  text2,
  fontSize,
  borderColor,
  bgColor,
  link,
  onClick
}) => {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`shadow-lg border ${borderColor} ${bgColor} text-secondary my-5 h-36 max-w-48 w-full rounded-xl flex flex-col items-center justify-center text-center gap-3 p-5`}
    >
      <div className="w-full max-w-[60px]">
        <img className="w-full" src={img} alt="TimeSheet icons not found" />
      </div>
      <p className={`${fontSize}`}>
        {text1} <br />
        {text2}
      </p>

    </Link>
  );
};
