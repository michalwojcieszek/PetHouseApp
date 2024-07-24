"use client";

import { PropertyType } from "@/types";
// import PropertyCard from "../card/PropertyCard";
import { format } from "date-fns";
import NotFound from "../NotFound";
import dynamic from "next/dynamic";

const PropertyCard = dynamic(() => import("../card/PropertyCard"), {
  ssr: false,
});

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
  return (
    <div>
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="text-2xl font-semibold">{propertiesHeader}</h2>
        <h3>{propertiesSecondaryHeader}</h3>
      </div>
      {/* FAVOURITES */}
      {(!properties || properties.length === 0) && type === "favourites" && (
        <NotFound
          primaryText="favourite properties"
          secondaryText="Go to add some to favourites"
          href="/"
        />
      )}
      {/* BOOKED */}
      {(!bookedProperties || bookedProperties.length === 0) &&
        type === "bookings" &&
        !properties && (
          <NotFound
            primaryText="bookings"
            secondaryText="Find a property to book"
            href="/"
          />
        )}
      {/* OWN PROPERTIES BOOKINGS */}
      {(!bookedProperties || bookedProperties.length === 0) &&
        type === "ownPropertiesBookings" &&
        !properties && (
          <NotFound
            primaryText="property owned by you has been booked"
            secondaryText="Go to the main page"
            href="/"
          />
        )}
      {/* OWN PROPERTIES */}
      {(!properties || properties.length === 0) &&
        type === "own" &&
        !bookedProperties && (
          <NotFound
            primaryText="property owned by you"
            secondaryText="Go to add your property"
            href="/properties/add"
          />
        )}
      {/* ALL PROPERTIES */}
      {properties && properties.length > 0 && (
        <ul className="flex flex-col gap-6">
          {properties.map((property: PropertyType) => (
            <PropertyCard
              key={property._id}
              property={property}
              currentUserFavourites={currentUserFavourites}
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
