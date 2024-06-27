"use client";

type SidebarProps = {
  sidebarInput: React.ComponentType;
  sidebarHeader: string;
};

const Sidebar = ({
  sidebarInput: SidebarInput,
  sidebarHeader,
}: SidebarProps) => {
  return (
    <div className="lg:border-r-[1px] flex flex-col gap-3 pr-8 py-4">
      <h2 className="text-xl font-semibold">{sidebarHeader}</h2>
      <SidebarInput />
    </div>
  );
};
export default Sidebar;
