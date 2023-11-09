import React from "react";
import { InputStyle } from "./style";
import { TInput } from "./types";

const Input = ({ value, onChange, placeholder, type }: TInput) => {
  return (
    <InputStyle
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
