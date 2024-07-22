"use client";

import { PropertyType } from "@/types";
import SelectedProperty from "../property/SelectedProperty";

type SelectedPropertiesGridProps = {
  favouriteProperties?: PropertyType[];
  header: string;
  notFoundHeader: string;
};

const SelectedPropertiesGrid = ({
  favouriteProperties,
  header,
}: SelectedPropertiesGridProps) => {
  return (
    <div className="flex flex-col gap-9">
      <h1 className="font-semibold text-2xl">{header}</h1>
      {
        <ul className="flex flex-col gap-6">
          {favouriteProperties?.map((favouriteProperty: PropertyType) => (
            <>
              <li key={favouriteProperty._id}>
                <div>image</div>
                <div>id</div>
                <SelectedProperty property={favouriteProperty} />
              </li>
              <hr />
            </>
          ))}
        </ul>
      }
    </div>
  );
};
export default SelectedPropertiesGrid;
