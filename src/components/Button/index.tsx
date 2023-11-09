import React from "react";
import { ButtonStyle } from "./style";
import { TButton } from "./types";

const Button = ({ text, onClick, disabled }: TButton) => (
  <ButtonStyle disabled={disabled} type="button" onClick={onClick}>
    {text}
  </ButtonStyle>
);

export default Button;
