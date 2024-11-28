import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
}) => {
  return (
    <div className="relative mb-4 w-full max-w-sm">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`p-2 border w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        name={name}
      />
      {error && (
        <span className="absolute w-[200px] left-full ml-2 top-[25%] text-red-500 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
