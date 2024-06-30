import getUser from "@/app/actions/getAuthUser";
import ClientProvider from "@/components/ClientProvider";
import AddPropertyForm from "@/components/addProperty/FormSection";

const newProperty = async () => {
  const currentUserNotJSON = await getUser();
  const currentUser = JSON.parse(JSON.stringify(currentUserNotJSON));

  return (
    <ClientProvider>
      <AddPropertyForm currentUser={currentUser} />
    </ClientProvider>
  );
};
export default newProperty;
