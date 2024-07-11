"use client";

import { PropertyType } from "@/types";
import PropertyCard from "./card/PropertyCard";
import Link from "next/link";

type PropertiesGridType = {
  properties: PropertyType[];
  propertiesHeader: string;
  currentUserFavourites?: string[];
  additionalInfo?: string;
  type?: string;
};

const PropertiesGrid = ({
  properties,
  propertiesHeader,
  currentUserFavourites,
  additionalInfo,
  type,
}: PropertiesGridType) => {
  return (
    <>
      <h2 className="text-xl font-semibold">{propertiesHeader}</h2>
      {(!properties || properties.length === 0) && type === "favourites" && (
        <div className="flex flex-col gap-1">
          <p>No favourite properties found</p>
          <Link
            href="/"
            className="underline underline-offset-4 hover:no-underline transition"
          >
            &rarr; Go to add some to favourites
          </Link>
        </div>
      )}
      {(!properties || properties.length === 0) && type === "own" && (
        <div className="flex flex-col gap-1">
          <p>Currently you have no own properties</p>
          <Link
            href="/properties/add"
            className="underline underline-offset-4 hover:no-underline transition"
          >
            &rarr; Go to add your property
          </Link>
        </div>
      )}
      {properties && properties.length > 0 && (
        <ul className="flex flex-col gap-10">
          {properties.map((property: PropertyType) => (
            <PropertyCard
              key={property._id}
              property={property}
              currentUserFavourites={currentUserFavourites}
              additionalInfo={additionalInfo}
              type={type}
            />
          ))}
        </ul>
      )}
    </>
  );
};
export default PropertiesGrid;
