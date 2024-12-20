import React from "react";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  className?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  hint,
  className,
  error,
  required,
  value,
  onChange,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-gray-400 mb-1 block uppercase">
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

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-gray-100 h-[45px] outline-none w-full rounded px-4 ${
          error ? "border border-red-500" : ""
        }`}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default FormInput;
