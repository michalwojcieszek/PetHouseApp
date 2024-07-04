"use client";

import { PropertyType, UserType } from "@/types";
import Image from "next/image";
import PropertyCardPets from "../card/PropertyCardPets";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import FlagImg from "../FlagImg";
import Header2 from "../Header2";
import {
  IoCheckmarkCircleOutline,
  IoKeyOutline,
  IoLocationOutline,
} from "react-icons/io5";
import FeaturesHeader from "./FeaturesHeader";
import UserImg from "../UserImg";
import { useRouter } from "next/navigation";

type SinglePropertyProps = {
  property: PropertyType;
  ownerUser: UserType;
};

const SingleProperty = ({ property, ownerUser }: SinglePropertyProps) => {
  const router = useRouter();
  const { street, city, state, zipcode, cords } = property.location;

  const Map = useMemo(
    () =>
      dynamic(() => import("../map/Map"), {
        ssr: false,
      }),
    [cords.lat, cords.lng]
  );

  const petsAccepted = property.pets.filter((pet) => pet.accept === true);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-theme-color">{property.name}</h1>
        <Header2>{property.description}</Header2>
      </div>
      <div className="flex flex-row gap-8">
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
        <div className="flex flex-col gap-5">
          <div>
            <FeaturesHeader icon={IoKeyOutline}>
              Owner of the property
            </FeaturesHeader>
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={() => router.push(`owners/${property._id}`)}
            >
              <UserImg />
              <div>{ownerUser.name}</div>
            </div>
          </div>
          <div>
            <FeaturesHeader icon={IoCheckmarkCircleOutline}>
              Pets accepted
            </FeaturesHeader>
            <div className="flex gap-4">
              {petsAccepted.map((petAccepted, index) => (
                <PropertyCardPets key={index} petAccepted={petAccepted} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        {cords && street && zipcode && city && state && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-col gap-2">
                <FeaturesHeader icon={IoLocationOutline}>
                  Location
                </FeaturesHeader>
                <div className="flex gap-2 items-center">
                  <FlagImg code={state.code} name={state.name} />
                  <p>
                    {street}, {zipcode} {city} {state.name}
                  </p>
                </div>
              </div>
            </div>
            <Map
              cords={cords}
              street={street}
              zipcode={zipcode}
              city={city}
              state={state}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleProperty;
