"use client";

type FeaturesFlexColType = {
  children: React.ReactNode;
};

const FeaturesFlexCol = ({ children }: FeaturesFlexColType) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
export default FeaturesFlexCol;
