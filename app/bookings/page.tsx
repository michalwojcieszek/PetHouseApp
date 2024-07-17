import PropertiesGrid from "@/components/PropertiesGrid";
import getOwnBookings from "../actions/getOwnBookings";

const OwnProperties = async () => {
  const ownBookings = await getOwnBookings();

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
