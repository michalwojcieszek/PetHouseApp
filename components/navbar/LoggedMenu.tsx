"use client";

import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const LoggedMenu = () => {
  const router = useRouter();

  return (
    <>
      <MenuItem action={() => router.push("/bookings")}>Your bookings</MenuItem>
      <hr />
      <MenuItem action={() => router.push("/properties")}>
        Your properties
      </MenuItem>
      <hr />
      <MenuItem action={() => router.push("/properties/bookings")}>
        Your properties bookings
      </MenuItem>
      <hr />
      <MenuItem action={() => router.push("/favourites")}>
        Your favourites
      </MenuItem>
      <hr />
      <MenuItem action={() => router.push("/properties/add")} highlightPrimary>
        Add new property
      </MenuItem>
      <hr />
      <MenuItem
        highlightSecondary
        action={() => {
          signOut();
          toast.success("Signed out successfully");
        }}
      >
        Sign Out
      </MenuItem>
      <hr />
    </>
  );
};
export default LoggedMenu;
