import { Coin } from "../../shared/enums";

export const COIN_RANGE = {
  [Coin.USDT]: {
    min: 0.01,
    max: 3800000,
  },
  [Coin.ETH]: {
    min: 0.000003,
    max: 750,
  },
  [Coin.BTC]: {
    min: 0.00000015,
    max: 60,
  },
};
