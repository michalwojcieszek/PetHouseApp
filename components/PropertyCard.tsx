"use client";

import { PropertyType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropertyCardPets from "./PropertyCardPets";

const PropertyCard = ({ property }: { property: PropertyType }) => {
  const router = useRouter();
  const { pets } = property;
  const { location } = property;

  const petsAccepted = pets.filter((pet) => pet.accept === true);

  return (
    <div
      className="rounded-md shadow-md cursor-pointer flex lg:flex-row flex-col"
      onClick={() => router.push(`/${property._id}`)}
    >
      <div className="overflow-hidden lg:w-60 rounded-t-md lg:rounded-l-md lg:rounded-tr-none">
        <Image
          src={property.image}
          alt={property.name}
          width={0}
          height={0}
          sizes="100vw"
          // fill
          // objectFit="cover"
          // layout="fill"
          className="w-full hover:scale-110 transition"
        />
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <div>
          <h2 className="font-bold text-xl">{property.name}</h2>
          <h3 className="text-grey-secondary">{property.description}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <p>flag img</p>
          <p>
            {location.street}, {location.zipcode} {location.city} -{" "}
            {location.state}
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
