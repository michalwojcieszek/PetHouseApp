import getUser from "@/app/actions/getAuthUser";
import connectDB from "@/config/database";
import Booking from "@/models/Booking";
import Property from "@/models/Property";
import User from "@/models/User";
import { NextResponse } from "next/server";

type IParams = {
  propertyId: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    await connectDB();

    const currentUser = await getUser();
    if (!currentUser || !currentUser._id) return NextResponse.error();

    const user = await User.findOne({ _id: currentUser._id });

    if (!user) return NextResponse.error();

    const { propertyId } = params;

    const property = await Property.findOne({ _id: propertyId });

    if (!property) return NextResponse.error();

    await Booking.deleteMany({ property: propertyId });

    await property.deleteOne();
    const message = "Property successfully deleted";

    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
  }
}
