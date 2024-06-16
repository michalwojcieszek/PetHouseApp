"use client";

import { PropertyType } from "@/types";
import PropertyCard from "./PropertyCard";

type PropertyGridType = {
  properties: PropertyType[];
};

const PropertyGrid = ({ properties }: PropertyGridType) => {
  return (
    // <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
    <ul className="flex flex-col gap-10">
      {properties.map((property: PropertyType) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </ul>
  );
};
export default PropertyGrid;
