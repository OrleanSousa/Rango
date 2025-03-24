import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode; // Para passar o SVG
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, icon }) => {
  return (
    <div className="flex items-center bg-blue-100 rounded-lg p-3 mb-6">
      {icon && <div className="mr-4">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        className="flex-grow bg-transparent border-none outline-none text-gray-800 text-base"
      />
    </div>
  );
};

export default InputField;
