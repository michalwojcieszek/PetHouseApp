import PropertiesGrid from "@/components/PropertiesGrid";
import getOwnPropertiesBookings from "@/app/actions/getOwnPropertiesBookings";

const OwnProperties = async () => {
  const ownPropertiesBookings = await getOwnPropertiesBookings();

  return (
    <div className="flex flex-col gap-3 py-4">
      <PropertiesGrid
        bookedProperties={ownPropertiesBookings}
        propertiesHeader="Bookings of your properties"
        propertiesSecondaryHeader="List of all booking regarding your properties"
        type="bookings"
      />
    </div>
  );
};
export default OwnProperties;
