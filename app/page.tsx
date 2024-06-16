import connectDB from "@/config/database";
import Property from "@/models/Property";
import ClientProvider from "@/components/ClientProvider";
import PropertyGrid from "@/components/PropertyGrid";

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
      <div className="flex flex-col gap-3 py-4">
        <h2 className="text-xl font-semibold">Properties available:</h2>
        <PropertyGrid properties={properties} />
      </div>
    </ClientProvider>
  );
};
export default HomePage;
