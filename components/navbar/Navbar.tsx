"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png";
import placeholder from "@/public/images/placeholder.jpg";
import { useRouter } from "next/navigation";
import SearchBox from "./SearchBox";
import Container from "../Container";
import useRegister from "@/hooks/useRegister";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const router = useRouter();

  return (
    // <div className="bg-theme-color py-5 px-5">
    <div className="py-5 border-b-[1px]">
      <Container>
        <div className="flex flex-row items-center justify-between gap-2">
          <div
            className="hidden md:block cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={logo} alt="PetHouse logo" width={200} height={100} />
          </div>
          <SearchBox />
          <div className="flex flex-row items-center justify-between gap-1 md:gap-2 text-4xl text-grey-main">
            <div className="cursor-pointer" onClick={() => {}}>
              <Image
                src={placeholder}
                alt="PetHouse logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="cursor-pointer p-2 rounded-md text-theme-color text-3xl">
              <DropdownMenu />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
