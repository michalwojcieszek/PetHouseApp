import FavouritesGrid from "@/components/SelectedPropertiesGrid";
import getFavouriteListings from "../actions/getFavourites";
import SelectedPropertiesGrid from "@/components/SelectedPropertiesGrid";
import PropertiesGrid from "@/components/PropertiesGrid";
import getUser from "../actions/getAuthUser";
import NotAuthorized from "@/components/NotAuthorized";

const FavouritesPage = async () => {
  const favouriteProperties = await getFavouriteListings();
  const currentUser = await getUser();

  if (!currentUser) {
    return <NotAuthorized text="browse your favourites" />;
  }

  return (
    <div className="flex flex-col gap-3 py-4">
      <PropertiesGrid
        properties={favouriteProperties}
        propertiesHeader="Favourite properties"
        propertiesSecondaryHeader="Properties you have marked as favourites"
        type="favourites"
      />
    </div>
  );
};
export default FavouritesPage;
