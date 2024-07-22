import FavouritesGrid from "@/components/grids/SelectedPropertiesGrid";
import getFavouriteListings from "../actions/getFavourites";
import SelectedPropertiesGrid from "@/components/grids/SelectedPropertiesGrid";
import PropertiesGrid from "@/components/grids/PropertiesGrid";
import getUser from "../actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";
import ClientProvider from "@/components/ClientProvider";

const FavouritesPage = async () => {
  const favouriteProperties = await getFavouriteListings();
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="browse your favourites" />;
  }

  return (
    <ClientProvider>
      <div className="flex flex-col gap-3 py-4">
        <PropertiesGrid
          properties={favouriteProperties}
          propertiesHeader="Favourite properties"
          propertiesSecondaryHeader="Properties you have marked as favourites"
          type="favourites"
        />
      </div>
    </ClientProvider>
  );
};
export default FavouritesPage;
