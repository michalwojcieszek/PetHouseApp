"use client";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[1800px] mx-auto xl:px-30 md:px-10 px-5">
      {children}
    </div>
  );
};
export default Container;
