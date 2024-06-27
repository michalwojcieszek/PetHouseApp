import connectDB from "@/config/database";
import Property from "@/models/Property";
import ClientProvider from "@/components/ClientProvider";
import ScreenGrid from "@/components/ScreenGrid";
import SearchBox from "@/components/SearchBox";

const HomePage = async () => {
  await connectDB();
  const propertiesNotJSON = await Property.find({});
  //fixing error 'Only plain objects can be passed to Client Components from Server Components'
  const properties = JSON.parse(JSON.stringify(propertiesNotJSON));

  if (!properties || properties.length === 0)
    return (
      <ClientProvider>
        <p>empty</p>
      </ClientProvider>
    );

  return (
    <ClientProvider>
      <ScreenGrid
        propertiesHeader="Properties available:"
        properties={properties}
        sidebarInput={SearchBox}
        sidebarHeader="Find accomodation for your pet!"
      />
    </ClientProvider>
  );
};
export default HomePage;
