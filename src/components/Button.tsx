import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void; // Opcional para cliques futuros
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition"
    >
      {text}
    </button>
  );
};

export default Button;
