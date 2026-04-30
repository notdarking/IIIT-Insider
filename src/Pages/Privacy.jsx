import React from "react";

const Privacy = () => {
  return (
    <div className="font-noto text-white bg-black">
      <section className="bg-radial from-amber-600/40 via-[#0f0f13] to-black py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-amber-500 uppercase tracking-wider">
          Privacy Policy
        </h1>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full mb-6" />
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Your privacy is important to us. This policy explains how we collect and use your data.
        </p>
      </section>

      <section className="py-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto bg-[#0f0f13] border border-gray-800 p-8 rounded-2xl space-y-6 hover:border-amber-600 transition-colors duration-300">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

          {[
            ["Information We Collect", "We may collect your name, email address, messages, browser type, device information, and usage patterns to improve our services."],
            ["How We Use Your Information", "We use information to respond to queries, improve the website, enhance user experience, and maintain platform security."],
            ["Data Sharing", "We do not sell, trade, or rent your personal information to third parties unless required by law."],
            ["Cookies", "Our website may use cookies to improve browsing. You can disable cookies through your browser settings."],
            ["Data Security", "We use reasonable security measures, but no internet transmission method is completely secure."],
            ["Third-Party Links", "External links may appear on the site. We are not responsible for their privacy practices."],
          ].map(([title, body], index) => (
            <div key={title}>
              <h2 className="text-xl font-bold mb-2 text-yellow-100">
                {index + 1}. {title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-100">7. Contact Us</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <a href="mailto:bronahh152@gmail.com" className="text-amber-500 mt-2 inline-block">
              bronahh152@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
