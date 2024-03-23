import { CurrencyConverterVariant1 } from "../components/currencyConverterVariant1";
import { CurrencyConverterVariant2 } from "../components/currencyConverterVariant2";
import React, { useState } from "react";
import { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { Variant } from "../shared/enums";
import "./styles.css";

const options = [
  { label: "Variant 1", value: Variant.Variant1 },
  { label: "Variant 2", value: Variant.Variant2 },
];

export const Converter = () => {
  const [variant, setVariant] = useState(Variant.Variant1);

  const handleVariantChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setVariant(value);
  };

  return (
    <div className="converter">
      <h1 className="converter__title">Converter Online</h1>
      <Radio.Group
        className="converter__radio"
        options={options}
        onChange={handleVariantChange}
        value={variant}
        optionType="button"
      />
      {variant === Variant.Variant1 && (
        <CurrencyConverterVariant1 variant={variant} />
      )}
      {variant === Variant.Variant2 && (
        <CurrencyConverterVariant2 variant={variant} />
      )}
    </div>
  );
};
