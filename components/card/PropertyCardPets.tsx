"use client";

import { pets } from "@/utils/petsAccepted";
import Image from "next/image";

type PropertyCardPetsProps = {
  type: string;
  accept: boolean;
  capacity: number;
  price: number;
  isHorizontal?: boolean;
};

const PropertyCardPets = ({
  petAccepted,
  petInfo,
}: {
  petAccepted: PropertyCardPetsProps;
  petInfo?: keyof PropertyCardPetsProps | undefined;
}) => {
  const petView = pets.find((pet) => pet.type === petAccepted.type);

  return (
    <li className={`flex flex-col md:flex-row items-center gap-2`}>
      {petView && (
        <Image src={petView?.icon} alt={petView?.type} width={30} height={30} />
      )}
      <span className="text-theme-color font-semibold text-base">
        {petInfo ? `${petAccepted[petInfo]}` : `${petAccepted.type}s`}
      </span>
    </li>
  );
};
export default PropertyCardPets;
