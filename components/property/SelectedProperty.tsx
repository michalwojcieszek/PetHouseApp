"use client";

import { PropertyType } from "@/types";
import PropertyImg from "../images/PropertyImg";
import PetsInfo from "./PetsInfo";

type SelectedPropertyProps = {
  property: PropertyType;
};

const SelectedProperty = ({ property }: SelectedPropertyProps) => {
  const petsAccepted = property.pets.filter((pet) => pet.accept === true);

  return (
    <div className="grid grid-cols-5">
      <div className="rounded-md overflow-hidden w-32">
        <PropertyImg
          src={property.image}
          alt={`Image of ${property.name}`}
          id={property._id}
        />
      </div>
      <div className="border-r-[1px]">{property._id}</div>
      <div>{property.name}</div>
      <PetsInfo petsAccepted={petsAccepted} />
      <button>action</button>
    </div>
  );
};
export default SelectedProperty;
