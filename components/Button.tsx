"use client";

import { ComponentPropsWithRef, ReactNode } from "react";

type ButtonProps = {
  label: string | ReactNode;
  primary?: boolean;
  action?: () => void;
} & ComponentPropsWithRef<"button">;

const Button = ({ label, type, primary = true, action }: ButtonProps) => {
  return (
    <button
      onClick={action}
      type={type}
      className={`w-full rounded-md py-4 text-xl hover:opacity-80 ${
        primary ? "bg-theme-color text-white" : "border-2 border-black"
      }`}
    >
      {label}
    </button>
  );
};
export default Button;
