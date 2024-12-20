"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useOrderForm } from "@/hooks/useOrderForm";
import { Controller } from "react-hook-form";
import PhoneInput from "@/components/inputs/PhoneInput";
import FormInput from "@/components/inputs/FormInput";
import PaymentMethod from "@/components/PaymentMethod";
import OrderOverview from "@/components/OrderOverview";
import SelectInput from "@/components/inputs/SelectInput";

const OrderForm: React.FC = () => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setValue,
    selectedSessions,
    onSubmit,
    validationRules,
    countries,
    cities,
    setSelectedCountry,
    sessionsOptions,
  } = useOrderForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center p-4 md:p-8 bg-gray-50"
    >
      <section className="flex flex-col md:flex-row w-full max-w-5xl gap-2 shadow-xl bg-white rounded-lg">
        <article className="flex-1 py-6 px-3 md:px-6 lg:px-10">
          <header className="text-xl mb-6 text-center">
            <h1 className="font-bold">{t("registrationTitle")}</h1>
            <div className="text-sm text-gray-500 mt-1">
              {t("registrationSubtitle")}
            </div>
          </header>
          <section className="flex flex-col gap-4">
            <Controller
              name="loginPhoneNumber"
              control={control}
              defaultValue=""
              rules={validationRules.phone}
              render={({ field, fieldState }) => (
                <PhoneInput
                  label={t("loginPhoneNumber")}
                  error={fieldState.error?.message}
                  required
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    if (fieldState.error) {
                      setValue("loginPhoneNumber", e, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
              )}
            />
            <Controller
              name="contactPhoneNumber"
              control={control}
              defaultValue=""
              rules={validationRules.phone}
              render={({ field, fieldState }) => (
                <PhoneInput
                  label={t("contactPhoneNumber")}
                  error={fieldState.error?.message}
                  required
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    if (fieldState.error) {
                      setValue("contactPhoneNumber", e, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
              )}
            />
            <Controller
              name="contactEmail"
              control={control}
              defaultValue=""
              rules={validationRules.email}
              render={({ field, fieldState }) => (
                <FormInput
                  label={t("contactEmail")}
                  error={fieldState.error?.message}
                  required
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    if (fieldState.error) {
                      setValue("contactEmail", e.target.value, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
              )}
            />
            <Controller
              name="contactName"
              control={control}
              defaultValue=""
              rules={{
                required: t("requiredField", { field: t("contactName") }),
              }}
              render={({ field, fieldState }) => (
                <FormInput
                  label={t("contactName")}
                  error={fieldState.error?.message}
                  required
                  {...field}
                />
              )}
            />

            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                {t("billingAddress")}
              </label>
              <section className="flex gap-4">
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <FormInput
                      {...field}
                      placeholder={t("addressPlaceholder")}
                      className="flex-auto"
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="nr"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      placeholder={t("nrPlaceholder")}
                      className="flex-1"
                    />
                  )}
                />
              </section>
            </div>
            <div className="flex gap-4">
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={validationRules.postalCode}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    placeholder={t("postalCodePlaceholder")}
                    className="flex-1"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: t("requiredField", { field: t("country") }),
                }}
                render={({ field, fieldState }) => (
                  <SelectInput
                    options={countries}
                    placeholder={t("countryPlaceholder")}
                    className="flex-1"
                    onChange={(event) => {
                      setSelectedCountry(event.target.value);
                      field.onChange(event);
                    }}
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: t("requiredField", { field: t("city") }),
                }}
                render={({ field, fieldState }) => (
                  <SelectInput
                    options={cities}
                    placeholder={t("cityPlaceholder")}
                    className="flex-1"
                    {...field}
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />
            </div>

            <Controller
              name="sessions"
              control={control}
              defaultValue={"6"}
              rules={{ required: t("requiredField") }}
              render={({ field, fieldState }) => (
                <SelectInput
                  options={sessionsOptions}
                  label={t("monthlySessions")}
                  className="flex-1"
                  {...field}
                  error={fieldState.error?.message}
                  required
                />
              )}
            />

            <PaymentMethod control={control} />
          </section>
        </article>

        <aside className="w-full md:w-80 lg:w-[400px]">
          <OrderOverview
            sessions={parseInt(selectedSessions)}
            price={28.4}
            currency="€"
          />
        </aside>
      </section>
    </form>
  );
};

export default OrderForm;
