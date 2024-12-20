"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  hint,
  error,
  required,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">
        {label}
        {required && <span>* </span>}
        {hint && (
          <span className="text-gray-800">
            (preferably
            <span className="underline"> {hint}</span>)
          </span>
        )}
      </label>
      <div
        style={{
          direction: "ltr",
        }}
      >
        <PhoneInput
          country={"gr"}
          value={value}
          onChange={(value) => onChange(value)}
          inputClass={`!bg-gray-100 !h-[45px] !w-[100%] rounded !pl-[40px] ${
            error ? "!border !border-red-500" : "!border-none"
          }`}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default PhoneInputComponent;
