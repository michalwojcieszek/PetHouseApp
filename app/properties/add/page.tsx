import getUser from "@/app/actions/getAuthUser";
import ClientProvider from "@/components/ClientProvider";
import AddPropertyForm from "@/components/addProperty/AddPropertyForm";

const NewProperty = async () => {
  // const currentUserNotJSON = await getUser();
  // const currentUser = JSON.parse(JSON.stringify(currentUserNotJSON));

  return (
    <ClientProvider>
      <AddPropertyForm />
    </ClientProvider>
  );
};
export default NewProperty;
