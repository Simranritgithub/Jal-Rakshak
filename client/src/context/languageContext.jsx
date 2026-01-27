import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../utils/axiosInstance";

import commonEN from "../locales/en/common.json";
import dashboardEN from "../locales/en/dashboard.json";
import sidebarEN from '../locales/en/sidebar.json';

const LanguageContext = createContext();

const initialStrings = {
  common: commonEN,
  dashboard: dashboardEN,
  sidebar: sidebarEN,
};
const languageMap = {
  en: "English",
  hi: "Hindi",
  as: "Assamese",
  bn: "Bengali",
  lus: "Mizo",
  "mni-Mtei": "Manipuri",
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [uiStrings, setUiStrings] = useState(initialStrings);
  
  // --- NEW: Add a loading state ---
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (language === "en") {
      setUiStrings(initialStrings);
      return;
    }
    
    const fetchTranslations = async () => {
      setIsLoading(true); // <-- Set loading to true before the API call
      console.log(`Fetching translations for: ${language}`); // <-- For debugging
      try {
        const response = await axios.post("/translate", {
          json_data: initialStrings,
          target_language: language,
          language_name: languageMap[language],
        });
        setUiStrings(response.data);
      } catch (error) {
        console.error("Failed to fetch translations:", error);
        setUiStrings(initialStrings);
      } finally {
        setIsLoading(false); // <-- Set loading to false after the call finishes (or fails)
      }
    };
    
    fetchTranslations();
  }, [language]);

  const t = (key) => {
    // --- NEW: Show a loading indicator if translations are fetching ---
    if (isLoading) {
      return "..."; // Or any other loading indicator you prefer
    }
    
    const parts = key.split(":");
    if (parts.length !== 2) return key;

    const [namespace, stringKey] = parts;

    return uiStrings[namespace]?.[stringKey] || key;
  };

  // --- NEW: Expose 'isLoading' state through the context ---
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);