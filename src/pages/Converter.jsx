import { CurrencyConverter } from "../components/currencyConverter";
import "./styles.css";

export const Converter = () => {
  return (
    <div className="converter">
      <h1 className="converter__title">Converter Online</h1>
      <CurrencyConverter />
    </div>
  );
};
