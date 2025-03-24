import React from "react";

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  return (
    <label className="flex items-center gap-2 text-gray-600">
      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
      {label}
    </label>
  );
};

export default Checkbox;
