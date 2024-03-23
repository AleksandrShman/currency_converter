import React, { useMemo } from "react";
import { Select, InputNumber } from "antd";
import { DoubleRightOutlined, SwapOutlined } from "@ant-design/icons";
import type { InputStatus } from "antd/lib/_util/statusUtils";
import { Data } from "../../../shared/types";
import { Coin, Variant } from "../../../shared/enums";
import "./styles.css";

type Props = {
  input: Data;
  input2: Data;
  inputStatus?: InputStatus;
  input2Status?: InputStatus;
  inputDisabled?: boolean;
  input2Disabled?: boolean;
  variant?: Variant;
  readOnlyInput2?: boolean;
  inputChange1: (value: number | null) => void;
  inputChange2?: (value: number | null) => void;
  coinTypeChange: (value: Coin) => void;
  coinTypeChange2: (value: Coin) => void;
};

export const Form = ({
  input,
  input2,
  inputStatus = "",
  input2Status = "",
  inputDisabled = false,
  input2Disabled = false,
  readOnlyInput2 = false,
  variant,
  inputChange1,
  inputChange2,
  coinTypeChange,
  coinTypeChange2,
}: Props) => {
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

  return (
    <div className="wrap">
      <div className="inputContainer">
        <InputNumber
          type="number"
          min={0}
          value={input.amount}
          disabled={inputDisabled}
          status={inputStatus}
          onChange={inputChange1}
          addonAfter={
            <Select
              style={{ width: 100 }}
              value={input.type}
              disabled={inputDisabled}
              onChange={coinTypeChange}
            >
              {select}
            </Select>
          }
        />
        {variant === Variant.Variant1 && <DoubleRightOutlined />}
        {variant === Variant.Variant2 && <SwapOutlined />}
        <InputNumber
          type="number"
          min={0}
          readOnly={readOnlyInput2}
          value={input2.amount}
          disabled={input2Disabled}
          status={input2Status}
          onChange={inputChange2}
          addonAfter={
            <Select
              style={{ width: 100 }}
              value={input2.type}
              disabled={input2Disabled}
              onChange={coinTypeChange2}
            >
              {selects2}
            </Select>
          }
        />
      </div>
    </div>
  );
};
