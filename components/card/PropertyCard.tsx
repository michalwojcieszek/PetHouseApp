"use client";

import { PropertyType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropertyCardPets from "./PropertyCardPets";
import FlagImg from "../FlagImg";
import PropertyImg from "../PropertyImg";
import AddToFavourite from "../AddToFavourite";

const PropertyCard = ({
  property,
  currentUserFavourites,
}: {
  property: PropertyType;
  currentUserFavourites?: string[];
}) => {
  const router = useRouter();
  const { pets } = property;
  const { location } = property;

  const petsAccepted = pets.filter((pet) => pet.accept);

  return (
    <div
      className="rounded-md shadow-[0_0px_8px_-0px_rgba(0,0,0,0.07)] cursor-pointer flex lg:flex-row lg:gap-3 flex-col"
      onClick={() => router.push(`/property/${property._id}`)}
    >
      <div className="overflow-hidden lg:w-60 rounded-t-md lg:rounded-l-md lg:rounded-tr-none relative">
        <PropertyImg
          src={property.image}
          alt={property.name}
          id={property._id}
        />
        <AddToFavourite currentUserFavourites={currentUserFavourites} />
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <div>
          <h2 className="font-bold text-xl">{property.name}</h2>
          <h3 className="text-grey-secondary">{property.description}</h3>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FlagImg
            code={property.location.state.code}
            name={property.location.state.name}
          />
          <p>
            {location.street}, {location.zipcode} {location.city} -{" "}
            {location.state.name}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex flex-col gap-2 text-theme-color font-semibold">
            Accepting:
          </p>
          <ul className="flex flex-row gap-5">
            {petsAccepted.map((petAccepted, index) => (
              <PropertyCardPets key={index} petAccepted={petAccepted} />
            ))}
          </ul>
        </div>
        <button className="font-semibold bg-theme-color rounded-md py-1 w-1/3 text-white hover:opacity-80 tracking-wid mt-auto">
          Details
        </button>
      </div>
    </div>
  );
};
export default PropertyCard;
