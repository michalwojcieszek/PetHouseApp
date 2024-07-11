"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useRouter } from "next/navigation";
// import SearchBox from "./SearchBox";
import Container from "../Container";
import { CurrentUserType } from "@/types";
import UserImg from "../UserImg";
import useMenu from "@/hooks/useMenu";
import { IoMenuOutline } from "react-icons/io5";
import LoggedMenu from "./LoggedMenu";
import NotLoggedMenu from "./NotLoggedMenu";

const Navbar = ({ currentUser }: { currentUser: CurrentUserType }) => {
  const {
    isOpen: isDropdownOpen,
    open: openDropdown,
    close: closeDropdown,
  } = useMenu();
  console.log(currentUser);

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

  const isLoggedIn = currentUser ? true : false;
  const router = useRouter();

  return (
    <div className="py-3 bg-theme-color">
      <Container>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src={logo} alt="PetHouse logo" width={200} height={100} />
          </div>
          <div
            className="flex flex-row items-center justify-between gap-1 md:gap-2 text-4xl text-grey-main bg-white p-2 rounded-md cursor-pointer"
            onClick={() =>
              handleToggle(isDropdownOpen, openDropdown, closeDropdown)
            }
          >
            <div>
              <UserImg currentUser={currentUser} />
            </div>
            <div className="rounded-md text-theme-color text-3xl">
              <div className="relative">
                <IoMenuOutline
                  className={`transition duration-300	 ${
                    isDropdownOpen ? "rotate-90" : ""
                  }`}
                />
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
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
