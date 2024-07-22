import PropertiesGrid from "@/components/grids/PropertiesGrid";
import getOwnProperties from "../actions/getOwnProperties";
import getUser from "../actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";
import ClientProvider from "@/components/ClientProvider";

const OwnProperties = async () => {
  const ownProperties = await getOwnProperties();
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="browse the bookings of your property" />;
  }

  return (
    <ClientProvider>
      <div className="flex flex-col gap-3 py-4">
        <PropertiesGrid
          properties={ownProperties}
          propertiesHeader="Your properties"
          propertiesSecondaryHeader="All of properties added by you"
          type="own"
        />
      </div>
    </ClientProvider>
  );
};
export default OwnProperties;
