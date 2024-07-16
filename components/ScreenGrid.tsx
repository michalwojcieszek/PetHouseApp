"use client";

import { BookingType, CurrentUserType, PropertyType, UserType } from "@/types";
import SingleProperty from "./property/SingleProperty";
import PropertiesGrid from "./PropertiesGrid";
import PropertySidebarInput from "./PropertySidebarInput";

type ScreenGridProps = {
  propertiesHeader?: string;
  properties?: PropertyType[];
  property?: PropertyType;
  ownerUser?: UserType | undefined;
  sidebarHeader: string;
  currentUser?: CurrentUserType;
  bookings?: BookingType[];
};

const ScreenGrid = ({
  properties,
  sidebarHeader,
  propertiesHeader,
  property,
  ownerUser,
  currentUser,
  bookings,
}: ScreenGridProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-30/70 lg:gap-2">
      <div className={property ? `row-start-2 xl:row-start-1` : ""}>
        <div className="xl:px-10 flex flex-col gap-5 py-4">
          <h2 className="text-xl font-semibold">{sidebarHeader}</h2>
          {properties &&
          properties.length > 0 &&
          propertiesHeader ? null : property && bookings ? (
            <PropertySidebarInput
              currentUser={currentUser}
              property={property}
              bookings={bookings}
            />
          ) : null}
        </div>
      </div>
      <div className="xl:px-10 xl:border-l-[1px]">
        <div className="flex flex-col gap-3 py-4 ">
          {properties && properties.length > 0 && propertiesHeader ? (
            <PropertiesGrid
              properties={properties}
              propertiesHeader={propertiesHeader}
              currentUserFavourites={currentUser?.favourites}
            />
          ) : property && ownerUser ? (
            <>
              <SingleProperty
                property={property}
                ownerUser={ownerUser}
                currentUserFavourites={currentUser?.favourites}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ScreenGrid;
