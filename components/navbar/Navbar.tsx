"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png";
import placeholder from "@/public/images/placeholder.jpg";
import { useRouter } from "next/navigation";
// import SearchBox from "./SearchBox";
import Container from "../Container";
import DropdownMenu from "./DropdownMenu";
import { CurrentUserType } from "@/types";

const Navbar = ({ currentUser }: { currentUser: CurrentUserType }) => {
  const isLoggedIn = currentUser ? true : false;
  const router = useRouter();

  return (
    // <div className="bg-theme-color py-5 px-5">
    <div className="py-3 bg-theme-color">
      <Container>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src={logo} alt="PetHouse logo" width={200} height={100} />
          </div>
          {/* <SearchBox /> */}
          <div className="flex flex-row items-center justify-between gap-1 md:gap-2 text-4xl text-grey-main">
            <div className="cursor-pointer" onClick={() => {}}>
              <Image
                src={currentUser?.image || placeholder}
                alt="PetHouse logo"
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <div className="cursor-pointer p-2 rounded-md text-white text-3xl">
              <DropdownMenu isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
