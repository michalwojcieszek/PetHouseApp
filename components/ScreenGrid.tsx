"use client";

import { CurrentUserType, PropertyType, UserType } from "@/types";
import SingleProperty from "./property/SingleProperty";
import PropertiesGrid from "./PropertiesGrid";
import PropertySidebarInput from "./PropertySidebarInput";

type PropertiesOnly = {
  propertiesHeader: string;
  properties: PropertyType[];
  property?: PropertyType;
};

type MainContentOnly = {
  propertiesHeader?: string;
  properties?: PropertyType[];
  property: PropertyType;
};

type ScreenGridProps = {
  ownerUser?: UserType | undefined;
  sidebarHeader: string;
  currentUser?: CurrentUserType;
} & (PropertiesOnly | MainContentOnly);

const ScreenGrid = ({
  properties,
  sidebarHeader,
  propertiesHeader,
  property,
  ownerUser,
  currentUser,
}: ScreenGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-30/70 lg:gap-10">
      <div className={property ? `row-start-2 lg:row-start-1` : ""}>
        <div className="px-10 border-r-[1px] flex flex-col gap-5 py-4">
          <h2 className="text-xl font-semibold">{sidebarHeader}</h2>
          {properties &&
          properties.length > 0 &&
          propertiesHeader ? null : property ? (
            <PropertySidebarInput
              currentUser={currentUser}
              property={property}
            />
          ) : null}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-3 py-4">
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
