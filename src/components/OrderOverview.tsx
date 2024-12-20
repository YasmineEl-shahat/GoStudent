"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useOrderOverview } from "@/hooks/useOrderOverview";

interface OrderOverviewProps {
  sessions: number;
  price: number;
  currency: string;
}

const OrderOverview: React.FC<OrderOverviewProps> = ({
  sessions,
  price,
  currency,
}) => {
  const { t } = useTranslation();
  const {
    selectedPlan,
    payInAdvance,
    setPayInAdvance,
    totalSessions,
    totalPrice,
    discount,
    setupFee,
    total,
    handlePlanSelect,
  } = useOrderOverview({ sessions, price });

  return (
    <main className="bg-gray-50 p-6 h-full rounded-r-lg flex flex-col justify-between">
      <section>
        <h2 className="text-lg font-bold text-black mb-4">
          {t("orderOverview")}
        </h2>

        <ul className="grid grid-cols-3">
          {[6, 9, 12, 18, 24, 36].map((months) => (
            <li
              key={months}
              onClick={() => handlePlanSelect(months)}
              className={`border p-2 text-xs p-4 text-gray-400 cursor-pointer ${
                selectedPlan === months ? "border-blue-500" : "border-gray-300"
              }`}
            >
              {months} {t("months")}
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-2 my-5 gap-2">
          <Switch
            checked={payInAdvance}
            onCheckedChange={setPayInAdvance}
            id="pay-in-advance"
          />
          <Label
            htmlFor="pay-in-advance"
            className="text-sm text-gray-500 ml-0"
          >
            {t("payInAdvance")}
          </Label>
        </div>

        <section className="space-y-5 mt-10 text-xs">
          <article className="flex justify-between text-gray-500">
            <p>{t("numberOfSessions")}</p>
            <p className="font-bold text-black">{totalSessions}</p>
          </article>
          <article className="flex justify-between text-gray-500">
            <p>{t("regularPrice")}</p>
            <p className="line-through font-bold text-black">
              {price.toFixed(2)}
              {currency}
            </p>
          </article>
          <article className="flex justify-between text-gray-500">
            <p>{t("yourPrice")}</p>
            <p className="font-bold text-black">
              {totalPrice.toFixed(2)}
              {currency}
            </p>
          </article>
          <article className="flex justify-between text-green-500">
            <p>{t("discount")}</p>
            <p>
              -{discount.toFixed(2)}
              {currency}
            </p>
          </article>
          <hr className="border-white" />
          <article className="flex justify-between text-blue-500">
            <p>{t("setupFee")}</p>
            <p>
              {setupFee.toFixed(2)}
              {currency}
            </p>
          </article>
          <article className="flex justify-between text-gray-500">
            <p>{t("totalPm")}</p>
            <p>
              {total.toFixed(2)}
              {currency}
            </p>
          </article>
        </section>

        <label className="flex items-start gap-2 my-5">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-gray-500">{t("termsConditions")}</span>
        </label>

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          {t("orderNow")}
        </button>
      </section>

      <footer className="text-center mt-6 text-sm font-bold text-gray-500">
        {t("satisfactionRate")}
      </footer>
    </main>
  );
};

export default OrderOverview;
