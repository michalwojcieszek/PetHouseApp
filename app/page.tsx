import connectDB from "@/config/database";
import Property from "@/models/Property";
import ClientProvider from "@/components/ClientProvider";
import ScreenGrid from "@/components/ScreenGrid";
import getUser from "./actions/getAuthUser";
import { getUserById } from "./actions/getUserById";
import getProperties, { IPropertiesParams } from "./actions/getProperties";

type HomePageParams = {
  searchParams: IPropertiesParams;
};

const HomePage = async ({ searchParams }: HomePageParams) => {
  const currentUser = await getUser();
  const properties = await getProperties(searchParams);

  const { pet, country } = searchParams;

  return (
    <ClientProvider>
      <ScreenGrid
        sidebarHeader="Help your search!"
        propertiesHeader="Properties available:"
        properties={properties}
        currentUser={currentUser}
        type="properties"
      />
    </ClientProvider>
  );
};
export default HomePage;
