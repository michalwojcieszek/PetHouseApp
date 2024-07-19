"use client";

import { BookingType, CurrentUserType, PropertyType, UserType } from "@/types";
import SingleProperty from "./property/SingleProperty";
import PropertiesGrid from "./PropertiesGrid";
import PropertySidebarInput from "./PropertySidebar";
import PropertySidebar from "./PropertySidebar";
import PropertiesSidebar from "./PropertiesSidebar";

type ScreenGridProps = {
  propertiesHeader?: string;
  properties?: PropertyType[];
  property?: PropertyType;
  ownerUser?: UserType | undefined;
  sidebarHeader: string;
  currentUser?: CurrentUserType;
  bookings?: BookingType[];
  type: string;
};

const ScreenGrid = ({
  properties,
  sidebarHeader,
  propertiesHeader,
  property,
  ownerUser,
  currentUser,
  bookings,
  type,
}: ScreenGridProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-30/70 lg:gap-2">
      {/* SIDEBAR */}
      <div className="hidden xl:block">
        <div className={property ? `row-start-2 xl:row-start-1` : ""}>
          <div className="xl:px-10 flex flex-col gap-5 py-4">
            <h2 className="text-2xl font-semibold">{sidebarHeader}</h2>
            {type === "properties" && properties && (
              <PropertiesSidebar properties={properties} />
            )}
            {type === "property" && property && bookings && (
              <PropertySidebar
                currentUser={currentUser}
                property={property}
                bookings={bookings}
              />
            )}
          </div>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <div className="xl:px-10 xl:border-l-[1px]">
        <div className="flex flex-col gap-3 py-4 ">
          {type === "properties" && propertiesHeader && (
            <PropertiesGrid
              properties={properties}
              propertiesHeader={propertiesHeader}
              currentUserFavourites={currentUser?.favourites}
            />
          )}
          {type === "property" && property && ownerUser && (
            <SingleProperty
              property={property}
              ownerUser={ownerUser}
              currentUserFavourites={currentUser?.favourites}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ScreenGrid;
