"use client";
import React, { useState } from "react";

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
  const [selectedPlan, setSelectedPlan] = useState(6);
  const [payInAdvance, setPayInAdvance] = useState(false);
  const [totalSessions, setTotalSessions] = useState(sessions);
  const [totalPrice, setTotalPrice] = useState(price);

  const discount = 9.6;
  const setupFee = 0.0;
  const extraDiscount = payInAdvance ? totalPrice * 0.05 : 0;
  const total = totalSessions * totalPrice - discount - extraDiscount;

  const handlePlanSelect = (months: number) => {
    setSelectedPlan(months);
    // Update sessions and price based on the selected plan

    if (months === 6) {
      setTotalSessions(6);
      setTotalPrice(price);
    } else if (months === 9) {
      setTotalSessions(9);
      setTotalPrice(price * 0.95);
    } else if (months === 12) {
      setTotalSessions(12);
      setTotalPrice(price * 0.9);
    } else if (months === 18) {
      setTotalSessions(18);
      setTotalPrice(price * 0.85);
    } else if (months === 24) {
      setTotalSessions(24);
      setTotalPrice(price * 0.8);
    } else if (months === 36) {
      setTotalSessions(36);
      setTotalPrice(price * 0.75);
    }
  };

  return (
    <main className="bg-gray-50 p-6 h-full rounded-r-lg flex flex-col justify-between">
      <section>
        <h2 className="text-lg font-bold text-black mb-4">ORDER OVERVIEW</h2>

        <ul className="grid grid-cols-3">
          {[6, 9, 12, 18, 24, 36].map((months) => (
            <li
              key={months}
              onClick={() => handlePlanSelect(months)}
              className={`border p-2 text-xs p-4 text-gray-400 cursor-pointer ${
                selectedPlan === months ? "border-blue-500" : "border-gray-300"
              }`}
            >
              {months} MONTHS
            </li>
          ))}
        </ul>

        <label className="flex items-center gap-2 my-5">
          <input
            type="checkbox"
            className="mt-1"
            checked={payInAdvance}
            onChange={() => setPayInAdvance(!payInAdvance)}
          />
          <span className="text-sm text-gray-500">
            Pay in advance - EXTRA 5% DISCOUNT
          </span>
        </label>

        <section className="space-y-5 mt-10 text-xs">
          <article className="flex justify-between text-gray-500">
            <p>NUMBER OF SESSIONS P.M.</p>
            <p className="font-bold text-black">{totalSessions}</p>
          </article>
          <article className="flex justify-between text-gray-500">
            <p>REGULAR PRICE</p>
            <p className="line-through font-bold text-black">
              {price.toFixed(2)}
              {currency}
            </p>
          </article>
          <article className="flex justify-between text-gray-500">
            <p>YOUR PRICE</p>
            <p className="font-bold text-black">
              {totalPrice.toFixed(2)}
              {currency}
            </p>
          </article>
          <article className="flex justify-between text-green-500">
            <p>DISCOUNT 4 %</p>
            <p>
              -{discount.toFixed(2)}
              {currency}
            </p>
          </article>
          <hr className="border-white" />
          <article className="flex justify-between text-blue-500">
            <p>Setup fee</p>
            <p>
              {setupFee.toFixed(2)}
              {currency}
            </p>
          </article>
          <article className="flex justify-between text-gray-500">
            <p>TOTAL P.M.</p>
            <p>
              {total.toFixed(2)}
              {currency}
            </p>
          </article>
        </section>

        <label className="flex items-start gap-2 my-5">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-gray-500">
            I accept the{" "}
            <span className="text-blue-500">Terms & Conditions</span> and
            understand my{" "}
            <span className="text-blue-500">right of withdrawal</span> as well
            as the circumstances that lead to a repeal of the same.
          </span>
        </label>

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Order Now
        </button>
      </section>

      <footer className="text-center mt-6 text-sm font-bold text-gray-500">
        95% SATISFACTION RATE!
      </footer>
    </main>
  );
};

export default OrderOverview;
