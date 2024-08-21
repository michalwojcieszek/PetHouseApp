"use client";
import React from "react";

type MenuItemProps = {
  children: React.ReactNode;
  action: () => void;
  highlightPrimary?: boolean;
  highlightSecondary?: boolean;
};

const MenuItem = ({
  children,
  action,
  highlightPrimary,
  highlightSecondary,
}: MenuItemProps) => {
  return (
    <li
      className={`py-4 ${
        !highlightPrimary && !highlightSecondary && "hover:bg-neutral-100"
      } ${highlightSecondary ? "bg-gray-100 hover:bg-gray-200" : ""} ${
        highlightPrimary ? "bg-green-50 hover:bg-green-100" : ""
      }`}
      onClick={action}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          action();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {children}
    </li>
  );
};
export default MenuItem;
