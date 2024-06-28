import ClientProvider from "@/components/ClientProvider";
import AddPropertyForm from "@/components/addProperty/AddPropertyForm";

const newProperty = () => {
  return (
    <ClientProvider>
      <AddPropertyForm />
    </ClientProvider>
  );
};
export default newProperty;
