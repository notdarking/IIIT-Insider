import React from "react";
import Name from "./Name";
import Logo from "./Logo";
import Button from "./Button";
import Data from "./Data";
import { NavLink } from "react-router-dom";
import NotificationButton from "./NotificationButton";
import SocialShare from "./SocialShare";

const Navbar = () => {
  const filterCollege = function (region) {
    if (region === "all") {
      return Data;
    }
    return Data.filter((item) => item.region === region);
  };

  return (
    <div className="h-25 w-screen flex justify-around">
      <div className="flex items-center justify-center gap-4">
        <Logo />
        <Name />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-10 bg-linear-to-l from-yellow-400/30 to-amber-800/30 backdrop-blur-lg border border-yellow-400/40 shadow-xl rounded-2xl px-4 py-2">
          <Button name="Home" path="/" />
          <NavLink
            to="/college"
            state={{ filteredCollege: filterCollege("all") }}
            className={({isActive})=>`{
                px-4 py-1 font-semibold transition-all rounded-xl active:tracking-tight cursor-pointer
                ${
                    isActive 
                    ? "bg-yellow-400/30 text-yellow-200"
                    : "text-yellow-100 hover:bg-yellow-400/20"
                }
            }`}
          >
            College
          </NavLink>
          <Button name="Compare" path="/compare" />
          <Button name="User Table" path="/userTable" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 px-6 ">
        <NotificationButton />
        <SocialShare url={window.location.href} title="IIIT Insider" />
        <Button name="Register" path="/register" />
      </div>
    </div>
  );
};

export default Navbar;
