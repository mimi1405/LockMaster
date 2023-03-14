import React from "react";

interface NumberInputProps {
  min: number;
  max: number;
  onChange: Function;
}
const NumberInput: React.FC<NumberInputProps> = ({ min, max, onChange }) => {
  return (
    <>
      <div>
        <input
          type="number"
          min={min}
          max={max}
          onChange={(value) => onChange(Number(value.target.value))}
        />
      </div>
    </>
  );
};

export default NumberInput;
