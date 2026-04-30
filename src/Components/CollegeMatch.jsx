import React from "react";
import Button from "./Button";

const CollegeMatch = () => {
  return (
    <div className="flex flex-col gap-6 m-4">
      <h1 className="relative inline-block text-5xl font-moon text-center group">
        ARE YOU READY TO FIND YOUR COLLEGE MATCH!
        <span className="absolute left-0 -bottom-2 h-0.75 w-full bg-red-500 scale-x-0 origin-center transition-transfor duration-500 ease-out group-hover:scale-x-100"></span>
      </h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 gap-32">
          <div className="flex flex-col items-center gap-6 relative group">
            <img
              className="w-42 h-32 object-contain"
              src="../src/assets/college.png"
              alt="College"
            />

            <div className="absolute bottom-0 transition-all duration-300 group-hover:bottom-10">
              <Button name="College" path="/college?region=all" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 relative group">
            <img
              className="w-42 h-32 object-contain"
              src="../src/assets/exams.png"
              alt="Exams"
            />
            <div className="absolute bottom-0 transition-all duration-300 group-hover:bottom-10">
                <Button name="Exams" path="/exam" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 relative group">
            <img
              className="w-42 h-32 object-contain"
              src="../src/assets/cutoff.png"
              alt="Cutoff"
            />
            <div className="absolute bottom-0 transition-all duration-300 group-hover:bottom-10">
                <Button name="Cutoff" path="/cutoff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeMatch;
