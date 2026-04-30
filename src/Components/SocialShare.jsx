import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SocialShare = ({ url, title }) => {
  const [shareLinks, setShareLinks] = useState({});
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (url) {
      api.social.getShareLinks(url, title || document.title).then(setShareLinks);
    }
  }, [url, title]);

  const openShareWindow = (shareUrl) => {
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const socialPlatforms = [
    { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', color: '#1877F2' },
    { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z', color: '#0A66C2' },
    { name: 'WhatsApp', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z', color: '#25D366' },
    { name: 'Reddit', icon: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.496.056 2.51 2.51 0 0 0-2.383-1.703c-.483 0-.936.14-1.32.372a4.942 4.942 0 0 0-2.655-.784c-2.225 0-4.104 1.48-4.728 3.513a3.47 3.47 0 0 0-1.385 2.793c0 .562.14 1.09.38 1.56a3.47 3.47 0 0 0 2.478 4.39c.395.14.816.21 1.249.21.84 0 1.633-.196 2.344-.547.562.312 1.207.492 1.895.492.562 0 1.09-.14 1.56-.38.312.562.492 1.207.492 1.895 0 .84-.196 1.633-.547 2.344.312.562.492 1.207.492 1.895 0 2.207-1.79 3.997-3.997 3.997-.562 0-1.09-.14-1.56-.38-.395.14-.816.21-1.249.21-2.484 0-4.504-2.02-4.504-4.504 0-.433.07-.854.21-1.249a3.47 3.47 0 0 1-2.793-1.385 3.47 3.47 0 0 1-.56-2.478 3.47 3.47 0 0 1 1.385-2.793c.469-.24.997-.38 1.56-.38.84 0 1.633.196 2.344.547.562-.312 1.207-.492 1.895-.492.562 0 1.09.14 1.56.38.312-.562.492-1.207.492-1.895 0-2.207 1.79-3.997 3.997-3.997z', color: '#FF4500' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/15 px-4 py-2 font-semibold text-yellow-100 shadow-lg shadow-yellow-950/30 backdrop-blur-lg transition-all hover:bg-yellow-400/25 hover:text-yellow-200 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
        </svg>
        Share
      </button>

      {showShareMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowShareMenu(false)}
          />
          <div className="absolute right-0 mt-2 bg-gradient-to-br from-gray-950 to-amber-950/80 border border-yellow-400/30 rounded-xl shadow-2xl shadow-yellow-950/30 p-4 z-20 min-w-[200px] backdrop-blur-xl">
            <p className="text-yellow-200 text-sm font-medium mb-3">Share on:</p>
            <div className="space-y-2">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => openShareWindow(shareLinks[platform.name.toLowerCase()])}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-yellow-400/10 rounded-lg transition-colors cursor-pointer"
                  style={{ color: platform.color }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={platform.icon}/>
                  </svg>
                  <span className="text-white text-sm">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;
