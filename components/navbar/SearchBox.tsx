"use client";

import {
  IoCalendarOutline,
  IoLocationOutline,
  IoPricetagsOutline,
  IoSearch,
} from "react-icons/io5";
import SearchBoxElement from "./SearchBoxElement";

const SearchBox = () => {
  return (
    <div className="border-[1px] border-solid py-3 px-2 rounded-md flex flex-row justify-between items-center cursor-pointer hover:shadow-md">
      <SearchBoxElement text="Select Date" icon={IoCalendarOutline} />
      <SearchBoxElement text="Select Location" icon={IoLocationOutline} />
      <SearchBoxElement text="Select Price" icon={IoPricetagsOutline} />
      <div className="ml-3 p-2 rounded-md text-2xl text-theme-color">
        <IoSearch />
      </div>
    </div>
  );
};
export default SearchBox;
