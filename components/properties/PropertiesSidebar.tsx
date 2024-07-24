"use client";

import { PropertyType } from "@/types";
import React, { useEffect, useState } from "react";
import { pets, PetViewProps } from "@/utils/petsAccepted";
import Image from "next/image";
import SelectCountry, { CountryType } from "../addProperty/SelectCountry";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  MdFilterAltOff,
  MdOutlineFilterAlt,
  MdOutlineLocationOn,
} from "react-icons/md";
import dynamic from "next/dynamic";

const PropertiesMap = dynamic(() => import("../map/PropertiesMap"), {
  ssr: false,
});

type QueryParams = {
  pet?: string | string[];
  [key: string]: any; // This allows additional properties
};

type PropertiesSidebarProps = {
  properties: PropertyType[];
};

const PropertiesSidebar = ({ properties }: PropertiesSidebarProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const [acceptedPets, setAcceptedPets] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryType>();

  const clearFiltersHandler = () => {
    setAcceptedPets([]);
    setSelectedCountry(undefined);
  };

  useEffect(() => {
    let currentQuery: QueryParams = {};

    if (params) {
      currentQuery = qs.parse(params.toString()) as QueryParams;
    }

    if (acceptedPets.length > 0) {
      currentQuery.pet = acceptedPets;
    } else {
      delete currentQuery.pet;
    }

    if (selectedCountry) {
      currentQuery.country = selectedCountry.code;
    } else {
      delete currentQuery.country;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: currentQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [acceptedPets, selectedCountry, router, params]);

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
      <div className="flex gap-2 items-center">
        <MdOutlineFilterAlt />
        <h3 className="text-lg font-semibold">Filter the properties</h3>
      </div>
      <div className="flex flex-col gap-3">
        <h4>Select the pets</h4>
        <ul className="flex flex-row xl:justify-between gap-4 xl:gap-0">
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
              <Image
                src={pet.icon}
                alt={`Icon of a ${pet.type}`}
                width={100}
                height={100}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h4>Select the country</h4>
        <SelectCountry onChange={setSelectedCountry} value={selectedCountry} />
      </div>
      <button
        onClick={clearFiltersHandler}
        disabled={acceptedPets.length < 1 && !selectedCountry}
        className={`rounded-md p-2 text-xl hover:opacity-80 text-white tracking-wide flex gap-2 items-center justify-center ${
          acceptedPets.length < 1 && !selectedCountry
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-500"
        }`}
      >
        <p>
          <MdFilterAltOff />
        </p>
        <p>Clear filters</p>
      </button>
      <hr />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <MdOutlineLocationOn />
          <h3 className="text-lg font-semibold">Find property on the map</h3>
        </div>
        <div className="mb-12 xl:mb-0">
          <PropertiesMap properties={properties} />
        </div>
      </div>
    </div>
  );
};
export default PropertiesSidebar;
