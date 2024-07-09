"use client";

import { CurrentUserType, PropertyType, UserType } from "@/types";
import Sidebar from "./sidebar/Sidebar";
import SingleProperty from "./property/SingleProperty";
import PropertiesGrid from "./PropertiesGrid";

type PropertiesOnly = {
  propertiesHeader: string;
  properties: PropertyType[];
  property?: PropertyType;
};

type MainContentOnly = {
  propertiesHeader?: string;
  properties?: PropertyType[];
  property: PropertyType;
  ownerUser: UserType;
};

type ScreenGridProps = {
  sidebarInput: React.ComponentType;
  sidebarHeader: string;
  currentUserFavourites?: string[];
} & (PropertiesOnly | MainContentOnly);

const ScreenGrid = ({
  properties,
  sidebarInput,
  sidebarHeader,
  propertiesHeader,
  property,
  ownerUser,
  currentUserFavourites,
}: ScreenGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-30/70 lg:gap-8">
      <div className={property ? `row-start-2 lg:row-start-1` : ""}>
        <Sidebar sidebarInput={sidebarInput} sidebarHeader={sidebarHeader} />
      </div>
      <div className="">
        <div className="flex flex-col gap-3 py-4">
          {properties && properties.length > 0 && propertiesHeader ? (
            <PropertiesGrid
              properties={properties}
              propertiesHeader={propertiesHeader}
              currentUserFavourites={currentUserFavourites}
            />
          ) : property ? (
            <SingleProperty
              property={property}
              ownerUser={ownerUser}
              currentUserFavourites={currentUserFavourites}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ScreenGrid;
