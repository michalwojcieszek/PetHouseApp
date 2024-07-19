"use client";

import Link from "next/link";

type NotFoundProps = {
  href: string;
  primaryText: string;
  secondaryText: string;
};

const NotFound = ({ primaryText, secondaryText, href }: NotFoundProps) => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <p className="text-lg font-semibold">No {primaryText} found</p>
      <Link
        className="underline underline-offset-4 hover:no-underline transition"
        href={href}
      >
        &rarr; {secondaryText}
      </Link>
    </div>
  );
};
export default NotFound;
