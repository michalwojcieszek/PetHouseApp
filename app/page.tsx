import connectDB from "@/config/database";
import Property from "@/models/Property";
import Container from "@/components/Container";
import ClientProvider from "@/components/ClientProvider";
import PropertyCard from "@/components/PropertyCard";
import { convertToSerializeableObject } from "@/utils/convertToObjects";
import { PropertyType } from "@/types";

const HomePage = async () => {
  await connectDB();
  const propertiesQuery = await Property.find({}).lean();
  const properties = convertToSerializeableObject(propertiesQuery);

  if (!properties || properties.length === 0)
    return (
      <ClientProvider>
        <p>empty</p>
      </ClientProvider>
    );

  return (
    <ClientProvider>
      <Container>
        {
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {properties.map((property: PropertyType) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </ul>
        }
      </Container>
      ;
    </ClientProvider>
  );
};
export default HomePage;
