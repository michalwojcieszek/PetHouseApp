import connectDB from "@/config/database";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    await connectDB();

    const body = await req.json();
    const { totalPrice, dates, property, user, pet } = body;

    let message;

    if (!totalPrice || !dates || !property || !user || !pet) {
      return new NextResponse("Missing booking data", { status: 400 });
    }

    const booking = new Booking({ ...body });
    await booking.save();

    message = "Booking successfully created";

    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
  }
}
