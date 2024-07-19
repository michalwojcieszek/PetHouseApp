import PropertiesGrid from "@/components/PropertiesGrid";
import getOwnBookings from "../actions/getOwnBookings";
import getUser from "../actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";

const OwnProperties = async () => {
  const currentUser = await getUser();
  const ownBookings = await getOwnBookings();

  if (!currentUser) {
    return <NotAuthorized text="browse your bookings" />;
  }

  return (
    <div className="flex flex-col gap-3 py-4">
      <PropertiesGrid
        bookedProperties={ownBookings}
        propertiesHeader="Your bookings"
        propertiesSecondaryHeader="List of all booked properties"
        type="bookings"
      />
    </div>
  );
};
export default OwnProperties;
