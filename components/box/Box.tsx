"use client";

import { IoCloseCircleOutline, IoLogoGoogle } from "react-icons/io5";
import Button from "../ui/Button";
import { FormEvent, ReactNode, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type BoxProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  alternativeLabel: string;
  alternativeLink: string;
  children: ReactNode;
  close: () => void;
  alternativeOpen: () => void;
  isOpen: boolean;
  onSubmit: () => void;
  isLoading: boolean;
};

const googleAuthCode = (
  <div className="flex flex-row gap-3 justify-center items-center">
    <IoLogoGoogle />
    <span className="text-sm md:text-base">Authorize with Google</span>
  </div>
);

const Box = ({
  title,
  subtitle,
  buttonLabel,
  alternativeLabel,
  alternativeLink,
  children,
  close,
  alternativeOpen,
  isOpen,
  onSubmit,
  isLoading,
}: BoxProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCloseBox = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      close();
      document.body.style.overflow = "";
    }
  };

  const handleToggleBox = () => {
    close();
    alternativeOpen();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const googleHandler = () => {
    const asyncGoogleHandler = async () => {
      await signIn("google");
    };
    asyncGoogleHandler();
  };

  return (
    <div
      className="flex items-center justify-center bg-neutral-800/70 absolute width-100 inset-0 h-screen overflow-hidden"
      onClick={handleCloseBox}
    >
      <div className="relative bg-white w-11/12 lg:w-1/2 xl:w-1/3 rounded-md">
        <div className="border-b-[1px]">
          <div className="py-5 px-6 md:px-10 relative flex flex-row items-center justify-between">
            <h1 className="font-semibold text-2xl">{title}</h1>
            <div className="text-3xl  cursor-pointer" onClick={() => close()}>
              <IoCloseCircleOutline />
            </div>
          </div>
        </div>
        <div className="py-5 px-6 md:px-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl">
                  Welcome to{" "}
                  <span className="font-bold text-theme-color">PetHouse</span>
                </h2>
                <h3 className="text-md text-grey-secondary">{subtitle}</h3>
              </div>
              <div className="flex flex-col gap-4">{children}</div>
              <div className="flex flex-col gap-2">
                <Button
                  label={isLoading ? "Loading..." : buttonLabel}
                  type="submit"
                />
                <Button
                  label={googleAuthCode}
                  primary={false}
                  type="button"
                  action={() => googleHandler()}
                />
              </div>
            </div>
          </form>
          <div className="text-center mt-3">
            <h4>{alternativeLabel}</h4>
            <span
              className="underline cursor-pointer underline-offset-4 text-grey-main hover:opacity-80"
              onClick={handleToggleBox}
            >
              &rarr; {alternativeLink}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Box;
