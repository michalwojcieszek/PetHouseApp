import FavouritesGrid from "@/components/SelectedPropertiesGrid";
import getFavouriteListings from "../actions/getFavourites";
import SelectedPropertiesGrid from "@/components/SelectedPropertiesGrid";
import PropertiesGrid from "@/components/PropertiesGrid";

const FavouritesPage = async () => {
  const favouriteProperties = await getFavouriteListings();

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
