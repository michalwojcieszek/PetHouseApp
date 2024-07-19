"use client";

import { PropertyType } from "@/types";
import PropertyCard from "./card/PropertyCard";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const additionalInfoHTML = (booking: any) => {
  return (
    <div>
      <p>
        Booked for{" "}
        <span className="font-bold">
          {booking.pet.count} {booking.pet.type}
          {booking.pet.count > 1 ? "s" : ""}
        </span>
      </p>
      <p>
        Stay time:{" "}
        <span className="font-bold">
          {format(booking.dates.startDate, "PP")} -{" "}
        </span>
        <span className="font-bold">{format(booking.dates.endDate, "PP")}</span>
      </p>
      Total price: <span className="font-bold">{booking.totalPrice}$</span>
    </div>
  );
};

type PropertiesGridType = {
  properties?: PropertyType[];
  propertiesHeader: string;
  propertiesSecondaryHeader?: string;
  currentUserFavourites?: string[];
  additionalInfo?: string;
  type?: string;
  bookedProperties?: any;
};

const PropertiesGrid = ({
  properties,
  bookedProperties,
  propertiesHeader,
  propertiesSecondaryHeader,
  currentUserFavourites,
  type,
}: PropertiesGridType) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-2xl font-semibold">{propertiesHeader}</h2>
        <h3>{propertiesSecondaryHeader}</h3>
      </div>
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
              &rarr; Find a property
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
        <ul className="flex flex-col gap-6">
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
      {!properties ||
        (properties.length === 0 && (
          <div className="flex flex-col gap-1">
            <p>There are no properties matching this search</p>
            <p>Try to clear all the filters</p>
          </div>
        ))}
      {bookedProperties && bookedProperties.length > 0 && (
        <ul className="flex flex-col gap-6">
          {bookedProperties.map((bookedProperty: any) => (
            <PropertyCard
              key={bookedProperty._id}
              property={bookedProperty.property}
              bookingId={bookedProperty._id}
              currentUserFavourites={currentUserFavourites}
              additionalInfo={additionalInfoHTML(bookedProperty)}
              type={type}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default PropertiesGrid;
