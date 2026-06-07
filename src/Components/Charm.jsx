import React from "react";
import Card from "./Card";

const Charm = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 m-0">
      <h1 className="text-4xl font-moon">Charm of IIIT'S</h1>
      <div className="grid grid-cols-4 gap-x-2 p-4">
        <Card
            title="Future & Career Focused" 
            body="Code Your Future, Design Your Success.The Launchpad for India's Next-Gen Tech Leaders."
        />
        <Card
            title="Prestige & Selectivity Focused" 
            body="The Elite Track to a Global Tech Career.Join the Ranks of India's Top 1% Tech Talent."
        />
        <Card
            title="Innovation & Specialization Focused" 
            body="Dive Deep into Core Tech. Specialized. Focused. Future-Ready."
        />
        <Card
            title="Career & Placement Perks (The Financial ROI)" 
            body="The High-Value tech degree."
        />
      </div>
    </div>
  );
};

export default Charm;
