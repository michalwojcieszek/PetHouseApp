"use client";
import React from "react";

type MenuItemProps = {
  children: React.ReactNode;
  action: () => void;
};

const MenuItem = ({ children, action }: MenuItemProps) => {
  return (
    <li className="hover:bg-neutral-100 py-4" onClick={action}>
      {children}
    </li>
  );
};
export default MenuItem;
