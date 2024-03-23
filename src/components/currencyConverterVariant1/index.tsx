import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import type { InputStatus } from "antd/lib/_util/statusUtils";
import { Form } from "../common/form";
import { Data, RequestData, InputName } from "../../shared/types";
import { Coin, Variant } from "../../shared/enums";
import { getBinanceData } from "../../shared/api";
import { COIN_RANGE } from "../../shared/constans";

type Props = {
  variant?: Variant;
};

export const CurrencyConverterVariant1 = ({ variant }: Props) => {
  const [input, setInput] = useState<Data>({ type: Coin.BTC, amount: null });
  const [input2, setInput2] = useState<Data>({ type: Coin.USDT, amount: null });
  const [inputsStatus, setInputsStatus] = useState<{
    input: InputStatus;
    input2: InputStatus;
  }>({
    input: "",
    input2: "",
  });
  const [lastInput, setLastInput] = useState<InputName | null>(null);
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlerInputChange = useCallback(
    debounce((value: number | null) => {
      if (!value) return;
      const range = COIN_RANGE[input.type];

      setInput2((prev) => ({ ...prev, amount: null }));
      setLastInput("input");

      if (value < range.min || value > range.max) {
        setInputsStatus((prev) => ({ ...prev, input: "error" }));
      } else {
        setInputsStatus((prev) => ({ ...prev, input: "" }));
      }

      setInput((prev) => ({ ...prev, amount: value }));
    }, 500),
    [],
  );

  const handlerInput2Change = useCallback(
    debounce((value: number | null) => {
      if (!value) return;
      const range = COIN_RANGE[input2.type];

      setInput((prev) => ({ ...prev, amount: null }));
      setLastInput("input2");

      if (value < range.min || value > range.max) {
        setInputsStatus((prev) => ({ ...prev, input2: "error" }));
      } else {
        setInputsStatus((prev) => ({ ...prev, input2: "" }));
      }

      setInput2((prev) => ({ ...prev, amount: value }));
    }, 500),
    [],
  );

  const handlerCoinTypeChange = useCallback(
    (value: Coin) => {
      setInput((prev) => ({ ...prev, type: value }));

      if (input.amount) {
        setLastInput("input");
      }
    },
    [input.amount],
  );

  const handlerCoinType2Change = useCallback(
    (value: Coin) => {
      setInput2((prev) => ({ ...prev, type: value }));

      if (input2.amount) {
        setLastInput("input2");
      }
    },
    [input2.amount],
  );

  /**
   * Отправка и получение данных
   */
  const handlerRealTimeSubmit = async () => {
    if (!requestData) return;

    setIsLoading(true);
    const { toCoinAmount } = await getBinanceData(requestData);
    setIsLoading(false);

    if (lastInput === "input") {
      setInput2((prev) => ({ ...prev, amount: toCoinAmount }));
    }

    if (lastInput === "input2") {
      setInput((prev) => ({ ...prev, amount: toCoinAmount }));
    }

    setLastInput(null);
  };

  /**
   * Подготовка данных для запроса
   */
  useEffect(() => {
    if (
      !lastInput ||
      (lastInput === "input" && input.amount === null) ||
      (lastInput === "input2" && input2.amount === null)
    )
      return;

    if (lastInput === "input") {
      setRequestData({
        fromCoin: input.type,
        toCoin: input2.type,
        requestAmount: input.amount as number,
      });
    }

    if (lastInput === "input2") {
      setRequestData({
        fromCoin: input2.type,
        toCoin: input.type,
        requestAmount: input2.amount as number,
      });
    }
  }, [lastInput, input, input2]);

  useEffect(() => {
    // Если есть ошибки Range НЕ делаем запрос
    if (Object.values(inputsStatus).filter(Boolean).length) return;

    handlerRealTimeSubmit();
  }, [requestData]);

  return (
    <>
      <Form
        input={input}
        input2={input2}
        variant={variant}
        inputStatus={inputsStatus.input}
        input2Status={inputsStatus.input2}
        inputDisabled={isLoading && lastInput === "input2"}
        input2Disabled={isLoading && lastInput === "input"}
        inputChange1={handlerInputChange}
        inputChange2={handlerInput2Change}
        coinTypeChange={handlerCoinTypeChange}
        coinTypeChange2={handlerCoinType2Change}
      />
      {lastInput === "input" && inputsStatus.input.length > 0 && (
        <p>
          {input.type} range: <span>{COIN_RANGE[input.type].min}</span> -{" "}
          <span>{COIN_RANGE[input.type].max}</span>
        </p>
      )}
      {lastInput === "input2" && inputsStatus.input2.length > 0 && (
        <p>
          {input2.type} range: <span>{COIN_RANGE[input2.type].min}</span> -{" "}
          <span>{COIN_RANGE[input2.type].max}</span>
        </p>
      )}
    </>
  );
};
