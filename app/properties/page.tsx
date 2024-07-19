import PropertiesGrid from "@/components/PropertiesGrid";
import getOwnProperties from "../actions/getOwnProperties";
import getUser from "../actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";

const OwnProperties = async () => {
  const ownProperties = await getOwnProperties();
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="browse the bookings of your property" />;
  }

  return (
    <div className="flex flex-col gap-3 py-4">
      <PropertiesGrid
        properties={ownProperties}
        propertiesHeader="Your properties"
        propertiesSecondaryHeader="All of properties added by you"
        type="own"
      />
    </div>
  );
};
export default OwnProperties;
