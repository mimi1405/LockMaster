import React from "react";
import "./NumberInput.css";

interface NumberInputProps {
  min: number;
  max: number;
  onChange: Function;
}

const NumberInput: React.FC<NumberInputProps> = ({ min, max, onChange }) => {
  return (
    <>
      <input
        className="input"
        type="number"
        min={min}
        max={max}
        defaultValue={3}
        onChange={(value) => onChange(Number(value.target.value))}
      />
    </>
  );
};

export default NumberInput;
