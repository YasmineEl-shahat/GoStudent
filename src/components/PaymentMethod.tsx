"use client";
import React, { useState } from "react";
import FormInput from "./inputs/FormInput";
import Image from "next/image";

const PaymentMethod: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("sepa");

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <section>
      <h2 className="text-xs text-gray-400 mb-1">Select Payment Method</h2>
      <div className="p-2 rounded-md border border-gray-100 pr-8">
        <article className="flex flex-col mb-4 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="sepa"
              checked={selectedMethod === "sepa"}
              onChange={handleMethodChange}
              className="form-radio text-blue-600"
            />
            <Image
              src="/assets/images/sepa.webp"
              alt="SEPA"
              width={50}
              height={32}
              className="rounded"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="visa"
              checked={selectedMethod === "visa"}
              onChange={handleMethodChange}
              className="form-radio text-blue-600"
            />
            <Image
              src="/assets/images/Visa.png"
              alt="Visa"
              width={80}
              height={32}
              className="rounded"
            />
          </label>
        </article>

        {/* Conditionally render input fields based on selected method */}
        {selectedMethod === "visa" && (
          <div className="visa-specific-fields">
            <FormInput className="mb-4" placeholder="Card holder" />
            <FormInput className="mb-4" placeholder="Card number" />
            <div className="flex gap-4">
              <FormInput placeholder="MM / YY" />
              <FormInput placeholder="CVC" />
            </div>
          </div>
        )}
        {selectedMethod === "sepa" && (
          <div className="sepa-specific-fields">
            <FormInput className="mb-4" placeholder="IBAN" />
            <FormInput placeholder="BIC" />
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 italic mt-2">
        100% secure payment. All data is encrypted.
      </p>
    </section>
  );
};

export default PaymentMethod;
