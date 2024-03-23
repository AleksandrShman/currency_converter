import { Coin } from "../enums";
export type RequestData = {
  fromCoin: Coin;
  toCoin: Coin;
  requestAmount: number;
};

export type Data = { type: Coin; amount: number | null };
export type InputName = "input" | "input2";
