"use client";
import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import FormInput from "./inputs/FormInput";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface PaymentMethodProps {
  control: Control;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ control }) => {
  const { t } = useTranslation(); // Use the translation hook
  const [selectedMethod, setSelectedMethod] = useState("sepa");

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <section>
      <h2 className="text-xs text-gray-400 mb-1">{t("selectPaymentMethod")}</h2>
      <div className="p-2 rounded-md border border-gray-100 ltr:pr-8 rtl:pl-8">
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
              alt={t("sepa")}
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
              alt={t("visa")}
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
              rules={{
                required: t("requiredField", { field: t("cardHolder") }),
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  className="mb-4"
                  placeholder={t("cardHolder")}
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
                required: t("requiredField", { field: t("cardNumber") }),
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: t("invalidCardNumber"),
                },
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  className="mb-4"
                  placeholder={t("cardNumber")}
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
                  required: t("requiredField", { field: t("expiryDate") }),
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: t("invalidExpiryDate"),
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
                  required: t("requiredField", { field: t("cvc") }),
                  pattern: {
                    value: /^[0-9]{3}$/,
                    message: t("invalidCvc"),
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormInput
                    placeholder={t("cvc")}
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
              rules={{
                required: t("requiredField", { field: t("iban") }),
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  className="mb-4"
                  placeholder={t("iban")}
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="bic"
              control={control}
              defaultValue=""
              rules={{
                required: t("requiredField", { field: t("bic") }),
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  placeholder={t("bic")}
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 italic mt-2">{t("securePayment")}</p>
    </section>
  );
};

export default PaymentMethod;
