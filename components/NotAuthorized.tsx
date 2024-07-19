"use client";

import useLogin from "@/hooks/useLogin";
import React from "react";

type NotAuthorizedProps = {
  text: string;
};

const NotAuthorized = ({ text }: NotAuthorizedProps) => {
  const { open } = useLogin();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <p className="text-lg font-semibold">
        You are not authorized to access this page
      </p>
      <button
        onClick={() => open()}
        className="underline underline-offset-4 hover:no-underline transition"
      >
        Log in to {text}
      </button>
    </div>
  );
};
export default NotAuthorized;
