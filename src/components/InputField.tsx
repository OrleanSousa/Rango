import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode; // Para o SVG ou ícones passados como prop
  value: string; // Necessário para a conexão com o estado
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Para atualizar o estado
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, icon, value, onChange }) => {
  return (
    <div className="flex items-center bg-blue-100 rounded-lg p-3 mb-6">
      {icon && <div className="mr-4">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value} // Agora está ligado ao estado!
        onChange={onChange} // Atualiza o estado no componente pai
        className="flex-grow bg-transparent border-none outline-none text-gray-800 text-base"
      />
    </div>
  );
};

export default InputField;
