// src/components/LanguageToggle.js
import React from 'react';
import { useLanguage } from '../context/languageContext.jsx';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "as", name: "অসমীয়া" },
    { code: "bn", name: "বাংলা" },
    { code: "lus", name: "Mizo" },
    { code: "mni-Mtei", name: "Manipuri" },
  ];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none bg-white py-2 pl-3 pr-8 rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageToggle;