"use client";

import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import useMenu from "@/hooks/useMenu";

const LoggedMenu = () => {
  const router = useRouter();
  const { close } = useMenu();

  const handleRedirect = (urlString: string) => {
    router.push(`/${urlString}`);
    close();
  };

  return (
    <>
      <MenuItem action={() => handleRedirect("bookings")}>
        Your bookings
      </MenuItem>
      <hr />
      <MenuItem action={() => handleRedirect("properties")}>
        Your properties
      </MenuItem>
      <hr />
      <MenuItem action={() => handleRedirect("properties/bookings")}>
        Your properties bookings
      </MenuItem>
      <hr />
      <MenuItem action={() => handleRedirect("favourites")}>
        Your favourites
      </MenuItem>
      <hr />
      <MenuItem
        action={() => handleRedirect("properties/add")}
        highlightPrimary
      >
        Add new property
      </MenuItem>
      <hr />
      <MenuItem
        highlightSecondary
        action={() => {
          signOut();
          toast.success("Signed out successfully");
          close();
        }}
      >
        Sign Out
      </MenuItem>
      <hr />
    </>
  );
};
export default LoggedMenu;
