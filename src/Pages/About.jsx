import React from "react";

const About = () => {
  return (
    <div className="font-noto text-white bg-black">
      <section className="bg-radial from-amber-600/40 via-[#0f0f13] to-black py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-amber-500 uppercase tracking-wider">
          About IIIT Insider
        </h1>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full mb-6" />
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Your one-stop platform to explore IIIT colleges, insights, and opportunities.
        </p>
      </section>

      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center bg-[#0f0f13] border border-gray-800 rounded-2xl p-8 hover:border-amber-600 transition-colors duration-300">
          <h2 className="text-3xl font-bold mb-6 text-amber-500">Who We Are</h2>
          <p className="text-gray-400 leading-relaxed">
            IIIT Insider is a student-focused platform designed to help aspirants
            explore Indian Institutes of Information Technology. We simplify the
            research process with structured information about colleges, courses,
            placements, and campus life.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-l from-yellow-400/10 to-amber-800/20 backdrop-blur-lg border border-yellow-400/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-amber-500">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            We aim to empower students with reliable information so they can make
            informed decisions about their future. Choosing the right college is
            crucial, and we make that journey easier.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-amber-500">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["Search", "Easily find IIITs based on your preferences."],
              ["Insights", "Get placement stats and course details."],
              ["Profiles", "Explore detailed college information."],
              ["Simple UI", "Use a clean and student-friendly interface."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="bg-[#0f0f13] border border-gray-800 p-6 rounded-2xl hover:border-amber-600 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-yellow-100">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
