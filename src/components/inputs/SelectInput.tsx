import React from "react";

interface SelectInputProps {
  label?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  hint,
  options,
  placeholder,
  className,
  onChange,
  error,
  required,
  value,
  name,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-gray-400 mb-1 block">
          {label}
          {required && <span>* </span>}
          {hint && (
            <span className="text-gray-800">
              (preferably
              <span className="underline">{hint}</span>)
            </span>
          )}
        </label>
      )}
      <select
        className={`bg-gray-100 h-[45px] outline-none w-full rounded px-4 ${
          error ? "border border-red-500" : ""
        }`}
        value={value ?? ""}
        name={name}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled key="">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default SelectInput;
