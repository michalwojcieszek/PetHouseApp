"use client";

import { PropertyType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PropertyCard = ({ property }: { property: PropertyType }) => {
  const router = useRouter();
  const { pets } = property;

  const petsAccepted = pets.filter((pet) => pet.accept === true);
  console.log(petsAccepted);
  // console.log(Object.entries(pets).filter((pet) => pet[1].accept === true));

  return (
    <div
      className="rounded-md shadow-md cursor-pointer"
      onClick={() => router.push(`/${property._id}`)}
    >
      <div className="overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full rounded-t-md hover:scale-110 transition"
        />
      </div>
      <div className="flex flex-col gap-4 px-5 py-6">
        <h2 className="font-bold text-xl">{property.name}</h2>
        <p className="text-grey-secondary">{property.description}</p>
        <div className="flex flex-row gap-1">
          {petsAccepted.map((petAccepted, index) => (
            <div key={index}>{petAccepted.type}</div>
          ))}
        </div>
        <button className="font-semibold bg-theme-color rounded-md py-1 w-1/2 text-white hover:opacity-80">
          Details
        </button>
      </div>
    </div>
  );
};
export default PropertyCard;
