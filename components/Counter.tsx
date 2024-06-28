"use client";

import { useCallback, useState } from "react";

type CounterProps = {
  petName: string;
  value: number;
  onChange: (value: number) => void;
};

const Counter = ({ petName, value = 1, onChange }: CounterProps) => {
  const onDecrease = useCallback(() => {
    if (value === 1) {
      return;
    } else {
      onChange(value - 1);
    }
  }, [onChange, value]);

  const onIncrease = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-col gap-3">
      <p>
        Select the capacity of
        <span className="text-theme-color font-bold">{` ${petName}s`}</span>{" "}
      </p>
      <div className="flex flex-row items-center gap-5">
        <button
          type="button"
          className="p-4 border-[1px] rounded-full w-10 h-10 flex items-center text-gray-400"
          disabled={value === 1}
          onClick={onDecrease}
        >
          -
        </button>
        <div>{value}</div>
        <button
          type="button"
          className="p-4 border-[1px] rounded-full w-10 h-10 flex items-center text-gray-400"
          onClick={onIncrease}
        >
          +
        </button>
        <p>
          You can have a maximum of {value}{" "}
          <span className="text-theme-color font-bold">{`${petName}s`}</span>
        </p>
      </div>
    </div>
  );
};
export default Counter;
