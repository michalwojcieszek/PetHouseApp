import PropertiesGrid from "@/components/PropertiesGrid";
import getOwnProperties from "../actions/getOwnProperties";

const OwnProperties = async () => {
  const ownProperties = await getOwnProperties();
  return (
    <div className="flex flex-col gap-3 py-4">
      <PropertiesGrid
        properties={ownProperties}
        propertiesHeader="Your properties"
        type="own"
      />
    </div>
  );
};
export default OwnProperties;
