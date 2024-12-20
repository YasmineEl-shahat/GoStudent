import React from "react";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  hint,
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

      <input
        type="text"
        required
        placeholder={placeholder}
        className="bg-gray-100 h-[45px] outline-none w-full rounded px-4"
      />
    </div>
  );
};

export default FormInput;
