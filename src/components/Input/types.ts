import { ChangeEvent } from "react";

type TInput = {
  type?: "numeric" | "text";
  value?: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type { TInput };
