import PropertiesGrid from "@/components/grids/PropertiesGrid";
import getOwnBookings from "../actions/getOwnBookings";
import getUser from "../actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";
import ClientProvider from "@/components/ClientProvider";

const OwnProperties = async () => {
  const currentUser = await getUser();
  const ownBookings = await getOwnBookings();

  if (!currentUser) {
    return <NotAuthorized text="browse your bookings" />;
  }

  return (
    <ClientProvider>
      <div className="flex flex-col gap-3 py-4">
        <PropertiesGrid
          bookedProperties={ownBookings}
          propertiesHeader="Your bookings"
          propertiesSecondaryHeader="List of all booked properties"
          type="bookings"
        />
      </div>
    </ClientProvider>
  );
};
export default OwnProperties;
