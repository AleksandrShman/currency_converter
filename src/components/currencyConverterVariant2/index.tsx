import { useCallback, useEffect, useMemo, useState } from "react";
import { Select, Button } from "antd";
import { Form } from "../common/form";
import { Data, RequestData } from "../../shared/types";
import { Coin, Variant } from "../../shared/enums";
import { getBinanceData } from "../../shared/api";
import "./styles.css";

type Props = {
  variant?: Variant;
};

export const CurrencyConverterVariant2 = ({ variant }: Props) => {
  const [input, setInput] = useState<Data>({ type: Coin.BTC, amount: null });
  const [input2, setInput2] = useState<Data>({ type: Coin.USDT, amount: null });
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlerInputChange = useCallback((value: number | null) => {
    if (!value) return;
    setInput((prev) => ({ ...prev, amount: value }));
  }, []);

  const handlerCoinTypeChange = useCallback((value: Coin) => {
    setInput((prev) => ({ ...prev, type: value }));
  }, []);

  const handlerCoinType2Change = useCallback((value: Coin) => {
    setInput2((prev) => ({ ...prev, type: value }));
  }, []);

  const select = useMemo(() => {
    return Object.entries(Coin)
      .filter((item) => item[1] !== input2.type)
      .map(([key, value]) => (
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      ));
  }, [input2.type]);

  const selects2 = useMemo(() => {
    return Object.entries(Coin)
      .filter((item) => item[1] !== input.type)
      .map(([key, value]) => (
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      ));
  }, [input.type]);

  /**
   * Отправка и получение данных, обновление состояния input2
   */
  const handlerSubmit = useCallback(async () => {
    if (!requestData) return;

    setIsLoading(true);
    const { toCoinAmount } = await getBinanceData(requestData);
    setIsLoading(false);

    setInput2((prev) => ({ ...prev, amount: toCoinAmount }));
  }, [requestData]);

  /**
   * Подготовка данных для запроса
   */
  useEffect(() => {
    if (input.amount === null) return;

    setRequestData({
      fromCoin: input.type,
      toCoin: input2.type,
      requestAmount: input.amount as number,
    });
  }, [input, input2.type]);

  return (
    <div className="wrap">
      <Form
        input={input}
        input2={input2}
        variant={variant}
        readOnlyInput2={true}
        inputChange1={handlerInputChange}
        coinTypeChange={handlerCoinTypeChange}
        coinTypeChange2={handlerCoinType2Change}
      />
      <Button
        className="buttonSubmit"
        type="primary"
        size="large"
        loading={isLoading}
        onClick={handlerSubmit}
      >
        Convert
      </Button>
    </div>
  );
};
