import PropertiesGrid from "@/components/grids/PropertiesGrid";
import getOwnPropertiesBookings from "@/app/actions/getOwnPropertiesBookings";
import getUser from "@/app/actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";
import ClientProvider from "@/components/ClientProvider";

const OwnProperties = async () => {
  const ownPropertiesBookings = await getOwnPropertiesBookings();
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="your properties bookings" />;
  }

  return (
    <ClientProvider>
      <div className="flex flex-col gap-3 py-4">
        <PropertiesGrid
          bookedProperties={ownPropertiesBookings}
          propertiesHeader="Bookings of your properties"
          propertiesSecondaryHeader="List of all booking regarding your properties"
          type="ownPropertiesBookings"
        />
      </div>
    </ClientProvider>
  );
};
export default OwnProperties;
