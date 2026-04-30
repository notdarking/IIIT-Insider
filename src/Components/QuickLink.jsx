import React from "react";
import Logo from "./Logo";
import Name from "./Name";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const QuickLink = () => {
  return (
    <div className="flex flex-col justify-around items-center w-screen h-130 bg-radial from-amber-300 to-black mt-5 mb-0">
      <div className="flex flex-row justify-between items-center p-5 w-[80%]">
        <div className="flex flex-col justify-center items-center gap-1.5">
          <Logo />
          <Name />
          <span className="text-xs font-noto font-bold">
            Your Preferred Place For Dreams
          </span>
        </div>

        
        <div className="flex flex-col justify-center items-center gap-1.5">
          <span className="font-noto font-bold text-amber-600">Quick Link</span>
          <Button name="Home" path="/" />
          <Button name="About Us" path="/about" />
          <Button name="Contact" path="/contact" />
          <Button name="Support" path="/support" />
          <Button name="Privacy Policy" path="/privacy" />
        </div>


        <div className="flex flex-col justify-center items-center gap-1 pt-1">
          <span className="font-noto font-bold text-amber-600">
            Region Wise College
          </span>
          
          <NavLink
            to="/college?region=west"
            className='px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer'
          >
            West
          </NavLink>
          <NavLink
            to="/college?region=north"
            className='px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer'
          >
            North
          </NavLink>
          <NavLink
            to="/college?region=south"
            className='px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer'
          >
            South
          </NavLink>
          <NavLink
            to="/college?region=east"
            className='px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer'
          >
            East
          </NavLink>
          <NavLink
            to="/college?region=central"
            className='px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer'
          >
            Central
          </NavLink>
        </div>


        <div className="flex flex-col justify-center items-center gap-1.5">
          <span className="font-noto font-bold text-amber-600">
            Quick Websites
          </span>
          <a
            href="http://jeemain.nta.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer text-yellow-100 hover:bg-yellow-400/20"
          >
            JEE Mains
          </a>
          <a
            href="https://ugadmissions.iiit.ac.in/ugee-process/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer text-yellow-100 hover:bg-yellow-400/20"
          >
            UGEEE
          </a>
          <a
            href="https://jeeadv.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer text-yellow-100 hover:bg-yellow-400/20"
          >
            JEE Advance
          </a>
        </div>
      </div>


      <div className="flex flex-col justify-between items-center p-5">
        <span className="font-noto font-bold text-amber-600">Follow Us</span>

        
        <div className="flex justify-center items-center gap-6 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="w-12 h-12"
            />
          </a>

          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png"
              alt="X"
              className="w-12 h-12 bg-white rounded-md"
            />
          </a>

          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="w-12 h-12"
            />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
              alt="LinkedIn"
              className="w-12 h-12"
            />
          </a>
        </div>

        <p className="text-xl font-semibold text-[#9d7a7a]">
          © 2025 IIIT INSIDER. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default QuickLink;
