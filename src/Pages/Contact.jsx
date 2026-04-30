import React from "react";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thanks for contacting us. We will get back to you soon.");
    event.currentTarget.reset();
  };

  return (
    <div className="font-noto text-white bg-black">
      <section className="bg-radial from-amber-600/40 via-[#0f0f13] to-black py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-amber-500 uppercase tracking-wider">
          Contact Us
        </h1>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full mb-6" />
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Have a question or want to connect? We would love to hear from you.
        </p>
      </section>

      <section className="py-16 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6 text-amber-500">Get in Touch</h2>
            <div className="space-y-6">
              <div className="bg-[#0f0f13] border border-gray-800 p-6 rounded-2xl hover:border-amber-600 transition-colors duration-300">
                <p className="text-lg font-bold text-yellow-100">Email</p>
                <a href="mailto:bronahh152@gmail.com" className="text-amber-500 hover:text-yellow-200 transition-colors">
                  bronahh152@gmail.com
                </a>
              </div>
              <div className="bg-[#0f0f13] border border-gray-800 p-6 rounded-2xl hover:border-amber-600 transition-colors duration-300">
                <p className="text-lg font-bold text-yellow-100">Response Time</p>
                <p className="text-gray-400 text-sm">We usually respond within 48 hours.</p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-l from-yellow-400/10 to-amber-800/20 backdrop-blur-lg border border-yellow-400/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-amber-500">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600" />
              <input type="email" placeholder="Your Email" required className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600" />
              <textarea rows="5" placeholder="Your Message" required className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600" />
              <button type="submit" className="w-full bg-[#4b2c2c] text-amber-500 py-3 rounded-lg font-bold hover:bg-amber-600 hover:text-white transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
