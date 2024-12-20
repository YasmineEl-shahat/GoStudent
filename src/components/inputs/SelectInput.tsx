import React from "react";

interface SelectInputProps {
  label?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  hint,
  options,
  placeholder,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-gray-400 mb-1 block">
          {label}{" "}
          {hint && (
            <span className="text-gray-800">
              (preferably
              <span className="underline">{hint}</span>)
            </span>
          )}
        </label>
      )}
      <select
        required
        className="bg-gray-100 h-[45px] outline-none w-full rounded px-4"
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
