"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  label: string;
  hint?: string;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({ label, hint }) => {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">
        {label}{" "}
        {hint && (
          <span className="text-gray-800">
            (preferably
            <span className="underline"> {hint}</span>)
          </span>
        )}
      </label>
      <PhoneInput
        country={"gr"}
        inputClass="!bg-gray-100 !h-[45px] !border-none !w-[100%] rounded !pl-[40px]"
      />
    </div>
  );
};

export default PhoneInputComponent;
