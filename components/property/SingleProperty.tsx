"use client";

import { PropertyType } from "@/types";
import Image from "next/image";
import PropertyCardPets from "../card/PropertyCardPets";
import { useMemo } from "react";
import dynamic from "next/dynamic";

type SinglePropertyProps = {
  property: PropertyType;
};

const SingleProperty = ({ property }: SinglePropertyProps) => {
  const {
    street,
    city,
    state,
    // : {
    //   name, flag, code
    // },
    zipcode,
    cords: { lat, lng },
  } = property.location;

  const Map = useMemo(
    () =>
      dynamic(() => import("../map/Map"), {
        ssr: false,
      }),
    [lat, lng]
  );

  const petsAccepted = property.pets.filter((pet) => pet.accept === true);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">{property.name}</h1>
      <div className="overflow-hidden rounded-md w-full sm:w-3/4 md:w-1/2 lg:w-2/5 flex items-center justify-center lg:justify-start">
        <Image
          src={property.image}
          alt={property.name}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full hover:scale-110 transition"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="">{property.description}</h2>
        <div className="flex gap-4">
          {petsAccepted.map((petAccepted, index) => (
            <PropertyCardPets key={index} petAccepted={petAccepted} />
          ))}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div>
            <Image
              src={`https://flagsapi.com/PL/flat/64.png`}
              alt={`Flag of ${state}`}
              width={30}
              height={30}
            />
          </div>
          <h2>
            {street}, {zipcode} {city} {state}
          </h2>
        </div>
        <div>
          <Map />
        </div>
        <div>
          {lat} {lng}
        </div>
      </div>
    </div>
  );
};
export default SingleProperty;
