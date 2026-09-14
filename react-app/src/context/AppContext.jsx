import React, { createContext, useContext, useState, useEffect } from 'react';
import { galleryData } from '../data/siteData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Language State: 'ar' or 'en'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ig_lang') || 'ar';
  });

  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ig_theme') || 'light';
  });

  // Lightbox State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    index: 0,
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync Language & RTL/LTR with HTML root
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('ig_lang', lang);
  }, [lang]);

  // Sync Dark Mode class with HTML root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('ig_theme', theme);
  }, [theme]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Helper function for quick translation
  const t = (arText, enText) => {
    return lang === 'ar' ? arText : enText;
  };

  // Lightbox handlers
  const openLightbox = (index = 0) => {
    setLightbox({ isOpen: true, index });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const nextLightbox = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % galleryData.length,
    }));
  };

  const prevLightbox = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + galleryData.length) % galleryData.length,
    }));
  };

  const setLightboxIndex = (index) => {
    setLightbox((prev) => ({ ...prev, index }));
  };

  // Toast Notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        toggleTheme,
        t,
        lightbox: {
          isOpen: lightbox.isOpen,
          index: lightbox.index,
          open: openLightbox,
          close: closeLightbox,
          next: nextLightbox,
          prev: prevLightbox,
          setIndex: setLightboxIndex,
        },
        toast: {
          message: toastMessage,
          show: showToast,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
