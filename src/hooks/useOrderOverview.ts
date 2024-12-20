import { useState, useEffect } from "react";

interface OrderOverviewProps {
  sessions: number;
  price: number;
}

export const useOrderOverview = ({ sessions, price }: OrderOverviewProps) => {
  const [selectedPlan, setSelectedPlan] = useState(6);
  const [payInAdvance, setPayInAdvance] = useState(false);
  const [totalSessions, setTotalSessions] = useState(sessions);
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    setSelectedPlan(sessions);
    setTotalSessions(sessions);
    handlePlanSelect(sessions);
    // eslint-disable-next-line
  }, [sessions]);

  const discount = 9.6;
  const setupFee = 0.0;
  const extraDiscount = payInAdvance ? totalPrice * 0.05 : 0;
  const total = totalSessions * totalPrice - discount - extraDiscount;

  const handlePlanSelect = (months: number) => {
    setSelectedPlan(months);
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

  return {
    selectedPlan,
    payInAdvance,
    setPayInAdvance,
    totalSessions,
    totalPrice,
    discount,
    setupFee,
    total,
    handlePlanSelect,
  };
};
