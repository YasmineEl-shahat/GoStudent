"use client";
import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import FormInput from "./inputs/FormInput";
import Image from "next/image";

interface PaymentMethodProps {
  control: Control;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ control }) => {
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
          <>
            <Controller
              name="cardHolder"
              control={control}
              defaultValue=""
              rules={{ required: "Card holder name is required" }}
              render={({ field, fieldState }) => (
                <FormInput
                  className="mb-4"
                  placeholder="Card holder"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="cardNumber"
              control={control}
              defaultValue=""
              rules={{
                required: "Card number is required",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: "Card number must be 16 digits",
                },
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  className="mb-4"
                  placeholder="Card number"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <div className="flex gap-4">
              <Controller
                name="expiryDate"
                control={control}
                defaultValue=""
                rules={{
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Invalid expiry date format (MM/YY)",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormInput
                    placeholder="MM / YY"
                    className="flex-1"
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="cvc"
                control={control}
                defaultValue=""
                rules={{
                  required: "CVC is required",
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: "CVC must be 3 digits",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormInput
                    placeholder="CVC"
                    className="flex-1"
                    error={fieldState.error?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </>
        )}
        {selectedMethod === "sepa" && (
          <>
            <Controller
              name="iban"
              control={control}
              defaultValue=""
              rules={{ required: "IBAN is required" }}
              render={({ field, fieldState }) => (
                <FormInput
                  className="mb-4"
                  placeholder="IBAN"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="bic"
              control={control}
              defaultValue=""
              rules={{ required: "BIC is required" }}
              render={({ field, fieldState }) => (
                <FormInput
                  placeholder="BIC"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 italic mt-2">
        100% secure payment. All data is encrypted.
      </p>
    </section>
  );
};

export default PaymentMethod;
