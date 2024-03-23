import { RequestData } from "../types";
const BINANCE_URL =
  "https://www.binance.com/bapi/margin/v2/public/new-otc/get-quote";

export const getBinanceData = async ({
  fromCoin,
  toCoin,
  requestAmount,
}: RequestData) => {
  const res = await fetch(BINANCE_URL, {
    method: "POST",
    body: JSON.stringify({
      fromCoin, //из какой
      toCoin, // в какую
      requestAmount, // какая сумма
      allowBlock: "2",
      requestCoin: fromCoin,
      walletType: "SPOT",
    }),
    headers: { "Content-Type": "application/json" },
  });

  const { data } = await res.json();

  return data;
};
