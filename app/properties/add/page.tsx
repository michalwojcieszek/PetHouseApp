import getUser from "@/app/actions/getAuthUser";
import ClientProvider from "@/components/ClientProvider";
import NotAuthorized from "@/components/NotAuthorized";
import AddPropertyForm from "@/components/addProperty/AddPropertyForm";

const NewProperty = async () => {
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="add a new property" />;
  }

  return (
    <ClientProvider>
      <AddPropertyForm />
    </ClientProvider>
  );
};
export default NewProperty;
