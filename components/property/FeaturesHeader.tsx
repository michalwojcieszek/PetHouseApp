"use client";

import Header3 from "../ui/Header3";

type FeaturesHeaderProps = {
  children: string;
};

const FeaturesHeader = ({ children }: FeaturesHeaderProps) => {
  return (
    <div className="flex gap-2 items-center">
      {/* <p className="text-2xl"><Icon /></p> */}
      <Header3>{children}</Header3>
    </div>
  );
};
export default FeaturesHeader;
