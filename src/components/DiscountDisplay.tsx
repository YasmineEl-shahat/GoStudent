import React from "react";

interface DiscountDisplayProps {
  discount: number;
  currency: string;
}

const DiscountDisplay: React.FC<DiscountDisplayProps> = ({
  discount,
  currency,
}) => {
  return (
    <p>
      Discount: -{discount} {currency}
    </p>
  );
};

export default DiscountDisplay;
