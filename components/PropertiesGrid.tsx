"use client";

import { PropertyType } from "@/types";
import PropertyCard from "./card/PropertyCard";

type PropertiesGridType = {
  properties: PropertyType[];
  propertiesHeader: string;
  currentUserFavourites?: string[];
};

const PropertiesGrid = ({
  properties,
  propertiesHeader,
  currentUserFavourites,
}: PropertiesGridType) => {
  return (
    <>
      <h2 className="text-xl font-semibold">{propertiesHeader}</h2>
      <ul className="flex flex-col gap-10">
        {properties.map((property: PropertyType) => (
          <PropertyCard
            key={property._id}
            property={property}
            currentUserFavourites={currentUserFavourites}
          />
        ))}
      </ul>
    </>
  );
};
export default PropertiesGrid;
