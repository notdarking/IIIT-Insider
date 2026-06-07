import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import Data from "../Components/Data";
import api from "../services/api";

const College = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const region = searchParams.get("region") || "all";
  const initialColleges = useMemo(() => {
    if (location.state?.filteredCollege) {
      return location.state.filteredCollege;
    }

    if (region === "all") {
      return Data;
    }

    return Data.filter((item) => item.region === region);
  }, [location.state, region]);
  const [colleges, setColleges] = useState(initialColleges);
  const [loading, setLoading] = useState(false);

  const normalizeCollegeName = (name) => (
    name || ""
  )
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const normalizeImagePath = (imagePath) => {
    if (!imagePath) {
      return imagePath;
    }

    const publicAssetMatch = imagePath.match(/(?:^|\/)public\/assets\/([^/?#]+)/);
    if (publicAssetMatch) {
      return `/assets/${publicAssetMatch[1]}`;
    }

    return imagePath;
  };

  const mergeCollegeData = (localColleges, backendColleges) => {
    const backendByName = new Map(
      backendColleges.map((college) => [normalizeCollegeName(college.name), college])
    );

    return localColleges.map((college) => {
      const backendCollege = backendByName.get(normalizeCollegeName(college.name));

      if (!backendCollege) {
        return college;
      }

      const backendImage = backendCollege.image || "";
      const canUseBackendImage = backendImage
        && !backendImage.includes("/src/assets/")
        && !backendImage.includes("../src/assets/");

      return {
        ...college,
        ...backendCollege,
        image: canUseBackendImage ? normalizeImagePath(backendImage) : college.image,
        description: backendCollege.description || college.description,
      };
    });
  };

  useEffect(() => {
    let isMounted = true;

    async function loadColleges() {
      setLoading(true);
      try {
        const backendColleges = await api.colleges.getAll(region);
        if (isMounted && Array.isArray(backendColleges) && backendColleges.length > 0) {
          setColleges(
            backendColleges.length >= initialColleges.length
              ? backendColleges.map((college) => ({
                  ...college,
                  image: normalizeImagePath(college.image),
                }))
              : mergeCollegeData(initialColleges, backendColleges)
          );
        } else if (isMounted) {
          setColleges(initialColleges);
        }
      } catch (error) {
        if (isMounted) {
          setColleges(initialColleges);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadColleges();

    return () => {
      isMounted = false;
    };
  }, [region, initialColleges]);

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-3xl font-bold font-noto text-amber-500 mb-4">No Colleges Found</h2>
        <p className="text-gray-400 mb-6">Please select a region from the Quick Links to view colleges.</p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-[#4b2c2c] text-amber-500 font-bold rounded-xl hover:bg-amber-600 hover:text-white transition-all"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black w-full p-8 pt-24">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-wider mb-2 font-noto">
          Explore Colleges
        </h1>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full"></div>
        {loading && <p className="text-sm text-gray-500 mt-4">Loading latest college data...</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-300 mx-auto">
        {colleges.map((college, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-[#0f0f13] border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-600 transition-colors duration-300"
          >
            <div className="w-full h-48 overflow-hidden bg-gray-800 relative">
              <img 
                src={college.image} 
                alt={college.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/80 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase border border-amber-600/30">
                {college.region}
              </div>
            </div>

            <div className="p-6 flex flex-col grow">
              <h3 className="text-xl font-bold text-white mb-3 font-noto">
                {college.name}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 grow">
                {college.description}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default College;
