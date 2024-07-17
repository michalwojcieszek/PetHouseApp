import getUser from "@/app/actions/getAuthUser";
import connectDB from "@/config/database";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

type IParams = {
  bookingId: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    await connectDB();

    const currentUser = await getUser();
    if (!currentUser || !currentUser._id) return NextResponse.error();

    const { bookingId } = params;

    const booking = await Booking.findOne({ _id: bookingId });

    if (!booking) return NextResponse.error();

    await booking.deleteOne();
    const message = "Booking successfully deleted";

    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
  }
}
