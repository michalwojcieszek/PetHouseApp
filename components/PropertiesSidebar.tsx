"use client";

import { PropertyType } from "@/types";
import PropertiesMap from "./map/PropertiesMap";
import { useState } from "react";
import { pets, PetViewProps } from "@/utils/petsAccepted";
import Image from "next/image";
import SelectCountry from "./addProperty/SelectCountry";

type PropertiesSidebarProps = {
  properties: PropertyType[];
};

const PropertiesSidebar = ({ properties }: PropertiesSidebarProps) => {
  const [acceptedPets, setAcceptedPets] = useState<string[]>([]);

  const handleClickPet = (pet: PetViewProps) => {
    if (acceptedPets.includes(pet.type)) {
      setAcceptedPets((petsArr) =>
        petsArr.filter((petEl) => petEl !== pet.type)
      );
    } else {
      setAcceptedPets((petsArr) => [...petsArr, pet.type]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <PropertiesMap properties={properties} />
      </div>
      <hr />
      <div>
        {" "}
        <h2 className="text-xl font-semibold">Select your requirements</h2>
      </div>
      <div>
        <ul className="flex flex-row gap-8 mb-6">
          {pets.map((pet, index) => (
            <li
              key={index}
              onClick={() => handleClickPet(pet)}
              className={`w-14 flex flex-col items-center gap-1 ${
                acceptedPets.length > 0 && acceptedPets.includes(pet.type)
                  ? "grayscale-0 opacity-100"
                  : "grayscale opacity-50"
              } hover:grayscale-0 hover:opacity-100 transition cursor-pointer`}
            >
              <span className="text-theme-color">{pet.type}</span>
              <Image src={pet.icon} alt={pet.type} width={100} height={100} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SelectCountry />
      </div>
      <div>Nightly Price to choose</div>
    </div>
  );
};
export default PropertiesSidebar;
