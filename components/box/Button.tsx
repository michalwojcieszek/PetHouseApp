import { ComponentPropsWithRef, ReactNode } from "react";

type ButtonProps = {
  label: string | ReactNode;
  primary?: boolean;
} & ComponentPropsWithRef<"button">;

const Button = ({ label, type, primary = true }: ButtonProps) => {
  return (
    <button
      type={type}
      className={` rounded-md py-4 text-xl  spacing hover:opacity-80 ${
        primary ? "bg-theme-color text-white" : "border-2 border-black"
      }`}
    >
      {label}
    </button>
  );
};
export default Button;
