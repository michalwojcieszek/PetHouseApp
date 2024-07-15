import connectDB from "@/config/database";
import Property from "@/models/Property";
import ClientProvider from "@/components/ClientProvider";
import ScreenGrid from "@/components/ScreenGrid";
import getUser from "./actions/getAuthUser";
import { getUserById } from "./actions/getUserById";

const HomePage = async () => {
  await connectDB();
  const propertiesNotJSON = await Property.find({});
  //fixing error 'Only plain objects can be passed to Client Components from Server Components'
  const properties = JSON.parse(JSON.stringify(propertiesNotJSON));
  const currentUser = await getUser();

  if (!properties || properties.length === 0)
    return (
      <ClientProvider>
        <p>empty</p>
      </ClientProvider>
    );

  return (
    <ClientProvider>
      <ScreenGrid
        sidebarHeader="Find accomodation for your pet!"
        propertiesHeader="Properties available:"
        properties={properties}
        currentUser={currentUser}
      />
    </ClientProvider>
  );
};
export default HomePage;
