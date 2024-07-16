"use client";

import { PropertyType } from "@/types";
import PropertyCard from "./card/PropertyCard";
import Link from "next/link";

const additionalInfoHTML = (booking: any) => {
  return (
    <div>
      <p>
        Booked for {booking.pet.count} {booking.pet.type}
        {booking.pet.count > 1 ? "s" : ""}
      </p>
      <p>
        Stay time: {booking.dates.startDate.toLocaleString()} -{" "}
        {booking.dates.startDate}
      </p>
      {booking.totalPrice}$
    </div>
  );
};

type PropertiesGridType = {
  properties?: PropertyType[];
  propertiesHeader: string;
  currentUserFavourites?: string[];
  additionalInfo?: string;
  type?: string;
  bookedProperties?: any;
};

const PropertiesGrid = ({
  properties,
  bookedProperties,
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
      {(!bookedProperties || bookedProperties.length === 0) &&
        type === "bookings" &&
        !properties && (
          <div className="flex flex-col gap-1">
            <p>No bookings found</p>
            <Link
              href="/"
              className="underline underline-offset-4 hover:no-underline transition"
            >
              &rarr; Find a property to book
            </Link>
          </div>
        )}
      {(!properties || properties.length === 0) &&
        type === "own" &&
        !bookedProperties && (
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
              // additionalInfo={additionalInfo}
              type={type}
            />
          ))}
        </ul>
      )}
      {bookedProperties && bookedProperties.length > 0 && (
        <ul className="flex flex-col gap-10">
          {bookedProperties.map((bookedProperty: any) => (
            <PropertyCard
              key={bookedProperty._id}
              property={bookedProperty.property}
              currentUserFavourites={currentUserFavourites}
              additionalInfo={additionalInfoHTML(bookedProperty)}
              type={type}
            />
          ))}
        </ul>
      )}
    </>
  );
};
export default PropertiesGrid;
