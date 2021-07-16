import "./price-input.scss";
import React, { useState, useEffect } from "react";
import { PriceInputProps } from "../../common/types";

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  placeholder,
  minAllowedPrice,
  maxAllowedPrice,
  onChange,
}) => {
  const [priceValue, setPriceValue] = useState(value);

  useEffect(() => {
    setPriceValue(value);
  }, [value]);

  const setPrice = (targetValue: any) => {
    if (+targetValue || targetValue === "") {
      setPriceValue(targetValue);
    }
  };

  const onPriceChange = () => {
    if (priceValue < minAllowedPrice) {
      setPriceValue(minAllowedPrice);
      onChange(+minAllowedPrice);
    } else if (priceValue > maxAllowedPrice) {
      setPriceValue(maxAllowedPrice);
      onChange(+maxAllowedPrice);
    } else {
      onChange(+priceValue);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={priceValue}
      onChange={(e) => setPrice(e.target.value)}
      onBlur={onPriceChange}
    />
  );
};

export default PriceInput;
