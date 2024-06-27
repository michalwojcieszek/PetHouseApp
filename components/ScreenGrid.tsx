"use client";

import { PropertyType } from "@/types";
import PropertyGrid from "./PropertyGrid";
import Sidebar from "./sidebar/Sidebar";
import SingleProperty from "./property/SingleProperty";

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
  sidebarInput: React.ComponentType;
  sidebarHeader: string;
} & (PropertiesOnly | MainContentOnly);

const ScreenGrid = ({
  properties,
  sidebarInput,
  sidebarHeader,
  propertiesHeader,
  property,
}: ScreenGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-30/70 lg:gap-8">
      <div className={property ? `row-start-2 lg:row-start-1` : ""}>
        <Sidebar sidebarInput={sidebarInput} sidebarHeader={sidebarHeader} />
      </div>
      <div className="">
        <div className="flex flex-col gap-3 py-4">
          {properties && properties.length > 0 && propertiesHeader ? (
            <PropertyGrid
              properties={properties}
              propertiesHeader={propertiesHeader}
            />
          ) : property ? (
            <SingleProperty property={property} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ScreenGrid;
