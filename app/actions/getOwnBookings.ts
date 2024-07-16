import connectDB from "@/config/database";
import getUser from "./getAuthUser";
import { NextResponse } from "next/server";
import Booking from "@/models/Booking";

export default async function getOwnBookings() {
  try {
    await connectDB();
    const currentUser = await getUser();
    if (!currentUser || !currentUser._id) return NextResponse.error();

    const userId = currentUser._id;

    const bookings = await Booking.find({ user: userId })
      .populate("property")
      .exec();
    if (!bookings) return NextResponse.error();

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error(error);
  }
}
