import FavouritesGrid from "@/components/SelectedPropertiesGrid";
import getFavouriteListings from "../actions/getFavourites";
import SelectedPropertiesGrid from "@/components/SelectedPropertiesGrid";

const FavouritesPage = async () => {
  const favouriteProperties = await getFavouriteListings();

  console.log(favouriteProperties);
  return (
    <div>
      <SelectedPropertiesGrid
        favouriteProperties={favouriteProperties}
        header="Your favourites"
        notFoundHeader="You have no favourite properties. You need to add some."
      />
    </div>
  );
};
export default FavouritesPage;
