import { useState } from "react";
import { InputProps } from "./input.types";

export default function Input({ placeholder }: InputProps) {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}