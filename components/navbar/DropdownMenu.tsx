"use client";

import useMenu from "@/hooks/useMenu";
import { IoMenuOutline } from "react-icons/io5";
import LoggedMenu from "./LoggedMenu";
import NotLoggedMenu from "./NotLoggedMenu";

type DropdownMenuType = {
  isLoggedIn: boolean;
};

const DropdownMenu = ({ isLoggedIn }: DropdownMenuType) => {
  const {
    isOpen: isDropdownOpen,
    open: openDropdown,
    close: closeDropdown,
  } = useMenu();

  const handleToggle = (
    openCheck: boolean,
    open: () => void,
    close: () => void
  ) => {
    if (!openCheck) {
      open();
    } else {
      close();
    }
  };

  return (
    <div
      className="relative"
      onClick={() => handleToggle(isDropdownOpen, openDropdown, closeDropdown)}
    >
      <IoMenuOutline className="hover:opacity-80" />
      <div
        className={`z-[999] mt-5 rounded-md border-[1px] right-0 bg-white absolute ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col text-center justify-center text-lg text-grey-main w-48">
          {isLoggedIn ? (
            <LoggedMenu />
          ) : (
            <NotLoggedMenu handleToggle={handleToggle} />
          )}
        </ul>
      </div>
    </div>
  );
};
export default DropdownMenu;
