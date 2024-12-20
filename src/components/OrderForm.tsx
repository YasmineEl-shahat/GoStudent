"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "@/components/inputs/PhoneInput";
import FormInput from "@/components/inputs/FormInput";
import PaymentMethod from "@/components/PaymentMethod";
import OrderOverview from "@/components/OrderOverview";
import SelectInput from "@/components/inputs/SelectInput";

// eslint-disable-next-line
const { getCountries, getCities } = require("countries-cities");

const OrderForm: React.FC = () => {
  const countries: { value: string; label: string }[] = getCountries().map(
    (country: string) => ({
      value: country,
      label: country,
    })
  );

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
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
    { value: "4", label: "4 Sessions" },
    { value: "8", label: "8 Sessions" },
    { value: "12", label: "12 Sessions" },
  ];

  return (
    <main className="flex justify-center p-4 md:p-8 bg-gray-50">
      <section className="flex flex-col md:flex-row w-full max-w-5xl gap-2 shadow-xl bg-white rounded-lg">
        {/* Left side - Form */}
        <article className="flex-1 py-6 px-3 md:px-6 lg:px-10">
          <header className="text-xl mb-6 text-center">
            <h1 className="font-bold">Registration & Booking at GoStudent</h1>
            <div className="text-sm text-gray-500 mt-1">
              The leading platform for online tutoring.
            </div>
          </header>
          <section className="flex flex-col gap-4">
            <PhoneInput label="LOGIN PHONE NUMBER" hint="the student's" />
            <PhoneInput label="CONTACT PHONE NUMBER" hint="the parent's" />
            <FormInput label="CONTACT EMAIL ADDRESS" hint="the parent's" />
            <FormInput label="CONTACT NAME" />

            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                BILLING ADDRESS
              </label>
              <section className="flex gap-4">
                <FormInput placeholder="Address" className="flex-auto" />
                <FormInput placeholder="Nr" className="flex-1" />
              </section>
            </div>
            <div className="flex gap-4">
              <FormInput placeholder="Postal code" className="flex-1" />
              <SelectInput
                options={countries}
                placeholder="Country"
                className="flex-1"
                onChange={(event) => setSelectedCountry(event.target.value)}
              />
              <SelectInput
                options={cities}
                placeholder="City"
                className="flex-1"
              />
            </div>

            <SelectInput
              options={sessionsOptions}
              label="Monthly Sessions"
              className="flex-1"
            />

            <PaymentMethod />
          </section>
        </article>

        {/* Right side - Order Overview */}
        <aside className="w-full md:w-80 lg:w-[400px]">
          <OrderOverview sessions={8} price={28.4} currency="€" />
        </aside>
      </section>
    </main>
  );
};

export default OrderForm;
