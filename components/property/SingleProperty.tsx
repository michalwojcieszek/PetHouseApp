"use client";

import { PropertyType, UserType } from "@/types";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import FlagImg from "../images/FlagImg";
import Header2 from "../ui/Header2";
import FeaturesHeader from "./FeaturesHeader";
import UserImg from "../images/UserImg";
import { useRouter } from "next/navigation";
import FeaturesFlexCol from "./FeaturesFlexCol";
import PetsInfo from "./PetsInfo";
import PropertyImg from "../images/PropertyImg";
import AddToFavourite from "../ui/AddToFavourite";

type SinglePropertyProps = {
  property: PropertyType;
  ownerUser: UserType;
  currentUserFavourites?: string[];
};

const SingleProperty = ({
  property,
  ownerUser,
  currentUserFavourites,
}: SinglePropertyProps) => {
  const router = useRouter();
  const { street, city, state, zipcode, cords } = property.location;

  const Map = useMemo(
    () =>
      dynamic(() => import("../map/PropertyMap"), {
        ssr: false,
      }),
    []
  );

  const petsAccepted = property.pets.filter((pet) => pet.accept === true);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-theme-color">
          {property.name}
        </h1>
        <Header2>{property.description}</Header2>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* <div className="overflow-hidden rounded-md w-full md:w-2/3 xl:w-1/2 2xl:w-96 flex items-center justify-center lg:justify-start relative"> */}
        <div className="relative overflow-hidden rounded-md w-full md:w-96">
          <PropertyImg
            src={property.image}
            alt={`Picture of ${property.name} property`}
            id={property._id}
          />
          <AddToFavourite
            currentPropertyId={property._id}
            currentUserFavourites={currentUserFavourites}
          />
        </div>
        <div className="flex flex-col gap-5">
          <FeaturesFlexCol>
            <FeaturesHeader>Owner of the property</FeaturesHeader>
            <div className="flex gap-3 items-center">
              <UserImg />
              <div>{ownerUser.name}</div>
            </div>
          </FeaturesFlexCol>
          <hr />
          <FeaturesFlexCol>
            <FeaturesHeader>Pets accepted</FeaturesHeader>
            <PetsInfo petsAccepted={petsAccepted} />
          </FeaturesFlexCol>
          <hr />
          <FeaturesFlexCol>
            <FeaturesHeader>Pets capacity</FeaturesHeader>
            <PetsInfo petsAccepted={petsAccepted} petInfo="capacity" />
          </FeaturesFlexCol>
          <hr />
          <FeaturesFlexCol>
            <FeaturesHeader>Pets nightly price ($)</FeaturesHeader>
            <PetsInfo petsAccepted={petsAccepted} petInfo="price" />
          </FeaturesFlexCol>
        </div>
        <hr />
      </div>
      <div>
        {cords && street && zipcode && city && state && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
              <FeaturesFlexCol>
                <FeaturesHeader>Location</FeaturesHeader>
                <div className="flex gap-2 items-center">
                  <FlagImg code={state.code} name={state.name} />
                  <p>
                    {street}, {zipcode} {city}, {state.name}
                  </p>
                </div>
              </FeaturesFlexCol>
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
