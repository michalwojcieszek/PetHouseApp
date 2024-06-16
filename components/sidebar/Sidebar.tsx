import SearchBox from "../navbar/SearchBox";

const Sidebar = () => {
  return (
    <div className="lg:border-r-[1px] flex flex-col gap-3 pr-8 py-4">
      <h2 className="text-xl font-semibold">
        Find accomodation that suits your pet!
      </h2>
      <SearchBox />
    </div>
  );
};
export default Sidebar;
