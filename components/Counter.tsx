"use client";

import { SetStateAction, useCallback, useMemo } from "react";
import { sortPetsArr } from "@/utils/sortPetsArr";
import { PetType } from "@/types";

type CounterProps = {
  pet: PetType;
  setClickedPets: React.Dispatch<SetStateAction<PetType[]>>;
  clickedPets: PetType[];
};

const Counter = ({ pet, setClickedPets, clickedPets }: CounterProps) => {
  const currClickedPets = useMemo(() => {
    return clickedPets.find((clickedPet) => clickedPet.type === pet.type);
  }, [clickedPets, pet]);

  const onDecrease = useCallback(() => {
    if (pet.capacity === 1 || !currClickedPets) {
      return;
    } else {
      setClickedPets((clickedPets) => {
        return sortPetsArr([
          ...clickedPets.filter(
            (clickedPet: PetType) => clickedPet.type !== pet.type
          ),
          { ...currClickedPets, capacity: currClickedPets?.capacity - 1 || 1 },
        ]);
      });
    }
  }, [pet, setClickedPets, currClickedPets]);

  const onIncrease = useCallback(() => {
    if (!currClickedPets) {
      return;
    } else {
      setClickedPets((clickedPets) => {
        return sortPetsArr([
          ...clickedPets.filter(
            (clickedPet: PetType) => clickedPet.type !== pet.type
          ),
          { ...currClickedPets, capacity: currClickedPets?.capacity + 1 || 1 },
        ]);
      });
    }
  }, [pet, setClickedPets, currClickedPets]);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currClickedPets) return;
    const priceSelected = Number(e.target.value);
    if (priceSelected <= 0) return;
    setClickedPets((clickedPets) => {
      return sortPetsArr([
        ...clickedPets.filter(
          (clickedPet: PetType) => clickedPet.type !== pet.type
        ),
        { ...currClickedPets, price: priceSelected },
      ]);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p>
        Select the capacity of
        <span className="text-theme-color font-bold">{` ${pet.type}s`}</span>{" "}
      </p>
      <div className="flex flex-row items-center gap-5">
        <button
          type="button"
          className="p-4 border-[1px] rounded-full w-10 h-10 flex items-center text-gray-400"
          disabled={pet.capacity === 1}
          onClick={onDecrease}
        >
          -
        </button>
        <div>{pet.capacity}</div>
        <button
          type="button"
          className="p-4 border-[1px] rounded-full w-10 h-10 flex items-center text-gray-400"
          onClick={onIncrease}
        >
          +
        </button>
        <p>
          You can have a maximum of {pet.capacity}{" "}
          <span className="text-theme-color font-bold">{`${pet.type}s`}</span>
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <p>
          Set your nightly price ($) for a{" "}
          <span className="text-theme-color font-bold">{` ${pet.type}`}</span>
        </p>
        <input
          type="number"
          value={pet.price}
          onChange={handleChangePrice}
          className="p-2 border-[1px] rounded-md w-32 text-center"
        />
      </div>
    </div>
  );
};
export default Counter;
