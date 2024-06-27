"use client";

import { PropertyType } from "@/types";
import PropertyCard from "./card/PropertyCard";

type PropertyGridType = {
  properties: PropertyType[];
  propertiesHeader: string;
};

const PropertyGrid = ({ properties, propertiesHeader }: PropertyGridType) => {
  return (
    <>
      <h2 className="text-xl font-semibold">{propertiesHeader}</h2>
      <ul className="flex flex-col gap-10">
        {properties.map((property: PropertyType) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </ul>
    </>
  );
};
export default PropertyGrid;
