"use client";

import { BookingType, CurrentUserType, PropertyType, UserType } from "@/types";
// import SingleProperty from "../property/SingleProperty";
// import PropertiesGrid from "./PropertiesGrid";
// import PropertySidebar from "../sidebar/PropertySidebar";
// import PropertiesSidebar from "../properties/PropertiesSidebar";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import dynamic from "next/dynamic";

const SingleProperty = dynamic(() => import("../property/SingleProperty"), {
  ssr: false,
});
const PropertiesGrid = dynamic(() => import("./PropertiesGrid"), {
  ssr: false,
});
const PropertySidebar = dynamic(() => import("../sidebar/PropertySidebar"), {
  ssr: false,
});
const PropertiesSidebar = dynamic(
  () => import("../properties/PropertiesSidebar"),
  {
    ssr: false,
  }
);

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
  const [isMobileSidebarWrapped, setIsMobileSidebarWrapped] = useState(true);

  return (
    <div className="xl:mt-6">
      <div className="flex flex-col xl:flex-row xl:h-screen xl:overflow-hidden">
        {/* SIDEBAR */}
        <div
          className="xl:hidden border-[1px] rounded-md p-4 flex justify-between items-center cursor-pointer my-4 mb-8"
          onClick={() => setIsMobileSidebarWrapped((is) => !is)}
        >
          {type === "properties" && <p>Filter and use the map!</p>}
          {type === "property" && <p>Book the property!</p>}
          <IoIosArrowDown
            className={
              !isMobileSidebarWrapped
                ? "rotate-180 transition"
                : "rotate-0 transition"
            }
          />
        </div>
        <div
          className={`${
            isMobileSidebarWrapped ? "hidden" : "block"
          } xl:block flex-none xl:w-1/3 2xl:w-1/4 max-h-[90vh] xl:overflow-y-auto mb-8`}
        >
          <div className={property ? `row-start-2 xl:row-start-1` : ""}>
            <div className="xl:pr-6 2xl:pr-10 flex flex-col gap-5 ">
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
        <div className="flex-1 xl:overflow-y-auto xl:h-full">
          <div className="flex flex-col gap-3 xl:px-6 2xl:px-10 xl:mb-32 xl:border-l-[1px]">
            <div className="">
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
      </div>
    </div>
  );
};

export default ScreenGrid;
