"use client";

import { ComponentPropsWithRef, ReactNode } from "react";

type ButtonProps = {
  label: string | ReactNode;
  primary?: boolean;
  disabled?: boolean;
  action?: () => void;
} & ComponentPropsWithRef<"button">;

const Button = ({
  label,
  type,
  primary = true,
  action,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={action}
      type={type}
      className={`w-full tracking-wide rounded-md py-4 text-xl hover:opacity-80 ${
        primary ? "bg-theme-color text-white" : "border-2 border-black"
      } ${disabled ? "cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
