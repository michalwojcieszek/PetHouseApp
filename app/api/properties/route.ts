import getUser from "@/app/actions/getAuthUser";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const currentUser = await getUser();

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    }
    const body = await req.json();

    const { name, description, image, location, pets } = body;

    if (!name || !description || !image || !location || !pets) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const property = new Property({ ...body, owner: currentUser._id });
    await property.save();

    return new NextResponse(JSON.stringify({ success: true, data: property }));
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
