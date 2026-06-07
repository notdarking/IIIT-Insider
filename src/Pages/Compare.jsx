import React, { useState } from "react";
import ComparingData from "../Components/ComparingData";
import api from "../services/api";

const Compare = () => {
  const [college1, setCollege1] = useState("");
  const [college2, setCollege2] = useState("");
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [error, setError] = useState("");

  
  const getCompareData = async (collegeName) => {
    const key = collegeName.trim().toLowerCase();
    if (!key) return null;

    try {
      const backendData = await api.colleges.compare(key);
      if (backendData && backendData.name) {
        return backendData;
      }
    } catch (error) {
      // Keep the comparison usable before backend data is seeded.
    }

    return ComparingData[key] || null;
  };

  const handleSearch = async () => {
    setError("");
    setResult1(null);
    setResult2(null);

    const key1 = college1.trim().toLowerCase();
    const key2 = college2.trim().toLowerCase();

    const data1 = await getCompareData(college1);
    const data2 = await getCompareData(college2);

    if (!data1 && key1 !== "") {
      setError((prev) => `${prev} '${college1}' not found. `);
    }
    if (!data2 && key2 !== "") {
      setError((prev) => `${prev} '${college2}' not found.`);
    }

    setResult1(data1 || null);
    setResult2(data2 || null);
  };

  const renderTable = (data, delayClass) => {
    if (!data) return null;
    return (
      <div className={`w-full overflow-hidden rounded-xl shadow-2xl bg-gray-900 border border-gray-700 animate-fade-in-up ${delayClass}`}>
        <table className="w-full text-left border-collapse text-white">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr 
                key={key} 
                className="border-b border-gray-800 hover:bg-gray-800 transition-all duration-300 ease-in-out group"
              >
                <th className="p-4 capitalize border-r border-gray-800 text-yellow-500 w-1/3 font-semibold transition-transform duration-300 group-hover:translate-x-1">
                  {key}
                </th>
                <td className="p-4 leading-relaxed transition-transform duration-300 group-hover:translate-x-1">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0; 
          }
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
        `}
      </style>

      <div className="w-screen min-h-screen px-4 py-12 md:px-10 flex flex-col items-center bg-black font-sans">
        
        <div className="flex flex-col md:flex-row items-end gap-5 bg-linear-to-br from-gray-900 to-black px-8 py-6 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.1)] border border-gray-800 w-full max-w-4xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]">
          

          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-yellow-500 tracking-wide uppercase">
              College 1
            </label>
            <input
              type="text"
              placeholder="e.g. iiit allahabad"
              value={college1}
              onChange={(e) => setCollege1(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500"
            />
          </div>


          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-yellow-500 tracking-wide uppercase">
              College 2
            </label>
            <input
              type="text"
              placeholder="e.g. iiit gwalior"
              value={college2}
              onChange={(e) => setCollege2(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 placeholder-gray-500"
            />
          </div>


          <button
            onClick={handleSearch}
            className="px-8 py-3 w-full md:w-auto font-bold tracking-wide rounded-lg cursor-pointer bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500/30 active:scale-95 transition-all duration-300 ease-out"
          >
            Compare
          </button>
        </div>


        {error && (
          <div className="mt-6 px-6 py-3 bg-red-900/30 border border-red-500/50 text-red-400 rounded-lg font-medium animate-fade-in-up">
            {error}
          </div>
        )}


        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 mt-12 text-sm md:text-base justify-center items-start">
          <div className="w-full md:w-1/2">
            {renderTable(result1, "delay-100")}
          </div>
          <div className="w-full md:w-1/2">
            {renderTable(result2, "delay-200")}
          </div>
        </div>

      </div>
    </>
  );
};

export default Compare;
