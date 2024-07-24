import getUser from "@/app/actions/getAuthUser";
import { getUserById } from "@/app/actions/getUserById";
import ClientProvider from "@/components/ClientProvider";
import ScreenGrid from "@/components/grids/ScreenGrid";
import connectDB from "@/config/database";
import Booking from "@/models/Booking";
import Property from "@/models/Property";

type IParams = {
  id: string;
};

const PropertyPage = async ({ params }: { params: IParams }) => {
  const { id } = params;

  await connectDB();
  const propertyNotJSON = await Property.findOne({ _id: id });
  //fixing error 'Only plain objects can be passed to Client Components from Server Components'
  const property = JSON.parse(JSON.stringify(propertyNotJSON));
  console.log(property.owner);
  const ownerUser = await getUserById(property.owner);
  const currentUser = await getUser();
  const bookingsNotJSON = await Booking.find();
  const bookings = JSON.parse(JSON.stringify(bookingsNotJSON));

  return (
    <ClientProvider>
      <ScreenGrid
        sidebarHeader="Create a booking now!"
        property={property}
        ownerUser={ownerUser}
        currentUser={currentUser}
        bookings={bookings}
        type="property"
      />
    </ClientProvider>
  );
};

export default PropertyPage;
