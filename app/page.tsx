import ClientProvider from "@/components/ClientProvider";
import getUser from "./actions/getAuthUser";
import getProperties, { IPropertiesParams } from "./actions/getProperties";
import dynamic from "next/dynamic";

const ScreenGrid = dynamic(() => import("@/components/grids/ScreenGrid"), {
  ssr: false,
});

type HomePageParams = {
  searchParams: IPropertiesParams;
};

const HomePage = async ({ searchParams }: HomePageParams) => {
  const currentUser = await getUser();
  const properties = await getProperties(searchParams);

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
