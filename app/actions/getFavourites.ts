import connectDB from "@/config/database";
import getUser from "./getAuthUser";
import { NextResponse } from "next/server";
import Property from "@/models/Property";

export default async function getFavouriteListings() {
  try {
    await connectDB();
    const currentUser = await getUser();
    if (!currentUser || !currentUser.favourites) return NextResponse.error();

    const favouriteIds = currentUser.favourites;

    const properties = await Property.find({
      _id: { $in: favouriteIds },
    }).lean();

    if (!properties) return NextResponse.error();

    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error(error);
  }
}
