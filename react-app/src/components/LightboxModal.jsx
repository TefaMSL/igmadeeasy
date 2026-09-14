import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { galleryData } from '../data/siteData';

export const LightboxModal = () => {
  const { lightbox, t } = useApp();
  const touchStartX = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') lightbox.close();
      if (e.key === 'ArrowRight') lightbox.next();
      if (e.key === 'ArrowLeft') lightbox.prev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  if (!lightbox.isOpen) return null;

  const current = galleryData[lightbox.index] || galleryData[0];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped Left
        lightbox.next();
      } else {
        // Swiped Right
        lightbox.prev();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Click to Dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={lightbox.close}
      />

      {/* Main Lightbox Content Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-between bg-slate-900/90 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-slate-300">
              {t('معرض صور الكتاب التفاعلي', 'Interactive Book Gallery')}
            </span>
            <span className="text-xs font-semibold text-slate-500 px-2 py-0.5 rounded-full bg-slate-800">
              {lightbox.index + 1} / {galleryData.length}
            </span>
          </div>

          <button
            onClick={lightbox.close}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Central Visual Stage */}
        <div
          className="relative w-full flex-1 flex items-center justify-center my-3 min-h-[260px] sm:min-h-[380px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Button */}
          <button
            onClick={lightbox.prev}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-orange-500 text-white backdrop-blur-md transition-all shadow-lg focus:outline-none"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Current Enlarged Image */}
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="max-h-[50vh] sm:max-h-[58vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 animate-fadeIn"
          />

          {/* Next Button */}
          <button
            onClick={lightbox.next}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-orange-500 text-white backdrop-blur-md transition-all shadow-lg focus:outline-none"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Caption & Description */}
        <div className="w-full text-center py-2 px-4">
          <h4 className="text-base sm:text-xl font-bold text-white mb-1">
            {t(current.title.ar, current.title.en)}
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {t(current.desc.ar, current.desc.en)}
          </p>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto max-w-full">
          {galleryData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => lightbox.setIndex(idx)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                lightbox.index === idx
                  ? 'border-orange-500 scale-105 shadow-md shadow-orange-500/30'
                  : 'border-slate-700 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LightboxModal;
