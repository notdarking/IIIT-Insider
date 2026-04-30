import React from "react";

const Card = ({title, body}) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 p-4 relative group">
        {/* top */}
        <span className="absolute left-0 top-0 h-0.5 bg-amber-700 w-0 transition-all duration-500 group-hover:w-full"></span>
        {/* bottom */}
        <span className="absolute right-0 bottom-0 h-0.5 bg-amber-700 w-0 transition-all duration-500 group-hover:w-full"></span>
        {/* left */}
        <span className="absolute left-0 top-0 w-0.5 bg-amber-700 h-0 transition-all delay-300 duration-500 group-hover:h-full"></span>
        {/* right */}
        <span className="absolute right-0 bottom-0 w-0.5 bg-amber-700 h-0 transition-all delay-300 duration-500 group-hover:h-full"></span>
        <h3 className="my-2 font-noto text-xl bg-linear-to-r from-yellow-800 to-black rounded-lg px-2">
          {title}
        </h3>
        <p className="font-serif ">
          {body}
        </p>
      </div>
    </div>
  );
};

export default Card;
// 