"use client";

import useLogin from "@/hooks/useLogin";
import useMenu from "@/hooks/useMenu";
import useRegister from "@/hooks/useRegister";
import { IoMenuOutline } from "react-icons/io5";

const DropdownMenu = () => {
  const {
    isOpen: isDropdownOpen,
    open: openDropdown,
    close: closeDropdown,
  } = useMenu();
  const {
    isOpen: isRegisterOpen,
    open: openRegister,
    close: closeRegister,
  } = useRegister();
  const {
    isOpen: isLoginOpen,
    open: openLogin,
    close: closeLogin,
  } = useLogin();

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
      <IoMenuOutline className="hover:opacity-80 " />
      <div
        className={`z-99 mt-4 rounded-md border-[1px] right-0 bg-white absolute ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col text-center justify-center text-lg text-grey-main w-48">
          <li
            className="hover:bg-neutral-100 py-4"
            onClick={() => handleToggle(isLoginOpen, openLogin, closeLogin)}
          >
            Login
          </li>
          <hr />
          <li
            className="hover:bg-neutral-100 py-4"
            onClick={() =>
              handleToggle(isRegisterOpen, openRegister, closeRegister)
            }
          >
            Sign In
          </li>
          <hr />
        </ul>
      </div>
    </div>
  );
};
export default DropdownMenu;
