import ClientProvider from "@/components/ClientProvider";
import ScreenGrid from "@/components/ScreenGrid";
import SearchBox from "@/components/SearchBox";
import SingleProperty from "@/components/property/SingleProperty";
import connectDB from "@/config/database";
import Property from "@/models/Property";

type IParams = {
  id: string;
};

const PropertyPage = async ({ params }: { params: IParams }) => {
  const { id } = params;

  await connectDB();
  const propertyNotJSON = await Property.findOne({ _id: id });
  //fixing error 'Only plain objects can be passed to Client Components from Server Components'
  const property = JSON.parse(JSON.stringify(propertyNotJSON));
  console.log(property);

  return (
    <ClientProvider>
      <ScreenGrid
        sidebarHeader="Find the proper date!"
        sidebarInput={SearchBox}
        property={property}
      />
    </ClientProvider>
  );
};

export default PropertyPage;
