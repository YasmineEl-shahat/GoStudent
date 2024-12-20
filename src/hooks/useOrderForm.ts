"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { emailRegex, phoneRegex, postalCodeRegex } from "@/utils/regex";
// eslint-disable-next-line
const { getCountries, getCities } = require("countries-cities");

export const useOrderForm = () => {
  const { t } = useTranslation();
  const validationRules = {
    contactPhone: {
      required: t("requiredField", { field: t("contactPhoneNumber") }),
      pattern: {
        value: phoneRegex,
        message: t("invalidPhone"),
      },
    },
    loginPhone: {
      required: t("requiredField", { field: t("loginPhoneNumber") }),
      pattern: {
        value: phoneRegex,
        message: t("invalidPhone"),
      },
    },
    email: {
      required: t("requiredField", { field: t("contactEmail") }),
      pattern: {
        value: emailRegex,
        message: t("invalidEmail"),
      },
    },
    postalCode: {
      required: t("requiredField", { field: t("postalCodePlaceholder") }),
      pattern: {
        value: postalCodeRegex,
        message: t("invalidPostalCode"),
      },
    },
  };
  const countries = getCountries().map((country: string) => ({
    value: country,
    label: country,
  }));

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const citiesList = getCities(selectedCountry);
      setCities(
        citiesList.map((city: string) => ({ value: city, label: city }))
      );
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const sessionsOptions = [
    { value: "6", label: t("monthlySessions") },
    { value: "9", label: t("monthlySessions") },
    { value: "12", label: t("monthlySessions") },
  ];

  const { control, handleSubmit, setValue, watch } = useForm();
  const selectedSessions = watch("sessions", 6);

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return {
    control,
    handleSubmit,
    setValue,
    selectedSessions,
    onSubmit,
    validationRules,
    countries,
    cities,
    selectedCountry,
    setSelectedCountry,
    sessionsOptions,
  };
};
