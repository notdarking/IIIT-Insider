import React, { useEffect, useState } from "react";
import Data from "../Components/Data";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const data = Data;
  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + data.length - 1) % data.length);
    }, 3000);
    return () => clearInterval(auto);
  }, [data.length]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      <h1 className="py-5 px-4 text-4xl font-noto rounded-lg bg-linear-to-t from-gray-800 to-gray-950 text-shadow-2xs">
        Indian Institute of Information Technology
      </h1>
      <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700 shadow-inner">
          <img
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            src={data[index].image}
            alt={data[index].name}
          />
        </div>
        <span className="mt-6 text-xl md:text-2xl font-semibold text-slate-100 tracking-wide">
          {data[index].name}
        </span>
      </div>
    </div>
  );
};

export default Carousel;
