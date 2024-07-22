"use client";

import { PetType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

type BookingPetCounterProps = {
  pet: PetType;
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
};

const BookingPetCounter = ({
  pet,
  setCount,
  count,
}: BookingPetCounterProps) => {
  const onDecrease = () => {
    setCount((count: number) => count - 1);
  };

  const onIncrease = () => {
    setCount((count: number) => count + 1);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-5">
        <button
          type="button"
          className={`${
            count === 1 ? "cursor-not-allowed" : ""
          } p-4 border-[1px] rounded-full w-15 h-15 flex items-center text-gray-400`}
          disabled={count === 1}
          onClick={onDecrease}
        >
          <IoRemove />
        </button>
        <div>{count}</div>
        <button
          type="button"
          className={`${
            pet.capacity === count ? "cursor-not-allowed" : ""
          } p-4 border-[1px] rounded-full w-15 h-15 flex items-center text-gray-400`}
          onClick={onIncrease}
          disabled={pet.capacity === count}
        >
          <IoAdd />
        </button>
      </div>
    </div>
  );
};

export default BookingPetCounter;
