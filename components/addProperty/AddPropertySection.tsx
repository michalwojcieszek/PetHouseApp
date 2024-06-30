"use client";

type AddPropertySectionProps = {
  children: React.ReactNode;
};

const FormSection = ({ children }: AddPropertySectionProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
export default FormSection;
