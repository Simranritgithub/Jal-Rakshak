import React from "react";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 bg-[#26CCC2] text-white rounded-xl shadow-2xl hover:opacity-80 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
