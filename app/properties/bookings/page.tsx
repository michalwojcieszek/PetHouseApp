import PropertiesGrid from "@/components/PropertiesGrid";
import getOwnPropertiesBookings from "@/app/actions/getOwnPropertiesBookings";
import getUser from "@/app/actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";

const OwnProperties = async () => {
  const ownPropertiesBookings = await getOwnPropertiesBookings();
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="your properties bookings" />;
  }

  return (
    <div className="flex flex-col gap-3 py-4">
      <PropertiesGrid
        bookedProperties={ownPropertiesBookings}
        propertiesHeader="Bookings of your properties"
        propertiesSecondaryHeader="List of all booking regarding your properties"
        type="ownPropertiesBookings"
      />
    </div>
  );
};
export default OwnProperties;
