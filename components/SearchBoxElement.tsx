"use client";

import { IconType } from "react-icons";

type SearchBoxElementProps = {
  text: string;
  icon: IconType;
};

const SearchBoxElement = ({ text, icon: Icon }: SearchBoxElementProps) => {
  return (
    <div className="px-2 md:px-3 lg:px-4">
      <div className="flex flex-row text-sm md:text-md lg:text-base text-grey-main gap-2 lg:gap-2 items-center justify-between">
        <div className="lg:text-xl">
          <Icon />
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};
export default SearchBoxElement;
