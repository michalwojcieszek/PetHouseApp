"use client";

import { PropertyType } from "@/types";
import Image from "next/image";
import Button from "./Button";

const PropertyCard = ({ property }: { property: PropertyType }) => {
  const redirectHandler = () => {};

  console.log(property);
  return (
    <div className="rounded-md shadow-md">
      <Image
        src={property.image}
        alt={property.name}
        width={100}
        height={100}
      />
      <div className="flex flex-col gap-4 px-5 py-6">
        <h2 className="font-bold text-xl">{property.name}</h2>
        <p className="text-grey-secondary">{property.description}</p>
        <div className="flex flex-row gap-1">{}</div>
        <button className="font-semibold bg-theme-color rounded-md py-1 w-1/2 text-white hover:opacity-80">
          Details
        </button>
      </div>
    </div>
  );
};
export default PropertyCard;
